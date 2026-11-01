import { categories as defaultCategories } from '../../data/wedding'

export interface FilterProps {
  search: string
  selectedCategoryId?: string
  // eslint-disable-next-line no-unused-vars
  onUpdateFilter: (key: string, value: string) => void
  categoryList?: readonly { id: string; name: string }[]
}

export function Filter({
  search,
  selectedCategoryId,
  onUpdateFilter,
  categoryList = defaultCategories,
}: FilterProps) {
  return (
    <>
      <div className="search-field">
        <label htmlFor="search-items">Cari kebutuhan</label>
        <input
          id="search-items"
          type="search"
          placeholder="Cari nama kebutuhan…"
          value={search}
          onChange={(event) => onUpdateFilter('q', event.target.value)}
        />
      </div>

      <div className="filters" role="group" aria-label="Filter kategori">
        <button
          type="button"
          aria-pressed={!selectedCategoryId}
          onClick={() => onUpdateFilter('kategori', '')}
        >
          Semua
        </button>
        {categoryList.map(({ id, name }) => (
          <button
            key={id}
            type="button"
            aria-pressed={selectedCategoryId === id}
            onClick={() => onUpdateFilter('kategori', id)}
          >
            {name}
          </button>
        ))}
      </div>
    </>
  )
}

export default Filter
