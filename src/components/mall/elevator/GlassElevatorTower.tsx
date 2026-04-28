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
  bagColor,
}: {
  className?: string;
  shirt?: string;
  flip?: boolean;
  style?: PassengerStyle;
  hair?: string;
  bagColor?: string;
}) => {
  const isFemale = style === "longHair";
  const showBag = style === "bag" || isFemale;
  const resolvedBagColor =
    bagColor ?? (isFemale ? "hsl(0,0%,96%)" : "hsl(345,55%,45%)");
  const bagStroke = isFemale ? "hsl(0,0%,55%)" : "hsl(345,40%,25%)";
  return (
    <svg
      className={`absolute z-40 ${className}`}
      viewBox="0 0 28 58"
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
      aria-hidden="true"
    >
      {/* Long hair down the back of the head */}
      {isFemale && (
        <path
          d="M13 4 Q8 4 8 9 Q7 14 8 19 Q7 25 9.5 30 L12 30 L12 12 Q12 8 14 7 Z"
          fill={hair}
          stroke="hsl(25,40%,15%)"
          strokeWidth="0.5"
        />
      )}

      {/* Profile head (looking right) */}
      <path
        d="M10.5 8
           Q10.5 3.8 14 3.8
           Q18 3.8 18.2 7.6
           Q18.4 9 18 10.2
           L18.6 10.6
           Q19.2 11 18.6 11.4
           L17.8 11.6
           Q18 12.2 17.4 12.4
           L16.6 12.4
           Q16.6 13 16.2 13.2
           L14.6 13.2
           Q13.4 13.2 12.4 12.4
           Q10.6 11 10.5 8 Z"
        fill="hsl(30,46%,74%)"
        stroke="hsl(26,36%,42%)"
        strokeWidth="0.7"
      />

      {/* Ear */}
      <path
        d="M12.4 8.6 Q11.6 8.6 11.7 9.6 Q11.8 10.4 12.6 10.5 Z"
        fill="hsl(28,40%,64%)"
        stroke="hsl(25,35%,42%)"
        strokeWidth="0.4"
      />
      <path d="M12.1 9.5 Q12.4 9.6 12.4 10" stroke="hsl(25,35%,38%)" strokeWidth="0.3" fill="none" />

      {/* Eye */}
      <circle cx="16.4" cy="8.4" r="0.55" fill="hsl(220,25%,18%)" />
      <path d="M15.7 8 Q16.4 7.6 17 8" stroke="hsl(25,40%,28%)" strokeWidth="0.35" fill="none" strokeLinecap="round" />

      {/* Eyebrow */}
      <path d="M15.6 7.3 Q16.4 7 17.1 7.3" stroke={hair} strokeWidth="0.55" fill="none" strokeLinecap="round" />

      {/* Mouth */}
      <path d="M16.6 11.4 Q17.2 11.6 17.6 11.3" stroke="hsl(0,45%,32%)" strokeWidth="0.4" fill="none" strokeLinecap="round" />

      {/* Short hair cap */}
      {style === "shortHair" && (
        <path
          d="M10.5 8 Q10.4 4 14 3.6 Q18 4 18.4 8 Q18 6 16 5.6 Q13 5.4 11.4 6.6 Q10.6 7.4 10.5 8 Z"
          fill={hair}
          stroke="hsl(25,40%,15%)"
          strokeWidth="0.5"
        />
      )}

      {/* Hat */}
      {style === "hat" && (
        <>
          <ellipse cx="14" cy="6.4" rx="6" ry="1.1" fill="hsl(28,35%,22%)" stroke="hsl(25,40%,12%)" strokeWidth="0.5" />
          <path d="M11 6.4 Q11 2.8 14 2.6 Q17 2.8 17 6.4 Z" fill="hsl(28,35%,22%)" stroke="hsl(25,40%,12%)" strokeWidth="0.5" />
          <rect x="11" y="5.6" width="6" height="0.9" fill="hsl(43,55%,45%)" opacity="0.85" />
        </>
      )}

      {/* Female top-of-head hair cap */}
      {isFemale && (
        <path
          d="M10.6 7.6 Q10.5 4 14 3.8 Q17.6 4 18 7 Q17 5.6 14.6 5.6 Q11.8 5.6 10.6 7.6 Z"
          fill={hair}
          stroke="hsl(25,40%,15%)"
          strokeWidth="0.4"
        />
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
      {showBag && (
        <>
          <path d="M20.5 28 Q23 26 25.5 28" stroke="hsl(0,0%,15%)" strokeWidth="0.8" fill="none" />
          <rect x="20" y="28" width="6" height="8" fill={resolvedBagColor} stroke={bagStroke} strokeWidth="0.6" />
          <rect x="21" y="30" width="4" height="0.6" fill="hsl(43,70%,55%)" opacity="0.7" />
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
