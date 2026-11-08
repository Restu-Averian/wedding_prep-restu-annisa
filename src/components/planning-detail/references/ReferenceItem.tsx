import { useState } from "react";
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

export default function ReferenceItem({
  candidate,
  onEdit,
}: ReferenceItemProps) {
  const [error, setError] = useState("");
  const [needsReload, setNeedsReload] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [notice, setNotice] = useState("");
  const { item, selectedId, transactions, busy, mutate } = usePlanningCtx();
  const isSelected = candidate.id === selectedId;
  const cannotSelect = busy || needsReload || transactions.length > 0;

  async function handleUnselect() {
    setError("");

    setClearing(true);

    try {
      await mutate("/selection", "DELETE");

      setNotice("Pilihan dibatalkan. Perhitungan kembali memakai estimasi.");
    } catch (error) {
      if (error instanceof Error && error.name === "MutationSavedError") {
        setNeedsReload(true);
      }

      setError(
        error instanceof Error ? error.message : "Pilihan gagal dibatalkan.",
      );
    } finally {
      setClearing(false);
    }
  }

  async function handleSelect() {
    setError("");

    setNotice("");
    try {
      await mutate("/selection", "PUT", {
        candidateId: candidate.id,
      });
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Pilihan gagal disimpan.",
      );
    }
  }

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
          <div>
            <div className="badge-selected-status">
              <CheckIcon size={14} />

              <span>Pilihan Final</span>
            </div>

            <button
              type="button"
              className="unselect-reference-btn"
              disabled={cannotSelect || clearing}
              onClick={handleUnselect}
            >
              {clearing ? "Membatalkan…" : "Batal Pilih"}
            </button>

            {transactions.length > 0 ? (
              <p className="cannot-select-hint">
                Pilihan terkunci karena ada riwayat pembayaran.
              </p>
            ) : null}
          </div>
        ) : (
          <div className="select-wrapper">
            <button
              className="outline select-btn"
              type="button"
              disabled={cannotSelect}
              onClick={handleSelect}
            >
              Pilih Opsi Ini
            </button>

            {cannotSelect && (
              <p className="cannot-select-hint">
                {needsReload
                  ? "Muat ulang halaman untuk melihat pilihan terbaru."
                  : busy
                    ? "Menyimpan…"
                    : "Pilihan terkunci karena memiliki riwayat pembayaran."}
              </p>
            )}
          </div>
        )}

        {error && <p role="alert">{error}</p>}

        {notice && <p role="status">{notice}</p>}
      </div>
    </li>
  );
}
