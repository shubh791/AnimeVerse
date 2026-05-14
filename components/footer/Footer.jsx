'use client'

import LogoMark from '@/components/ui/LogoMark'
import { FOOTER_COLS } from '@/data/navigation'
import { useModal } from '@/contexts/ModalContext'

/* ── Apple App Store icon ── */
function AppleIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  )
}

/* ── Google Play Store icon ── */
function PlayStoreIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.18 23.76c.3.17.64.24.99.2l13.12-7.59-2.75-2.76-11.36 10.15zM.56 1.28C.21 1.64 0 2.18 0 2.89v18.22c0 .71.21 1.25.57 1.61l.08.08L10.26 13V12.76L.64 1.2l-.08.08zM21.06 10.55l-2.54-1.47-3.01 3.01 3.01 3.01 2.55-1.47c.73-.42.73-1.66-.01-2.08zM4.17.24L17.29 7.83l-2.75 2.75L3.18.43A1.24 1.24 0 014.17.24z"/>
    </svg>
  )
}

export default function Footer() {
  const { openModal } = useModal()
  return (
    <footer className="relative px-4 sm:px-8 lg:px-16 pb-8 pt-12 lg:pt-16">
      <div
        className="max-w-[1400px] mx-auto rounded-[20px] lg:rounded-[26px] border border-white/[0.06] overflow-hidden"
        style={{ background: '#070406' }}
      >
        {/* ── Main grid ── */}
        <div className="p-6 sm:p-10 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">

          {/* ── Brand block ── */}
          <div className="lg:col-span-4 flex flex-col gap-5">

            {/* Logo */}
            <a href="#" className="flex items-center gap-3">
              <LogoMark className="w-9 h-9 lg:w-10 lg:h-10" />
              <span className="font-display text-[24px] lg:text-[28px] leading-none">
                <span className="text-white">Anime</span>
                <span className="italic" style={{ color: 'oklch(82% 0.16 22)' }}>Verse</span>
              </span>
            </a>

            {/* Tagline */}
            <p className="text-[13px] lg:text-[13.5px] text-white/55 max-w-[340px] leading-[1.7]">
              A cinematic home for the new wave of animation —
              built in Tokyo, streaming worldwide.
            </p>

            {/* ── App download buttons with icons ── */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">

              {/* iOS / App Store */}
              <button
                onClick={openModal}
                className="cta-ghost inline-flex items-center gap-2 text-[12px] px-4 py-2.5 rounded-full"
              >
                <AppleIcon />
                Download iOS
              </button>

              {/* Android / Play Store */}
              <button
                onClick={openModal}
                className="cta-ghost inline-flex items-center gap-2 text-[12px] px-4 py-2.5 rounded-full"
              >
                <PlayStoreIcon />
                Download Android
              </button>
            </div>

            {/* Est. line */}
            <div className="mt-2 numbered text-white/40 text-[10px] lg:text-[11px]">
              EST · 2026 · TOKYO · TYO 100-0001
            </div>
          </div>

          {/* ── Link columns ── */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6 lg:gap-8">
            {FOOTER_COLS.map((col) => (
              <div key={col.title}>
                <div className="numbered text-white/40 mb-3 lg:mb-4 text-[10px] lg:text-[11px]">
                  {col.title.toUpperCase()}
                </div>
                <ul className="flex flex-col gap-2 lg:gap-2.5">
                  {col.items.map((item) => (
                    <li key={item}>
                      <button
                        onClick={openModal}
                        className="text-[13px] lg:text-[13.5px] text-white/70 hover:text-white transition-colors text-left"
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-white/[0.06] px-6 sm:px-10 lg:px-14 py-4 lg:py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 lg:gap-0">
          <div className="numbered text-white/45 text-[10px] lg:text-[11px]">
            © 2026 ANIMEVERSE — ALL WORLDS RESERVED
          </div>
          <div className="flex items-center gap-4 lg:gap-5 text-[11px] lg:text-[12px] text-white/55 flex-wrap">
            {['Terms', 'Privacy', 'Cookies', 'Press Kit'].map((l) => (
              <button key={l} onClick={openModal} className="hover:text-white transition">{l}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
