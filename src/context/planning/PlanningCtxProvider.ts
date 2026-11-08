import { createContext, createElement, useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CANDIDATES, ITEMS, PAYMENTS } from '../../constants/planning'
import type {
  DetailTabKey,
  PlanningCtxProviderProps,
  PlanningCtxValue,
} from './types'

const PlanningCtx = createContext<PlanningCtxValue | undefined>(undefined)

export const usePlanningCtx = () => {
  const context = useContext(PlanningCtx)
  if (!context) throw new Error('usePlanningCtx harus di dalam PlanningCtxProvider')
  return context
}

function PlanningStateProvider({
  children,
  itemId,
}: PlanningCtxProviderProps & { itemId?: string }) {
  const item = ITEMS.find(({ id }) => id === itemId)
  const [activeTab, setActiveTab] = useState<DetailTabKey>('references')
  const [selectedId, setSelectedId] = useState(item?.selectedCandidateId)
  const [choosing, setChoosing] = useState(!item?.selectedCandidateId)
  const [references, setReferences] = useState(() =>
    CANDIDATES.filter(candidate => candidate.itemId === itemId),
  )
  const [transactions, setTransactions] = useState(() =>
    PAYMENTS.filter(payment => payment.itemId === itemId),
  )
  const selected = references.find(({ id }) => id === selectedId)
  const paid = transactions.reduce((sum, payment) => sum + payment.amount, 0)
  const total = selected?.price ?? item?.estimate ?? 0
  const remaining = Math.max(0, total - paid)

  return createElement(
    PlanningCtx.Provider,
    {
      value: {
        item,
        activeTab,
        setActiveTab,
        selectedId,
        setSelectedId,
        choosing,
        setChoosing,
        references,
        setReferences,
        transactions,
        setTransactions,
        selected,
        paid,
        total,
        remaining,
      },
    },
    children,
  )
}

export default function PlanningCtxProvider({ children }: PlanningCtxProviderProps) {
  const { itemId } = useParams()
  return createElement(PlanningStateProvider, { key: itemId, itemId, children })
}
