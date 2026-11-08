import { Hono } from "hono";
import type { DashboardCategoryRow } from "./types";

const app = new Hono<{ Bindings: Env }>();

app.get("/dashboard", async (c) => {
  const { results } = await c.env.DB.prepare(
    `SELECT c.id, c.slug, c.name, COUNT(i.id) AS itemCount,
    COALESCE(SUM(i.effective_amount),0) AS estimatedTotal, COALESCE(SUM(i.paid_amount),0) AS paidTotal,
    COUNT(i.selected_candidate_id) AS selectedItems FROM categories c LEFT JOIN item_finances i ON i.category_id = c.id GROUP BY c.id ORDER BY c.sort_order`,
  ).all<DashboardCategoryRow>();

  const categories = results.map((row) => ({
    ...row,
    remainingTotal: row.estimatedTotal - row.paidTotal,
  }));

  const summary = categories.reduce(
    (sum, row) => ({
      estimatedTotal: sum.estimatedTotal + row.estimatedTotal,
      paidTotal: sum.paidTotal + row.paidTotal,
      remainingTotal: sum.remainingTotal + row.remainingTotal,
      selectedItems: sum.selectedItems + row.selectedItems,
      totalItems: sum.totalItems + row.itemCount,
    }),
    {
      estimatedTotal: 0,
      paidTotal: 0,
      remainingTotal: 0,
      selectedItems: 0,
      totalItems: 0,
    },
  );
  return c.json({ data: { ...summary, categories } });
});

export default app;
