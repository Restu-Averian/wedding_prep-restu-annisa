import {
  RingIcon,
  GiftIcon,
  CelebrationIcon,
  GemIcon,
  AkadIcon,
} from '../../asset'
import type { Category } from '../../context/home/types'
import { formatRupiah } from '../../utils/currency'

export const CATEGORIES = [
  { id: 'lamaran', name: 'Lamaran', estimate: 5250000, icon: RingIcon },
  { id: 'seserahan', name: 'Seserahan', estimate: 2625000, icon: GiftIcon },
  { id: 'resepsi', name: 'Resepsi', estimate: 46300000, icon: CelebrationIcon },
  { id: 'mahar', name: 'Mahar', estimate: 27052028, icon: GemIcon },
  { id: 'akad-nikah', name: 'Akad Nikah', estimate: 3650000, icon: AkadIcon },
].map(({ estimate, ...category }) => ({
  ...category,
  estimate: formatRupiah(estimate),
})) satisfies Category[]
