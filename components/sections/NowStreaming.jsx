'use client'

import { useState, useEffect, useRef, useLayoutEffect, useCallback } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { EPISODES } from '@/data/episodes'
import { useModal } from '@/contexts/ModalContext'

/* ─── Constants ─── */
const TIMER_MS = 3500
const FILTERS  = ['All', 'Action', 'Fantasy', 'Supernatural']

/* ─── Inline icons ─── */
function PlayIcon({ size = 14 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M5 3L19 12L5 21V3Z"/></svg>
}
function StarIcon({ filled = true, size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={filled ? 0 : 1.8}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  )
}

/* ══════════════════════════════════════════════════
   HERO SLIDE — full-bleed episode presentation
══════════════════════════════════════════════════ */
function HeroSlide({ ep, isActive, onOpen }) {
  const solidAccent = ep.accent.replace(/[\d.]+\)$/, '1)')

  return (
    <div
      style={{
        position: 'absolute', inset: 0,
        opacity: isActive ? 1 : 0,
        transition: 'opacity 700ms cubic-bezier(.4,0,.2,1)',
        pointerEvents: isActive ? 'auto' : 'none',
      }}
    >
      {/* ── Slide background gradient ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(ellipse 65% 80% at 72% 55%, ${ep.accent} 0%, transparent 62%),
          radial-gradient(ellipse 40% 45% at 15% 85%, ${ep.accent.replace(/[\d.]+\)$/, '0.18)')} 0%, transparent 65%),
          linear-gradient(160deg, #0b0510 0%, #070310 100%)
        `,
      }} />

      {/* ── Text readability veil — left to right ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, rgba(4,2,9,0.97) 0%, rgba(4,2,9,0.82) 30%, rgba(4,2,9,0.35) 58%, rgba(4,2,9,0.08) 100%)',
      }} />

      {/* ── Bottom veil ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(4,2,9,0.92) 0%, rgba(4,2,9,0.40) 28%, transparent 52%)',
      }} />

      {/* ── Character image — right half, hidden on small screens ── */}
      <div style={{
        position: 'absolute',
        right: 0, bottom: 0,
        width: '54%', height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ep.img}
          alt={ep.title}
          style={{
            position: 'absolute',
            bottom: 0, right: '4%',
            height: '105%',
            width: 'auto', maxWidth: 'none',
            mixBlendMode: 'screen',
            filter: 'contrast(1.18) saturate(1.28) brightness(1.12)',
            objectFit: 'contain',
            transform: isActive ? 'scale(1) translateY(0)' : 'scale(1.04) translateY(10px)',
            transition: 'transform 900ms cubic-bezier(.2,.7,.2,1)',
          }}
        />
        {/* Foot aura glow */}
        <div style={{
          position: 'absolute', bottom: -10, right: '18%',
          width: 220, height: 80,
          background: `radial-gradient(ellipse, ${ep.accent.replace(/[\d.]+\)$/, '0.65)')} 0%, transparent 70%)`,
          filter: 'blur(22px)',
        }} />
      </div>

      {/* ── Top accent hairline ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(90deg, ${solidAccent}80, ${solidAccent}20 55%, transparent 100%)`,
        zIndex: 2,
      }} />

      {/* ── Text content — left panel ── */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        /* Responsive padding: tighter on mobile, generous on desktop */
        padding: 'clamp(20px, 5%, 52px)',
        /* Full width on mobile so text is readable without character obscuring */
        maxWidth: 'min(62%, 600px)',
        zIndex: 5,
      }}>
        {/* Arc + episode meta row */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18,
          flexWrap: 'wrap',
          opacity: isActive ? 1 : 0,
          transform: isActive ? 'translateY(0)' : 'translateY(14px)',
          transition: 'opacity 600ms 150ms ease, transform 600ms 150ms ease',
        }}>
          <div style={{ width: 3, height: 18, borderRadius: 2, background: solidAccent, boxShadow: `0 0 12px ${solidAccent}`, flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.24em', color: 'rgba(245,240,230,0.45)', textTransform: 'uppercase' }}>
            {ep.arc}
          </span>
          <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.18)', flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.18em', color: solidAccent }}>{ep.ep}</span>
          <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.18)', flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.14em', color: 'rgba(245,240,230,0.30)' }}>{ep.duration}</span>
        </div>

        {/* Episode title */}
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(26px, 4.8vw, 68px)',
          fontWeight: 700, lineHeight: 0.92,
          letterSpacing: '-0.025em', color: '#fff',
          marginBottom: 18,
          textShadow: `0 0 80px ${ep.accent}`,
          opacity: isActive ? 1 : 0,
          transform: isActive ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 600ms 230ms ease, transform 600ms 230ms ease',
        }}>
          {ep.title}
        </h2>

        {/* Genre + format badges */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          marginBottom: 28, flexWrap: 'wrap',
          opacity: isActive ? 1 : 0,
          transform: isActive ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 600ms 300ms ease, transform 600ms 300ms ease',
        }}>
          {[
            { label: ep.arc.toUpperCase().split(' ')[0], accent: true },
            { label: 'HD' },
            { label: 'SUB + DUB' },
          ].map(({ label, accent }) => (
            <span
              key={label}
              style={{
                fontFamily: 'var(--font-mono)', fontSize: 9,
                letterSpacing: '0.14em',
                padding: '4px 11px', borderRadius: 8,
                background: accent ? `${solidAccent}1A` : 'rgba(255,255,255,0.05)',
                border: `1px solid ${accent ? solidAccent + '45' : 'rgba(255,255,255,0.09)'}`,
                color: accent ? solidAccent : 'rgba(255,255,255,0.55)',
              }}
            >{label}</span>
          ))}
        </div>

        {/* Action buttons */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap',
          opacity: isActive ? 1 : 0,
          transform: isActive ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 600ms 360ms ease, transform 600ms 360ms ease',
        }}>
          <button
            onClick={onOpen}
            className="cta-primary inline-flex items-center gap-2.5 rounded-full"
            style={{ fontFamily: 'var(--font-sans)', fontSize: 13.5, letterSpacing: '0.02em', padding: '13px 30px' }}
          >
            <PlayIcon size={15} /> Watch Now
          </button>

          {/* Ratings display */}
          <div style={{
            display: 'flex', flexDirection: 'column', gap: 3,
            padding: '10px 16px', borderRadius: 14,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.09)',
            flexShrink: 0,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 3, color: 'oklch(82% 0.18 60)' }}>
              {[1,2,3,4,5].map(i => (
                <StarIcon key={i} filled={i <= Math.round(ep.score / 2)} size={11} />
              ))}
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 15, color: '#fff', marginLeft: 5, lineHeight: 1 }}>{ep.score}</span>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.32)' }}>
              {ep.votes} VOTES
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════
   THUMBNAIL CARD — episode selector strip
══════════════════════════════════════════════════ */
function ThumbCard({ ep, isActive, onClick, progressKey }) {
  const solidAccent = ep.accent.replace(/[\d.]+\)$/, '1)')

  return (
    <button
      onClick={onClick}
      style={{
        position: 'relative',
        height: 96, width: '100%',
        borderRadius: 14, overflow: 'hidden',
        cursor: 'pointer',
        border: `1px solid ${isActive ? solidAccent + '70' : 'rgba(255,255,255,0.06)'}`,
        background: isActive
          ? `radial-gradient(ellipse 110% 80% at 50% 100%, ${ep.accent.replace(/[\d.]+\)$/, '0.28)')} 0%, ${ep.accent.replace(/[\d.]+\)$/, '0.10)')} 55%, transparent 100%), rgba(255,255,255,0.03)`
          : 'rgba(255,255,255,0.025)',
        boxShadow: isActive ? `0 0 28px ${ep.accent.replace(/[\d.]+\)$/, '0.22)')}` : 'none',
        transform: isActive ? 'translateY(-4px) scale(1.01)' : 'translateY(0) scale(1)',
        transition: 'all 350ms cubic-bezier(.2,.7,.2,1)',
        outline: 'none',
      }}
    >
      {/* Character art — right side of thumbnail */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={ep.img} alt={ep.title}
        style={{
          position: 'absolute', bottom: -2, right: 4,
          height: '112%', width: 'auto', maxWidth: '52%',
          mixBlendMode: 'screen',
          filter: 'contrast(1.14) saturate(1.18) brightness(1.08)',
          objectFit: 'contain',
          opacity: isActive ? 1 : 0.45,
          transition: 'opacity 350ms ease',
        }}
      />

      {/* Left-side text fade gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, rgba(4,2,9,0.88) 28%, rgba(4,2,9,0.30) 70%, transparent 100%)',
      }} />

      {/* Active top accent hairline */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: isActive ? `linear-gradient(90deg, ${solidAccent}, transparent)` : 'transparent',
        transition: 'background 350ms ease',
      }} />

      {/* Auto-advance progress bar — re-mounts on each progressKey change */}
      {isActive && (
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'rgba(255,255,255,0.08)', zIndex: 10 }}>
          <div
            key={progressKey}
            style={{
              height: '100%', background: solidAccent,
              boxShadow: `0 0 8px ${solidAccent}`,
              animation: `ns-progress ${TIMER_MS}ms linear forwards`,
            }}
          />
        </div>
      )}

      {/* Text content */}
      <div style={{
        position: 'relative', zIndex: 4,
        padding: '11px 13px',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        height: '100%', textAlign: 'left',
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 7.5, letterSpacing: '0.20em', color: isActive ? solidAccent : 'rgba(255,255,255,0.28)', textTransform: 'uppercase', transition: 'color 350ms ease' }}>
          {ep.ep}
        </span>
        <div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(11px, 1.3vw, 15px)',
            fontWeight: 700, lineHeight: 1.15,
            color: isActive ? '#fff' : 'rgba(255,255,255,0.48)',
            overflow: 'hidden', textOverflow: 'ellipsis',
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
            maxWidth: '58%',
            transition: 'color 350ms ease',
          }}>
            {ep.title}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'rgba(255,255,255,0.22)', marginTop: 3 }}>
            {ep.duration}
          </div>
        </div>
      </div>
    </button>
  )
}

/* ══════════════════════════════════════════════════
   NOW STREAMING SECTION
══════════════════════════════════════════════════ */
export default function NowStreaming() {
  const [active,      setActive]      = useState(0)
  const [progressKey, setProgressKey] = useState(0)
  const [filterActive,setFilterActive]= useState('All')
  const ref         = useRef(null)
  const intervalRef = useRef(null)
  const { openModal } = useModal()

  /* ── Auto-advance every TIMER_MS ms ── */
  const handleSelect = useCallback((index) => {
    clearInterval(intervalRef.current)
    setActive(index)
    setProgressKey(k => k + 1)
    intervalRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % EPISODES.length)
      setProgressKey(k => k + 1)
    }, TIMER_MS)
  }, [])

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % EPISODES.length)
      setProgressKey(k => k + 1)
    }, TIMER_MS)
    return () => clearInterval(intervalRef.current)
  }, [])

  /* ── GSAP scroll-triggered entrance animations ── */
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return
    const ctx = gsap.context(() => {
      gsap.fromTo('.ns-section-head',
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true } }
      )
      gsap.fromTo('.ns-hero-wrap',
        { y: 50, opacity: 0, scale: 0.975 },
        { y: 0, opacity: 1, scale: 1, duration: 1.05, ease: 'power3.out', delay: 0.12,
          scrollTrigger: { trigger: ref.current, start: 'top 78%', once: true } }
      )
      gsap.fromTo('.ns-thumb',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.70, ease: 'power3.out', stagger: 0.07, delay: 0.25,
          scrollTrigger: { trigger: ref.current, start: 'top 70%', once: true } }
      )
      gsap.fromTo('.ns-stat',
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.60, ease: 'power2.out', stagger: 0.06, delay: 0.38,
          scrollTrigger: { trigger: ref.current, start: 'top 52%', once: true } }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="streaming"
      ref={ref}
      className="relative py-16 sm:py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050208 0%, #060309 22%, #09040e 55%, #050208 100%)' }}
    >
      {/* ── Ambient background glows ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div style={{
          position: 'absolute', top: '12%', left: '50%', transform: 'translateX(-50%)',
          width: 900, height: 500, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(220,40,40,0.055) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }} />
        {/* Top separator line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05) 50%, transparent)',
        }} />
      </div>

      <div className="max-w-[1320px] mx-auto relative">

        {/* ── Section header: eyebrow, title, genre filters ── */}
        <div className="ns-section-head mb-8 md:mb-11">

          {/* Eyebrow label with live pulse dot */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ width: 28, height: 1, background: 'linear-gradient(90deg, rgba(220,40,40,0.80), transparent)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: 'oklch(64% 0.22 22)', boxShadow: '0 0 10px oklch(64% 0.22 22)',
                animation: 'pulse 2s ease-in-out infinite', display: 'inline-block',
              }} />
              <span className="numbered" style={{ color: 'oklch(72% 0.22 22)', letterSpacing: '0.26em', fontSize: 9.5 }}>
                03 · NOW STREAMING
              </span>
            </div>
          </div>

          {/* Title row + genre filters — stack on mobile, side by side on sm+ */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6">
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 5.2vw, 74px)',
              fontWeight: 700, lineHeight: 0.92,
              letterSpacing: '-0.025em', color: 'var(--color-ink)',
            }}>
              Tonight&apos;s{' '}
              <em style={{
                fontStyle: 'italic',
                background: 'linear-gradient(135deg, oklch(82% 0.16 22) 0%, oklch(72% 0.22 18) 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>premieres,</em>
              <span style={{ display: 'block' }}>cinema-grade.</span>
            </h2>

            {/* Genre filter pills — horizontally scrollable on mobile */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar shrink-0">
              {FILTERS.map(f => (
                <button
                  key={f}
                  onClick={() => setFilterActive(f)}
                  style={{
                    fontFamily: 'var(--font-mono)', fontSize: 9.5,
                    letterSpacing: '0.16em', textTransform: 'uppercase',
                    padding: '7px 16px', borderRadius: 9999,
                    border: `1px solid ${filterActive === f ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.07)'}`,
                    background: filterActive === f ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.025)',
                    color: filterActive === f ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.36)',
                    boxShadow: filterActive === f ? '0 0 24px -6px rgba(255,80,80,0.25)' : 'none',
                    transition: 'all 240ms ease', cursor: 'pointer',
                    whiteSpace: 'nowrap', flexShrink: 0,
                  }}
                >{f}</button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Hero slide presentation — full-bleed card ── */}
        <div
          className="ns-hero-wrap"
          style={{
            position: 'relative',
            /* Shorter on mobile, taller on desktop */
            height: 'clamp(300px, 52vw, 580px)',
            borderRadius: 20,
            overflow: 'hidden',
            boxShadow: '0 40px 100px rgba(0,0,0,0.65)',
          }}
        >
          {/* All slides stacked absolutely — only active one is visible */}
          {EPISODES.map((ep, i) => (
            <HeroSlide key={ep.title} ep={ep} isActive={i === active} onOpen={openModal} />
          ))}

          {/* Episode dot indicators — bottom right */}
          <div style={{
            position: 'absolute', bottom: 18, right: 18, zIndex: 20,
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            {EPISODES.map((_, i) => (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                style={{
                  width: i === active ? 22 : 6, height: 6, borderRadius: 3,
                  background: i === active
                    ? EPISODES[active].accent.replace(/[\d.]+\)$/, '1)')
                    : 'rgba(255,255,255,0.22)',
                  transition: 'all 350ms ease', cursor: 'pointer', border: 'none',
                  boxShadow: i === active ? `0 0 10px ${EPISODES[active].accent.replace(/[\d.]+\)$/, '0.70)')}` : 'none',
                }}
              />
            ))}
          </div>

          {/* LIVE NOW badge — top right */}
          <div style={{
            position: 'absolute', top: 18, right: 18, zIndex: 20,
            display: 'flex', alignItems: 'center', gap: 7,
            padding: '7px 14px', borderRadius: 9999,
            background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.09)',
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: 'oklch(64% 0.22 22)', boxShadow: '0 0 8px oklch(64% 0.22 22)',
              animation: 'pulse 2s ease-in-out infinite', display: 'inline-block',
            }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8.5, letterSpacing: '0.20em', color: 'rgba(255,255,255,0.72)' }}>
              LIVE NOW
            </span>
          </div>
        </div>

        {/* ── Thumbnail selector strip ──
            Desktop: single row (flex)
            Mobile: 2×2 grid so thumbs aren't too narrow ── */}
        <div className="grid grid-cols-2 sm:flex sm:flex-row gap-3 sm:gap-4 mt-4">
          {EPISODES.map((ep, i) => (
            <div key={i} className="ns-thumb sm:flex-1">
              <ThumbCard
                ep={ep}
                index={i}
                isActive={i === active}
                onClick={() => handleSelect(i)}
                progressKey={i === active ? progressKey : -1}
              />
            </div>
          ))}
        </div>

        {/* ── Bottom stats strip — 2-col mobile, 4-col sm+ ── */}
        <div
          className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-4 gap-px overflow-hidden rounded-[16px] sm:rounded-[18px]"
          style={{ border: '1px solid rgba(255,255,255,0.06)' }}
        >
          {[
            { label: 'Streaming Now',    value: '12',     unit: 'LIVE' },
            { label: "Tonight's Titles", value: '47',     unit: 'NEW'  },
            { label: 'Updated',          value: 'HOURLY', unit: ''     },
            { label: 'Avg Runtime',      value: '24',     unit: 'MIN'  },
          ].map(({ label, value, unit }) => (
            <div
              key={label}
              className="ns-stat flex flex-col items-center justify-center gap-1.5 py-4 sm:py-5 px-3"
              style={{ background: 'rgba(5,3,8,0.90)' }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(18px, 2.6vw, 30px)',
                  fontWeight: 700, fontStyle: 'italic',
                  color: 'rgba(255,255,255,0.80)', lineHeight: 1,
                }}>{value}</span>
                {unit && (
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 7.5, letterSpacing: '0.18em', color: 'oklch(72% 0.22 22)' }}>
                    {unit}
                  </span>
                )}
              </div>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 8,
                letterSpacing: '0.18em', color: 'rgba(245,240,230,0.28)',
                textTransform: 'uppercase', textAlign: 'center',
              }}>{label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
