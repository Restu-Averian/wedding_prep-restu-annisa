import { Link } from "react-router-dom";
import { useApi } from "../api/client";
import type { Dashboard } from "../context/planning/types";
import { CategoryGrid } from "../components/home/CategoryGrid";
import { FinancialCard } from "../components/home/FinancialCard";
import { Header } from "../components/home/Header";
import { StatusFeedback } from "../components/common/StatusFeedback";
import {
  FinancialCardSkeleton,
  CategoryGridSkeleton,
} from "../components/common/Skeletons";
import { HomeDashboard } from "../styles/Home.styles";

export default function Home() {
  const { data, loading, error, retry } = useApi<Dashboard>("/dashboard");
  const isAccessError = error ? /akses|origin|forbidden/i.test(error) : false;

  return (
    <HomeDashboard>
      <Header />

      {loading && (
        <>
          <FinancialCardSkeleton />
          <CategoryGridSkeleton />
        </>
      )}

      {error && (
        <StatusFeedback
          type={isAccessError ? "access" : "error"}
          title={
            isAccessError ? "Akses Privat Dibatasi" : "Gagal Memuat Ringkasan"
          }
          message={error}
          onRetry={retry}
        />
      )}

      {data && (
        <>
          <FinancialCard dashboard={data} />
          {data.totalItems === 0 && (
            <StatusFeedback
              type="empty"
              title="Belum Ada Kebutuhan"
              message="Belum ada pos kebutuhan yang dicatat. Mulai atur rencana dan referensi vendor hari bahagia Anda."
              action={
                <Link to="/rencana" className="primary-btn">
                  Buka Rencana
                </Link>
              }
            />
          )}
          <CategoryGrid categories={data.categories} />
        </>
      )}
    </HomeDashboard>
  );
}
