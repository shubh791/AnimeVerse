'use client'

import { useRef, useLayoutEffect } from 'react'
import Chip from '@/components/ui/Chip'
import { PlayIcon, ArrowRight } from '@/components/shared/Icons'
import { runJoinBandAnimation } from '@/animations/sectionAnimations'
import { useModal } from '@/contexts/ModalContext'

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: '¥0',
    period: 'forever',
    tagline: 'Start your journey',
    badge: null,
    features: [
      '5 episodes per day',
      '1080p streaming',
      'Japanese audio only',
      'Ad-supported',
      'Limited catalog access',
    ],
    cta: 'Start Free',
    variant: 'ghost',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '¥980',
    period: '/month',
    tagline: 'For true fans',
    badge: 'MOST POPULAR',
    features: [
      'Unlimited streaming',
      '4K Dolby Vision',
      'JP + EN audio tracks',
      'Completely ad-free',
      'Download 25 episodes',
      'Early access releases',
      'Full catalog · 12,408+ eps',
    ],
    cta: 'Start 7-Day Free Trial',
    variant: 'featured',
  },
  {
    id: 'ultra',
    name: 'Ultra',
    price: '¥1,780',
    period: '/month',
    tagline: 'The complete verse',
    badge: null,
    features: [
      'Everything in Pro',
      '4 simultaneous screens',
      'Unlimited offline downloads',
      'Studio behind-the-scenes',
      'Private Discord access',
      'Priority 24/7 support',
      'Beta feature access',
    ],
    cta: 'Go Ultra',
    variant: 'default',
  },
]

const PROOF = [
  { stat: '2.4M+',  label: 'Active fans' },
  { stat: '184',    label: 'Studios' },
  { stat: '12,408', label: 'Episodes' },
  { stat: '4K·DV',  label: 'Master quality' },
]

function CheckIcon({ featured }) {
  return (
    <span
      className="w-[18px] h-[18px] rounded-full flex items-center justify-center shrink-0"
      style={{
        background: featured ? 'rgba(255,100,60,0.18)' : 'rgba(255,255,255,0.05)',
        border: `1px solid ${featured ? 'rgba(255,120,80,0.40)' : 'rgba(255,255,255,0.12)'}`,
      }}
    >
      <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
        <path d="M1.8 4.5L3.6 6.3L7.2 2.7" stroke={featured ? 'oklch(82% 0.16 22)' : 'rgba(255,255,255,0.45)'} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

function PlanCard({ plan, onOpen }) {
  const isFeatured = plan.variant === 'featured'

  return (
    <div
      className="plan-card relative flex flex-col rounded-[24px] overflow-hidden"
      style={{
        border: `1px solid ${isFeatured ? 'rgba(255,150,90,0.30)' : 'rgba(255,255,255,0.07)'}`,
        background: isFeatured
          ? 'linear-gradient(160deg, #1c0a0a 0%, #100505 50%, #1a0808 100%)'
          : 'linear-gradient(180deg, #0d0508, #060304)',
      }}
    >
      {isFeatured && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 90% 50% at 50% 0%, rgba(255,70,40,0.16), transparent 65%),' +
              'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(220,50,30,0.18), transparent 65%)',
          }}
        />
      )}

      {/* Badge row */}
      <div className="flex items-center justify-center h-9">
        {plan.badge && (
          <span
            className="px-3 py-1 rounded-full text-[10px] tracking-[0.2em] uppercase"
            style={{
              fontFamily: 'var(--font-mono)',
              background: 'linear-gradient(90deg, rgba(255,90,50,0.25), rgba(220,50,30,0.25))',
              border: '1px solid rgba(255,110,70,0.30)',
              color: 'oklch(82% 0.16 22)',
            }}
          >
            {plan.badge}
          </span>
        )}
      </div>

      <div className="px-7 pb-8 flex flex-col flex-1">
        {/* Name + tagline */}
        <div className="flex items-baseline gap-3 mb-5">
          <span className="font-display italic text-[28px] text-white">{plan.name}</span>
          <span className="numbered text-white/35">{plan.tagline.toUpperCase()}</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1.5 mb-6">
          <span className="font-display text-[54px] leading-none tracking-tight text-white">{plan.price}</span>
          <span className="numbered text-white/35">{plan.period.toUpperCase()}</span>
        </div>

        {/* Divider */}
        <div className="mb-6 h-px" style={{ background: isFeatured ? 'rgba(255,110,70,0.18)' : 'rgba(255,255,255,0.06)' }} />

        {/* Features */}
        <ul className="flex flex-col gap-3.5 flex-1 mb-8">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-3">
              <CheckIcon featured={isFeatured} />
              <span className="text-[13.5px] text-white/60 leading-snug">{f}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        {isFeatured ? (
          <button
            onClick={onOpen}
            className="cta-primary w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-[13.5px] font-medium tracking-wide"
          >
            <PlayIcon className="w-3.5 h-3.5" /> {plan.cta}
          </button>
        ) : (
          <button
            onClick={onOpen}
            className="cta-ghost w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-[13.5px] font-medium tracking-wide"
          >
            {plan.cta} <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════
   JOIN BAND SECTION — pricing plans
   Responsive: single col mobile → 3-col md+
══════════════════════════════════════════════════ */
export default function JoinBand() {
  const ref = useRef(null)
  const { openModal } = useModal()

  /* ── GSAP scroll animations from sectionAnimations.js ── */
  useLayoutEffect(() => {
    const ctx = runJoinBandAnimation(ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="join" ref={ref} className="relative py-16 sm:py-20 lg:py-28 px-4 sm:px-8 lg:px-16">
      <div
        className="relative max-w-[1400px] mx-auto rounded-[32px] overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #0a0507 0%, #160608 50%, #0a0507 100%)',
          border: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        {/* Atmospheric glow */}
        <div
          className="jb-bg-spot absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 10% 50%, rgba(255,40,50,0.16), transparent 65%),' +
              'radial-gradient(ellipse 55% 70% at 90% 100%, rgba(255,60,40,0.20), transparent 65%),' +
              'radial-gradient(ellipse 40% 35% at 50% 0%, rgba(180,30,60,0.12), transparent 70%)',
            opacity: 0.65,
          }}
        />

        {/* Top accent line */}
        <div
          className="absolute inset-x-0 top-0 h-px pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,90,70,0.45) 30%, rgba(255,90,70,0.45) 70%, transparent)' }}
        />

        {/* Character image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/samurai1.png"
          alt=""
          draggable={false}
          loading="lazy"
          className="absolute right-0 bottom-0 select-none pointer-events-none"
          style={{
            width: 'min(480px, 34%)',
            mixBlendMode: 'screen',
            filter: 'contrast(1.04) saturate(0.85) brightness(0.60)',
            opacity: 0.65,
          }}
        />
        <div
          className="absolute right-0 bottom-0 w-1/3 h-56 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 70% at 60% 100%, rgba(255,40,50,0.25), transparent 70%)' }}
        />

        {/* Content */}
        <div className="relative z-10 px-10 lg:px-16 pt-14 pb-12">

          {/* Header */}
          <div className="jb-content text-center mb-14">
            <Chip>JOIN THE VERSE</Chip>
            <h2
              className="mt-6 font-display tracking-[-0.02em] leading-[0.95] text-white"
              style={{ fontSize: 'clamp(38px, 4.8vw, 74px)' }}
            >
              Your seat in{' '}
              <span className="italic" style={{ color: 'oklch(82% 0.16 22)' }}>the multiverse</span>
              <span className="block">is waiting.</span>
            </h2>
            <p className="mt-5 text-[15px] leading-[1.75] text-white/50 max-w-[520px] mx-auto">
              Seven days free, then simple flat pricing — no tricks, no lock-in.
              Cancel any time and keep every world you&apos;ve bookmarked, forever.
            </p>
          </div>

          {/* Plan cards — 1 col mobile, 3 col md+ */}
          <div className="jb-plans grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {PLANS.map((plan) => <PlanCard key={plan.id} plan={plan} onOpen={openModal} />)}
          </div>

          {/* Social proof stats — 2 col mobile, 4 col sm+ */}
          <div className="jb-stats mt-10 sm:mt-12 pt-8 sm:pt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            {PROOF.map(({ stat, label }) => (
              <div key={label} className="flex flex-col items-center gap-1.5">
                <span className="font-display text-[34px] leading-none text-white">{stat}</span>
                <span className="numbered text-white/35">{label.toUpperCase()}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
