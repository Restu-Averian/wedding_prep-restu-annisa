import { CATEGORIES as DEFAULT_CATEGORIES } from "../../constants/planning";
import { CATEGORY_ICONS, GridIcon, SearchIcon, CloseIcon } from "../../asset";

export interface FilterProps {
  search: string;
  selection?: string;
  selectedCategoryId?: string;
  onUpdateFilter: (key: string, value: string) => void;
  categoryList?: readonly { id: string; name: string }[];
}

const STATUS_FILTERS = [
  ["all", "Semua"],
  ["selected", "Sudah Dipilih"],
  ["unselected", "Belum Dipilih"],
] as const;

export default function Filter({
  search,
  selection = "all",
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

      <div
        className="status-segmented-bar"
        role="group"
        aria-label="Filter status pilihan"
      >
        {STATUS_FILTERS.map(([value, label]) => (
          <button
            key={value}
            type="button"
            className="status-segmented-tab"
            aria-pressed={selection === value}
            onClick={() => onUpdateFilter("selection", value)}
          >
            <span>{label}</span>
          </button>
        ))}
      </div>

      <div className="category-scroll-container">
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
    </div>
  );
}
