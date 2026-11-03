import type { ComponentType } from 'react'
import { RingIcon } from './RingIcon'
import { GiftIcon } from './GiftIcon'
import { CelebrationIcon } from './CelebrationIcon'
import { GemIcon } from './GemIcon'
import { AkadIcon } from './AkadIcon'

export { RingIcon } from './RingIcon'
export { GiftIcon } from './GiftIcon'
export { CelebrationIcon } from './CelebrationIcon'
export { GemIcon } from './GemIcon'
export { AkadIcon } from './AkadIcon'
export { CheckIcon } from './CheckIcon'
export { SearchIcon } from './SearchIcon'
export { CloseIcon } from './CloseIcon'
export { GridIcon } from './GridIcon'
export { WalletIcon } from './WalletIcon'
export { ClockIcon } from './ClockIcon'

export const CATEGORY_ICONS: Record<
  string,
  ComponentType<{ size?: number; className?: string }>
> = {
  lamaran: RingIcon,
  seserahan: GiftIcon,
  resepsi: CelebrationIcon,
  mahar: GemIcon,
  'akad-nikah': AkadIcon,
}

// Backward-compatible alias
export const CATEGORY_PLANNING_ICONS = CATEGORY_ICONS
