import {
  createContext,
  createElement,
  useContext,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { api, useApi, useItemMutation } from "../../api/client";
import { queryKeys } from "../../api/query";
import type {
  Candidate,
  DetailTabKey,
  ItemDetail,
  PlanningCtxProviderProps,
  PlanningCtxValue,
} from "./types";

const PlanningCtx = createContext<PlanningCtxValue | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const usePlanningCtx = () => {
  const context = useContext(PlanningCtx);

  if (!context) {
    throw new Error("usePlanningCtx harus di dalam PlanningCtxProvider");
  }

  return context;
};

function PlanningStateProvider({
  children,
  itemId,
}: PlanningCtxProviderProps & { itemId: string }) {
  const [activeTab, setActiveTab] = useState<DetailTabKey>("references");

  const [choosing, setChoosing] = useState(false);

  const submitting = useRef(false);

  const resource = useApi<ItemDetail>(
    `/items/${encodeURIComponent(itemId)}`,
    queryKeys.detail(itemId),
  );
  const mutation = useItemMutation(itemId);
  const client = useQueryClient();

  const item = resource.data;

  const references = item?.candidates ?? [];

  const selected = references.find(
    (candidate) => candidate.id === item?.selectedCandidateId,
  );

  async function mutate(path: string, method: string, data?: unknown) {
    if (submitting.current) {
      throw new Error("Tunggu penyimpanan sebelumnya selesai.");
    }

    submitting.current = true;

    try {
      const result = await mutation.mutateAsync({
        path: `/items/${encodeURIComponent(itemId)}${path}`,
        method,
        data,
      });

      return (
        result ??
        (await client.fetchQuery<ItemDetail>({
          queryKey: queryKeys.detail(itemId),
          queryFn: ({ signal }) =>
            api<ItemDetail>(
              `/items/${encodeURIComponent(itemId)}`,
              "GET",
              undefined,
              signal,
            ),
        }))
      );
    } finally {
      submitting.current = false;
    }
  }

  async function saveReference(candidate: Candidate, imageFile?: File) {
    const existing = references.some((entry) => entry.id === candidate.id);
    const data = new FormData();
    data.set("name", candidate.name);
    data.set("url", candidate.url);
    data.set("price", String(candidate.price));
    data.set("note", candidate.note ?? "");
    if (imageFile) data.set("image", imageFile);
    else if (!candidate.image && existing) data.set("removeImage", "true");
    await mutate(
      existing ? `/candidates/${candidate.id}` : "/candidates",
      existing ? "PATCH" : "POST",
      data,
    );
  }

  const value: PlanningCtxValue = {
    item,
    loading: resource.loading && !item,
    error: item ? undefined : resource.error,
    retry: resource.retry,
    activeTab,
    setActiveTab,
    selectedId: item?.selectedCandidateId ?? undefined,
    choosing,
    setChoosing,
    references,
    transactions: item?.payments ?? [],
    selected,
    paid: item?.financial.paidAmount ?? 0,
    total: item?.financial.effectiveAmount ?? 0,
    remaining: item?.financial.remainingAmount ?? 0,
    busy: mutation.isPending,
    mutationError: mutation.error?.message ?? "",
    mutate,
    saveReference,
  };

  return <PlanningCtx.Provider value={value}>{children}</PlanningCtx.Provider>;
}

export default function PlanningCtxProvider({
  children,
}: PlanningCtxProviderProps) {
  const { itemId = "" } = useParams();

  return createElement(PlanningStateProvider, {
    key: itemId,
    itemId,
    children,
  });
}
