'use client'

import { useLenis } from '@/hooks/useLenis'

/* Initialises Lenis smooth scroll for the entire page tree */
export default function LenisProvider({ children }) {
  useLenis()
  return <>{children}</>
}
