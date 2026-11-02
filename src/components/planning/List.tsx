import { Link } from 'react-router-dom'
import { CATEGORIES, type WeddingItem } from '../../data/wedding'
import { formatRupiah } from '../../utils/currency'
import { CATEGORY_ICONS, CheckIcon } from '../../asset'

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
      {items.map((item) => {
        const category = CATEGORIES.find(({ id }) => id === item.categoryId)
        const IconComponent = CATEGORY_ICONS[item.categoryId]
        const isSelected = !!item.selectedCandidateId

        return (
          <li key={item.id}>
            <Link
              className="panel item-card"
              to={`/rencana/${item.id}${querySuffix}`}
              data-selected={isSelected}
            >
              <div className="card-top">
                <div className="card-icon-wrapper" aria-hidden="true">
                  {IconComponent && <IconComponent size={18} />}
                </div>
                <span className="badge" data-selected={isSelected}>
                  {isSelected && <CheckIcon size={11} />}
                  <span>{isSelected ? 'Sudah Dipilih' : 'Belum Dipilih'}</span>
                </span>
              </div>
              <div className="card-body">
                <span className="eyebrow">{category?.name}</span>
                <h2>{item.name}</h2>
              </div>
              <p className="price">{formatRupiah(item.estimate)}</p>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default List
