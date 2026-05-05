type BlueprintItemType =
  | "laptop"
  | "monitor"
  | "phone"
  | "tablet"
  | "router"
  | "box"
  | "document"
  | "globe"
  | "printer";

type BlueprintItem = {
  type: BlueprintItemType;
  x: number;
  y: number;
  label?: string;
  scale?: number;
};

import p1 from "@/assets/beggars/p1.png";
import p2 from "@/assets/beggars/p2.png";
import p3 from "@/assets/beggars/p3.png";
import p4 from "@/assets/beggars/p4.png";
import p5 from "@/assets/beggars/p5.png";
import p6 from "@/assets/beggars/p6.png";
import p7 from "@/assets/beggars/p7.png";
import p8 from "@/assets/beggars/p8.png";
import p9 from "@/assets/beggars/p9.png";
import p10 from "@/assets/beggars/p10.png";
import p11 from "@/assets/beggars/p11.png";
import p12 from "@/assets/beggars/p12.png";
import p13 from "@/assets/beggars/p13.png";
import p14 from "@/assets/beggars/p14.png";
import p15 from "@/assets/beggars/p15.png";
import p16 from "@/assets/beggars/p16.png";
import p17 from "@/assets/beggars/p17.png";
import p18 from "@/assets/beggars/p18.png";
import p19 from "@/assets/beggars/p19.png";
import p20 from "@/assets/beggars/p20.png";

type FeaturedProduct = {
  rowIdx: number;
  colIdx: number;
  src: string;
  alt: string;
};

// 15 unique BEGGARS products (one per shelf cell), randomly arranged across the 3×5 grid
const productPool = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17, p18, p19, p20];
const randomOrder = [11, 5, 13, 2, 3, 14, 9, 17, 6, 10, 1, 15, 4, 20, 7];
const featuredProducts: FeaturedProduct[] = randomOrder.map((id, i) => ({
  rowIdx: Math.floor(i / 5),
  colIdx: i % 5,
  src: productPool[id - 1],
  alt: `BEGGARS product ${id}`,
}));

// 3 equal-height rows across the cabinet (70→440, step ≈123.33)
const shelfRows = [193, 317, 440];
// 4 vertical partitions making 5 equal-width cells across 75→947 (step ≈174.4)
const columns = [249, 424, 598, 773];
// Symmetric inner counter dividers (counter spans 184→848, center 516)
const counterPanels = [317, 450, 582, 715];

// Cell centers for 5 equal columns
const cellCenters = [162, 336, 511, 685, 859];
const blueprintItems: BlueprintItem[] = [];

const lineProps = {
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  vectorEffect: "non-scaling-stroke" as const,
};

const BlueprintIcon = ({ item }: { item: BlueprintItem }) => {
  const scale = item.scale ?? 1;
  const transform = `translate(${item.x} ${item.y}) scale(${scale})`;

  switch (item.type) {
    case "laptop":
      return (
        <g transform={transform} className="blueprint-device">
          <rect x="-24" y="-18" width="48" height="30" rx="2" />
          <path d="M-28 16h56l-5 6h-46z" />
          <path d="M-8 -4h16M-5 0h10" />
          {item.label && <text y="5">{item.label}</text>}
        </g>
      );
    case "monitor":
      return (
        <g transform={transform} className="blueprint-device">
          <rect x="-23" y="-18" width="46" height="30" rx="2" />
          <path d="M-8 15h16M-16 22h32" />
          <path d="M-13 -4h26M-9 2h18" />
        </g>
      );
    case "phone":
      return (
        <g transform={transform} className="blueprint-device">
          <rect x="-9" y="-21" width="18" height="42" rx="3" />
          <path d="M-4 -16h8M-3 15h6" />
        </g>
      );
    case "tablet":
      return (
        <g transform={transform} className="blueprint-device">
          <rect x="-14" y="-20" width="28" height="40" rx="3" />
          <path d="M-6 -15h12M-3 15h6" />
        </g>
      );
    case "router":
      return (
        <g transform={transform} className="blueprint-device">
          <path d="M-23 4h46v14h-46z" />
          <path d="M-12 4-18-16M12 4l18-20M-8 11h16M14 11h3M-17 11h3" />
        </g>
      );
    case "box":
      return (
        <g transform={transform} className="blueprint-device">
          <rect x="-16" y="-18" width="32" height="36" rx="2" />
          <path d="M-11 -10h22M-8 -2h16" />
          {item.label && <text y="8">{item.label}</text>}
        </g>
      );
    case "document":
      return (
        <g transform={transform} className="blueprint-device">
          <path d="M-15 -20h22l8 8v32h-30z" />
          <path d="M7 -20v8h8M-8 -6h16M-8 0h16M-8 6h10" />
          {item.label && <text y="16">{item.label}</text>}
        </g>
      );
    case "globe":
      return (
        <g transform={transform} className="blueprint-device">
          <circle r="18" />
          <path d="M-18 0h36M0 -18c8 8 8 28 0 36M0 -18c-8 8-8 28 0 36M-12 -10c7 3 17 3 24 0M-12 10c7-3 17-3 24 0" />
          {item.label && <text y="5">{item.label}</text>}
        </g>
      );
    case "printer":
      return (
        <g transform={transform} className="blueprint-device">
          <rect x="-22" y="-6" width="44" height="22" rx="2" />
          <path d="M-15 -20h30v14h-30zM-12 16h24v10h-24zM12 3h5" />
        </g>
      );
    default:
      return null;
  }
};

const InfrastructureBlueprintScene = () => {
  return (
    <figure className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-[2rem] border border-[#7a4a22] bg-white shadow-2xl shadow-slate-950/30">
      <svg
        className="h-auto w-full text-[#0a0a0a]"
        viewBox="0 0 1024 576"
        role="img"
        aria-labelledby="infrastructure-blueprint-title infrastructure-blueprint-desc"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title id="infrastructure-blueprint-title">Live coded infrastructure blueprint</title>
        <desc id="infrastructure-blueprint-desc">
          A blue technical wireframe of shelves, counters, and infrastructure devices inspired by the supplied image.
        </desc>
        <defs>
          <radialGradient id="blueprintGlow" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#0d4f86" />
            <stop offset="60%" stopColor="#063868" />
            <stop offset="100%" stopColor="#031f44" />
          </radialGradient>
          {/* Realistic wood gradients */}
          <linearGradient id="woodFrame" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c89a68" />
            <stop offset="50%" stopColor="#a87642" />
            <stop offset="100%" stopColor="#7a4a22" />
          </linearGradient>
          <linearGradient id="woodLight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f0d4a8" />
            <stop offset="50%" stopColor="#e3bf8a" />
            <stop offset="100%" stopColor="#c89a6a" />
          </linearGradient>
          <linearGradient id="woodPartition" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8c5a30" />
            <stop offset="35%" stopColor="#d4a878" />
            <stop offset="65%" stopColor="#d4a878" />
            <stop offset="100%" stopColor="#8c5a30" />
          </linearGradient>
          <linearGradient id="creamBack" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fdfaf0" />
            <stop offset="100%" stopColor="#f0e6d0" />
          </linearGradient>
          <linearGradient id="shelfPlank" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e8c79a" />
            <stop offset="50%" stopColor="#b8895a" />
            <stop offset="100%" stopColor="#7a4a22" />
          </linearGradient>
          <linearGradient id="shelfShadow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#000" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="cellShade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#000" stopOpacity="0.18" />
            <stop offset="40%" stopColor="#000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.08" />
          </linearGradient>
          <linearGradient id="counterTop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fafafa" />
            <stop offset="100%" stopColor="#dcd6c8" />
          </linearGradient>
          <linearGradient id="counterFront" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f5f1e6" />
            <stop offset="100%" stopColor="#c9c0aa" />
          </linearGradient>
          <linearGradient id="ledGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff8d0" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#fff1a8" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#fff1a8" stopOpacity="0" />
          </linearGradient>
          <pattern id="woodGrain" width="120" height="60" patternUnits="userSpaceOnUse">
            <rect width="120" height="60" fill="url(#woodLight)" />
            <path d="M0 12 Q30 8 60 14 T120 12" fill="none" stroke="#a87642" strokeOpacity="0.18" strokeWidth="0.6" />
            <path d="M0 28 Q40 24 80 30 T120 28" fill="none" stroke="#8c5a30" strokeOpacity="0.14" strokeWidth="0.5" />
            <path d="M0 44 Q35 40 70 46 T120 44" fill="none" stroke="#a87642" strokeOpacity="0.16" strokeWidth="0.6" />
          </pattern>
          <pattern id="blueprintGrid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M32 0H0v32" fill="none" stroke="#9ad4ff" strokeOpacity="0.08" strokeWidth="1" />
          </pattern>
          <filter id="blueprintSoftGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <style>
            {`
              .blueprint-main,
              .blueprint-detail,
              .blueprint-device,
              .blueprint-perspective {
                fill: none;
                stroke: currentColor;
                stroke-linecap: round;
                stroke-linejoin: round;
                vector-effect: non-scaling-stroke;
              }

              .blueprint-main {
                stroke-width: 0.5;
                opacity: 1;
              }

              .blueprint-detail,
              .blueprint-device {
                stroke-width: 0.5;
                opacity: 1;
              }

              .blueprint-perspective {
                stroke-width: 0.85;
                opacity: 0.42;
              }

              .blueprint-device text {
                fill: currentColor;
                stroke: none;
                font: 8px monospace;
                text-anchor: middle;
                opacity: 0.88;
              }

              .drawn-line {
                stroke-dasharray: 900;
                stroke-dashoffset: 900;
                animation: blueprint-draw 4.8s ease-out forwards;
              }

              .drawn-line:nth-of-type(2n) {
                animation-delay: 0.22s;
              }

              .drawn-line:nth-of-type(3n) {
                animation-delay: 0.42s;
              }

              @keyframes blueprint-draw {
                to {
                  stroke-dashoffset: 0;
                }
              }
            `}
          </style>
        </defs>

        <rect width="1024" height="576" fill="#ffffff" />
        {/* Floor shadow under cabinet */}
        <ellipse cx="512" cy="558" rx="430" ry="10" fill="#000" opacity="0.18" />
        {/* Wood frame body with grain pattern */}
        <rect x="57" y="58" width="910" height="392" fill="url(#woodGrain)" />
        {/* Inner cream backing panel (the back wall of the cabinet) */}
        <rect x="75" y="70" width="872" height="370" fill="url(#creamBack)" />
        {/* Subtle inner shadow on cream back */}
        <rect x="75" y="70" width="872" height="14" fill="url(#shelfShadow)" />
        {/* Horizontal shelf planks (3D look) */}
        {shelfRows.map((y) => (
          <g key={`plank-${y}`}>
            <rect x="75" y={y - 4} width="872" height="8" fill="url(#shelfPlank)" />
            <rect x="75" y={y + 4} width="872" height="3" fill="#000" opacity="0.25" />
            <rect x="75" y={y - 4} width="872" height="1" fill="#fff" opacity="0.4" />
          </g>
        ))}
        {/* LED light strip under each shelf top, illuminating products below */}
        {[70, ...shelfRows.slice(0, -1)].map((topY) => (
          <g key={`led-${topY}`}>
            {/* Glow cone falling down onto products */}
            <rect x="78" y={topY + 4} width="866" height="60" fill="url(#ledGlow)" pointerEvents="none" />
            {/* LED strip housing */}
            <rect x="78" y={topY + 1} width="866" height="3" fill="#e8e4d6" />
            {/* Bright LED line */}
            <rect x="80" y={topY + 2} width="862" height="1.4" fill="#ffffff" opacity="0.95" />
            <rect x="80" y={topY + 2} width="862" height="0.6" fill="#fffbe0" />
          </g>
        ))}
        {/* Wood vertical partitions with rounded shading */}
        {columns.map((x) => (
          <g key={`partition-${x}`}>
            <rect x={x} y={70} width={8} height={370} fill="url(#woodPartition)" />
            <rect x={x} y={70} width={1} height={370} fill="#fff" opacity="0.25" />
            <rect x={x + 7} y={70} width={1} height={370} fill="#000" opacity="0.3" />
          </g>
        ))}
        {/* Per-cell subtle inner shading for depth */}
        {shelfRows.map((bot, rIdx) => {
          const top = rIdx === 0 ? 70 : shelfRows[rIdx - 1];
          const cellEdges = [75, ...columns.map((c) => c + 8), 947];
          return cellEdges.slice(0, -1).map((left, i) => {
            const right = cellEdges[i + 1];
            return (
              <rect
                key={`cell-${rIdx}-${i}`}
                x={left}
                y={top}
                width={right - left}
                height={bot - top}
                fill="url(#cellShade)"
                pointerEvents="none"
              />
            );
          });
        })}
        {/* Outer wood frame highlights and edges */}
        <rect x="57" y="58" width="910" height="392" fill="none" stroke="url(#woodFrame)" strokeWidth="6" />
        <rect x="60" y="61" width="904" height="386" fill="none" stroke="#fff" strokeOpacity="0.25" strokeWidth="1" />
        <rect x="57" y="58" width="910" height="392" fill="none" stroke="#3a1f08" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
        {/* Counter: top, front, base shadow */}
        <rect x="180" y="464" width="672" height="14" fill="url(#counterTop)" />
        <rect x="180" y="464" width="672" height="2" fill="#fff" opacity="0.6" />
        <rect x="184" y="478" width="664" height="72" fill="url(#counterFront)" />
        <rect x="184" y="478" width="664" height="72" fill="none" stroke="#8a8270" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
        {/* Counter panel divisions with subtle shadow lines */}
        {counterPanels.map((x) => (
          <g key={`cpanel-${x}`}>
            <line x1={x} y1={478} x2={x} y2={550} stroke="#8a8270" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
            <line x1={x + 1} y1={478} x2={x + 1} y2={550} stroke="#fff" strokeOpacity="0.5" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
          </g>
        ))}
        {/* Counter ground shadow */}
        <rect x="184" y="548" width="664" height="6" fill="#000" opacity="0.18" />

        <g className="blueprint-main">
          <path className="drawn-line" d="M75 70v370M947 70v370M75 440h872" />
        </g>

        <g {...lineProps}>
          {blueprintItems.map((item, index) => (
            <BlueprintIcon key={`${item.type}-${index}`} item={item} />
          ))}
        </g>

        {featuredProducts.map((product) => {
          const shelfY = shelfRows[product.rowIdx];
          const cx = cellCenters[product.colIdx];
          const imgW = 110;
          const imgH = 100;
          return (
            <image
              key={`featured-${product.rowIdx}-${product.colIdx}`}
              href={product.src}
              x={cx - imgW / 2}
              y={shelfY - imgH}
              width={imgW}
              height={imgH}
              preserveAspectRatio="xMidYMax meet"
            >
              <title>{product.alt}</title>
            </image>
          );
        })}

      </svg>
    </figure>
  );
};

export default InfrastructureBlueprintScene;
