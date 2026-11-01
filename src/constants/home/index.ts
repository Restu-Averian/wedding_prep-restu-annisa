import {
  RingIcon,
  GiftIcon,
  CelebrationIcon,
  GemIcon,
  AkadIcon,
} from '../../asset/home'
import { categories } from '../../data/wedding'
import { formatRupiah } from '../../utils/currency'

const icons = { lamaran: RingIcon, seserahan: GiftIcon, resepsi: CelebrationIcon, mahar: GemIcon, 'akad-nikah': AkadIcon }

export const CATEGORIES = categories.map(({ id, name, estimate }) => ({
  id, name, estimate: formatRupiah(estimate), icon: icons[id],
}))
