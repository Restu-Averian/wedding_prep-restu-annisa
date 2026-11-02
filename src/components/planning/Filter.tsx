import { CATEGORIES as DEFAULT_CATEGORIES } from "../../data/wedding";
import { CATEGORY_ICONS, GridIcon, SearchIcon, CloseIcon } from "../../asset";

export interface FilterProps {
  search: string;
  selectedCategoryId?: string;
  // eslint-disable-next-line no-unused-vars
  onUpdateFilter: (key: string, value: string) => void;
  categoryList?: readonly { id: string; name: string }[];
}

export function Filter({
  search,
  selectedCategoryId,
  onUpdateFilter,
  categoryList = DEFAULT_CATEGORIES,
}: FilterProps) {
  return (
    <div className="filter-section">
      <div className="search-field">
        <label htmlFor="search-items" className="sr-only">
          Cari kebutuhan
        </label>

        <div className="search-input-wrapper">
          <SearchIcon size={18} className="search-icon" />

          <input
            id="search-items"
            type="text"
            placeholder="Cari nama kebutuhan…"
            value={search}
            onChange={(event) => onUpdateFilter("q", event.target.value)}
          />

          {search && (
            <button
              type="button"
              className="clear-button"
              onClick={() => onUpdateFilter("q", "")}
              aria-label="Hapus pencarian"
            >
              <CloseIcon size={12} />
            </button>
          )}
        </div>
      </div>

      <div className="filters" role="group" aria-label="Filter kategori">
        <button
          type="button"
          className="filter-chip"
          aria-pressed={!selectedCategoryId}
          onClick={() => onUpdateFilter("kategori", "")}
        >
          <GridIcon size={15} />
          <span>Semua</span>
        </button>

        {categoryList.map(({ id, name }) => {
          const IconComponent = CATEGORY_ICONS[id];

          return (
            <button
              key={id}
              type="button"
              className="filter-chip"
              aria-pressed={selectedCategoryId === id}
              onClick={() => onUpdateFilter("kategori", id)}
            >
              {IconComponent && <IconComponent size={15} />}

              <span>{name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Filter;
