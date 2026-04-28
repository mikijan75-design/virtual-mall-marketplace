import { Fragment } from "react";
import type { Floor } from "@/data/mallData";
import StoreCard from "./StoreCard";
import CenterFeature from "./CenterFeature";
import Decorations from "./Decorations";
import GlassElevatorTower from "./elevator/GlassElevatorTower";
import ceilingFresco from "@/assets/ceiling-fresco.jpg";
import mallWall from "@/assets/mall-wall.jpg";
import marbleFloor from "@/assets/marble-floor.jpg";

interface CrossSectionMallSceneProps {
  floors: Floor[];
}

const Person = ({
  className = "",
  shirt = "hsl(203,45%,62%)",
  flip = false,
}: {
  className?: string;
  shirt?: string;
  flip?: boolean;
}) => (
  <svg
    className={`absolute z-40 h-12 w-7 md:h-16 md:w-9 ${className}`}
    viewBox="0 0 30 60"
    style={{ transform: flip ? "scaleX(-1)" : undefined }}
    aria-hidden="true"
  >
    <circle cx="15" cy="8" r="4.5" fill="hsl(31,45%,72%)" stroke="hsl(25,35%,42%)" strokeWidth="0.8" />
    <path d="M11 13 L19 13 L21 31 L9 31 Z" fill={shirt} stroke="hsl(205,35%,32%)" strokeWidth="0.8" />
    <path d="M11 16 L5 27" stroke="hsl(205,35%,32%)" strokeWidth="2" strokeLinecap="round" />
    <path d="M19 16 L25 27" stroke="hsl(205,35%,32%)" strokeWidth="2" strokeLinecap="round" />
    <path d="M12 31 L7 51" stroke="hsl(215,25%,38%)" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M18 31 L23 51" stroke="hsl(215,25%,38%)" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M5 52 L11 52" stroke="hsl(30,18%,18%)" strokeWidth="2" strokeLinecap="round" />
    <path d="M21 52 L27 52" stroke="hsl(30,18%,18%)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const InfoSign = ({ className = "" }: { className?: string }) => (
  <div
    className={`absolute z-30 flex h-10 w-10 items-center justify-center rounded-md border text-xl font-black text-white shadow-lg ${className}`}
    style={{
      background: "linear-gradient(180deg, hsl(205,18%,38%), hsl(205,20%,22%))",
      borderColor: "hsla(45,35%,88%,0.45)",
    }}
  >
    i
  </div>
);

const RestroomSign = ({ className = "" }: { className?: string }) => (
  <div
    className={`absolute z-30 flex h-10 w-12 items-center justify-center gap-1 rounded-md border text-white shadow-lg ${className}`}
    style={{
      background: "linear-gradient(180deg, hsl(205,18%,38%), hsl(205,20%,22%))",
      borderColor: "hsla(45,35%,88%,0.45)",
    }}
  >
    <span className="text-base">♀</span>
    <span className="text-base">♂</span>
  </div>
);

const DownlightRow = ({ className = "" }: { className?: string }) => (
  <div className={`absolute left-0 right-0 z-30 hidden justify-around px-14 md:flex ${className}`} aria-hidden="true">
    {Array.from({ length: 12 }, (_, index) => (
      <div key={index} className="relative h-3 w-3 rounded-full bg-white shadow-[0_0_14px_rgba(255,244,210,0.95)]">
        <div className="absolute left-1/2 top-2 h-12 w-20 -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(255,238,190,0.35),transparent_68%)]" />
      </div>
    ))}
  </div>
);

const MarbleWallPanels = () => (
  <div className="pointer-events-none absolute inset-0 z-0 hidden md:block" aria-hidden="true">
    {Array.from({ length: 12 }, (_, index) => (
      <div
        key={index}
        className="absolute top-[110px] bottom-[40px] border-x border-white/45"
        style={{
          left: `${index * 8.33}%`,
          width: "8.33%",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.22), transparent 18%, transparent 78%, rgba(170,145,110,0.12))",
        }}
      />
    ))}
  </div>
);

const GlassGuardRail = () => (
  <div className="pointer-events-none absolute bottom-3 left-[3%] right-[3%] z-[90] hidden h-12 md:block" aria-hidden="true">
    <div
      className="absolute inset-0 overflow-hidden rounded-sm"
      style={{
        background:
          "linear-gradient(180deg, hsla(190,80%,92%,0.46), hsla(193,58%,70%,0.22))",
        border: "1px solid hsla(190,55%,62%,0.58)",
        boxShadow:
          "inset 0 1px 10px hsla(190,100%,96%,0.58), inset 0 -2px 8px hsla(190,60%,42%,0.18), 0 4px 12px rgba(45,75,82,0.14)",
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(112deg,transparent_0%,transparent_38%,rgba(255,255,255,0.6)_44%,transparent_52%,transparent_100%)]" />
    </div>
    <div className="absolute -top-1 left-0 right-0 h-2 rounded-full bg-[linear-gradient(180deg,#f9ffff,#90aab0_65%,#5b7075)] shadow-[0_2px_5px_rgba(0,0,0,0.28)]" />
    {[8, 22, 36, 50, 64, 78, 92].map((left) => (
      <div
        key={left}
        className="absolute top-0 bottom-0 w-px bg-[linear-gradient(180deg,#ffffff,#86a3aa)] shadow-[0_0_4px_rgba(255,255,255,0.6)]"
        style={{ left: `${left}%` }}
      />
    ))}
  </div>
);

const ElevatorRailConnector = ({ side }: { side: "left" | "right" }) => {
  // Bridges from the elevator landing rail (outer edge) to the floor's GlassGuardRail (inner edge),
  // with a slight slant downward toward the mall center for a natural transition.
  const positionClass =
    side === "left"
      ? "left-[3%] w-[7.5%] origin-right -skew-y-[10deg]"
      : "right-[3%] w-[7.5%] origin-left skew-y-[10deg]";
  return (
    <div
      className={`pointer-events-none absolute bottom-3 z-[92] hidden h-12 md:block ${positionClass}`}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 overflow-hidden rounded-sm"
        style={{
          background:
            "linear-gradient(180deg, hsla(190,80%,92%,0.46), hsla(193,58%,70%,0.22))",
          border: "1px solid hsla(190,55%,62%,0.58)",
          boxShadow:
            "inset 0 1px 10px hsla(190,100%,96%,0.58), inset 0 -2px 8px hsla(190,60%,42%,0.18), 0 4px 12px rgba(45,75,82,0.14)",
        }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(112deg,transparent_0%,transparent_38%,rgba(255,255,255,0.6)_44%,transparent_52%,transparent_100%)]" />
      </div>
      <div className="absolute -top-1 left-0 right-0 h-2 rounded-full bg-[linear-gradient(180deg,#f9ffff,#90aab0_65%,#5b7075)] shadow-[0_2px_5px_rgba(0,0,0,0.28)]" />
      {[15, 50, 85].map((left) => (
        <div
          key={left}
          className="absolute top-0 bottom-0 w-px bg-[linear-gradient(180deg,#ffffff,#86a3aa)] shadow-[0_0_4px_rgba(255,255,255,0.6)]"
          style={{ left: `${left}%` }}
        />
      ))}
    </div>
  );
};

const FloorLightSpots = () => (
  <div className="pointer-events-none absolute inset-x-[7%] top-9 z-20 hidden justify-between md:flex" aria-hidden="true">
    {Array.from({ length: 7 }, (_, index) => (
      <div
        key={index}
        className="h-16 w-24 rounded-full bg-[radial-gradient(ellipse_at_top,rgba(255,239,190,0.26),transparent_70%)]"
      />
    ))}
  </div>
);

const Escalator = ({
  className,
  reverse = false,
}: {
  className: string;
  reverse?: boolean;
}) => {
  const railId = `rail-${reverse ? "r" : "l"}`;

  return (
    <svg className={`absolute z-20 hidden md:block ${className}`} viewBox="0 0 250 130" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={railId} x1="0" x2="1">
          <stop offset="0%" stopColor="hsl(193,28%,44%)" />
          <stop offset="50%" stopColor="hsl(190,35%,74%)" />
          <stop offset="100%" stopColor="hsl(193,28%,44%)" />
        </linearGradient>
      </defs>
      <g transform={reverse ? "translate(250 0) scale(-1 1)" : undefined}>
        <path d="M12 104 H48 L190 28 H236" fill="none" stroke="hsl(195,28%,36%)" strokeWidth="18" strokeLinecap="round" opacity="0.85" />
        <path d="M12 104 H48 L190 28 H236" fill="none" stroke={`url(#${railId})`} strokeWidth="11" strokeLinecap="round" />
        <path d="M16 88 H43 L184 13 H232" fill="none" stroke="hsl(195,25%,25%)" strokeWidth="4" strokeLinecap="round" />
        <path d="M17 87 H43 L184 12 H232" fill="none" stroke="hsl(190,45%,78%)" strokeWidth="2" strokeLinecap="round" />
        {Array.from({ length: 8 }, (_, i) => (
          <path
            key={i}
            d={`M${65 + i * 17} ${90 - i * 9} l14 -7`}
            stroke="hsl(35,20%,64%)"
            strokeWidth="2"
            opacity="0.7"
          />
        ))}
      </g>
    </svg>
  );
};

const FloorLabel = ({ children }: { children: string }) => (
  <div className="absolute left-1/2 top-2 z-40 -translate-x-1/2">
    <div
      className="rounded-md px-5 py-1.5 text-center font-frank text-xs font-bold tracking-wide text-mall-gold shadow-lg md:text-sm"
      style={{
        background: "linear-gradient(135deg, hsl(220,20%,14%), hsl(220,18%,20%))",
        border: "1px solid hsl(43,50%,35%)",
      }}
    >
      {children}
    </div>
  </div>
);

const MarbleSlab = ({ className = "" }: { className?: string }) => (
  <div
    className={`absolute left-0 right-0 z-10 ${className}`}
    style={{
      backgroundImage: `url(${marbleFloor})`,
      backgroundSize: "260px 260px",
      boxShadow:
        "inset 0 3px 10px rgba(255,255,255,0.38), inset 0 -3px 9px rgba(65,55,45,0.12), 0 2px 9px rgba(0,0,0,0.13)",
    }}
  />
);

const SceneFloor = ({ floor }: { floor: Floor }) => (
  <section id={`floor-${floor.id}`} className="relative min-h-[235px] w-full md:min-h-[285px]">
    {/* Top marble strip (ceiling of this floor) */}
    <MarbleSlab className="top-0 h-8 md:h-10" />
    {/* Bottom marble strip (floor surface) */}
    <MarbleSlab className="bottom-0 h-9 md:h-12" />
    {/* Marble walkway between guard rail and shops */}
    <div
      className="absolute left-[3%] right-[3%] bottom-[84px] z-[25] h-7 md:h-9"
      style={{
        backgroundImage: `url(${marbleFloor})`,
        backgroundSize: "240px 240px",
        boxShadow:
          "inset 0 2px 6px rgba(255,255,255,0.42), inset 0 -2px 6px rgba(70,55,40,0.18), 0 3px 8px rgba(0,0,0,0.18)",
        borderTop: "1px solid rgba(255,255,255,0.55)",
        borderBottom: "1px solid rgba(120,100,75,0.35)",
      }}
      aria-hidden="true"
    />
    <FloorLabel>{floor.name}</FloorLabel>
    <FloorLightSpots />
    <GlassGuardRail />
    <ElevatorRailConnector side="left" />
    <ElevatorRailConnector side="right" />

    <div className="relative z-30 mx-auto w-full max-w-5xl px-2 pb-16 pt-14 md:pt-16">
      <div className="grid grid-cols-3 gap-3 md:grid-cols-7 md:gap-4">
        {floor.stores.map((store, storeIndex) => (
          <Fragment key={store.id}>
            {storeIndex === 3 && <CenterFeature floorId={floor.id} />}
            <div className="relative">
              <StoreCard store={store} storeIndex={storeIndex} />
              {(storeIndex === 1 || storeIndex === 4) && (
                <div
                  className="absolute -right-2 bottom-2 z-40 hidden h-10 w-8 rounded-t-full md:block"
                  style={{
                    background:
                      "radial-gradient(circle at 35% 20%, hsl(95,60%,56%), hsl(125,48%,29%) 70%)",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.28)",
                  }}
                />
              )}
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  </section>
);

const CrossSectionMallScene = ({ floors }: CrossSectionMallSceneProps) => {
  const displayFloors = [...floors].reverse();

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#efe7d8] py-3 font-heebo">
      <div
        className="relative mx-auto w-full max-w-[1360px] overflow-hidden border-y border-[#c9b98e] shadow-2xl"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.58), rgba(255,255,255,0.58)), url(${mallWall})`,
          backgroundSize: "420px 420px",
        }}
      >
        <MarbleWallPanels />

        <div className="relative z-20 h-[86px] bg-[#ece2d1] shadow-[0_8px_18px_rgba(75,55,35,0.18)] md:h-[122px]">
          <div
            className="absolute -left-[3%] -right-[3%] -top-[70%] h-[178%] overflow-hidden rounded-b-[50%] border-[4px] border-[#b8944d]"
            style={{
              backgroundImage: `url(${ceilingFresco})`,
              backgroundSize: "cover",
              backgroundPosition: "center 42%",
              boxShadow: "inset 0 -18px 34px rgba(90,60,25,0.2), inset 0 0 0 8px rgba(246,224,166,0.18), 0 3px 9px rgba(0,0,0,0.18)",
            }}
          />
          <DownlightRow className="bottom-4" />
          <div className="absolute bottom-0 h-3 w-full bg-gradient-to-b from-[#d9c17a] via-[#9f7d36] to-[#d9c17a]" />
        </div>

        <GlassElevatorTower side="left" />
        <GlassElevatorTower side="right" />

        <div className="relative z-10 flex flex-col">
          {displayFloors.map((floor, index) => (
            <div key={floor.id} className="relative">
              <SceneFloor floor={floor} />
              {/* Per-floor signs */}
              {index === 0 && (
                <>
                  <InfoSign className="left-[18%] top-1/2 -translate-y-1/2" />
                  <RestroomSign className="right-[14%] top-1/2 -translate-y-1/2" />
                  <Person className="left-[26%] bottom-9" />
                  <Person className="right-[28%] bottom-9" flip />
                  <Person className="left-[44%] bottom-9" shirt="hsl(15,55%,55%)" />
                </>
              )}
              {index === 1 && (
                <>
                  <Person className="left-[22%] bottom-9" shirt="hsl(213,48%,58%)" />
                  <Person className="right-[24%] bottom-9" shirt="hsl(192,45%,62%)" flip />
                  <Person className="left-[48%] bottom-9" shirt="hsl(45,60%,55%)" />
                </>
              )}
              {index === 2 && (
                <>
                  <InfoSign className="left-[10%] bottom-4" />
                  <RestroomSign className="left-[12%] top-4" />
                  <Person className="left-[28%] bottom-9" shirt="hsl(205,55%,58%)" />
                  <Person className="right-[30%] bottom-9" shirt="hsl(205,55%,58%)" flip />
                  <Person className="left-[50%] bottom-9" shirt="hsl(332,35%,68%)" />
                </>
              )}
            </div>
          ))}
        </div>

        <div className="relative z-10 left-0 right-0 translate-y-[33px]">
          <Decorations />
        </div>
      </div>
    </main>
  );
};

export default CrossSectionMallScene;
