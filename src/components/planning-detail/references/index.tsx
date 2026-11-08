import { usePlanningCtx } from "../../../context/planning/PlanningCtxProvider";
import { useState } from "react";
import type { Candidate } from "../../../context/planning/types";
import { PlusIcon } from "../../../asset";
import { ReferenceDrawer } from "./ReferenceDrawer";
import { ReferenceItem } from "./ReferenceItem";
import { ReferenceItemSelected } from "./ReferenceItemSelected";

export function ReferenceSection() {
  const [referenceDraft, setReferenceDraft] = useState<
    Candidate | null | undefined
  >(undefined);

  const { references, selected, choosing, setChoosing } = usePlanningCtx();

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
            onClick={() => setChoosing(!choosing)}
          >
            {choosing ? "Batal Ubah" : "Ubah Pilihan"}
          </button>
        )}
      </div>

      {selected && !choosing ? (
        <ReferenceItemSelected onEdit={setReferenceDraft} />
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
          candidate={referenceDraft}
          onClose={(saved) => {
            if (saved && referenceDraft === null) setChoosing(true);
            setReferenceDraft(undefined);
          }}
        />
      )}
    </section>
  );
}
