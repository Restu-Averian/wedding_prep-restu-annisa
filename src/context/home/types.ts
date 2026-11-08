import type { ComponentType } from 'react'

export interface Category {
  id: string
  name: string
  estimate: string
  icon: ComponentType<{ size?: number; className?: string }>
}
