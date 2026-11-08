import { usePlanningCtx } from "../../../context/planning/PlanningCtxProvider";
import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type MouseEvent,
} from "react";
import { PaymentSheet } from "../../../styles/Planning.styles";

export interface PaymentDrawerProps {
  onClose: () => void;
}

export function PaymentDrawer({ onClose }: PaymentDrawerProps) {
  const { item, remaining, busy, mutate } = usePlanningCtx();
  const [error, setError] = useState("");
  const [isClosing, setIsClosing] = useState(false);
  const submittingRef = useRef(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

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
          if (!item || isClosing || submittingRef.current) return;
          const form = event.currentTarget;
          const data = new FormData(form);
          const amount = Number(data.get("amount"));
          const kind = String(data.get("kind") ?? "");
          const date = String(data.get("date") ?? "");
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
          submittingRef.current = true;
          try {
            const types = { DP: "deposit", Cicilan: "installment", Pelunasan: "settlement" };
            await mutate("/payments", "POST", {
              type: types[kind as keyof typeof types], amount, paidAt: date,
              note: String(data.get("note") ?? "").trim(),
            });
            submittingRef.current = false;
            handleClose();
          } catch (error) {
            setError(error instanceof Error ? error.message : "Pembayaran gagal disimpan.");
          } finally {
            submittingRef.current = false;
          }
        }}
        onChange={() => setError("")}
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

        {error && <p role="alert">{error}</p>}

        <button className="primary" type="submit" disabled={isClosing || busy}>
          {busy ? "Menyimpan…" : "Simpan Pembayaran"}
        </button>
      </form>
    </PaymentSheet>
  );
}

export default PaymentDrawer;
