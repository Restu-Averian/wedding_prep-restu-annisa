import { Link, useSearchParams } from "react-router-dom";
import { Header } from "../../components/planning-detail/Header";
import { Tabs } from "../../components/planning-detail/Tabs";
import { ReferenceSection } from "../../components/planning-detail/references";
import { PaymentSection } from "../../components/planning-detail/payment";
import { usePlanningCtx } from "../../context/planning/PlanningCtxProvider";
import { DetailPage } from "../../styles/PlanningDetail.styles";

export default function PlanningDetail() {
  const { item, activeTab } = usePlanningCtx();

  const [params] = useSearchParams();

  const BACK_TO = `/rencana${params.size ? `?${params}` : ""}`;

  if (!item) {
    return (
      <DetailPage>
        <Link className="text-link" to={BACK_TO}>
          ← Kembali ke Rencana
        </Link>

        <h1>Kebutuhan tidak ditemukan</h1>
        <p>Pilih kebutuhan lain dari halaman Rencana.</p>
      </DetailPage>
    );
  }

  return (
    <DetailPage>
      <Link className="text-link" to={BACK_TO}>
        ← Kembali ke Rencana
      </Link>

      <Header />

      <Tabs />

      {activeTab === "references" ? <ReferenceSection /> : <PaymentSection />}
    </DetailPage>
  );
}
