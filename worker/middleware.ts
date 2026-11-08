import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
import { MAX_INVOICE_SIZE } from "./plan/invoice";

const app = new Hono<{ Bindings: Env }>();

app.use("*", async (c, next) => {
  if (c.env.LOCAL_DEVELOPMENT !== "true") {
    return c.json(
      {
        error: {
          code: "ACCESS_NOT_CONFIGURED",
          message: "Akses privat belum dikonfigurasi.",
        },
      },
      503,
    );
  }

  c.header("Cache-Control", "no-store");

  if (!["GET", "HEAD", "OPTIONS"].includes(c.req.method)) {
    const origin = c.req.header("Origin");

    const allowed = new URL(c.req.url).origin;

    if (
      origin &&
      origin !== allowed &&
      origin !== "http://localhost:5173" &&
      origin !== "http://127.0.0.1:5173"
    ) {
      return c.json(
        {
          error: {
            code: "FORBIDDEN_ORIGIN",
            message: "Origin tidak diizinkan.",
          },
        },
        403,
      );
    }
  }

  await next();
});

app.use("/api/*", (c, next) =>
  bodyLimit({
    maxSize:
      c.req.method === "POST" &&
      /^\/api\/v1\/items\/[^/]+\/payments$/.test(c.req.path) &&
      c.req
        .header("Content-Type")
        ?.toLowerCase()
        .startsWith("multipart/form-data;")
        ? MAX_INVOICE_SIZE + 16 * 1024
        : 16 * 1024,
    onError: (c) =>
      c.json(
        {
          error: { code: "PAYLOAD_TOO_LARGE", message: "Data terlalu besar." },
        },
        413,
      ),
  })(c, next),
);

export const fallbackRoutes = new Hono<{ Bindings: Env }>();

fallbackRoutes.all("/api/*", (c) =>
  c.json(
    { error: { code: "NOT_FOUND", message: "Endpoint tidak ditemukan." } },
    404,
  ),
);

fallbackRoutes.all("*", (c) => c.env.ASSETS.fetch(c.req.raw));

export default app;
