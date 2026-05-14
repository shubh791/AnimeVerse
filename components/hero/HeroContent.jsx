import Chip from '@/components/ui/Chip'
import SplitText from '@/components/ui/SplitText'
import { PlayIcon, ArrowRight } from '@/components/shared/Icons'

const IconFilm = () => (
  <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M7 3v14M17 3v14M2 8h5M2 12h5M17 8h5M17 12h5" />
  </svg>
)

const IconStar = () => (
  <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l2.68 5.43L21 8.27l-4.5 4.38 1.06 6.19L12 15.77l-5.56 3.07 1.06-6.19L3 8.27l6.32-.84L12 2z" />
  </svg>
)

const IconAudio = () => (
  <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
)

const IconLayers = () => (
  <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
)

const STATS = [
  { icon: <IconFilm />,   title: '4K DOLBY VISION', sub: 'Cinematic Quality' },
  { icon: <IconStar />,   title: 'NEW EPISODES',     sub: 'Weekly Updates' },
  { icon: <IconAudio />,  title: 'JP + EN AUDIO',    sub: 'Original Experience' },
  { icon: <IconLayers />, title: '10,000+ EPISODES', sub: 'Endless Entertainment' },
]

export default function HeroContent() {
  return (
    <div className="w-full max-w-[600px]">

      <div className="hc-eyebrow flex items-center gap-3 mb-8">
        <Chip>SEASON 03 · CRIMSON ARC</Chip>
        <div className="flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: 'oklch(72% 0.24 18)', boxShadow: '0 0 10px oklch(72% 0.24 18)' }}
          />
          <span className="numbered text-white/55">LIVE NOW</span>
        </div>
      </div>

      <h1
        className="hc-title font-display leading-[0.92] tracking-[-0.025em] text-white"
        style={{ fontSize: 'clamp(52px, 6.5vw, 112px)' }}
      >
        <span className="block"><SplitText>Step Beyond</SplitText></span>
        <span className="block">
          <SplitText>the </SplitText>
          <span className="accent-word italic" style={{ color: 'oklch(84% 0.18 22)' }}>
            <SplitText>Frame.</SplitText>
          </span>
        </span>
      </h1>

      <div
        className="hc-rule mt-7 h-px w-24"
        style={{ background: 'linear-gradient(90deg, oklch(72% 0.24 18), transparent)' }}
      />

      <p className="hc-sub mt-5 leading-[1.75] text-white/60" style={{ fontSize: 15 }}>
        Every arc. Every world. Every legendary battle — streaming in
        4K Dolby Vision with JP and EN audio. One universe built
        exclusively for true anime fans.
      </p>

      <div className="hc-cta mt-9 flex items-center gap-3 flex-wrap">
        <a
          href="#streaming"
          onClick={(e) => { e.preventDefault(); document.getElementById('streaming')?.scrollIntoView({ behavior: 'smooth' }) }}
          className="cta-primary inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium tracking-wide"
          style={{ fontSize: 13.5 }}
        >
          <PlayIcon className="w-3.5 h-3.5" />
          Start Watching Free
        </a>
        <a
          href="#worlds"
          onClick={(e) => { e.preventDefault(); document.getElementById('worlds')?.scrollIntoView({ behavior: 'smooth' }) }}
          className="cta-ghost inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium tracking-wide"
          style={{ fontSize: 13.5 }}
        >
          Explore Worlds
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Icon stat strip */}
      <div className="hc-labels mt-10 flex items-center flex-wrap gap-y-3">
        {STATS.map(({ icon, title, sub }, i) => (
          <div key={title} className="flex items-center shrink-0">
            <div className="flex items-center gap-2.5 pr-4">
              <div
                className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  color: 'rgba(255,255,255,0.65)',
                }}
              >
                {icon}
              </div>
              <div>
                <div className="numbered text-white/88 leading-tight" style={{ fontSize: 8.5, letterSpacing: '0.09em' }}>{title}</div>
                <div className="numbered text-white/35" style={{ fontSize: 8 }}>{sub}</div>
              </div>
            </div>
            {i < STATS.length - 1 && (
              <div className="h-6 w-px bg-white/10 mr-4 shrink-0" />
            )}
          </div>
        ))}
      </div>

    </div>
  )
}
