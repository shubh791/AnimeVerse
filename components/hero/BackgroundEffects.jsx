export default function BackgroundEffects() {
  return (
    <>
      {/* Scanlines layer — child div avoids ::before conflict with .vignette */}
      <div className="scanlines-layer" />

      {/* Primary crimson spotlight */}
      <div
        className="hero-spot spotlight"
        style={{
          right: '-5%', top: '10%',
          width: 1100, height: 1100,
          transform: 'translate(0, 0)',
          opacity: 0.45,
          background: 'radial-gradient(circle, rgba(220,40,40,0.55) 0%, rgba(180,20,20,0.22) 40%, transparent 70%)',
        }}
      />

      {/* Secondary cold blue-violet accent — upper left */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          left: '-10%', top: '-5%',
          width: 700, height: 700,
          opacity: 0.18,
          filter: 'blur(80px)',
          background: 'radial-gradient(circle, rgba(120,80,255,0.6) 0%, transparent 70%)',
        }}
      />

      {/* Rune ring behind main character */}
      <div
        className="rune-ring"
        style={{ right: '18%', top: '50%', width: 680, height: 680, transform: 'translate(50%, -50%)' }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          right: '18%', top: '50%',
          width: 480, height: 480,
          transform: 'translate(50%, -50%)',
          border: '1px solid rgba(255,60,60,0.15)',
          boxShadow: '0 0 40px rgba(255,40,40,0.10) inset',
        }}
      />

      {/* 3-D perspective floor plate */}
      <div className="floor-plate" />
      <div className="floor-glow" />

      {/* Cinematic lighting passes */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 20 }}>
        <div
          className="absolute inset-x-0 top-0 h-[28%]"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.20) 70%, transparent 100%)' }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[40%]"
          style={{ background: 'linear-gradient(to top, rgba(2,1,4,0.96) 0%, rgba(2,1,4,0.60) 50%, transparent 100%)' }}
        />
        <div
          className="absolute inset-y-0 left-0 w-[55%]"
          style={{ background: 'linear-gradient(to right, rgba(4,2,6,0.75) 0%, rgba(4,2,6,0.40) 60%, transparent 100%)' }}
        />
        <div
          className="absolute inset-y-0 right-0 w-[12%]"
          style={{ background: 'linear-gradient(to left, rgba(2,1,4,0.70), transparent)' }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[35%]"
          style={{ background: 'radial-gradient(ellipse 65% 70% at 68% 100%, rgba(255,40,50,0.28), transparent 70%)' }}
        />
      </div>
    </>
  )
}
