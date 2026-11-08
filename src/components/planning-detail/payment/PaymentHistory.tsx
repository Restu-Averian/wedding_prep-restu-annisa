import { useRef, useState } from "react";
import { PAYMENT_LABELS, type Payment } from "../../../context/planning/types";
import { usePlanningCtx } from "../../../context/planning/PlanningCtxProvider";
import { formatRupiah } from "../../../utils/currency";
import {
  CalendarIcon,
  ChevronDownIcon,
  NoteIcon,
  ReceiptIcon,
} from "../../../asset";
import { useConfirm } from "../../../context/ConfirmContext";

export default function PaymentHistory({
  onEdit,
}: {
  onEdit?: (payment: Payment) => void;
}) {
  const [feedback, setFeedback] = useState<{
    id: string;
    message: string;
    error: boolean;
  }>();
  const [needsReload, setNeedsReload] = useState(false);
  const [deletingId, setDeletingId] = useState<string>();
  const submitting = useRef(false);
  const confirm = useConfirm();
  const { transactions, busy, mutate } = usePlanningCtx();

  async function removePayment(payment: Payment) {
    if (busy || submitting.current || needsReload || payment.voidedAt) {
      return;
    }

    const confirmed = await confirm({
      title: "Batalkan Pembayaran",
      message: `Hapus pembayaran ${formatRupiah(payment.amount)}? Pembayaran akan ditandai dibatalkan dan tidak dihitung dalam total terbayar.`,
      confirmText: "Batalkan Pembayaran",
      tone: "danger",
    });

    if (!confirmed) {
      return;
    }

    submitting.current = true;
    setDeletingId(payment.id);
    setFeedback(undefined);
    try {
      await mutate(`/payments/${encodeURIComponent(payment.id)}`, "DELETE");
      setFeedback({
        id: payment.id,
        message: "Pembayaran dibatalkan. Total terbayar diperbarui.",
        error: false,
      });
    } catch (error) {
      if (error instanceof Error && error.name === "MutationSavedError") {
        setNeedsReload(true);
      }

      setFeedback({
        id: payment.id,
        message:
          error instanceof Error ? error.message : "Pembayaran gagal dihapus.",
        error: true,
      });
    } finally {
      submitting.current = false;
      setDeletingId(undefined);
    }
  }

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
                    {payment.invoice && (
                      <div className="detail-row">
                        <span className="detail-label">
                          <ReceiptIcon size={13} />
                          Invoice
                        </span>

                        <a
                          href={`/api/v1/items/${encodeURIComponent(payment.itemId)}/payments/${encodeURIComponent(payment.id)}/invoice`}
                          download
                        >
                          Unduh invoice · {payment.invoice.name}
                        </a>
                      </div>
                    )}

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
                    {!payment.voidedAt && (
                      <div className="payment-history-actions">
                        {onEdit && (
                          <button
                            type="button"
                            disabled={busy || !!deletingId || needsReload}
                            onClick={() => onEdit(payment)}
                            aria-label={`Edit pembayaran ${formatRupiah(payment.amount)}`}
                          >
                            Edit
                          </button>
                        )}
                        <button
                          type="button"
                          className="payment-delete-btn"
                          disabled={busy || !!deletingId || needsReload}
                          onClick={() => {
                            void removePayment(payment);
                          }}
                          aria-label={`Hapus pembayaran ${formatRupiah(payment.amount)}`}
                        >
                          {deletingId === payment.id ? "Menghapus…" : "Hapus"}
                        </button>
                      </div>
                    )}
                    {feedback?.id === payment.id && (
                      <p role={feedback.error ? "alert" : "status"}>
                        {feedback.message}
                      </p>
                    )}
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
