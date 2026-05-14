# AnimeVerse — Your Cinematic Universe for Anime

> A premium anime streaming platform UI built with Next.js 14, GSAP, and Tailwind CSS v4. Cinematic dark aesthetics, scroll-driven animations, and a pixel-perfect design system — built to demonstrate what modern frontend engineering looks like at a product level.

---

## Overview

AnimeVerse is a fully responsive, production-grade frontend concept for a premium anime streaming service. Every section is handcrafted — from the immersive hero with parallax character art to animated pricing cards, ranked leaderboards, and scroll-triggered entrances throughout. This project is a showcase of advanced UI engineering: layout precision, motion design, and design-system thinking applied to a real product context.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS v4 with `@theme` design tokens |
| Animation | GSAP 3 + ScrollTrigger |
| Smooth Scroll | Lenis |
| Fonts | Cormorant Garamond · Space Grotesk · JetBrains Mono |
| Language | JavaScript (JSX) |
| Deployment | Vercel-ready |

---

## Features

- **Immersive Hero** — Two-column cinematic layout with character art, atmospheric glow, GSAP entrance animations, and a live-stream badge
- **Featured Worlds** — Filterable world cards with hover micro-interactions, character parallax, rank badges, and accent-colored glow pools
- **Now Streaming** — Auto-advancing full-bleed episode carousel with progress animation, thumbnail selector strip, and star rating display
- **Top Rated** — Ranked leaderboard with gradient title text, studio accent pills, colored season stats, and animated score bars
- **Pricing Plans** — Three-tier plan cards with featured gradient treatment, feature checklists, and 7-day trial CTA
- **Navbar** — Fixed glass-effect bar with scroll-spy active state, GSAP entrance, and animated mobile hamburger menu
- **Footer** — Brand block with app download buttons (iOS + Android), multi-column navigation, and bottom legal links
- **UI Modal** — Developer contact modal triggered by all non-functional CTAs — consistent interaction pattern across the entire UI
- **Scroll Animations** — Every section features GSAP ScrollTrigger entrance animations with staggered reveals
- **404 Page** — Cinematic not-found page with glitch animation on the 404 number, character art, and navigation CTAs back to the main experience
- **Loading Screen** — Branded loading state with spinning arc ring, animated progress bar, and wordmark — shown during page transitions

---

## Project Structure

```
nextjs-app/
├── app/
│   ├── layout.jsx           # Root layout, fonts, SEO metadata, providers
│   ├── page.jsx             # Page composition
│   ├── not-found.jsx        # Cinematic 404 page with glitch animation
│   ├── loading.jsx          # Branded loading screen with progress bar
│   ├── globals.css          # Tailwind v4 @theme tokens, global styles
│   └── icon.svg             # Custom SVG favicon
├── components/
│   ├── hero/                # Hero section
│   ├── navbar/              # Fixed navigation bar
│   ├── sections/            # FeaturedWorlds, NowStreaming, TopRated, JoinBand
│   ├── footer/              # Footer
│   ├── ui/                  # Chip, LogoMark, UIOnlyModal
│   └── shared/              # Icons, LenisProvider
├── contexts/
│   └── ModalContext.jsx     # Global modal state via React Context
├── animations/
│   └── sectionAnimations.js # GSAP ScrollTrigger animation definitions
├── data/
│   ├── episodes.js          # Episode data with scores and accents
│   ├── worlds.js            # World/series data
│   └── navigation.js        # Nav items + footer link columns
├── lib/
│   └── gsap.js              # GSAP + ScrollTrigger singleton registration
└── public/
    └── assets/              # Character PNG images (screen blend-mode art)
```

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/shubh791/animeverse.git
cd animeverse/nextjs-app

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Design Decisions

**`mix-blend-mode: screen`** on character PNG images dissolves black backgrounds seamlessly against dark section backgrounds — no manual masking required, fully composited in CSS.

**Tailwind CSS v4 `@theme` tokens** define a shared design system (`--font-display`, `--font-mono`, `--color-ink`) consumed consistently across all components — single source of truth for visual language.

**GSAP `context()` scoping** ensures all scroll animations clean up properly on component unmount — no memory leaks in the Next.js App Router lifecycle.

**React Context for modal state** — a single `ModalProvider` at root makes `openModal()` available to any component without prop drilling, keeping all non-functional CTAs consistent and connected across every section.

**`clamp()` for fluid typography** — font sizes scale smoothly between breakpoints with zero media query overhead, maintaining typographic hierarchy at every viewport.

---

## UI Notice

This is a **UI-only frontend showcase**. All interactive CTAs (Watch Now, Download App, plan subscriptions) open a developer contact modal — there is no backend, authentication, or payment integration. The project exists to demonstrate UI engineering quality, animation craft, and design-system thinking at a product level.

---

## Screenshots

> Hero · Featured Worlds · Now Streaming · Top Rated · Pricing Plans

*(Add screenshots or a screen recording GIF here)*

---

## Author

**Shubham Panghal** — Frontend Developer & UI Engineer

- **LinkedIn:** [linkedin.com/in/shubham-panghal](https://www.linkedin.com/in/shubham-panghal/)
- **GitHub:** [github.com/shubh791](https://github.com/shubh791)
- **Email:** shubhampanghal.work@gmail.com

---

> Built with precision. Designed with intent.
> Open to collaborations, freelance projects, and full-time opportunities.
