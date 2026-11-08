import { Hono } from "hono";
import home from "./home";
import middleware, { fallbackRoutes } from "./middleware";
import plan, { handleApiError } from "./plan";

const app = new Hono<{ Bindings: Env }>();

app.route("/", middleware);
app.route("/api/v1", home);
app.route("/api/v1", plan);
app.route("/", fallbackRoutes);
app.onError(handleApiError);

export default app;
