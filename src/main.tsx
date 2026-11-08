import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTES } from "./router";
import { GlobalStyle } from "./styles/GlobalStyle";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/query";

const router = createBrowserRouter(ROUTES);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalStyle />
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
