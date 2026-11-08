interface IconProps {
  size?: number;
  className?: string;
}

export function HomeIcon({ size = 18, className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 10.5L12 3l9 7.5" />
      <path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5" />
      <path d="M10 21v-6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v6" />
    </svg>
  );
}
