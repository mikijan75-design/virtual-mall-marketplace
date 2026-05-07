import { Fragment, type CSSProperties } from "react";
import type { Floor } from "@/data/mallData";
import StoreCard from "./StoreCard";
import CenterFeature from "./CenterFeature";
import Decorations from "./Decorations";
import GlassElevatorTower from "./elevator/GlassElevatorTower";
import ceilingFresco from "@/assets/ceiling-sunset.jpg";
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


const Dog = ({ className = "", flip = false }: { className?: string; flip?: boolean }) => (
  // Medium-sized white dog with black spots, on a leash held by an adjacent person.
  // Default orientation: dog faces RIGHT, leash rises to the upper-LEFT (to a person standing on the dog's left).
  <svg
    className={`absolute z-40 h-9 w-12 md:h-12 md:w-16 ${className}`}
    viewBox="0 0 60 45"
    style={{ transform: flip ? "scaleX(-1)" : undefined, overflow: "visible" }}
    aria-hidden="true"
  >
    {/* Leash going up-left to the person's hand */}
    <path d="M22 14 Q14 6 4 -2" stroke="hsl(0,60%,40%)" strokeWidth="1.1" fill="none" strokeLinecap="round" />
    {/* Tail */}
    <path d="M10 20 Q4 16 6 10" stroke="hsl(0,0%,98%)" strokeWidth="3.2" fill="none" strokeLinecap="round" />
    <path d="M10 20 Q4 16 6 10" stroke="hsl(0,0%,55%)" strokeWidth="0.6" fill="none" strokeLinecap="round" />
    {/* Body */}
    <ellipse cx="26" cy="26" rx="16" ry="8" fill="hsl(0,0%,98%)" stroke="hsl(0,0%,55%)" strokeWidth="0.7" />
    {/* Black spots on body */}
    <ellipse cx="20" cy="24" rx="3" ry="2.2" fill="hsl(0,0%,10%)" />
    <ellipse cx="30" cy="28" rx="2.4" ry="1.8" fill="hsl(0,0%,10%)" />
    <ellipse cx="34" cy="22" rx="1.6" ry="1.2" fill="hsl(0,0%,10%)" />
    {/* Legs */}
    <rect x="14" y="30" width="2.6" height="9" rx="1" fill="hsl(0,0%,98%)" stroke="hsl(0,0%,55%)" strokeWidth="0.5" />
    <rect x="20" y="30" width="2.6" height="9" rx="1" fill="hsl(0,0%,98%)" stroke="hsl(0,0%,55%)" strokeWidth="0.5" />
    <rect x="32" y="30" width="2.6" height="9" rx="1" fill="hsl(0,0%,98%)" stroke="hsl(0,0%,55%)" strokeWidth="0.5" />
    <rect x="38" y="30" width="2.6" height="9" rx="1" fill="hsl(0,0%,98%)" stroke="hsl(0,0%,55%)" strokeWidth="0.5" />
    {/* Spot on a leg */}
    <rect x="32" y="33" width="2.6" height="3" fill="hsl(0,0%,10%)" />
    {/* Head */}
    <ellipse cx="42" cy="20" rx="8" ry="7" fill="hsl(0,0%,98%)" stroke="hsl(0,0%,55%)" strokeWidth="0.7" />
    {/* Snout */}
    <ellipse cx="49" cy="22" rx="4" ry="3" fill="hsl(0,0%,98%)" stroke="hsl(0,0%,55%)" strokeWidth="0.6" />
    {/* Ear (floppy) */}
    <path d="M38 14 Q35 12 36 20 Q38 19 40 18 Z" fill="hsl(0,0%,10%)" stroke="hsl(0,0%,30%)" strokeWidth="0.4" />
    {/* Eye */}
    <circle cx="44" cy="19" r="0.7" fill="hsl(0,0%,8%)" />
    {/* Nose */}
    <circle cx="52" cy="21.5" r="1.1" fill="hsl(0,0%,8%)" />
    {/* Mouth */}
    <path d="M50 23.5 Q49 24.5 47.5 24" stroke="hsl(0,0%,25%)" strokeWidth="0.4" fill="none" strokeLinecap="round" />
    {/* Spot on head */}
    <ellipse cx="40" cy="22" rx="1.6" ry="1.1" fill="hsl(0,0%,10%)" />
    {/* Collar */}
    <path d="M36 23 Q40 26 44 24" stroke="hsl(0,60%,40%)" strokeWidth="1.4" fill="none" strokeLinecap="round" />
  </svg>
);

const Stroller = ({ className = "", flip = false }: { className?: string; flip?: boolean }) => (
  // Designed in default orientation: handle on the RIGHT side, stroller faces LEFT.
  // When flip=true, handle ends up on the LEFT side and stroller faces RIGHT.
  <svg
    className={`absolute z-40 h-14 w-20 md:h-20 md:w-28 ${className}`}
    viewBox="0 0 100 70"
    style={{ transform: flip ? "scaleX(-1)" : undefined, overflow: "visible" }}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="bassinetGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="hsl(345,60%,72%)" />
        <stop offset="55%" stopColor="hsl(345,58%,52%)" />
        <stop offset="100%" stopColor="hsl(345,55%,32%)" />
      </linearGradient>
      <linearGradient id="canopyGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="hsl(200,70%,72%)" />
        <stop offset="100%" stopColor="hsl(205,60%,38%)" />
      </linearGradient>
      <linearGradient id="frameGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="hsl(0,0%,92%)" />
        <stop offset="50%" stopColor="hsl(220,8%,55%)" />
        <stop offset="100%" stopColor="hsl(220,12%,22%)" />
      </linearGradient>
      <radialGradient id="wheelGrad" cx="38%" cy="38%" r="65%">
        <stop offset="0%" stopColor="hsl(220,10%,38%)" />
        <stop offset="100%" stopColor="hsl(220,18%,8%)" />
      </radialGradient>
      <linearGradient id="blanketGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="hsl(48,85%,94%)" />
        <stop offset="100%" stopColor="hsl(45,55%,78%)" />
      </linearGradient>
    </defs>

    {/* ===== FRAME ===== */}
    {/* Long elegant chrome handle on the RIGHT, sweeping up and over */}
    <path
      d="M86 36 Q94 30 92 22 Q90 16 84 16 L78 16"
      stroke="url(#frameGrad)"
      strokeWidth="2.6"
      fill="none"
      strokeLinecap="round"
    />
    {/* Leather handle grip */}
    <path d="M84 17 L78 17" stroke="hsl(28,55%,28%)" strokeWidth="3.6" strokeLinecap="round" />
    <path d="M84 17 L78 17" stroke="hsl(28,30%,14%)" strokeWidth="0.7" strokeLinecap="round" strokeDasharray="0.9 1.4" />

    {/* Diagonal struts down to wheels */}
    <path d="M78 30 L20 56" stroke="url(#frameGrad)" strokeWidth="2.4" fill="none" strokeLinecap="round" />
    <path d="M30 30 L74 56" stroke="url(#frameGrad)" strokeWidth="2.4" fill="none" strokeLinecap="round" />
    {/* Suspension axle bar */}
    <path d="M22 54 L74 54" stroke="hsl(220,12%,28%)" strokeWidth="1.2" fill="none" strokeLinecap="round" />

    {/* ===== BASSINET — elegant carriage shape ===== */}
    <path
      d="M22 36
         Q22 22 38 20
         L70 20
         Q86 22 80 38
         Q76 44 66 44
         L34 44
         Q24 43 22 36 Z"
      fill="url(#bassinetGrad)"
      stroke="hsl(345,55%,22%)"
      strokeWidth="0.9"
    />
    {/* Highlight ribbon */}
    <path
      d="M26 30 Q40 26 70 28 Q78 30 78 34"
      stroke="hsl(345,80%,88%)"
      strokeWidth="0.9"
      fill="none"
      strokeLinecap="round"
      opacity="0.7"
    />
    {/* Gold trim along the rim */}
    <path
      d="M23 32 Q24 23 38 21.5 L70 21.5 Q82 23 79 33"
      stroke="hsl(43,80%,62%)"
      strokeWidth="1.2"
      fill="none"
      strokeLinecap="round"
    />
    {/* Quilted stitching diamonds */}
    <g stroke="hsl(345,55%,28%)" strokeWidth="0.35" opacity="0.55" fill="none">
      <path d="M32 28 L36 34 M40 27 L44 33 M48 27 L52 33 M56 27 L60 33 M64 28 L68 34" />
      <path d="M36 28 L32 34 M44 27 L40 33 M52 27 L48 33 M60 27 L56 33 M68 28 L64 34" />
    </g>
    {/* Gold emblem */}
    <circle cx="51" cy="38" r="1.8" fill="hsl(43,85%,68%)" stroke="hsl(43,55%,30%)" strokeWidth="0.35" />
    <circle cx="51" cy="38" r="0.7" fill="hsl(43,55%,32%)" />

    {/* ===== CANOPY ===== */}
    <path
      d="M34 20
         Q28 2 54 2
         Q72 4 68 22"
      fill="url(#canopyGrad)"
      stroke="hsl(205,55%,18%)"
      strokeWidth="0.9"
    />
    <path d="M38 16 Q46 6 54 4" stroke="hsl(205,55%,24%)" strokeWidth="0.45" fill="none" />
    <path d="M46 10 Q54 4 62 6" stroke="hsl(205,55%,24%)" strokeWidth="0.45" fill="none" />
    {/* Scalloped fringe */}
    <path
      d="M34 20 Q37 23 40 20 Q43 23 46 20 Q49 23 52 20 Q55 23 58 20 Q61 23 64 20 Q66 21 68 22"
      fill="hsl(43,80%,62%)"
      stroke="hsl(43,55%,28%)"
      strokeWidth="0.4"
    />
    {/* Bow on top */}
    <path d="M48 1 Q50 -2 52 1 Q54 -2 56 1 Q54 3 52 1 Q50 3 48 1 Z" fill="hsl(43,85%,70%)" stroke="hsl(43,55%,30%)" strokeWidth="0.35" />
    <circle cx="52" cy="1" r="0.8" fill="hsl(43,55%,32%)" />

    {/* ===== BABY peeking out ===== */}
    {/* Soft blanket */}
    <path
      d="M34 30 Q46 26 66 30 Q70 32 70 36 Q64 38 56 38 L38 38 Q34 36 34 30 Z"
      fill="url(#blanketGrad)"
      stroke="hsl(45,40%,52%)"
      strokeWidth="0.4"
    />
    <circle cx="42" cy="33" r="0.55" fill="hsl(345,55%,55%)" opacity="0.7" />
    <circle cx="50" cy="35" r="0.55" fill="hsl(205,55%,55%)" opacity="0.7" />
    <circle cx="58" cy="33" r="0.55" fill="hsl(345,55%,55%)" opacity="0.7" />
    {/* Baby head — profile facing left */}
    <path
      d="M40 30
         Q40 22 46 21.5
         Q52 21.5 52.4 26
         Q52.4 28 51.6 29.4
         L52.2 29.6
         Q52.6 30 52.2 30.4
         L51.4 30.6
         Q51 31.2 50.4 31.4
         L45 31.4
         Q41 31 40 30 Z"
      fill="hsl(31,60%,84%)"
      stroke="hsl(25,35%,42%)"
      strokeWidth="0.5"
    />
    <path d="M41.6 26 Q42.2 25.6 42.8 26" stroke="hsl(25,35%,24%)" strokeWidth="0.5" fill="none" strokeLinecap="round" />
    <circle cx="42.2" cy="28" r="0.75" fill="hsl(0,55%,72%)" opacity="0.7" />
    <path d="M40.6 29 Q41.2 29.4 41.8 29.1" stroke="hsl(0,45%,30%)" strokeWidth="0.35" fill="none" strokeLinecap="round" />
    <path d="M44 22.5 Q47 19.5 50 21.5" stroke="hsl(28,40%,26%)" strokeWidth="0.7" fill="none" strokeLinecap="round" />
    {/* Tiny hand */}
    <circle cx="60" cy="28" r="1.1" fill="hsl(31,60%,84%)" stroke="hsl(25,35%,42%)" strokeWidth="0.35" />

    {/* ===== WHEELS ===== */}
    {/* Rear (left) — large */}
    <circle cx="20" cy="58" r="7.5" fill="url(#wheelGrad)" stroke="hsl(220,15%,5%)" strokeWidth="0.7" />
    <circle cx="20" cy="58" r="5.4" fill="none" stroke="hsl(0,0%,42%)" strokeWidth="0.45" />
    <circle cx="20" cy="58" r="2" fill="hsl(0,0%,86%)" stroke="hsl(0,0%,40%)" strokeWidth="0.4" />
    {[0, 30, 60, 90, 120, 150].map((a) => (
      <line
        key={`rsp${a}`}
        x1={20 + Math.cos((a * Math.PI) / 180) * 2}
        y1={58 + Math.sin((a * Math.PI) / 180) * 2}
        x2={20 + Math.cos((a * Math.PI) / 180) * 5.2}
        y2={58 + Math.sin((a * Math.PI) / 180) * 5.2}
        stroke="hsl(0,0%,72%)"
        strokeWidth="0.5"
      />
    ))}
    {[0, 30, 60, 90, 120, 150].map((a) => (
      <line
        key={`rsp2${a}`}
        x1={20 - Math.cos((a * Math.PI) / 180) * 2}
        y1={58 - Math.sin((a * Math.PI) / 180) * 2}
        x2={20 - Math.cos((a * Math.PI) / 180) * 5.2}
        y2={58 - Math.sin((a * Math.PI) / 180) * 5.2}
        stroke="hsl(0,0%,72%)"
        strokeWidth="0.5"
      />
    ))}
    {/* Front (right) — smaller swivel */}
    <circle cx="74" cy="60" r="6" fill="url(#wheelGrad)" stroke="hsl(220,15%,5%)" strokeWidth="0.6" />
    <circle cx="74" cy="60" r="4" fill="none" stroke="hsl(0,0%,42%)" strokeWidth="0.4" />
    <circle cx="74" cy="60" r="1.6" fill="hsl(0,0%,86%)" stroke="hsl(0,0%,40%)" strokeWidth="0.35" />
    {[0, 45, 90, 135].map((a) => (
      <line
        key={`fsp${a}`}
        x1={74 + Math.cos((a * Math.PI) / 180) * 1.5}
        y1={60 + Math.sin((a * Math.PI) / 180) * 1.5}
        x2={74 + Math.cos((a * Math.PI) / 180) * 3.8}
        y2={60 + Math.sin((a * Math.PI) / 180) * 3.8}
        stroke="hsl(0,0%,72%)"
        strokeWidth="0.45"
      />
    ))}
    {[0, 45, 90, 135].map((a) => (
      <line
        key={`fsp2${a}`}
        x1={74 - Math.cos((a * Math.PI) / 180) * 1.5}
        y1={60 - Math.sin((a * Math.PI) / 180) * 1.5}
        x2={74 - Math.cos((a * Math.PI) / 180) * 3.8}
        y2={60 - Math.sin((a * Math.PI) / 180) * 3.8}
        stroke="hsl(0,0%,72%)"
        strokeWidth="0.45"
      />
    ))}
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

        <div className="relative z-20 h-[161px] bg-[#ece2d1] shadow-[0_8px_18px_rgba(75,55,35,0.18)] md:h-[197px]">
          <div
            className="absolute -left-[3%] -right-[3%] -top-[70%] bottom-0 overflow-hidden"
            style={{
              backgroundImage: `url(${ceilingFresco})`,
              backgroundSize: "cover",
              backgroundPosition: "center 58%",
            }}
          />
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
                  {/* Family walking right: dad, mom, child */}
                  <Person className="left-[18%] bottom-2" shirt="hsl(210,40%,42%)" style="shortHair" hair="hsl(28,30%,18%)" />
                  <Person className="left-[22%] bottom-2" shirt="hsl(340,50%,55%)" style="longHair" hair="hsl(25,50%,25%)" bagColor="hsl(0,0%,96%)" />
                  <svg className="absolute left-[25.5%] bottom-2 z-40 h-8 w-5 md:h-11 md:w-6" viewBox="0 0 30 60" aria-hidden="true">
                    {/* Child profile head */}
                    <path d="M11.5 10 Q11.5 5.8 15 5.8 Q19 5.8 19.2 9.6 Q19.4 11 19 12.2 L19.6 12.6 Q20.2 13 19.6 13.4 L18.8 13.6 Q19 14.2 18.4 14.4 L17.6 14.4 Q17.6 15 17.2 15.2 L15.6 15.2 Q14.4 15.2 13.4 14.4 Q11.6 13 11.5 10 Z" fill="hsl(31,45%,72%)" stroke="hsl(25,35%,42%)" strokeWidth="0.7" />
                    <circle cx="17.4" cy="10.4" r="0.55" fill="hsl(220,25%,18%)" />
                    <path d="M16.6 9.3 Q17.4 9 18.1 9.3" stroke="hsl(28,35%,22%)" strokeWidth="0.55" fill="none" strokeLinecap="round" />
                    <path d="M10.7 9.5 Q10 6 15 5.6 Q20 6 19.3 9.5 Q17 7.6 15 7.6 Q13 7.6 10.7 9.5 Z" fill="hsl(28,35%,22%)" stroke="hsl(25,40%,15%)" strokeWidth="0.5" />
                    <path d="M12 15.2 L18 15.2 L19.5 30 L10.5 30 Z" fill="hsl(45,75%,55%)" stroke="hsl(45,50%,32%)" strokeWidth="0.8" />
                    <path d="M12 18 L8 27" stroke="hsl(45,50%,32%)" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M18 18 L22 27" stroke="hsl(45,50%,32%)" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M13 30 L9 48" stroke="hsl(215,25%,38%)" strokeWidth="2" strokeLinecap="round" />
                    <path d="M17 30 L21 48" stroke="hsl(215,25%,38%)" strokeWidth="2" strokeLinecap="round" />
                    <path d="M7 49 L12 49" stroke="hsl(30,18%,18%)" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M19 49 L24 49" stroke="hsl(30,18%,18%)" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                  {/* Two women walking together (toward the left). One pushes the stroller. */}
                  <Person className="right-[20%] bottom-2" flip style="longHair" shirt="hsl(280,45%,55%)" hair="hsl(18,55%,22%)" bagColor="hsl(48,90%,62%)" />
                  <Person className="right-[14%] bottom-2" flip style="longHair" shirt="hsl(170,40%,48%)" hair="hsl(35,60%,42%)" bagColor="hsl(0,0%,96%)" />
                </>
              )}
            </div>
          ))}
        </div>

        <div className="relative z-10 left-0 right-0 -translate-y-2">
          <Decorations />
        </div>
      </div>
    </main>
  );
};

export default CrossSectionMallScene;
