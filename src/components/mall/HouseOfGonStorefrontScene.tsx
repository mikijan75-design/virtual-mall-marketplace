import type { CSSProperties, SVGProps } from "react";

type HouseOfGonStorefrontSceneProps = SVGProps<SVGSVGElement> & {
  variant?: "storefront" | "sign";
};

const topWindowPanels = [
  { x: 57, width: 83, opacity: 0.42 },
  { x: 149, width: 87, opacity: 0.36 },
  { x: 245, width: 86, opacity: 0.44 },
  { x: 340, width: 84, opacity: 0.4 },
  { x: 433, width: 87, opacity: 0.46 },
  { x: 529, width: 88, opacity: 0.39 },
  { x: 626, width: 84, opacity: 0.43 },
  { x: 719, width: 82, opacity: 0.36 },
] as const;

const topMullions = [48, 140, 236, 331, 424, 520, 617, 710, 802] as const;
const displayMullions = [326, 509, 697] as const;
const signSurfaceLines = [176, 210, 245, 282] as const;

const laceArcs = [
  [454, 68],
  [494, 68],
  [534, 68],
  [574, 68],
  [614, 68],
  [654, 68],
  [694, 68],
  [734, 68],
] as const;

const floorDiamonds = [
  [105, 1003],
  [150, 1003],
  [195, 1003],
  [240, 1003],
  [285, 1003],
  [330, 1003],
] as const;

const hangingRails = [
  { x: 125, y: 580, width: 118, colors: ["#f4f0e7", "#2b2a27", "#f4f0e7", "#1a1a1a", "#c9b9a4"] },
  { x: 596, y: 508, width: 158, colors: ["#e8e1d7", "#24354c", "#f2f0ea", "#b8c0cf", "#1f2f44"] },
] as const;

const productBottles = [
  { x: 373, y: 876, h: 44, fill: "#24656a" },
  { x: 405, y: 884, h: 34, fill: "#c79237" },
  { x: 431, y: 870, h: 50, fill: "#1f2a24" },
  { x: 457, y: 880, h: 40, fill: "#7a4f24" },
  { x: 487, y: 886, h: 34, fill: "#d7c56a" },
] as const;

const HouseOfGonLogoMark = ({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`} aria-hidden="true">
    <g filter="url(#house-of-gon-letter-shadow)">
      <path
        d="M0 14 C0 5 6 0 15 0 C24 0 30 5 30 14 V80 C30 89 24 94 15 94 C6 94 0 89 0 80 Z"
        fill="#f7f7f1"
      />
      <path
        d="M42 0 H61 C78 0 88 10 88 28 V94 H68 V29 C68 22 65 18 60 18 H58 V94 H42 Z"
        fill="#f7f7f1"
      />
      <path
        d="M101 14 C101 5 107 0 116 0 C125 0 131 5 131 14 V80 C131 89 125 94 116 94 C107 94 101 89 101 80 Z"
        fill="#f7f7f1"
      />
    </g>
    <path d="M13 16 V78" stroke="#263323" strokeLinecap="round" strokeWidth="8" opacity="0.9" />
    <path d="M113 16 V78" stroke="#263323" strokeLinecap="round" strokeWidth="8" opacity="0.9" />
    <path d="M58 18 V92" stroke="#263323" strokeLinecap="round" strokeWidth="7" opacity="0.9" />
    <path d="M8 90 Q65 126 124 90" fill="none" stroke="#f7f7f1" strokeLinecap="round" strokeWidth="7" />
    <path d="M12 98 Q65 132 120 98" fill="none" stroke="#1c2418" strokeLinecap="round" strokeWidth="5" opacity="0.36" />
  </g>
);

const HouseOfGonSign = () => (
  <g aria-label="House of Gon sign">
    <rect x="31" y="122" width="798" height="202" fill="url(#house-of-gon-sign-panel)" />
    <rect x="31" y="122" width="798" height="202" fill="url(#house-of-gon-sign-grain)" opacity="0.5" />
    <rect x="39" y="130" width="782" height="186" fill="none" stroke="#7fa27c" strokeWidth="2" opacity="0.55" />
    {signSurfaceLines.map((y) => (
      <path key={y} d={`M42 ${y} C210 ${y - 6} 350 ${y + 6} 522 ${y - 3} C650 ${y - 10} 746 ${y + 6} 817 ${y - 1}`} fill="none" stroke="#6d916e" strokeWidth="1.2" opacity="0.2" />
    ))}

    <HouseOfGonLogoMark x={109} y={174} scale={0.88} />
    <g transform="translate(208 172) rotate(-90)" aria-hidden="true">
      <text
        fill="#f8f8f1"
        fontFamily='"Heebo", Arial, sans-serif'
        fontSize="15"
        fontWeight="800"
        letterSpacing="1.8"
      >
        <tspan x="0" y="0">MADE IN ISRAEL</tspan>
      </text>
    </g>

    <g filter="url(#house-of-gon-letter-shadow)">
      <text
        fill="#fbfbf5"
        fontFamily='"Heebo", "Arial Narrow", Arial, sans-serif'
        fontSize="76"
        fontWeight="900"
        letterSpacing="5.8"
        lengthAdjust="spacingAndGlyphs"
        textLength="493"
        x="250"
        y="247"
        style={{ paintOrder: "stroke fill" } as CSSProperties}
      >
        HOUSE OF G
      </text>
      <g transform="translate(758 194)">
        <circle cx="31" cy="31" r="29" fill="none" stroke="#fbfbf5" strokeWidth="6" />
        <circle cx="31" cy="31" r="20.5" fill="none" stroke="#fbfbf5" strokeWidth="3" opacity="0.94" />
        <circle cx="31" cy="31" r="12.5" fill="none" stroke="#fbfbf5" strokeWidth="2.5" opacity="0.78" />
        <circle cx="31" cy="31" r="5" fill="#fbfbf5" opacity="0.82" />
      </g>
      <text
        fill="#fbfbf5"
        fontFamily='"Heebo", "Arial Narrow", Arial, sans-serif'
        fontSize="76"
        fontWeight="900"
        letterSpacing="5.8"
        x="804"
        y="247"
      >
        N
      </text>
    </g>
  </g>
);

const ClothesRail = ({
  x,
  y,
  width,
  colors,
}: {
  x: number;
  y: number;
  width: number;
  colors: readonly string[];
}) => (
  <g aria-hidden="true">
    <path d={`M${x} ${y} H${x + width}`} stroke="#33261f" strokeLinecap="round" strokeWidth="6" />
    {colors.map((fill, index) => {
      const hangerX = x + 15 + index * (width / colors.length);
      return (
        <g key={`${x}-${fill}-${index}`}>
          <path d={`M${hangerX} ${y} l12 16 h-24 z`} fill="none" stroke="#1f1d1a" strokeWidth="1.4" opacity="0.5" />
          <path
            d={`M${hangerX - 17} ${y + 16} Q${hangerX} ${y + 7} ${hangerX + 17} ${y + 16} L${hangerX + 26} ${y + 134} Q${hangerX} ${y + 146} ${hangerX - 26} ${y + 134} Z`}
            fill={fill}
            opacity="0.92"
            stroke="#2f2a25"
            strokeWidth="1"
          />
          {index % 2 === 1 && (
            <path
              d={`M${hangerX - 21} ${y + 34} H${hangerX + 21} M${hangerX - 20} ${y + 50} H${hangerX + 21} M${hangerX - 19} ${y + 66} H${hangerX + 20}`}
              stroke="#f2f1eb"
              strokeWidth="2"
              opacity="0.7"
            />
          )}
        </g>
      );
    })}
  </g>
);

const HouseOfGonStorefrontArtwork = () => (
  <>
    <defs>
      <linearGradient id="house-of-gon-wall" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="#dfd4c8" />
        <stop offset="45%" stopColor="#c8b9ac" />
        <stop offset="100%" stopColor="#9e9185" />
      </linearGradient>
      <linearGradient id="house-of-gon-painted-wood" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="#34522d" />
        <stop offset="30%" stopColor="#71936b" />
        <stop offset="58%" stopColor="#486d40" />
        <stop offset="100%" stopColor="#203a25" />
      </linearGradient>
      <linearGradient id="house-of-gon-sign-panel" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="#9fbf9a" />
        <stop offset="48%" stopColor="#83ad7e" />
        <stop offset="100%" stopColor="#6b9968" />
      </linearGradient>
      <linearGradient id="house-of-gon-glass" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="#edf0ee" stopOpacity="0.74" />
        <stop offset="45%" stopColor="#bfc9c4" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#415444" stopOpacity="0.34" />
      </linearGradient>
      <linearGradient id="house-of-gon-door-glass" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="#1d261d" stopOpacity="0.84" />
        <stop offset="55%" stopColor="#34402e" stopOpacity="0.42" />
        <stop offset="100%" stopColor="#e8ede9" stopOpacity="0.24" />
      </linearGradient>
      <linearGradient id="house-of-gon-sidewalk" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="#a89f98" />
        <stop offset="100%" stopColor="#6f6964" />
      </linearGradient>
      <pattern id="house-of-gon-sign-grain" width="29" height="29" patternUnits="userSpaceOnUse">
        <rect width="29" height="29" fill="transparent" />
        <path d="M0 7 H29 M6 0 V29" stroke="#f2f2e8" strokeOpacity="0.08" strokeWidth="1" />
        <circle cx="7" cy="19" r="0.9" fill="#244124" opacity="0.18" />
        <circle cx="21" cy="9" r="0.7" fill="#f8f7ed" opacity="0.22" />
      </pattern>
      <pattern id="house-of-gon-pavement" width="44" height="28" patternUnits="userSpaceOnUse">
        <rect width="44" height="28" fill="#857f79" />
        <path d="M0 27.5 H44 M43.5 0 V28" stroke="#6b6560" strokeWidth="1" opacity="0.55" />
        <path d="M0 0 L44 28 M44 0 L0 28" stroke="#9b938c" strokeWidth="0.65" opacity="0.18" />
      </pattern>
      <filter id="house-of-gon-letter-shadow" x="-12%" y="-20%" width="128%" height="150%">
        <feDropShadow dx="8" dy="8" floodColor="#1f301d" floodOpacity="0.54" stdDeviation="1.8" />
      </filter>
      <filter id="house-of-gon-frame-shadow" x="-8%" y="-5%" width="116%" height="112%">
        <feDropShadow dx="0" dy="12" floodColor="#1c2019" floodOpacity="0.24" stdDeviation="7" />
      </filter>
    </defs>

    <rect width="860" height="1060" fill="url(#house-of-gon-wall)" />
    <rect x="26" y="18" width="808" height="1018" fill="#263b27" opacity="0.16" />

    <g filter="url(#house-of-gon-frame-shadow)">
      <rect x="30" y="22" width="800" height="1000" fill="url(#house-of-gon-painted-wood)" />
      <rect x="47" y="40" width="766" height="956" fill="#223622" opacity="0.5" />

      <rect x="47" y="40" width="766" height="92" fill="url(#house-of-gon-glass)" />
      {topWindowPanels.map((panel) => (
        <rect key={panel.x} x={panel.x} y="48" width={panel.width} height="76" fill="#dde2dc" opacity={panel.opacity} />
      ))}
      {topMullions.map((x) => (
        <rect key={x} x={x} y="36" width="12" height="102" fill="url(#house-of-gon-painted-wood)" />
      ))}
      {laceArcs.map(([x, y]) => (
        <g key={`${x}-${y}`} opacity="0.28" stroke="#f4f4ee" strokeWidth="2" fill="none">
          <path d={`M${x} ${y + 18} Q${x + 20} ${y - 8} ${x + 40} ${y + 18}`} />
          <path d={`M${x} ${y + 34} Q${x + 20} ${y + 8} ${x + 40} ${y + 34}`} />
        </g>
      ))}

      <HouseOfGonSign />

      <rect x="31" y="324" width="798" height="24" fill="url(#house-of-gon-painted-wood)" />
      <rect x="31" y="324" width="798" height="5" fill="#9ab991" opacity="0.45" />

      <rect x="48" y="348" width="248" height="648" fill="#314a2f" />
      <rect x="70" y="370" width="196" height="606" fill="#23331f" opacity="0.95" />
      <path d="M74 382 H264 V967 H74 Z" fill="url(#house-of-gon-door-glass)" />
      <path d="M70 370 L30 395 V1006 L70 976 Z" fill="url(#house-of-gon-painted-wood)" />
      <path d="M42 454 L60 445 M42 542 L60 532 M42 672 L60 662 M42 812 L60 802 M42 938 L60 928" stroke="#1b2819" strokeWidth="5" opacity="0.55" />
      <rect x="92" y="720" width="58" height="112" fill="#d7ebe7" opacity="0.85" />
      <path d="M105 735 Q124 715 139 735 L139 810 H105 Z" fill="#24344b" opacity="0.42" />
      <path d="M137 738 Q157 715 171 738 L171 810 H137 Z" fill="#efe7dc" opacity="0.62" />

      <rect x="296" y="348" width="520" height="648" fill="#253c26" />
      <rect x="314" y="366" width="484" height="505" fill="url(#house-of-gon-glass)" />
      {displayMullions.map((x) => (
        <rect key={x} x={x} y="348" width="12" height="648" fill="url(#house-of-gon-painted-wood)" />
      ))}
      <rect x="296" y="848" width="520" height="18" fill="url(#house-of-gon-painted-wood)" />

      <path d="M340 550 C440 478 582 474 765 408" fill="none" stroke="#353c32" strokeWidth="3" opacity="0.3" />
      <path d="M355 613 C476 550 583 540 774 498" fill="none" stroke="#2f372f" strokeWidth="2.4" opacity="0.24" />
      <path d="M358 622 L520 468 M402 658 L600 430 M482 650 L760 442" stroke="#2b352c" strokeWidth="1.8" opacity="0.24" />

      <g opacity="0.96">
        <text x="366" y="604" fill="#f7f8f5" fontFamily='"Heebo", Arial, sans-serif' fontSize="34" fontWeight="800" letterSpacing="2">
          OUTLET SALE
        </text>
        <text x="421" y="682" fill="#d34245" fontFamily='"Heebo", Arial, sans-serif' fontSize="62" fontWeight="900">
          % OFF
        </text>
      </g>

      <g aria-hidden="true">
        <path d="M443 437 Q505 405 567 437 V585 Q505 612 443 585 Z" fill="#edf0ed" opacity="0.82" />
        <path d="M468 584 H548 L562 759 Q506 783 452 759 Z" fill="#f2f3ee" opacity="0.9" />
        <path d="M445 450 Q505 478 565 450" fill="none" stroke="#d6d2c9" strokeWidth="4" opacity="0.9" />
      </g>

      {hangingRails.map((rail) => (
        <ClothesRail key={rail.x} {...rail} />
      ))}

      <g aria-hidden="true">
        <rect x="617" y="676" width="132" height="162" fill="#dae7ef" opacity="0.86" />
        <circle cx="683" cy="714" r="22" fill="#d9b28c" />
        <path d="M642 772 Q682 742 724 772 L738 836 H628 Z" fill="#d0cbc1" />
        <path d="M650 782 L715 834 M717 782 L646 834" stroke="#5a6975" strokeWidth="2" opacity="0.45" />
      </g>

      {productBottles.map((bottle) => (
        <g key={bottle.x} aria-hidden="true">
          <rect x={bottle.x} y={bottle.y} width="18" height={bottle.h} rx="6" fill={bottle.fill} opacity="0.92" />
          <rect x={bottle.x + 5} y={bottle.y - 8} width="8" height="12" rx="2" fill="#2a2a25" />
          <rect x={bottle.x + 3} y={bottle.y + bottle.h * 0.48} width="12" height="10" fill="#ede0a8" opacity="0.72" />
        </g>
      ))}

      <g aria-hidden="true">
        <ellipse cx="545" cy="896" rx="36" ry="13" fill="#dcd58c" />
        <path d="M515 894 Q545 851 575 894 Z" fill="#ece7a5" stroke="#8f8551" strokeWidth="1.4" />
        <path d="M540 891 H558" stroke="#847c48" strokeWidth="2" />
      </g>

      <g aria-hidden="true">
        <path d="M314 866 H798 V993 H314 Z" fill="url(#house-of-gon-painted-wood)" />
        {[343, 523, 703].map((x) => (
          <g key={x}>
            <rect x={x} y="885" width="136" height="84" fill="#45683d" stroke="#213820" strokeWidth="3" />
            <path d={`M${x + 12} 893 L${x + 68} 928 L${x + 124} 893 M${x + 12} 961 L${x + 68} 928 L${x + 124} 961`} fill="none" stroke="#74936a" strokeWidth="5" opacity="0.55" />
          </g>
        ))}
      </g>

      <rect x="31" y="22" width="798" height="1000" fill="none" stroke="#17301c" strokeWidth="7" opacity="0.72" />
      <rect x="47" y="40" width="766" height="956" fill="none" stroke="#b3c7a8" strokeWidth="2" opacity="0.38" />
      <path d="M56 44 H804 M48 134 H812 M39 329 H823" stroke="#d2dfc5" strokeWidth="2.2" opacity="0.33" />
    </g>

    <rect x="0" y="997" width="860" height="63" fill="url(#house-of-gon-sidewalk)" />
    <rect x="0" y="997" width="860" height="63" fill="url(#house-of-gon-pavement)" opacity="0.64" />
    {floorDiamonds.map(([x, y]) => (
      <path key={`${x}-${y}`} d={`M${x} ${y} l21 16 l-21 16 l-21 -16 z`} fill="#5c6170" opacity="0.35" />
    ))}
  </>
);

const HouseOfGonStorefrontScene = ({
  className,
  style,
  preserveAspectRatio = "xMidYMid meet",
  variant = "storefront",
  ...svgProps
}: HouseOfGonStorefrontSceneProps) => (
  <svg
    aria-label={variant === "sign" ? "House of Gon sign design" : "House of Gon storefront design"}
    className={className}
    preserveAspectRatio={preserveAspectRatio}
    role="img"
    viewBox={variant === "sign" ? "0 110 860 228" : "0 0 860 1060"}
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
    <HouseOfGonStorefrontArtwork />
  </svg>
);

export default HouseOfGonStorefrontScene;
