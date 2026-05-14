'use client'

import { gsap } from '@/lib/gsap'

/**
 * Full hero entrance + idle timeline.
 * Returns the GSAP context so the caller can call ctx.revert() on unmount.
 */
export function runHeroAnimations(stage) {
  const ctx = gsap.context(() => {

    /* ── Floor entrance ─────────────────────────────────── */
    gsap.fromTo(
      '.floor-plate',
      { opacity: 0, scaleY: 0.5 },
      { opacity: 0.9, scaleY: 1, duration: 1.8, ease: 'power3.out', delay: 0.1 }
    )

    /* ── Character entrances ─────────────────────────────── */
    gsap.fromTo(
      '.char-layer',
      { opacity: 0, y: 80, scale: 0.94, filter: 'blur(22px)' },
      {
        opacity: (i, el) => Number(el.dataset.opacity || 1),
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.8,
        ease: 'power3.out',
        stagger: 0.18,
        delay: 0.4,
      }
    )

    /* ── Idle float per character ────────────────────────── */
    gsap.utils.toArray('.char-layer').forEach((el, i) => {
      const amp = 7 + (i % 3) * 4
      gsap.to(el, {
        y: `+=${amp}`,
        duration: 3.6 + i * 0.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: i * 0.2,
      })
    })

    /* ── Rune ring slow rotation ─────────────────────────── */
    gsap.to('.rune-ring', { rotate: 360, duration: 100, ease: 'none', repeat: -1 })

    /* ── Spotlight breath ───────────────────────────────── */
    gsap.to('.hero-spot', {
      opacity: 0.65,
      scale: 1.06,
      duration: 4.4,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })

    /* ── Content staggered reveal ───────────────────────── */
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.5 })
    tl.from('.hc-eyebrow',           { y: 14, opacity: 0, duration: 0.8 })
      .from('.hc-title [data-split]', {
        y: 130, opacity: 0, rotateX: -55,
        filter: 'blur(18px)', stagger: 0.022, duration: 1.1, ease: 'power4.out',
      }, '-=0.4')
      .from('.hc-sub',  { y: 18, opacity: 0, duration: 0.9 }, '-=0.6')
      .from('.hc-cta',  { y: 16, opacity: 0, stagger: 0.08, duration: 0.7 }, '-=0.55')
      .from('.hc-labels > *', { y: 14, opacity: 0, stagger: 0.06, duration: 0.6 }, '-=0.5')
      .to('.hc-scroll-cue',  { opacity: 1, duration: 0.6 }, '-=0.2')

    /* ── Accent word glow pulse ──────────────────────────── */
    gsap.to('.accent-word', {
      textShadow: '0 0 80px rgba(255,120,100,0.75), 0 0 24px rgba(255,180,160,0.5)',
      duration: 2.4,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })

  }, stage)

  return ctx
}
