import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { QueryKey } from "@tanstack/react-query";
import type { ItemDetail } from "../context/planning/types";
import { updateItemCache } from "./query";

export async function api<T>(
  path: string,
  method = "GET",
  data?: unknown,
  signal?: AbortSignal,
): Promise<T> {
  const response = await fetch(`/api/v1${path}`, {
    method,
    signal,
    headers:
      data === undefined || data instanceof FormData
        ? undefined
        : { "Content-Type": "application/json" },
    body:
      data === undefined
        ? undefined
        : data instanceof FormData
          ? data
          : JSON.stringify(data),
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      payload?.error?.message ?? "Server tidak dapat dihubungi. Coba kembali.",
    );
  }

  if (!payload || !("data" in payload)) {
    throw new Error("Respons server tidak valid.");
  }

  if (payload.meta?.referenceSaved) {
    const error = new Error("Referensi sudah tersimpan. Tutup form dan muat ulang halaman untuk melihat perubahan; jangan kirim ulang.");
    error.name = "ReferenceSavedError";
    throw error;
  }

  if (payload.meta?.paymentSaved) {
    const error = new Error(
      "Pembayaran sudah tersimpan. Tutup form dan muat ulang halaman untuk melihat riwayat; jangan catat pembayaran yang sama lagi.",
    );
    error.name = "PaymentSavedError";
    throw error;
  }

  return payload.data as T;
}

export function useApi<T>(
  path: string,
  queryKey: QueryKey,
  staleTime = 30_000,
) {
  const query = useQuery({
    queryKey,
    queryFn: ({ signal }) => api<T>(path, "GET", undefined, signal),
    staleTime,
  });

  return {
    data: query.data,
    error: query.error?.message,
    loading: query.isPending,
    retry: () => {
      void query.refetch();
    },
  };
}

export function useItemMutation(itemId?: string) {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({
      path,
      method,
      data,
    }: {
      path: string;
      method: string;
      data?: unknown;
    }) => api<ItemDetail | undefined>(path, method, data),
    onSuccess: (result, { path, method }) =>
      updateItemCache(
        client,
        itemId ?? result?.id,
        result,
        method === "DELETE" &&
          path === `/items/${encodeURIComponent(itemId ?? "")}`,
      ),
  });
}
