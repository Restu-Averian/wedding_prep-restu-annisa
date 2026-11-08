import { PlusIcon } from "../../asset";

export interface HeaderProps {
  onAdd?: () => void;
  canAdd?: boolean;
}

export default function Header({ onAdd, canAdd = true }: HeaderProps) {
  return (
    <header className="planning-header">
      <div className="planning-header-text">
        <h1>Rencana</h1>
        <p className="subtitle">Semua yang kita persiapkan, satu per satu ♡</p>
      </div>

      {onAdd && (
        <button
          type="button"
          className="primary add-button"
          disabled={!canAdd}
          onClick={onAdd}
        >
          <PlusIcon size={16} />
          <span>Tambah Kebutuhan</span>
        </button>
      )}
    </header>
  );
}

