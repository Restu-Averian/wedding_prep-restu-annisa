import { styled, css, keyframes } from 'styled-components'

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`

const slideDown = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
`

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`

const controls = css`
  button, input, select, textarea { font: inherit; }
  button { cursor: pointer; min-height: 44px; padding: 10px 18px; border-radius: 12px; }
  button:disabled { cursor: not-allowed; opacity: 0.6; }
  .primary { border: 1px solid #795344; background: #795344; color: #fffaf2; }
  .primary:hover { background: #654333; }
  .secondary { border: 1px solid #ded0bf; background: #f7eee8; color: #574334; }
  input, select, textarea {
    display: block;
    width: 100%;
    min-height: 48px;
    padding: 12px;
    border: 1px solid #ded0bf;
    border-radius: 12px;
    background: #fffdf9;
    color: #574334;
  }
  textarea { resize: vertical; }
  label { display: block; margin-bottom: 8px; font-size: 0.875rem; font-weight: 600; }
`

export const PlanningPage = styled.div`
  ${controls}
  display: grid;
  gap: 24px;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  h1 { margin-bottom: 12px; }
  h2 { margin: 0 0 20px; font-size: 1.4rem; }
  h3 { margin: 0 0 8px; font-size: 1rem; }
  .subtitle { color: #88656b; }
  .muted, .hint, dt, time { color: #7a6656; }
  .hint { margin-top: 10px; font-size: 0.8125rem; }
  .text-link { color: #795344; text-underline-offset: 4px; }
  > .text-link { display: inline-flex; align-items: center; min-height: 44px; justify-self: start; }
  .eyebrow { color: #826451; font-size: 0.8125rem; }
  .panel { min-width: 0; padding: 24px; border: 1px solid #e7d9ca; border-radius: 18px; background: #fffdf9; }
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
    gap: 14px;
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
    transition: border-color 0.18s ease, box-shadow 0.18s ease;
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
    transition: background 0.15s ease, color 0.15s ease;
  }
  .clear-button:hover {
    background: #ebd8c8;
    color: #493426;
  }
  .filters {
    display: flex;
    align-items: center;
    gap: 8px;
    overflow-x: auto;
    flex-wrap: nowrap;
    padding: 2px 2px 8px;
    margin: 0 -2px -6px;
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
    transition: background 0.18s ease, border-color 0.18s ease, color 0.18s ease, transform 0.15s ease;
  }
  .filter-chip:hover {
    background: #fbf5ee;
    border-color: #c9ab9b;
  }
  .filter-chip[aria-pressed='true'] {
    background: #795344;
    border-color: #795344;
    color: #fffaf2;
    font-weight: 600;
    box-shadow: 0 2px 8px rgba(121, 83, 68, 0.22);
  }
  ul { list-style: none; padding: 0; margin: 0; }
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
    transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
  }
  .item-card[data-selected='true'] {
    background: #fffbfa;
    border-color: #dfcdbf;
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
    transition: background 0.18s ease, color 0.18s ease;
  }
  .item-card[data-selected='true'] .card-icon-wrapper {
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
  .badge[data-selected='true'] {
    background: #eee0e2;
    color: #754c54;
  }
  .facts { display: grid; gap: 20px; margin: 0 0 24px; }
  dt { font-size: 0.8125rem; margin-bottom: 6px; }
  dd { margin: 0; font-weight: 600; overflow-wrap: anywhere; }
  .reference-list { display: grid; gap: 12px; margin-bottom: 20px; }
  .reference { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: start; gap: 12px; padding: 16px; border: 1px solid #ede1d3; border-radius: 12px; }
  .reference > div { min-width: 0; overflow-wrap: anywhere; }
  .reference time { font-size: 0.875rem; }
  .section-heading { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: start; gap: 12px; margin-bottom: 20px; }
  .section-heading h2 { margin: 0; }
  .panel > button { margin-top: 16px; }
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
    .facts { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  }
`

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
  .sheet-heading { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
  h2 { margin: 0; font-size: 1.5rem; }
  .sheet-heading button { background: transparent; border: 1px solid #ded0bf; color: inherit; font-size: 1.25rem; }
  p { margin: 16px 0; color: #7a6656; font-size: 0.875rem; }
  form { display: grid; gap: 8px; margin-top: 24px; }
  form label:not(:first-child) { margin-top: 12px; }
  form button { margin-top: 16px; width: 100%; min-height: 46px; font-weight: 600; }
`
