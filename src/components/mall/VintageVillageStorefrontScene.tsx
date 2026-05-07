import type { SVGProps } from "react";

type VintageVillageStorefrontSceneProps = SVGProps<SVGSVGElement> & {
  displayImageHref?: string;
};

const roofRows = [
  { y: 312, x: 146, count: 14, tileWidth: 18, tileHeight: 23, offset: 0 },
  { y: 331, x: 139, count: 15, tileWidth: 18, tileHeight: 24, offset: 9 },
  { y: 351, x: 135, count: 15, tileWidth: 18, tileHeight: 24, offset: 0 },
  { y: 372, x: 130, count: 16, tileWidth: 18, tileHeight: 24, offset: 8 },
  { y: 392, x: 127, count: 16, tileWidth: 18, tileHeight: 21, offset: 0 },
] as const;

const roofSurfaceMarks = [
  [156, 318, 15, -8],
  [204, 333, 13, 5],
  [264, 319, 16, -4],
  [326, 347, 14, 8],
  [377, 384, 15, -7],
  [170, 397, 12, 5],
] as const;

const verticalWoodStreaks = [
  "M139 421 C144 486 137 569 142 704",
  "M153 430 C148 510 157 612 151 705",
  "M398 421 C392 502 404 616 399 704",
  "M411 430 C416 524 407 624 413 706",
] as const;

const fasciaGrain = [
  "M150 424 C195 417 235 431 282 422 C324 414 362 424 398 420",
  "M151 446 C202 452 239 439 285 449 C328 458 364 442 399 450",
  "M153 462 C197 457 238 466 279 459 C322 452 360 461 397 457",
] as const;

const baseGrain = [
  "M135 713 C183 704 226 720 271 710 C319 699 365 716 418 708",
  "M132 730 C190 741 230 721 283 733 C329 743 369 725 419 735",
  "M139 750 C188 743 238 758 284 749 C331 739 371 754 416 747",
  "M134 764 C184 770 230 758 281 768 C329 776 369 761 419 767",
] as const;

const stuccoSpeckles = [
  [146, 474, 0.22],
  [403, 489, 0.18],
  [150, 614, 0.16],
  [405, 670, 0.2],
  [386, 421, 0.16],
] as const;

const signText = "MINIATURE VINTAGE VILLAGE · ARTISAN COLLECTION";

const VintageVillageStorefrontScene = ({
  className,
  style,
  preserveAspectRatio = "xMidYMid meet",
  displayImageHref,
  ...svgProps
}: VintageVillageStorefrontSceneProps) => (
  <svg
    aria-label="Miniature vintage village display stand sampled from reference image"
    className={className}
    preserveAspectRatio={preserveAspectRatio}
    role="img"
    viewBox="120 275 315 505"
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
      <clipPath id="vintage-village-roof-clip">
        <path d="M145 309 H399 L415 410 H127 Z" />
      </clipPath>
      <linearGradient id="vintage-village-tile" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="#d58a55" />
        <stop offset="38%" stopColor="#bd6738" />
        <stop offset="100%" stopColor="#7a351c" />
      </linearGradient>
      <linearGradient id="vintage-village-roof-under" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="#9b4a27" />
        <stop offset="100%" stopColor="#4a2314" />
      </linearGradient>
      <linearGradient id="vintage-village-old-wood" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="#5f412f" />
        <stop offset="34%" stopColor="#c09a75" />
        <stop offset="58%" stopColor="#8b5e40" />
        <stop offset="100%" stopColor="#3a251b" />
      </linearGradient>
      <linearGradient id="vintage-village-fascia" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="#37271f" />
        <stop offset="54%" stopColor="#221916" />
        <stop offset="100%" stopColor="#14100e" />
      </linearGradient>
      <linearGradient id="vintage-village-display-fill" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="#eeeeed" />
        <stop offset="47%" stopColor="#d8d8d7" />
        <stop offset="100%" stopColor="#c9c9c7" />
      </linearGradient>
      <linearGradient id="vintage-village-base" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="#9b5428" />
        <stop offset="45%" stopColor="#703717" />
        <stop offset="100%" stopColor="#3f1f0d" />
      </linearGradient>
      <linearGradient id="vintage-village-brass" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="#f3dc99" />
        <stop offset="43%" stopColor="#b3843c" />
        <stop offset="100%" stopColor="#65401b" />
      </linearGradient>
      <radialGradient id="vintage-village-display-light" cx="42%" cy="32%" r="74%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.42" />
        <stop offset="70%" stopColor="#ffffff" stopOpacity="0.04" />
        <stop offset="100%" stopColor="#92928f" stopOpacity="0.12" />
      </radialGradient>
      <filter id="vintage-village-object-shadow" x="-28%" y="-18%" width="156%" height="138%">
        <feDropShadow dx="0" dy="11" floodColor="#2b1a10" floodOpacity="0.2" stdDeviation="8" />
      </filter>
      <filter id="vintage-village-grain">
        <feTurbulence baseFrequency="0.86" numOctaves="4" seed="71" type="fractalNoise" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.39 0 0 0 0 0.23 0 0 0 0 0.13 0 0 0 0.2 0"
        />
      </filter>
      <filter id="vintage-village-soft-noise">
        <feTurbulence baseFrequency="1.18" numOctaves="3" seed="14" type="fractalNoise" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.74 0 0 0 0 0.68 0 0 0 0 0.6 0 0 0 0.16 0"
        />
      </filter>
    </defs>

    <g filter="url(#vintage-village-object-shadow)">
      <ellipse cx="276" cy="774" rx="148" ry="15" fill="#24160f" opacity="0.12" />

      {/* Rear plaster board and the flat grey display opening, matching the tall photo silhouette. */}
      <path d="M146 411 H404 L397 708 H154 Z" fill="#d8c8b7" />
      <path d="M146 411 H404 L397 708 H154 Z" filter="url(#vintage-village-soft-noise)" opacity="0.44" />
      <rect x="154" y="470" width="244" height="236" fill="#c8baa8" />
      <rect x="164" y="480" width="224" height="212" fill="url(#vintage-village-display-fill)" />
      <rect x="164" y="480" width="224" height="212" fill="url(#vintage-village-display-light)" />
      {displayImageHref && (
        <image
          href={displayImageHref}
          x="154"
          y="470"
          width="244"
          height="236"
          preserveAspectRatio="xMidYMid slice"
        />
      )}
      <path d="M164 480 H388 V692 H164 Z" fill="none" stroke="#efefed" strokeWidth="2.5" opacity="0.65" />
      <path d="M164 480 H388 V692 H164 Z" fill="none" stroke="#a7a19a" strokeWidth="1.2" opacity="0.22" />

      {/* Rough vertical side supports, deliberately narrow and slightly uneven. */}
      <path d="M137 409 L154 411 L149 707 L130 707 Z" fill="url(#vintage-village-old-wood)" />
      <path d="M398 410 L414 408 L421 708 L402 708 Z" fill="url(#vintage-village-old-wood)" />
      {verticalWoodStreaks.map((line) => (
        <path key={line} d={line} fill="none" stroke="#352116" strokeLinecap="round" strokeWidth="2.1" opacity="0.42" />
      ))}
      <ellipse cx="145" cy="550" rx="3.5" ry="7" fill="#3d2618" opacity="0.34" />
      <ellipse cx="409" cy="626" rx="3.2" ry="7.5" fill="#3d2618" opacity="0.32" />

      {/* Dark fascia band below the tile roof. */}
      <rect x="146" y="410" width="256" height="60" fill="url(#vintage-village-fascia)" />
      <rect x="146" y="410" width="256" height="60" filter="url(#vintage-village-grain)" opacity="0.54" />
      {fasciaGrain.map((line) => (
        <path key={line} d={line} fill="none" stroke="#7c5d4c" strokeLinecap="round" strokeWidth="2" opacity="0.4" />
      ))}
      <path d="M146 469 H402" stroke="#0b0807" strokeWidth="3" opacity="0.35" />

      {/* Terracotta tile roof, clipped into the wide shallow roof shape from the photo. */}
      <path d="M145 309 H399 L415 410 H127 Z" fill="url(#vintage-village-roof-under)" />
      <g clipPath="url(#vintage-village-roof-clip)">
        {roofRows.map((row) =>
          Array.from({ length: row.count }, (_, tileIndex) => {
            const x = row.x + row.offset + tileIndex * row.tileWidth;
            const y = row.y;
            const wobble = tileIndex % 4 === 0 ? -1.6 : tileIndex % 4 === 2 ? 1.2 : 0;
            return (
              <g key={`${row.y}-${tileIndex}`}>
                <path
                  d={`M${x} ${y + row.tileHeight} C${x + 1.5} ${y + 10} ${x + 5.5} ${y + 2} ${x + row.tileWidth / 2} ${y + wobble} C${x + row.tileWidth - 5.5} ${y + 2} ${x + row.tileWidth - 1.5} ${y + 10} ${x + row.tileWidth} ${y + row.tileHeight} Z`}
                  fill="url(#vintage-village-tile)"
                  stroke="#653019"
                  strokeWidth="1.25"
                />
                <path
                  d={`M${x + 3} ${y + row.tileHeight - 4} C${x + 7} ${y + row.tileHeight - 11} ${x + row.tileWidth - 7} ${y + row.tileHeight - 11} ${x + row.tileWidth - 3} ${y + row.tileHeight - 4}`}
                  fill="none"
                  stroke="#edae78"
                  strokeLinecap="round"
                  strokeWidth="1"
                  opacity="0.36"
                />
              </g>
            );
          }),
        )}
      </g>
      {roofSurfaceMarks.map(([cx, cy, rx, rotate]) => (
        <ellipse
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          rx={rx}
          ry="2.4"
          fill="#eab07a"
          opacity="0.32"
          transform={`rotate(${rotate} ${cx} ${cy})`}
        />
      ))}
      <path d="M145 309 H399" fill="none" stroke="#6d3219" strokeLinecap="round" strokeWidth="5" />
      <path d="M127 410 C178 401 226 414 278 405 C329 397 371 409 415 402" fill="none" stroke="#522515" strokeLinecap="round" strokeWidth="5" />

      {/* Center dormer with aged plaster face and a small dark window. */}
      <g transform="translate(276 286)">
        <path d="M-30 37 L0 5 L31 37 V88 H-28 Z" fill="#744126" />
        <path d="M-22 42 H22 V84 H-22 Z" fill="#d8cdbf" />
        <path d="M-35 39 L0 0 L35 39" fill="none" stroke="#3f2115" strokeLinecap="round" strokeWidth="6" />
        <path d="M-22 42 H22 V84 H-22 Z" fill="none" stroke="#2d1a11" strokeWidth="3" />
        <rect x="-9" y="50" width="17" height="27" rx="1.5" fill="#171412" />
        <path d="M-3 52 L3 75" stroke="#fff6e8" strokeLinecap="round" strokeWidth="2.4" opacity="0.72" />
        <path d="M-25 87 H25" stroke="#3a2116" strokeLinecap="round" strokeWidth="4" />
      </g>

      {/* Right chimney, sitting behind the tile line like the reference. */}
      <g transform="translate(333 280)">
        <path d="M4 31 H28 L25 101 H8 Z" fill="#8a6047" />
        <path d="M-3 31 L16 17 L35 31" fill="none" stroke="#3b2318" strokeLinecap="round" strokeWidth="5" />
        <rect x="10" y="4" width="12" height="15" rx="1" fill="#4a3024" />
        <path d="M8 51 C15 47 18 55 26 50" fill="none" stroke="#d6b38d" strokeLinecap="round" strokeWidth="2" opacity="0.58" />
        <path d="M9 69 H25 M10 86 H24" stroke="#4f3324" strokeWidth="1.4" opacity="0.45" />
      </g>

      {/* Heavy wood plinth with medallion and narrow engraved brass label. */}
      <path d="M131 699 H421 L427 709 H126 Z" fill="#6b3215" />
      <rect x="130" y="707" width="292" height="58" rx="3" fill="url(#vintage-village-base)" />
      <rect x="130" y="707" width="292" height="58" filter="url(#vintage-village-grain)" opacity="0.5" />
      <path d="M130 707 H422" stroke="#c28a4f" strokeWidth="2" opacity="0.48" />
      {baseGrain.map((line) => (
        <path key={line} d={line} fill="none" stroke="#211108" strokeLinecap="round" strokeWidth="2" opacity="0.4" />
      ))}
      <circle cx="276" cy="726" r="17" fill="#552510" stroke="url(#vintage-village-brass)" strokeWidth="2.4" />
      <circle cx="276" cy="726" r="11" fill="none" stroke="#b9904b" strokeWidth="1" opacity="0.82" />
      <text
        x="276"
        y="732"
        fill="#dcc58c"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="18"
        textAnchor="middle"
      >
        I
      </text>
      <rect x="212" y="747" width="128" height="12" rx="3" fill="url(#vintage-village-brass)" />
      <path d="M216 750 H336" stroke="#f7e0a2" strokeLinecap="round" strokeWidth="1" opacity="0.52" />
      <text
        x="276"
        y="755"
        fill="#28180d"
        fontFamily="Arial, sans-serif"
        fontSize="4.9"
        fontWeight="700"
        letterSpacing="0.08"
        textAnchor="middle"
      >
        {signText}
      </text>
    </g>

    {stuccoSpeckles.map(([cx, cy, opacity]) => (
      <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2" fill="#725946" opacity={opacity} />
    ))}
  </svg>
);

export default VintageVillageStorefrontScene;
