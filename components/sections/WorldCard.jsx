import { ArrowRight } from '@/components/shared/Icons'

export default function WorldCard({ index, name, tag, line, img, accent, artist }) {
  const brightAccent = accent.replace(/[\d.]+\)$/, '0.65)')

  return (
    <article className="fw-card world-card group relative cursor-pointer" style={{ height: 460 }}>

      {/* Ambient aura beneath — bleeds outside card boundary */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: -20, left: '8%', right: '8%', height: 260,
          background: `radial-gradient(ellipse 85% 75% at 50% 80%, ${accent}, transparent 70%)`,
          filter: 'blur(50px)',
          opacity: 0.75,
          zIndex: 0,
          transition: 'opacity 0.5s ease',
        }}
      />

      {/* Card frame — overflow:hidden so scrim + bg stay clipped */}
      <div
        className="absolute inset-0 rounded-[22px] overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #130a10 0%, #070308 100%)',
          border: '1px solid rgba(255,255,255,0.07)',
          transition: 'border-color 0.4s ease',
        }}
      >
        {/* Floor accent gradient */}
        <div
          className="absolute inset-0"
          style={{ background: `radial-gradient(ellipse 95% 55% at 50% 100%, ${accent}, transparent 60%)` }}
        />

        {/* Hover brighten */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(ellipse 75% 55% at 50% 100%, ${brightAccent}, transparent 65%)` }}
        />

        {/* Scrim for text readability */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, transparent 38%, rgba(0,0,0,0.82) 82%, rgba(0,0,0,0.97) 100%)' }}
        />

        {/* Top row */}
        <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
          <span className="numbered text-white/60">N° {String(index + 1).padStart(2, '0')}</span>
          <span
            className="numbered"
            style={{
              fontSize: 8,
              padding: '2.5px 8px',
              borderRadius: 999,
              background: 'rgba(0,0,0,0.55)',
              border: '1px solid rgba(255,255,255,0.10)',
              color: 'rgba(255,255,255,0.45)',
              backdropFilter: 'blur(10px)',
            }}
          >
            {tag}
          </span>
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
          <h3 className="font-display italic text-[26px] leading-tight tracking-tight text-white">{name}</h3>
          <p className="mt-1.5 text-[13px] leading-[1.65]" style={{ color: 'rgba(255,255,255,0.48)' }}>{line}</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="numbered text-white/30" style={{ fontSize: 9 }}>{artist.toUpperCase()}</span>
            <span
              className="inline-flex items-center gap-1 text-[12px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ color: 'oklch(82% 0.16 22)' }}
            >
              Enter <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>

      {/* Character — outside the frame, overflows above card boundary */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={img}
        alt=""
        draggable={false}
        loading="lazy"
        className="absolute left-1/2 pointer-events-none select-none"
        style={{
          bottom: 70,
          transform: 'translateX(-50%)',
          height: 500,
          width: 'auto',
          maxWidth: 'none',
          mixBlendMode: 'screen',
          filter: 'contrast(1.14) saturate(1.20) brightness(1.10)',
          zIndex: 5,
          transition: 'filter 0.5s ease',
        }}
      />
    </article>
  )
}
