import { usePlanningCtx } from "../../../context/planning/PlanningCtxProvider";
import { useState } from "react";
import type { Candidate } from "../../../context/planning/types";
import { PlusIcon, InfoIcon, StoreIcon } from "../../../asset";
import { ReferenceDrawer } from "./ReferenceDrawer";
import { ReferenceItem } from "./ReferenceItem";

export function ReferenceSection() {
  const [referenceDraft, setReferenceDraft] = useState<
    Candidate | null | undefined
  >(undefined);

  const { references, selected, setChoosing } = usePlanningCtx();

  const sortedReferences = selected
    ? [selected, ...references.filter((c) => c.id !== selected.id)]
    : references;

  return (
    <section
      id="panel-references"
      role="tabpanel"
      aria-labelledby="tab-references"
      className="detail-section"
    >
      <div className="section-heading">
        <div className="section-title-wrap">
          <h2 id="references-title">Referensi Produk / Vendor</h2>
          <span className="reference-count-pill">{references.length} Opsi</span>
        </div>

        {references.length > 0 && (
          <button
            className="primary add-btn-compact"
            type="button"
            onClick={() => setReferenceDraft(null)}
          >
            <PlusIcon size={14} />
            <span>Tambah Produk</span>
          </button>
        )}
      </div>

      {!selected && references.length > 0 && (
        <div className="notice-box">
          <div className="notice-content">
            <InfoIcon size={18} />
            <div>
              <strong>Tentukan Pilihan Final</strong>
              <p>
                Pilih salah satu referensi vendor di bawah untuk mengunci harga
                dan melanjutkan pembayaran.
              </p>
            </div>
          </div>
        </div>
      )}

      {references.length > 0 ? (
        <ul className="reference-list">
          {sortedReferences.map((candidate) => (
            <ReferenceItem
              key={candidate.id}
              candidate={candidate}
              onEdit={setReferenceDraft}
            />
          ))}
        </ul>
      ) : (
        <div className="empty-box reference-empty-box">
          <div className="empty-icon-wrap">
            <StoreIcon size={24} />
          </div>
          <p className="empty-title">Belum Ada Pilihan Vendor</p>
          <p className="empty-subtitle">
            Catat dan simpan opsi vendor atau link produk di sini untuk
            mempermudah perbandingan harga sebelum menentukan pilihan final.
          </p>
          <button
            className="primary add-first-btn"
            type="button"
            onClick={() => setReferenceDraft(null)}
          >
            <PlusIcon size={16} />
            <span>Tambah Referensi Pertama</span>
          </button>
        </div>
      )}

      <p className="hint session-hint">
        Referensi tersimpan di database. Gambar hanya menjadi preview selama
        halaman detail ini terbuka.
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
