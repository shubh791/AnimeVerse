'use client'

import { useRef, useLayoutEffect, useState } from 'react'
import { gsap } from '@/lib/gsap'
import LogoMark from '@/components/ui/LogoMark'
import {
  HomeIco, SeriesIco, FilmIco, WorldsIco, StudioIco,
  LiveIco, SearchIco, UserIco, SettingsIco,
} from '@/components/shared/Icons'
import { NAV_ITEMS } from '@/data/navigation'

const ICON_MAP = { home: HomeIco, series: SeriesIco, films: FilmIco, worlds: WorldsIco, studios: StudioIco, live: LiveIco }

export default function Sidebar() {
  const ref = useRef(null)
  const [active, setActive] = useState('home')

  useLayoutEffect(() => {
    /* Slide-in entrance */
    gsap.fromTo(
      ref.current,
      { x: -40, opacity: 0, filter: 'blur(10px)' },
      { x: 0, opacity: 1, filter: 'blur(0px)', duration: 1.1, ease: 'power3.out', delay: 0.1 }
    )
    /* Ambient glow breath */
    gsap.to('.side-glow', {
      opacity: 0.7, duration: 3.4, ease: 'sine.inOut', repeat: -1, yoyo: true,
    })
  }, [])

  return (
    <aside
      ref={ref}
      className="fixed top-5 bottom-5 left-5 z-[100] w-[244px] hidden lg:flex flex-col"
    >
      {/* Ambient halo */}
      <div
        aria-hidden
        className="side-glow absolute -inset-x-6 -inset-y-3 pointer-events-none -z-10 opacity-60"
        style={{
          background:
            'radial-gradient(ellipse 60% 30% at 50% 15%, rgba(255,90,80,0.18), transparent 70%),' +
            'radial-gradient(ellipse 60% 30% at 50% 85%, rgba(255,90,80,0.14), transparent 70%)',
          filter: 'blur(28px)',
        }}
      />

      <div className="glass-strong rounded-[22px] flex-1 flex flex-col p-4">

        {/* Brand */}
        <a href="#" className="group flex items-center gap-3 px-2 py-2">
          <span className="relative inline-flex">
            <LogoMark className="w-9 h-9 transition-transform duration-500 group-hover:rotate-[24deg]" />
            <span aria-hidden className="absolute inset-0 blur-md opacity-60 group-hover:opacity-90 transition-opacity">
              <LogoMark className="w-9 h-9" />
            </span>
          </span>
          <div className="flex flex-col leading-tight">
            <span className="font-display text-[22px] tracking-tight">
              <span className="text-white">Anime</span>
              <span className="italic" style={{ color: 'oklch(82% 0.16 22)' }}>Verse</span>
            </span>
            <span className="numbered text-[10px] text-white/40">CINEMATIC · STREAMING</span>
          </div>
        </a>

        <div className="my-4 h-px hairline opacity-70" />

        {/* Primary nav */}
        <div className="mb-2 px-3 numbered text-white/35">MENU · 01</div>
        <nav className="flex flex-col gap-1 px-1">
          {NAV_ITEMS.map((item) => {
            const Icon = ICON_MAP[item.id]
            return (
              <a
                key={item.id}
                href="#"
                onClick={(e) => { e.preventDefault(); setActive(item.id) }}
                className={`side-link ${active === item.id ? 'is-active' : ''}`}
              >
                <span className="ico">{Icon && <Icon />}</span>
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-auto flex items-center gap-1.5">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: 'oklch(72% 0.24 18)', boxShadow: '0 0 10px oklch(72% 0.24 18)' }}
                    />
                    <span className="numbered text-[9px] text-white/55">{item.badge}</span>
                  </span>
                )}
              </a>
            )
          })}
        </nav>

        <div className="my-4 h-px hairline opacity-70" />

        {/* Library */}
        <div className="mb-2 px-3 numbered text-white/35">LIBRARY · 02</div>
        <nav className="flex flex-col gap-1 px-1">
          <a href="#" className="side-link">
            <span className="ico"><SearchIco /></span>
            <span>Search</span>
            <span className="ml-auto numbered text-[9px] text-white/40">⌘K</span>
          </a>
          <a href="#" className="side-link">
            <span className="ico"><UserIco /></span>
            <span>My List</span>
          </a>
        </nav>

        <div className="flex-1" />

        {/* Now Playing card */}
        <div className="mt-2 rounded-2xl border border-white/10 bg-white/[0.02] p-3">
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: 'oklch(72% 0.24 18)', boxShadow: '0 0 10px oklch(72% 0.24 18)' }}
            />
            <span className="numbered text-[9px] text-white/65">PREMIERE TONIGHT</span>
          </div>
          <div className="font-display text-[17px] leading-tight text-white/95">
            Vermilion Dawn — Ep. 07
          </div>
          <div className="text-[11px] text-white/45 mt-1 font-sans">
            21:00 JST · 4,128 watching
          </div>
          <div className="mt-3 flex gap-2">
            <a
              href="#"
              className="flex-1 text-center text-[11px] py-2 rounded-md bg-white/[0.06] border border-white/10 hover:bg-white/[0.1] transition"
            >
              Set Reminder
            </a>
          </div>
        </div>

        {/* Footer row */}
        <div className="mt-3 flex items-center justify-between px-2">
          <a href="#" className="text-[11.5px] text-white/55 hover:text-white transition">Sign in</a>
          <a href="#" className="text-white/55 hover:text-white transition" aria-label="Settings">
            <SettingsIco />
          </a>
        </div>

      </div>
    </aside>
  )
}
