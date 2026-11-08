import { redirect } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import WeddingLayout from "./layouts/WeddingLayout";
import Home from "./pages/Home";
import Planning from "./pages/planning";
import PlanningDetail from "./pages/planning/PlanningDetail";
import PlanningCtxProvider from "./context/planning/PlanningCtxProvider";
import NotFound from "./pages/NotFound";

export const ROUTES: RouteObject[] = [
  {
    element: <WeddingLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/rencana", element: <Planning /> },
      {
        path: "/rencana/:itemId",
        element: (
          <PlanningCtxProvider>
            <PlanningDetail />
          </PlanningCtxProvider>
        ),
      },
      { path: "/pembayaran", loader: () => redirect("/rencana") },
      { path: "*", element: <NotFound /> },
    ],
  },
];

export const routes = ROUTES;
