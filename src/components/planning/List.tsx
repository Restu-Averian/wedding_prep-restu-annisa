import { Link } from 'react-router-dom'
import { categories, type WeddingItem } from '../../data/wedding'
import { formatRupiah } from '../../utils/currency'

export interface ListProps {
  items: WeddingItem[]
  queryString?: string
}

export function List({ items, queryString = '' }: ListProps) {
  if (!items.length) {
    return (
      <p className="panel">
        Tidak ada kebutuhan yang cocok. Coba nama atau kategori lain.
      </p>
    )
  }

  const querySuffix = queryString ? `?${queryString}` : ''

  return (
    <ul className="item-grid">
      {items.map((item) => (
        <li key={item.id}>
          <Link
            className="panel item-card"
            to={`/rencana/${item.id}${querySuffix}`}
          >
            <span className="eyebrow">
              {categories.find(({ id }) => id === item.categoryId)?.name}
            </span>
            <h2>{item.name}</h2>
            <p className="price">{formatRupiah(item.estimate)}</p>
            <span
              className="badge"
              data-selected={!!item.selectedCandidateId}
            >
              {item.selectedCandidateId ? 'Sudah Dipilih' : 'Belum Dipilih'}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default List

