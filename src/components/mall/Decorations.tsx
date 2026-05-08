type FlowerSpec = {
  x: number;
  y: number;
  petal: string;
  center?: string;
  size?: number;
};

type ShrubSpec = {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
};

const flowerClusters: FlowerSpec[] = [
  { x: 38, y: 136, petal: "#f6a8bd", size: 1.08 },
  { x: 64, y: 124, petal: "#f26f91", size: 0.94 },
  { x: 92, y: 145, petal: "#ffe07a", center: "#8b5a2b", size: 1.02 },
  { x: 132, y: 132, petal: "#f7c2d5", size: 0.9 },
  { x: 174, y: 146, petal: "#f6f4f1", size: 0.86 },
  { x: 220, y: 128, petal: "#b7c4ff", size: 0.9 },
  { x: 256, y: 148, petal: "#f1a6cf", size: 1.04 },
  { x: 306, y: 134, petal: "#f4ef7c", center: "#936226", size: 0.86 },
  { x: 350, y: 146, petal: "#e9f2f5", size: 0.94 },
  { x: 394, y: 130, petal: "#ffb85b", center: "#8b4e24", size: 1 },
  { x: 442, y: 146, petal: "#fff5cf", size: 0.88 },
  { x: 486, y: 128, petal: "#d4b2ff", size: 0.92 },
  { x: 532, y: 145, petal: "#f26f91", size: 1 },
  { x: 578, y: 132, petal: "#ffcf5a", center: "#7f4f25", size: 0.96 },
  { x: 620, y: 148, petal: "#f5f0ff", size: 0.84 },
  { x: 665, y: 133, petal: "#ffa0bd", size: 1.06 },
  { x: 710, y: 145, petal: "#f6f4f1", size: 0.92 },
  { x: 750, y: 128, petal: "#ffd36c", center: "#815424", size: 0.92 },
  { x: 798, y: 148, petal: "#d9b8ff", size: 0.95 },
  { x: 840, y: 132, petal: "#f6a7c0", size: 0.92 },
  { x: 886, y: 146, petal: "#fff4cf", size: 0.86 },
  { x: 930, y: 128, petal: "#f07f9c", size: 1.04 },
  { x: 974, y: 146, petal: "#fff8e7", size: 0.92 },
  { x: 1018, y: 132, petal: "#a9c2ff", size: 0.9 },
  { x: 1064, y: 147, petal: "#ffca64", center: "#815123", size: 0.98 },
  { x: 1112, y: 129, petal: "#f5a7c5", size: 0.94 },
  { x: 1158, y: 146, petal: "#f4f7ff", size: 0.88 },
  { x: 1206, y: 132, petal: "#dcb7ff", size: 1.02 },
  { x: 1256, y: 147, petal: "#ffc45d", center: "#815123", size: 0.94 },
  { x: 1304, y: 129, petal: "#f086a6", size: 0.96 },
  { x: 1352, y: 146, petal: "#fbf2d5", size: 0.9 },
];

const lowShrubs: ShrubSpec[] = [
  { x: 18, y: 118, width: 78, height: 42, color: "#65a34f" },
  { x: 132, y: 108, width: 70, height: 50, color: "#78af4e" },
  { x: 272, y: 119, width: 112, height: 40, color: "#5e9c4b" },
  { x: 504, y: 115, width: 95, height: 44, color: "#6aa349" },
  { x: 696, y: 119, width: 126, height: 40, color: "#77a848" },
  { x: 862, y: 112, width: 88, height: 48, color: "#5d9a50" },
  { x: 1048, y: 116, width: 112, height: 42, color: "#75a84d" },
  { x: 1266, y: 111, width: 94, height: 48, color: "#65a34f" },
];

const topiary = [
  { x: 112, y: 100, scale: 1, shade: "#4f8f43" },
  { x: 612, y: 96, scale: 0.88, shade: "#5f9b45" },
  { x: 975, y: 102, scale: 0.95, shade: "#578f44" },
  { x: 1218, y: 98, scale: 0.85, shade: "#689d45" },
];

const conifers = [
  { x: 214, y: 94, scale: 0.82 },
  { x: 378, y: 96, scale: 0.7 },
  { x: 1152, y: 93, scale: 0.76 },
];

const accentPlants = [
  { x: 460, y: 104, height: 34, color: "#5f9f53" },
  { x: 642, y: 108, height: 26, color: "#7aa64b" },
  { x: 676, y: 103, height: 34, color: "#508e49" },
  { x: 738, y: 108, height: 24, color: "#7dac49" },
  { x: 1012, y: 104, height: 30, color: "#5f9850" },
  { x: 1185, y: 106, height: 28, color: "#7aa64b" },
];

const Flower = ({ x, y, petal, center = "#f7d85c", size = 1 }: FlowerSpec) => (
  <g transform={`translate(${x} ${y}) scale(${size})`}>
    {[0, 60, 120, 180, 240, 300].map((angle) => (
      <ellipse key={angle} cx="0" cy="-4.5" rx="3.1" ry="5.2" fill={petal} transform={`rotate(${angle})`} />
    ))}
    <circle cx="0" cy="0" r="2.45" fill={center} />
  </g>
);

const LeafTuft = ({ x, y, height, color }: { x: number; y: number; height: number; color: string }) => (
  <g transform={`translate(${x} ${y})`}>
    {[-18, -10, -4, 4, 11, 18].map((angle, index) => (
      <path
        key={angle}
        d={`M0 0 Q${angle * 0.24} ${-height * 0.55} ${angle * 0.62} ${-height}`}
        fill="none"
        stroke={index % 2 ? color : "#4e8d43"}
        strokeLinecap="round"
        strokeWidth="5"
      />
    ))}
  </g>
);

const RoundedShrub = ({ x, y, width, height, color }: ShrubSpec) => (
  <g transform={`translate(${x} ${y})`}>
    <ellipse cx={width * 0.5} cy={height * 0.68} rx={width * 0.5} ry={height * 0.32} fill="#2c662f" opacity="0.18" />
    {[0.12, 0.3, 0.48, 0.66, 0.84].map((position, index) => (
      <circle
        key={position}
        cx={width * position}
        cy={height * (0.48 + (index % 2) * 0.08)}
        r={height * (0.35 + (index % 3) * 0.04)}
        fill={index % 2 ? color : "#83bb55"}
      />
    ))}
    <ellipse cx={width * 0.5} cy={height * 0.63} rx={width * 0.48} ry={height * 0.28} fill={color} opacity="0.72" />
    <path
      d={`M${width * 0.08} ${height * 0.5} Q${width * 0.42} ${height * 0.17} ${width * 0.92} ${height * 0.5}`}
      fill="none"
      stroke="#a6cf72"
      strokeLinecap="round"
      strokeWidth="2.2"
      opacity="0.55"
    />
  </g>
);

const TopiaryBall = ({ x, y, scale, shade }: { x: number; y: number; scale: number; shade: string }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <rect x="-4" y="28" width="8" height="26" rx="3" fill="#7d5a34" />
    <ellipse cx="0" cy="58" rx="28" ry="7" fill="#315f2c" opacity="0.18" />
    <circle cx="0" cy="7" r="27" fill={shade} />
    <circle cx="-9" cy="-2" r="14" fill="#7fb44d" opacity="0.72" />
    <circle cx="11" cy="12" r="13" fill="#3f7b3d" opacity="0.55" />
    <path d="M-16 -8 Q0 -25 18 -8" fill="none" stroke="#b7d77a" strokeLinecap="round" strokeWidth="2" opacity="0.62" />
  </g>
);

const Conifer = ({ x, y, scale }: { x: number; y: number; scale: number }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <ellipse cx="0" cy="64" rx="23" ry="6" fill="#315f2c" opacity="0.18" />
    <rect x="-4" y="42" width="8" height="22" rx="2" fill="#77512d" />
    <path d="M0 -14 L-26 44 H26 Z" fill="#5c9a46" />
    <path d="M0 2 L-22 50 H22 Z" fill="#4e873f" />
    <path d="M0 16 L-19 58 H19 Z" fill="#3d7839" />
    <path d="M-9 21 Q0 12 10 21" fill="none" stroke="#92be62" strokeWidth="1.8" opacity="0.65" />
  </g>
);

const PicketBorder = () => (
  <g opacity="0.8">
    <rect x="0" y="118" width="1400" height="4" fill="#d5bd78" />
    {Array.from({ length: 36 }, (_, index) => (
      <rect key={index} x={index * 40 - 7} y="108" width="14" height="18" rx="3" fill="#d9c482" opacity={index % 2 ? 0.64 : 0.82} />
    ))}
  </g>
);

type ButterflyPalette = {
  primary: string;
  highlight: string;
  shadow: string;
  body: string;
  outline: string;
  marking?: string;
};

const Butterfly = ({ palette, size = 22 }: { palette: ButterflyPalette; size?: number }) => (
  <svg
    viewBox="0 0 40 32"
    width={size}
    height={size * 0.8}
    style={{ display: "block", overflow: "visible" }}
  >
    {/* Wings group with flap animation */}
    <g style={{ transformOrigin: "20px 16px", animation: "butterfly-flap 0.42s ease-in-out infinite alternate" }}>
      {/* Left wings */}
      <path
        d="M19 16 Q8 4 3 10 Q1 16 5 19 Q3 24 9 26 Q15 26 19 20 Z"
        fill={palette.primary}
        stroke={palette.outline}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M9 11 Q12 14 15 17" stroke={palette.shadow} strokeWidth="0.9" fill="none" />
      <path d="M8 20 Q12 21 16 21" stroke={palette.shadow} strokeWidth="0.9" fill="none" />
      <circle cx="7" cy="12" r="1.2" fill={palette.highlight} />
      {palette.marking && <circle cx="6" cy="22" r="0.9" fill={palette.marking} />}
      {/* Right wings */}
      <path
        d="M21 16 Q32 4 37 10 Q39 16 35 19 Q37 24 31 26 Q25 26 21 20 Z"
        fill={palette.primary}
        stroke={palette.outline}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M31 11 Q28 14 25 17" stroke={palette.shadow} strokeWidth="0.9" fill="none" />
      <path d="M32 20 Q28 21 24 21" stroke={palette.shadow} strokeWidth="0.9" fill="none" />
      <circle cx="33" cy="12" r="1.2" fill={palette.highlight} />
      {palette.marking && <circle cx="34" cy="22" r="0.9" fill={palette.marking} />}
    </g>
    {/* Body */}
    <ellipse cx="20" cy="16" rx="1.4" ry="6" fill={palette.body} />
    <path d="M19 11 Q17 7 16 5" stroke={palette.outline} strokeWidth="0.7" fill="none" strokeLinecap="round" />
    <path d="M21 11 Q23 7 24 5" stroke={palette.outline} strokeWidth="0.7" fill="none" strokeLinecap="round" />
  </svg>
);

const butterflyPalettes: ButterflyPalette[] = [
  // Blue
  { primary: "#3FA2E4", highlight: "#79C7F0", shadow: "#1E67AE", body: "#173B77", outline: "#202020" },
  // Yellow
  { primary: "#E3C435", highlight: "#FFE47A", shadow: "#B59620", body: "#59620F", outline: "#262311" },
  // Green
  { primary: "#2DBB49", highlight: "#63D65A", shadow: "#178A3A", body: "#456B2A", outline: "#21331D" },
  // Orange monarch
  { primary: "#F0640A", highlight: "#FF8A12", shadow: "#B83A07", body: "#73310F", outline: "#1A120E", marking: "#FFFFFF" },
  // Pink (extra)
  { primary: "#F26FA1", highlight: "#FFB7CF", shadow: "#B33A6E", body: "#5C1F3B", outline: "#1F1014" },
  // Purple (extra)
  { primary: "#9B6CE0", highlight: "#C9A8F2", shadow: "#5E3DA1", body: "#2E1A57", outline: "#1A1024" },
];

type ButterflyPlacement = {
  leftPct: number;
  topPct: number;
  size: number;
  rotate: number;
  flipX: boolean;
  duration: number;
  delay: number;
  driftDuration: number;
  driftDelay: number;
  driftX: number;
  driftY: number;
};

// Pre-randomized placements (deterministic — chosen to spread across the strip,
// some hovering above the foliage, some nestled on shrubs).
const butterflyPlacements: ButterflyPlacement[] = [
  { leftPct: 6,  topPct: 18, size: 24, rotate: -14, flipX: false, duration: 0.38, delay: 0.0,  driftDuration: 5.2, driftDelay: 0.0, driftX: 10, driftY: -8 },
  { leftPct: 22, topPct: 52, size: 20, rotate: 8,   flipX: true,  duration: 0.44, delay: 0.15, driftDuration: 6.1, driftDelay: 0.4, driftX: -8, driftY: 6 },
  { leftPct: 38, topPct: 12, size: 22, rotate: 18,  flipX: false, duration: 0.5,  delay: 0.05, driftDuration: 4.8, driftDelay: 0.8, driftX: 12, driftY: 10 },
  { leftPct: 55, topPct: 60, size: 18, rotate: -6,  flipX: false, duration: 0.36, delay: 0.22, driftDuration: 5.6, driftDelay: 0.2, driftX: -10, driftY: -6 },
  { leftPct: 72, topPct: 22, size: 26, rotate: -22, flipX: true,  duration: 0.46, delay: 0.1,  driftDuration: 6.4, driftDelay: 1.0, driftX: 14, driftY: 8 },
  { leftPct: 88, topPct: 48, size: 21, rotate: 12,  flipX: false, duration: 0.4,  delay: 0.3,  driftDuration: 5.0, driftDelay: 0.6, driftX: -12, driftY: -10 },
];

const Butterflies = () => (
  <div className="pointer-events-none absolute inset-0 z-20 overflow-visible">
    <style>{`
      @keyframes butterfly-flap {
        0%   { transform: scaleX(1)    scaleY(1); }
        100% { transform: scaleX(0.55) scaleY(1.04); }
      }
      @keyframes butterfly-drift {
        0%   { transform: translate(0, 0) rotate(var(--bf-rot)) scaleX(var(--bf-flip)); }
        50%  { transform: translate(var(--bf-dx), var(--bf-dy)) rotate(calc(var(--bf-rot) + 6deg)) scaleX(var(--bf-flip)); }
        100% { transform: translate(0, 0) rotate(var(--bf-rot)) scaleX(var(--bf-flip)); }
      }
    `}</style>
    {butterflyPlacements.map((p, i) => (
      <div
        key={i}
        className="absolute"
        style={{
          left: `${p.leftPct}%`,
          top: `${p.topPct}%`,
          width: p.size,
          ["--bf-rot" as string]: `${p.rotate}deg`,
          ["--bf-flip" as string]: p.flipX ? -1 : 1,
          ["--bf-dx" as string]: `${p.driftX}px`,
          ["--bf-dy" as string]: `${p.driftY}px`,
          animation: `butterfly-drift ${p.driftDuration}s ease-in-out ${p.driftDelay}s infinite`,
        }}
      >
        <div style={{ animation: `none` }}>
          <div
            style={{
              animation: `butterfly-flap ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
              transformOrigin: "center",
            }}
          >
            <Butterfly palette={butterflyPalettes[i]} size={p.size} />
          </div>
        </div>
      </div>
    ))}
  </div>
);

const GardenPromenade = () => (
  <div
    className="relative isolate w-full overflow-visible"
    aria-label="Reference-inspired plant garden with colorful flowers and clipped shrubs"
  >
    <Butterflies />
    <svg viewBox="0 0 1400 110" preserveAspectRatio="none" className="block h-28 w-full md:h-36" role="img">
      <title>Plant garden inspired by the reference image</title>
      <defs>
        <linearGradient id="garden-soil" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#766032" />
          <stop offset="55%" stopColor="#4c3a21" />
          <stop offset="100%" stopColor="#292019" />
        </linearGradient>
        <linearGradient id="garden-grass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8eb64f" />
          <stop offset="62%" stopColor="#4e8c3d" />
          <stop offset="100%" stopColor="#2d6133" />
        </linearGradient>
        <pattern id="paving-lines" width="84" height="48" patternUnits="userSpaceOnUse">
          <path d="M0 47.5H84M83.5 0V48" fill="none" stroke="#a6a995" strokeWidth="1" opacity="0.42" />
        </pattern>
      </defs>

      {/* Garden starts directly at the floor — no sky/walkway background */}
      <g transform="translate(0,-80)">
        <rect x="0" y="112" width="1400" height="78" fill="url(#garden-soil)" />
        <path d="M0 113 C105 94 218 105 330 114 S562 121 720 108 1015 111 1165 104 1345 104 1400 112 V148 H0 Z" fill="url(#garden-grass)" />
        <path d="M0 119 C155 101 265 116 390 121 S640 113 800 116 1072 112 1224 110 1352 110 1400 118" fill="none" stroke="#a4c568" strokeWidth="5" opacity="0.78" />

        <PicketBorder />

        {conifers.map((plant) => (
          <Conifer key={plant.x} {...plant} />
      ))}
      {topiary.map((plant) => (
        <TopiaryBall key={plant.x} {...plant} />
      ))}
      {lowShrubs.map((shrub) => (
        <RoundedShrub key={`${shrub.x}-${shrub.width}`} {...shrub} />
      ))}
      {accentPlants.map((plant) => (
        <LeafTuft key={plant.x} {...plant} y={plant.y + 42} />
      ))}

      <g opacity="0.76">
        {Array.from({ length: 54 }, (_, index) => {
          const x = 12 + index * 26;
          const height = 18 + (index % 5) * 4;
          return (
            <path
              key={index}
              d={`M${x} 162 Q${x + (index % 2 ? 7 : -7)} ${162 - height * 0.55} ${x + (index % 3) * 2 - 2} ${162 - height}`}
              fill="none"
              stroke={index % 2 ? "#6fa04b" : "#3f7d3c"}
              strokeLinecap="round"
              strokeWidth="3"
            />
          );
        })}
      </g>

      {flowerClusters.map((flower) => (
        <Flower key={`${flower.x}-${flower.y}`} {...flower} />
      ))}
      {flowerClusters.slice(0, 18).map((flower, index) => (
        <Flower
          key={`front-${flower.x}`}
          x={flower.x + 18 + (index % 3) * 12}
          y={flower.y + 25 + (index % 2) * 6}
          petal={index % 4 === 0 ? "#ffffff" : index % 4 === 1 ? "#f6a0b8" : index % 4 === 2 ? "#ffd861" : "#c9b0ff"}
          center={index % 3 === 0 ? "#8a5b2c" : "#f0ce52"}
          size={0.78 + (index % 3) * 0.08}
        />
      ))}

      <g>
        {[76, 242, 422, 568, 812, 1088, 1284].map((x, index) => (
          <ellipse
            key={x}
            cx={x}
            cy={174 + (index % 2) * 4}
            rx={10 + (index % 3) * 3}
            ry={5 + (index % 2) * 1.5}
            fill={index % 2 ? "#9e9a80" : "#c4b99a"}
            stroke="#6d6658"
            strokeWidth="0.8"
            opacity="0.82"
          />
        ))}
      </g>

      <path d="M0 188 H1400" stroke="#1f2f1d" strokeWidth="4" opacity="0.35" />
      </g>
    </svg>
  </div>
);

const Decorations = () => {
  return <GardenPromenade />;
};

export default Decorations;
