import { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Header } from "../../components/planning/planning-detail/Header";
import {
  DetailTabs,
  type DetailTabKey,
} from "../../components/planning/planning-detail/DetailTabs";
import { ReferenceSection } from "../../components/planning/planning-detail/ReferenceSection";
import { PaymentSection } from "../../components/planning/planning-detail/PaymentSection";
import { PaymentDrawer } from "../../components/planning/planning-detail/PaymentDrawer";
import { ReferenceDrawer } from "../../components/planning/planning-detail/ReferenceDrawer";
import { categories, items, candidates, payments } from "../../data/wedding";
import type { Payment, Candidate } from "../../data/wedding";
import { DetailPage } from "../../styles/PlanningDetail.styles";

export default function PlanningDetail() {
  const { itemId } = useParams();

  const [params] = useSearchParams();

  const item = items.find(({ id }) => id === itemId);

  const backTo = `/rencana${params.size ? `?${params}` : ""}`;

  const [activeTab, setActiveTab] = useState<DetailTabKey>("references");
  const [selectedId, setSelectedId] = useState(item?.selectedCandidateId);
  const [choosing, setChoosing] = useState(!item?.selectedCandidateId);
  const [transactions, setTransactions] = useState(() =>
    item ? payments.filter((payment) => payment.itemId === item.id) : [],
  );
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [references, setReferences] = useState(() =>
    item ? candidates.filter((candidate) => candidate.itemId === item.id) : [],
  );
  const [referenceDraft, setReferenceDraft] = useState<
    Candidate | null | undefined
  >(undefined);

  if (!item) {
    return (
      <DetailPage>
        <Link className="text-link" to={backTo}>
          ← Kembali ke Rencana
        </Link>
        <h1>Kebutuhan tidak ditemukan</h1>
        <p>Pilih kebutuhan lain dari halaman Rencana.</p>
      </DetailPage>
    );
  }

  const category = categories.find(({ id }) => id === item.categoryId);
  const selected = references.find(({ id }) => id === selectedId);
  const paid = transactions.reduce((sum, payment) => sum + payment.amount, 0);
  const total = selected ? selected.price : item.estimate;
  const remaining = Math.max(0, total - paid);

  const paymentStatus = !selected
    ? "Belum Ada Vendor"
    : remaining === 0
      ? "Lunas"
      : paid > 0
        ? "Belum Lunas"
        : "Belum Bayar";

  function recordPayment(payment: Omit<Payment, "id" | "itemId">) {
    setTransactions((previous) => [
      ...previous,
      { ...payment, id: crypto.randomUUID(), itemId: item!.id },
    ]);
  }

  function saveReference(reference: Candidate) {
    setReferences((previous) =>
      previous.some(({ id }) => id === reference.id)
        ? previous.map((candidate) =>
            candidate.id === reference.id ? reference : candidate,
          )
        : [...previous, reference],
    );
    setReferenceDraft(undefined);
    if (!referenceDraft) setChoosing(true);
  }

  function selectCandidate(candidateId: string) {
    setSelectedId(candidateId);
    setChoosing(false);
  }

  return (
    <DetailPage>
      <Link className="text-link" to={backTo}>
        ← Kembali ke Rencana
      </Link>
      <Header categoryName={category?.name} itemName={item.name} />

      <DetailTabs
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        referenceCount={references.length}
      />

      {activeTab === "references" ? (
        <ReferenceSection
          references={references}
          selected={selected}
          selectedId={selectedId}
          choosing={choosing}
          paid={paid}
          onSelect={selectCandidate}
          onToggleChoosing={() => setChoosing(!choosing)}
          onEdit={(candidate) => setReferenceDraft(candidate)}
          onAdd={() => setReferenceDraft(null)}
        />
      ) : (
        <PaymentSection
          selected={selected}
          estimate={item.estimate}
          paid={paid}
          remaining={remaining}
          status={paymentStatus}
          transactions={transactions}
          onOpenPayment={() => setDrawerOpen(true)}
          onSwitchToReferences={() => setActiveTab("references")}
        />
      )}

      {drawerOpen && (
        <PaymentDrawer
          itemName={item.name}
          remaining={remaining}
          onSave={recordPayment}
          onClose={() => setDrawerOpen(false)}
        />
      )}

      {referenceDraft !== undefined && (
        <ReferenceDrawer
          itemId={item.id}
          candidate={referenceDraft}
          minimumPrice={
            referenceDraft?.id === selectedId ? Math.max(1, paid) : 1
          }
          onSave={saveReference}
          onClose={() => setReferenceDraft(undefined)}
        />
      )}
    </DetailPage>
  );
}
