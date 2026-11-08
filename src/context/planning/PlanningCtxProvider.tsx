import { createContext, createElement, useContext, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api, useApi } from '../../api/client'
import type { Candidate, DetailTabKey, ItemDetail, PlanningCtxProviderProps, PlanningCtxValue } from './types'

const PlanningCtx = createContext<PlanningCtxValue | undefined>(undefined)
// eslint-disable-next-line react-refresh/only-export-components
export const usePlanningCtx = () => {
  const context = useContext(PlanningCtx)
  if (!context) throw new Error('usePlanningCtx harus di dalam PlanningCtxProvider')
  return context
}
function PlanningStateProvider({ children, itemId }: PlanningCtxProviderProps & { itemId: string }) {
  const resource = useApi<ItemDetail>(`/items/${encodeURIComponent(itemId)}`)
  const [updated, setUpdated] = useState<ItemDetail>()
  // Images remain local previews; image storage is outside the D1 contract.
  const [images, setImages] = useState<Record<string, string | undefined>>({})
  const [activeTab, setActiveTab] = useState<DetailTabKey>('references')
  const [choosing, setChoosing] = useState(false)
  const [busy, setBusy] = useState(false)
  const [mutationError, setMutationError] = useState('')
  const submitting = useRef(false)
  const item = updated ?? resource.data
  const references = (item?.candidates ?? []).map(candidate => ({ ...candidate, image: images[candidate.id] }))
  const selected = references.find(candidate => candidate.id === item?.selectedCandidateId)

  async function mutate(path: string, method: string, data?: unknown) {
    if (submitting.current) throw new Error('Tunggu penyimpanan sebelumnya selesai.')
    submitting.current = true
    setBusy(true)
    setMutationError('')
    try {
      const result = await api<ItemDetail | undefined>(`/items/${itemId}${path}`, method, data)
      const fresh = result ?? await api<ItemDetail>(`/items/${itemId}`)
      setUpdated(fresh)
      return fresh
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Penyimpanan gagal.'
      setMutationError(message)
      throw error
    } finally {
      submitting.current = false
      setBusy(false)
    }
  }
  async function saveReference(candidate: Candidate) {
    const existing = references.some(entry => entry.id === candidate.id)
    const data = { name: candidate.name, url: candidate.url, price: candidate.price, note: candidate.note ?? null }
    const fresh = await mutate(existing ? `/candidates/${candidate.id}` : '/candidates', existing ? 'PATCH' : 'POST', data)
    // Store only optional visual previews in this detail session.
    if (existing) setImages(previous => ({ ...previous, [candidate.id]: candidate.image }))
    else if (candidate.image) {
      const added = fresh.candidates.filter(entry => !references.some(old => old.id === entry.id))
      if (added.length === 1) setImages(previous => ({ ...previous, [added[0].id]: candidate.image }))
    }
  }
  const value: PlanningCtxValue = {
    item, loading: resource.loading && !item, error: item ? undefined : resource.error, retry: () => { setUpdated(undefined); resource.retry() },
    activeTab, setActiveTab, selectedId: item?.selectedCandidateId ?? undefined, choosing, setChoosing,
    references, transactions: item?.payments ?? [], selected,
    paid: item?.financial.paidAmount ?? 0, total: item?.financial.effectiveAmount ?? 0, remaining: item?.financial.remainingAmount ?? 0,
    busy, mutationError, mutate, saveReference,
  }
  return <PlanningCtx.Provider value={value}>{children}</PlanningCtx.Provider>
}
export default function PlanningCtxProvider({ children }: PlanningCtxProviderProps) {
  const { itemId = '' } = useParams()
  return createElement(PlanningStateProvider, { key: itemId, itemId, children })
}
