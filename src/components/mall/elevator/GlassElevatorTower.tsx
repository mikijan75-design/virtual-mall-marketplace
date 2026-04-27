const glassPaneStyle = {
  background:
    "linear-gradient(120deg, hsla(188,72%,88%,0.42), hsla(190,54%,74%,0.18) 48%, hsla(184,75%,95%,0.5))",
  border: "1px solid hsla(190,45%,43%,0.48)",
  boxShadow:
    "inset 0 0 24px hsla(190,90%,96%,0.54), 0 8px 18px rgba(18,52,62,0.18)",
} as const;

const ElevatorPassenger = ({
  className = "",
  shirt = "hsl(205,45%,60%)",
  flip = false,
}: {
  className?: string;
  shirt?: string;
  flip?: boolean;
}) => (
  <svg
    className={`absolute z-40 ${className}`}
    viewBox="0 0 28 58"
    style={{ transform: flip ? "scaleX(-1)" : undefined }}
    aria-hidden="true"
  >
    <circle cx="14" cy="8" r="4.5" fill="hsl(30,46%,74%)" stroke="hsl(26,36%,42%)" strokeWidth="0.8" />
    <path d="M10 13 L18 13 L20 31 L8 31 Z" fill={shirt} stroke="hsl(204,35%,30%)" strokeWidth="0.8" />
    <path d="M10.5 16 L5 28" stroke="hsl(204,35%,30%)" strokeWidth="2" strokeLinecap="round" />
    <path d="M17.5 16 L23 28" stroke="hsl(204,35%,30%)" strokeWidth="2" strokeLinecap="round" />
    <path d="M11 31 L7 50" stroke="hsl(216,28%,36%)" strokeWidth="2.3" strokeLinecap="round" />
    <path d="M17 31 L21 50" stroke="hsl(216,28%,36%)" strokeWidth="2.3" strokeLinecap="round" />
    <path d="M4.5 51 L10.5 51" stroke="hsl(30,18%,18%)" strokeWidth="2" strokeLinecap="round" />
    <path d="M19.5 51 L25.5 51" stroke="hsl(30,18%,18%)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ElevatorCabin = ({
  className = "",
  occupied = false,
}: {
  className?: string;
  occupied?: boolean;
}) => (
  <div className={`absolute left-[18%] right-[18%] h-[14%] ${className}`}>
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
      />
    )}
  </div>
);

const FloorLanding = ({
  top,
  passenger,
}: {
  top: string;
  passenger?: "blue" | "rose" | "group";
}) => (
  <div className="absolute left-[-48%] right-[-72%] z-30 h-[9%]" style={{ top }}>
    <div className="absolute bottom-0 left-0 right-0 h-[28%] bg-[linear-gradient(180deg,#e9ddc6,#c5ae83)] shadow-[0_3px_8px_rgba(70,50,25,0.18)]" />
    <div
      className="absolute left-[8%] right-[4%] bottom-[28%] h-[18%] rounded-sm"
      style={{
        background:
          "linear-gradient(180deg, hsla(190,80%,91%,0.48), hsla(195,58%,70%,0.24))",
        border: "1px solid hsla(190,55%,60%,0.55)",
        boxShadow: "inset 0 1px 10px rgba(255,255,255,0.5)",
      }}
    />
    <div className="absolute left-[8%] right-[4%] bottom-[45%] h-1.5 rounded-full bg-[linear-gradient(180deg,#f7ffff,#87a3aa_70%,#536970)]" />
    {[18, 42, 66, 88].map((left) => (
      <div
        key={left}
        className="absolute bottom-[28%] h-[18%] w-px bg-[linear-gradient(180deg,#ffffff,#77969d)]"
        style={{ left: `${left}%` }}
      />
    ))}
    {/* Group of passengers standing side-by-side, centered under the rail */}
    <div className="absolute bottom-[14%] left-[20%] right-[12%] flex items-end justify-center gap-1">
      <ElevatorPassenger
        className="relative h-11 w-6 md:h-14 md:w-7"
        shirt={passenger === "rose" ? "hsl(344,39%,66%)" : "hsl(213,48%,58%)"}
      />
      <ElevatorPassenger
        className="relative h-11 w-6 md:h-14 md:w-7"
        shirt="hsl(45,60%,55%)"
        flip
      />
      <ElevatorPassenger
        className="relative h-11 w-6 md:h-14 md:w-7"
        shirt={passenger === "blue" ? "hsl(199,42%,60%)" : "hsl(155,40%,50%)"}
      />
    </div>
  </div>
);

const GlassElevatorTower = ({ side }: { side: "left" | "right" }) => (
  <div
    className={`pointer-events-none absolute top-[76px] bottom-[48px] z-[34] hidden w-[7%] md:block ${
      side === "left" ? "left-[0.5%]" : "right-[0.5%]"
    }`}
    aria-hidden="true"
  >
    <FloorLanding top="20%" passenger={side === "left" ? "blue" : "rose"} />
    <FloorLanding top="50%" passenger={side === "right" ? "rose" : "blue"} />
    <FloorLanding top="80%" passenger="blue" />

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
      <ElevatorCabin className="top-[7%]" occupied={side === "left"} />
      <ElevatorCabin className="top-[39%]" occupied={side === "right"} />
      <div className="absolute left-[18%] right-[18%] top-[72%] h-[14%] rounded-sm border border-slate-600/35 bg-slate-100/20 shadow-inner" />
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
