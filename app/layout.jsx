import { Cormorant_Garamond, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import LenisProvider from '@/components/shared/LenisProvider'
import { ModalProvider } from '@/contexts/ModalContext'
import UIOnlyModal from '@/components/ui/UIOnlyModal'

/* ── Google Fonts via next/font — zero layout shift, self-hosted ── */
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata = {
  title: 'AnimeVerse — Your Cinematic Universe for Anime',
  description:
    'AnimeVerse is a premium anime streaming platform featuring 4K Dolby Vision, JP + EN dual audio, 12,408+ episodes across 184 studios — built for true fans of dark fantasy, action, and supernatural anime.',
  keywords: [
    'anime streaming', 'AnimeVerse', '4K anime', 'dark fantasy anime',
    'action anime', 'supernatural anime', 'JP audio', 'EN dub', 'cinematic anime platform',
    'anime platform design', 'next.js anime', 'premium anime',
  ],
  authors: [{ name: 'Shubham Panghal', url: 'https://www.linkedin.com/in/shubham-panghal/' }],
  creator: 'Shubham Panghal',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'AnimeVerse — Your Cinematic Universe for Anime',
    description:
      'Premium anime streaming platform — 4K Dolby Vision, dual audio, 12,408+ episodes. Dark fantasy, action, and supernatural worlds built for true fans.',
    type: 'website',
    siteName: 'AnimeVerse',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AnimeVerse — Your Cinematic Universe for Anime',
    description: 'Premium anime streaming platform built with Next.js 14, GSAP, and Tailwind CSS v4.',
    creator: '@shubhampanghal',
  },
}

export default function RootLayout({ children }) {
  const fontClasses = [
    cormorant.variable,
    spaceGrotesk.variable,
    jetBrainsMono.variable,
  ].join(' ')

  return (
    <html lang="en" className={fontClasses}>
      <body className="bg-[#050507] text-[#f5f0e6] antialiased overflow-x-hidden">
        <ModalProvider>
          <LenisProvider>
            {children}
          </LenisProvider>
          <UIOnlyModal />
        </ModalProvider>
      </body>
    </html>
  )
}
