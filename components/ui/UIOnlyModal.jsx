'use client'

import { useEffect } from 'react'
import { useModal } from '@/contexts/ModalContext'

function GithubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

export default function UIOnlyModal() {
  const { open, closeModal } = useModal()

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') closeModal() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [closeModal])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: 'rgba(2,0,8,0.85)', backdropFilter: 'blur(18px)' }}
      onClick={closeModal}
    >
      {/* Panel */}
      <div
        className="relative w-full max-w-[480px] rounded-[28px] overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #110608 0%, #0a0305 50%, #160a08 100%)',
          border: '1px solid rgba(255,100,70,0.22)',
          boxShadow: '0 40px 90px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,80,50,0.08)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent line */}
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,90,60,0.60) 40%, rgba(255,90,60,0.60) 60%, transparent)' }} />

        {/* Atmospheric glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 80% 55% at 50% 0%, rgba(255,50,30,0.12), transparent 65%)',
        }} />

        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 z-10 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.55)' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#fff' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.55)' }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M1 1l10 10M11 1L1 11"/>
          </svg>
        </button>

        {/* Character image */}
        <div className="relative h-[220px] overflow-hidden" style={{ background: 'linear-gradient(180deg, #0e0406 0%, #150608 100%)' }}>
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 90% 80% at 50% 100%, rgba(255,40,20,0.28), transparent 70%)' }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/goku1.png"
            alt="Character"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none select-none"
            style={{
              height: '105%',
              width: 'auto',
              maxWidth: 'none',
              mixBlendMode: 'screen',
              filter: 'contrast(1.20) saturate(1.18) brightness(1.10)',
            }}
          />
        </div>

        {/* Content */}
        <div className="px-8 pb-8 pt-6 relative z-10">

          {/* Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span
              className="numbered text-[9px] tracking-[0.22em] px-3 py-1 rounded-full"
              style={{ background: 'rgba(255,60,40,0.14)', border: '1px solid rgba(255,80,50,0.28)', color: 'oklch(72% 0.24 18)' }}
            >
              UI ONLY
            </span>
          </div>

          {/* Message */}
          <h3 className="font-display italic text-[26px] leading-tight text-white mb-3">
            This is a UI-only interaction.
          </h3>
          <p className="text-[13.5px] text-white/50 leading-[1.75] mb-6">
            This feature isn&apos;t wired to a backend yet. AnimeVerse is a portfolio-grade UI showcase.
            Want the full experience built? Let&apos;s connect.
          </p>

          {/* Divider */}
          <div className="mb-6 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />

          {/* Developer info */}
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
              style={{ background: 'linear-gradient(135deg, rgba(220,40,40,0.30), rgba(180,20,20,0.20))', border: '1px solid rgba(255,80,50,0.30)' }}
            >
              <span className="font-display italic text-[16px]" style={{ color: 'oklch(78% 0.22 22)' }}>S</span>
            </div>
            <div>
              <div className="text-[14px] text-white font-medium">Shubham Panghal</div>
              <div className="numbered text-white/40 text-[9px] tracking-[0.14em]">FRONTEND DEVELOPER · UI ENGINEER</div>
            </div>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/shubham-panghal/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2.5 py-3 rounded-2xl text-[13px] font-medium transition-all duration-200"
              style={{
                background: 'rgba(10,102,194,0.14)',
                border: '1px solid rgba(10,102,194,0.35)',
                color: 'rgb(100,160,240)',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(10,102,194,0.24)'; e.currentTarget.style.borderColor = 'rgba(10,102,194,0.55)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(10,102,194,0.14)'; e.currentTarget.style.borderColor = 'rgba(10,102,194,0.35)' }}
            >
              <LinkedinIcon /> LinkedIn
            </a>
            <a
              href="https://github.com/shubh791"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2.5 py-3 rounded-2xl text-[13px] font-medium transition-all duration-200"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'rgba(255,255,255,0.75)',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.10)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)' }}
            >
              <GithubIcon /> GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
