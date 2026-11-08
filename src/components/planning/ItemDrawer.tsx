import { useEffect, useRef, useState } from 'react'
import type { Category, WeddingItem } from '../../context/planning/types'
import { api } from '../../api/client'
import { PaymentSheet } from '../../styles/Planning.styles'

export function ItemDrawer({ item, categories, categoryId, onClose, onSaved }: {
  item?: WeddingItem; categories: Category[]; categoryId?: string; onClose: () => void; onSaved: () => void
}) {
  const dialog = useRef<HTMLDialogElement>(null)
  const submitting = useRef(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  useEffect(() => {
    const previous = document.activeElement
    const overflow = document.body.style.overflow
    dialog.current?.showModal()
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = overflow; if (previous instanceof HTMLElement) previous.focus() }
  }, [])
  return <PaymentSheet ref={dialog} aria-labelledby="item-form-title" onClose={onClose} onCancel={event => { if (submitting.current) event.preventDefault() }}>
    <div className="sheet-heading"><h2 id="item-form-title">{item ? 'Edit Kebutuhan' : 'Tambah Kebutuhan'}</h2><button type="button" aria-label="Tutup form" disabled={busy} onClick={onClose}>×</button></div>
    <form onSubmit={async event => {
      event.preventDefault()
      if (submitting.current) return
      const data = new FormData(event.currentTarget)
      submitting.current = true; setBusy(true); setError('')
      try {
        await api(item ? `/items/${item.id}` : '/items', item ? 'PATCH' : 'POST', { name: String(data.get('name')).trim(), categoryId: String(data.get('categoryId')), estimatedAmount: Number(data.get('estimatedAmount')) })
        onSaved(); onClose()
      } catch (error) { setError(error instanceof Error ? error.message : 'Penyimpanan gagal.') }
      finally { submitting.current = false; setBusy(false) }
    }}>
      <label htmlFor="item-name">Nama kebutuhan</label><input id="item-name" name="name" maxLength={120} defaultValue={item?.name} required />
      <label htmlFor="item-category">Kategori</label><select id="item-category" name="categoryId" defaultValue={item?.categoryId ?? categoryId ?? categories[0]?.id} required>{categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}</select>
      <label htmlFor="item-estimate">Estimasi awal (Rp)</label><input id="item-estimate" name="estimatedAmount" type="number" min={0} max={1_000_000_000_000} step={1} defaultValue={item?.estimatedAmount} required />
      {error && <p role="alert">{error}</p>}
      <button type="submit" className="primary" disabled={busy}>{busy ? 'Menyimpan…' : 'Simpan Kebutuhan'}</button>
    </form>
  </PaymentSheet>
}
