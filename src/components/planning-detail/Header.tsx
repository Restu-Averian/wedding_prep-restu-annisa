import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { usePlanningCtx } from '../../context/planning/PlanningCtxProvider'
import { useApi, api } from '../../api/client'
import type { Category } from '../../context/planning/types'
import { ItemDrawer } from '../planning/ItemDrawer'

export function Header() {
  const { item, retry, transactions, busy } = usePlanningCtx()
  const categories = useApi<Category[]>('/categories')
  const [editing, setEditing] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { search } = useLocation()
  if (!item) return null
  return <header>
    <p className="eyebrow">{item.category.name}</p>
    <h1>{item.name}</h1>
    <button type="button" className="secondary" disabled={!categories.data || busy || deleting} onClick={() => setEditing(true)}>Edit Kebutuhan</button>{' '}
    <button type="button" className="secondary" disabled={transactions.length > 0 || busy || deleting} onClick={async () => {
      if (deleting || !window.confirm(`Hapus kebutuhan "${item.name}" beserta referensinya?`)) return
      setDeleting(true); setError('')
      try { await api(`/items/${item.id}`, 'DELETE'); navigate('/rencana' + search) }
      catch (error) { setError(error instanceof Error ? error.message : 'Penghapusan gagal.'); setDeleting(false) }
    }}>{deleting ? 'Menghapus…' : 'Hapus Kebutuhan'}</button>
    {error && <p role="alert">{error}</p>}
    {editing && categories.data && <ItemDrawer item={item} categories={categories.data} onClose={() => setEditing(false)} onSaved={retry} />}
  </header>
}
export default Header
