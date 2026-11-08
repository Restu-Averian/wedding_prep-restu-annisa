import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { usePlanningCtx } from "../../context/planning/PlanningCtxProvider";
import { useApi, api } from "../../api/client";
import type { Category } from "../../context/planning/types";
import { CATEGORY_ICONS, CheckIcon, EditIcon, TrashIcon } from "../../asset";
import { formatRupiah } from "../../utils/currency";
import ItemDrawer from "../planning/ItemDrawer";

export default function Header() {
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const { item, retry, transactions, busy } = usePlanningCtx();

  const categories = useApi<Category[]>("/categories");

  const navigate = useNavigate();

  const { search } = useLocation();

  if (!item) return null;

  const CategoryIcon =
    CATEGORY_ICONS[item.categoryId] ||
    (item.category?.slug ? CATEGORY_ICONS[item.category.slug] : null);

  const isSelected = Boolean(item.selectedCandidateId);

  const hasTransactions = transactions.length > 0;

  return (
    <header className="detail-header-card">
      <div className="detail-header-badges">
        <span className="category-pill">
          {CategoryIcon && <CategoryIcon size={14} />}

          <span>{item.category.name}</span>
        </span>

        <span className="status-badge" data-selected={isSelected}>
          {isSelected && <CheckIcon size={11} />}
          <span>{isSelected ? "Sudah Dipilih" : "Belum Dipilih"}</span>
        </span>
      </div>

      <div className="detail-header-title-group">
        <h1>{item.name}</h1>

        <p className="detail-header-amount">
          <span>Total Biaya:</span>

          {formatRupiah(item.financial.effectiveAmount)}
        </p>
      </div>

      <div className="detail-header-actions">
        <button
          type="button"
          className="header-edit-btn"
          disabled={!categories.data || busy || deleting}
          onClick={() => setEditing(true)}
        >
          <EditIcon size={16} />

          <span>Edit Kebutuhan</span>
        </button>

        <button
          type="button"
          className="header-delete-btn"
          disabled={hasTransactions || busy || deleting}
          aria-label={deleting ? "Menghapus kebutuhan…" : "Hapus Kebutuhan"}
          title={
            hasTransactions
              ? "Tidak dapat dihapus karena memiliki riwayat pembayaran"
              : "Hapus Kebutuhan"
          }
          onClick={async () => {
            if (
              deleting ||
              !window.confirm(
                `Hapus kebutuhan "${item.name}" beserta referensinya?`,
              )
            ) {
              return;
            }

            setDeleting(true);
            setError("");

            try {
              await api(`/items/${item.id}`, "DELETE");

              navigate("/rencana" + search);
            } catch (err) {
              setError(
                err instanceof Error ? err.message : "Penghapusan gagal.",
              );

              setDeleting(false);
            }
          }}
        >
          <TrashIcon size={18} />
        </button>
      </div>

      {hasTransactions && (
        <p className="header-hint">
          *Kebutuhan ini tidak dapat dihapus karena sudah memiliki riwayat
          pembayaran.
        </p>
      )}

      {error && (
        <p className="header-error-alert" role="alert">
          {error}
        </p>
      )}

      {editing && categories.data && (
        <ItemDrawer
          item={item}
          categories={categories.data}
          onClose={() => setEditing(false)}
          onSaved={retry}
        />
      )}
    </header>
  );
}
