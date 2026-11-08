import { usePlanningCtx } from "../../../context/planning/PlanningCtxProvider";
import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type ChangeEvent,
  type MouseEvent,
} from "react";
import { PaymentSheet } from "../../../styles/Planning.styles";
import { EditIcon, ReceiptIcon, TrashIcon } from "../../../asset";

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export interface PaymentDrawerProps {
  onClose: () => void;
}

export default function PaymentDrawer({ onClose }: PaymentDrawerProps) {
  const { item, remaining, busy, mutate } = usePlanningCtx();
  const [error, setError] = useState("");
  const [paymentSaved, setPaymentSaved] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const submittingRef = useRef(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [invoiceFile, setInvoiceFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    event.stopPropagation();
    const file = event.target.files?.[0];
    if (!file) return;

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }

    if (
      file.size > 5 * 1024 * 1024 ||
      !["application/pdf", "image/jpeg", "image/png"].includes(file.type)
    ) {
      setError("Gunakan invoice PDF, JPG, atau PNG maksimal 5 MiB.");
      setInvoiceFile(null);
      event.target.value = "";
      return;
    }

    setError("");
    setInvoiceFile(file);

    if (file.type.startsWith("image/")) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  }

  function handleRemoveInvoice() {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    setInvoiceFile(null);
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  const handleClose = useCallback(() => {
    if (submittingRef.current) return;

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      dialogRef.current?.close();
      return;
    }

    setIsClosing(true);
  }, []);

  function handleAnimationEnd() {
    if (isClosing) {
      dialogRef.current?.close();
    }
  }

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === dialogRef.current) {
      const rect = dialogRef.current.getBoundingClientRect();

      const isInside =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;

      if (!isInside) {
        handleClose();
      }
    }
  }

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    const previousOverflow = document.body.style.overflow;

    dialog.showModal();

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <PaymentSheet
      ref={dialogRef}
      className={isClosing ? "closing" : undefined}
      aria-labelledby="drawer-title"
      aria-describedby="drawer-description"
      onAnimationEnd={handleAnimationEnd}
      onCancel={(event) => {
        event.preventDefault();
        handleClose();
      }}
      onClick={handleBackdropClick}
      onClose={onClose}
    >
      <div className="sheet-heading">
        <h2 id="drawer-title">Catat Pembayaran</h2>

        <button
          type="button"
          aria-label="Tutup form pembayaran"
          onClick={handleClose}
        >
          ×
        </button>
      </div>

      <p id="drawer-description">
        {item?.name} · Pembayaran akan tersimpan di database.
      </p>

      <form
        onSubmit={async (event) => {
          event.preventDefault();
          if (!item || isClosing || paymentSaved || submittingRef.current) {
            return;
          }

          const form = event.currentTarget;
          const data = new FormData(form);
          const amount = Number(data.get("amount"));
          const kind = String(data.get("kind") ?? "");
          const date = String(data.get("date") ?? "");

          const invoice = data.get("invoice");

          if (
            !Number.isSafeInteger(amount) ||
            amount <= 0 ||
            amount > remaining ||
            !["DP", "Cicilan", "Pelunasan"].includes(kind) ||
            !date ||
            !form.checkValidity()
          ) {
            setError(
              "Periksa isian. Nominal harus berupa rupiah utuh dan tidak melebihi sisa pembayaran.",
            );
            return;
          }

          if (
            invoice instanceof File &&
            invoice.name &&
            (!invoice.size ||
              invoice.size > 5 * 1024 * 1024 ||
              !["application/pdf", "image/jpeg", "image/png"].includes(
                invoice.type,
              ))
          ) {
            setError("Gunakan invoice PDF, JPG, atau PNG maksimal 5 MiB.");
            return;
          }

          submittingRef.current = true;

          try {
            const types = {
              DP: "deposit",
              Cicilan: "installment",
              Pelunasan: "settlement",
            };

            const payload = new FormData();
            payload.set("type", types[kind as keyof typeof types]);
            payload.set("amount", String(amount));
            payload.set("paidAt", date);
            payload.set("note", String(data.get("note") ?? "").trim());

            if (invoice instanceof File && invoice.name) {
              payload.set("invoice", invoice);
            }

            await mutate("/payments", "POST", payload);
            submittingRef.current = false;
            handleClose();
          } catch (error) {
            if (error instanceof Error && error.name === "PaymentSavedError") {
              setPaymentSaved(true);
            }

            setError(
              error instanceof Error
                ? error.message
                : "Pembayaran gagal disimpan.",
            );
          } finally {
            submittingRef.current = false;
          }
        }}
        onChange={() => {
          if (!paymentSaved) setError("");
        }}
      >
        <label htmlFor="payment-kind">Jenis pembayaran</label>
        <select id="payment-kind" name="kind" required defaultValue="">
          <option value="" disabled>
            Pilih jenis pembayaran
          </option>
          <option>DP</option>
          <option>Cicilan</option>
          <option>Pelunasan</option>
        </select>

        <label htmlFor="payment-amount">Nominal (Rp)</label>
        <input
          id="payment-amount"
          name="amount"
          type="number"
          min="1"
          max={remaining}
          step="1"
          inputMode="numeric"
          required
          placeholder="Contoh: 100000"
        />

        <label htmlFor="payment-date">Tanggal</label>
        <input id="payment-date" name="date" type="date" required />

        <label htmlFor="payment-note">Catatan (opsional)</label>
        <textarea
          id="payment-note"
          name="note"
          rows={3}
          maxLength={500}
          placeholder="Catatan pembayaran…"
        />

        <label htmlFor="payment-invoice">Invoice (opsional)</label>
        <input
          id="payment-invoice"
          name="invoice"
          ref={fileInputRef}
          type="file"
          className="sr-only"
          accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
          aria-describedby="payment-invoice-help"
          disabled={busy || paymentSaved}
          onChange={handleFileChange}
        />

        {!invoiceFile ? (
          <label
            htmlFor="payment-invoice"
            className="image-dropzone"
          >
            <div className="dropzone-icon-circle" aria-hidden="true">
              <ReceiptIcon size={22} />
            </div>

            <div className="dropzone-text-group">
              <span className="dropzone-title">Upload Invoice Pembayaran</span>
              <span id="payment-invoice-help" className="dropzone-subtitle">
                PDF, JPG, atau PNG · Maksimal 5 MB
              </span>
            </div>
          </label>
        ) : (
          <div className="image-preview-card">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview invoice"
                className="preview-thumb"
              />
            ) : (
              <div className="preview-pdf-badge" aria-label="Dokumen PDF">
                <ReceiptIcon size={26} />
                <span className="pdf-tag">PDF</span>
              </div>
            )}

            <div className="preview-details">
              <div className="preview-status-badge">
                <ReceiptIcon size={12} />
                <span>Invoice terlampir</span>
              </div>

              <span className="preview-filename" title={invoiceFile.name}>
                {invoiceFile.name}
              </span>

              <span className="preview-filesize">
                {formatFileSize(invoiceFile.size)}
              </span>

              <div className="preview-actions">
                <button
                  type="button"
                  className="preview-change-btn"
                  disabled={busy || paymentSaved}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <EditIcon size={14} />
                  <span>Ganti</span>
                </button>

                <button
                  type="button"
                  className="preview-remove-btn"
                  disabled={busy || paymentSaved}
                  onClick={handleRemoveInvoice}
                >
                  <TrashIcon size={14} />
                  <span>Hapus</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {error && <p role="alert">{error}</p>}

        <button
          className="primary"
          type="submit"
          disabled={isClosing || busy || paymentSaved}
        >
          {paymentSaved
            ? "Pembayaran Tersimpan"
            : busy
              ? "Menyimpan…"
              : "Simpan Pembayaran"}
        </button>
      </form>
    </PaymentSheet>
  );
}
