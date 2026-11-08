import { styled, keyframes } from 'styled-components'

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`

export const ShimmerBlock = styled.div<{ $width?: string; $height?: string; $radius?: string }>`
  width: ${({ $width }) => $width ?? '100%'};
  height: ${({ $height }) => $height ?? '20px'};
  border-radius: ${({ $radius }) => $radius ?? '8px'};
  background: linear-gradient(90deg, #f3eae0 25%, #faf4ee 50%, #f3eae0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.8s ease-in-out infinite;
`

export const FeedbackCard = styled.div<{ $tone?: 'neutral' | 'alert' }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 12px;
  padding: 32px 20px;
  border-radius: 18px;
  box-sizing: border-box;
  width: 100%;

  ${({ $tone }) =>
    $tone === 'alert'
      ? `
    background: #fdf6f3;
    border: 1px solid #ebd3c8;
    color: #683b32;
  `
      : `
    background: #fffdfa;
    border: 1px solid #e7d9ca;
    color: #574334;
  `}

  .icon-wrapper {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 14px;
    background: ${({ $tone }) => ($tone === 'alert' ? '#f5e4dc' : '#f4eae0')};
    color: ${({ $tone }) => ($tone === 'alert' ? '#8a4b40' : '#826451')};
    margin-bottom: 4px;
  }

  h2, h3 {
    font-family: Georgia, serif;
    font-weight: 400;
    margin: 0;
    color: ${({ $tone }) => ($tone === 'alert' ? '#5a2d25' : '#493426')};
    font-size: clamp(1.2rem, 3.5vw, 1.45rem);
  }

  p {
    font-size: 0.9375rem;
    line-height: 1.5;
    color: ${({ $tone }) => ($tone === 'alert' ? '#784d44' : '#796455')};
    max-width: 44ch;
    margin: 0;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: 8px;
  }

  .actions button,
  .actions a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 42px;
    padding: 8px 18px;
    border-radius: 10px;
    font-weight: 600;
    font-size: 0.875rem;
    text-decoration: none;
    cursor: pointer;
    transition: background 0.18s ease, transform 0.15s ease;
  }

  .actions .primary-btn {
    border: 1px solid #795344;
    background: #795344;
    color: #fffaf2;
  }

  .actions .primary-btn:hover {
    background: #654333;
  }

  .actions .secondary-btn {
    border: 1px solid #ded0bf;
    background: #f7eee8;
    color: #574334;
  }

  .actions .secondary-btn:hover {
    background: #ebd8c8;
  }
`

export const InlineAlertBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  background: #fdf5f2;
  border: 1px solid #ebd0c4;
  color: #794338;
  font-size: 0.875rem;
  box-sizing: border-box;
  width: 100%;

  .alert-content {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
  }

  .alert-text {
    overflow-wrap: anywhere;
    line-height: 1.4;
  }

  .retry-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 34px;
    padding: 6px 12px;
    border-radius: 8px;
    border: 1px solid #dfc3b5;
    background: #fffbfa;
    color: #6a3429;
    font-size: 0.8125rem;
    font-weight: 600;
    cursor: pointer;
    flex-shrink: 0;
    transition: background 0.15s ease;
  }

  .retry-btn:hover {
    background: #f5e4db;
  }
`
