import { Hono } from "hono";
import { z } from "zod";
import type { ItemRow } from "./types";
import {
  ApiError,
  body,
  detail,
  itemQuery,
  itemSchema,
  itemView,
} from "./helpers";
import planDetail from "./plan-detail";

export { handleApiError } from "./helpers";

const app = new Hono<{ Bindings: Env }>();

app.get("/categories", async (c) => {
  const { results } = await c.env.DB.prepare(
    "SELECT id, slug, name, sort_order AS sortOrder FROM categories ORDER BY sort_order",
  ).all();

  return c.json({ data: results, meta: { total: results.length } });
});

app.get("/items", async (c) => {
  const query = z
    .object({
      category: z.string().max(100).optional(),
      q: z.string().max(120).optional(),
      selection: z.enum(["all", "selected", "unselected"]).default("all"),
    })
    .safeParse(c.req.query());

  if (!query.success) {
    throw new ApiError("VALIDATION_ERROR", 422, "Filter tidak valid.");
  }

  const { category, q, selection } = query.data;

  const { results } = await c.env.DB.prepare(
    `${itemQuery} WHERE (? IS NULL OR category_slug = ?) AND (? = '' OR instr(lower(name), lower(?)) > 0)
    AND (? = 'all' OR (? = 'selected' AND selected_candidate_id IS NOT NULL) OR (? = 'unselected' AND selected_candidate_id IS NULL)) ORDER BY created_at, id`,
  )
    .bind(
      category ?? null,
      category ?? null,
      q?.trim() ?? "",
      q?.trim() ?? "",
      selection,
      selection,
      selection,
    )
    .all<ItemRow>();

  return c.json({
    data: results.map(itemView),
    meta: { total: results.length },
  });
});

app.post("/items", async (c) => {
  const value = await body(c.req.raw, itemSchema);
  const id = crypto.randomUUID();
  await c.env.DB.prepare(
    "INSERT INTO items(id, category_id, name, estimated_amount) VALUES(?,?,?,?)",
  )
    .bind(id, value.categoryId, value.name, value.estimatedAmount)
    .run();
  return c.json({ data: await detail(c.env.DB, id) }, 201);
});

app.route("/", planDetail);

export default app;
