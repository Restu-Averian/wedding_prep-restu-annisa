import { usePlanningCtx } from "../../../context/planning/PlanningCtxProvider";
import type { Candidate } from "../../../context/planning/types";
import { formatRupiah } from "../../../utils/currency";
import { CheckIcon, EditIcon, ExternalLinkIcon } from "../../../asset";

export interface ReferenceItemProps {
  candidate: Candidate;
  // eslint-disable-next-line no-unused-vars
  onEdit: (candidate: Candidate) => void;
}

export function ReferenceItem({
  candidate,
  onEdit,
}: ReferenceItemProps) {
  const { selectedId, paid, setSelectedId, setChoosing } = usePlanningCtx();
  const isSelected = candidate.id === selectedId;
  const cannotSelect = candidate.price < paid;
  return (
    <li className={`reference ${isSelected ? "is-selected" : ""}`}>
      <div className="reference-identity">
        {candidate.image ? (
          <img
            className="reference-image"
            src={candidate.image}
            alt={`Foto ${candidate.name}`}
          />
        ) : (
          <div className="reference-image-placeholder">Foto</div>
        )}

        <div>
          <h3 className="reference-title">{candidate.name}</h3>

          <p className="reference-price">{formatRupiah(candidate.price)}</p>

          {candidate.url ? (
            <a
              className="text-link with-icon"
              href={candidate.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Link produk/vendor</span>
              <ExternalLinkIcon size={13} />
            </a>
          ) : (
            <p className="hint">Link belum tersedia.</p>
          )}
        </div>
      </div>

      <div className="reference-actions">
        <button
          className="secondary edit-btn"
          type="button"
          aria-label={`Edit referensi ${candidate.name}`}
          onClick={() => onEdit(candidate)}
        >
          <EditIcon size={14} />

          <span>Edit</span>
        </button>

        {isSelected ? (
          <span className="badge badge-selected">
            <CheckIcon size={12} /> Terpilih
          </span>
        ) : (
          <div className="select-wrapper">
            <button
              className="primary select-btn"
              type="button"
              disabled={cannotSelect}
              onClick={() => {
                setSelectedId(candidate.id);
                setChoosing(false);
              }}
            >
              Pilih Ini
            </button>

            {cannotSelect && (
              <p className="hint">Harga di bawah total dibayar.</p>
            )}
          </div>
        )}
      </div>
    </li>
  );
}

export default ReferenceItem;
