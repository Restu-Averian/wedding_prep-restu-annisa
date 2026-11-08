import { usePlanningCtx } from "../../../context/planning/PlanningCtxProvider";
import type { Candidate } from "../../../context/planning/types";
import { formatRupiah } from "../../../utils/currency";
import {
  CheckIcon,
  EditIcon,
  ExternalLinkIcon,
  StoreIcon,
} from "../../../asset";

export interface ReferenceItemProps {
  candidate: Candidate;
  onEdit: (candidate: Candidate) => void;
}

export default function ReferenceItem({ candidate, onEdit }: ReferenceItemProps) {
  const { item, selectedId, transactions, busy, mutate } = usePlanningCtx();
  const isSelected = candidate.id === selectedId;
  const cannotSelect = busy || transactions.length > 0;

  return (
    <li className={`reference ${isSelected ? "is-selected" : ""}`}>
      <div className="reference-card-header">
        <div className="reference-identity">
          {candidate.image ? (
            <img
              className="reference-image"
              src={candidate.image}
              alt={`Foto ${candidate.name}`}
            />
          ) : (
            <div
              className="reference-image-placeholder"
              aria-label="Foto produk"
            >
              <StoreIcon size={24} />
            </div>
          )}

          <div className="reference-info">
            <h3 className="reference-title">{candidate.name}</h3>

            <p className="reference-price">{formatRupiah(candidate.price)}</p>

            {isSelected && item?.agreedAmount !== candidate.price && (
              <p className="hint">
                Harga kesepakatan: {formatRupiah(item?.agreedAmount ?? 0)}
              </p>
            )}

            {candidate.url ? (
              <a
                className="reference-link"
                href={candidate.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Lihat vendor / produk</span>

                <ExternalLinkIcon size={12} />
              </a>
            ) : (
              <span className="reference-link-empty">Link belum tersedia</span>
            )}
          </div>
        </div>

        <button
          className="edit-icon-btn"
          type="button"
          aria-label={`Edit referensi ${candidate.name}`}
          title="Edit data referensi"
          onClick={() => onEdit(candidate)}
        >
          <EditIcon size={15} />
        </button>
      </div>

      <div className="reference-actions">
        {isSelected ? (
          <div className="badge-selected-status">
            <CheckIcon size={14} />

            <span>Sedang Digunakan Sebagai Pilihan Final</span>
          </div>
        ) : (
          <div className="select-wrapper">
            <button
              className="outline select-btn"
              type="button"
              disabled={cannotSelect}
              onClick={() => {
                void mutate("/selection", "PUT", {
                  candidateId: candidate.id,
                }).catch(() => {});
              }}
            >
              Pilih Opsi Ini
            </button>

            {cannotSelect && (
              <p className="cannot-select-hint">
                {busy
                  ? "Menyimpan…"
                  : "Pilihan terkunci karena memiliki riwayat pembayaran."}
              </p>
            )}
          </div>
        )}
      </div>
    </li>
  );
}
