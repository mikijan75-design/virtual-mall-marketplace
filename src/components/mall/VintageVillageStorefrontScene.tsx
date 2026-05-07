import type { SVGProps } from "react";

type VintageVillageStorefrontSceneProps = SVGProps<SVGSVGElement>;

const roofRows = [
  { y: 128, x: 82, count: 12, width: 20, height: 20, offset: 0 },
  { y: 146, x: 78, count: 13, width: 20, height: 22, offset: 10 },
  { y: 165, x: 73, count: 13, width: 20, height: 22, offset: 0 },
  { y: 184, x: 70, count: 14, width: 19, height: 21, offset: 9 },
] as const;

const roofChipHighlights = [
  [98, 136, 8],
  [151, 157, -5],
  [224, 134, 6],
  [288, 177, -7],
  [317, 148, 8],
] as const;

const timberLines = [
  "M72 510 C113 498 156 517 196 506 C241 494 282 510 322 501",
  "M70 527 C122 537 161 518 212 528 C251 535 285 519 328 530",
  "M82 544 C126 536 174 551 216 541 C262 530 291 548 325 540",
  "M74 559 C128 565 168 553 217 562 C263 570 300 554 326 563",
] as const;

const postKnots = [
  [87, 277],
  [84, 384],
  [314, 309],
  [318, 438],
] as const;

const signText = "MINIATURE VINTAGE VILLAGE · ARTISAN COLLECTION";

const VintageVillageStorefrontScene = ({
  className,
  style,
  preserveAspectRatio = "xMidYMid meet",
  ...svgProps
}: VintageVillageStorefrontSceneProps) => (
  <svg
    aria-label="Miniature vintage village display stand sampled from reference image"
    className={className}
    preserveAspectRatio={preserveAspectRatio}
    role="img"
    viewBox="0 0 400 600"
    xmlns="http://www.w3.org/2000/svg"
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
      <linearGradient id="vintage-village-roof-front" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="#d98952" />
        <stop offset="45%" stopColor="#b65a2c" />
        <stop offset="100%" stopColor="#6f321a" />
      </linearGradient>
      <linearGradient id="vintage-village-roof-shadow" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="#7a351c" />
        <stop offset="100%" stopColor="#3e1f13" />
      </linearGradient>
      <linearGradient id="vintage-village-fascia" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="#39271f" />
        <stop offset="58%" stopColor="#231915" />
        <stop offset="100%" stopColor="#130e0c" />
      </linearGradient>
      <linearGradient id="vintage-village-post" x1="0" x2="1">
        <stop offset="0%" stopColor="#6d4b37" />
        <stop offset="38%" stopColor="#d0aa84" />
        <stop offset="65%" stopColor="#8b6246" />
        <stop offset="100%" stopColor="#4a2f23" />
      </linearGradient>
      <linearGradient id="vintage-village-base" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="#9d5527" />
        <stop offset="50%" stopColor="#6f3617" />
        <stop offset="100%" stopColor="#3f1f0d" />
      </linearGradient>
      <linearGradient id="vintage-village-base-top" x1="0" x2="1">
        <stop offset="0%" stopColor="#5f2d12" />
        <stop offset="42%" stopColor="#b57037" />
        <stop offset="100%" stopColor="#4b240e" />
      </linearGradient>
      <linearGradient id="vintage-village-brass" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="#f1d891" />
        <stop offset="48%" stopColor="#af8239" />
        <stop offset="100%" stopColor="#65401a" />
      </linearGradient>
      <linearGradient id="vintage-village-display" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="#eeeeed" />
        <stop offset="55%" stopColor="#d6d6d4" />
        <stop offset="100%" stopColor="#c7c7c5" />
      </linearGradient>
      <filter id="vintage-village-cast-shadow" x="-22%" y="-18%" width="144%" height="138%">
        <feDropShadow dx="0" dy="8" floodColor="#2f2118" floodOpacity="0.23" stdDeviation="7" />
      </filter>
      <filter id="vintage-village-fine-grain">
        <feTurbulence baseFrequency="0.92" numOctaves="4" seed="47" type="fractalNoise" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.38 0 0 0 0 0.22 0 0 0 0 0.12 0 0 0 0.22 0"
        />
      </filter>
      <filter id="vintage-village-stucco-noise">
        <feTurbulence baseFrequency="1.25" numOctaves="3" seed="18" type="fractalNoise" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.82 0 0 0 0 0.76 0 0 0 0 0.68 0 0 0 0.18 0"
        />
      </filter>
    </defs>

    <rect width="400" height="600" fill="#fff" />

    <g filter="url(#vintage-village-cast-shadow)">
      {/* Reference silhouette: a slim display stand centered on a large white field. */}
      <ellipse cx="200" cy="566" rx="134" ry="11" fill="#2a1b12" opacity="0.12" />

      {/* Rear plaster frame, mostly hidden by the timber posts and display opening. */}
      <path d="M84 214 H316 L306 511 H94 Z" fill="#d6c6b4" />
      <path d="M84 214 H316 L306 511 H94 Z" filter="url(#vintage-village-stucco-noise)" opacity="0.52" />

      {/* Dark horizontal beam directly under the roof. */}
      <rect x="85" y="183" width="230" height="51" fill="url(#vintage-village-fascia)" />
      <rect x="85" y="183" width="230" height="51" filter="url(#vintage-village-fine-grain)" opacity="0.55" />
      <path d="M92 198 C133 193 175 204 216 196 C254 189 284 197 309 193" fill="none" stroke="#745645" strokeWidth="2" opacity="0.46" />
      <path d="M92 218 C137 223 177 211 217 220 C255 228 282 214 307 219" fill="none" stroke="#090706" strokeWidth="2" opacity="0.45" />

      {/* Tall pale display cavity. */}
      <rect x="94" y="232" width="212" height="279" fill="#cdbfae" />
      <rect x="102" y="242" width="196" height="249" fill="url(#vintage-village-display)" />
      <path d="M102 242 H298 V491 H102 Z" fill="none" stroke="#eeeeea" strokeWidth="2" opacity="0.72" />
      <rect x="102" y="242" width="196" height="249" fill="#bfc0bd" opacity="0.1" />

      {/* Thin uneven side posts from the reference. */}
      <path d="M79 204 L95 205 L90 513 L74 513 Z" fill="url(#vintage-village-post)" />
      <path d="M305 205 L321 204 L326 513 L310 513 Z" fill="url(#vintage-village-post)" />
      <path d="M84 212 C91 289 82 381 86 506" fill="none" stroke="#4b2f21" strokeWidth="2" opacity="0.45" />
      <path d="M315 212 C307 302 320 391 315 507" fill="none" stroke="#4b2f21" strokeWidth="2" opacity="0.45" />
      {postKnots.map(([cx, cy]) => (
        <ellipse key={`${cx}-${cy}`} cx={cx} cy={cy} rx="3.2" ry="5.5" fill="#3b2418" opacity="0.35" />
      ))}

      {/* Terracotta roof: low, wide, with individually suggested curved tiles. */}
      <path d="M70 122 H330 L318 188 H82 Z" fill="url(#vintage-village-roof-shadow)" />
      {roofRows.map((row) =>
        Array.from({ length: row.count }, (_, tileIndex) => {
          const x = row.x + row.offset + tileIndex * row.width;
          const y = row.y;
          const wobble = tileIndex % 3 === 0 ? -1 : tileIndex % 3 === 1 ? 1 : 0;
          return (
            <g key={`${row.y}-${tileIndex}`}>
              <path
                d={`M${x} ${y + row.height} C${x + 1} ${y + 8} ${x + 5} ${y + 2} ${x + row.width / 2} ${y + wobble} C${x + row.width - 5} ${y + 2} ${x + row.width - 1} ${y + 8} ${x + row.width} ${y + row.height} Z`}
                fill="url(#vintage-village-roof-front)"
                stroke="#693018"
                strokeWidth="1.1"
              />
              <path
                d={`M${x + 3} ${y + row.height - 3} C${x + 7} ${y + row.height - 9} ${x + row.width - 6} ${y + row.height - 9} ${x + row.width - 2} ${y + row.height - 3}`}
                fill="none"
                stroke="#e7a26c"
                strokeLinecap="round"
                strokeWidth="1"
                opacity="0.42"
              />
            </g>
          );
        }),
      )}
      {roofChipHighlights.map(([cx, cy, rotate]) => (
        <ellipse
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          rx="7"
          ry="2.2"
          fill="#f0ba83"
          opacity="0.55"
          transform={`rotate(${rotate} ${cx} ${cy})`}
        />
      ))}
      <path d="M70 122 H330" fill="none" stroke="#8d4523" strokeLinecap="round" strokeWidth="4" />
      <path d="M78 188 C121 181 160 192 203 185 C250 177 285 189 320 184" fill="none" stroke="#572916" strokeLinecap="round" strokeWidth="4" />

      {/* Center dormer, pitched roof and tiny black window. */}
      <g transform="translate(199 96)">
        <path d="M-27 31 L0 3 L28 31 V78 H-26 Z" fill="#7a4225" />
        <path d="M-18 35 H19 V73 H-18 Z" fill="#d7cbbd" />
        <path d="M-31 33 L0 -1 L31 33" fill="none" stroke="#432215" strokeLinecap="round" strokeWidth="6" />
        <path d="M-18 35 H19 V73 H-18 Z" fill="none" stroke="#2b1a12" strokeWidth="3" />
        <rect x="-8" y="43" width="15" height="24" rx="1" fill="#171514" />
        <path d="M-2 45 L3 66" stroke="#fff8ed" strokeLinecap="round" strokeWidth="2.4" opacity="0.75" />
        <path d="M-21 77 H22" stroke="#3b2116" strokeLinecap="round" strokeWidth="4" />
      </g>

      {/* Right chimney with small cap and rough masonry marks. */}
      <g transform="translate(259 88)">
        <path d="M3 31 H25 L22 96 H7 Z" fill="#8a6047" />
        <path d="M-3 30 L13 17 L30 30" fill="none" stroke="#3b2318" strokeLinecap="round" strokeWidth="5" />
        <rect x="8" y="4" width="11" height="15" rx="1" fill="#4a3024" />
        <path d="M7 48 C13 44 17 51 24 46" fill="none" stroke="#d8b791" strokeLinecap="round" strokeWidth="2" opacity="0.62" />
        <path d="M6 66 H23 M8 81 H21" stroke="#4f3324" strokeWidth="1.4" opacity="0.45" />
      </g>

      {/* Base block with raised rim, medallion and engraved brass plate. */}
      <path d="M72 496 H328 L334 511 H66 Z" fill="url(#vintage-village-base-top)" />
      <rect x="66" y="508" width="268" height="58" rx="3" fill="url(#vintage-village-base)" />
      <rect x="66" y="508" width="268" height="58" filter="url(#vintage-village-fine-grain)" opacity="0.48" />
      <path d="M66 508 H334" stroke="#c1864b" strokeWidth="2" opacity="0.56" />
      {timberLines.map((line) => (
        <path key={line} d={line} fill="none" stroke="#211108" strokeLinecap="round" strokeWidth="2" opacity="0.38" />
      ))}
      <circle cx="200" cy="525" r="16" fill="#53240f" stroke="url(#vintage-village-brass)" strokeWidth="2.2" />
      <circle cx="200" cy="525" r="10.5" fill="none" stroke="#b9914e" strokeWidth="1" opacity="0.82" />
      <text
        x="200"
        y="531"
        fill="#dbc58b"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="18"
        textAnchor="middle"
      >
        I
      </text>
      <rect x="128" y="548" width="144" height="11" rx="3" fill="url(#vintage-village-brass)" />
      <path d="M132 551 H268" stroke="#f8e3a5" strokeLinecap="round" strokeWidth="1" opacity="0.55" />
      <text
        x="200"
        y="556"
        fill="#28180d"
        fontFamily="Arial, sans-serif"
        fontSize="5.35"
        fontWeight="700"
        letterSpacing="0.15"
        textAnchor="middle"
      >
        {signText}
      </text>
    </g>
  </svg>
);

export default VintageVillageStorefrontScene;
