import type { SVGProps } from "react";

type VintageVillageStorefrontSceneProps = SVGProps<SVGSVGElement>;

const tileColumns = Array.from({ length: 14 }, (_, index) => index);
const baseGrainLines = [
  "M64 518 C112 510 150 528 205 516 C252 505 296 522 336 512",
  "M60 540 C118 550 160 532 214 542 C262 552 300 535 342 544",
  "M72 560 C132 552 182 568 238 556 C282 548 318 562 342 556",
];
const signText = "MINIATURE VINTAGE VILLAGE · ARTISAN COLLECTION";

const VintageVillageStorefrontScene = ({
  className,
  style,
  preserveAspectRatio = "xMidYMid meet",
  ...svgProps
}: VintageVillageStorefrontSceneProps) => (
  <svg
    aria-label="Miniature vintage village storefront sampled from reference image"
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
      <linearGradient id="vintage-village-stucco" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="#f9f7f2" />
        <stop offset="100%" stopColor="#dedbd3" />
      </linearGradient>
      <linearGradient id="vintage-village-wood" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="#8f4a1f" />
        <stop offset="48%" stopColor="#643413" />
        <stop offset="100%" stopColor="#3e210d" />
      </linearGradient>
      <linearGradient id="vintage-village-dark-wood" x1="0" x2="1">
        <stop offset="0%" stopColor="#251b15" />
        <stop offset="45%" stopColor="#493024" />
        <stop offset="100%" stopColor="#1d1713" />
      </linearGradient>
      <linearGradient id="vintage-village-side-post" x1="0" x2="1">
        <stop offset="0%" stopColor="#8b654b" />
        <stop offset="45%" stopColor="#d7b796" />
        <stop offset="100%" stopColor="#6a4935" />
      </linearGradient>
      <linearGradient id="vintage-village-brass" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="#e2c47a" />
        <stop offset="50%" stopColor="#a27935" />
        <stop offset="100%" stopColor="#6d491e" />
      </linearGradient>
      <filter id="vintage-village-soft-shadow" x="-18%" y="-16%" width="136%" height="132%">
        <feDropShadow dx="0" dy="10" floodColor="#2b1a10" floodOpacity="0.24" stdDeviation="8" />
      </filter>
      <filter id="vintage-village-grain">
        <feTurbulence baseFrequency="0.85" numOctaves="4" seed="31" type="fractalNoise" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.42 0 0 0 0 0.25 0 0 0 0 0.13 0 0 0 0.18 0"
        />
      </filter>
      <pattern id="vintage-village-roof-tiles" width="28" height="32" patternUnits="userSpaceOnUse">
        <path d="M0 10 Q14 0 28 10 V32 H0 Z" fill="#b95b2e" />
        <path d="M2 12 Q14 4 26 12" fill="none" stroke="#74351d" strokeWidth="2" />
        <path d="M0 31 H28" stroke="#542614" strokeWidth="1.4" />
      </pattern>
    </defs>

    <g filter="url(#vintage-village-soft-shadow)" transform="translate(-54 -86) scale(1.37)">
      <path d="M70 230 H330 L318 520 H82 Z" fill="rgba(0,0,0,0.08)" />

      {/* Main display opening */}
      <rect x="82" y="232" width="236" height="286" fill="url(#vintage-village-stucco)" />
      <rect x="92" y="246" width="216" height="242" fill="#d7d7d6" />

      {/* Slim rustic posts */}
      <path d="M72 214 H88 L84 520 H66 Z" fill="url(#vintage-village-side-post)" />
      <path d="M312 214 H328 L334 520 H316 Z" fill="url(#vintage-village-side-post)" />
      <path d="M75 222 C80 290 75 372 80 510" fill="none" stroke="#553626" strokeWidth="2" opacity="0.38" />
      <path d="M322 220 C316 310 326 402 321 514" fill="none" stroke="#4e3223" strokeWidth="2" opacity="0.32" />

      {/* Dark wooden fascia under the roof */}
      <rect x="78" y="180" width="244" height="54" fill="url(#vintage-village-dark-wood)" />
      <rect x="78" y="180" width="244" height="54" filter="url(#vintage-village-grain)" opacity="0.45" />
      <path d="M86 196 C134 190 173 202 226 194 C264 188 292 197 314 192" stroke="#84614c" strokeWidth="2" opacity="0.45" />
      <path d="M86 216 C132 220 176 208 222 218 C264 226 294 212 314 218" stroke="#1d130e" strokeWidth="2" opacity="0.52" />

      {/* Terracotta roof sampled as layered scalloped tiles */}
      <path d="M54 128 H346 L332 186 H68 Z" fill="url(#vintage-village-roof-tiles)" />
      <path d="M54 128 H346 L332 186 H68 Z" fill="rgba(255,217,165,0.12)" />
      {tileColumns.map((column) => (
        <path
          key={`roof-column-${column}`}
          d={`M${62 + column * 20} 130 C${66 + column * 20} 148 ${66 + column * 20} 166 ${62 + column * 20} 184`}
          fill="none"
          stroke="#6b2f18"
          strokeWidth="2"
          opacity="0.7"
        />
      ))}
      <path d="M54 128 H346" stroke="#6b321b" strokeLinecap="round" strokeWidth="5" />
      <path d="M65 184 C118 178 176 190 232 181 C276 174 304 184 334 181" fill="none" stroke="#5a2a18" strokeWidth="4" />

      {/* Small dormer window and chimney */}
      <g transform="translate(182 96)">
        <path d="M-26 34 L0 6 L28 34 V82 H-24 Z" fill="#6e3920" />
        <path d="M-31 37 L0 0 L33 37" fill="none" stroke="#3d2116" strokeLinecap="round" strokeWidth="6" />
        <path d="M-20 38 H22 V78 H-20 Z" fill="#efe8dc" />
        <rect x="-10" y="45" width="18" height="26" fill="#1f1b18" />
        <path d="M-4 47 L2 70" stroke="#f8f4ee" strokeLinecap="round" strokeWidth="3" opacity="0.8" />
        <path d="M-20 38 H22 V78 H-20 Z" fill="none" stroke="#2b1b13" strokeWidth="3" />
      </g>
      <g transform="translate(258 90)">
        <path d="M0 28 H24 L21 96 H4 Z" fill="#886247" />
        <path d="M-5 26 L12 12 L30 26" fill="none" stroke="#3b2418" strokeLinecap="round" strokeWidth="5" />
        <rect x="6" y="0" width="12" height="16" fill="#493124" />
        <path d="M5 45 C13 40 16 48 23 43" fill="none" stroke="#d5b38e" strokeWidth="2" opacity="0.55" />
      </g>

      {/* Heavy plinth with medallion and brass name plate */}
      <rect x="62" y="508" width="276" height="56" rx="2" fill="url(#vintage-village-wood)" />
      <rect x="62" y="508" width="276" height="56" filter="url(#vintage-village-grain)" opacity="0.5" />
      {baseGrainLines.map((line) => (
        <path key={line} d={line} fill="none" stroke="#231309" strokeLinecap="round" strokeWidth="2" opacity="0.42" />
      ))}
      <circle cx="200" cy="525" r="16" fill="#5a2914" stroke="url(#vintage-village-brass)" strokeWidth="2.5" />
      <circle cx="200" cy="525" r="11" fill="none" stroke="#a47b3c" strokeWidth="1" opacity="0.75" />
      <text
        x="200"
        y="531"
        fill="#d7bf85"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="18"
        textAnchor="middle"
      >
        I
      </text>
      <rect x="128" y="548" width="144" height="11" rx="3" fill="url(#vintage-village-brass)" />
      <text
        x="200"
        y="556"
        fill="#2a1b10"
        fontFamily="Arial, sans-serif"
        fontSize="5.4"
        fontWeight="700"
        letterSpacing="0.18"
        textAnchor="middle"
      >
        {signText}
      </text>
    </g>
  </svg>
);

export default VintageVillageStorefrontScene;
