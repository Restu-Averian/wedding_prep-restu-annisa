import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; }

  :root {
    font-family: system-ui, sans-serif;
    color: #574334;
    background: #fffaf2;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }

  body { margin: 0; min-width: 320px; }
  #root { min-height: 100svh; }
  h1, h2 { font-family: Georgia, serif; font-weight: 400; line-height: 1.2; }
  h1 { margin: 0 0 24px; font-size: clamp(2.25rem, 6vw, 3.5rem); }
  h2 { margin: 0 0 20px; font-size: clamp(1.75rem, 4vw, 2.5rem); }
  p { max-width: 55ch; margin: 0; line-height: 1.8; }
  :focus-visible { outline: 2px solid #79583e; outline-offset: 4px; }

  .skip-link {
    position: fixed;
    top: 12px;
    left: 16px;
    z-index: 20;
    padding: 12px;
    background: #fffaf2;
    color: #574334;
    transform: translateY(-200%);
  }

  .skip-link:focus { transform: translateY(0); }
`
