import type { ErrorHandler } from "hono";
import { z } from "zod";
import type { ItemRow } from "./types";

export const amount = z.number().int().min(0).max(1_000_000_000_000);

export const name = z.string().trim().min(1).max(120);

export const itemSchema = z
  .object({
    name,
    categoryId: z.string().min(1).max(100),
    estimatedAmount: amount,
  })
  .strict();

export const messages: Record<string, string> = {
  FINANCIAL_HISTORY:
    "Data terkunci karena sudah memiliki riwayat pembayaran, termasuk transaksi dibatalkan.",
  SELECTION_REQUIRED: "Pilih kandidat final terlebih dahulu.",
  INVALID_SELECTION: "Kandidat harus berasal dari kebutuhan ini.",
  OVERPAYMENT: "Nominal melebihi sisa pembayaran.",
  PAYMENT_VOIDED: "Pembayaran yang dibatalkan tidak dapat diubah.",
};

export class ApiError extends Error {
  constructor(
    public code: string,
    public status: 400 | 404 | 409 | 422,
    message: string,
  ) {
    super(message);
  }
}

export function missing() {
  return new ApiError("NOT_FOUND", 404, "Data tidak ditemukan.");
}

export async function body<T>(request: Request, schema: z.ZodType<T>): Promise<T> {
  let value: unknown;
  try {
    value = await request.json();
  } catch {
    throw new ApiError("INVALID_JSON", 400, "JSON tidak valid.");
  }
  const result = schema.safeParse(value);
  if (!result.success)
    throw new ApiError(
      "VALIDATION_ERROR",
      422,
      result.error.issues
        .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
        .join("; "),
    );
  return result.data;
}

export const itemQuery = `SELECT *, effective_amount - paid_amount AS remaining_amount FROM item_finances`;

export function itemView(row: ItemRow) {
  return {
    id: row.id,
    name: row.name,
    categoryId: row.category_id,
    category: {
      id: row.category_id,
      slug: row.category_slug,
      name: row.category_name,
    },
    estimatedAmount: row.estimated_amount,
    selectedCandidateId: row.selected_candidate_id,
    agreedAmount: row.agreed_amount,
    financial: {
      effectiveAmount: row.effective_amount,
      paidAmount: row.paid_amount,
      remainingAmount: row.remaining_amount,
      status:
        row.remaining_amount === 0
          ? "paid"
          : row.paid_amount > 0
            ? "partial"
            : "unpaid",
    },
  };
}

export async function detail(db: D1Database, id: string) {
  // A D1 batch reads item, candidates and history from one consistent transaction.
  const [items, candidates, payments] = await db.batch([
    db.prepare(`${itemQuery} WHERE id = ?`).bind(id),

    db
      .prepare(
        "SELECT id, item_id AS itemId, name, url, price, note FROM candidates WHERE item_id = ? ORDER BY created_at, id",
      )
      .bind(id),

    db
      .prepare(
        "SELECT id, item_id AS itemId, type, amount, paid_at AS paidAt, note, voided_at AS voidedAt FROM payments WHERE item_id = ? ORDER BY paid_at DESC, created_at DESC, id",
      )
      .bind(id),
  ]);

  if (!items.results[0]) throw missing();

  return {
    ...itemView(items.results[0] as ItemRow),
    candidates: candidates.results,
    payments: payments.results,
  };
}

export const handleApiError: ErrorHandler<{ Bindings: Env }> = (error, c) => {
  if (error instanceof ApiError)
    return c.json(
      { error: { code: error.code, message: error.message } },
      error.status,
    );
  for (const [code, message] of Object.entries(messages)) {
    if (error.message.includes(code))
      return c.json({ error: { code, message } }, 409);
  }
  if (error.message.includes("FOREIGN KEY constraint"))
    return c.json(
      {
        error: {
          code: "RELATION_CONFLICT",
          message: "Relasi data tidak valid atau masih digunakan.",
        },
      },
      409,
    );
  if (error.message.includes("CHECK constraint"))
    return c.json(
      {
        error: { code: "VALIDATION_ERROR", message: "Nilai data tidak valid." },
      },
      422,
    );
  return c.json(
    {
      error: {
        code: "INTERNAL_ERROR",
        message: "Terjadi kesalahan server. Coba kembali.",
      },
    },
    500,
  );
};

