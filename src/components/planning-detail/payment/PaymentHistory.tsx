import { PAYMENT_LABELS } from "../../../context/planning/types";
import { usePlanningCtx } from "../../../context/planning/PlanningCtxProvider";
import { formatRupiah } from "../../../utils/currency";
import {
  CalendarIcon,
  ChevronDownIcon,
  NoteIcon,
  ReceiptIcon,
} from "../../../asset";

export function PaymentHistory() {
  const { transactions } = usePlanningCtx();
  return (
    <>
      <div className="transactions-header">
        <h3 id="transactions-title">Riwayat Pembayaran</h3>
        <span className="badge counter-badge">{transactions.length}</span>
      </div>

      {transactions.length > 0 ? (
        <ul className="transactions" aria-labelledby="transactions-title">
          {transactions.map((payment) => {
            const kindKey = PAYMENT_LABELS[payment.type].toLowerCase();

            const formattedDate = new Date(
              `${payment.paidAt}T12:00:00`,
            ).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
              year: "numeric",
            });

            const fullDate = new Date(
              `${payment.paidAt}T12:00:00`,
            ).toLocaleDateString("id-ID", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            });

            return (
              <li key={payment.id} className="transaction-item">
                <details>
                  <summary>
                    <div className="transaction-meta">
                      <span
                        className="transaction-kind-badge"
                        data-kind={kindKey}
                      >
                        {PAYMENT_LABELS[payment.type]}
                        {payment.voidedAt ? " · Dibatalkan" : ""}
                      </span>
                      <span className="transaction-date-quick">
                        <CalendarIcon size={13} />
                        <time dateTime={payment.paidAt}>{formattedDate}</time>
                      </span>
                    </div>

                    <div className="transaction-value">
                      <strong className="transaction-amount">
                        {formatRupiah(payment.amount)}
                      </strong>
                      <ChevronDownIcon
                        size={16}
                        className="chevron-indicator"
                      />
                    </div>
                  </summary>

                  <div className="transaction-details">
                    <div className="detail-row">
                      <span className="detail-label">
                        <CalendarIcon size={13} />
                        Tanggal Lengkap
                      </span>
                      <span className="detail-text">{fullDate}</span>
                    </div>

                    <div className="detail-row">
                      <span className="detail-label">
                        <NoteIcon size={13} />
                        Catatan
                      </span>
                      <div className="detail-note">
                        {payment.note ? (
                          payment.note
                        ) : (
                          <span className="muted-note">Tidak ada catatan</span>
                        )}
                      </div>
                    </div>
                  </div>
                </details>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="empty-box payment-empty-box">
          <div className="empty-icon-wrap" aria-hidden="true">
            <ReceiptIcon size={28} />
          </div>
          <p className="empty-title">Belum ada riwayat pembayaran</p>
          <p className="empty-subtitle">
            Catatan pembayaran seperti DP atau cicilan akan muncul di sini
            secara rapi.
          </p>
        </div>
      )}
    </>
  );
}
