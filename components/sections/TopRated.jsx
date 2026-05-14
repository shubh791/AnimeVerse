'use client'

import { useRef, useLayoutEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { PlayIcon } from '@/components/shared/Icons'
import { useModal } from '@/contexts/ModalContext'

/* ─── Data ─── */
const RANKED = [
  { rank: 1,  title: 'Crimson Requiem',  studio: 'Kurogane Studios', genre: 'Action',   subgenre: 'Fantasy',       score: 9.8, episodes: 48, tag: 'S3', hot: true,  accent: 'rgba(220,40,40,0.70)',   img: '/assets/whiteanime1.png' },
  { rank: 2,  title: 'Void Protocol',    studio: 'Mokuren',          genre: 'Sci-Fi',   subgenre: 'Thriller',      score: 9.5, episodes: 24, tag: 'S2', hot: true,  accent: 'rgba(80,140,255,0.70)'  },
  { rank: 3,  title: 'Sakura Recursion', studio: 'Hoshikage',        genre: 'Romance',  subgenre: 'Supernatural',  score: 9.4, episodes: 36, tag: 'S1',             accent: 'rgba(255,90,155,0.70)'  },
  { rank: 4,  title: 'Iron Meridian',    studio: 'Yorukumo',         genre: 'Mecha',    subgenre: 'Drama',         score: 9.2, episodes: 52, tag: 'S4',             accent: 'rgba(255,165,40,0.70)'  },
  { rank: 5,  title: 'Null Genesis',     studio: 'Kurogane',         genre: 'Fantasy',  subgenre: 'Mystery',       score: 9.1, episodes: 13, tag: 'S1', hot: true,  accent: 'rgba(100,220,180,0.70)' },
  { rank: 6,  title: 'Ashfall Protocol', studio: 'Mokuren',          genre: 'Action',   subgenre: 'Thriller',      score: 9.0, episodes: 26, tag: 'S2',             accent: 'rgba(180,100,255,0.70)' },
  { rank: 7,  title: 'Echo of Sorrow',   studio: 'Hoshikage',        genre: 'Drama',    subgenre: 'Supernatural',  score: 8.9, episodes: 12, tag: 'S1',             accent: 'rgba(255,200,60,0.70)'  },
  { rank: 8,  title: 'Heaven Protocol',  studio: 'Yorukumo',         genre: 'Sci-Fi',   subgenre: 'Mystery',       score: 8.8, episodes: 24, tag: 'S3',             accent: 'rgba(60,190,255,0.70)'  },
  { rank: 9,  title: 'Burning Epoch',    studio: 'Kurogane',         genre: 'Action',   subgenre: 'Historical',    score: 8.7, episodes: 38, tag: 'S2',             accent: 'rgba(255,130,40,0.70)'  },
  { rank: 10, title: 'Silent Requiem',   studio: 'Hoshikage',        genre: 'Drama',    subgenre: 'Slice of Life', score: 8.6, episodes: 12, tag: 'S1',             accent: 'rgba(140,220,130,0.70)' },
]

const SEASON_STATS = [
  { label: 'Titles Airing',    value: '47',   color: 'oklch(65% 0.26 22)',  glow: 'rgba(220,40,40,0.40)'   },
  { label: 'Avg Score',        value: '8.9',  color: 'oklch(82% 0.18 60)',  glow: 'rgba(240,160,40,0.35)'  },
  { label: 'Total Episodes',   value: '1,204',color: 'oklch(72% 0.22 280)', glow: 'rgba(80,140,255,0.35)'  },
  { label: 'Studios Active',   value: '31',   color: 'oklch(80% 0.18 175)', glow: 'rgba(60,210,160,0.32)'  },
  { label: 'Hours of Content', value: '482h', color: 'oklch(78% 0.20 340)', glow: 'rgba(255,80,160,0.32)'  },
]

/* ─── Score bar ─── */
function ScoreBar({ score }) {
  const pct = ((score - 8.4) / 1.6) * 100
  return (
    <div className="relative h-[3px] rounded-full w-16 overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
      <div
        className="absolute inset-y-0 left-0 rounded-full"
        style={{ width: `${Math.min(pct, 100)}%`, background: 'linear-gradient(90deg, oklch(64% 0.22 22), oklch(82% 0.16 22))' }}
      />
    </div>
  )
}

/* ─── Genre pill badge ─── */
function GenrePill({ label }) {
  return (
    <span
      className="numbered"
      style={{
        fontSize: 9, padding: '2px 7px', borderRadius: 999,
        border: '1px solid rgba(255,255,255,0.10)',
        background: 'rgba(255,255,255,0.04)',
        color: 'rgba(255,255,255,0.45)',
      }}
    >
      {label.toUpperCase()}
    </span>
  )
}

/* ─── Single ranked row ─── */
function RankRow({ item, onOpen }) {
  return (
    <div onClick={onOpen} className="tr-row group flex items-center gap-3 sm:gap-4 py-3 px-3 sm:px-4 rounded-xl border border-transparent hover:border-white/[0.06] hover:bg-white/[0.022] cursor-pointer">
      {/* Rank number */}
      <span
        className="font-display italic leading-none tabular-nums shrink-0 w-7 sm:w-9 text-right"
        style={{ fontSize: 'clamp(18px, 2vw, 28px)', color: item.rank <= 3 ? item.accent.replace(/[\d.]+\)$/, '0.75)') : 'rgba(255,255,255,0.28)' }}
      >
        {String(item.rank).padStart(2, '0')}
      </span>

      {/* Accent bar */}
      <div
        className="w-[3px] h-8 rounded-full shrink-0"
        style={{ background: item.accent, boxShadow: `0 0 8px ${item.accent}` }}
      />

      {/* Title + meta */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="font-display italic text-[14px] sm:text-[16px] leading-tight truncate"
            style={{
              background: `linear-gradient(90deg, #fff 0%, ${item.accent.replace(/[\d.]+\)$/, '1)')} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >{item.title}</span>
          {item.hot && (
            <span
              className="numbered shrink-0"
              style={{ fontSize: 8, padding: '1.5px 5px', borderRadius: 999, background: 'rgba(255,60,40,0.20)', border: '1px solid rgba(255,60,40,0.35)', color: 'oklch(72% 0.24 18)' }}
            >
              HOT
            </span>
          )}
        </div>
        {/* Studio + genres — hide on very small screens */}
        <div className="mt-1 hidden sm:flex items-center gap-2 flex-wrap">
          <span
            className="numbered shrink-0"
            style={{
              fontSize: 8.5, padding: '1.5px 6px', borderRadius: 6,
              background: item.accent.replace(/[\d.]+\)$/, '0.12)'),
              border: `1px solid ${item.accent.replace(/[\d.]+\)$/, '0.28)')}`,
              color: item.accent.replace(/[\d.]+\)$/, '1)'),
            }}
          >{item.studio.toUpperCase()}</span>
          <GenrePill label={item.genre} />
          <GenrePill label={item.subgenre} />
          <span className="numbered text-white/25" style={{ fontSize: 9 }}>{item.tag}</span>
        </div>
      </div>

      {/* Score + bar */}
      <div className="flex flex-col items-end gap-1.5 shrink-0">
        <span className="font-display text-[16px] sm:text-[19px] leading-none text-white/85">{item.score}</span>
        <ScoreBar score={item.score} />
      </div>

      {/* Episode count — xl only */}
      <div className="hidden xl:flex flex-col items-end shrink-0 w-10">
        <span className="numbered text-white/45" style={{ fontSize: 10.5 }}>{item.episodes}</span>
        <span className="numbered text-white/20" style={{ fontSize: 8 }}>EPS</span>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════
   TOP RATED SECTION
══════════════════════════════════════════════════ */
export default function TopRated() {
  const ref = useRef(null)
  const { openModal } = useModal()

  /* ── GSAP scroll-triggered entrance animations ── */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.tr-head', {
        y: 30, opacity: 0, duration: 1.0, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      })
      gsap.from('.tr-feature', {
        x: -44, opacity: 0, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 72%' },
      })
      gsap.from('.tr-row', {
        y: 18, opacity: 0, stagger: 0.05, duration: 0.75, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 65%' },
      })
      gsap.from('.tr-stat', {
        y: 16, opacity: 0, stagger: 0.06, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 40%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const featured = RANKED[0]

  return (
    <section
      id="toprated"
      ref={ref}
      className="relative py-16 sm:py-20 lg:py-28 px-4 sm:px-8 lg:px-16"
    >
      <div className="max-w-[1400px] mx-auto">

        {/* ── Section header ── */}
        <div className="tr-head mb-10 lg:mb-12">
          <div className="section-divider mb-7">
            <span className="numbered text-white/55">04 — TOP RATED</span>
            <span className="line" />
            <span className="numbered text-white/45">THIS SEASON</span>
          </div>

          {/* Title + description — stack on mobile, side by side on lg */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-10">
            <h2
              className="font-display tracking-[-0.02em] leading-[0.95]"
              style={{ fontSize: 'clamp(32px, 5.2vw, 80px)' }}
            >
              What the world is
              <span className="block italic" style={{ color: 'oklch(82% 0.16 22)' }}>obsessing over.</span>
            </h2>
            <p className="text-[13px] sm:text-[14px] text-white/50 max-w-[380px] leading-[1.7]">
              Ranked by community score, critic reviews and viewing momentum
              across 184 studios this season.
            </p>
          </div>
        </div>

        {/* ── Main grid: featured card + ranked list ──
            Mobile: single column stack
            lg: side-by-side (fixed 340px featured card + flex ranked list) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] xl:grid-cols-[380px_1fr] gap-5 lg:gap-6 items-start">

          {/* ── Featured #1 card ── */}
          <div
            className="tr-feature relative rounded-[20px] sm:rounded-[24px] overflow-hidden border border-white/[0.08]"
            style={{
              background: `radial-gradient(ellipse 80% 60% at 50% 80%, ${featured.accent}, transparent 65%), linear-gradient(180deg, #100508, #050304)`,
              /* Shorter on mobile, full on desktop */
              minHeight: 'clamp(340px, 48vw, 540px)',
            }}
          >
            {/* Character image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={featured.img}
              alt=""
              draggable={false}
              loading="lazy"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 select-none pointer-events-none"
              style={{
                height: '88%', width: 'auto', maxWidth: 'none',
                mixBlendMode: 'screen',
                filter: 'contrast(1.14) saturate(1.10) brightness(1.06)',
              }}
            />

            {/* Bottom scrim for text readability */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(180deg, transparent 28%, rgba(0,0,0,0.50) 70%, rgba(0,0,0,0.93) 100%)' }}
            />

            {/* Top badges row */}
            <div className="absolute top-4 sm:top-5 left-4 sm:left-5 right-4 sm:right-5 flex items-center justify-between z-10">
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(0,0,0,0.60)', backdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,0.09)' }}
              >
                <span className="numbered text-white/55">RANK</span>
                <span className="font-display italic text-[22px] sm:text-[24px] leading-none text-white">01</span>
              </div>
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(0,0,0,0.60)', backdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,0.09)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'oklch(72% 0.24 18)', boxShadow: '0 0 8px oklch(72% 0.24 18)' }} />
                <span className="numbered text-white/65 hidden sm:block" style={{ fontSize: 9 }}>HOT THIS WEEK</span>
              </div>
            </div>

            {/* Bottom info block */}
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-10">
              <div className="flex items-center gap-2 mb-2">
                <GenrePill label={featured.genre} />
                <GenrePill label={featured.subgenre} />
              </div>
              <h3 className="font-display italic text-[26px] sm:text-[32px] leading-tight text-white">{featured.title}</h3>
              <div className="mt-2 flex items-center gap-2 sm:gap-3 flex-wrap">
                <span className="numbered text-white/45 text-[9px]">{featured.studio.toUpperCase()}</span>
                <span className="w-px h-3 bg-white/20" />
                <span className="numbered text-white/35 text-[9px]">{featured.tag} · {featured.episodes} EPS</span>
                <span className="w-px h-3 bg-white/20" />
                <span className="font-display text-[16px] sm:text-[18px] text-white">{featured.score}</span>
              </div>
              <button
                onClick={openModal}
                className="mt-4 sm:mt-5 cta-primary inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-[12px] sm:text-[12.5px] font-medium tracking-wide"
              >
                <PlayIcon className="w-3 h-3" /> Watch Now
              </button>
            </div>
          </div>

          {/* ── Ranked list #1–10 ── */}
          <div
            className="flex flex-col gap-0.5 rounded-[16px] sm:rounded-[20px] border border-white/[0.05] py-3"
            style={{ background: 'rgba(255,255,255,0.012)' }}
          >
            {/* Column header */}
            <div
              className="flex items-center gap-3 sm:gap-4 px-3 sm:px-4 pb-3 mb-1 mx-1"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
            >
              <span className="numbered text-white/25 w-7 sm:w-9 text-right" style={{ fontSize: 9 }}>#</span>
              <div className="w-[3px] opacity-0 shrink-0" />
              <span className="numbered text-white/25 flex-1" style={{ fontSize: 9 }}>TITLE / STUDIO</span>
              <span className="numbered text-white/25 w-16 text-right" style={{ fontSize: 9 }}>SCORE</span>
              <span className="hidden xl:block numbered text-white/25 w-10 text-right" style={{ fontSize: 9 }}>EPS</span>
            </div>

            {/* Ranked rows */}
            {RANKED.map((item) => <RankRow key={item.rank} item={item} onOpen={openModal} />)}
          </div>
        </div>

        {/* ── Season stats strip — 2-col mobile, 5-col sm+ ── */}
        <div
          className="mt-6 sm:mt-8 rounded-[14px] sm:rounded-[18px] grid grid-cols-2 sm:grid-cols-5 gap-px overflow-hidden"
          style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.03)' }}
        >
          {SEASON_STATS.map(({ label, value, color, glow }) => (
            <div
              key={label}
              className="tr-stat flex flex-col items-center justify-center gap-1.5 py-4 sm:py-5"
              style={{ background: 'rgba(5,3,7,0.85)' }}
            >
              <span
                className="font-display text-[22px] sm:text-[28px] leading-none"
                style={{ color, textShadow: `0 0 22px ${glow}` }}
              >{value}</span>
              <span className="numbered text-white/35 text-center text-[8px] sm:text-[9px]">{label.toUpperCase()}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
