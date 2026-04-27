import { Fragment } from "react";
import type { Floor } from "@/data/mallData";
import StoreCard from "./StoreCard";
import CenterFeature from "./CenterFeature";
import Decorations from "./Decorations";
import ceilingFresco from "@/assets/ceiling-fresco.jpg";
import mallWall from "@/assets/mall-wall.jpg";
import marbleFloor from "@/assets/marble-floor.jpg";

interface CrossSectionMallSceneProps {
  floors: Floor[];
}

const glassStyle = {
  background:
    "linear-gradient(120deg, hsla(190,70%,88%,0.34), hsla(192,60%,78%,0.16) 45%, hsla(185,70%,94%,0.42))",
  border: "2px solid hsla(190,45%,46%,0.45)",
  boxShadow:
    "inset 0 0 22px hsla(190,80%,96%,0.48), 0 6px 20px rgba(20,50,60,0.16)",
} as const;

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

const ElevatorTower = ({ side }: { side: "left" | "right" }) => (
  <div
    className={`absolute top-[15.5%] z-30 hidden h-[70%] w-[8%] md:block ${
      side === "left" ? "left-[16%]" : "right-[16%]"
    }`}
    style={glassStyle}
  >
    <div className="absolute inset-x-[18%] top-[8%] h-[18%] rounded-sm border border-slate-600/40 bg-slate-200/35 shadow-inner" />
    <div className="absolute inset-x-[18%] top-[39%] h-[18%] rounded-sm border border-slate-600/40 bg-slate-200/30 shadow-inner" />
    <div className="absolute inset-x-[18%] top-[70%] h-[18%] rounded-sm border border-slate-600/40 bg-slate-200/35 shadow-inner" />
    <div className="absolute left-1/2 top-0 h-full w-px bg-white/55" />
    <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,transparent_35%,rgba(255,255,255,0.55)_42%,transparent_55%,transparent_100%)]" />
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

const floorPositions = ["top-[16.5%]", "top-[44.5%]", "top-[72.5%]"];

const SceneFloor = ({ floor, index }: { floor: Floor; index: number }) => (
  <section id={`floor-${floor.id}`} className={`absolute left-0 right-0 h-[26%] ${floorPositions[index]}`}>
    <MarbleSlab className="top-0 h-[16%]" />
    <MarbleSlab className="bottom-0 h-[18%]" />
    <FloorLabel>{floor.name}</FloorLabel>

    <div className="absolute left-[24.5%] right-[24.5%] top-[21%] z-30">
      <div className="grid grid-cols-3 gap-2 md:grid-cols-7 md:gap-3">
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
        className="relative mx-auto aspect-[2.12/1] w-full max-w-[1280px] overflow-hidden border-y border-[#c9b98e] shadow-2xl"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.62), rgba(255,255,255,0.62)), url(${mallWall})`,
          backgroundSize: "420px 420px",
        }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.45)_0_1px,transparent_1px_8.3%),linear-gradient(0deg,rgba(185,170,145,0.22)_0_1px,transparent_1px_8.3%)] opacity-45" />

        <div className="absolute left-0 right-0 top-0 z-20 h-[17%] bg-[#ece2d1] shadow-[0_8px_18px_rgba(75,55,35,0.18)]">
          <div
            className="absolute -left-[2%] -right-[2%] -top-[70%] h-[168%] overflow-hidden rounded-b-[50%] border-[3px] border-[#b8944d]"
            style={{
              backgroundImage: `url(${ceilingFresco})`,
              backgroundSize: "cover",
              backgroundPosition: "center 42%",
              boxShadow: "inset 0 -16px 34px rgba(90,60,25,0.2), 0 3px 9px rgba(0,0,0,0.18)",
            }}
          />
          <div className="absolute bottom-0 h-3 w-full bg-gradient-to-b from-[#d9c17a] via-[#9f7d36] to-[#d9c17a]" />
        </div>

        <ElevatorTower side="left" />
        <ElevatorTower side="right" />
        <Escalator className="left-[1%] top-[30%] h-[17%] w-[23%]" />
        <Escalator className="left-[1%] top-[57.5%] h-[17%] w-[23%]" reverse />
        <Escalator className="right-[1%] top-[30%] h-[17%] w-[23%]" reverse />
        <Escalator className="right-[1%] top-[57.5%] h-[17%] w-[23%]" />

        {displayFloors.map((floor, index) => (
          <SceneFloor key={floor.id} floor={floor} index={index} />
        ))}

        <InfoSign className="left-[11%] top-[28%]" />
        <InfoSign className="left-[1.5%] bottom-[13%]" />
        <RestroomSign className="right-[6%] top-[28%]" />
        <RestroomSign className="left-[3.5%] bottom-[13%]" />

        <Person className="left-[6.5%] top-[20%]" />
        <Person className="left-[20%] top-[27%]" shirt="hsl(30,55%,68%)" flip />
        <Person className="right-[8%] top-[20%]" flip />
        <Person className="left-[1.5%] top-[51%]" shirt="hsl(213,48%,58%)" />
        <Person className="right-[15%] top-[51%]" shirt="hsl(192,45%,62%)" flip />
        <Person className="left-[24%] bottom-[12%]" shirt="hsl(205,55%,58%)" />
        <Person className="right-[25%] bottom-[12%]" shirt="hsl(205,55%,58%)" flip />
        <Person className="right-[5%] bottom-[23%]" shirt="hsl(332,35%,68%)" flip />

        <div className="absolute bottom-0 left-0 right-0 z-30">
          <Decorations />
        </div>
      </div>
    </main>
  );
};

export default CrossSectionMallScene;
