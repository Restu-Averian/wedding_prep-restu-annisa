import type { Dispatch, ReactNode, SetStateAction } from "react";

export interface Category {
  id: string;
  slug: string;
  name: string;
}

export interface Financial {
  effectiveAmount: number;
  paidAmount: number;
  remainingAmount: number;
  status: "unpaid" | "partial" | "paid";
}

export interface WeddingItem {
  id: string;
  name: string;
  categoryId: string;
  category: Category;
  estimatedAmount: number;
  selectedCandidateId: string | null;
  agreedAmount: number | null;
  financial: Financial;
}
export interface Candidate {
  id: string;
  itemId: string;
  name: string;
  price: number;
  url: string;
  note?: string | null;
  image?: string;
}
export interface Payment {
  invoice: { name: string; type: string; size: number } | null;
  id: string;
  itemId: string;
  type: "deposit" | "installment" | "settlement";
  amount: number;
  paidAt: string;
  note?: string | null;
  voidedAt: string | null;
}
export interface ItemDetail extends WeddingItem {
  candidates: Candidate[];
  payments: Payment[];
}
export interface Dashboard {
  estimatedTotal: number;
  paidTotal: number;
  remainingTotal: number;
  selectedItems: number;
  totalItems: number;
  categories: (Category & {
    estimatedTotal: number;
    paidTotal: number;
    remainingTotal: number;
    itemCount: number;
  })[];
}

export const PAYMENT_LABELS = {
  deposit: "DP",
  installment: "Cicilan",
  settlement: "Pelunasan",
};

export type DetailTabKey = "references" | "payments";
export interface PlanningCtxProviderProps {
  children: ReactNode;
}
export interface PlanningCtxValue {
  item: ItemDetail | undefined;
  loading: boolean;
  error?: string;
  retry: () => void;
  activeTab: DetailTabKey;
  setActiveTab: Dispatch<SetStateAction<DetailTabKey>>;
  selectedId: string | undefined;
  choosing: boolean;
  setChoosing: Dispatch<SetStateAction<boolean>>;
  references: Candidate[];
  transactions: Payment[];
  selected: Candidate | undefined;
  paid: number;
  total: number;
  remaining: number;
  busy: boolean;
  mutationError: string;
  mutate: (path: string, method: string, data?: unknown) => Promise<ItemDetail>;
  saveReference: (candidate: Candidate) => Promise<void>;
}
