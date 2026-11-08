import AmountInput from "../../AmountInput";
import { usePlanningCtx } from "../../../context/planning/PlanningCtxProvider";
import {
  useState,
  useRef,
  useEffect,
  type ChangeEvent,
  type FormEvent,
} from "react";
import type { Candidate } from "../../../context/planning/types";
import { ReferenceSheet } from "../../../styles/PlanningDetail.styles";
import { formatRupiah } from "../../../utils/currency";
import { CheckIcon, EditIcon, ImageIcon, TrashIcon } from "../../../asset";
import { useConfirm } from "../../../context/ConfirmContext";

export interface ReferenceDrawerProps {
  candidate: Candidate | null;
  onClose: (saved?: boolean) => void;
}

export default function ReferenceDrawer({
  candidate,
  onClose,
}: ReferenceDrawerProps) {
  const { item, selectedId, transactions, busy, mutate, saveReference } =
    usePlanningCtx();
  const confirm = useConfirm();
  const minimumPrice = 0;
  const priceLocked = candidate?.id === selectedId && transactions.length > 0;
  const cannotDelete = transactions.length > 0;
  const [image, setImage] = useState(candidate?.image);
  const [imageFile, setImageFile] = useState<File>();
  const [readingImage, setReadingImage] = useState(false);
  const [error, setError] = useState("");
  const [referenceSaved, setReferenceSaved] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const readerRef = useRef<FileReader | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const submittedRef = useRef(false);

  function chooseImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setError("");
    if (
      !["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
      file.size > 5 * 1024 * 1024
    ) {
      setError("Pilih gambar JPEG, PNG, atau WebP maksimal 5 MB.");
      event.target.value = "";
      return;
    }
    readerRef.current?.abort();
    const reader = new FileReader();
    readerRef.current = reader;
    setReadingImage(true);
    function fail() {
      if (readerRef.current !== reader) return;
      setError("Gambar tidak dapat dibaca. Coba gambar lain.");
      setReadingImage(false);
      if (fileRef.current) fileRef.current.value = "";
    }
    reader.onerror = fail;
    reader.onload = () => {
      const source = reader.result;
      if (typeof source !== "string") {
        fail();
        return;
      }
      const preview = new Image();
      preview.onerror = fail;
      preview.onload = () => {
        if (readerRef.current !== reader) return;
        setImage(source);
        setImageFile(file);
        setReadingImage(false);
      };
      preview.src = source;
    };
    reader.readAsDataURL(file);
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!item || busy || readingImage || submittedRef.current) {
      return;
    }

    const data = new FormData(event.currentTarget);

    const name = String(data.get("name") ?? "").replace(/[\r\n]+/g, " ").trim();

    const price = Number(data.get("price"));

    const url = String(data.get("url") ?? "").trim();
    if (
      !name ||
      name.length > 120 ||
      !Number.isSafeInteger(price) ||
      price < minimumPrice
    ) {
      setError(
        `Nama wajib diisi dan harga harus rupiah utuh minimal ${formatRupiah(minimumPrice)}.`,
      );
      return;
    }
    if (url) {
      try {
        if (!["http:", "https:"].includes(new URL(url).protocol))
          throw new Error("Invalid protocol");
      } catch {
        setError("Link harus berupa URL lengkap dengan http:// atau https://.");
        return;
      }
    }
    submittedRef.current = true;
    const reference: Candidate = {
      id: candidate?.id ?? crypto.randomUUID(),
      itemId: item.id,
      name,
      price,
      url,
      image,
      note: String(data.get("note") ?? "").trim(),
    };
    try {
      await saveReference(reference, imageFile);
      onClose(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Penyimpanan gagal.");
      if (error instanceof Error && error.name === "ReferenceSavedError") {
        setReferenceSaved(true);
      } else {
        submittedRef.current = false;
      }
    }
  }

  async function deleteCandidate() {
    if (!candidate || cannotDelete || readingImage || busy) {
      return;
    }

    const confirmed = await confirm({
      title: "Hapus Referensi",
      message: `Hapus referensi "${candidate.name}"? Data yang dihapus tidak dapat dipulihkan.`,
      confirmText: "Hapus Referensi",
      tone: "danger",
    });

    if (!confirmed) {
      return;
    }
    try {
      await mutate(`/candidates/${candidate.id}`, "DELETE");
      onClose(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Penghapusan gagal.");
    }
  }

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    dialogRef.current?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      const reader = readerRef.current;
      readerRef.current = null;
      reader?.abort();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, []);

  return (
    <ReferenceSheet
      ref={dialogRef}
      aria-labelledby="reference-title"
      aria-describedby="reference-description"
      onCancel={(event) => {
        if (busy) event.preventDefault();
      }}
      onClose={() => onClose()}
    >
      <div className="sheet-heading">
        <h2 id="reference-title">
          {candidate ? "Edit Referensi" : "Tambah Referensi"}
        </h2>

        <button
          type="button"
          aria-label="Tutup form referensi"
          disabled={busy}
          onClick={() => dialogRef.current?.close()}
        >
          ×
        </button>
      </div>

      <p id="reference-description">
        Simpan produk atau vendor beserta gambar untuk dibandingkan.
      </p>

      <form
        onSubmit={save}
        onChange={(event) => {
          if (event.target.id !== "reference-image") setError("");
        }}
      >
        <label htmlFor="reference-name">Nama produk/vendor</label>

        <textarea
          id="reference-name"
          name="name"
          rows={2}
          defaultValue={candidate?.name ?? ""}
          maxLength={120}
          required
        />

        <label htmlFor="reference-price">Harga (Rp)</label>

        <AmountInput
          id="reference-price"
          readOnly={priceLocked}
          name="price"
          min={minimumPrice}
          max={1_000_000_000_000}
          inputMode="numeric"
          defaultValue={candidate?.price}
          required
        />

        <label htmlFor="reference-url">Link produk/vendor</label>

        <input
          id="reference-url"
          required
          name="url"
          type="url"
          defaultValue={candidate?.url ?? ""}
          placeholder="https://…"
        />
        {priceLocked && (
          <p className="field-hint">
            Harga terkunci karena sudah memiliki riwayat pembayaran.
          </p>
        )}
        <label htmlFor="reference-note">Catatan (opsional)</label>
        <textarea
          id="reference-note"
          name="note"
          rows={3}
          maxLength={500}
          defaultValue={candidate?.note ?? ""}
        />
        <label htmlFor="reference-image">Gambar (opsional)</label>

        <input
          id="reference-image"
          ref={fileRef}
          type="file"
          className="sr-only"
          accept="image/jpeg,image/png,image/webp"
          disabled={readingImage || busy || referenceSaved}
          onChange={chooseImage}
          aria-describedby="reference-image-hint"
        />

        {!image ? (
          <label
            htmlFor="reference-image"
            className={`image-dropzone ${readingImage ? "is-reading" : ""}`}
          >
            <div className="dropzone-icon-circle" aria-hidden="true">
              <ImageIcon size={22} />
            </div>

            <div className="dropzone-text-group">
              <span className="dropzone-title">
                {readingImage ? "Membaca gambar…" : "Pilih Foto Referensi"}
              </span>
              <span id="reference-image-hint" className="dropzone-subtitle">
                JPEG, PNG, WebP · Maksimal 5 MB
              </span>
            </div>
          </label>
        ) : (
          <div className="image-preview-card">
            <img
              src={image}
              alt="Preview foto referensi"
              className="preview-thumb"
            />

            <div className="preview-details">
              <div className="preview-status-badge">
                <CheckIcon size={12} />
                <span>Foto siap digunakan</span>
              </div>

              <span className="preview-subtext">JPEG, PNG, atau WebP</span>

              <div className="preview-actions">
                <button
                  type="button"
                  className="preview-change-btn"
                  disabled={readingImage || busy || referenceSaved}
                  onClick={() => fileRef.current?.click()}
                >
                  <EditIcon size={14} />

                  <span>Ganti</span>
                </button>

                <button
                  type="button"
                  className="preview-remove-btn"
                  disabled={readingImage || busy || referenceSaved}
                  onClick={() => {
                    setImage(undefined);
                    setImageFile(undefined);
                    setError("");
                    if (fileRef.current) fileRef.current.value = "";
                  }}
                >
                  <TrashIcon size={14} />
                  <span>Hapus</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {error && <p role="alert">{error}</p>}

        {cannotDelete && (
          <p className="cannot-delete-hint">
            Referensi terkunci karena kebutuhan ini memiliki riwayat pembayaran.
          </p>
        )}

        <div className={`form-actions ${candidate ? "has-delete" : ""}`}>
          {candidate && (
            <button
              className="drawer-delete-icon-btn"
              type="button"
              disabled={cannotDelete || readingImage || busy}
              title={
                cannotDelete
                  ? "Tidak bisa dihapus karena memiliki riwayat pembayaran"
                  : "Hapus referensi ini"
              }
              aria-label={`Hapus referensi ${candidate.name}`}
              onClick={deleteCandidate}
            >
              <TrashIcon size={18} />
            </button>
          )}

          <button
            className="secondary drawer-cancel-btn"
            type="button"
            disabled={busy}
            onClick={() => dialogRef.current?.close()}
          >
            Batal
          </button>

          <button
            className="primary drawer-submit-btn"
            type="submit"
            disabled={readingImage || busy || referenceSaved}
          >
            {busy ? "Menyimpan…" : candidate ? "Simpan" : "Tambah Referensi"}
          </button>
        </div>
      </form>
    </ReferenceSheet>
  );
}
