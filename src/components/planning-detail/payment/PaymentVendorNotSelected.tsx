import { formatRupiah } from '../../../utils/currency'
import { InfoIcon, StoreIcon } from '../Icons'

export interface PaymentVendorNotSelectedProps {
  estimate: number
  onSwitchToReferences?: () => void
}

export function PaymentVendorNotSelected({
  estimate,
  onSwitchToReferences,
}: PaymentVendorNotSelectedProps) {
  return (
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
  )
}

