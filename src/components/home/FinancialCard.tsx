import type { Dashboard } from "../../context/planning/types";
import { formatRupiah } from "../../utils/currency";
export default function FinancialCard({ dashboard }: { dashboard: Dashboard }) {
  return (
    <section className="financial-card" aria-labelledby="financial-title">
      <h2 id="financial-title" className="sr-only">
        Ringkasan Biaya
      </h2>

      <div className="financial-col main">
        <span className="stat-label">Total Estimasi Pernikahan</span>
        <p className="stat-value total">{formatRupiah(dashboard.estimatedTotal)}</p>
      </div>

      <div className="financial-col sub">
        <div className="sub-stat">
          <span className="stat-label">Sudah Dibayar</span>
          <p className="stat-value paid">{formatRupiah(dashboard.paidTotal)}</p>
        </div>

        <div className="sub-stat">
          <span className="stat-label">Sisa Pembayaran</span>
          <p className="stat-value paid">{formatRupiah(dashboard.remainingTotal)}</p>
        </div>
      </div>
    </section>
  );
}
