import { Hono } from "hono";
import { z } from "zod";
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

  const result = await c.env.DB.batch([
    c.env.DB.prepare(
      `UPDATE items SET selected_candidate_id = NULL, agreed_amount = NULL WHERE id = ?`,
    ).bind(id),

    c.env.DB.prepare("DELETE FROM items WHERE id = ?").bind(id),
  ]);

  if (!result[1].meta.changes) {
    throw missing();
  }

  return c.body(null, 204);
});

app.post("/items/:id/candidates", async (c) => {
  const value = await body(c.req.raw, candidateSchema);

  const id = crypto.randomUUID();

  await c.env.DB.prepare(
    "INSERT INTO candidates(id,item_id,name,url,price,note) VALUES(?,?,?,?,?,?)",
  )
    .bind(
      id,
      c.req.param("id"),
      value.name,
      value.url,
      value.price,
      value.note ?? null,
    )
    .run();

  return c.json({ data: await detail(c.env.DB, c.req.param("id")) }, 201);
});

app.patch("/items/:id/candidates/:candidateId", async (c) => {
  const value = await body(
    c.req.raw,
    candidateSchema
      .partial()
      .refine((v) => Object.keys(v).length > 0, "Isi perubahan."),
  );

  const result = await c.env.DB.prepare(
    `UPDATE candidates SET name = COALESCE(?,name), url = COALESCE(?,url), price = COALESCE(?,price), note = CASE WHEN ? THEN ? ELSE note END, updated_at = ${now} WHERE id = ? AND item_id = ?`,
  )
    .bind(
      value.name ?? null,
      value.url ?? null,
      value.price ?? null,
      "note" in value ? 1 : 0,
      value.note ?? null,
      c.req.param("candidateId"),
      c.req.param("id"),
    )
    .run();

  if (!result.meta.changes) {
    throw missing();
  }

  return c.json({ data: await detail(c.env.DB, c.req.param("id")) });
});

app.delete("/items/:id/candidates/:candidateId", async (c) => {
  const id = c.req.param("id");

  const candidateId = c.req.param("candidateId");

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
  const value = await body(c.req.raw, paymentSchema);

  if (
    !(await c.env.DB.prepare("SELECT id FROM items WHERE id = ?")
      .bind(c.req.param("id"))
      .first())
  ) {
    throw missing();
  }

  await c.env.DB.prepare(
    "INSERT INTO payments(id,item_id,type,amount,paid_at,note) VALUES(?,?,?,?,?,?)",
  )
    .bind(
      crypto.randomUUID(),
      c.req.param("id"),
      value.type,
      value.amount,
      value.paidAt,
      value.note ?? null,
    )
    .run();

  return c.json({ data: await detail(c.env.DB, c.req.param("id")) }, 201);
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
