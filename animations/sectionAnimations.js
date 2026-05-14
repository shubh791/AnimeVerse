'use client'

import { gsap, ScrollTrigger } from '@/lib/gsap'

/* ── Featured Worlds scroll reveal ─────────────────────────── */
export function runWorldsAnimation(ref) {
  const ctx = gsap.context(() => {
    gsap.from('.fw-head [data-split]', {
      y: 80, opacity: 0, rotateX: -40, filter: 'blur(12px)',
      stagger: 0.02, duration: 1.0, ease: 'power4.out',
      scrollTrigger: { trigger: ref.current, start: 'top 80%' },
    })
    gsap.from('.fw-card', {
      y: 60, opacity: 0, filter: 'blur(14px)',
      duration: 1.0, ease: 'power3.out', stagger: 0.12,
      scrollTrigger: { trigger: ref.current, start: 'top 70%' },
    })
  }, ref)
  return ctx
}

/* ── Now Streaming scroll reveal ───────────────────────────── */
export function runStreamingAnimation(ref) {
  const ctx = gsap.context(() => {
    gsap.from('.ns-head', {
      y: 30, opacity: 0, duration: 1.0,
      scrollTrigger: { trigger: ref.current, start: 'top 80%' },
    })
    gsap.from('.ep-tile', {
      y: 50, opacity: 0, stagger: 0.08, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 70%' },
    })
  }, ref)
  return ctx
}

/* ── Join CTA band + pricing ────────────────────────────────── */
export function runJoinBandAnimation(ref) {
  const ctx = gsap.context(() => {
    gsap.from('.jb-content', {
      y: 36, opacity: 0, duration: 1.0, ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 78%' },
    })
    gsap.from('.plan-card', {
      y: 50, opacity: 0, stagger: 0.13, duration: 1.0, ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 68%' },
    })
    gsap.from('.jb-stats > *', {
      y: 20, opacity: 0, stagger: 0.07, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 55%' },
    })
    gsap.to('.jb-bg-spot', {
      opacity: 0.9, scale: 1.06, duration: 5, ease: 'sine.inOut', repeat: -1, yoyo: true,
    })
  }, ref)
  return ctx
}
