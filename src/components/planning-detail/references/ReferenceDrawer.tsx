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
import { TrashIcon } from "../../../asset";

export interface ReferenceDrawerProps {
  candidate: Candidate | null;
  onClose: (saved?: boolean) => void;
}

export function ReferenceDrawer({ candidate, onClose }: ReferenceDrawerProps) {
  const { item, selectedId, transactions, busy, mutate, saveReference } =
    usePlanningCtx();
  const minimumPrice = 0;
  const priceLocked = candidate?.id === selectedId && transactions.length > 0;
  const cannotDelete = transactions.length > 0;
  const [image, setImage] = useState(candidate?.image);
  const [readingImage, setReadingImage] = useState(false);
  const [error, setError] = useState("");
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
        setReadingImage(false);
      };
      preview.src = source;
    };
    reader.readAsDataURL(file);
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!item || busy || readingImage || submittedRef.current) return;
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
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
      await saveReference(reference);
      onClose(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Penyimpanan gagal.");
      submittedRef.current = false;
    }
  }

  async function deleteCandidate() {
    if (!candidate || cannotDelete || readingImage || busy) return;
    if (!window.confirm(`Hapus referensi "${candidate.name}"?`)) return;
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
        Simpan produk atau vendor untuk dibandingkan. Gambar hanya menjadi
        preview lokal.
      </p>

      <form
        onSubmit={save}
        onChange={(event) => {
          if (event.target.id !== "reference-image") setError("");
        }}
      >
        <label htmlFor="reference-name">Nama produk/vendor</label>

        <input
          id="reference-name"
          name="name"
          defaultValue={candidate?.name ?? ""}
          maxLength={120}
          required
        />

        <label htmlFor="reference-price">Harga (Rp)</label>

        <input
          id="reference-price"
          readOnly={priceLocked}
          name="price"
          type="number"
          min={minimumPrice}
          max={Number.MAX_SAFE_INTEGER}
          step="1"
          inputMode="numeric"
          defaultValue={candidate?.price ?? ""}
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
          accept="image/jpeg,image/png,image/webp"
          disabled={readingImage || busy}
          onChange={chooseImage}
          aria-describedby="reference-image-hint"
        />

        <p id="reference-image-hint" className="field-hint">
          JPEG, PNG, atau WebP, maksimal 5 MB. Gambar tidak diunggah ke server.
        </p>

        {readingImage && <p role="status">Membaca gambar…</p>}

        {image && (
          <div className="image-preview">
            <img src={image} alt="Preview gambar referensi" />

            <button
              className="secondary"
              type="button"
              disabled={readingImage || busy}
              onClick={() => {
                setImage(undefined);
                setError("");
                if (fileRef.current) fileRef.current.value = "";
              }}
            >
              Hapus Gambar
            </button>
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
            disabled={readingImage || busy}
          >
            {busy ? "Menyimpan…" : candidate ? "Simpan" : "Tambah Referensi"}
          </button>
        </div>
      </form>
    </ReferenceSheet>
  );
}
