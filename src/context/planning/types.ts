import type { Dispatch, ReactNode, SetStateAction } from 'react'
import type { CATEGORIES } from '../../constants/planning'

export interface Category {
  id: string
  name: string
  estimate: number
}

export interface WeddingItem {
  id: string
  name: string
  categoryId: typeof CATEGORIES[number]['id']
  estimate: number
  selectedCandidateId?: string
}

export interface Candidate {
  id: string
  itemId: string
  name: string
  price: number
  url?: string
  image?: string
}

export interface Payment {
  id: string
  itemId: string
  kind: string
  amount: number
  date: string
  note?: string
}

export type DetailTabKey = 'references' | 'payments'

export interface PlanningCtxProviderProps {
  children: ReactNode
}

export interface PlanningCtxValue {
  item: WeddingItem | undefined
  activeTab: DetailTabKey
  setActiveTab: Dispatch<SetStateAction<DetailTabKey>>
  selectedId: string | undefined
  setSelectedId: Dispatch<SetStateAction<string | undefined>>
  choosing: boolean
  setChoosing: Dispatch<SetStateAction<boolean>>
  references: Candidate[]
  setReferences: Dispatch<SetStateAction<Candidate[]>>
  transactions: Payment[]
  setTransactions: Dispatch<SetStateAction<Payment[]>>
  selected: Candidate | undefined
  paid: number
  total: number
  remaining: number
}
