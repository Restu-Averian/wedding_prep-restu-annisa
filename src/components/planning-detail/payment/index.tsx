import { useState } from "react";
import { usePlanningCtx } from "../../../context/planning/PlanningCtxProvider";
import { CheckIcon, PlusIcon } from "../../../asset";
import PaymentDrawer from "./PaymentDrawer";
import PaymentVendorNotSelected from "./PaymentVendorNotSelected";
import PaymentSummaryCards from "./PaymentSummaryCards";
import PaymentHistory from "./PaymentHistory";
export { default as PaymentVendorNotSelected } from "./PaymentVendorNotSelected";
export { default as PaymentSummaryCards } from "./PaymentSummaryCards";
export { default as PaymentHistory } from "./PaymentHistory";
export { default as PaymentDrawer } from "./PaymentDrawer";

export default function PaymentSection() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { selected, paid, remaining } = usePlanningCtx();
  const status = !selected
    ? "Belum Ada Vendor"
    : remaining === 0
      ? "Lunas"
      : paid > 0
        ? "Belum Lunas"
        : "Belum Bayar";

  if (!selected) return null;

  return (
    <section
      id="panel-payments"
      role="tabpanel"
      aria-labelledby="tab-payments"
      className="detail-section"
    >
      <div className="section-heading">
        <h2 id="payments-title">Pembayaran</h2>
        <span
          className="badge"
          data-status={status.toLowerCase().replace(/\s+/g, "-")}
          data-selected={status === "Lunas"}
        >
          {status === "Lunas" && <CheckIcon size={12} />}
          {status}
        </span>
      </div>

      {!selected && <PaymentVendorNotSelected />}
      <PaymentSummaryCards />
      <PaymentHistory />

      {remaining > 0 && (
        <button
          className="primary action-pay-btn"
          type="button"
          onClick={() => setDrawerOpen(true)}
        >
          <PlusIcon size={18} />
          <span>Catat Pembayaran</span>
        </button>
      )}

      {drawerOpen && <PaymentDrawer onClose={() => setDrawerOpen(false)} />}
    </section>
  );
}
