/**
 * Lush, varied garden scenes with mixed plants, flowers, and tiny details
 * (mushrooms, butterflies, stones, grass tufts).
 */
type GardenVariant = "rose" | "sunflower" | "tulip" | "fern" | "lavender" | "tropical";

const Butterfly = ({ x, y, color }: { x: number; y: number; color: string }) => (
  <g transform={`translate(${x},${y})`}>
    <ellipse cx="-2.5" cy="-1" rx="2.5" ry="3.5" fill={color} opacity="0.9" />
    <ellipse cx="2.5" cy="-1" rx="2.5" ry="3.5" fill={color} opacity="0.9" />
    <ellipse cx="-2" cy="2" rx="1.8" ry="2.2" fill={color} opacity="0.85" />
    <ellipse cx="2" cy="2" rx="1.8" ry="2.2" fill={color} opacity="0.85" />
    <line x1="0" y1="-3" x2="0" y2="3" stroke="hsl(30,20%,15%)" strokeWidth="0.6" />
    <circle cx="-0.7" cy="-3.2" r="0.4" fill="hsl(30,20%,15%)" />
    <circle cx="0.7" cy="-3.2" r="0.4" fill="hsl(30,20%,15%)" />
  </g>
);

const Mushroom = ({ x, y, cap }: { x: number; y: number; cap: string }) => (
  <g transform={`translate(${x},${y})`}>
    <rect x="-1.2" y="0" width="2.4" height="3" rx="0.6" fill="hsl(40,30%,90%)" />
    <ellipse cx="0" cy="0" rx="3.5" ry="2.2" fill={cap} />
    <circle cx="-1.5" cy="-0.5" r="0.5" fill="hsl(0,0%,100%)" opacity="0.8" />
    <circle cx="1.2" cy="0" r="0.4" fill="hsl(0,0%,100%)" opacity="0.8" />
    <circle cx="0" cy="-1" r="0.4" fill="hsl(0,0%,100%)" opacity="0.8" />
  </g>
);

const Stone = ({ x, y, w, color }: { x: number; y: number; w: number; color: string }) => (
  <ellipse cx={x} cy={y} rx={w} ry={w * 0.55} fill={color} stroke="hsl(220,8%,25%)" strokeWidth="0.3" />
);

const GrassTuft = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x},${y})`}>
    <path d="M-3 0 Q-2 -5 -1 0" stroke="hsl(95,55%,38%)" strokeWidth="0.7" fill="none" />
    <path d="M-1 0 Q0 -7 1 0" stroke="hsl(110,60%,42%)" strokeWidth="0.7" fill="none" />
    <path d="M1 0 Q2 -5 3 0" stroke="hsl(95,55%,38%)" strokeWidth="0.7" fill="none" />
  </g>
);

const Flower = ({ x, y, petal, center }: { x: number; y: number; petal: string; center: string }) => (
  <g transform={`translate(${x},${y})`}>
    {[0, 60, 120, 180, 240, 300].map((a) => (
      <ellipse key={a} cx="0" cy="-2.2" rx="1.4" ry="2" fill={petal} transform={`rotate(${a})`} />
    ))}
    <circle cx="0" cy="0" r="1.2" fill={center} />
  </g>
);

const GardenPlant = ({ variant }: { variant: GardenVariant }) => {
  // Each variant renders a unique mix of flora + details
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24 md:w-32 md:h-32">
        <svg viewBox="-50 -55 100 100" className="absolute inset-0 w-full h-full overflow-visible">
          <defs>
            <radialGradient id={`soil-${variant}`} cx="0.5" cy="0.5">
              <stop offset="0%" stopColor="hsl(25,40%,28%)" />
              <stop offset="100%" stopColor="hsl(20,45%,18%)" />
            </radialGradient>
            <linearGradient id={`stem-${variant}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(110,55%,42%)" />
              <stop offset="100%" stopColor="hsl(125,55%,25%)" />
            </linearGradient>
          </defs>

          {/* Soil bed */}
          <ellipse cx="0" cy="38" rx="42" ry="6" fill={`url(#soil-${variant})`} opacity="0.85" />

          {variant === "rose" && (
            <>
              {/* Tall stems with leaves */}
              {[-12, 0, 14].map((sx, i) => (
                <g key={i}>
                  <path d={`M${sx} 38 Q${sx + 2} 10 ${sx - 1} -20`} stroke={`url(#stem-${variant})`} strokeWidth="1.6" fill="none" />
                  <ellipse cx={sx + 4} cy="15" rx="3" ry="1.5" fill="hsl(120,55%,32%)" transform={`rotate(30 ${sx + 4} 15)`} />
                  <ellipse cx={sx - 4} cy="0" rx="3" ry="1.5" fill="hsl(120,55%,32%)" transform={`rotate(-30 ${sx - 4} 0)`} />
                </g>
              ))}
              {/* Roses */}
              <Flower x={-13} y={-22} petal="hsl(350,75%,55%)" center="hsl(45,90%,55%)" />
              <Flower x={1} y={-26} petal="hsl(0,80%,60%)" center="hsl(50,95%,60%)" />
              <Flower x={13} y={-21} petal="hsl(335,70%,62%)" center="hsl(45,90%,55%)" />
              <Butterfly x={-25} y={-18} color="hsl(280,70%,65%)" />
            </>
          )}

          {variant === "sunflower" && (
            <>
              {[-14, 2, 16].map((sx, i) => (
                <path key={i} d={`M${sx} 38 Q${sx} 10 ${sx + (i - 1) * 2} -22`} stroke={`url(#stem-${variant})`} strokeWidth="2" fill="none" />
              ))}
              {/* Big leaves */}
              <ellipse cx="-20" cy="18" rx="6" ry="3" fill="hsl(115,55%,32%)" transform="rotate(-30 -20 18)" />
              <ellipse cx="20" cy="14" rx="6" ry="3" fill="hsl(115,55%,32%)" transform="rotate(40 20 14)" />
              {/* Sunflowers */}
              {[{ x: -14, y: -22 }, { x: 4, y: -28 }, { x: 18, y: -22 }].map((p, i) => (
                <g key={i}>
                  {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a) => (
                    <ellipse key={a} cx={p.x} cy={p.y - 4} rx="1.6" ry="3.2" fill="hsl(45,95%,58%)" transform={`rotate(${a} ${p.x} ${p.y})`} />
                  ))}
                  <circle cx={p.x} cy={p.y} r="2.4" fill="hsl(25,55%,28%)" />
                </g>
              ))}
              <Butterfly x={-26} y={-25} color="hsl(50,90%,60%)" />
            </>
          )}

          {variant === "tulip" && (
            <>
              {[-16, -6, 4, 14].map((sx, i) => (
                <g key={i}>
                  <path d={`M${sx} 38 L${sx} -10`} stroke={`url(#stem-${variant})`} strokeWidth="1.4" fill="none" />
                  <ellipse cx={sx - 3} cy="15" rx="4" ry="1.4" fill="hsl(125,60%,30%)" transform={`rotate(-25 ${sx - 3} 15)`} />
                </g>
              ))}
              {/* Tulip cups */}
              {[
                { x: -16, c: "hsl(355,80%,60%)" },
                { x: -6, c: "hsl(45,95%,62%)" },
                { x: 4, c: "hsl(320,65%,65%)" },
                { x: 14, c: "hsl(20,90%,60%)" },
              ].map((t, i) => (
                <g key={i}>
                  <path d={`M${t.x - 3} -10 Q${t.x} -18 ${t.x + 3} -10 Q${t.x + 2} -6 ${t.x} -7 Q${t.x - 2} -6 ${t.x - 3} -10 Z`} fill={t.c} stroke="hsl(0,0%,15%)" strokeWidth="0.2" />
                </g>
              ))}
            </>
          )}

          {variant === "fern" && (
            <>
              {[-25, -10, 5, 20].map((sx, i) => {
                const tilt = (i - 1.5) * 12;
                return (
                  <g key={i} transform={`translate(${sx} 38) rotate(${tilt})`}>
                    <path d="M0 0 Q-2 -25 0 -45" stroke="hsl(130,55%,30%)" strokeWidth="1.2" fill="none" />
                    {[5, 12, 19, 26, 33, 40].map((d, j) => (
                      <g key={j}>
                        <ellipse cx="-3" cy={-d} rx="3.5" ry="1.2" fill="hsl(120,55%,38%)" transform={`rotate(-30 -3 ${-d})`} />
                        <ellipse cx="3" cy={-d} rx="3.5" ry="1.2" fill="hsl(120,55%,38%)" transform={`rotate(30 3 ${-d})`} />
                      </g>
                    ))}
                  </g>
                );
              })}
              <Mushroom x={-22} y={36} cap="hsl(0,75%,50%)" />
              <Mushroom x={20} y={37} cap="hsl(30,85%,55%)" />
            </>
          )}

          {variant === "lavender" && (
            <>
              {[-20, -10, 0, 10, 20].map((sx, i) => (
                <g key={i}>
                  <path d={`M${sx} 38 L${sx} -18`} stroke="hsl(110,40%,45%)" strokeWidth="0.9" fill="none" />
                  {/* Lavender florets */}
                  {[-2, -6, -10, -14, -18].map((dy, j) => (
                    <ellipse key={j} cx={sx} cy={dy} rx="1.4" ry="2" fill="hsl(270,55%,60%)" opacity="0.9" />
                  ))}
                </g>
              ))}
              <Butterfly x={-26} y={-10} color="hsl(280,70%,70%)" />
              <Butterfly x={24} y={-5} color="hsl(330,70%,70%)" />
            </>
          )}

          {variant === "tropical" && (
            <>
              {/* Big monstera-like leaves */}
              {[-30, -15, 5, 20].map((sx, i) => {
                const r = (i - 1.5) * 18;
                return (
                  <g key={i} transform={`translate(${sx} 36) rotate(${r})`}>
                    <path d="M0 0 Q-10 -20 -2 -40 Q8 -22 0 0 Z" fill={`hsl(${130 + i * 6},55%,${28 + i * 3}%)`} stroke="hsl(130,55%,15%)" strokeWidth="0.4" />
                    <path d="M0 -5 L0 -38" stroke="hsl(130,55%,18%)" strokeWidth="0.5" />
                  </g>
                );
              })}
              {/* Hibiscus flower */}
              <Flower x={0} y={-28} petal="hsl(345,85%,62%)" center="hsl(45,95%,60%)" />
              <Flower x={-18} y={-20} petal="hsl(20,90%,60%)" center="hsl(50,95%,55%)" />
            </>
          )}

          {/* Shared ground details */}
          <GrassTuft x={-32} y={40} />
          <GrassTuft x={28} y={41} />
          <GrassTuft x={-5} y={42} />
          <Stone x={-18} y={42} w={3} color="hsl(210,8%,55%)" />
          <Stone x={12} y={43} w={2.4} color="hsl(220,10%,45%)" />
          <Stone x={24} y={44} w={1.8} color="hsl(210,8%,60%)" />
        </svg>
      </div>
      {/* Garden bed / planter */}
      <div
        className="-mt-1 w-16 h-3 md:w-20 md:h-4 rounded-b-md relative"
        style={{
          background: "linear-gradient(180deg, hsl(25,45%,38%), hsl(20,50%,22%))",
          boxShadow: "0 3px 6px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.15)",
          borderTop: "2px solid hsl(28,40%,48%)",
        }}
      >
        <div className="absolute inset-x-1 top-0.5 h-px bg-black/20" />
      </div>
    </div>
  );
};

const Decorations = () => {
  const order: GardenVariant[] = ["rose", "sunflower", "tulip", "fern", "lavender", "tropical"];
  return (
    <div className="flex justify-between items-end max-w-5xl mx-auto px-6 py-4">
      <GardenPlant variant={order[0]} />
      <GardenPlant variant={order[1]} />
      <div className="hidden md:block"><GardenPlant variant={order[2]} /></div>
      <div className="hidden md:block"><GardenPlant variant={order[3]} /></div>
      <GardenPlant variant={order[4]} />
      <GardenPlant variant={order[5]} />
    </div>
  );
};

export default Decorations;
