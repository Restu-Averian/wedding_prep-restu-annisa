import { styled } from "styled-components";

export const HomeDashboard = styled.div`
  display: grid;
  gap: 24px;

  .hero {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 26px 20px 22px;
    border: 1px solid #ebdcd0;
    border-radius: 24px;
    background: radial-gradient(
      120% 120% at 50% 0%,
      #ffffff 0%,
      #fffdfa 70%,
      #fbf4ec 100%
    );
    box-shadow:
      0 1px 3px rgba(87, 67, 52, 0.03),
      0 10px 24px -10px rgba(87, 67, 52, 0.06);
  }

  .hero::before {
    content: "";
    position: absolute;
    inset: 6px;
    border: 1px solid rgba(197, 168, 128, 0.28);
    border-radius: 18px;
    pointer-events: none;
  }

  .monogram {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    width: 44px;
    height: 44px;
    margin-bottom: 12px;
    border-radius: 50%;
    border: 1px solid #e2d2c4;
    background: #fffcf8;
    color: #826451;
    font-family: Georgia, serif;
    font-size: 0.8125rem;
    font-weight: 500;
    letter-spacing: 0.05em;
    box-shadow: 0 2px 6px rgba(87, 67, 52, 0.04);
  }

  .monogram-divider {
    font-size: 0.625rem;
    color: #c5a880;
    opacity: 0.75;
  }

  .hero h1 {
    margin-bottom: 8px;
    font:
      600 0.6875rem/1.4 system-ui,
      sans-serif;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #9c7b64;
  }

  .hero p {
    max-width: none;
  }

  .couple {
    font:
      400 clamp(1.9rem, 6.2vw, 2.85rem)/1.2 Georgia,
      serif;
    letter-spacing: -0.025em;
    color: #493426;
  }

  .amp {
    font-family: Georgia, serif;
    font-style: italic;
    font-weight: 300;
    color: #b8906f;
    margin: 0 4px;
  }

  .ornament-divider {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    width: 100%;
    max-width: 170px;
    margin: 12px 0 8px;
    color: #c5a880;
  }

  .ornament-divider .line {
    flex: 1;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(197, 168, 128, 0.45),
      transparent
    );
  }

  .ornament-divider .diamond {
    flex-shrink: 0;
    color: #b8906f;
    opacity: 0.85;
  }

  .subtitle {
    margin-top: 0;
    color: #88656b;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 0.9375rem;
    font-style: italic;
    font-synthesis: style;
    letter-spacing: 0.01em;
  }

  .subtitle em {
    font-style: italic;
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

  /* Financial Overview Card */
  .financial-card {
    display: grid;
    gap: 20px;
    padding: 24px;
    border: 1px solid #e7d9ca;
    border-radius: 20px;
    background: #fffdf9;
    box-shadow: 0 4px 16px rgb(87 67 52 / 3%);
  }

  .stat-label {
    display: block;
    margin-bottom: 6px;
    font-size: 0.8125rem;
    font-weight: 500;
    color: #7a6656;
    letter-spacing: 0.01em;
  }

  .stat-value {
    margin: 0;
    font-family: Georgia, serif;
    font-variant-numeric: lining-nums tabular-nums;
  }

  .stat-value.total {
    font-size: clamp(1.8rem, 5vw, 2.6rem);
    color: #574334;
    line-height: 1.25;
  }

  .stat-value.paid {
    font-size: 1.25rem;
    font-weight: 600;
    color: #88656b;
  }

  .financial-col.sub {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding-top: 18px;
    border-top: 1px solid #ede1d3;
  }

  .sub-stat {
    min-width: 0;
  }

  /* Category Cards Grid */
  .categories {
    margin-top: 8px;
  }

  .categories-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  .categories-header h2 {
    margin: 0;
    font-size: 1.35rem;
  }

  .category-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }

  .category-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    min-height: 124px;
    padding: 20px 14px 16px;
    border: 1px solid #e7d9ca;
    border-radius: 16px;
    background: #fffdf9;
    color: inherit;
    text-decoration: none;
    box-shadow: 0 2px 8px rgb(87 67 52 / 2%);
    transition:
      transform 0.18s ease,
      border-color 0.18s ease,
      box-shadow 0.18s ease,
      background 0.18s ease;
  }

  .category-card:hover {
    background: #fbf5ee;
    border-color: #c9ab9b;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgb(87 67 52 / 6%);
  }

  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    margin-bottom: 12px;
    border-radius: 12px;
    background: #f4eae0;
    color: #826451;
    transition:
      background 0.18s ease,
      color 0.18s ease;
  }

  .category-card:hover .icon-wrapper {
    background: #eeddcf;
    color: #6a4f3e;
  }

  .card-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
  }

  .category-name {
    font-weight: 600;
    font-size: 0.975rem;
    color: #4f3b2d;
  }

  .category-estimate {
    font-size: 0.8125rem;
    color: #7a6656;
    font-variant-numeric: lining-nums tabular-nums;
  }

  /* Card ke-5 ganjil membentang 2 kolom: icon & teks berdampingan rapat di tengah */
  .category-card:last-child:nth-child(odd) {
    grid-column: 1 / -1;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 14px;
    min-height: 72px;
    padding: 14px 20px;
  }

  .category-card:last-child:nth-child(odd) .icon-wrapper {
    margin-bottom: 0;
    flex-shrink: 0;
  }

  .category-card:last-child:nth-child(odd) .card-info {
    align-items: flex-start;
    text-align: left;
  }

  @media (min-width: 640px) {
    .category-grid {
      gap: 16px;
    }

    .category-card {
      min-height: 134px;
      padding: 24px 16px 20px;
    }

    .category-card:last-child:nth-child(odd) {
      min-height: 76px;
      padding: 16px 24px;
      gap: 16px;
    }

    .icon-wrapper {
      width: 44px;
      height: 44px;
      margin-bottom: 14px;
    }

    .category-name {
      font-size: 1.05rem;
    }

    .category-estimate {
      font-size: 0.875rem;
    }
  }

  @media (min-width: 768px) {
    gap: 28px;

    .financial-card {
      grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
      align-items: center;
      padding: 32px;
      gap: 32px;
    }

    .financial-col.sub {
      flex-direction: column;
      align-items: flex-start;
      padding-top: 0;
      padding-left: 32px;
      border-top: 0;
      border-left: 1px solid #ede1d3;
      gap: 16px;
    }
  }
`;
