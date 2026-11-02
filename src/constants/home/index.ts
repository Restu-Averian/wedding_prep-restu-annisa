import {
  RingIcon,
  GiftIcon,
  CelebrationIcon,
  GemIcon,
  AkadIcon,
} from '../../asset'
import { CATEGORIES as WEDDING_CATEGORIES } from '../../data/wedding'
import { formatRupiah } from '../../utils/currency'

const ICONS = {
  lamaran: RingIcon,
  seserahan: GiftIcon,
  resepsi: CelebrationIcon,
  mahar: GemIcon,
  'akad-nikah': AkadIcon,
}

export const CATEGORIES = WEDDING_CATEGORIES.map(({ id, name, estimate }) => ({
  id,
  name,
  estimate: formatRupiah(estimate),
  icon: ICONS[id],
}))
