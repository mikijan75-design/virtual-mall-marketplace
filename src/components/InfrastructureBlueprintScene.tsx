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

import beggarsP1 from "@/assets/beggars/p1.png";
import beggarsP2 from "@/assets/beggars/p2.png";
import beggarsP3 from "@/assets/beggars/p3.png";
import beggarsP4 from "@/assets/beggars/p4.png";
import beggarsP5 from "@/assets/beggars/p5.png";
import beggarsP6 from "@/assets/beggars/p6.png";

type FeaturedProduct = {
  rowIdx: number;
  colIdx: number;
  src: string;
  alt: string;
};

// 6 unique products placed randomly across the 5×6 shelf grid (no duplicates, one per cell)
const featuredProducts: FeaturedProduct[] = [
  { rowIdx: 0, colIdx: 1, src: beggarsP1, alt: "BEGGARS product 1" },
  { rowIdx: 1, colIdx: 4, src: beggarsP2, alt: "BEGGARS product 2" },
  { rowIdx: 2, colIdx: 0, src: beggarsP3, alt: "BEGGARS product 3" },
  { rowIdx: 2, colIdx: 3, src: beggarsP4, alt: "BEGGARS product 4" },
  { rowIdx: 3, colIdx: 5, src: beggarsP5, alt: "BEGGARS product 5" },
  { rowIdx: 4, colIdx: 2, src: beggarsP6, alt: "BEGGARS product 6" },
];

const shelfRows = [135, 190, 245, 300, 375];
// Symmetric vertical dividers: equal 169px gap on both left (75→244) and right (778→947) edges
const columns = [244, 377, 511, 644, 778];
// Symmetric inner counter dividers (counter spans 184→848, center 516)
const counterPanels = [317, 450, 582, 715];

// Cell centers symmetric around the shelf center (511)
const cellCenters = [160, 311, 444, 578, 711, 862];
const rowItemTypes: BlueprintItemType[][] = [
  ["laptop", "monitor", "document", "monitor", "box", "globe"],
  ["router", "phone", "router", "router", "document", "tablet"],
  ["globe", "tablet", "printer", "tablet", "globe", "laptop"],
  ["laptop", "phone", "phone", "document", "printer", "phone"],
  ["tablet", "laptop", "monitor", "globe", "router", "printer"],
];
const blueprintItems: BlueprintItem[] = rowItemTypes.flatMap((row, rowIdx) => {
  const shelfY = [135, 190, 245, 300, 375][rowIdx];
  return row
    .map((type, colIdx) => {
      if (
        featuredProducts.some(
          (p) => p.rowIdx === rowIdx && p.colIdx === colIdx,
        )
      ) {
        return null;
      }
      return {
        type,
        x: cellCenters[colIdx],
        y: shelfY - 22,
        scale: 0.78,
      } as BlueprintItem;
    })
    .filter((item): item is BlueprintItem => item !== null);
});

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
        {/* Light wood fill inside the outer frame */}
        <rect x="57" y="58" width="910" height="392" fill="#e8c79a" />
        {/* Cream background panels for cabinet and counter (lighter) */}
        <rect x="75" y="70" width="872" height="370" fill="#fbf7ec" />
        <rect x="184" y="470" width="664" height="80" fill="#fbf7ec" />
        {/* Light wood fill between the vertical column partitions */}
        {columns.map((x) => (
          <rect key={`partition-${x}`} x={x} y={70} width={8} height={370} fill="#e8c79a" />
        ))}
        {/* Wood-colored outer frame around the cabinet */}
        <rect x="57" y="58" width="910" height="392" fill="none" stroke="#b8895a" strokeWidth="6" />
        {/* Thin dark outline on the outer frame edges */}
        <rect x="57" y="58" width="910" height="392" fill="none" stroke="#0a0a0a" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />

        <g className="blueprint-main">
          <path className="drawn-line" d="M56 58h912l-6 7H62z" />
          <path className="drawn-line" d="M75 70v370M947 70v370M75 440h872" />
          <path className="drawn-line" d="M75 135h872M75 190h872M75 245h872M75 300h872M75 375h872" />
          {columns.map((x) => (
            <path key={x} className="drawn-line" d={`M${x} 70v370M${x + 8} 76v358`} />
          ))}
          <path d="M184 470h664v80H184z" />
          <path d="M208 484h616v52H208z" />
        </g>

        <g className="blueprint-detail">
          {counterPanels.map((x) => (
            <path key={x} d={`M${x} 470v80`} />
          ))}
          {columns.map((x) => (
            <path key={`cap-${x}`} d={`M${x - 5} 70l12-12 12 12`} />
          ))}
        </g>

        <g {...lineProps}>
          {blueprintItems.map((item, index) => (
            <BlueprintIcon key={`${item.type}-${index}`} item={item} />
          ))}
        </g>

        {featuredProducts.map((product) => {
          const shelfY = [135, 190, 245, 300, 375][product.rowIdx];
          const cx = cellCenters[product.colIdx];
          const imgW = 70;
          const imgH = 52;
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
