import { QueryClient } from "@tanstack/react-query";
import type { ItemDetail } from "../context/planning/types";

export const queryKeys = {
  categories: ["categories"] as const,
  dashboard: ["dashboard"] as const,
  lists: ["items", "list"] as const,
  list: (filters: { category: string; q: string; selection: string }) =>
    ["items", "list", filters] as const,
  detail: (itemId: string) => ["items", "detail", itemId] as const,
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 30_000, gcTime: 10 * 60_000, retry: 1 },
    mutations: { retry: false },
  },
});

export async function updateItemCache(
  client: QueryClient,
  itemId: string | undefined,
  result: ItemDetail | undefined,
  deleted = false,
) {
  if (itemId) {
    const queryKey = queryKeys.detail(itemId);

    await client.cancelQueries({ queryKey, exact: true });

    if (deleted) {
      client.removeQueries({ queryKey, exact: true });
    } else if (result) {
      client.setQueryData(queryKey, result);
    }
  }

  await Promise.all([
    client.invalidateQueries({ queryKey: queryKeys.lists }),

    client.invalidateQueries({ queryKey: queryKeys.dashboard }),

    ...(!deleted && !result && itemId
      ? [
          client.invalidateQueries({
            queryKey: queryKeys.detail(itemId),
            exact: true,
          }),
        ]
      : []),
  ]);
}
