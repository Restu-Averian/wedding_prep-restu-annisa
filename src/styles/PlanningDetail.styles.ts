import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { PlanningPage, PaymentSheet } from "./Planning.styles";

export const DetailTopBar = styled.nav`
  position: sticky;
  top: 0;
  z-index: 30;
  margin: -32px -16px 4px -16px;
  padding: 10px 16px;
  background: rgba(255, 250, 242, 0.94);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid #ebdcd0;
  box-shadow: 0 2px 8px rgba(87, 67, 52, 0.03);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 52px;
  box-sizing: border-box;

  .top-bar-title {
    font-family: Georgia, serif;
    font-size: 0.9375rem;
    font-weight: 500;
    color: #493426;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    flex: 1;
    min-width: 0;
  }

  .top-bar-pill {
    display: inline-flex;
    align-items: center;
    padding: 3px 8px;
    border-radius: 9999px;
    background: #f4eae0;
    color: #79583e;
    font-size: 0.6875rem;
    font-weight: 600;
    line-height: 1;
    letter-spacing: 0.02em;
    flex-shrink: 0;
  }

  .back-label-desktop {
    display: none;
  }

  .back-label-mobile {
    display: inline;
  }

  @media (min-width: 480px) and (max-width: 767px) {
    margin: -40px -24px 4px -24px;
    padding: 10px 20px;
  }

  @media (min-width: 768px) {
    position: static;
    margin: 0;
    padding: 0;
    background: transparent;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    border-bottom: 0;
    box-shadow: none;
    min-height: auto;
    justify-content: flex-start;

    .top-bar-title,
    .top-bar-pill {
      display: none;
    }

    .back-label-desktop {
      display: inline;
    }

    .back-label-mobile {
      display: none;
    }
  }
`;

export const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 38px;
  padding: 6px 14px 6px 10px;
  border-radius: 9999px;
  background: #f4eae0;
  border: 1px solid #ebdcd0;
  color: #493426;
  font-size: 0.84375rem;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  flex-shrink: 0;
  transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);

  svg {
    flex-shrink: 0;
    transition: transform 0.18s ease;
  }

  &:hover {
    background: #ebdccf;
    color: #3b281c;

    svg {
      transform: translateX(-2px);
    }
  }

  &:active {
    transform: scale(0.97);
  }
`;

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
    font:
      600 1.1rem/1.4 system-ui,
      sans-serif;
    margin: 0;
    color: #493426;
    overflow-wrap: anywhere;
  }

  h3 {
    font-size: 0.9375rem;
    margin: 0;
    overflow-wrap: anywhere;
  }

  /* Detail Header Card */
  .detail-header-card {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 18px 20px;
    background: #fffdf9;
    border: 1px solid #ebdcd0;
    border-radius: 18px;
    box-shadow: 0 2px 8px rgba(87, 67, 52, 0.04);
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
  }

  .detail-header-badges {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    flex-wrap: wrap;
  }

  .category-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border-radius: 999px;
    background: #f4eae0;
    color: #79583e;
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1;
    letter-spacing: 0.01em;
  }

  .category-pill svg {
    flex-shrink: 0;
  }

  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1;
    background: #f4eae0;
    color: #675344;
  }

  .status-badge[data-selected="true"] {
    background: #eee0e2;
    color: #754c54;
  }

  .detail-header-title-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .detail-header-title-group h1 {
    margin: 0;
    font-family: Georgia, serif;
    font-weight: 400;
    font-size: clamp(1.5rem, 4.5vw, 2.15rem);
    line-height: 1.25;
    color: #493426;
    overflow-wrap: anywhere;
  }

  .detail-header-amount {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    color: #795344;
    font-variant-numeric: tabular-nums;
  }

  .detail-header-amount span {
    font-size: 0.8125rem;
    font-weight: 400;
    color: #826451;
    margin-right: 6px;
  }

  .detail-header-actions {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    margin-top: 4px;
  }

  .header-edit-btn {
    flex: 1 1 0;
    min-height: 44px;
    padding: 10px 16px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border-radius: 12px;
    border: 1px solid #ded0bf;
    background: #f7eee8;
    color: #574334;
    font-weight: 600;
    font-size: 0.875rem;
    transition:
      background 0.18s ease,
      border-color 0.18s ease;
  }

  .header-edit-btn:hover:not(:disabled) {
    background: #eee1d8;
    border-color: #cbb9a5;
  }

  .header-delete-btn {
    width: 44px;
    height: 44px;
    flex-shrink: 0;
    padding: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    border: 1.5px solid #f2bdb5;
    background: #fff6f4;
    color: #b83321;
    transition: all 0.2s ease;
  }

  .header-delete-btn:hover:not(:disabled) {
    background: #feece8;
    border-color: #e09b90;
  }

  .header-delete-btn:disabled {
    cursor: not-allowed;
    opacity: 0.45;
    border-color: #ebdcd0;
    background: #f9f5f1;
    color: #a89485;
  }

  .header-hint {
    margin: -4px 0 0;
    font-size: 0.75rem;
    color: #826451;
    line-height: 1.4;
  }

  .header-error-alert {
    margin: 0;
    padding: 8px 12px;
    border-radius: 10px;
    background: #fff5f5;
    border: 1px solid #fed7d7;
    color: #c53030;
    font-size: 0.8125rem;
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

  .tab-button[aria-selected="true"] {
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

  .tab-pill[data-status="lunas"] {
    background: #dbeee0;
    color: #276738;
  }

  .tab-pill[data-status="belum-lunas"] {
    background: #fce5dd;
    color: #a63c22;
  }

  .tab-pill[data-status="belum-bayar"] {
    background: #ece3d7;
    color: #6d5341;
  }

  .tab-pill[data-status="belum-ada-vendor"] {
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
    from {
      opacity: 0;
      transform: translateY(4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
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

  .badge[data-status="lunas"] {
    background: #deede0;
    color: #276738;
  }
  .badge[data-status="belum-lunas"] {
    background: #fbe6df;
    color: #a63c22;
  }
  .badge[data-status="belum-bayar"] {
    background: #f0e8dc;
    color: #6d5341;
  }
  .badge[data-status="belum-ada-vendor"] {
    background: #f2ebdf;
    color: #765f4d;
  }

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

  /* Reference Section & Cards */
  .section-title-wrap {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
  }

  .reference-count-pill {
    font-size: 0.75rem;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 10px;
    background: #ebdcd0;
    color: #5e4536;
    flex-shrink: 0;
  }

  .add-btn-compact {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    min-height: 38px;
    font-size: 0.8125rem;
    font-weight: 600;
    border-radius: 10px;
    flex-shrink: 0;
  }

  .reference-sections {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 0;
  }

  .reference-group {
    width: 100%;
    min-width: 0;
  }

  .reference-group-label {
    margin: 8px 0 6px;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #795344;
  }

  .reference-divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 16px 0 10px;
    color: #8c7566;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.03em;
  }

  .reference-divider::before,
  .reference-divider::after {
    content: "";
    flex: 1;
    height: 1px;
    background: #ebdcd0;
  }

  .reference-list {
    display: grid;
    gap: 14px;
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
    gap: 12px;
    border: 1px solid #ebdcd0;
    border-radius: 16px;
    padding: 14px 16px;
    background: #fffdfa;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
    box-shadow: 0 2px 6px rgba(87, 67, 52, 0.03);
  }

  .reference:hover {
    background: #faf6f0;
    border-color: #d6c1b0;
    box-shadow: 0 4px 12px rgba(87, 67, 52, 0.06);
  }

  .reference.is-selected {
    background: #fcf9f5;
    border: 1.5px solid #c9b09c;
    box-shadow: 0 4px 16px rgba(121, 83, 68, 0.08);
  }

  .reference-card-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    width: 100%;
    min-width: 0;
  }

  .reference-identity {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1 1 0;
    min-width: 0;
  }

  .reference-info {
    flex: 1 1 0;
    min-width: 0;
    overflow-wrap: anywhere;
  }

  .reference-image {
    width: 68px;
    height: 68px;
    flex-shrink: 0;
    object-fit: cover;
    border-radius: 12px;
    border: 1px solid #ebdcd0;
    background: #fdfaf6;
  }

  .reference-image-placeholder {
    width: 68px;
    height: 68px;
    flex-shrink: 0;
    border-radius: 12px;
    background: #f4ece3;
    border: 1px solid #e5d7c9;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #8c7566;
  }

  .reference-title {
    margin: 0 0 4px;
    font-size: 1rem;
    font-weight: 600;
    color: #493426;
    line-height: 1.35;
  }

  .reference-price {
    margin: 0 0 6px;
    font-size: 0.9375rem;
    font-weight: 700;
    color: #795344;
  }

  .reference-link {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 0.8125rem;
    color: #795344;
    text-decoration: none;
    font-weight: 500;
    border-bottom: 1px dashed #cbb4a1;
    padding-bottom: 1px;
    width: fit-content;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: all 0.15s ease;
  }

  .reference-link:hover {
    color: #493426;
    border-bottom-style: solid;
  }

  .reference-link-empty {
    font-size: 0.75rem;
    color: #9c8a7d;
  }

  .edit-icon-btn {
    width: 36px;
    height: 36px;
    padding: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    border: 1px solid #e7d8cb;
    background: #fbf6f0;
    color: #6a5344;
    flex-shrink: 0;
    transition: all 0.2s ease;
  }

  .edit-icon-btn:hover {
    background: #f3eae0;
    color: #493426;
    border-color: #d6c1b0;
  }

  .reference-actions {
    width: 100%;
    min-width: 0;
    padding-top: 10px;
    border-top: 1px solid #f2e7dc;
    box-sizing: border-box;
  }

  .reference-actions .select-wrapper {
    width: 100%;
    min-width: 0;
  }

  .reference-actions .select-btn {
    width: 100%;
    justify-content: center;
    min-height: 44px;
    font-weight: 600;
  }

  .select-btn.outline {
    background: #fffdfa;
    color: #795344;
    border: 1.5px solid #795344;
    box-shadow: 0 1px 3px rgba(121, 83, 68, 0.04);
    transition: all 0.2s ease;
  }

  .select-btn.outline:hover:not(:disabled) {
    background: #f7eee8;
    border-color: #654333;
    color: #654333;
  }

  .unselect-reference-btn {
    min-height: 44px;
    padding: 8px 14px;
    background: transparent;
    border: 0;
    border-radius: 6px;
    color: #654b3c;
    font: inherit;
    font-size: 0.875rem;
    cursor: pointer;
    width: 100%;
    margin-top: 8px;
  }

  .unselect-reference-btn:hover:not(:disabled) {
    background: #f3eae0;
  }

  .unselect-reference-btn:focus-visible {
    outline: 2px solid #795344;
    outline-offset: 2px;
  }

  .unselect-reference-btn:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  .badge-selected-status {
    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    min-height: 42px;
    padding: 8px 12px;
    border-radius: 12px;
    background: #eaf3eb;
    color: #276738;
    border: 1px solid #c8e0cc;
    font-size: 0.875rem;
    font-weight: 600;
    box-sizing: border-box;
  }

  .cannot-select-hint {
    margin: 6px 0 0;
    font-size: 0.75rem;
    color: #a63c22;
    text-align: center;
  }

  .reference-empty-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px 20px;
    background: #fbf8f4;
    border: 1.5px dashed #ddcfbe;
    border-radius: 16px;
    margin-bottom: 16px;
    text-align: center;
  }

  .reference-empty-box .empty-icon-wrap {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: #f0e5d8;
    color: #795344;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
  }

  .add-first-btn {
    margin-top: 14px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
  }

  .session-hint {
    text-align: center;
    margin: 12px 0 4px;
    font-size: 0.75rem;
    color: #8c7566;
  }

  .edit-btn,
  .toggle-btn {
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

  .add-reference-btn,
  .action-pay-btn {
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
    box-shadow: 0 1px 3px rgba(87, 67, 52, 0.02);
    transition:
      transform 0.15s ease,
      box-shadow 0.15s ease;
  }

  .summary-card .card-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 2px;
  }

  .summary-icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 8px;
    flex-shrink: 0;
  }

  .card-total {
    background: #faf6f0;
    border-color: #ebdccf;
  }

  .card-total .summary-icon-wrapper {
    background: #f0e4d7;
    color: #795344;
  }

  .card-paid {
    background: #f4f9f5;
    border-color: #d2e7d6;
  }

  .card-paid .summary-icon-wrapper {
    background: #dff0e3;
    color: #206734;
  }

  .card-paid .summary-value {
    color: #206734;
  }

  .card-remaining {
    background: #fdf5f2;
    border-color: #f6d8d0;
  }

  .card-remaining .summary-icon-wrapper {
    background: #fce4dc;
    color: #ab3f24;
  }

  .card-remaining .summary-value {
    color: #ab3f24;
  }

  .card-remaining[data-lunas="true"] {
    background: #f4f9f5;
    border-color: #d2e7d6;
  }

  .card-remaining[data-lunas="true"] .summary-icon-wrapper {
    background: #dff0e3;
    color: #206734;
  }

  .card-remaining[data-lunas="true"] .summary-value {
    color: #206734;
  }

  .card-remaining[data-lunas="true"] .summary-sub {
    color: #206734;
    font-weight: 500;
  }

  .summary-label {
    font-size: 0.78125rem;
    color: #7e6858;
    font-weight: 600;
  }

  .summary-value {
    font-size: 1.15rem;
    font-weight: 700;
    color: #493426;
    overflow-wrap: anywhere;
    font-variant-numeric: tabular-nums;
    line-height: 1.25;
  }

  .summary-sub {
    font-size: 0.75rem;
    color: #8d7668;
    overflow-wrap: anywhere;
    line-height: 1.3;
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
    font-weight: 600;
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
    border-radius: 14px;
    background: #fffdfa;
    margin-bottom: 10px;
    overflow: hidden;
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
    box-shadow: 0 1px 3px rgba(85, 58, 42, 0.04);
    transition:
      border-color 0.15s ease,
      box-shadow 0.15s ease;
  }

  .transaction-item:hover {
    border-color: #d8c2b0;
    box-shadow: 0 2px 6px rgba(85, 58, 42, 0.07);
  }

  .transaction-item summary {
    cursor: pointer;
    padding: 12px 16px;
    min-height: 52px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    font-size: 0.9375rem;
    list-style: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  .transaction-item summary::-webkit-details-marker {
    display: none;
  }

  .transaction-item details[open] summary {
    border-bottom: 1px solid #ebdcd0;
    background: #faf5ee;
  }

  .transaction-meta {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    min-width: 0;
  }

  .transaction-kind-badge {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    padding: 2px 8px;
    border-radius: 6px;
    display: inline-flex;
    align-items: center;
    text-transform: capitalize;
  }

  .transaction-kind-badge[data-kind="dp"] {
    background: #fef3c7;
    color: #92400e;
    border: 1px solid #fde68a;
  }

  .transaction-kind-badge[data-kind="cicilan"] {
    background: #ede9fe;
    color: #6b21a8;
    border: 1px solid #ddd6fe;
  }

  .transaction-kind-badge[data-kind="pelunasan"] {
    background: #deede0;
    color: #276738;
    border: 1px solid #cce3d0;
  }

  .transaction-date-quick {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 0.8125rem;
    color: #8d7668;
    font-weight: 500;
  }

  .transaction-date-quick svg {
    color: #a48c7c;
  }

  .transaction-value {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
  }

  .transaction-amount {
    font-size: 1rem;
    font-weight: 700;
    color: #493426;
    letter-spacing: -0.01em;
  }

  .chevron-indicator {
    color: #9f8877;
    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    flex-shrink: 0;
  }

  .transaction-item details[open] .chevron-indicator {
    transform: rotate(180deg);
    color: #6d5341;
  }

  .transaction-details {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px 18px;
    margin: 0;
    background: #fffdfa;
    font-size: 0.875rem;
  }

  .detail-row {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .detail-label {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #8d7668;
    line-height: 1.2;
  }

  .detail-label svg {
    color: #a48c7c;
  }

  .detail-text {
    color: #493426;
    font-size: 0.9375rem;
    font-weight: 500;
    line-height: 1.4;
    padding-left: 1px;
  }

  .detail-note {
    background: #fbf7f2;
    border: 1px solid #ebdcd0;
    border-radius: 10px;
    padding: 10px 14px;
    color: #553a2a;
    font-size: 0.875rem;
    line-height: 1.5;
  }

  .muted-note {
    color: #a48c7c;
    font-style: italic;
    font-weight: 400;
  }

  .invoice-download-card {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 14px;
    background: #fbf7f2;
    border: 1px solid #ebdcd0;
    border-radius: 12px;
    text-decoration: none;
    color: inherit;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 1px 3px rgba(85, 58, 42, 0.03);
    width: 100%;
    box-sizing: border-box;
  }

  .invoice-download-card:hover {
    background: #f6efe6;
    border-color: #d6c1b0;
    box-shadow: 0 2px 6px rgba(85, 58, 42, 0.06);
    transform: translateY(-1px);
  }

  .invoice-download-card:focus-visible {
    outline: 2px solid #795344;
    outline-offset: 2px;
  }

  .invoice-card-icon {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: #f1e4d8;
    border: 1px solid #e2d1c2;
    color: #795344;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .invoice-card-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1 1 0;
    min-width: 0;
  }

  .invoice-filename {
    font-size: 0.875rem;
    font-weight: 600;
    color: #493426;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 1.3;
  }

  .invoice-meta {
    font-size: 0.75rem;
    color: #8d7668;
    font-weight: 500;
  }

  .invoice-action-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 0.8125rem;
    font-weight: 600;
    color: #795344;
    padding: 6px 10px;
    border-radius: 8px;
    background: #fffdfa;
    border: 1px solid #ded0bf;
    flex-shrink: 0;
    transition: all 0.15s ease;
  }

  .invoice-download-card:hover .invoice-action-badge {
    background: #795344;
    color: #fffdfa;
    border-color: #795344;
  }

  .payment-history-actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 4px;
    padding-top: 14px;
    border-top: 1px solid #f2e7dc;
  }

  .payment-history-actions .payment-edit-btn,
  .payment-history-actions .payment-delete-btn {
    min-height: 38px;
    padding: 6px 14px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    border-radius: 10px;
    font: inherit;
    font-size: 0.8125rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.18s ease;
  }

  .payment-history-actions .payment-edit-btn {
    background: #f7eee8;
    border: 1px solid #ded0bf;
    color: #574334;
  }

  .payment-history-actions .payment-edit-btn:hover:not(:disabled) {
    background: #eee1d8;
    border-color: #cbb9a5;
    color: #433125;
  }

  .payment-history-actions .payment-delete-btn {
    background: #fff6f4;
    border: 1px solid #f2bdb5;
    color: #b83321;
  }

  .payment-history-actions .payment-delete-btn:hover:not(:disabled) {
    background: #feece8;
    border-color: #e09b90;
    color: #962818;
  }

  .payment-history-actions button:focus-visible {
    outline: 2px solid #795344;
    outline-offset: 2px;
  }

  .payment-history-actions button:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    background: #f9f5f1;
    border-color: #ebdcd0;
    color: #a89485;
  }

  .payment-empty-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px 20px;
    background: #fbf7f1;
    border: 1.5px dashed #ddcfbe;
    border-radius: 16px;
    margin-bottom: 16px;
    text-align: center;
  }

  .payment-empty-box .empty-icon-wrap {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: #f0e5d8;
    color: #795344;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
  }

  .payment-empty-box .empty-title {
    font-weight: 600;
    font-size: 0.9375rem;
    color: #493426;
    margin: 0 0 6px;
  }

  .payment-empty-box .empty-subtitle {
    font-size: 0.8125rem;
    color: #8d7668;
    margin: 0;
    max-width: 320px;
    line-height: 1.4;
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
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
    }

    .payment-summary-cards .card-remaining {
      grid-column: span 2;
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

    .transaction-item summary {
      padding: 12px 14px;
      gap: 8px;
    }

    .transaction-amount {
      font-size: 0.9375rem;
    }
  }
`;

export const ReferenceSheet = styled(PaymentSheet)`
  .secondary {
    border: 1px solid #ded0bf;
    background: #f7eee8;
    color: #574334;
  }
  .field-hint {
    margin: 0;
    font-size: 0.8125rem;
  }
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
  .image-dropzone {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 22px 16px;
    border-radius: 16px;
    border: 1.5px dashed #d9c8b5;
    background: #faf3ec;
    cursor: pointer;
    text-align: center;
    box-sizing: border-box;
    transition:
      background 0.2s ease,
      border-color 0.2s ease,
      box-shadow 0.2s ease;
  }
  .image-dropzone:hover {
    background: #f5ebe0;
    border-color: #9c7664;
  }
  .image-dropzone:focus-within {
    border-color: #795344;
    box-shadow: 0 0 0 3px rgba(121, 83, 68, 0.12);
  }
  .image-dropzone.is-reading {
    opacity: 0.65;
    pointer-events: none;
  }
  .dropzone-icon-circle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: #eee1d4;
    color: #795344;
    transition:
      transform 0.2s ease,
      background 0.2s ease;
  }
  .image-dropzone:hover .dropzone-icon-circle {
    transform: scale(1.05);
    background: #e8d7c7;
  }
  .dropzone-text-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
  }
  .dropzone-title {
    font-size: 0.875rem;
    font-weight: 600;
    color: #574334;
  }
  .dropzone-subtitle {
    font-size: 0.75rem;
    color: #88656b;
  }
  .image-preview-card {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 14px;
    border: 1px solid #ebdccf;
    border-radius: 14px;
    background: #fffdfa;
    box-shadow: 0 1px 3px rgba(87, 67, 52, 0.04);
  }
  .preview-thumb {
    width: 68px;
    height: 68px;
    object-fit: cover;
    border-radius: 10px;
    border: 1px solid #ebdcd0;
    flex-shrink: 0;
    background: #f7eee8;
  }
  .preview-details {
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-width: 0;
    flex: 1 1 0;
  }
  .preview-status-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    width: fit-content;
    padding: 2px 7px;
    border-radius: 6px;
    background: #eaf3eb;
    color: #276738;
    border: 1px solid #c8e0cc;
    font-size: 0.6875rem;
    font-weight: 600;
  }
  .preview-subtext {
    font-size: 0.75rem;
    color: #8c7566;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .preview-label {
    font-size: 0.8125rem;
    font-weight: 600;
    color: #493426;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .preview-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }
  .preview-actions button {
    margin-top: 0;
    width: auto;
  }
  .preview-change-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    min-height: 32px;
    padding: 5px 11px;
    font-size: 0.75rem;
    font-weight: 600;
    border-radius: 8px;
    border: 1px solid #d9c8b5;
    background: #ffffff;
    color: #6a5344;
    cursor: pointer;
    transition:
      background 0.15s ease,
      border-color 0.15s ease,
      color 0.15s ease;
  }
  .preview-change-btn:hover:not(:disabled) {
    background: #faf3ec;
    border-color: #bfa893;
    color: #493426;
  }
  .preview-remove-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    min-height: 32px;
    padding: 5px 11px;
    border-radius: 8px;
    border: 1px solid #f2bdb5;
    background: #fff6f4;
    color: #b83321;
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    transition:
      background 0.15s ease,
      border-color 0.15s ease;
  }
  .preview-remove-btn:hover:not(:disabled) {
    background: #feece8;
    border-color: #e09b90;
  }
  .cannot-delete-hint {
    margin: 16px 0 0;
    padding: 8px 12px;
    border-radius: 10px;
    background: #fff8f6;
    border: 1px solid #fadcd6;
    font-size: 0.75rem;
    color: #a63c22;
    line-height: 1.4;
    text-align: center;
  }
  .form-actions {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    margin-top: 18px;
    box-sizing: border-box;
  }
  .form-actions button {
    min-height: 46px;
    margin-top: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    box-sizing: border-box;
    border-radius: 12px;
  }
  .drawer-cancel-btn {
    flex: 1 1 0;
  }
  .drawer-submit-btn {
    flex: 1 1 0;
  }
  .form-actions.has-delete .drawer-submit-btn {
    flex: 1.3 1 0;
  }
  .drawer-delete-icon-btn {
    width: 46px;
    height: 46px;
    flex-shrink: 0;
    padding: 0;
    border-radius: 12px;
    border: 1.5px solid #f2bdb5;
    background: #fff6f4;
    color: #b83321;
    transition: all 0.2s ease;
  }
  .drawer-delete-icon-btn:hover:not(:disabled) {
    background: #feece8;
    border-color: #e09b90;
    color: #962516;
  }
  .drawer-delete-icon-btn:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    border-color: #ebdcd0;
    background: #f7f1ea;
    color: #9c897c;
  }
`;
