'use client'

import { useRef, useLayoutEffect, useState, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import LogoMark from '@/components/ui/LogoMark'
import { PlayIcon } from '@/components/shared/Icons'
import { NAV_ITEMS } from '@/data/navigation'

/* ── Section → nav-id map for scroll-spy ── */
const SECTION_MAP = {
  hero:      'home',
  worlds:    'worlds',
  streaming: 'streaming',
  toprated:  'toprated',
  join:      'plans',
}


function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Navbar() {
  const ref            = useRef(null)
  const [active,    setActive]    = useState('home')
  const [scrolled,  setScrolled]  = useState(false)
  const [openMenu,  setOpenMenu]  = useState(false)

  /* ── Entrance animation ── */
  useLayoutEffect(() => {
    gsap.fromTo(
      ref.current,
      { y: -28, opacity: 0, filter: 'blur(8px)' },
      { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.0, ease: 'power3.out', delay: 0.15 }
    )
  }, [])

  /* ── Scroll-glass effect ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── Scroll-spy ── */
  useEffect(() => {
    const observers = Object.keys(SECTION_MAP).map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(SECTION_MAP[id]) },
        { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
      )
      obs.observe(el)
      return obs
    }).filter(Boolean)
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const handleNavClick = (e, item) => {
    e.preventDefault()
    setActive(item.id)
    setOpenMenu(false)
    scrollTo(item.href.replace('#', ''))
  }

  return (
    <header
      ref={ref}
      className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500"
      style={scrolled ? {
        background: 'rgba(4,2,6,0.88)',
        backdropFilter: 'blur(22px) saturate(150%)',
        WebkitBackdropFilter: 'blur(22px) saturate(150%)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      } : {}}
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-6 px-5 sm:px-8 lg:px-14 py-[14px]">

        {/* ── Logo ── */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); scrollTo('hero') }}
          className="group flex items-center gap-2.5 shrink-0"
        >
          <span className="relative inline-flex">
            <LogoMark className="w-8 h-8 transition-transform duration-500 group-hover:rotate-[20deg]" />
            <span aria-hidden className="absolute inset-0 blur-md opacity-50 group-hover:opacity-80 transition-opacity">
              <LogoMark className="w-8 h-8" />
            </span>
          </span>
          <span className="font-display text-[20px] tracking-tight leading-none">
            <span className="text-white">Anime</span>
            <span className="italic" style={{ color: 'oklch(82% 0.16 22)' }}>Verse</span>
          </span>
        </a>

        {/* ── Desktop nav links ── */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.id
            return (
              <button
                key={item.id}
                onClick={(e) => handleNavClick(e, item)}
                className={`nav-link relative px-4 py-2 rounded-xl text-[13px] tracking-[0.01em] transition-all duration-200 cursor-pointer ${
                  isActive ? 'text-white' : 'text-white/55 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-6 rounded-full"
                    style={{ background: 'oklch(72% 0.24 18)', boxShadow: '0 0 12px oklch(72% 0.24 18)' }}
                  />
                )}
              </button>
            )
          })}
        </nav>

        {/* ── Right side: CTA + hamburger ── */}
        <div className="flex items-center gap-3 shrink-0">
          {/* CTA — hidden on very small screens */}
          <a
            href="#join"
            onClick={(e) => { e.preventDefault(); scrollTo('join') }}
            className="cta-primary hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-[12.5px] font-medium tracking-wide"
          >
            <PlayIcon className="w-3 h-3" />
            Start Watching
          </a>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] rounded-lg transition-colors hover:bg-white/[0.05]"
            onClick={(e) => { e.stopPropagation(); setOpenMenu(p => !p) }}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-px bg-white/80 transition-all duration-300 ${openMenu ? 'rotate-45 translate-y-[6px]' : ''}`}/>
            <span className={`block w-5 h-px bg-white/80 transition-all duration-300 ${openMenu ? 'opacity-0' : ''}`}/>
            <span className={`block w-5 h-px bg-white/80 transition-all duration-300 ${openMenu ? '-rotate-45 -translate-y-[6px]' : ''}`}/>
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {openMenu && (
        <div
          className="md:hidden border-t"
          style={{
            background: 'rgba(4,2,8,0.97)',
            backdropFilter: 'blur(24px)',
            borderColor: 'rgba(255,255,255,0.07)',
          }}
        >
          <nav className="flex flex-col py-2 px-4">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={(e) => handleNavClick(e, item)}
                className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-[14px] text-left transition-colors ${
                  active === item.id ? 'text-white bg-white/[0.05]' : 'text-white/60 hover:text-white hover:bg-white/[0.03]'
                }`}
              >
                <span>{item.label}</span>
                {active === item.id && (
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'oklch(72% 0.24 18)' }}/>
                )}
              </button>
            ))}

            {/* Mobile CTA */}
            <div className="px-4 pt-3 pb-4">
              <a
                href="#join"
                onClick={(e) => { e.preventDefault(); setOpenMenu(false); scrollTo('join') }}
                className="cta-primary w-full flex items-center justify-center gap-2 py-3 rounded-full text-[13px] font-medium tracking-wide"
              >
                <PlayIcon className="w-3.5 h-3.5" /> Start Watching
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
