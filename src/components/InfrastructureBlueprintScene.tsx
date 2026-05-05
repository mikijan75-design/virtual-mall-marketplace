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

const shelfRows = [88, 138, 190, 244, 300];
const columns = [56, 206, 346, 486, 636, 778];
const counterPanels = [168, 308, 448, 588, 728];

const blueprintItems: BlueprintItem[] = [
  { type: "laptop", x: 96, y: 110, label: "UI", scale: 0.75 },
  { type: "document", x: 150, y: 110, label: "API", scale: 0.72 },
  { type: "phone", x: 222, y: 162, scale: 0.72 },
  { type: "router", x: 88, y: 162, scale: 0.8 },
  { type: "globe", x: 128, y: 216, label: "ISO", scale: 0.7 },
  { type: "tablet", x: 188, y: 216, scale: 0.72 },
  { type: "laptop", x: 116, y: 270, label: "UX", scale: 0.84 },
  { type: "phone", x: 260, y: 270, scale: 0.75 },
  { type: "box", x: 336, y: 164, label: "DB", scale: 0.78 },
  { type: "globe", x: 396, y: 216, scale: 0.64 },
  { type: "tablet", x: 318, y: 216, scale: 0.74 },
  { type: "monitor", x: 452, y: 110, scale: 0.82 },
  { type: "router", x: 508, y: 162, scale: 0.78 },
  { type: "printer", x: 410, y: 216, scale: 0.7 },
  { type: "phone", x: 446, y: 270, scale: 0.72 },
  { type: "document", x: 520, y: 270, label: "CSS", scale: 0.72 },
  { type: "monitor", x: 596, y: 110, scale: 0.85 },
  { type: "document", x: 600, y: 162, label: "DOC", scale: 0.75 },
  { type: "router", x: 672, y: 162, label: "I/O", scale: 0.78 },
  { type: "tablet", x: 620, y: 216, scale: 0.72 },
  { type: "printer", x: 710, y: 270, scale: 0.72 },
  { type: "box", x: 776, y: 110, scale: 0.74 },
  { type: "globe", x: 824, y: 110, scale: 0.64 },
  { type: "laptop", x: 786, y: 216, scale: 0.82 },
  { type: "phone", x: 884, y: 270, scale: 0.72 },
  { type: "laptop", x: 210, y: 344, label: "LIVE", scale: 0.92 },
  { type: "laptop", x: 290, y: 344, scale: 0.86 },
  { type: "tablet", x: 378, y: 344, label: "SVG", scale: 0.8 },
  { type: "document", x: 466, y: 344, label: "TS", scale: 0.78 },
  { type: "globe", x: 548, y: 344, scale: 0.74 },
  { type: "monitor", x: 632, y: 344, scale: 0.84 },
  { type: "printer", x: 712, y: 344, scale: 0.76 },
  { type: "router", x: 798, y: 344, scale: 0.74 },
];

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
    <figure className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/20 bg-[#052b56] shadow-2xl shadow-slate-950/30">
      <svg
        className="h-auto w-full text-white"
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
                stroke-width: 1.35;
                opacity: 0.86;
                filter: url(#blueprintSoftGlow);
              }

              .blueprint-detail,
              .blueprint-device {
                stroke-width: 1.15;
                opacity: 0.72;
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

        <rect width="1024" height="576" fill="url(#blueprintGlow)" />
        <rect width="1024" height="576" fill="url(#blueprintGrid)" />
        <path d="M57 58h910v392H57z" className="blueprint-perspective" />
        <path d="M75 70h872v370H75z" className="blueprint-perspective" />
        <path d="M57 58 75 70M967 58 947 70M57 450l18-10M967 450l-20-10" className="blueprint-perspective" />

        <g className="blueprint-main">
          <path className="drawn-line" d="M56 58h912l-6 7H62z" />
          <path className="drawn-line" d="M75 70v370M947 70v370M75 440h872" />
          <path className="drawn-line" d="M75 122h872M75 176h872M75 230h872M75 284h872M75 338h872" />
          {columns.map((x) => (
            <path key={x} className="drawn-line" d={`M${x} 70v370M${x + 8} 76v358`} />
          ))}
          <path className="drawn-line" d="M184 470h664v90H184z" />
          <path className="drawn-line" d="M208 486h616v62H208z" />
        </g>

        <g className="blueprint-detail">
          {shelfRows.map((y) => (
            <path key={y} d={`M75 ${y}h872`} />
          ))}
          {counterPanels.map((x) => (
            <path key={x} d={`M${x} 470v90`} />
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

        <g className="blueprint-perspective">
          <path d="M966 513c13-4 19-13 22-27 3 14 10 23 24 27-14 4-21 13-24 27-3-14-9-23-22-27z" fill="currentColor" opacity="0.34" />
          <path d="M899 548h56M899 552h38" />
          <text x="956" y="552" fill="currentColor" stroke="none" fontSize="8" textAnchor="end">
            TECHNICAL LAYOUT: LIVE CODED VECTOR
          </text>
        </g>
      </svg>
      <figcaption className="absolute bottom-4 left-6 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-white/75 backdrop-blur">
        Sampled infrastructure lines / blueprint shelf system
      </figcaption>
    </figure>
  );
};

export default InfrastructureBlueprintScene;
