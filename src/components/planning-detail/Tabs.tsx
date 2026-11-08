import { usePlanningCtx } from '../../context/planning/PlanningCtxProvider'
import { StoreIcon, WalletIcon } from '../../asset'

export function Tabs() {
  const { activeTab, setActiveTab, references, selected } = usePlanningCtx()
  return (
    <div className="tab-bar" role="tablist" aria-label="Menu Detail Rencana">
      <button
        type="button"
        role="tab"
        id="tab-references"
        aria-selected={activeTab === 'references'}
        aria-controls="panel-references"
        className="tab-button"
        onClick={() => setActiveTab('references')}
      >
        <StoreIcon size={16} />
        <span>Referensi</span>
        <span className="tab-pill">{references.length}</span>
      </button>

      {selected && <button
        type="button"
        role="tab"
        id="tab-payments"
        aria-selected={activeTab === 'payments'}
        aria-controls="panel-payments"
        className="tab-button"
        onClick={() => setActiveTab('payments')}
      >
        <WalletIcon size={16} />
        <span>Pembayaran</span>
      </button>}
    </div>
  )
}
