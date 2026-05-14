export default function LogoMark({ className = 'w-8 h-8' }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <defs>
        <linearGradient id="lg-stroke" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor="oklch(72% 0.24 18)" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="17" fill="none" stroke="url(#lg-stroke)" strokeWidth="1.2" />
      <path d="M8 26 L20 8 L32 26 Z" fill="none" stroke="url(#lg-stroke)" strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="20" cy="22" r="2" fill="oklch(72% 0.24 18)" />
    </svg>
  )
}
