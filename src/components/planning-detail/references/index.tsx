import { useState } from "react";
import type { Candidate } from "../../../data/wedding";
import { PlusIcon } from "../Icons";
import { ReferenceDrawer } from "./ReferenceDrawer";
import { ReferenceItem } from "./ReferenceItem";
import { ReferenceItemSelected } from "./ReferenceItemSelected";

export interface ReferenceSectionProps {
  itemId: string;
  references: Candidate[];
  selected?: Candidate;
  selectedId?: string;
  choosing: boolean;
  paid: number;
  // eslint-disable-next-line no-unused-vars
  onSelect: (candidateId: string) => void;
  onToggleChoosing: () => void;
  // eslint-disable-next-line no-unused-vars
  onSaveReference: (reference: Candidate) => void;
  onAfterSave?: () => void;
}

export function ReferenceSection({
  itemId,
  references,
  selected,
  selectedId,
  choosing,
  paid,
  onSelect,
  onToggleChoosing,
  onSaveReference,
  onAfterSave,
}: ReferenceSectionProps) {
  const [referenceDraft, setReferenceDraft] = useState<
    Candidate | null | undefined
  >(undefined);
  return (
    <section
      id="panel-references"
      role="tabpanel"
      aria-labelledby="tab-references"
      className="detail-section"
    >
      <div className="section-heading">
        <h2 id="references-title">
          {selected ? "Pilihan Final" : "Daftar Referensi Produk / Vendor"}
        </h2>

        {selected && (
          <button
            className="secondary toggle-btn"
            type="button"
            onClick={onToggleChoosing}
          >
            {choosing ? "Batal Ubah" : "Ubah Pilihan"}
          </button>
        )}
      </div>

      {selected && !choosing ? (
        <ReferenceItemSelected
          selected={selected}
          onEdit={setReferenceDraft}
        />
      ) : (
        <>
          {!selected && (
            <div className="notice-box">
              <p className="hint">
                Pilih satu referensi final untuk menetapkan harga dan
                melanjutkan pembayaran.
              </p>
            </div>
          )}

          {references.length ? (
            <ul className="reference-list">
              {references.map((candidate) => (
                <ReferenceItem
                  key={candidate.id}
                  candidate={candidate}
                  isSelected={candidate.id === selectedId}
                  cannotSelect={candidate.price < paid}
                  onSelect={onSelect}
                  onEdit={setReferenceDraft}
                />
              ))}
            </ul>
          ) : (
            <div className="empty-box">
              <p className="muted">Belum ada referensi untuk kebutuhan ini.</p>
            </div>
          )}
        </>
      )}

      <button
        className="secondary add-reference-btn"
        type="button"
        onClick={() => setReferenceDraft(null)}
      >
        <PlusIcon size={16} />
        <span>Tambah Referensi</span>
      </button>
      <p className="hint">
        Perubahan referensi dan gambar hanya tersimpan selama detail ini
        terbuka.
      </p>

      {referenceDraft !== undefined && (
        <ReferenceDrawer
          itemId={itemId}
          candidate={referenceDraft}
          minimumPrice={
            referenceDraft?.id === selectedId ? Math.max(1, paid) : 1
          }
          onSave={(reference) => {
            onSaveReference(reference);
            setReferenceDraft(undefined);
          }}
          onAfterSave={() => {
            if (!referenceDraft) onAfterSave?.();
          }}
          onClose={() => setReferenceDraft(undefined)}
        />
      )}
    </section>
  );
}
