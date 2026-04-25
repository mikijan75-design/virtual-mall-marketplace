/**
 * Decorative side-transit overlay added to each floor strip:
 * - Glass elevator shafts (left + right)
 * - Diagonal staircase on the left
 * - Diagonal escalator on the right
 * - Walking people silhouettes
 * - Service icons (i, WC) in the corners
 */

const Person = ({
  x,
  scale = 1,
  flip = false,
  color = "hsl(220,30%,35%)",
}: {
  x: number;
  scale?: number;
  flip?: boolean;
  color?: string;
}) => (
  <g transform={`translate(${x} 0) scale(${flip ? -scale : scale} ${scale})`}>
    <circle cx="0" cy="-22" r="3.2" fill="hsl(28,55%,72%)" stroke="hsl(28,40%,45%)" strokeWidth="0.4" />
    <path d="M -3 -19 Q -4 -10 -3 -2 L 3 -2 Q 4 -10 3 -19 Z" fill={color} />
    <line x1="-1.5" y1="-2" x2="-3" y2="6" stroke="hsl(220,25%,22%)" strokeWidth="2" strokeLinecap="round" />
    <line x1="1.5" y1="-2" x2="3.5" y2="6" stroke="hsl(220,25%,22%)" strokeWidth="2" strokeLinecap="round" />
    <line x1="-3" y1="-15" x2="-5" y2="-7" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <line x1="3" y1="-15" x2="5" y2="-7" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
  </g>
);

const ServiceIcon = ({
  variant,
  side,
}: {
  variant: "info" | "wc";
  side: "left" | "right";
}) => (
  <div
    className="absolute z-20 pointer-events-none flex items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded-md"
    style={{
      [side === "left" ? "left" : "right"]: "6px",
      bottom: "10px",
      background:
        variant === "info"
          ? "linear-gradient(180deg, hsl(215,75%,40%), hsl(215,80%,28%))"
          : "linear-gradient(180deg, hsl(220,15%,35%), hsl(220,18%,22%))",
      boxShadow: "0 2px 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)",
      border: "1px solid hsl(220,20%,18%)",
      color: "hsl(0,0%,98%)",
      fontFamily: "serif",
      fontWeight: 700,
      fontSize: "12px",
    }}
  >
    {variant === "info" ? <span style={{ fontStyle: "italic" }}>i</span> : <span style={{ fontSize: "9px" }}>WC</span>}
  </div>
);

const FloorTransit = ({ floorIndex }: { floorIndex: number }) => {
  return (
    <>
      {/* LEFT: stairs */}
      <svg
        className="absolute left-0 top-0 h-full pointer-events-none hidden md:block"
        width="110"
        viewBox="0 0 110 260"
        preserveAspectRatio="none"
        style={{ zIndex: 5 }}
      >
        <defs>
          <linearGradient id={`stairGrad-${floorIndex}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(35,18%,82%)" />
            <stop offset="100%" stopColor="hsl(30,15%,55%)" />
          </linearGradient>
        </defs>
        {Array.from({ length: 10 }).map((_, i) => {
          const x = 88 - i * 7.5;
          const y = 40 + i * 18;
          return (
            <g key={i}>
              <rect x={x} y={y} width="14" height="4" fill={`url(#stairGrad-${floorIndex})`} stroke="hsl(30,18%,40%)" strokeWidth="0.5" />
              <rect x={x} y={y + 4} width="3" height="14" fill="hsl(30,18%,45%)" />
            </g>
          );
        })}
        <line x1="95" y1="38" x2="15" y2="220" stroke="hsl(30,20%,32%)" strokeWidth="2" strokeLinecap="round" />
        <line x1="95" y1="44" x2="15" y2="226" stroke="hsl(30,15%,58%)" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
      </svg>

      {/* LEFT: glass elevator */}
      <div
        className="absolute pointer-events-none hidden md:block"
        style={{
          left: "110px",
          top: "16px",
          bottom: "16px",
          width: "40px",
          background: "linear-gradient(180deg, rgba(180,220,240,0.35), rgba(140,190,220,0.22))",
          border: "2px solid hsl(200,40%,55%)",
          borderRadius: "4px",
          boxShadow: "inset 0 0 12px rgba(255,255,255,0.5), 0 2px 8px rgba(0,0,0,0.15)",
          zIndex: 6,
        }}
      >
        <div
          className="absolute left-1 right-1"
          style={{
            top: floorIndex === 0 ? "20%" : floorIndex === 1 ? "55%" : "10%",
            height: "36px",
            background: "linear-gradient(180deg, hsl(200,30%,75%), hsl(200,35%,55%))",
            border: "1.5px solid hsl(200,40%,40%)",
            borderRadius: "2px",
            boxShadow: "inset 0 1px 2px rgba(255,255,255,0.4)",
          }}
        >
          <div className="absolute inset-x-1 top-1 h-2 bg-white/30 rounded-sm" />
        </div>
      </div>

      {/* RIGHT: escalator */}
      <svg
        className="absolute right-0 top-0 h-full pointer-events-none hidden md:block"
        width="110"
        viewBox="0 0 110 260"
        preserveAspectRatio="none"
        style={{ zIndex: 5 }}
      >
        <defs>
          <linearGradient id={`escGrad-${floorIndex}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(200,28%,84%)" />
            <stop offset="100%" stopColor="hsl(200,22%,55%)" />
          </linearGradient>
        </defs>
        <polygon points="15,40 45,40 92,220 62,220" fill={`url(#escGrad-${floorIndex})`} stroke="hsl(200,25%,38%)" strokeWidth="1" />
        {Array.from({ length: 10 }).map((_, i) => {
          const t = i / 10;
          return (
            <line
              key={i}
              x1={15 + (92 - 15) * t}
              y1={40 + (220 - 40) * t}
              x2={45 + (62 - 45) * t}
              y2={40 + (220 - 40) * t}
              stroke="hsl(200,30%,28%)"
              strokeWidth="0.6"
              opacity="0.55"
            />
          );
        })}
        <line x1="15" y1="36" x2="92" y2="216" stroke="hsl(220,15%,25%)" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="45" y1="36" x2="62" y2="216" stroke="hsl(220,15%,25%)" strokeWidth="2.2" strokeLinecap="round" />
        <polygon points="72,206 84,206 78,218" fill="hsl(0,0%,98%)" stroke="hsl(220,30%,20%)" strokeWidth="0.5" />
      </svg>

      {/* RIGHT: glass elevator */}
      <div
        className="absolute pointer-events-none hidden md:block"
        style={{
          right: "110px",
          top: "16px",
          bottom: "16px",
          width: "40px",
          background: "linear-gradient(180deg, rgba(180,220,240,0.35), rgba(140,190,220,0.22))",
          border: "2px solid hsl(200,40%,55%)",
          borderRadius: "4px",
          boxShadow: "inset 0 0 12px rgba(255,255,255,0.5), 0 2px 8px rgba(0,0,0,0.15)",
          zIndex: 6,
        }}
      >
        <div
          className="absolute left-1 right-1"
          style={{
            top: floorIndex === 0 ? "60%" : floorIndex === 1 ? "15%" : "45%",
            height: "36px",
            background: "linear-gradient(180deg, hsl(200,30%,75%), hsl(200,35%,55%))",
            border: "1.5px solid hsl(200,40%,40%)",
            borderRadius: "2px",
            boxShadow: "inset 0 1px 2px rgba(255,255,255,0.4)",
          }}
        >
          <div className="absolute inset-x-1 top-1 h-2 bg-white/30 rounded-sm" />
        </div>
      </div>

      {/* People walking */}
      <svg
        className="absolute left-0 right-0 pointer-events-none hidden md:block"
        style={{ bottom: "6px", height: "44px", zIndex: 7 }}
        viewBox="0 0 1000 44"
        preserveAspectRatio="none"
      >
        <g transform="translate(0 36)">
          <Person x={60} scale={1.1} color="hsl(215,55%,40%)" />
          <Person x={175} scale={0.95} flip color="hsl(340,40%,45%)" />
          <Person x={870} scale={1.05} color="hsl(160,35%,35%)" />
          <Person x={945} scale={0.9} flip color="hsl(30,55%,40%)" />
          {floorIndex === 1 && <Person x={500} scale={1.0} color="hsl(280,35%,40%)" />}
        </g>
      </svg>

      <ServiceIcon variant="info" side="left" />
      <ServiceIcon variant="wc" side="right" />
    </>
  );
};

export default FloorTransit;
