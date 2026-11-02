import { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Header } from "../../components/planning-detail/Header";
import {
  Tabs,
  type DetailTabKey,
} from "../../components/planning-detail/Tabs";
import { ReferenceSection } from "../../components/planning-detail/references";
import { PaymentSection } from "../../components/planning-detail/payment";
import {
  CATEGORIES,
  ITEMS,
  CANDIDATES,
  PAYMENTS,
  type Payment,
  type Candidate,
} from "../../data/wedding";
import { DetailPage } from "../../styles/PlanningDetail.styles";

export default function PlanningDetail() {
  const { itemId } = useParams();
  const [params] = useSearchParams();
  const item = ITEMS.find(({ id }) => id === itemId);
  const backTo = `/rencana${params.size ? `?${params}` : ""}`;

  const [activeTab, setActiveTab] = useState<DetailTabKey>("references");
  const [selectedId, setSelectedId] = useState(item?.selectedCandidateId);
  const [choosing, setChoosing] = useState(!item?.selectedCandidateId);
  const [transactions, setTransactions] = useState(() =>
    item ? PAYMENTS.filter((payment) => payment.itemId === item.id) : [],
  );
  const [references, setReferences] = useState(() =>
    item ? CANDIDATES.filter((candidate) => candidate.itemId === item.id) : [],
  );

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

  const category = CATEGORIES.find(({ id }) => id === item.categoryId);
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

      <Tabs
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        referenceCount={references.length}
      />

      {activeTab === "references" ? (
        <ReferenceSection
          itemId={item.id}
          references={references}
          selected={selected}
          selectedId={selectedId}
          choosing={choosing}
          paid={paid}
          onSelect={selectCandidate}
          onToggleChoosing={() => setChoosing(!choosing)}
          onSaveReference={saveReference}
          onAfterSave={() => setChoosing(true)}
        />
      ) : (
        <PaymentSection
          itemName={item.name}
          selected={selected}
          estimate={item.estimate}
          paid={paid}
          remaining={remaining}
          status={paymentStatus}
          transactions={transactions}
          onSavePayment={recordPayment}
          onSwitchToReferences={() => setActiveTab("references")}
        />
      )}
    </DetailPage>
  );
}
