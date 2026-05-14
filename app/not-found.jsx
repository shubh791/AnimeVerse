'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

export default function NotFound() {
  const glitchRef = useRef(null)

  useEffect(() => {
    const el = glitchRef.current
    if (!el) return
    const interval = setInterval(() => {
      el.style.transform = `translate(${(Math.random() - 0.5) * 6}px, ${(Math.random() - 0.5) * 3}px)`
      setTimeout(() => { el.style.transform = 'translate(0,0)' }, 80)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  return (
    <main
      className="relative min-h-svh flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #02000b 0%, #0e0308 50%, #020009 100%)' }}
    >
      {/* Atmospheric glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          position: 'absolute', top: '15%', left: '10%',
          width: 600, height: 500, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(180,20,20,0.14) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', right: '8%',
          width: 500, height: 420, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(100,20,180,0.10) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }} />
      </div>

      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px',
        }}
      />

      {/* Character — right side, decorative */}
      <div
        className="absolute right-0 bottom-0 pointer-events-none select-none hidden lg:block"
        style={{ width: 'min(460px, 34vw)', zIndex: 1 }}
      >
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 60% 100%, rgba(220,40,40,0.22), transparent 70%)' }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/samurai1.png"
          alt=""
          draggable={false}
          style={{
            width: '100%',
            mixBlendMode: 'screen',
            filter: 'contrast(1.10) saturate(0.70) brightness(0.55)',
            opacity: 0.50,
          }}
        />
      </div>

      {/* Top accent line */}
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,80,60,0.40) 40%, rgba(255,80,60,0.40) 60%, transparent)' }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">

        {/* 404 glitch number */}
        <div className="relative mb-6 select-none" style={{ lineHeight: 1 }}>
          <span
            ref={glitchRef}
            className="font-display font-bold"
            style={{
              fontSize: 'clamp(100px, 18vw, 200px)',
              letterSpacing: '-0.04em',
              background: 'linear-gradient(160deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block',
              transition: 'transform 80ms ease',
            }}
          >
            404
          </span>
          {/* Crimson echo */}
          <span
            className="absolute inset-0 font-display font-bold pointer-events-none"
            aria-hidden
            style={{
              fontSize: 'clamp(100px, 18vw, 200px)',
              letterSpacing: '-0.04em',
              background: 'linear-gradient(160deg, oklch(65% 0.28 22) 0%, oklch(45% 0.24 18) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              opacity: 0.18,
              transform: 'translate(3px, 3px)',
            }}
          >
            404
          </span>
        </div>

        {/* Eyebrow */}
        <div
          className="numbered mb-4 flex items-center gap-3"
          style={{ fontSize: 10, letterSpacing: '0.26em', color: 'oklch(72% 0.24 18)' }}
        >
          <span
            className="inline-block w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: 'oklch(72% 0.24 18)', boxShadow: '0 0 8px oklch(72% 0.24 18)' }}
          />
          WORLD NOT FOUND
        </div>

        {/* Headline */}
        <h1
          className="font-display italic mb-4"
          style={{
            fontSize: 'clamp(28px, 4vw, 54px)',
            letterSpacing: '-0.02em',
            lineHeight: 0.95,
            color: '#fff',
          }}
        >
          This arc doesn&apos;t exist.
        </h1>

        {/* Sub */}
        <p
          className="mb-10 max-w-[400px] leading-[1.75]"
          style={{ fontSize: 14, color: 'rgba(245,240,230,0.45)' }}
        >
          The universe you&apos;re looking for has been sealed, never streamed, or the portal
          collapsed mid-arc. Head back to the multiverse.
        </p>

        {/* Divider */}
        <div
          className="mb-10 w-16 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, oklch(64% 0.22 22), transparent)' }}
        />

        {/* CTAs */}
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[13px] font-medium tracking-wide transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(180deg, oklch(50% 0.24 20), oklch(36% 0.22 18))',
              border: '1px solid rgba(255,60,60,0.20)',
              boxShadow: '0 8px 28px -6px rgba(220,38,38,0.55), inset 0 1px 0 rgba(255,255,255,0.12)',
              color: '#fff',
            }}
          >
            <svg className="w-3.5 h-3.5 fill-white shrink-0" viewBox="0 0 24 24">
              <path d="M10 19l-7-7 7-7M3 12h18"/>
            </svg>
            Return Home
          </Link>

          <Link
            href="/#streaming"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-[13px] font-medium tracking-wide transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: 'rgba(255,55,35,0.05)',
              border: '1px solid rgba(255,55,35,0.28)',
              color: 'oklch(82% 0.18 22)',
              boxShadow: '0 0 20px rgba(255,50,30,0.16)',
            }}
          >
            <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M5 3L19 12L5 21V3Z"/>
            </svg>
            Browse Streaming
          </Link>
        </div>

        {/* Bottom stat strip */}
        <div
          className="mt-16 flex items-center gap-8 flex-wrap justify-center"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 20 }}
        >
          {[
            { val: '12,408+', label: 'Episodes' },
            { val: '184',     label: 'Studios' },
            { val: '4K·DV',   label: 'Quality' },
          ].map(({ val, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span
                className="font-display italic"
                style={{ fontSize: 22, color: 'oklch(65% 0.26 22)', textShadow: '0 0 18px rgba(220,40,40,0.45)' }}
              >
                {val}
              </span>
              <span
                className="numbered"
                style={{ fontSize: 8.5, letterSpacing: '0.18em', color: 'rgba(245,240,230,0.35)' }}
              >
                {label.toUpperCase()}
              </span>
            </div>
          ))}
        </div>

      </div>
    </main>
  )
}
