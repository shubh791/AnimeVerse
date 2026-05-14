export default function StatsStrip() {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 pointer-events-none"
      style={{ zIndex: 40 }}
    >
      {/* Hairline top border */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.10) 20%, rgba(255,255,255,0.10) 80%, transparent 100%)' }} />

      <div className="flex items-center justify-between px-10 lg:px-20 py-4">
        {/* Edition mark */}
        <div className="numbered text-white/35">
          N° 001 · VOL. CRIMSON · MMXXVI
        </div>

        {/* Center stats */}
        <div className="hidden lg:flex items-center gap-8">
          {[['12,408', 'Episodes'], ['184', 'Studios'], ['4K', 'Dolby Vision']].map(([val, label]) => (
            <div key={label} className="flex items-center gap-2.5">
              <span className="font-display text-[17px] text-white/80">{val}</span>
              <span className="numbered text-white/35">{label}</span>
            </div>
          ))}
        </div>

        {/* Live indicator */}
        <div className="flex items-center gap-2.5">
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: 'oklch(72% 0.24 18)', boxShadow: '0 0 10px oklch(72% 0.24 18)' }}
          />
          <span className="numbered text-white/55">LIVE · 4,128 WATCHING</span>
        </div>
      </div>
    </div>
  )
}
