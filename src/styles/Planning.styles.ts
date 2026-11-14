import { styled, css, keyframes } from "styled-components";

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const controls = css`
  button,
  input,
  select,
  textarea {
    font: inherit;
  }
  button {
    cursor: pointer;
    min-height: 44px;
    padding: 10px 18px;
    border-radius: 12px;
  }
  button:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
  .primary {
    border: 1px solid #795344;
    background: #795344;
    color: #fffaf2;
  }
  .primary:hover {
    background: #654333;
  }
  .secondary {
    border: 1px solid #ded0bf;
    background: #f7eee8;
    color: #574334;
  }
  input,
  select,
  textarea {
    display: block;
    width: 100%;
    min-height: 48px;
    padding: 12px;
    border: 1px solid #ded0bf;
    border-radius: 12px;
    background: #fffdf9;
    color: #574334;
  }
  textarea {
    resize: vertical;
  }
  label {
    display: block;
    margin-bottom: 8px;
    font-size: 0.875rem;
    font-weight: 600;
  }
`;

export const PlanningPage = styled.div`
  ${controls}
  display: grid;
  gap: 24px;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  .planning-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
  }
  .planning-header-text {
    flex: 1 1 200px;
    min-width: 0;
  }
  .planning-header-text h1 {
    margin: 0 0 8px;
  }
  .add-btn-compact,
  .planning-header .add-button {
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
  .add-btn-compact svg,
  .planning-header .add-button svg {
    flex-shrink: 0;
  }
  h1 {
    margin-bottom: 12px;
  }
  h2 {
    margin: 0 0 20px;
    font-size: 1.4rem;
  }
  h3 {
    margin: 0 0 8px;
    font-size: 1rem;
  }
  .subtitle {
    color: #88656b;
  }
  .muted,
  .hint,
  dt,
  time {
    color: #7a6656;
  }
  .hint {
    margin-top: 10px;
    font-size: 0.8125rem;
  }
  .text-link {
    color: #795344;
    text-underline-offset: 4px;
  }
  > .text-link {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    justify-self: start;
  }
  .eyebrow {
    color: #826451;
    font-size: 0.8125rem;
  }
  .panel {
    min-width: 0;
    padding: 24px;
    border: 1px solid #e7d9ca;
    border-radius: 18px;
    background: #fffdf9;
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
  .filter-section {
    display: grid;
    gap: 12px;
  }
  .search-input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
  }
  .search-input-wrapper .search-icon {
    position: absolute;
    left: 14px;
    color: #826451;
    pointer-events: none;
  }
  .search-input-wrapper input {
    padding-left: 42px;
    padding-right: 42px;
    border: 1px solid #e7d9ca;
    background: #fffdfa;
    transition:
      border-color 0.18s ease,
      box-shadow 0.18s ease;
  }
  .search-input-wrapper input:focus {
    outline: none;
    border-color: #9c7664;
    box-shadow: 0 0 0 3px rgba(121, 83, 68, 0.12);
  }
  .clear-button {
    position: absolute;
    right: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 32px;
    width: 32px;
    height: 32px;
    padding: 0;
    border: none;
    border-radius: 50%;
    background: #f4eae0;
    color: #675344;
    cursor: pointer;
    transition:
      background 0.15s ease,
      color 0.15s ease;
  }
  .clear-button:hover {
    background: #ebd8c8;
    color: #493426;
  }
  .status-segmented-bar {
    display: flex;
    gap: 4px;
    background: #f2e9df;
    padding: 4px;
    border-radius: 14px;
    border: 1px solid #e5d6c6;
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
  }
  .status-segmented-tab {
    flex: 1 1 0;
    min-width: 0;
    min-height: 40px;
    padding: 8px 10px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 0;
    border-radius: 10px;
    font-weight: 500;
    font-size: 0.84rem;
    color: #796455;
    background: transparent;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    white-space: nowrap;
    cursor: pointer;
  }
  .status-segmented-tab:hover {
    color: #493426;
    background: rgba(255, 253, 249, 0.5);
  }
  .status-segmented-tab[aria-pressed="true"] {
    background: #fffdfa;
    color: #493426;
    font-weight: 600;
    box-shadow: 0 2px 6px rgba(87, 67, 52, 0.08);
    border: 1px solid #ded0be;
  }
  .category-scroll-container {
    position: relative;
    width: 100%;
    min-width: 0;
    overflow: hidden;
    mask-image: linear-gradient(
      to right,
      black calc(100% - 24px),
      transparent 100%
    );
    -webkit-mask-image: linear-gradient(
      to right,
      black calc(100% - 24px),
      transparent 100%
    );
  }
  .filters {
    display: flex;
    align-items: center;
    gap: 8px;
    overflow-x: auto;
    flex-wrap: nowrap;
    padding: 4px 2px 8px;
    margin: 0;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
  }
  .filters::-webkit-scrollbar {
    display: none;
  }
  .filter-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    min-height: 38px;
    padding: 8px 14px;
    border-radius: 999px;
    border: 1px solid #e7d9ca;
    background: #fffdfa;
    color: #675344;
    font-size: 0.8125rem;
    font-weight: 500;
    white-space: nowrap;
    flex-shrink: 0;
    box-shadow: 0 1px 3px rgba(87, 67, 52, 0.02);
    transition:
      background 0.18s ease,
      border-color 0.18s ease,
      color 0.18s ease,
      transform 0.15s ease;
  }
  .filter-chip:hover {
    background: #fbf5ee;
    border-color: #c9ab9b;
  }
  .filter-chip[aria-pressed="true"] {
    background: #795344;
    border-color: #795344;
    color: #fffaf2;
    font-weight: 600;
    box-shadow: 0 2px 8px rgba(121, 83, 68, 0.22);
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .item-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }
  .item-card {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 16px 14px;
    border-radius: 16px;
    background: #fffdfa;
    border: 1px solid #ebdccf;
    color: inherit;
    text-decoration: none;
    box-shadow: 0 2px 6px rgba(87, 67, 52, 0.02);
    transition:
      transform 0.18s ease,
      border-color 0.18s ease,
      box-shadow 0.18s ease,
      background 0.18s ease;
  }
  .item-card[data-selected="true"] {
    background: #fffbfa;
    border-color: #dfcdbf;
  }
  .item-card.item-skeleton-card {
    cursor: default;
    pointer-events: none;
  }
  .item-card:hover {
    background: #fbf5ee;
    border-color: #c9ab9b;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(87, 67, 52, 0.06);
  }
  .item-card .card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
    margin-bottom: 12px;
  }
  .card-icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    border-radius: 10px;
    background: #f4eae0;
    color: #826451;
    flex-shrink: 0;
    transition:
      background 0.18s ease,
      color 0.18s ease;
  }
  .item-card[data-selected="true"] .card-icon-wrapper {
    background: #eee0e2;
    color: #754c54;
  }
  .item-card .card-body {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }
  .item-card .eyebrow {
    font-size: 0.6875rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #826451;
    margin-bottom: 4px;
  }
  .item-card h2 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    margin: 0;
    font-size: 0.975rem;
    line-height: 1.35;
    color: #493426;
    word-break: break-word;
  }
  .item-card .price {
    margin: auto 0 0 0;
    font-size: 0.9375rem;
    font-weight: 600;
    color: #795344;
    font-variant-numeric: tabular-nums;
  }
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    border-radius: 999px;
    background: #f4eae0;
    color: #675344;
    font-size: clamp(0.625rem, 2.2vw, 0.72rem);
    font-weight: 600;
    line-height: 1;
    letter-spacing: 0.01em;
    white-space: nowrap;
  }
  .badge[data-selected="true"] {
    background: #eee0e2;
    color: #754c54;
  }
  .facts {
    display: grid;
    gap: 20px;
    margin: 0 0 24px;
  }
  dt {
    font-size: 0.8125rem;
    margin-bottom: 6px;
  }
  dd {
    margin: 0;
    font-weight: 600;
    overflow-wrap: anywhere;
  }
  .reference-list {
    display: grid;
    gap: 12px;
    margin-bottom: 20px;
  }
  .reference {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: start;
    gap: 12px;
    padding: 16px;
    border: 1px solid #ede1d3;
    border-radius: 12px;
  }
  .reference > div {
    min-width: 0;
    overflow-wrap: anywhere;
  }
  .reference time {
    font-size: 0.875rem;
  }
  .section-heading {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: start;
    gap: 12px;
    margin-bottom: 20px;
  }
  .section-heading h2 {
    margin: 0;
  }
  .panel > button {
    margin-top: 16px;
  }
  @media (min-width: 768px) {
    .item-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px;
    }
    .item-card {
      padding: 20px 18px;
    }
    .card-icon-wrapper {
      width: 38px;
      height: 38px;
      border-radius: 12px;
    }
    .item-card h2 {
      font-size: 1.15rem;
    }
    .item-card .price {
      font-size: 1.05rem;
    }
    .facts {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
`;

export const PaymentSheet = styled.dialog`
  ${controls}
  position: fixed;
  inset: auto 0 0;
  width: min(100%, 560px);
  max-width: 100%;
  max-height: 90dvh;
  margin: 0 auto;
  padding: 24px 24px calc(24px + env(safe-area-inset-bottom, 0px));
  overflow-y: auto;
  overscroll-behavior: contain;
  border: 1px solid #e7d9ca;
  border-bottom: 0;
  border-radius: 24px 24px 0 0;
  background: #fffaf2;
  color: #574334;
  &::backdrop {
    background: rgb(50 35 25 / 40%);
  }

  &[open] {
    animation: ${slideUp} 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  &[open]::backdrop {
    animation: ${fadeIn} 0.25s ease-out forwards;
  }

  &.closing {
    animation: ${slideDown} 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  &.closing::backdrop {
    animation: ${fadeOut} 0.25s ease-out forwards;
  }

  @media (prefers-reduced-motion: reduce) {
    &[open],
    &[open]::backdrop,
    &.closing,
    &.closing::backdrop {
      animation: none;
    }
  }
  .sheet-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }
  h2 {
    margin: 0;
    font-size: 1.5rem;
  }
  .sheet-heading button {
    background: transparent;
    border: 1px solid #ded0bf;
    color: inherit;
    font-size: 1.25rem;
  }
  p {
    margin: 16px 0;
    color: #7a6656;
    font-size: 0.875rem;
  }
  .payment-context-card {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
    margin-top: 16px;
    padding: 12px 14px;
    border-radius: 14px;
    background: #faf6f0;
    border: 1px solid #ebdccf;
    box-sizing: border-box;
  }
  .context-card-main {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1 1 0;
    min-width: 0;
    overflow-wrap: anywhere;
  }
  .context-card-badge {
    font-size: 0.6875rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #8d7668;
    line-height: 1.2;
  }
  .context-card-title {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    overflow-wrap: anywhere;
    word-break: break-word;
    font-size: 0.9375rem;
    font-weight: 700;
    color: #493426;
    line-height: 1.35;
  }
  .context-card-side {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    text-align: right;
    flex-shrink: 0;
    min-width: max-content;
    gap: 2px;
  }
  .context-card-label {
    font-size: 0.6875rem;
    font-weight: 600;
    color: #8d7668;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    line-height: 1.2;
  }
  .context-card-amount {
    font-size: 1.05rem;
    font-weight: 700;
    color: #ab3f24;
    font-variant-numeric: tabular-nums;
    line-height: 1.25;
  }
  .field-hint {
    margin: 0;
    font-size: 0.75rem;
    color: #7a6656;
    line-height: 1.4;
  }
  @media (max-width: 420px) {
    .payment-context-card {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }
    .context-card-side {
      align-items: flex-start;
      text-align: left;
    }
  }
  form {
    display: grid;
    gap: 8px;
    margin-top: 24px;
  }
  form label:not(:first-child) {
    margin-top: 12px;
  }
  form button {
    margin-top: 16px;
    width: 100%;
    min-height: 46px;
    font-weight: 600;
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
  .preview-pdf-badge {
    width: 68px;
    height: 68px;
    border-radius: 10px;
    border: 1px solid #ebdcd0;
    flex-shrink: 0;
    background: #f4ece3;
    color: #795344;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
  }
  .pdf-tag {
    font-size: 0.625rem;
    font-weight: 700;
    background: #795344;
    color: #ffffff;
    padding: 1px 5px;
    border-radius: 4px;
    letter-spacing: 0.05em;
    line-height: 1.2;
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
  .preview-filename {
    font-size: 0.8125rem;
    font-weight: 600;
    color: #493426;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .preview-filesize {
    font-size: 0.75rem;
    color: #8c7566;
  }
  .preview-subtext {
    font-size: 0.75rem;
    color: #8c7566;
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
`;
