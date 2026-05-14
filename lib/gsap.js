'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/* Register plugins once at module level — safe in client bundle */
gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }
