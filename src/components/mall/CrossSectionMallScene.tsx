import { Fragment, type CSSProperties } from "react";
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

type PersonStyle = "longHair" | "shortHair" | "hat" | "cane" | "bag" | "plain";

const Person = ({
  className = "",
  shirt = "hsl(203,45%,62%)",
  flip = false,
  style = "shortHair",
  hair = "hsl(28,35%,22%)",
  bagColor,
}: {
  className?: string;
  shirt?: string;
  flip?: boolean;
  style?: PersonStyle;
  hair?: string;
  bagColor?: string;
}) => {
  const isFemale = style === "longHair";
  // Women always carry a shopping bag; men only when style === "bag"
  const showBag = style === "bag" || isFemale;
  const resolvedBagColor =
    bagColor ?? (isFemale ? "hsl(0,0%,96%)" : "hsl(345,55%,45%)");
  const bagStroke = isFemale ? "hsl(0,0%,55%)" : "hsl(345,40%,25%)";
  return (
    <svg
      className={`absolute z-40 h-12 w-7 md:h-16 md:w-9 ${className}`}
      viewBox="0 0 30 60"
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
      aria-hidden="true"
    >
      {/* === PROFILE HEAD (looking right; flip prop mirrors entire SVG) === */}
      {/* Long hair flows down the back of the head (drawn first) */}
      {isFemale && (
        <path
          d="M14 4 Q9 4 9 9 Q8 14 9 19 Q8 25 10.5 30 L13 30 L13 12 Q13 8 15 7 Z"
          fill={hair}
          stroke="hsl(25,40%,15%)"
          strokeWidth="0.5"
        />
      )}

      {/* Profile head silhouette: rounded skull + brow + nose + lips + chin */}
      <path
        d="M11.5 8
           Q11.5 3.8 15 3.8
           Q19 3.8 19.2 7.6
           Q19.4 9 19 10.2
           L19.6 10.6
           Q20.2 11 19.6 11.4
           L18.8 11.6
           Q19 12.2 18.4 12.4
           L17.6 12.4
           Q17.6 13 17.2 13.2
           L15.6 13.2
           Q14.4 13.2 13.4 12.4
           Q11.6 11 11.5 8 Z"
        fill="hsl(31,45%,72%)"
        stroke="hsl(25,35%,42%)"
        strokeWidth="0.7"
      />

      {/* Ear */}
      <path
        d="M13.4 8.6 Q12.6 8.6 12.7 9.6 Q12.8 10.4 13.6 10.5 Z"
        fill="hsl(28,40%,64%)"
        stroke="hsl(25,35%,42%)"
        strokeWidth="0.4"
      />
      <path d="M13.1 9.5 Q13.4 9.6 13.4 10" stroke="hsl(25,35%,38%)" strokeWidth="0.3" fill="none" />

      {/* Eye (looking right/forward) */}
      <circle cx="17.4" cy="8.4" r="0.55" fill="hsl(220,25%,18%)" />
      <path d="M16.7 8 Q17.4 7.6 18 8" stroke="hsl(25,40%,28%)" strokeWidth="0.35" fill="none" strokeLinecap="round" />

      {/* Eyebrow */}
      <path d="M16.6 7.3 Q17.4 7 18.1 7.3" stroke={hair} strokeWidth="0.55" fill="none" strokeLinecap="round" />

      {/* Mouth */}
      <path d="M17.6 11.4 Q18.2 11.6 18.6 11.3" stroke="hsl(0,45%,32%)" strokeWidth="0.4" fill="none" strokeLinecap="round" />

      {/* Short hair (profile cap covering top + back) */}
      {style === "shortHair" && (
        <path
          d="M11.5 8 Q11.4 4 15 3.6 Q19 4 19.4 8 Q19 6 17 5.6 Q14 5.4 12.4 6.6 Q11.6 7.4 11.5 8 Z"
          fill={hair}
          stroke="hsl(25,40%,15%)"
          strokeWidth="0.5"
        />
      )}

      {/* Hat (fedora-ish, profile) */}
      {style === "hat" && (
        <>
          <ellipse cx="15" cy="6.4" rx="6" ry="1.1" fill="hsl(28,35%,22%)" stroke="hsl(25,40%,12%)" strokeWidth="0.5" />
          <path d="M12 6.4 Q12 2.8 15 2.6 Q18 2.8 18 6.4 Z" fill="hsl(28,35%,22%)" stroke="hsl(25,40%,12%)" strokeWidth="0.5" />
          <rect x="12" y="5.6" width="6" height="0.9" fill="hsl(43,55%,45%)" opacity="0.85" />
        </>
      )}

      {/* Female top-of-head hair cap */}
      {isFemale && (
        <path
          d="M11.6 7.6 Q11.5 4 15 3.8 Q18.6 4 19 7 Q18 5.6 15.6 5.6 Q12.8 5.6 11.6 7.6 Z"
          fill={hair}
          stroke="hsl(25,40%,15%)"
          strokeWidth="0.4"
        />
      )}

      {/* Body / shirt — flared bottom for female silhouette (skirt) */}
      {isFemale ? (
        <path d="M11 13 L19 13 L23 32 L7 32 Z" fill={shirt} stroke="hsl(205,35%,32%)" strokeWidth="0.8" />
      ) : (
        <path d="M11 13 L19 13 L21 31 L9 31 Z" fill={shirt} stroke="hsl(205,35%,32%)" strokeWidth="0.8" />
      )}

      {/* Arms */}
      <path d="M11 16 L5 27" stroke="hsl(205,35%,32%)" strokeWidth="2" strokeLinecap="round" />
      <path d="M19 16 L25 27" stroke="hsl(205,35%,32%)" strokeWidth="2" strokeLinecap="round" />

      {/* Legs (or skirt bottom for female) */}
      {isFemale ? (
        <>
          <path d="M12 32 L9 51" stroke="hsl(215,25%,38%)" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M18 32 L21 51" stroke="hsl(215,25%,38%)" strokeWidth="2.2" strokeLinecap="round" />
        </>
      ) : (
        <>
          <path d="M12 31 L7 51" stroke="hsl(215,25%,38%)" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M18 31 L23 51" stroke="hsl(215,25%,38%)" strokeWidth="2.4" strokeLinecap="round" />
        </>
      )}

      {/* Feet */}
      <path d="M5 52 L11 52" stroke="hsl(30,18%,18%)" strokeWidth="2" strokeLinecap="round" />
      <path d="M21 52 L27 52" stroke="hsl(30,18%,18%)" strokeWidth="2" strokeLinecap="round" />

      {/* Walking cane (right hand) */}
      {style === "cane" && (
        <>
          <path d="M25 27 L27 53" stroke="hsl(28,55%,32%)" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M25 27 Q26.5 25.5 27.5 27.5" stroke="hsl(28,55%,32%)" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        </>
      )}

      {/* Shopping bag (right hand) */}
      {showBag && (
        <>
          <path d="M22.5 28 Q25 26 27.5 28" stroke="hsl(0,0%,15%)" strokeWidth="0.8" fill="none" />
          <rect x="22" y="28" width="6" height="8" fill={resolvedBagColor} stroke={bagStroke} strokeWidth="0.6" />
          <rect x="23" y="30" width="4" height="0.6" fill="hsl(43,70%,55%)" opacity="0.7" />
        </>
      )}
    </svg>
  );
};


const Stroller = ({ className = "", flip = false }: { className?: string; flip?: boolean }) => (
  <svg
    className={`absolute z-40 h-12 w-14 md:h-16 md:w-20 ${className}`}
    viewBox="0 0 60 60"
    style={{ transform: flip ? "scaleX(-1)" : undefined }}
    aria-hidden="true"
  >
    {/* Handle */}
    <path d="M6 18 Q4 16 6 14 L14 14" stroke="hsl(220,18%,28%)" strokeWidth="2" fill="none" strokeLinecap="round" />
    {/* Frame down to wheels */}
    <path d="M14 14 L40 14 L46 42" stroke="hsl(220,18%,28%)" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M14 14 L18 42" stroke="hsl(220,18%,28%)" strokeWidth="2" fill="none" strokeLinecap="round" />
    {/* Bassinet body */}
    <path
      d="M14 14 Q14 30 22 32 L40 32 Q46 30 44 16 Q44 12 40 14 Z"
      fill="hsl(345,45%,58%)"
      stroke="hsl(345,40%,30%)"
      strokeWidth="0.7"
    />
    {/* Canopy / sun shade */}
    <path
      d="M22 14 Q22 4 36 6 Q44 8 42 16"
      fill="hsl(195,55%,55%)"
      stroke="hsl(195,40%,28%)"
      strokeWidth="0.7"
    />
    {/* Baby head peeking */}
    <circle cx="32" cy="20" r="3.4" fill="hsl(31,52%,80%)" stroke="hsl(25,35%,45%)" strokeWidth="0.5" />
    <circle cx="33.4" cy="20" r="0.5" fill="hsl(220,25%,18%)" />
    <path d="M32.6 21.4 Q33.2 21.6 33.8 21.3" stroke="hsl(0,45%,32%)" strokeWidth="0.3" fill="none" strokeLinecap="round" />
    {/* Tiny tuft of hair */}
    <path d="M30.4 18.4 Q31.4 17.4 32.6 17.6" stroke="hsl(28,40%,28%)" strokeWidth="0.55" fill="none" strokeLinecap="round" />
    {/* Wheels */}
    <circle cx="18" cy="46" r="5" fill="hsl(220,15%,18%)" stroke="hsl(220,12%,8%)" strokeWidth="0.6" />
    <circle cx="18" cy="46" r="1.4" fill="hsl(0,0%,72%)" />
    <circle cx="46" cy="46" r="5" fill="hsl(220,15%,18%)" stroke="hsl(220,12%,8%)" strokeWidth="0.6" />
    <circle cx="46" cy="46" r="1.4" fill="hsl(0,0%,72%)" />
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
    {floor.id !== 1 && <GlassGuardRail />}

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
                  <Person className="left-[26%] bottom-9" style="longHair" shirt="hsl(345,55%,58%)" hair="hsl(28,55%,30%)" bagColor="hsl(0,0%,96%)" />
                  <Person className="right-[28%] bottom-9" flip style="hat" shirt="hsl(215,35%,38%)" />
                  <Person className="left-[44%] bottom-9" shirt="hsl(15,55%,55%)" style="bag" />
                </>
              )}
              {index === 1 && (
                <>
                  <Person className="left-[22%] bottom-9" shirt="hsl(213,48%,58%)" style="shortHair" />
                  <Person className="right-[24%] bottom-9" shirt="hsl(192,45%,62%)" flip style="cane" hair="hsl(0,0%,82%)" />
                  <Person className="left-[48%] bottom-9" shirt="hsl(280,40%,58%)" style="longHair" hair="hsl(38,65%,55%)" bagColor="hsl(48,90%,62%)" />
                </>
              )}
              {index === 2 && (
                <>
                  <Person className="left-[28%] bottom-9" shirt="hsl(205,55%,58%)" style="hat" />
                  <Person className="right-[30%] bottom-9" shirt="hsl(155,40%,50%)" flip style="bag" />
                  <Person className="left-[50%] bottom-9" shirt="hsl(332,55%,62%)" style="longHair" hair="hsl(20,45%,18%)" bagColor="hsl(48,90%,62%)" />
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
