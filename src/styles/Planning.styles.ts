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
  .filters { display: flex; flex-wrap: wrap; gap: 8px; }
  .filters button { border: 1px solid #e7d9ca; background: #fffdf9; color: #675344; }
  .filters button[aria-pressed='true'] { background: #e7d8c5; border-color: #c9ab9b; color: #493426; }
  ul { list-style: none; padding: 0; margin: 0; }
  .item-grid { display: grid; gap: 16px; }
  .item-card { display: block; height: 100%; color: inherit; text-decoration: none; }
  .item-card:hover { background: #fbf5ee; border-color: #c9ab9b; }
  .item-card h2 { margin: 10px 0 12px; }
  .price { margin-bottom: 16px; font-variant-numeric: tabular-nums; }
  .badge { display: inline-block; padding: 6px 10px; border-radius: 20px; background: #f4eae0; color: #675344; font-size: 0.75rem; }
  .badge[data-selected='true'] { background: #eee0e2; color: #754c54; }
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
    .item-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
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
  form button { margin-top: 16px; }
`
