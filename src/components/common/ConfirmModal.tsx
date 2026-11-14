import {
  useState,
  useRef,
  useCallback,
  useEffect,
  type MouseEvent,
  type SyntheticEvent,
} from "react";
import { TrashIcon, InfoIcon } from "../../asset";
import {
  ConfirmDialog,
  ConfirmWrapper,
  ConfirmIconBadge,
  ConfirmTitle,
  ConfirmMessage,
  ConfirmActions,
} from "../../styles/ConfirmModal.styles";

export type ConfirmTone = "danger" | "warning" | "neutral";

export interface ConfirmModalProps {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  tone?: ConfirmTone;
  onConfirm: () => void;
  onCancel: () => void;
  busy?: boolean;
}

export function ConfirmModal({
  title,
  message,
  confirmText,
  cancelText = "Batal",
  tone = "danger",
  onConfirm,
  onCancel,
  busy = false,
}: ConfirmModalProps) {
  const [isClosing, setIsClosing] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const defaultConfirmText = tone === "danger" ? "Hapus" : "Konfirmasi";
  const resolvedConfirmText = confirmText ?? defaultConfirmText;

  const handleClose = useCallback(() => {
    if (busy) return;

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      dialogRef.current?.close();
      onCancel();
      return;
    }

    setIsClosing(true);
  }, [busy, onCancel]);

  const handleAnimationEnd = useCallback(() => {
    if (isClosing) {
      dialogRef.current?.close();
      onCancel();
    }
  }, [isClosing, onCancel]);

  const handleBackdropClick = useCallback(
    (event: MouseEvent<HTMLDialogElement>) => {
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
    },
    [handleClose],
  );

  const handleNativeCancel = useCallback(
    (event: SyntheticEvent<HTMLDialogElement, Event>) => {
      event.preventDefault();
      handleClose();
    },
    [handleClose],
  );

  const handleConfirmClick = useCallback(() => {
    if (busy) return;
    onConfirm();
  }, [busy, onConfirm]);

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
    <ConfirmDialog
      ref={dialogRef}
      className={isClosing ? "closing" : undefined}
      onClick={handleBackdropClick}
      onCancel={handleNativeCancel}
      onAnimationEnd={handleAnimationEnd}
      aria-labelledby="confirm-modal-title"
      aria-describedby="confirm-modal-desc"
    >
      <ConfirmWrapper>
        <ConfirmIconBadge $tone={tone} aria-hidden="true">
          {tone === "danger" ? <TrashIcon size={24} /> : <InfoIcon size={24} />}
        </ConfirmIconBadge>

        <ConfirmTitle id="confirm-modal-title" $tone={tone}>
          {title}
        </ConfirmTitle>

        <ConfirmMessage id="confirm-modal-desc">{message}</ConfirmMessage>

        <ConfirmActions>
          <button
            type="button"
            className="cancel-btn"
            onClick={handleClose}
            disabled={busy || isClosing}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className={`confirm-btn tone-${tone}`}
            onClick={handleConfirmClick}
            disabled={busy || isClosing}
          >
            {resolvedConfirmText}
          </button>
        </ConfirmActions>
      </ConfirmWrapper>
    </ConfirmDialog>
  );
}
