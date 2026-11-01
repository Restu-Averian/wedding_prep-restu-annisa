import { formatRupiah } from '../../../utils/currency'

export interface ItemInfoProps {
  categoryName?: string
  estimate: number
  isSelected: boolean
}

export function ItemInfo({ categoryName, estimate, isSelected }: ItemInfoProps) {
  return (
    <section className="panel" aria-labelledby="item-info-title">
      <h2 id="item-info-title">Informasi Kebutuhan</h2>
      <dl className="facts">
        <div>
          <dt>Kategori</dt>
          <dd>{categoryName ?? '-'}</dd>
        </div>
        <div>
          <dt>Estimasi harga</dt>
          <dd>{formatRupiah(estimate)}</dd>
        </div>
        <div>
          <dt>Status pilihan</dt>
          <dd>{isSelected ? 'Sudah Dipilih' : 'Belum Dipilih'}</dd>
        </div>
      </dl>
    </section>
  )
}

export default ItemInfo

