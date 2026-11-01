import type { Candidate, Payment } from "../../../data/wedding";
import { formatRupiah } from "../../../utils/currency";
import { CheckIcon, InfoIcon, PlusIcon, StoreIcon } from "./Icons";

export interface PaymentSectionProps {
  selected?: Candidate;
  estimate: number;
  paid: number;
  remaining: number;
  status: string;
  transactions: Payment[];
  onOpenPayment: () => void;
  onSwitchToReferences?: () => void;
}

export function PaymentSection({
  selected,
  estimate,
  paid,
  remaining,
  status,
  transactions,
  onOpenPayment,
  onSwitchToReferences,
}: PaymentSectionProps) {
  const total = selected ? selected.price : estimate;

  return (
    <section
      id="panel-payments"
      role="tabpanel"
      aria-labelledby="tab-payments"
      className="detail-section"
    >
      <div className="section-heading">
        <h2 id="payments-title">Pembayaran</h2>
        <span
          className="badge"
          data-status={status.toLowerCase().replace(/\s+/g, "-")}
          data-selected={status === "Lunas"}
        >
          {status === "Lunas" && <CheckIcon size={12} />}
          {status}
        </span>
      </div>

      {!selected && (
        <div className="notice-box payment-notice">
          <div className="notice-content">
            <InfoIcon size={20} />
            <div>
              <strong>Vendor final belum dipilih.</strong>
              <p>
                Perhitungan di bawah menggunakan estimasi awal kebutuhan (
                {formatRupiah(estimate)}). Anda dapat memilih vendor terlebih
                dahulu di tab Referensi atau langsung mencatat pembayaran
                DP/booking.
              </p>
            </div>
          </div>
          {onSwitchToReferences && (
            <button
              type="button"
              className="secondary select-vendor-shortcut"
              onClick={onSwitchToReferences}
            >
              <StoreIcon size={16} />
              <span>Pilih Vendor Sekarang</span>
            </button>
          )}
        </div>
      )}

      <div className="payment-summary-cards">
        <div className="summary-card card-total">
          <span className="summary-label">
            {selected ? "Harga Pilihan" : "Estimasi Budget"}
          </span>
          <strong className="summary-value">{formatRupiah(total)}</strong>
          {selected && <span className="summary-sub">{selected.name}</span>}
        </div>

        <div className="summary-card card-paid">
          <span className="summary-label">Sudah Dibayar</span>
          <strong className="summary-value">{formatRupiah(paid)}</strong>
          <span className="summary-sub">
            {transactions.length} kali pembayaran
          </span>
        </div>

        <div className="summary-card card-remaining">
          <span className="summary-label">Sisa Pembayaran</span>
          <strong className="summary-value">{formatRupiah(remaining)}</strong>
          <span className="summary-sub">
            {remaining === 0 ? "Sudah Lunas" : "Belum Lunas"}
          </span>
        </div>
      </div>

      <div className="transactions-header">
        <h3 id="transactions-title">Riwayat Pembayaran</h3>
        <span className="badge counter-badge">{transactions.length}</span>
      </div>

      {transactions.length > 0 ? (
        <ul className="transactions" aria-labelledby="transactions-title">
          {transactions.map((payment) => (
            <li key={payment.id} className="transaction-item">
              <details>
                <summary>
                  <span className="transaction-kind">{payment.kind}</span>
                  <strong className="transaction-amount">
                    {formatRupiah(payment.amount)}
                  </strong>
                </summary>
                <dl className="transaction-details">
                  <div>
                    <dt>Tanggal</dt>
                    <dd>
                      <time dateTime={payment.date}>
                        {new Date(
                          `${payment.date}T12:00:00`,
                        ).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </time>
                    </dd>
                  </div>
                  <div>
                    <dt>Catatan</dt>
                    <dd>{payment.note || "Tidak ada catatan."}</dd>
                  </div>
                </dl>
              </details>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty-box">
          <p className="muted">Belum ada transaksi pembayaran tercatat.</p>
        </div>
      )}

      {remaining > 0 && (
        <button
          className="primary action-pay-btn"
          type="button"
          onClick={onOpenPayment}
        >
          <PlusIcon size={18} />
          <span>Catat Pembayaran</span>
        </button>
      )}

      <p className="hint">
        Simulasi lokal. Data kembali ke contoh saat halaman dimuat ulang atau
        ditinggalkan.
      </p>
    </section>
  );
}
