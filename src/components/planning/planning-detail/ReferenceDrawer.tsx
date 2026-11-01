import {
  useState,
  useRef,
  useEffect,
  type Dispatch,
  type ChangeEvent,
  type FormEvent,
} from "react";
import type { Candidate } from "../../../data/wedding";
import { ReferenceSheet } from "../../../styles/PlanningDetail.styles";
import { formatRupiah } from "../../../utils/currency";

interface ReferenceDrawerProps {
  itemId: string;
  candidate: Candidate | null;
  minimumPrice: number;
  onSave: Dispatch<Candidate>;
  onClose: () => void;
}

export function ReferenceDrawer({
  itemId,
  candidate,
  minimumPrice,
  onSave,
  onClose,
}: ReferenceDrawerProps) {
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

  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (readingImage || submittedRef.current) return;
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
    onSave({
      id: candidate?.id ?? crypto.randomUUID(),
      itemId,
      name,
      price,
      url: url || undefined,
      image,
    });
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
      onClose={onClose}
    >
      <div className="sheet-heading">
        <h2 id="reference-title">
          {candidate ? "Edit Referensi" : "Tambah Referensi"}
        </h2>

        <button
          type="button"
          aria-label="Tutup form referensi"
          onClick={() => dialogRef.current?.close()}
        >
          ×
        </button>
      </div>

      <p id="reference-description">
        Simpan produk atau vendor untuk dibandingkan. Data hanya tersimpan
        selama detail ini terbuka.
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
          name="price"
          type="number"
          min={minimumPrice}
          max={Number.MAX_SAFE_INTEGER}
          step="1"
          inputMode="numeric"
          defaultValue={candidate?.price ?? ""}
          required
        />

        {minimumPrice > 1 && (
          <p className="field-hint">
            Harga pilihan final minimal {formatRupiah(minimumPrice)}, sesuai
            total yang sudah dibayar.
          </p>
        )}

        <label htmlFor="reference-url">Link produk/vendor (opsional)</label>

        <input
          id="reference-url"
          name="url"
          type="url"
          defaultValue={candidate?.url ?? ""}
          placeholder="https://…"
        />
        <label htmlFor="reference-image">Gambar (opsional)</label>
        <input
          id="reference-image"
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          disabled={readingImage}
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
              disabled={readingImage}
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

        <div className="form-actions">
          <button
            className="secondary"
            type="button"
            onClick={() => dialogRef.current?.close()}
          >
            Batal
          </button>

          <button className="primary" type="submit" disabled={readingImage}>
            {candidate ? "Simpan Perubahan" : "Tambah Referensi"}
          </button>
        </div>
      </form>
    </ReferenceSheet>
  );
}
