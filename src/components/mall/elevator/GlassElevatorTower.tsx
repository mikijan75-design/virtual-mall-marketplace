import type { CSSProperties } from "react";

const glassPaneStyle = {
  background:
    "linear-gradient(120deg, hsla(188,72%,88%,0.42), hsla(190,54%,74%,0.18) 48%, hsla(184,75%,95%,0.5))",
  border: "1px solid hsla(190,45%,43%,0.48)",
  boxShadow:
    "inset 0 0 24px hsla(190,90%,96%,0.54), 0 8px 18px rgba(18,52,62,0.18)",
} as const;

type PassengerStyle = "longHair" | "shortHair" | "hat" | "cane" | "bag";

const ElevatorPassenger = ({
  className = "",
  shirt = "hsl(205,45%,60%)",
  flip = false,
  style = "shortHair",
  hair = "hsl(28,35%,22%)",
}: {
  className?: string;
  shirt?: string;
  flip?: boolean;
  style?: PassengerStyle;
  hair?: string;
}) => {
  const isFemale = style === "longHair";
  return (
    <svg
      className={`absolute z-40 ${className}`}
      viewBox="0 0 28 58"
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
      aria-hidden="true"
    >
      {isFemale && (
        <path
          d="M8.5 8 Q7 18 8 28 L10 30 L10 14 Q10 7 14 6.5 Q18 7 18 14 L18 30 L20 28 Q21 18 19.5 8 Q17 4 14 4 Q11 4 8.5 8 Z"
          fill={hair}
          stroke="hsl(25,40%,15%)"
          strokeWidth="0.6"
        />
      )}
      <circle cx="14" cy="8" r="4.5" fill="hsl(30,46%,74%)" stroke="hsl(26,36%,42%)" strokeWidth="0.8" />
      {style === "shortHair" && (
        <path
          d="M9.7 7.5 Q9 4 14 3.6 Q19 4 18.3 7.5 Q16 5.6 14 5.6 Q12 5.6 9.7 7.5 Z"
          fill={hair}
          stroke="hsl(25,40%,15%)"
          strokeWidth="0.5"
        />
      )}
      {style === "hat" && (
        <>
          <ellipse cx="14" cy="6.6" rx="6.5" ry="1.2" fill="hsl(28,35%,22%)" stroke="hsl(25,40%,12%)" strokeWidth="0.5" />
          <path d="M10.5 6.6 Q10.5 2.4 14 2.2 Q17.5 2.4 17.5 6.6 Z" fill="hsl(28,35%,22%)" stroke="hsl(25,40%,12%)" strokeWidth="0.5" />
          <rect x="10.5" y="5.6" width="7" height="1" fill="hsl(43,55%,45%)" opacity="0.85" />
        </>
      )}
      {isFemale ? (
        <path d="M10 13 L18 13 L22 32 L6 32 Z" fill={shirt} stroke="hsl(204,35%,30%)" strokeWidth="0.8" />
      ) : (
        <path d="M10 13 L18 13 L20 31 L8 31 Z" fill={shirt} stroke="hsl(204,35%,30%)" strokeWidth="0.8" />
      )}
      <path d="M10.5 16 L5 28" stroke="hsl(204,35%,30%)" strokeWidth="2" strokeLinecap="round" />
      <path d="M17.5 16 L23 28" stroke="hsl(204,35%,30%)" strokeWidth="2" strokeLinecap="round" />
      {isFemale ? (
        <>
          <path d="M11 32 L8 50" stroke="hsl(216,28%,36%)" strokeWidth="2.1" strokeLinecap="round" />
          <path d="M17 32 L20 50" stroke="hsl(216,28%,36%)" strokeWidth="2.1" strokeLinecap="round" />
        </>
      ) : (
        <>
          <path d="M11 31 L7 50" stroke="hsl(216,28%,36%)" strokeWidth="2.3" strokeLinecap="round" />
          <path d="M17 31 L21 50" stroke="hsl(216,28%,36%)" strokeWidth="2.3" strokeLinecap="round" />
        </>
      )}
      <path d="M4.5 51 L10.5 51" stroke="hsl(30,18%,18%)" strokeWidth="2" strokeLinecap="round" />
      <path d="M19.5 51 L25.5 51" stroke="hsl(30,18%,18%)" strokeWidth="2" strokeLinecap="round" />
      {style === "cane" && (
        <>
          <path d="M23 28 L25 52" stroke="hsl(28,55%,32%)" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M23 28 Q24.5 26.5 25.5 28.5" stroke="hsl(28,55%,32%)" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        </>
      )}
      {style === "bag" && (
        <>
          <path d="M20.5 28 Q23 26 25.5 28" stroke="hsl(0,0%,15%)" strokeWidth="0.8" fill="none" />
          <rect x="20" y="28" width="6" height="8" fill="hsl(345,55%,45%)" stroke="hsl(345,40%,25%)" strokeWidth="0.6" />
          <rect x="21" y="30" width="4" height="0.6" fill="hsl(43,70%,75%)" opacity="0.85" />
        </>
      )}
    </svg>
  );
};

const ElevatorCabin = ({
  className = "",
  occupied = false,
}: {
  className?: string;
  occupied?: boolean;
}) => (
  <div className={`absolute left-[18%] right-[18%] h-[12%] ${className}`}>
    <div
      className="absolute inset-0 rounded-sm"
      style={{
        background:
          "linear-gradient(180deg, rgba(236,244,244,0.62), rgba(171,194,198,0.34))",
        border: "2px solid hsla(198,28%,38%,0.55)",
        boxShadow:
          "inset 0 0 18px rgba(255,255,255,0.52), 0 3px 10px rgba(30,55,62,0.18)",
      }}
    />
    <div className="absolute left-1/2 top-1 bottom-1 w-px bg-slate-700/35" />
    <div className="absolute -top-4 left-[18%] right-[18%] h-4 border-x border-slate-500/45 bg-slate-300/35" />
    <div className="absolute inset-x-2 bottom-2 h-px bg-white/70" />
    {occupied && (
      <ElevatorPassenger
        className="bottom-[5%] left-1/2 h-10 w-5 -translate-x-1/2 md:h-12 md:w-6"
        shirt="hsl(199,42%,60%)"
        style="hat"
      />
    )}
  </div>
);

const FloorLanding = ({
  top,
  passenger,
  side,
}: {
  top: string;
  passenger?: "blue" | "rose" | "group";
  side: "left" | "right";
}) => (
  <div className="absolute left-[-48%] right-[-72%] z-30 h-[9%]" style={{ top }}>
    <div className="absolute bottom-0 left-0 right-0 h-[28%] bg-[linear-gradient(180deg,#e9ddc6,#c5ae83)] shadow-[0_3px_8px_rgba(70,50,25,0.18)]" />
    <div
      className="absolute left-[8%] right-[4%] bottom-[8%] h-[38%] rounded-sm z-[95]"
      style={{
        background:
          "linear-gradient(180deg, hsla(190,80%,91%,0.48), hsla(195,58%,70%,0.24))",
        border: "1px solid hsla(190,55%,60%,0.55)",
        boxShadow: "inset 0 1px 10px rgba(255,255,255,0.5)",
      }}
    />
    <div className="absolute left-[8%] right-[4%] bottom-[45%] h-1.5 rounded-full bg-[linear-gradient(180deg,#f7ffff,#87a3aa_70%,#536970)] z-[95]" />
    {[18, 42, 66, 88].map((left) => (
      <div
        key={left}
        className="absolute bottom-[8%] h-[38%] w-px bg-[linear-gradient(180deg,#ffffff,#77969d)] z-[95]"
        style={{ left: `${left}%` }}
      />
    ))}
    {/* Group of passengers standing side-by-side, centered under the rail */}
    <div className="absolute bottom-[14%] left-[20%] right-[12%] flex items-end justify-center gap-1">
      <ElevatorPassenger
        className="relative h-11 w-6 md:h-14 md:w-7"
        shirt={passenger === "rose" ? "hsl(344,39%,66%)" : "hsl(213,48%,58%)"}
        style="longHair"
        hair="hsl(28,55%,30%)"
      />
      <ElevatorPassenger
        className="relative h-11 w-6 md:h-14 md:w-7"
        shirt="hsl(45,60%,55%)"
        flip
        style="hat"
      />
      <ElevatorPassenger
        className="relative h-11 w-6 md:h-14 md:w-7"
        shirt={passenger === "blue" ? "hsl(199,42%,60%)" : "hsl(155,40%,50%)"}
        style="bag"
      />
    </div>
  </div>
);

const GlassElevatorTower = ({ side }: { side: "left" | "right" }) => (
  <div
    className={`pointer-events-none absolute top-[116px] bottom-[193px] z-[34] hidden w-[7%] md:block ${
      side === "left" ? "left-[0.5%]" : "right-[0.5%]"
    }`}
    aria-hidden="true"
  >
    <FloorLanding top="29%" side={side} passenger={side === "left" ? "blue" : "rose"} />
    <FloorLanding top="63%" side={side} passenger={side === "right" ? "rose" : "blue"} />
    <FloorLanding top="98%" side={side} passenger="blue" />

    <div className="absolute inset-y-0 left-0 w-[78%]" style={glassPaneStyle}>
      <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,transparent_35%,rgba(255,255,255,0.56)_43%,transparent_53%,transparent_100%)]" />
      <div className="absolute left-1/2 top-0 h-full w-px bg-white/65" />
      <div className="absolute inset-y-0 left-[20%] w-px bg-cyan-950/22" />
      <div className="absolute inset-y-0 right-[20%] w-px bg-cyan-950/22" />
      {[31, 62].map((top) => (
        <div
          key={top}
          className="absolute left-0 right-0 h-px bg-cyan-950/28 shadow-[0_1px_0_rgba(255,255,255,0.45)]"
          style={{ top: `${top}%` }}
        />
      ))}
      <ElevatorCabin className="top-[3%]" occupied={side === "left"} />
      <ElevatorCabin className="top-[43%]" occupied={side === "right"} />
      <div className="absolute left-[18%] right-[18%] top-[85%] h-[12%] rounded-sm border border-slate-600/35 bg-slate-100/20 shadow-inner" />
      <div className="absolute bottom-[12%] left-[8%] right-[8%] h-[24%] bg-[linear-gradient(135deg,transparent_42%,rgba(255,255,255,0.54)_47%,transparent_55%)]" />
    </div>

    <div
      className={`absolute bottom-0 top-0 w-[31%] ${
        side === "left" ? "left-[68%] origin-left skew-y-[18deg]" : "right-[68%] origin-right -skew-y-[18deg]"
      }`}
      style={{
        ...glassPaneStyle,
        background:
          "linear-gradient(100deg, hsla(190,62%,79%,0.18), hsla(185,78%,94%,0.42))",
      }}
    >
      <div className="absolute inset-y-0 left-1/2 w-px bg-white/45" />
      <div className="absolute inset-0 bg-[linear-gradient(122deg,transparent_0%,transparent_42%,rgba(255,255,255,0.44)_50%,transparent_60%,transparent_100%)]" />
    </div>
  </div>
);

export default GlassElevatorTower;
