import { Link } from "react-router-dom";
import { CATEGORY_ICONS } from "../../asset";
import type { Dashboard } from "../../context/planning/types";
import { formatRupiah } from "../../utils/currency";

export default function CategoryGrid({ categories }: { categories: Dashboard["categories"] }) {
  return (
    <section className="categories" aria-labelledby="categories-title">
      <div className="categories-header">
        <h2 id="categories-title">Kategori Persiapan</h2>
      </div>

      <div className="category-grid">
        {categories.map(({ slug, name, estimatedTotal }) => {
          const Icon = CATEGORY_ICONS[slug];
          return (
          <Link
            key={name}
            to={`/rencana?kategori=${slug}`}
            className="category-card"
          >
            <div className="icon-wrapper">
              {Icon && <Icon />}
            </div>

            <div className="card-info">
              <span className="category-name">{name}</span>
              <span className="category-estimate">{formatRupiah(estimatedTotal)}</span>
            </div>
          </Link>
        )})}
      </div>
    </section>
  );
}
