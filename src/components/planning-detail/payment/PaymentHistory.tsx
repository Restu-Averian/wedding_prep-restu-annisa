import type { Payment } from '../../../data/wedding'
import { formatRupiah } from '../../../utils/currency'

export interface PaymentHistoryProps {
  transactions: Payment[]
}

export function PaymentHistory({ transactions }: PaymentHistoryProps) {
  return (
    <>
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
                        ).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </time>
                    </dd>
                  </div>
                  <div>
                    <dt>Catatan</dt>
                    <dd>{payment.note || 'Tidak ada catatan.'}</dd>
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
    </>
  )
}

