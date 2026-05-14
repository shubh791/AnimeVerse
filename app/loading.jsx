export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
      style={{ background: '#02000b' }}
    >
      {/* Atmospheric glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: 0,
          background: 'radial-gradient(ellipse 60% 55% at 50% 50%, rgba(180,20,20,0.16) 0%, transparent 70%)',
        }}
      />

      {/* Logo mark */}
      <div className="relative mb-10 flex flex-col items-center">

        {/* Spinning ring */}
        <div className="relative w-16 h-16 mb-6">
          <svg
            className="absolute inset-0 w-full h-full animate-spin"
            style={{ animationDuration: '2.4s', animationTimingFunction: 'linear' }}
            viewBox="0 0 64 64" fill="none"
          >
            <circle
              cx="32" cy="32" r="28"
              stroke="url(#spin-grad)" strokeWidth="1.5"
              strokeLinecap="round" strokeDasharray="44 132"
            />
            <defs>
              <linearGradient id="spin-grad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="oklch(72% 0.24 18)" stopOpacity="1"/>
                <stop offset="100%" stopColor="oklch(72% 0.24 18)" stopOpacity="0"/>
              </linearGradient>
            </defs>
          </svg>

          {/* Center icon */}
          <div
            className="absolute inset-0 flex items-center justify-center rounded-full"
            style={{ background: 'rgba(220,40,40,0.08)', border: '1px solid rgba(255,80,50,0.18)' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
              <path d="M8 27 L12 8 L16 27 Z" fill="none" stroke="url(#icon-grad)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="16" r="1.8" fill="oklch(72% 0.24 18)"/>
              <defs>
                <linearGradient id="icon-grad" x1="12" y1="8" x2="12" y2="27" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#fff" stopOpacity="0.9"/>
                  <stop offset="100%" stopColor="oklch(72% 0.24 18)" stopOpacity="0.7"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Wordmark */}
        <div
          className="font-display tracking-tight leading-none select-none"
          style={{ fontSize: 28 }}
        >
          <span className="text-white">Anime</span>
          <span className="italic" style={{ color: 'oklch(82% 0.16 22)' }}>Verse</span>
        </div>

        {/* Tagline */}
        <p
          className="numbered mt-2.5"
          style={{ fontSize: 9, letterSpacing: '0.26em', color: 'rgba(245,240,230,0.30)' }}
        >
          LOADING YOUR UNIVERSE
        </p>
      </div>

      {/* Progress bar */}
      <div
        className="relative overflow-hidden rounded-full"
        style={{ width: 180, height: 2, background: 'rgba(255,255,255,0.06)' }}
      >
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: 'linear-gradient(90deg, oklch(64% 0.22 22), oklch(82% 0.18 22))',
            animation: 'loading-bar 1.8s ease-in-out infinite',
            boxShadow: '0 0 12px oklch(64% 0.22 22)',
          }}
        />
      </div>

      <style>{`
        @keyframes loading-bar {
          0%   { width: 0%;   opacity: 1; left: 0; }
          60%  { width: 80%;  opacity: 1; left: 0; }
          90%  { width: 100%; opacity: 0.6; left: 0; }
          100% { width: 100%; opacity: 0; left: 0; }
        }
      `}</style>
    </div>
  )
}
