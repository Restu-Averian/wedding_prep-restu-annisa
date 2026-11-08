import { usePlanningCtx } from "../../../context/planning/PlanningCtxProvider";
import type { Candidate } from "../../../context/planning/types";
import { formatRupiah } from "../../../utils/currency";
import { CheckIcon, EditIcon, ExternalLinkIcon } from "../../../asset";

export interface ReferenceItemSelectedProps {
  // eslint-disable-next-line no-unused-vars
  onEdit: (candidate: Candidate) => void;
}

export function ReferenceItemSelected({
  onEdit,
}: ReferenceItemSelectedProps) {
  const { selected } = usePlanningCtx();
  if (!selected) return null;
  return (
    <div className="selected-reference">
      <div className="reference-identity">
        {selected.image ? (
          <img
            className="reference-image"
            src={selected.image}
            alt={`Foto ${selected.name}`}
          />
        ) : (
          <div className="reference-image-placeholder">Foto</div>
        )}

        <div>
          <div className="badge-row">
            <span className="badge badge-selected">
              <CheckIcon size={12} /> Terpilih
            </span>
          </div>
          <h3 className="reference-title">{selected.name}</h3>
          <p className="reference-price">{formatRupiah(selected.price)}</p>
          {selected.url ? (
            <a
              className="text-link with-icon"
              href={selected.url}
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
      <button
        className="secondary edit-btn"
        type="button"
        onClick={() => onEdit(selected)}
      >
        <EditIcon size={14} />
        <span>Edit Referensi</span>
      </button>
    </div>
  );
}

export default ReferenceItemSelected;

