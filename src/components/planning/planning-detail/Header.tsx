export interface HeaderProps {
  categoryName?: string
  itemName: string
}

export function Header({ categoryName, itemName }: HeaderProps) {
  return (
    <header>
      {categoryName && <p className="eyebrow">{categoryName}</p>}
      <h1>{itemName}</h1>
      <p className="subtitle">Satu detail kecil untuk hari bahagia kita ♡</p>
    </header>
  )
}

export default Header

