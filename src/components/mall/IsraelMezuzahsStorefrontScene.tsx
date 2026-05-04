import type { CSSProperties, SVGProps } from "react";

type IsraelMezuzahsStorefrontSceneProps = SVGProps<SVGSVGElement>;

const textStyle: CSSProperties = {
  fontFamily: '"Frank Ruhl Libre", Georgia, "Times New Roman", serif',
  fontWeight: 900,
  letterSpacing: "0.03em",
};

const leafPositions = [
  [0, 0],
  [-12, -14],
  [13, -18],
  [-24, 2],
  [26, -2],
  [-18, 18],
  [18, 20],
  [0, 28],
] as const;

const OliveTree = ({ x, flip = false }: { x: number; flip?: boolean }) => (
  <g transform={`translate(${x} 492) ${flip ? "scale(-1 1)" : ""}`} aria-hidden="true">
    <ellipse cx="0" cy="44" rx="56" ry="12" fill="#b57b45" opacity="0.38" />
    <path d="M-56 34 Q0 56 56 34 L45 107 Q0 126 -45 107 Z" fill="#be7b45" />
    <path d="M-48 38 Q0 55 48 38" fill="#d1945a" />
    <path
      d="M-52 34 Q0 57 52 34"
      fill="none"
      stroke="#8b562e"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M-38 72 Q-18 83 0 73 Q22 63 41 76"
      fill="none"
      stroke="#8e582e"
      strokeWidth="5"
      strokeLinecap="round"
      opacity="0.5"
    />
    <path
      d="M-13 36 C-22 -28 20 -56 11 -118 C3 -76 -30 -56 -22 -11 C-15 23 -8 29 -13 36 Z"
      fill="#8c6c48"
      stroke="#5d462e"
      strokeWidth="4"
    />
    <path
      d="M-8 31 C17 -19 55 -19 58 -83 C35 -56 9 -52 0 -20"
      fill="none"
      stroke="#6c5135"
      strokeWidth="8"
      strokeLinecap="round"
    />
    <path
      d="M-20 2 C-58 -30 -42 -68 -70 -110"
      fill="none"
      stroke="#6c5135"
      strokeWidth="7"
      strokeLinecap="round"
    />
    <path
      d="M12 -74 C32 -116 61 -120 78 -160"
      fill="none"
      stroke="#6c5135"
      strokeWidth="6"
      strokeLinecap="round"
    />
    <path
      d="M-30 -40 C-18 -86 -4 -97 -11 -144"
      fill="none"
      stroke="#6c5135"
      strokeWidth="6"
      strokeLinecap="round"
    />
    <g fill="#7f7b55">
      {leafPositions.map(([leafX, leafY], index) => (
        <ellipse
          key={`leaf-cluster-${index}`}
          cx={leafX - 28}
          cy={leafY - 142}
          rx="32"
          ry="12"
          transform={`rotate(${index * 29 - 48} ${leafX - 28} ${leafY - 142})`}
        />
      ))}
      {leafPositions.map(([leafX, leafY], index) => (
        <ellipse
          key={`leaf-cluster-right-${index}`}
          cx={leafX + 35}
          cy={leafY - 156}
          rx="28"
          ry="10"
          transform={`rotate(${index * 31 + 22} ${leafX + 35} ${leafY - 156})`}
        />
      ))}
      {leafPositions.map(([leafX, leafY], index) => (
        <ellipse
          key={`leaf-cluster-top-${index}`}
          cx={leafX}
          cy={leafY - 206}
          rx="31"
          ry="11"
          transform={`rotate(${index * 25 - 10} ${leafX} ${leafY - 206})`}
        />
      ))}
    </g>
    <g fill="#b8ab74" opacity="0.56">
      <ellipse cx="-54" cy="-142" rx="20" ry="6" transform="rotate(-35 -54 -142)" />
      <ellipse cx="45" cy="-186" rx="18" ry="5" transform="rotate(34 45 -186)" />
      <ellipse cx="8" cy="-232" rx="20" ry="5" transform="rotate(-8 8 -232)" />
    </g>
  </g>
);

const Mezuzah = () => (
  <g transform="translate(1258 118)" aria-hidden="true">
    <filter id="israel-mezuzahs-mezuzah-shadow" x="-30%" y="-20%" width="170%" height="150%">
      <feDropShadow dx="18" dy="26" stdDeviation="16" floodColor="#4d3b2b" floodOpacity="0.22" />
      <feDropShadow dx="-4" dy="-4" stdDeviation="6" floodColor="#ffffff" floodOpacity="0.35" />
    </filter>
    <g filter="url(#israel-mezuzahs-mezuzah-shadow)">
      <rect x="0" y="0" width="132" height="548" rx="17" fill="#163f83" />
      <path
        d="M3 2 H129 Q111 60 127 117 Q143 188 96 243 Q58 288 64 351 Q70 433 27 496 Q15 515 4 545 Z"
        fill="#1c4a9a"
      />
      <path
        d="M12 326 C56 260 105 255 122 190 V541 H27 C69 478 58 390 12 326 Z"
        fill="#d8a35b"
      />
      <path
        d="M16 337 C49 315 83 318 119 285 V533 H35 C74 467 58 395 16 337 Z"
        fill="#e8c783"
      />
      <path
        d="M30 382 C62 346 86 348 111 322"
        fill="none"
        stroke="#4f3521"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.78"
      />
      <path
        d="M42 426 C66 402 84 412 103 386"
        fill="none"
        stroke="#5a3c25"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.62"
      />
      <path
        d="M48 486 C72 459 91 466 111 443"
        fill="none"
        stroke="#6b472b"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.54"
      />
      <path
        d="M20 23 C56 10 92 23 116 12 M11 87 C46 71 84 93 124 76 M8 151 C45 132 89 152 124 138 M6 222 C45 201 79 219 120 205"
        fill="none"
        stroke="#416aad"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.56"
      />
      <path
        d="M77 105 C93 139 91 178 74 212 M77 105 L47 146 M75 142 L48 181 M72 184 L44 220"
        fill="none"
        stroke="#e8dac4"
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M77 105 C93 139 91 178 74 212 M77 105 L47 146 M75 142 L48 181 M72 184 L44 220"
        fill="none"
        stroke="#7c654c"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.5"
      />
      <rect
        x="3"
        y="3"
        width="126"
        height="542"
        rx="15"
        fill="none"
        stroke="rgba(255,255,255,0.28)"
        strokeWidth="3"
      />
      <path
        d="M15 6 H61 C44 86 47 171 20 252"
        fill="none"
        stroke="#ffffff"
        strokeWidth="7"
        strokeLinecap="round"
        opacity="0.08"
      />
    </g>
  </g>
);

const IsraelMezuzahsStorefrontScene = ({
  className,
  style,
  ...svgProps
}: IsraelMezuzahsStorefrontSceneProps) => (
  <svg
    aria-label="מזוזות ישראל storefront with olive trees and blue olive wood mezuzah"
    className={className}
    role="img"
    viewBox="0 0 1600 780"
    preserveAspectRatio="xMidYMid slice"
    {...svgProps}
    style={{
      display: "block",
      width: "100%",
      height: "100%",
      direction: "ltr",
      ...style,
    }}
  >
    <defs>
      <filter id="israel-mezuzahs-wall-grain" x="0" y="0" width="100%" height="100%">
        <feTurbulence baseFrequency="0.9" numOctaves="4" seed="19" type="fractalNoise" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.85 0 0 0 0 0.78 0 0 0 0 0.66 0 0 0 0.2 0"
        />
      </filter>
      <radialGradient id="israel-mezuzahs-wall-light" cx="45%" cy="38%" r="70%">
        <stop offset="0%" stopColor="#fffaf0" />
        <stop offset="58%" stopColor="#f7f0e4" />
        <stop offset="100%" stopColor="#eadfce" />
      </radialGradient>
      <linearGradient id="israel-mezuzahs-column" x1="0" x2="1">
        <stop offset="0%" stopColor="#e9ddcb" />
        <stop offset="35%" stopColor="#fbf7ef" />
        <stop offset="100%" stopColor="#c9bba7" />
      </linearGradient>
      <linearGradient id="israel-mezuzahs-gold-text" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="#d8c083" />
        <stop offset="48%" stopColor="#b89f67" />
        <stop offset="100%" stopColor="#99824f" />
      </linearGradient>
      <filter id="israel-mezuzahs-text-shadow" x="-10%" y="-10%" width="120%" height="130%">
        <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#b8a06f" floodOpacity="0.16" />
      </filter>
    </defs>

    <rect width="1600" height="780" fill="url(#israel-mezuzahs-wall-light)" />
    <rect width="1600" height="780" filter="url(#israel-mezuzahs-wall-grain)" opacity="0.62" />
    <rect width="1600" height="780" fill="rgba(255,255,255,0.28)" />
    <rect x="0" y="690" width="1600" height="90" fill="#eadfce" opacity="0.52" />
    <rect x="1197" y="0" width="172" height="780" fill="url(#israel-mezuzahs-column)" />
    <rect x="1196" y="0" width="5" height="780" fill="#d4c3ad" />
    <rect x="1364" y="0" width="7" height="780" fill="#b4a18c" opacity="0.62" />
    <rect x="1371" y="0" width="36" height="780" fill="rgba(100,75,55,0.08)" />

    <OliveTree x={76} />
    <OliveTree x={1536} flip />

    <g
      direction="rtl"
      filter="url(#israel-mezuzahs-text-shadow)"
      style={{ unicodeBidi: "bidi-override" } as CSSProperties}
    >
      <text
        x="792"
        y="326"
        textAnchor="middle"
        style={{ ...textStyle, fontSize: 210 } as CSSProperties}
        fill="url(#israel-mezuzahs-gold-text)"
      >
        מזוזות
      </text>
      <text
        x="789"
        y="577"
        textAnchor="middle"
        style={{ ...textStyle, fontSize: 205 } as CSSProperties}
        fill="url(#israel-mezuzahs-gold-text)"
      >
        ישראל
      </text>
    </g>

    <Mezuzah />
    <rect width="1600" height="780" fill="url(#israel-mezuzahs-wall-light)" opacity="0.08" />
  </svg>
);

export default IsraelMezuzahsStorefrontScene;
