import { PlayIcon } from '@/components/shared/Icons'

export default function EpisodeTile({ title, ep, duration, arc, img, accent }) {
  const solidAccent = accent.replace(/[\d.]+\)$/, '1)')

  return (
    <article
      className="ep-tile group cursor-pointer"
      style={{
        background: `radial-gradient(ellipse 110% 65% at 50% 110%, ${accent}, transparent 62%), linear-gradient(180deg, #0d0509 0%, #060305 100%)`,
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      {/* Thumbnail */}
      <div className="thumb">
        {/* Character image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img}
          alt=""
          draggable={false}
          loading="lazy"
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none select-none"
          style={{
            bottom: '-8%',
            height: '135%',
            width: 'auto',
            maxWidth: 'none',
            mixBlendMode: 'screen',
            filter: 'contrast(1.12) saturate(1.20) brightness(1.10)',
            transition: 'transform 0.55s cubic-bezier(.2,.7,.2,1)',
          }}
        />

        {/* Top badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <span
            className="numbered"
            style={{
              fontSize: 10,
              padding: '3px 10px',
              borderRadius: 999,
              background: 'rgba(0,0,0,0.65)',
              border: '1px solid rgba(255,255,255,0.12)',
              backdropFilter: 'blur(12px)',
              color: 'rgba(255,255,255,0.88)',
            }}
          >
            {ep}
          </span>
          <span className="numbered text-white/45" style={{ fontSize: 10 }}>{duration}</span>
        </div>

        {/* Play button on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <span
            className="inline-flex items-center justify-center w-14 h-14 rounded-full"
            style={{
              background: 'rgba(255,255,255,0.92)',
              boxShadow: `0 0 60px ${accent}, 0 20px 40px -10px rgba(0,0,0,0.65)`,
            }}
          >
            <PlayIcon className="w-4 h-4 text-black" />
          </span>
        </div>

        {/* Bottom gradient scrim */}
        <div
          className="absolute inset-x-0 bottom-0 z-[2]"
          style={{
            height: '65%',
            background: 'linear-gradient(to top, #060305 8%, rgba(6,3,5,0.80) 55%, transparent 100%)',
          }}
        />

        {/* Inner glow on hover — washes up from bottom */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[3] pointer-events-none"
          style={{ boxShadow: `inset 0 -80px 100px -20px ${accent}` }}
        />
      </div>

      {/* Info panel */}
      <div className="px-5 py-4 relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ background: solidAccent, boxShadow: `0 0 8px ${solidAccent}` }}
          />
          <span className="numbered text-white/38" style={{ fontSize: 9 }}>{arc.toUpperCase()}</span>
        </div>
        <h3 className="font-display text-[21px] leading-tight text-white">{title}</h3>
        <div
          className="mt-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ color: 'oklch(82% 0.16 22)' }}
        >
          <span className="numbered" style={{ fontSize: 9, letterSpacing: '0.14em' }}>WATCH NOW</span>
          <span style={{ fontSize: 10 }}>→</span>
        </div>
      </div>

      {/* Outer glow ring on hover */}
      <div
        className="absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: `0 0 60px -8px ${accent}, 0 0 120px -40px ${accent}` }}
      />
    </article>
  )
}
