/**
 * Spiky/thorny ornamental plant (agave / yucca-like) in a clay pot.
 * Variants vary leaf color and count to feel organic.
 */
type SpikyVariant = "agave" | "yucca" | "aloe";

const SpikyPlant = ({ variant }: { variant: SpikyVariant }) => {
  const palette = {
    agave: { tip: "hsl(95,45%,60%)", base: "hsl(125,55%,28%)", spike: "hsl(40,30%,75%)" },
    yucca: { tip: "hsl(140,40%,55%)", base: "hsl(155,55%,22%)", spike: "hsl(45,25%,80%)" },
    aloe:  { tip: "hsl(110,55%,65%)", base: "hsl(130,50%,30%)", spike: "hsl(45,40%,82%)" },
  }[variant];

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-20 h-24 md:w-28 md:h-32">
        <svg viewBox="-50 -90 100 100" className="absolute inset-0 w-full h-full overflow-visible">
          <defs>
            <linearGradient id={`leaf-${variant}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={palette.tip} />
              <stop offset="100%" stopColor={palette.base} />
            </linearGradient>
            <linearGradient id={`trunk-${variant}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="hsl(28,40%,32%)" />
              <stop offset="50%" stopColor="hsl(30,45%,45%)" />
              <stop offset="100%" stopColor="hsl(25,40%,28%)" />
            </linearGradient>
          </defs>

          {/* Main trunk rising from pot */}
          <path
            d="M -3 0 Q -2 -25 -1.5 -45 L 1.5 -45 Q 2 -25 3 0 Z"
            fill={`url(#trunk-${variant})`}
            stroke="hsl(25,40%,20%)"
            strokeWidth="0.4"
          />
          {/* Two branches */}
          <path
            d="M -1 -28 Q -10 -32 -16 -42"
            fill="none"
            stroke="hsl(28,42%,30%)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 1 -34 Q 10 -38 17 -50"
            fill="none"
            stroke="hsl(28,42%,30%)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* A few pointed leaves — sparse, not many */}
          {[
            { x: -16, y: -42, angle: -55, length: 24 },
            { x: 17, y: -50, angle: 35, length: 26 },
            { x: 0, y: -45, angle: 0, length: 32 },
            { x: -6, y: -45, angle: -20, length: 22 },
            { x: 6, y: -45, angle: 18, length: 22 },
          ].map((l, i) => (
            <g key={i} transform={`translate(${l.x} ${l.y}) rotate(${l.angle})`}>
              {/* Pointed leaf — narrow, sharp tip */}
              <path
                d={`M -3 0 Q -1.5 ${-l.length * 0.5} 0 ${-l.length} Q 1.5 ${-l.length * 0.5} 3 0 Z`}
                fill={`url(#leaf-${variant})`}
                stroke="hsl(130,50%,20%)"
                strokeWidth="0.5"
              />
              {/* Center vein */}
              <line
                x1="0" y1="0" x2="0" y2={-l.length * 0.9}
                stroke="hsl(130,40%,18%)"
                strokeWidth="0.4"
                opacity="0.6"
              />
            </g>
          ))}
        </svg>
      </div>
      {/* Pointed conical clay pot */}
      <div className="-mt-2 relative w-12 h-7 md:w-16 md:h-9">
        <svg viewBox="0 0 64 36" className="w-full h-full overflow-visible" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`pot-${variant}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(20,60%,58%)" />
              <stop offset="60%" stopColor="hsl(15,55%,40%)" />
              <stop offset="100%" stopColor="hsl(12,50%,28%)" />
            </linearGradient>
          </defs>
          {/* Conical/pointed pot — wide top, narrow pointed bottom */}
          <path
            d="M 2 2 L 62 2 L 38 34 L 26 34 Z"
            fill={`url(#pot-${variant})`}
            stroke="hsl(15,50%,22%)"
            strokeWidth="1"
            strokeLinejoin="round"
          />
          {/* Rim highlight */}
          <rect x="2" y="2" width="60" height="3" fill="hsl(22,55%,68%)" opacity="0.85" />
          <line x1="2" y1="6" x2="62" y2="6" stroke="hsl(15,50%,22%)" strokeWidth="0.6" />
          {/* Subtle highlight stripe */}
          <path d="M 10 8 L 28 32" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
        </svg>
      </div>
    </div>
  );
};

const Decorations = () => {
  const order: SpikyVariant[] = ["agave", "yucca", "aloe", "agave", "yucca", "aloe"];
  return (
    <div className="flex justify-between items-end max-w-5xl mx-auto px-6 py-4">
      <SpikyPlant variant={order[0]} />
      <SpikyPlant variant={order[1]} />
      <div className="hidden md:block"><SpikyPlant variant={order[2]} /></div>
      <div className="hidden md:block"><SpikyPlant variant={order[3]} /></div>
      <SpikyPlant variant={order[4]} />
      <SpikyPlant variant={order[5]} />
    </div>
  );
};

export default Decorations;
