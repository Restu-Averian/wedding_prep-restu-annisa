import { usePlanningCtx } from '../../../context/planning/PlanningCtxProvider'
import { formatRupiah } from '../../../utils/currency'
import { CheckIcon, ClockIcon, WalletIcon } from '../../../asset'

export function PaymentSummaryCards() {
  const { selected, total, paid, remaining, transactions } = usePlanningCtx()
  const transactionCount = transactions.length
  const paidPercent = total > 0 ? Math.min(100, Math.round((paid / total) * 100)) : 0
  const isLunas = remaining === 0

  return (
    <div className="payment-summary-cards">
      <div className="summary-card card-total">
        <div className="card-header">
          <div className="summary-icon-wrapper" aria-hidden="true">
            <WalletIcon size={15} />
          </div>
          <span className="summary-label">
            {selected ? 'Harga Pilihan' : 'Estimasi Budget'}
          </span>
        </div>
        <strong className="summary-value">{formatRupiah(total)}</strong>
        <span className="summary-sub">
          {selected ? selected.name : 'Estimasi awal'}
        </span>
      </div>

      <div className="summary-card card-paid">
        <div className="card-header">
          <div className="summary-icon-wrapper" aria-hidden="true">
            <CheckIcon size={13} />
          </div>
          <span className="summary-label">Sudah Dibayar</span>
        </div>
        <strong className="summary-value">{formatRupiah(paid)}</strong>
        <span className="summary-sub">
          {paidPercent}% • {transactionCount}x bayar
        </span>
      </div>

      <div
        className="summary-card card-remaining"
        data-lunas={isLunas}
      >
        <div className="card-header">
          <div className="summary-icon-wrapper" aria-hidden="true">
            {isLunas ? <CheckIcon size={13} /> : <ClockIcon size={14} />}
          </div>
          <span className="summary-label">Sisa Pembayaran</span>
        </div>
        <strong className="summary-value">{formatRupiah(remaining)}</strong>
        <span className="summary-sub">
          {isLunas ? '✓ Sudah Lunas' : 'Belum Lunas'}
        </span>
      </div>
    </div>
  )
}


