import type { Candidate } from '../../../data/wedding'
import { formatRupiah } from '../../../utils/currency'
import { CheckIcon, EditIcon, ExternalLinkIcon, PlusIcon } from './Icons'

export interface ReferenceSectionProps {
  references: Candidate[]
  selected?: Candidate
  selectedId?: string
  choosing: boolean
  paid: number
  // eslint-disable-next-line no-unused-vars
  onSelect: (candidateId: string) => void
  onToggleChoosing: () => void
  // eslint-disable-next-line no-unused-vars
  onEdit: (candidate: Candidate) => void
  onAdd: () => void
}

export function ReferenceSection({
  references,
  selected,
  selectedId,
  choosing,
  paid,
  onSelect,
  onToggleChoosing,
  onEdit,
  onAdd,
}: ReferenceSectionProps) {
  return (
    <section
      id="panel-references"
      role="tabpanel"
      aria-labelledby="tab-references"
      className="detail-section"
    >
      <div className="section-heading">
        <h2 id="references-title">
          {selected ? 'Pilihan Final' : 'Daftar Referensi Produk / Vendor'}
        </h2>

        {selected && (
          <button
            className="secondary toggle-btn"
            type="button"
            onClick={onToggleChoosing}
          >
            {choosing ? 'Batal Ubah' : 'Ubah Pilihan'}
          </button>
        )}
      </div>

      {selected && !choosing ? (
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
      ) : (
        <>
          {!selected && (
            <div className="notice-box">
              <p className="hint">
                Pilih satu referensi final untuk menetapkan harga dan melanjutkan pembayaran.
              </p>
            </div>
          )}
          {references.length ? (
            <ul className="reference-list">
              {references.map((candidate) => {
                const isSelected = candidate.id === selectedId
                const cannotSelect = candidate.price < paid

                return (
                  <li
                    key={candidate.id}
                    className={`reference ${isSelected ? 'is-selected' : ''}`}
                  >
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
                        <p className="reference-price">
                          {formatRupiah(candidate.price)}
                        </p>
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
                            onClick={() => onSelect(candidate.id)}
                          >
                            Pilih Ini
                          </button>
                          {cannotSelect && (
                            <p className="hint">
                              Harga di bawah total dibayar.
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </li>
                )
              })}
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
        onClick={onAdd}
      >
        <PlusIcon size={16} />
        <span>Tambah Referensi</span>
      </button>
      <p className="hint">
        Perubahan referensi dan gambar hanya tersimpan selama detail ini terbuka.
      </p>
    </section>
  )
}

