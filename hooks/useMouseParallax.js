'use client'

import { useEffect } from 'react'
import { gsap } from '@/lib/gsap'

/**
 * Attaches pointer-move parallax to char layers inside `containerRef`.
 * Each `.char-layer[data-depth]` moves inversely proportional to its depth.
 */
export function useMouseParallax(containerRef) {
  useEffect(() => {
    const host = containerRef.current
    if (!host) return

    /* Build quickTo tween cache keyed by data-id */
    const cache = {}
    gsap.utils.toArray('.char-layer', host).forEach((el) => {
      cache[el.dataset.id] = {
        x: gsap.quickTo(el, 'x', { duration: 1.2, ease: 'power3.out' }),
        y: gsap.quickTo(el, 'y', { duration: 1.2, ease: 'power3.out' }),
      }
    })

    const spotX = gsap.quickTo('.hero-spot', 'x', { duration: 1.4, ease: 'power3.out' })
    const spotY = gsap.quickTo('.hero-spot', 'y', { duration: 1.4, ease: 'power3.out' })

    function onMove(e) {
      const r = host.getBoundingClientRect()
      const nx = (e.clientX - r.left) / r.width - 0.5
      const ny = (e.clientY - r.top) / r.height - 0.5

      gsap.utils.toArray('.char-layer', host).forEach((el) => {
        const d = Number(el.dataset.depth || 12)
        const q = cache[el.dataset.id]
        if (q) { q.x(-nx * d); q.y(-ny * d * 0.5) }
      })

      spotX(nx * 100)
      spotY(ny * 50)
    }

    host.addEventListener('pointermove', onMove)
    return () => host.removeEventListener('pointermove', onMove)
  }, [containerRef])
}
