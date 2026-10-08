interface BackdropProps {
  className?: string;
  variant?: 'hero' | 'ember' | 'ring';
}

const grain =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

// Cinematic dark studio backdrop: spotlight, ember glow, ink-brush ring, floor lines and film grain.
export default function Backdrop({ className = '', variant = 'hero' }: BackdropProps) {
  const ringPos =
    variant === 'ring' ? 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2' : 'right-[-18%] top-[8%] lg:right-[-6%]';

  return (
    <div aria-hidden="true" className={`pointer-events-none overflow-hidden bg-ink ${className}`}>
      <div
        className="absolute inset-0 motion-safe:animate-[backdrop-drift_18s_ease-in-out_infinite_alternate]"
        style={{
          background: [
            'radial-gradient(60% 70% at 78% 18%, rgba(243,239,232,0.20) 0%, rgba(243,239,232,0.05) 45%, transparent 70%)',
            variant === 'ember'
              ? 'radial-gradient(70% 60% at 50% 110%, rgba(179,38,47,0.55) 0%, transparent 65%)'
              : 'radial-gradient(55% 55% at 8% 105%, rgba(179,38,47,0.38) 0%, transparent 65%)',
            'linear-gradient(180deg, #131315 0%, #0b0b0c 100%)',
          ].join(','),
        }}
      />

      <svg
        viewBox="0 0 800 800"
        className={`absolute aspect-square w-[120vw] max-w-[1100px] text-paper/15 sm:w-[80vw] ${ringPos}`}
        fill="none"
      >
        <circle cx="400" cy="400" r="300" stroke="currentColor" strokeWidth="1" />
        <circle cx="400" cy="400" r="240" stroke="currentColor" strokeWidth="0.5" />
        <path
          d="M400 90a310 310 0 1 1-262 148"
          stroke="currentColor"
          strokeWidth="14"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>

      <div
        className="absolute inset-x-0 bottom-0 h-1/2 opacity-[0.12]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, rgba(243,239,232,1) 0 1px, transparent 1px 120px), repeating-linear-gradient(0deg, rgba(243,239,232,1) 0 1px, transparent 1px 90px)',
          transform: 'perspective(500px) rotateX(58deg)',
          transformOrigin: 'bottom',
          maskImage: 'linear-gradient(to top, black, transparent 90%)',
          WebkitMaskImage: 'linear-gradient(to top, black, transparent 90%)',
        }}
      />

      <div className="absolute inset-0 opacity-[0.16] mix-blend-overlay" style={{ backgroundImage: grain }} />
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_40%,transparent_40%,rgba(0,0,0,0.65)_100%)]" />
    </div>
  );
}
