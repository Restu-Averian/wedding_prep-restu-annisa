import { styled } from 'styled-components'
import { PlanningPage, PaymentSheet } from './Planning.styles'

export const DetailPage = styled(PlanningPage)`
  gap: 20px;
  width: 100%;
  max-width: 680px;
  min-width: 0;
  margin-inline: auto;
  box-sizing: border-box;
  overflow-x: clip;

  h1 {
    font-size: clamp(1.75rem, 5vw, 2.25rem);
    margin: 6px 0 0;
    overflow-wrap: anywhere;
  }

  h2 {
    font: 600 1.1rem/1.4 system-ui, sans-serif;
    margin: 0;
    color: #493426;
    overflow-wrap: anywhere;
  }

  h3 {
    font-size: 0.9375rem;
    margin: 0;
    overflow-wrap: anywhere;
  }

  /* Tab Navigation */
  .tab-bar {
    display: flex;
    gap: 6px;
    background: #f2e9df;
    padding: 4px;
    border-radius: 14px;
    border: 1px solid #e5d6c6;
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
  }

  .tab-button {
    flex: 1 1 0;
    min-width: 0;
    min-height: 42px;
    padding: 8px 10px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    border: 0;
    border-radius: 10px;
    font-weight: 500;
    font-size: 0.875rem;
    color: #796455;
    background: transparent;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    white-space: nowrap;
    overflow: hidden;
  }

  .tab-button svg {
    flex-shrink: 0;
  }

  .tab-button > span:first-of-type {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .tab-button:hover {
    color: #493426;
    background: rgba(255, 253, 249, 0.5);
  }

  .tab-button[aria-selected='true'] {
    background: #fffdfa;
    color: #493426;
    font-weight: 600;
    box-shadow: 0 2px 6px rgba(87, 67, 52, 0.08);
    border: 1px solid #ded0be;
  }

  .tab-pill {
    font-size: 0.75rem;
    padding: 2px 7px;
    border-radius: 10px;
    background: #ebdcd0;
    color: #5e4536;
    font-weight: 600;
    flex-shrink: 0;
    max-width: 90px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .tab-pill[data-status='lunas'] {
    background: #dbeee0;
    color: #276738;
  }

  .tab-pill[data-status='belum-lunas'] {
    background: #fce5dd;
    color: #a63c22;
  }

  .tab-pill[data-status='belum-bayar'] {
    background: #ece3d7;
    color: #6d5341;
  }

  .tab-pill[data-status='belum-ada-vendor'] {
    background: #f0e8dc;
    color: #785d49;
  }

  /* Section Common */
  .detail-section {
    padding-top: 12px;
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
    animation: fadeIn 0.25s ease-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(4px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .section-heading {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
  }

  .with-icon {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    max-width: 100%;
    overflow-wrap: anywhere;
  }

  .badge-row {
    margin-bottom: 6px;
  }

  .badge-selected {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: #deede0;
    color: #276738;
    font-weight: 600;
  }

  .badge[data-status='lunas'] { background: #deede0; color: #276738; }
  .badge[data-status='belum-lunas'] { background: #fbe6df; color: #a63c22; }
  .badge[data-status='belum-bayar'] { background: #f0e8dc; color: #6d5341; }
  .badge[data-status='belum-ada-vendor'] { background: #f2ebdf; color: #765f4d; }

  /* Notice Box */
  .notice-box {
    background: #fdf7ee;
    border: 1px solid #eedecb;
    border-radius: 14px;
    padding: 16px;
    margin-bottom: 16px;
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
  }

  .notice-content {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    color: #72533e;
    min-width: 0;
  }

  .notice-content svg {
    flex-shrink: 0;
    margin-top: 2px;
  }

  .notice-content > div {
    min-width: 0;
    overflow-wrap: anywhere;
  }

  .notice-box strong {
    display: block;
    margin-bottom: 4px;
    color: #553a2a;
  }

  .notice-box p {
    margin: 0;
    font-size: 0.875rem;
    line-height: 1.5;
    color: #72533e;
  }

  .select-vendor-shortcut {
    margin-top: 12px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 0.875rem;
    width: 100%;
    box-sizing: border-box;
  }

  /* Reference Cards */
  .selected-reference {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    padding: 16px;
    margin-bottom: 16px;
    background: #f7efe4;
    border: 1px solid #dfcfbe;
    border-radius: 16px;
    box-shadow: 0 4px 14px rgba(87, 67, 52, 0.05);
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
  }

  .reference-list {
    display: grid;
    gap: 12px;
    margin: 12px 0 16px;
    padding: 0;
    list-style: none;
    width: 100%;
    min-width: 0;
  }

  .reference {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 14px;
    border: 1px solid #ebdcd0;
    border-radius: 14px;
    padding: 16px;
    background: #fffdfa;
    transition: all 0.2s ease;
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
  }

  .reference:hover {
    background: #faf5ee;
    border-color: #d6c1b0;
  }

  .reference.is-selected {
    background: #f9f3ec;
    border-color: #cbb4a1;
    box-shadow: 0 2px 8px rgba(87, 67, 52, 0.06);
  }

  .reference-identity {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    min-width: 0;
  }

  .reference-identity > div {
    min-width: 0;
    overflow-wrap: anywhere;
  }

  .reference-image {
    width: 64px;
    height: 64px;
    flex-shrink: 0;
    object-fit: cover;
    border-radius: 10px;
    border: 1px solid #ebdcd0;
  }

  .reference-image-placeholder {
    width: 64px;
    height: 64px;
    flex-shrink: 0;
    border-radius: 10px;
    background: #f0e6dc;
    border: 1px dashed #ded0bf;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    color: #8c7566;
  }

  .reference-title {
    margin: 0 0 4px;
    font-size: 1rem;
    font-weight: 600;
    color: #493426;
  }

  .reference-price {
    margin: 0 0 4px;
    font-size: 0.9375rem;
    font-weight: 600;
    color: #795344;
  }

  .reference-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    align-items: center;
    width: 100%;
    min-width: 0;
    padding-top: 12px;
    border-top: 1px solid #f2e7dc;
    box-sizing: border-box;
  }

  .reference-actions .edit-btn {
    width: 100%;
    justify-content: center;
    min-height: 42px;
  }

  .reference-actions .select-wrapper {
    width: 100%;
    min-width: 0;
  }

  .reference-actions .select-btn {
    width: 100%;
    justify-content: center;
    min-height: 42px;
  }

  .reference-actions .badge-selected {
    width: 100%;
    justify-content: center;
    min-height: 42px;
    border-radius: 12px;
    box-sizing: border-box;
  }

  .reference-actions .hint {
    margin: 4px 0 0;
    font-size: 0.75rem;
    text-align: center;
  }

  .edit-btn, .toggle-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-size: 0.875rem;
    padding: 8px 12px;
    min-height: 40px;
  }

  .select-btn {
    min-height: 40px;
    padding: 8px 14px;
    font-size: 0.875rem;
  }

  .add-reference-btn, .action-pay-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    margin: 12px 0 6px;
    box-sizing: border-box;
  }

  /* Payment Summary Cards */
  .payment-summary-cards {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
    margin: 16px 0 24px;
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
  }

  .summary-card {
    padding: 14px;
    border-radius: 14px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    border: 1px solid transparent;
    min-width: 0;
    overflow-wrap: anywhere;
    box-sizing: border-box;
  }

  .card-total {
    background: #f7f1ea;
    border-color: #e8dacd;
  }

  .card-paid {
    background: #eff7f0;
    border-color: #d3ebd6;
  }

  .card-paid .summary-value {
    color: #206734;
  }

  .card-remaining {
    background: #fdf1ec;
    border-color: #f8dad0;
  }

  .card-remaining .summary-value {
    color: #ab3f24;
  }

  .summary-label {
    font-size: 0.8125rem;
    color: #7e6858;
    font-weight: 500;
  }

  .summary-value {
    font-size: 1.15rem;
    font-weight: 700;
    color: #493426;
    overflow-wrap: anywhere;
  }

  .summary-sub {
    font-size: 0.75rem;
    color: #8d7668;
    overflow-wrap: anywhere;
  }

  /* Transactions */
  .transactions-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0 12px;
  }

  .counter-badge {
    background: #ebdcd0;
    color: #5e4536;
    padding: 2px 8px;
    border-radius: 10px;
    font-size: 0.75rem;
  }

  .transactions {
    margin: 0 0 16px;
    padding: 0;
    list-style: none;
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
  }

  .transaction-item {
    border: 1px solid #ebdcd0;
    border-radius: 12px;
    background: #fffdfa;
    margin-bottom: 8px;
    overflow: hidden;
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
  }

  .transaction-item summary {
    cursor: pointer;
    padding: 14px 16px;
    min-height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    font-size: 0.9375rem;
    overflow-wrap: anywhere;
  }

  .transaction-item details[open] summary {
    border-bottom: 1px solid #ebdcd0;
    background: #faf5ee;
  }

  .transaction-kind {
    font-weight: 600;
    color: #553a2a;
    min-width: 0;
    overflow-wrap: anywhere;
  }

  .transaction-amount {
    color: #795344;
    flex-shrink: 0;
  }

  .transaction-details {
    display: grid;
    gap: 10px;
    padding: 14px 16px;
    margin: 0;
    background: #fffdfa;
    overflow-wrap: anywhere;
  }

  .empty-box {
    padding: 28px 16px;
    text-align: center;
    background: #f9f5ef;
    border: 1px dashed #ded0bf;
    border-radius: 14px;
    margin-bottom: 16px;
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
  }

  /* Responsive Adjustments for Mobile */
  @media (max-width: 600px) {
    .payment-summary-cards {
      grid-template-columns: 1fr;
      gap: 10px;
    }

    .selected-reference {
      flex-direction: column;
      align-items: stretch;
      gap: 12px;
      padding: 14px;
    }
  }

  @media (max-width: 480px) {
    .tab-bar {
      padding: 3px;
      gap: 4px;
    }

    .tab-button {
      padding: 7px 6px;
      font-size: 0.8125rem;
      gap: 4px;
    }

    .tab-pill {
      font-size: 0.6875rem;
      padding: 1px 5px;
      max-width: 72px;
    }

    .section-heading {
      align-items: flex-start;
    }
  }
`

export const ReferenceSheet = styled(PaymentSheet)`
  .secondary { border: 1px solid #ded0bf; background: #f7eee8; color: #574334; }
  .field-hint { margin: 0; font-size: 0.8125rem; }
  .image-preview { display: flex; flex-wrap: wrap; align-items: center; gap: 16px; }
  .image-preview img { width: 112px; height: 112px; object-fit: contain; border-radius: 8px; }
  .form-actions { display: flex; justify-content: flex-end; flex-wrap: wrap; gap: 12px; }
`
