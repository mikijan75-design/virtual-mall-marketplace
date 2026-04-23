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

  // Generate a fan of pointy leaves around the center
  const leafCount = 11;
  const leaves = Array.from({ length: leafCount }, (_, i) => {
    const t = i / (leafCount - 1); // 0..1
    const angle = -90 + (t - 0.5) * 200; // -190..-40 (wide spread, including downward)
    const length = 38 + Math.sin(t * Math.PI) * 14; // longer in the middle
    return { angle, length };
  });

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-20 h-20 md:w-28 md:h-28">
        <svg viewBox="-50 -50 100 100" className="absolute inset-0 w-full h-full overflow-visible">
          <defs>
            <linearGradient id={`leaf-${variant}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={palette.tip} />
              <stop offset="100%" stopColor={palette.base} />
            </linearGradient>
          </defs>
          {leaves.map((l, i) => (
            <g key={i} transform={`rotate(${l.angle})`}>
              {/* Sharp pointy leaf */}
              <polygon
                points={`-3,0 3,0 0,-${l.length}`}
                fill={`url(#leaf-${variant})`}
                stroke="hsl(130,50%,18%)"
                strokeWidth="0.6"
                strokeLinejoin="miter"
              />
              {/* Tip thorn highlight */}
              <circle cx="0" cy={-l.length} r="0.9" fill={palette.spike} />
              {/* Side thorns */}
              <polygon
                points={`-1.5,${-l.length * 0.5} 0,${-l.length * 0.55} -3,${-l.length * 0.45}`}
                fill={palette.spike}
                opacity="0.7"
              />
              <polygon
                points={`1.5,${-l.length * 0.7} 0,${-l.length * 0.75} 3,${-l.length * 0.65}`}
                fill={palette.spike}
                opacity="0.7"
              />
            </g>
          ))}
          {/* Central crown */}
          <ellipse cx="0" cy="0" rx="5" ry="2" fill={palette.base} opacity="0.85" />
        </svg>
      </div>
      {/* Clay pot */}
      <div
        className="-mt-2 w-9 h-4 md:w-12 md:h-5 rounded-b-md relative"
        style={{
          background: "linear-gradient(180deg, hsl(20,55%,55%), hsl(15,50%,32%))",
          boxShadow: "0 3px 6px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.2)",
          borderTop: "2px solid hsl(22,50%,65%)",
        }}
      >
        <div className="absolute inset-x-1 top-0.5 h-px bg-black/15" />
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
