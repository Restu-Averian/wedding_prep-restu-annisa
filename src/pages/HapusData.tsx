import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useApi, useItemMutation } from "../api/client";
import { queryKeys } from "../api/query";
import { ConfirmModal } from "../components/common/ConfirmModal";
import { ItemListSkeleton } from "../components/common/Skeletons";
import { StatusFeedback } from "../components/common/StatusFeedback";
import type { WeddingItem } from "../context/planning/types";
import { DeletePage } from "../styles/HapusData.styles";

export default function HapusData() {
  const [selected, setSelected] = useState<WeddingItem | null>(null);
  const [notice, setNotice] = useState("");
  const phase = useRef<"confirm" | "delete" | null>(null);
  const items = useApi<WeddingItem[]>(
    "/items",
    queryKeys.list({ category: "", q: "", selection: "all" }),
    0,
  );
  const deletion = useItemMutation(selected?.id);

  function onDelete(item: WeddingItem) {
    if (phase.current) return;
    phase.current = "confirm";
    deletion.reset();
    setNotice("");
    setSelected(item);
  }

  function onCancel() {
    if (phase.current === "delete") return;
    phase.current = null;
    setSelected(null);
    deletion.reset();
  }

  async function onConfirm() {
    if (!selected || phase.current !== "confirm") return;
    phase.current = "delete";
    try {
      await deletion.mutateAsync({
        path: `/items/${encodeURIComponent(selected.id)}`,
        method: "DELETE",
      });
      setNotice(`Item ${selected.name} beserta referensi dan riwayat pembayaran berhasil dihapus.`);
      setSelected(null);
      phase.current = null;
    } catch {
      phase.current = "confirm";
    }
  }

  return (
    <DeletePage>
      <Link className="text-link" to="/rencana">
        ← Kembali ke rencana
      </Link>
      <header className="planning-header">
        <div className="planning-header-text">
          <h1>Hapus Data</h1>
          <p className="subtitle">
            Hapus satu kebutuhan beserta seluruh referensi vendor, riwayat
            pembayaran, foto, dan invoice secara permanen.
          </p>
        </div>
      </header>

      <p className="hint">
        Jumlah pembayaran termasuk transaksi yang dibatalkan. Penghapusan tidak
        dapat diurungkan.
      </p>
      {notice && (
        <p role="status" className="panel">{notice}</p>
      )}
      {items.loading && <ItemListSkeleton count={4} />}
      {items.error && (
        <StatusFeedback
          title="Gagal Memuat Kebutuhan"
          message={items.error}
          onRetry={items.retry}
        />
      )}
      {!items.loading && !items.error && items.data?.length === 0 && (
        <StatusFeedback
          type="empty"
          title="Belum Ada Kebutuhan"
          message="Tidak ada item yang dapat dihapus."
        />
      )}
      {items.data && items.data.length > 0 && (
        <ul className="deletion-list" aria-label="Kebutuhan yang dapat dihapus">
          {items.data.map((item) => (
            <li className="panel deletion-row" key={item.id}>
              <div>
                <span className="eyebrow">{item.category.name}</span>
                <h2>{item.name}</h2>
                <p className="muted">
                  {item.candidateCount} referensi vendor · {item.paymentCount} pembayaran
                </p>
              </div>
              <button
                type="button"
                className="delete-button"
                disabled={selected !== null || deletion.isPending}
                aria-label={`Hapus ${item.name}`}
                onClick={() => onDelete(item)}
              >
                Hapus
              </button>
            </li>
          ))}
        </ul>
      )}
      {selected && (
        <ConfirmModal
          title={`Hapus ${selected.name}?`}
          message={`Semua data terkait akan dihapus secara permanen:\n\n• Item ${selected.name}\n• ${selected.candidateCount} referensi vendor\n• ${selected.paymentCount} riwayat pembayaran (termasuk yang dibatalkan)\n• Seluruh foto referensi dan invoice${deletion.error ? `\n\nPenghapusan gagal: ${deletion.error.message}` : ""}`}
          confirmText={deletion.isPending ? "Menghapus…" : "Hapus Permanen"}
          busy={deletion.isPending}
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      )}
    </DeletePage>
  );
}
