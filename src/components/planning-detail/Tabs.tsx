import { StoreIcon, WalletIcon } from './Icons'

export type DetailTabKey = 'references' | 'payments'

export interface TabsProps {
  activeTab: DetailTabKey
  // eslint-disable-next-line no-unused-vars
  onChangeTab: (tab: DetailTabKey) => void
  referenceCount: number
}

export function Tabs({
  activeTab,
  onChangeTab,
  referenceCount,
}: TabsProps) {
  return (
    <div className="tab-bar" role="tablist" aria-label="Menu Detail Rencana">
      <button
        type="button"
        role="tab"
        id="tab-references"
        aria-selected={activeTab === 'references'}
        aria-controls="panel-references"
        className="tab-button"
        onClick={() => onChangeTab('references')}
      >
        <StoreIcon size={16} />
        <span>Referensi</span>
        <span className="tab-pill">{referenceCount}</span>
      </button>

      <button
        type="button"
        role="tab"
        id="tab-payments"
        aria-selected={activeTab === 'payments'}
        aria-controls="panel-payments"
        className="tab-button"
        onClick={() => onChangeTab('payments')}
      >
        <WalletIcon size={16} />
        <span>Pembayaran</span>
      </button>
    </div>
  )
}
