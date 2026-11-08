export default function Header() {
  return (
    <header className="hero" aria-label="Ringkasan Pernikahan">
      <div className="monogram" aria-hidden="true">
        <span>R</span>
        <span className="monogram-divider">•</span>
        <span>A</span>
      </div>

      <h1>Wedding Preparation!</h1>

      <p className="couple">
        Restu <span className="amp">&amp;</span> Annisa
      </p>

      <div className="ornament-divider" aria-hidden="true">
        <span className="line" />
        <svg
          viewBox="0 0 24 24"
          width="13"
          height="13"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="diamond"
        >
          <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9Z" />
        </svg>
        <span className="line" />
      </div>

      <p className="subtitle">
        <em>"You and me, against the world! 💖"</em>
      </p>
    </header>
  );
}
