import { Link, useSearchParams } from "react-router-dom";
import Header from "../../components/planning-detail/Header";
import Tabs from "../../components/planning-detail/Tabs";
import ReferenceSection from "../../components/planning-detail/references";
import PaymentSection from "../../components/planning-detail/payment";
import { StatusFeedback } from "../../components/common/StatusFeedback";
import { DetailSkeleton } from "../../components/common/Skeletons";
import { usePlanningCtx } from "../../context/planning/PlanningCtxProvider";
import {
  DetailPage,
  DetailTopBar,
  BackLink,
} from "../../styles/PlanningDetail.styles";
import { ChevronLeftIcon } from "../../asset";

export default function PlanningDetail() {
  const { item, activeTab, selected, loading, error, retry, mutationError } =
    usePlanningCtx();

  const [params] = useSearchParams();

  const BACK_TO = `/rencana${params.size ? `?${params}` : ""}`;

  if (loading) {
    return (
      <DetailPage>
        <DetailSkeleton />
      </DetailPage>
    );
  }

  if (error) {
    const isAccess = /akses|origin|forbidden/i.test(error);
    return (
      <DetailPage>
        <DetailTopBar>
          <BackLink to={BACK_TO} aria-label="Kembali ke daftar rencana">
            <ChevronLeftIcon size={18} />
            <span className="back-label-mobile">Rencana</span>
            <span className="back-label-desktop">Kembali ke Rencana</span>
          </BackLink>
        </DetailTopBar>

        <StatusFeedback
          type={isAccess ? "access" : "error"}
          title={isAccess ? "Akses Dibatasi" : "Gagal Memuat Kebutuhan"}
          message={error}
          onRetry={retry}
        />
      </DetailPage>
    );
  }

  if (!item) {
    return (
      <DetailPage>
        <DetailTopBar>
          <BackLink to={BACK_TO} aria-label="Kembali ke daftar rencana">
            <ChevronLeftIcon size={18} />
            <span className="back-label-mobile">Rencana</span>
            <span className="back-label-desktop">Kembali ke Rencana</span>
          </BackLink>
        </DetailTopBar>

        <StatusFeedback
          type="empty"
          title="Kebutuhan Tidak Ditemukan"
          message="Kebutuhan ini tidak ada dalam daftar atau mungkin telah dihapus."
          action={
            <Link to={BACK_TO} className="primary-btn">
              Kembali ke Rencana
            </Link>
          }
        />
      </DetailPage>
    );
  }

  return (
    <DetailPage>
      <DetailTopBar>
        <BackLink to={BACK_TO} aria-label="Kembali ke daftar rencana">
          <ChevronLeftIcon size={18} />
          <span className="back-label-mobile">Rencana</span>
          <span className="back-label-desktop">Kembali ke Rencana</span>
        </BackLink>

        <span className="top-bar-title">{item.name}</span>

        {item.category?.name && (
          <span className="top-bar-pill">{item.category.name}</span>
        )}
      </DetailTopBar>

      <Header />

      <Tabs />
      {mutationError && (
        <StatusFeedback inline type="error" message={mutationError} />
      )}

      {activeTab === "references" || !selected ? (
        <ReferenceSection />
      ) : (
        <PaymentSection />
      )}
    </DetailPage>
  );
}
