'use client'

/*
  ══════════════════════════════════════════════════
  HERO SECTION
  Layout:
    Mobile  : left content full-width, right image hidden
    lg+     : grid-cols-[46%_54%] — text left, right2.png right
  Samurai   : decorative bg image in left panel (mix-blend-mode screen)
  right2.png: full-height cover image in right panel
  ══════════════════════════════════════════════════
*/

import { useRef, useLayoutEffect } from 'react'
import { gsap } from '@/lib/gsap'

const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className="w-5 h-5">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M7 3v14M17 3v14M2 8h5M2 12h5M17 8h5M17 12h5"/>
      </svg>
    ),
    label: '4K DOLBY VISION', sub: 'Cinematic Quality',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2l2.68 5.43L21 8.27l-4.5 4.38 1.06 5.96L12 15.77l-5.56 3.07 1.06-5.96L3 8.27l6.32-.84L12 2z"/>
      </svg>
    ),
    label: 'NEW EPISODES', sub: 'Weekly Updates',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
      </svg>
    ),
    label: 'JP + EN AUDIO', sub: 'Original Experience',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    label: '10,000+ EPISODES', sub: 'Endless Entertainment',
  },
]

export default function Hero() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hv-char',
        { opacity: 0, y: 40, filter: 'blur(16px) brightness(0.2)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px) brightness(1)',
          duration: 1.6, ease: 'power3.out',
          stagger: { from: 'center', amount: 0.4 },
          delay: 0.25,
        }
      )
      const tl = gsap.timeline({ delay: 0.1, defaults: { ease: 'power4.out' } })
      tl.from('.hv-badge',   { y: 18, opacity: 0, duration: 0.7 })
        .from('.hv-h1',      { y: 55, opacity: 0, duration: 1.0 }, '-=0.3')
        .from('.hv-rule',    { scaleX: 0, transformOrigin: 'left center', duration: 0.55 }, '-=0.55')
        .from('.hv-desc',    { y: 18, opacity: 0, duration: 0.75 }, '-=0.48')
        .from('.hv-cta > *', { y: 14, opacity: 0, stagger: 0.1, duration: 0.6 }, '-=0.48')
        .from('.hv-feat > *',{ y: 14, opacity: 0, stagger: 0.07, duration: 0.55 }, '-=0.40')
        .from('.hv-scroll',  { opacity: 0, duration: 0.5 }, '-=0.22')

      gsap.to('.hv-aura', {
        opacity: 0.9, scale: 1.10,
        duration: 4.8, ease: 'sine.inOut',
        repeat: -1, yoyo: true,
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-svh overflow-hidden bg-[#02000b]"
    >
      {/* ── Page-level atmospheric glow ── */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 70% 75% at 72% 50%, rgba(200,12,16,0.42) 0%, rgba(110,5,8,0.18) 45%, transparent 72%)',
        zIndex: 2,
      }}/>

      {/* Diagonal texture lines */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'repeating-linear-gradient(-52deg, transparent, transparent 76px, rgba(255,255,255,0.010) 76px, rgba(255,255,255,0.010) 77px)',
        zIndex: 3,
      }}/>

      {/* Fine grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: [
          'linear-gradient(rgba(255,255,255,0.008) 1px, transparent 1px)',
          'linear-gradient(90deg, rgba(255,255,255,0.008) 1px, transparent 1px)',
        ].join(','),
        backgroundSize: '54px 54px',
        zIndex: 3,
      }}/>

      {/* Grain */}
      <div className="grain absolute inset-0 pointer-events-none" style={{ zIndex: 4 }}/>

      {/* Top + bottom vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(to bottom, rgba(2,0,11,0.72) 0%, transparent 18%, transparent 60%, rgba(2,0,11,0.90) 100%)',
        zIndex: 6,
      }}/>

      {/* ══════════════════════════════════════
          TWO-COLUMN GRID
      ══════════════════════════════════════ */}
      <div className="grid lg:grid-cols-[46%_54%] min-h-svh relative" style={{ zIndex: 10 }}>

        {/* ─── LEFT: samurai bg + text content ─── */}
        {/* py-24 mobile keeps text away from navbar/bottom; lg:py-28 gives generous desktop spacing */}
        <div className="relative flex flex-col justify-center px-5 sm:px-8 lg:px-14 xl:px-18 py-24 lg:py-28 overflow-hidden">

          {/* Samurai as left-panel background */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/samurai1.png"
            alt="" aria-hidden draggable={false}
            className="absolute bottom-0 right-0 pointer-events-none select-none"
            style={{
              height: '100svh',
              width: 'auto',
              maxWidth: 'none',
              mixBlendMode: 'screen',
              filter: 'contrast(1.18) saturate(0.80) brightness(0.78)',
              opacity: 0.88,
              zIndex: 1,
            }}
          />

          {/* Gradient over samurai so text stays readable */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: [
              'linear-gradient(to right,',
              '  #02000b 0%, #02000b 14%,',
              '  rgba(2,0,11,0.88) 32%,',
              '  rgba(2,0,11,0.55) 56%,',
              '  rgba(2,0,11,0.30) 100%)',
            ].join(' '),
            zIndex: 2,
          }}/>
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'linear-gradient(to bottom, rgba(2,0,11,0.40) 0%, transparent 18%, transparent 68%, rgba(2,0,11,0.72) 100%)',
            zIndex: 2,
          }}/>

          {/* ── Text content ── */}
          <div className="relative" style={{ zIndex: 5 }}>

            {/* Badge */}
            <div
              className="hv-badge inline-flex w-fit items-center gap-3 mb-8 px-4 py-2 rounded-full"
              style={{
                background: 'rgba(255,255,255,0.038)',
                border: '1px solid rgba(255,255,255,0.085)',
                backdropFilter: 'blur(14px)',
              }}
            >
              <span className="font-mono text-[9px] tracking-[0.20em]" style={{ color: 'rgba(255,255,255,0.44)' }}>
                SEASON 03 · CRIMSON ARC
              </span>
              <div className="w-px h-3 shrink-0 bg-white/10"/>
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse"
                style={{ background: '#e8361a', boxShadow: '0 0 8px #e8361a' }}
              />
              <span className="font-mono text-[9px] tracking-[0.20em]" style={{ color: 'oklch(72% 0.24 18)' }}>
                LIVE NOW
              </span>
            </div>

            {/* Headline */}
            <h1
              className="hv-h1 font-sans font-bold text-white m-0 p-0 leading-[1.02] tracking-[-0.026em]"
              style={{ fontSize: 'clamp(42px, 5.4vw, 88px)' }}
            >
              Step Beyond
              <br/>
              the{' '}
              <em
                className="not-italic"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontWeight: 600,
                  color: 'oklch(84% 0.18 22)',
                  textShadow: '0 0 52px rgba(255,100,70,0.70), 0 0 14px rgba(255,140,100,0.40)',
                }}
              >
                Frame.
              </em>
            </h1>

            {/* Rule */}
            <div
              className="hv-rule mt-6 h-px"
              style={{ width: 68, background: 'linear-gradient(90deg, oklch(64% 0.22 22), transparent)' }}
            />

            {/* Desc */}
            <p
              className="hv-desc mt-5 font-sans text-[14px] leading-[1.85] max-w-[390px]"
              style={{ color: 'rgba(245,240,230,0.46)' }}
            >
              Every arc. Every world. Every legendary battle — streaming in 4K Dolby Vision
              with JP and EN audio. One universe built exclusively for true anime fans.
            </p>

            {/* CTAs */}
            <div className="hv-cta mt-9 flex items-center gap-4 flex-wrap">
              <button
                className="inline-flex items-center gap-2 font-sans font-semibold text-[13px] tracking-[0.02em] text-white px-7 py-3.5 rounded-lg cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(180deg, oklch(50% 0.24 20), oklch(36% 0.22 18))',
                  border: '1px solid rgba(255,60,60,0.20)',
                  boxShadow: '0 8px 28px -6px rgba(220,38,38,0.65), inset 0 1px 0 rgba(255,255,255,0.14)',
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 14px 36px -6px rgba(220,38,38,0.82), inset 0 1px 0 rgba(255,255,255,0.14)' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 8px 28px -6px rgba(220,38,38,0.65), inset 0 1px 0 rgba(255,255,255,0.14)' }}
                onClick={() => document.getElementById('streaming')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <svg className="w-3.5 h-3.5 fill-white shrink-0" viewBox="0 0 24 24"><path d="M5 3L19 12L5 21V3Z"/></svg>
                Start Watching Free
              </button>

              <button
                className="group relative inline-flex items-center gap-2 font-sans font-medium text-[13px] tracking-[0.02em] px-6 py-3.5 rounded-lg cursor-pointer overflow-hidden transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  color: 'oklch(82% 0.18 22)',
                  background: 'rgba(255,55,35,0.05)',
                  border: '1px solid rgba(255,55,35,0.30)',
                  boxShadow: '0 0 20px rgba(255,50,30,0.22), inset 0 1px 0 rgba(255,100,65,0.10)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,55,35,0.12)'
                  e.currentTarget.style.borderColor = 'rgba(255,55,35,0.52)'
                  e.currentTarget.style.boxShadow = '0 0 32px rgba(255,50,30,0.46), inset 0 1px 0 rgba(255,100,65,0.14)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,55,35,0.05)'
                  e.currentTarget.style.borderColor = 'rgba(255,55,35,0.30)'
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(255,50,30,0.22), inset 0 1px 0 rgba(255,100,65,0.10)'
                }}
                onClick={() => document.getElementById('worlds')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(105deg, transparent 20%, rgba(255,140,100,0.18) 50%, transparent 80%)',
                    backgroundSize: '200% 100%',
                    animation: 'explore-shimmer 3.2s ease-in-out infinite',
                  }}
                />
                Explore Worlds
                <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>

            {/* Feature strip */}
            <div className="hv-feat mt-10 flex items-center flex-wrap gap-y-3">
              {FEATURES.map(({ icon, label, sub }, i) => (
                <div key={label} className="flex items-center shrink-0">
                  <div className="flex items-center gap-3 pr-5">
                    <div
                      className="flex items-center justify-center w-9 h-9 rounded-xl shrink-0"
                      style={{
                        background: 'rgba(220,38,38,0.07)',
                        border: '1px solid rgba(220,38,38,0.17)',
                        color: 'oklch(64% 0.22 22)',
                      }}
                    >{icon}</div>
                    <div>
                      <div className="font-mono text-[8px] tracking-[0.13em]" style={{ color: 'rgba(255,255,255,0.84)', lineHeight: 1.3 }}>{label}</div>
                      <div className="font-mono text-[7.5px] tracking-[0.08em] mt-0.5" style={{ color: 'rgba(255,255,255,0.26)' }}>{sub}</div>
                    </div>
                  </div>
                  {i < FEATURES.length - 1 && (
                    <div className="h-7 w-px shrink-0 mr-5" style={{ background: 'rgba(255,255,255,0.07)' }}/>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* ─── RIGHT: right2.png ─── */}
        <div className="relative hidden lg:block overflow-hidden" style={{ minHeight: '100svh' }}>

          {/* Floor glow */}
          <div className="absolute bottom-0 inset-x-0 pointer-events-none" style={{
            height: '35%',
            background: 'radial-gradient(ellipse 100% 80% at 50% 100%, rgba(215,16,16,0.50) 0%, rgba(130,6,8,0.22) 48%, transparent 70%)',
            filter: 'blur(22px)',
            zIndex: 2,
          }}/>

          {/* Aura behind image */}
          <div
            className="hv-aura absolute pointer-events-none"
            style={{
              inset: 0,
              background: 'radial-gradient(ellipse 70% 75% at 50% 42%, rgba(255,200,180,0.16) 0%, rgba(255,70,50,0.10) 40%, rgba(200,12,12,0.05) 62%, transparent 78%)',
              filter: 'blur(10px)',
              zIndex: 3,
            }}
          />

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/char.png"
            alt="" draggable={false}
            className="hv-char pointer-events-none select-none absolute bottom-0 left-0"
            style={{
              height: 'calc(125svh - 74px)',
              width: '100%',
              objectFit: 'contain',
              objectPosition: 'center bottom',
              mixBlendMode: 'screen',
              filter: 'contrast(1.22) saturate(1.18) brightness(1.08)',
              zIndex: 10,
            }}
          />

        </div>
      </div>

      {/* ─── Scroll cue ─── */}
      <div
        className="hv-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5"
        style={{ zIndex: 40 }}
      >
        <span
          className="font-mono text-[8px] tracking-[0.28em]"
          style={{
            color: 'oklch(70% 0.20 22)',
            textShadow: '0 0 14px oklch(64% 0.22 22), 0 0 28px rgba(255,80,40,0.28)',
            animation: 'glow-breathe 3.5s ease-in-out infinite',
          }}
        >
          SCROLL TO EXPLORE
        </span>
        <div
          className="w-px h-9 relative overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.07)', boxShadow: '0 0 6px oklch(60% 0.22 22)' }}
        >
          <div
            className="absolute inset-x-0 top-0 h-1/2"
            style={{
              background: 'linear-gradient(to bottom, transparent, oklch(82% 0.22 22))',
              animation: 'scroll-cue 2s ease-in-out infinite',
            }}
          />
        </div>
        <svg
          width="12" height="8" viewBox="0 0 12 8" fill="none"
          style={{ animation: 'scroll-cue 2s ease-in-out infinite', filter: 'drop-shadow(0 0 6px oklch(72% 0.22 22))' }}
        >
          <path d="M1 1L6 6L11 1" stroke="oklch(72% 0.22 22)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

    </section>
  )
}
