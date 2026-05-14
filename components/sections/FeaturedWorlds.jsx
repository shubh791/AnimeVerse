'use client'

import { useRef, useLayoutEffect, useState } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useModal } from '@/contexts/ModalContext'

const CATEGORIES = ['All', 'Dark Fantasy', 'Adventure', 'Action', 'Sci-Fi']

const WORLDS = [
  {
    id: 1,
    title: 'Crimson Arc',
    rating: 4.8,
    genre: 'FANTASY',
    episode: 'EP 24 · SEASON 03',
    description: 'Enter a realm where power comes at a price — a warrior cursed by ancient magic seeks redemption through blood and steel.',
    image: '/assets/whiteanime1.png',
    accent: 'rgba(220,28,28,0.55)',
    accentHi: 'rgba(255,70,60,0.85)',
    accentSolid: '#ff4a3a',
    imgFilter: 'contrast(1.28) saturate(1.24) brightness(1.22)',
  },
  {
    id: 2,
    title: 'Shadow Core',
    rating: 4.9,
    genre: 'ACTION',
    episode: 'EP 12 · SEASON 01',
    description: 'In the depths of darkness, heroes are born from shadow and forged in relentless conflict.',
    image: '/assets/samurai1.png',
    accent: 'rgba(200,110,40,0.55)',
    accentHi: 'rgba(255,145,55,0.85)',
    accentSolid: '#ff8c30',
    imgFilter: 'contrast(1.20) saturate(1.28) brightness(1.10)',
  },
  {
    id: 3,
    title: 'Eternal Veil',
    rating: 4.7,
    genre: 'MYSTERY',
    episode: 'EP 08 · SEASON 02',
    description: 'Unravel the mysteries that lie beyond the veil of reality itself.',
    image: '/assets/smartanime1.png',
    accent: 'rgba(75,60,220,0.55)',
    accentHi: 'rgba(100,85,255,0.85)',
    accentSolid: '#7a60ff',
    imgFilter: 'contrast(1.20) saturate(0.90) brightness(0.93)',
  },
  {
    id: 4,
    title: 'Vermillion Dawn',
    rating: 4.6,
    genre: 'ADVENTURE',
    episode: 'EP 16 · SEASON 01',
    description: 'A new dawn rises, bringing hope to a world consumed by eternal despair.',
    image: '/assets/redgirl1.png',
    accent: 'rgba(220,40,40,0.55)',
    accentHi: 'rgba(255,70,60,0.85)',
    accentSolid: '#ff4a3a',
    imgFilter: 'contrast(1.16) saturate(1.30) brightness(1.05)',
  },
  {
    id: 5,
    title: 'Saiyan Epoch',
    rating: 4.9,
    genre: 'BATTLE',
    episode: 'EP 38 · SEASON 02',
    description: 'Beyond the limits of mortal power, a lone warrior transcends every boundary the universe has set.',
    image: '/assets/goku1.png',
    accent: 'rgba(255,140,20,0.55)',
    accentHi: 'rgba(255,200,60,0.90)',
    accentSolid: '#ffc83c',
    imgFilter: 'contrast(1.30) saturate(1.40) brightness(1.18)',
  },
]

function StarIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M5 3L19 12L5 21V3Z"/>
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M12 5v14M5 12h14"/>
    </svg>
  )
}

/* ─── Small card ─────────────────────────────────────────── */
function SmallCard({ world, onOpen }) {
  const [hovered, setHovered] = useState(false)

  return (
    <article
      className="world-card fw-small-card cursor-pointer h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onOpen}
      style={{ minHeight: 228 }}
    >
      {/* Card frame */}
      <div
        className="absolute inset-0 rounded-[20px] overflow-hidden"
        style={{
          background: `linear-gradient(155deg, #0e0614 0%, #110813 55%, ${world.accent.replace(/[\d.]+\)$/, '0.08)')} 100%)`,
          border: '1px solid',
          borderColor: hovered ? world.accentHi.replace(/[\d.]+\)$/, '0.40)') : 'rgba(255,255,255,0.055)',
          transition: 'border-color 300ms ease, box-shadow 300ms ease',
          boxShadow: hovered
            ? `0 0 0 1px ${world.accent.replace(/[\d.]+\)$/, '0.12)')}, 0 20px 50px rgba(0,0,0,0.60), 0 0 60px ${world.accent.replace(/[\d.]+\)$/, '0.20)')}`
            : '0 4px 20px rgba(0,0,0,0.35)',
        }}
      >
        {/* Noise texture overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
          opacity: 0.5,
        }} />

        {/* Glow pool at bottom */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '55%',
          background: `radial-gradient(ellipse 85% 65% at 50% 100%, ${world.accent} 0%, transparent 72%)`,
          zIndex: 1,
          opacity: hovered ? 1 : 0.55,
          transition: 'opacity 300ms ease',
        }} />

        {/* Top veil */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2,
          background: 'linear-gradient(to top, rgba(3,1,6,0.98) 0%, rgba(3,1,6,0.65) 38%, rgba(3,1,6,0.10) 62%, transparent 100%)',
        }} />

        {/* Top hairline */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 1, zIndex: 4,
          background: `linear-gradient(90deg, transparent 0%, ${world.accentHi} 50%, transparent 100%)`,
          opacity: hovered ? 0.60 : 0.10,
          transition: 'opacity 300ms ease',
        }} />

        {/* Corner accent */}
        <div style={{
          position: 'absolute', top: 0, right: 0, width: 60, height: 60, zIndex: 3,
          background: `radial-gradient(ellipse at top right, ${world.accentHi.replace(/[\d.]+\)$/, '0.12)')} 0%, transparent 70%)`,
          opacity: hovered ? 1 : 0.4,
          transition: 'opacity 300ms ease',
        }} />
      </div>

      {/* Character */}
      <div style={{
        position: 'absolute',
        bottom: '26%',
        left: '50%',
        transform: 'translateX(-50%)',
        height: '75%',
        width: '100%',
        zIndex: 5,
        pointerEvents: 'none',
      }}>
        <img
          src={world.image}
          alt={world.title}
          style={{
            position: 'absolute', bottom: 0, left: '50%',
            transform: `translateX(-50%) scale(${hovered ? 1.06 : 1.0})`,
            height: '122%', width: 'auto', maxWidth: 'none',
            mixBlendMode: 'screen',
            filter: world.imgFilter,
            objectFit: 'contain',
            transition: 'transform 480ms cubic-bezier(.2,.7,.2,1)',
            willChange: 'transform',
          }}
        />
        {/* Foot aura */}
        <div style={{
          position: 'absolute', bottom: -8, left: '50%',
          transform: 'translateX(-50%)',
          width: 80, height: 32,
          background: `radial-gradient(ellipse, ${world.accentHi.replace(/[\d.]+\)$/, '0.55)')} 0%, transparent 70%)`,
          filter: 'blur(10px)',
          opacity: hovered ? 1 : 0.50,
          transition: 'opacity 300ms ease',
        }} />
      </div>

      {/* Text content */}
      <div className="relative h-full flex flex-col justify-end p-4 sm:p-[18px]" style={{ zIndex: 6 }}>

        {/* Top badge row */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 10,
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 7.5,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            padding: '2.5px 8px', borderRadius: 9999,
            background: 'rgba(200,28,28,0.20)',
            border: `1px solid ${world.accentHi.replace(/[\d.]+\)$/, '0.30)')}`,
            color: world.accentSolid,
            whiteSpace: 'nowrap',
          }}>
            {world.genre}
          </span>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 3,
            background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)',
            padding: '2.5px 7px', borderRadius: 8,
            border: '1px solid rgba(255,255,255,0.07)',
          }}>
            <span style={{ color: '#f5c842', display: 'flex' }}><StarIcon /></span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#fff', fontWeight: 700 }}>
              {world.rating}
            </span>
          </div>
        </div>

        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 7.5,
          letterSpacing: '0.20em', textTransform: 'uppercase',
          color: 'rgba(245,240,230,0.25)', marginBottom: 5,
        }}>
          {world.episode}
        </div>

        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(17px, 2.6vw, 26px)',
          fontWeight: 700, lineHeight: 0.96,
          letterSpacing: '-0.015em', color: '#fff',
          marginBottom: 6,
          textShadow: `0 2px 24px ${world.accent}`,
        }}>
          {world.title}
        </h3>

        <p style={{
          fontFamily: 'var(--font-sans)', fontSize: 11,
          color: 'rgba(245,240,230,0.36)', lineHeight: 1.60,
          display: '-webkit-box',
          WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {world.description}
        </p>

        {/* Hover CTA */}
        <div style={{
          marginTop: 10,
          display: 'flex', alignItems: 'center', gap: 6,
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0)' : 'translateY(4px)',
          transition: 'opacity 280ms ease, transform 280ms ease',
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 8.5,
            letterSpacing: '0.18em', color: world.accentSolid,
          }}>
            EXPLORE →
          </span>
        </div>
      </div>
    </article>
  )
}

/* ─── Section ─────────────────────────────────────────────── */
export default function FeaturedWorlds() {
  const [activeCategory, setActiveCategory] = useState(0)
  const rootRef = useRef(null)
  const { openModal } = useModal()
  const featured = WORLDS[0]
  const smallWorlds = WORLDS.slice(1)

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return

    const ctx = gsap.context(() => {
      gsap.fromTo('.fw-eyebrow',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: '.fw-header', start: 'top 87%', once: true } }
      )
      gsap.fromTo('.fw-title',
        { y: 36, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out', delay: 0.08,
          scrollTrigger: { trigger: '.fw-header', start: 'top 87%', once: true } }
      )
      gsap.fromTo('.fw-sub',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, ease: 'power2.out', delay: 0.18,
          scrollTrigger: { trigger: '.fw-header', start: 'top 87%', once: true } }
      )
      gsap.fromTo('.fw-explore',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, ease: 'power2.out', delay: 0.24,
          scrollTrigger: { trigger: '.fw-header', start: 'top 87%', once: true } }
      )
      gsap.fromTo('.fw-cats',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: '.fw-cats', start: 'top 90%', once: true } }
      )
      gsap.fromTo('.fw-featured',
        { y: 56, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 1.05, ease: 'power3.out',
          scrollTrigger: { trigger: '.fw-grid', start: 'top 82%', once: true } }
      )
      gsap.fromTo('.fw-small-card',
        { y: 44, opacity: 0, scale: 0.94 },
        { y: 0, opacity: 1, scale: 1, duration: 0.80, ease: 'power3.out', stagger: 0.09,
          scrollTrigger: { trigger: '.fw-grid', start: 'top 78%', once: true } }
      )
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={rootRef}
      id="worlds"
      className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050208 0%, #07030a 30%, #0d0612 65%, #050208 100%)' }}
    >
      {/* Atmospheric glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div style={{
          position: 'absolute', top: '6%', left: '12%',
          width: 700, height: 460, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(180,20,20,0.09) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '8%', right: '6%',
          width: 540, height: 400, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(90,40,200,0.06) 0%, transparent 70%)',
          filter: 'blur(64px)',
        }} />
        <div style={{
          position: 'absolute', top: '40%', right: '30%',
          width: 300, height: 300, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(255,140,20,0.04) 0%, transparent 70%)',
          filter: 'blur(48px)',
        }} />
        {/* Top separator line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 1,
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)',
        }} />
      </div>

      <div className="max-w-[1320px] mx-auto relative">

        {/* Header */}
        <div className="fw-header mb-10 md:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <div className="fw-eyebrow numbered mb-5 flex items-center gap-3"
                style={{ color: 'oklch(74% 0.24 18)', letterSpacing: '0.24em', fontSize: 10 }}>
                <div style={{
                  width: 28, height: 1,
                  background: 'linear-gradient(90deg, oklch(74% 0.24 18), transparent)',
                }} />
                ◈ FEATURED WORLDS
              </div>
              <h2
                className="fw-title"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(38px, 5.2vw, 78px)',
                  fontWeight: 700, lineHeight: 0.90,
                  letterSpacing: '-0.025em',
                  color: 'var(--color-ink)',
                }}
              >
                Step Into the{' '}
                <em style={{
                  fontStyle: 'italic',
                  background: 'linear-gradient(135deg, oklch(74% 0.24 18) 0%, oklch(82% 0.20 26) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 40px rgba(255,80,40,0.45))',
                }}>
                  Arc.
                </em>
              </h2>
              <p
                className="fw-sub mt-4"
                style={{
                  fontFamily: 'var(--font-sans)', fontSize: 14,
                  color: 'rgba(245,240,230,0.45)', maxWidth: 440, lineHeight: 1.85,
                }}
              >
                Meticulously crafted universes where every arc unfolds epic battles
                and timeless journeys across thousands of episodes.
              </p>
            </div>

            <button
              onClick={openModal}
              className="fw-explore cta-primary px-6 py-3 sm:px-7 sm:py-3.5 rounded-full text-sm font-medium shrink-0 self-start sm:self-auto"
              style={{ fontFamily: 'var(--font-sans)', letterSpacing: '0.04em' }}
            >
              Explore All Worlds
            </button>
          </div>
        </div>

        {/* Category tabs */}
        <div className="fw-cats mb-10 md:mb-12">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(i)}
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: 10,
                  letterSpacing: '0.17em', textTransform: 'uppercase',
                  padding: '6px 18px', borderRadius: 9999,
                  border: '1px solid',
                  borderColor: activeCategory === i ? 'rgba(255,70,60,0.55)' : 'rgba(255,255,255,0.07)',
                  background: activeCategory === i
                    ? 'linear-gradient(135deg, rgba(200,30,30,0.22) 0%, rgba(180,20,20,0.12) 100%)'
                    : 'rgba(255,255,255,0.025)',
                  color: activeCategory === i ? 'rgba(255,215,205,0.97)' : 'rgba(245,240,230,0.38)',
                  transition: 'all 240ms ease',
                  boxShadow: activeCategory === i
                    ? '0 0 28px rgba(255,60,40,0.18), inset 0 1px 0 rgba(255,255,255,0.06)'
                    : 'none',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                {cat}
              </button>
            ))}
            <div className="hidden sm:flex flex-1 items-center gap-3 ml-2" style={{ minWidth: 32 }}>
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(255,255,255,0.06), transparent)' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8.5, letterSpacing: '0.18em', color: 'rgba(245,240,230,0.18)', whiteSpace: 'nowrap' }}>
                {WORLDS.length} UNIVERSES
              </span>
            </div>
          </div>
        </div>

        {/* ── Grid ── */}
        <div className="fw-grid grid grid-cols-1 lg:grid-cols-[1fr_1fr] xl:grid-cols-[1.15fr_1fr] gap-5 lg:items-stretch">

          {/* ── Featured card ── */}
          <article
            className="fw-featured world-card"
            style={{ minHeight: 'clamp(400px, 52vw, 580px)' }}
          >
            {/* Card frame — overflow hidden so character stays inside */}
            <div
              className="absolute inset-0 rounded-[24px] overflow-hidden"
              style={{
                background: `linear-gradient(155deg, #0e0814 0%, #180a18 50%, ${featured.accent.replace(/[\d.]+\)$/, '0.10)')} 100%)`,
                border: '1px solid rgba(255,255,255,0.07)',
                boxShadow: '0 32px 80px rgba(0,0,0,0.65)',
              }}
            >
              {/* Bottom glow pool */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%',
                background: `radial-gradient(ellipse 85% 65% at 50% 100%, ${featured.accent} 0%, transparent 68%)`,
                zIndex: 1,
              }} />

              {/* Character — inside overflow:hidden, fully contained */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                height: '92%',
                width: '88%',
                zIndex: 3,
                pointerEvents: 'none',
              }}>
                <img
                  src={featured.image}
                  alt={featured.title}
                  style={{
                    position: 'absolute', bottom: 0, left: '50%',
                    transform: 'translateX(-50%)',
                    height: '100%', width: 'auto', maxWidth: 'none',
                    mixBlendMode: 'screen',
                    filter: featured.imgFilter,
                    objectFit: 'contain',
                  }}
                />
                {/* Foot aura */}
                <div style={{
                  position: 'absolute', bottom: 0, left: '50%',
                  transform: 'translateX(-50%)',
                  width: 220, height: 80,
                  background: `radial-gradient(ellipse, ${featured.accentHi.replace(/[\d.]+\)$/, '0.55)')} 0%, transparent 70%)`,
                  filter: 'blur(20px)',
                }} />
              </div>

              {/* Veil on top of character */}
              <div style={{
                position: 'absolute', inset: 0, zIndex: 4,
                background: 'linear-gradient(to top, rgba(3,1,6,0.98) 0%, rgba(3,1,6,0.68) 32%, rgba(3,1,6,0.08) 58%, transparent 100%)',
              }} />
              {/* Top hairline */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 1, zIndex: 5,
                background: `linear-gradient(90deg, transparent, ${featured.accentHi}, transparent)`,
                opacity: 0.60,
              }} />
              {/* Right rim */}
              <div style={{
                position: 'absolute', top: 0, bottom: 0, right: 0, width: 1, zIndex: 5,
                background: `linear-gradient(180deg, transparent 0%, ${featured.accentHi.replace(/[\d.]+\)$/, '0.22)')} 40%, transparent 100%)`,
              }} />
              {/* Corner glow TL */}
              <div style={{
                position: 'absolute', top: 0, left: 0, width: 180, height: 180, zIndex: 2,
                background: `radial-gradient(ellipse at top left, rgba(255,255,255,0.025) 0%, transparent 70%)`,
              }} />
            </div>

            {/* Text content */}
            <div className="relative h-full flex flex-col justify-end p-6 md:p-8" style={{ zIndex: 6 }}>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 8.5,
                letterSpacing: '0.24em', textTransform: 'uppercase',
                color: 'rgba(245,240,230,0.30)', marginBottom: 14,
              }}>
                {featured.episode}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 9,
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  padding: '4px 12px', borderRadius: 9999,
                  background: 'rgba(200,28,28,0.22)',
                  border: `1px solid ${featured.accentHi.replace(/[\d.]+\)$/, '0.40)')}`,
                  color: featured.accentSolid,
                }}>
                  {featured.genre}
                </span>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 4,
                  background: 'rgba(0,0,0,0.58)', backdropFilter: 'blur(10px)',
                  padding: '4px 10px', borderRadius: 9,
                  border: '1px solid rgba(255,255,255,0.08)',
                }}>
                  <span style={{ color: '#f5c842', display: 'flex' }}><StarIcon /></span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: '#fff', fontWeight: 700 }}>
                    {featured.rating}
                  </span>
                </div>
              </div>

              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(32px, 4.5vw, 60px)',
                fontWeight: 700, lineHeight: 0.92,
                letterSpacing: '-0.02em', color: '#fff',
                marginBottom: 14,
                textShadow: `0 0 60px ${featured.accent}`,
              }}>
                {featured.title}
              </h3>

              <p style={{
                fontFamily: 'var(--font-sans)', fontSize: 13.5,
                color: 'rgba(245,240,230,0.48)', lineHeight: 1.80,
                marginBottom: 24, maxWidth: 340,
              }}>
                {featured.description}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <button
                  onClick={openModal}
                  className="cta-primary inline-flex items-center gap-2.5 px-6 py-3 sm:px-7 sm:py-3.5 rounded-full"
                  style={{ fontFamily: 'var(--font-sans)', fontSize: 13, letterSpacing: '0.04em' }}
                >
                  <PlayIcon />
                  Play Now
                </button>
                {/* Rank badge */}
                <div style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
                  background: 'linear-gradient(135deg, rgba(220,40,40,0.22), rgba(180,20,20,0.14))',
                  border: `1px solid ${featured.accentHi.replace(/[\d.]+\)$/, '0.45)')}`,
                  boxShadow: `0 0 18px ${featured.accent.replace(/[\d.]+\)$/, '0.30)')}`,
                }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 7, letterSpacing: '0.12em', color: featured.accentSolid, lineHeight: 1 }}>RANK</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontStyle: 'italic', color: '#fff', lineHeight: 1.1 }}>#1</span>
                </div>
              </div>
            </div>
          </article>

          {/* ── 2×2 small cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:grid-rows-2 lg:h-full">
            {smallWorlds.map(world => (
              <SmallCard key={world.id} world={world} onOpen={openModal} />
            ))}
          </div>

        </div>

        {/* Bottom strip */}
        <div className="mt-6 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-6 sm:gap-8 flex-wrap">
            {[
              { label: 'Active Worlds',  val: '5',      color: 'oklch(68% 0.28 22)',  glow: 'rgba(220,40,40,0.50)'  },
              { label: 'Total Episodes', val: '2,400+', color: 'oklch(84% 0.20 60)',  glow: 'rgba(240,160,40,0.45)' },
              { label: 'Avg Rating',     val: '4.7',    color: 'oklch(82% 0.20 175)', glow: 'rgba(60,210,160,0.42)' },
            ].map(({ label, val, color, glow }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 22, fontWeight: 700, fontStyle: 'italic',
                  color,
                  textShadow: `0 0 22px ${glow}`,
                  lineHeight: 1,
                }}>
                  {val}
                </span>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 9,
                  letterSpacing: '0.16em', color: 'rgba(245,240,230,0.65)',
                  textTransform: 'uppercase',
                }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
          <button onClick={openModal} style={{
            fontFamily: 'var(--font-mono)', fontSize: 9.5,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'rgba(245,240,230,0.35)',
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 8,
            transition: 'color 220ms ease',
          }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(245,240,230,0.75)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,240,230,0.35)'}
          >
            View All →
          </button>
        </div>

      </div>
    </section>
  )
}
