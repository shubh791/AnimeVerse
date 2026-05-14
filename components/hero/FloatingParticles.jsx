'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export default function FloatingParticles({ count = 48 }) {
  const ref = useRef(null)

  useEffect(() => {
    const host = ref.current
    if (!host) return

    const nodes = Array.from(host.querySelectorAll('.particle'))

    nodes.forEach((n) => {
      const dx  = gsap.utils.random(-40, 40)
      const dy  = gsap.utils.random(-140, -50)
      const dur = gsap.utils.random(7, 16)

      gsap.set(n, {
        x:       gsap.utils.random(0, host.clientWidth),
        y:       gsap.utils.random(0, host.clientHeight),
        opacity: gsap.utils.random(0.2, 0.85),
        scale:   gsap.utils.random(0.5, 1.7),
      })

      gsap.to(n, {
        x: `+=${dx}`,
        y: `+=${dy}`,
        opacity: 0,
        duration: dur,
        repeat: -1,
        ease: 'sine.inOut',
        repeatRefresh: true,
        delay: gsap.utils.random(0, dur),
      })
    })

    return () => gsap.utils.toArray('.particle', host).forEach((n) => gsap.killTweensOf(n))
  }, [])

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="particle" />
      ))}
    </div>
  )
}
