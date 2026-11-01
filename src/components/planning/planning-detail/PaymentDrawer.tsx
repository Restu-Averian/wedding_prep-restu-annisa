import { useState, useRef, useEffect, useCallback, type MouseEvent } from 'react'
import { PaymentSheet } from '../../../styles/Planning.styles'

export interface PaymentDrawerProps {
  itemName: string
  onClose: () => void
}

export function PaymentDrawer({ itemName, onClose }: PaymentDrawerProps) {
  const [submitted, setSubmitted] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  const handleClose = useCallback(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      dialogRef.current?.close()
      return
    }
    setIsClosing(true)
  }, [])

  function handleAnimationEnd() {
    if (isClosing) {
      dialogRef.current?.close()
    }
  }

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === dialogRef.current) {
      const rect = dialogRef.current.getBoundingClientRect()
      const isInside =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      if (!isInside) {
        handleClose()
      }
    }
  }

  return (
    <PaymentSheet
      ref={dialogRef}
      className={isClosing ? 'closing' : undefined}
      aria-labelledby="drawer-title"
      aria-describedby="drawer-description"
      onAnimationEnd={handleAnimationEnd}
      onCancel={(event) => {
        event.preventDefault()
        handleClose()
      }}
      onClick={handleBackdropClick}
      onClose={onClose}
    >
      <div className="sheet-heading">
        <h2 id="drawer-title">Catat Pembayaran</h2>
        <button
          type="button"
          aria-label="Tutup form pembayaran"
          onClick={handleClose}
        >
          ×
        </button>
      </div>
      <p id="drawer-description">
        {itemName} · Simulasi saja, pembayaran tidak disimpan.
      </p>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          setSubmitted(true)
        }}
        onChange={() => setSubmitted(false)}
      >
        <label htmlFor="payment-kind">Jenis pembayaran</label>
        <select id="payment-kind" name="kind" required defaultValue="">
          <option value="" disabled>
            Pilih jenis pembayaran
          </option>
          <option>DP</option>
          <option>Cicilan</option>
          <option>Pelunasan</option>
        </select>
        <label htmlFor="payment-amount">Nominal (Rp)</label>
        <input
          id="payment-amount"
          name="amount"
          type="number"
          min="1"
          max={Number.MAX_SAFE_INTEGER}
          step="1"
          inputMode="numeric"
          required
          placeholder="Contoh: 100000"
        />
        <label htmlFor="payment-date">Tanggal</label>
        <input id="payment-date" name="date" type="date" required />
        <label htmlFor="payment-note">Catatan (opsional)</label>
        <textarea
          id="payment-note"
          name="note"
          rows={3}
          maxLength={500}
          placeholder="Catatan pembayaran…"
        />
        {submitted && (
          <p role="status">
            Simulasi selesai. Tidak ada transaksi yang disimpan atau saldo yang
            diubah.
          </p>
        )}
        <button className="primary" type="submit">
          Simulasikan Pembayaran
        </button>
      </form>
    </PaymentSheet>
  )
}

export default PaymentDrawer
