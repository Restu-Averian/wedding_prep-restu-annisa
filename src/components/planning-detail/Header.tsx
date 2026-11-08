import { usePlanningCtx } from '../../context/planning/PlanningCtxProvider'
import { CATEGORIES } from '../../constants/planning'

export function Header() {
  const { item } = usePlanningCtx()
  const categoryName = CATEGORIES.find(({ id }) => id === item?.categoryId)?.name
  const itemName = item?.name
  return (
    <header>
      {categoryName && <p className="eyebrow">{categoryName}</p>}
      <h1>{itemName}</h1>
    </header>
  )
}

export default Header

