import { Hono } from "hono";
import { z } from "zod";
import { validateInvoice } from "./invoice";
import { candidateBody, cleanupImage } from "./reference-image";
import {
  amount,
  ApiError,
  body,
  detail,
  itemSchema,
  messages,
  missing,
  name,
} from "./helpers";

const app = new Hono<{ Bindings: Env }>();

const now = "strftime('%Y-%m-%dT%H:%M:%fZ','now')";

const note = z.string().trim().max(500).nullable().optional();

const candidateSchema = z
  .object({
    name,
    url: z
      .url()
      .max(2048)
      .refine(
        (value) => ["http:", "https:"].includes(new URL(value).protocol),
        "Gunakan link HTTP/HTTPS.",
      ),
    price: amount,
    note,
    removeImage: z.boolean().optional(),
  })
  .strict();

const paymentSchema = z
  .object({
    type: z.enum(["deposit", "installment", "settlement"]),
    amount: amount.min(1),
    paidAt: z.iso.date(),
    note,
  })
  .strict();

app.get("/items/:id", async (c) =>
  c.json({ data: await detail(c.env.DB, c.req.param("id")) }),
);

app.patch("/items/:id", async (c) => {
  const value = await body(
    c.req.raw,
    itemSchema
      .partial()
      .refine((v) => Object.keys(v).length > 0, "Isi perubahan."),
  );

  const result = await c.env.DB.prepare(
    `UPDATE items SET name = COALESCE(?,name), category_id = COALESCE(?,category_id), estimated_amount = COALESCE(?,estimated_amount), updated_at = ${now} WHERE id = ?`,
  )
    .bind(
      value.name ?? null,
      value.categoryId ?? null,
      value.estimatedAmount ?? null,
      c.req.param("id"),
    )
    .run();

  if (!result.meta.changes) {
    throw missing();
  }
  return c.json({ data: await detail(c.env.DB, c.req.param("id")) });
});

app.delete("/items/:id", async (c) => {
  const id = c.req.param("id");

  const images = await c.env.DB.prepare(
    "SELECT image_key AS key FROM candidates WHERE item_id = ? AND image_key IS NOT NULL",
  )
    .bind(id)
    .all<{ key: string }>();
  const result = await c.env.DB.batch([
    c.env.DB.prepare(
      `UPDATE items SET selected_candidate_id = NULL, agreed_amount = NULL WHERE id = ?`,
    ).bind(id),

    c.env.DB.prepare("DELETE FROM items WHERE id = ?").bind(id),
  ]);

  if (!result[1].meta.changes) {
    throw missing();
  }

  await Promise.all(
    images.results.map((image) => cleanupImage(c.env.INVOICES, image.key)),
  );
  return c.body(null, 204);
});

app.post("/items/:id/candidates", async (c) => {
  const { request, image } = await candidateBody(c.req.raw);
  const value = await body(request, candidateSchema);
  if (image && value.removeImage)
    throw new ApiError(
      "VALIDATION_ERROR",
      422,
      "Pilih gambar baru atau hapus gambar.",
    );
  const itemId = c.req.param("id");
  if (
    !(await c.env.DB.prepare("SELECT id FROM items WHERE id = ?")
      .bind(itemId)
      .first())
  )
    throw missing();
  const id = crypto.randomUUID();
  const key = image ? `references/${id}/${crypto.randomUUID()}` : null;
  if (image && key) {
    await c.env.INVOICES.put(key, image.stream(), {
      httpMetadata: { contentType: image.type },
    });
  }
  try {
    await c.env.DB.prepare(
      "INSERT INTO candidates(id,item_id,name,url,price,note,image_key,image_type) VALUES(?,?,?,?,?,?,?,?)",
    )
      .bind(
        id,
        itemId,
        value.name,
        value.url,
        value.price,
        value.note ?? null,
        key,
        image?.type ?? null,
      )
      .run();
  } catch (error) {
    await cleanupImage(c.env.INVOICES, key);
    throw error;
  }
  try {
    return c.json({ data: await detail(c.env.DB, itemId) }, 201);
  } catch {
    return c.json({ data: null, meta: { referenceSaved: true } }, 201);
  }
});

app.patch("/items/:id/candidates/:candidateId", async (c) => {
  const { request, image } = await candidateBody(c.req.raw);
  const value = await body(
    request,
    candidateSchema
      .partial()
      .refine((v) => image || Object.keys(v).length > 0, "Isi perubahan."),
  );
  if (image && value.removeImage)
    throw new ApiError(
      "VALIDATION_ERROR",
      422,
      "Pilih gambar baru atau hapus gambar.",
    );
  const id = c.req.param("candidateId");
  const itemId = c.req.param("id");
  const previous = await c.env.DB.prepare(
    "SELECT image_key AS key FROM candidates WHERE id = ? AND item_id = ?",
  )
    .bind(id, itemId)
    .first<{ key: string | null }>();
  if (!previous) throw missing();
  const changed = !!image || value.removeImage === true;
  const key = image ? `references/${id}/${crypto.randomUUID()}` : null;
  if (image && key) {
    await c.env.INVOICES.put(key, image.stream(), {
      httpMetadata: { contentType: image.type },
    });
  }
  try {
    const result = await c.env.DB.prepare(
      `UPDATE candidates SET name = COALESCE(?,name), url = COALESCE(?,url), price = COALESCE(?,price), note = CASE WHEN ? THEN ? ELSE note END, image_key = CASE WHEN ? THEN ? ELSE image_key END, image_type = CASE WHEN ? THEN ? ELSE image_type END, updated_at = ${now} WHERE id = ? AND item_id = ? AND (? = 0 OR image_key IS ?)`,
    )
      .bind(
        value.name ?? null,
        value.url ?? null,
        value.price ?? null,
        "note" in value ? 1 : 0,
        value.note ?? null,
        changed ? 1 : 0,
        key,
        changed ? 1 : 0,
        image?.type ?? null,
        id,
        itemId,
        changed ? 1 : 0,
        previous.key,
      )
      .run();
    if (!result.meta.changes)
      throw new ApiError(
        "REFERENCE_CHANGED",
        409,
        "Referensi berubah. Muat ulang sebelum menyimpan kembali.",
      );
  } catch (error) {
    await cleanupImage(c.env.INVOICES, key);
    throw error;
  }
  if (changed) await cleanupImage(c.env.INVOICES, previous.key);
  // ponytail: D1/R2 have no shared transaction; interrupted cleanup can leave orphaned files for reconciliation.
  try {
    return c.json({ data: await detail(c.env.DB, itemId) });
  } catch {
    return c.json({ data: null, meta: { referenceSaved: true } });
  }
});

app.get("/items/:id/candidates/:candidateId/image", async (c) => {
  const row = await c.env.DB.prepare(
    "SELECT image_key AS key, image_type AS type FROM candidates WHERE id = ? AND item_id = ?",
  )
    .bind(c.req.param("candidateId"), c.req.param("id"))
    .first<{ key: string | null; type: string }>();
  if (!row?.key) throw missing();
  const object = await c.env.INVOICES.get(row.key);
  if (!object) throw missing();
  return new Response(object.body, {
    headers: {
      "Content-Type": row.type,
      "Content-Length": String(object.size),
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
});

app.delete("/items/:id/candidates/:candidateId", async (c) => {
  const id = c.req.param("id");

  const candidateId = c.req.param("candidateId");

  const image = await c.env.DB.prepare(
    "SELECT image_key AS key FROM candidates WHERE id = ? AND item_id = ?",
  )
    .bind(candidateId, id)
    .first<{ key: string | null }>();

  const result = await c.env.DB.batch([
    c.env.DB.prepare(
      `UPDATE items SET selected_candidate_id = NULL, agreed_amount = NULL, updated_at = ${now} WHERE id = ? AND selected_candidate_id = ?`,
    ).bind(id, candidateId),
    c.env.DB.prepare(
      "DELETE FROM candidates WHERE id = ? AND item_id = ?",
    ).bind(candidateId, id),
  ]);

  if (!result[1].meta.changes) {
    throw missing();
  }

  await cleanupImage(c.env.INVOICES, image?.key);
  return c.body(null, 204);
});

app.put("/items/:id/selection", async (c) => {
  const { candidateId } = await body(
    c.req.raw,
    z.object({ candidateId: z.uuid() }).strict(),
  );

  const result = await c.env.DB.prepare(
    `UPDATE items SET selected_candidate_id = ?, agreed_amount = (SELECT price FROM candidates WHERE id = ? AND item_id = items.id), updated_at = ${now} WHERE id = ? AND EXISTS(SELECT 1 FROM candidates WHERE id = ? AND item_id = items.id)`,
  )
    .bind(candidateId, candidateId, c.req.param("id"), candidateId)
    .run();

  if (!result.meta.changes) {
    if (
      !(await c.env.DB.prepare("SELECT id FROM items WHERE id = ?")
        .bind(c.req.param("id"))
        .first())
    ) {
      throw missing();
    }

    throw new ApiError("INVALID_SELECTION", 409, messages.INVALID_SELECTION);
  }

  return c.json({ data: await detail(c.env.DB, c.req.param("id")) });
});

app.delete("/items/:id/selection", async (c) => {
  const result = await c.env.DB.prepare(
    `UPDATE items SET selected_candidate_id = NULL, agreed_amount = NULL, updated_at = ${now} WHERE id = ?`,
  )
    .bind(c.req.param("id"))
    .run();

  if (!result.meta.changes) {
    throw missing();
  }

  return c.body(null, 204);
});

app.post("/items/:id/payments", async (c) => {
  let invoice: File | undefined;
  let request = c.req.raw;
  if (
    c.req
      .header("Content-Type")
      ?.toLowerCase()
      .startsWith("multipart/form-data;")
  ) {
    let form: FormData;
    try {
      form = await request.formData();
    } catch {
      throw new ApiError(
        "VALIDATION_ERROR",
        422,
        "Form pembayaran tidak valid.",
      );
    }
    const fields: Record<string, unknown> = Object.create(null);
    for (const [key, entry] of form) {
      if (form.getAll(key).length !== 1) {
        throw new ApiError(
          "VALIDATION_ERROR",
          422,
          "Setiap field hanya boleh diisi sekali, termasuk invoice.",
        );
      }
      if (key === "invoice") {
        if (!(entry instanceof File))
          throw new ApiError(
            "VALIDATION_ERROR",
            422,
            "Invoice harus berupa file.",
          );
        if (!entry.name && !entry.size) continue;
        invoice = entry;
        await validateInvoice(invoice);
      } else {
        if (typeof entry !== "string")
          throw new ApiError(
            "VALIDATION_ERROR",
            422,
            "Field pembayaran harus berupa teks.",
          );
        fields[key] = key === "amount" ? Number(entry) : entry;
      }
    }
    request = new Request(request.url, {
      method: "POST",
      body: JSON.stringify(fields),
    });
  }
  const value = await body(request, paymentSchema);
  const itemId = c.req.param("id");
  if (
    !(await c.env.DB.prepare("SELECT id FROM items WHERE id = ?")
      .bind(itemId)
      .first())
  ) {
    throw missing();
  }
  const id = crypto.randomUUID();
  const key = invoice ? `payments/${id}` : null;
  if (invoice && key) {
    await c.env.INVOICES.put(key, invoice.stream(), {
      httpMetadata: { contentType: invoice.type },
    });
  }
  try {
    await c.env.DB.prepare(
      "INSERT INTO payments(id,item_id,type,amount,paid_at,note,invoice_key,invoice_name,invoice_type,invoice_size) VALUES(?,?,?,?,?,?,?,?,?,?)",
    )
      .bind(
        id,
        itemId,
        value.type,
        value.amount,
        value.paidAt,
        value.note ?? null,
        key,
        invoice?.name ?? null,
        invoice?.type ?? null,
        invoice?.size ?? null,
      )
      .run();
  } catch (error) {
    if (key) {
      try {
        await c.env.INVOICES.delete(key);
      } catch {
        console.error("INVOICE_CLEANUP_FAILED", { paymentId: id });
      }
    }
    throw error;
  }
  // ponytail: D1 and R2 have no shared transaction; cleanup covers rejected inserts.
  // A post-commit read failure must not invite a second payment submission.
  try {
    return c.json({ data: await detail(c.env.DB, itemId) }, 201);
  } catch {
    return c.json({ data: null, meta: { paymentSaved: true } }, 201);
  }
});

app.get("/items/:id/payments/:paymentId/invoice", async (c) => {
  const row = await c.env.DB.prepare(
    "SELECT invoice_key AS key, invoice_name AS name, invoice_type AS type FROM payments WHERE id = ? AND item_id = ?",
  )
    .bind(c.req.param("paymentId"), c.req.param("id"))
    .first<{ key: string | null; name: string; type: string }>();
  if (!row?.key) throw missing();
  const object = await c.env.INVOICES.get(row.key);
  if (!object) throw missing();
  const filename = encodeURIComponent(row.name).replace(
    /['()*]/g,
    (char) => `%${char.charCodeAt(0).toString(16)}`,
  );
  return new Response(object.body, {
    headers: {
      "Content-Type": row.type,
      "Content-Disposition": `attachment; filename="invoice"; filename*=UTF-8''${filename}`,
      "Content-Length": String(object.size),
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
});

app.patch("/items/:id/payments/:paymentId", async (c) => {
  const value = await body(
    c.req.raw,
    paymentSchema
      .partial()
      .refine((v) => Object.keys(v).length > 0, "Isi perubahan."),
  );

  const result = await c.env.DB.prepare(
    `UPDATE payments SET type = COALESCE(?,type), amount = COALESCE(?,amount), paid_at = COALESCE(?,paid_at), note = CASE WHEN ? THEN ? ELSE note END, updated_at = ${now} WHERE id = ? AND item_id = ?`,
  )
    .bind(
      value.type ?? null,
      value.amount ?? null,
      value.paidAt ?? null,
      "note" in value ? 1 : 0,
      value.note ?? null,
      c.req.param("paymentId"),
      c.req.param("id"),
    )
    .run();
  if (!result.meta.changes) {
    throw missing();
  }

  return c.json({ data: await detail(c.env.DB, c.req.param("id")) });
});

app.delete("/items/:id/payments/:paymentId", async (c) => {
  const result = await c.env.DB.prepare(
    `UPDATE payments SET voided_at = ${now}, updated_at = ${now} WHERE id = ? AND item_id = ? AND voided_at IS NULL`,
  )
    .bind(c.req.param("paymentId"), c.req.param("id"))
    .run();
  if (!result.meta.changes) throw missing();
  return c.body(null, 204);
});

export default app;
