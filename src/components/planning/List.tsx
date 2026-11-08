import { Link } from 'react-router-dom'
import type { WeddingItem } from '../../context/planning/types'
import { formatRupiah } from '../../utils/currency'
import { CATEGORY_ICONS, CheckIcon } from '../../asset'
import { StatusFeedback } from '../common/StatusFeedback'

export interface ListProps {
  items: WeddingItem[]
  queryString?: string
}

export function List({ items, queryString = '' }: ListProps) {
  if (!items.length) {
    return (
      <StatusFeedback
        type="empty"
        title="Tidak Ada Kebutuhan yang Cocok"
        message="Coba ubah kata kunci pencarian atau sesuaikan filter kategori dan status pilihan."
      />
    )
  }

  const querySuffix = queryString ? `?${queryString}` : ''

  return (
    <ul className="item-grid">
      {items.map((item) => {
        const category = item.category
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
              <p className="price">{formatRupiah(item.financial.effectiveAmount)}</p>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default List
