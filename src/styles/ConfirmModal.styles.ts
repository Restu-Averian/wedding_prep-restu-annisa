import { styled, keyframes } from "styled-components";

const slideUp = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0.9;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(100%);
    opacity: 0.9;
  }
`;

const scaleIn = keyframes`
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const scaleOut = keyframes`
  from {
    transform: scale(1);
    opacity: 1;
  }
  to {
    transform: scale(0.95);
    opacity: 0;
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

export const ConfirmDialog = styled.dialog`
  box-sizing: border-box;
  background: #fffaf2;
  color: #574334;
  border: 1px solid #ebdcd0;
  margin: 0;
  padding: 0;
  overflow: hidden;

  /* Mobile: Bottom Sheet */
  position: fixed;
  inset: auto 0 0;
  width: 100%;
  max-width: 100%;
  border-radius: 24px 24px 0 0;
  border-bottom: 0;
  box-shadow: 0 -8px 32px rgba(87, 67, 52, 0.12);

  &::backdrop {
    background: rgba(50, 35, 25, 0.45);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
  }

  &[open] {
    animation: ${slideUp} 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  &[open]::backdrop {
    animation: ${fadeIn} 0.22s ease-out forwards;
  }

  &.closing {
    animation: ${slideDown} 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  &.closing::backdrop {
    animation: ${fadeOut} 0.2s ease-out forwards;
  }

  /* Desktop: Centered Floating Card */
  @media (min-width: 640px) {
    inset: 0;
    margin: auto;
    width: min(calc(100% - 32px), 420px);
    border-radius: 20px;
    border-bottom: 1px solid #ebdcd0;
    box-shadow: 0 16px 40px -10px rgba(87, 67, 52, 0.2);

    &[open] {
      animation: ${scaleIn} 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    &.closing {
      animation: ${scaleOut} 0.18s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    &[open],
    &[open]::backdrop,
    &.closing,
    &.closing::backdrop {
      animation: none;
    }
  }
`;

export const ConfirmWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 24px 20px calc(24px + env(safe-area-inset-bottom, 0px));

  @media (min-width: 640px) {
    padding: 28px 24px 24px;
  }
`;

export const ConfirmIconBadge = styled.div<{ $tone: "danger" | "warning" | "neutral" }>`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-bottom: 14px;

  ${({ $tone }) =>
    $tone === "danger"
      ? `
    background: #fdf3f1;
    border: 1.5px solid #f4c6bf;
    color: #b83321;
  `
      : `
    background: #f4eae0;
    border: 1.5px solid #e7d9ca;
    color: #79583e;
  `}
`;

export const ConfirmTitle = styled.h3<{ $tone: "danger" | "warning" | "neutral" }>`
  font-family: Georgia, serif;
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1.3;
  margin: 0 0 8px;
  color: ${({ $tone }) => ($tone === "danger" ? "#5a2d25" : "#493426")};
`;

export const ConfirmMessage = styled.p`
  font-size: 0.9375rem;
  line-height: 1.55;
  color: #796455;
  margin: 0 0 24px;
  max-width: 36ch;
`;

export const ConfirmActions = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: 10px;
  width: 100%;

  @media (min-width: 480px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  button {
    cursor: pointer;
    font: inherit;
    font-size: 0.9375rem;
    font-weight: 600;
    min-height: 46px;
    padding: 10px 16px;
    border-radius: 12px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition:
      background 0.18s ease,
      border-color 0.18s ease,
      transform 0.12s ease;

    &:active:not(:disabled) {
      transform: scale(0.98);
    }

    &:disabled {
      opacity: 0.55;
      cursor: not-allowed;
    }
  }

  .cancel-btn {
    background: #f7eee8;
    border: 1px solid #ded0bf;
    color: #574334;

    &:hover:not(:disabled) {
      background: #ebd8c8;
      border-color: #d1bfac;
    }
  }

  .confirm-btn {
    color: #fffaf2;

    &.tone-danger {
      background: #b83321;
      border: 1px solid #a02a1a;

      &:hover:not(:disabled) {
        background: #9c2718;
        border-color: #882013;
      }
    }

    &.tone-warning,
    &.tone-neutral {
      background: #795344;
      border: 1px solid #654333;

      &:hover:not(:disabled) {
        background: #654333;
        border-color: #543729;
      }
    }
  }
`;
