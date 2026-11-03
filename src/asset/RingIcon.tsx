interface IconProps {
  size?: number
  className?: string
}

export function RingIcon({ size = 22, className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="9" cy="14" r="5" />
      <circle cx="15" cy="12" r="5" />
      <path d="M15 7l.8-1.5a1 1 0 0 1 1.7 0L18.3 7" />
    </svg>
  )
}

