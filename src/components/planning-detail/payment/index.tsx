import { useState } from 'react'
import type { Candidate, Payment } from '../../../data/wedding'
import { CheckIcon, PlusIcon } from '../Icons'
import { PaymentDrawer } from './PaymentDrawer'
import { PaymentVendorNotSelected } from './PaymentVendorNotSelected'
import { PaymentSummaryCards } from './PaymentSummaryCards'
import { PaymentHistory } from './PaymentHistory'

export { PaymentVendorNotSelected } from './PaymentVendorNotSelected'
export { PaymentSummaryCards } from './PaymentSummaryCards'
export { PaymentHistory } from './PaymentHistory'
export { PaymentDrawer } from './PaymentDrawer'

export interface PaymentSectionProps {
  itemName: string
  selected?: Candidate
  estimate: number
  paid: number
  remaining: number
  status: string
  transactions: Payment[]
  // eslint-disable-next-line no-unused-vars
  onSavePayment: (payment: Omit<Payment, 'id' | 'itemId'>) => void
  onSwitchToReferences?: () => void
}

export function PaymentSection({
  itemName,
  selected,
  estimate,
  paid,
  remaining,
  status,
  transactions,
  onSavePayment,
  onSwitchToReferences,
}: PaymentSectionProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const total = selected ? selected.price : estimate

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
          data-status={status.toLowerCase().replace(/\s+/g, '-')}
          data-selected={status === 'Lunas'}
        >
          {status === 'Lunas' && <CheckIcon size={12} />}
          {status}
        </span>
      </div>

      {!selected && (
        <PaymentVendorNotSelected
          estimate={estimate}
          onSwitchToReferences={onSwitchToReferences}
        />
      )}

      <PaymentSummaryCards
        selected={selected}
        total={total}
        paid={paid}
        remaining={remaining}
        transactionCount={transactions.length}
      />

      <PaymentHistory transactions={transactions} />

      {remaining > 0 && (
        <button
          className="primary action-pay-btn"
          type="button"
          onClick={() => setDrawerOpen(true)}
        >
          <PlusIcon size={18} />
          <span>Catat Pembayaran</span>
        </button>
      )}

      <p className="hint">
        Simulasi lokal. Data kembali ke contoh saat halaman dimuat ulang atau
        ditinggalkan.
      </p>

      {drawerOpen && (
        <PaymentDrawer
          itemName={itemName}
          remaining={remaining}
          onSave={onSavePayment}
          onClose={() => setDrawerOpen(false)}
        />
      )}
    </section>
  )
}

export default PaymentSection
