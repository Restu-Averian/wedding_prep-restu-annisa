import { Link } from 'react-router-dom'
import { CATEGORIES } from '../../constants/home'

export function CategoryGrid() {
  return (
    <section className="categories" aria-labelledby="categories-title">
      <div className="categories-header">
        <h2 id="categories-title">Kategori Persiapan</h2>
      </div>
      <div className="category-grid">
        {CATEGORIES.map(({ id, name, estimate, icon: Icon }) => (
          <Link
            key={name}
            to={`/rencana?kategori=${id}`}
            className="category-card"
          >
            <div className="icon-wrapper">
              <Icon />
            </div>
            <div className="card-info">
              <span className="category-name">{name}</span>
              <span className="category-estimate">{estimate}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

