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

import n1 from "@/assets/beggars-new/n1.png";
import n2 from "@/assets/beggars-new/n2.png";
import n3 from "@/assets/beggars-new/n3.png";
import n4 from "@/assets/beggars-new/n4.png";
import n5 from "@/assets/beggars-new/n5.png";
import n6 from "@/assets/beggars-new/n6.png";
import n7 from "@/assets/beggars-new/n7.png";
import n8 from "@/assets/beggars-new/n8.png";
import n9 from "@/assets/beggars-new/n9.png";
import n10 from "@/assets/beggars-new/n10.png";
import n11 from "@/assets/beggars-new/n11.png";

import { useEffect, useRef, useState } from "react";

type FeaturedProduct = {
  id: string;
  src: string;
  alt: string;
  x: number; // center x in SVG units
  y: number; // bottom y in SVG units
  scale: number; // 1 = base size
};

// 3 equal-height rows across the cabinet (70→440, step ≈123.33)
const shelfRows = [193, 317, 440];
// 4 vertical partitions making 5 equal-width cells across 75→947 (step ≈174.4)
const columns = [249, 424, 598, 773];
// Symmetric inner counter dividers (counter spans 184→848, center 516)
const counterPanels = [317, 450, 582, 715];

// Cell centers for 5 equal columns
const cellCenters = [162, 336, 511, 685, 859];
const blueprintItems: BlueprintItem[] = [];

const STORAGE_KEY = "beggars-product-layout-v1";
const BASE_W = 110;
const BASE_H = 100;

// Available BEGGARS products randomly scattered across the 3×5 shelf grid (remaining cells stay empty)
const productPool = [n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11];
// Pre-shuffled cell indices (0..14) — first N positions get products, rest stay empty
const cellOrder = [7, 2, 11, 14, 4, 9, 0, 13, 6, 3, 10, 1, 12, 5, 8];
const initialProducts: FeaturedProduct[] = productPool.map((src, i) => {
  const cell = cellOrder[i];
  const rowIdx = Math.floor(cell / 5);
  const colIdx = cell % 5;
  return {
    id: `p-${i}`,
    src,
    alt: `BEGGARS product ${i + 1}`,
    x: cellCenters[colIdx],
    y: shelfRows[rowIdx],
    scale: 1,
  };
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
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [products, setProducts] = useState<FeaturedProduct[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved) as FeaturedProduct[];
          // Re-attach src from current bundled assets by index
          return parsed.map((p, i) => ({ ...p, src: initialProducts[i]?.src ?? p.src }));
        }
      } catch {
        /* ignore */
      }
    }
    return initialProducts;
  });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const dragRef = useRef<{ id: string; offsetX: number; offsetY: number } | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(products.map(({ src, ...rest }) => rest)),
      );
    } catch {
      /* ignore */
    }
  }, [products]);

  const toSvgPoint = (clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };
    const local = pt.matrixTransform(ctm.inverse());
    return { x: local.x, y: local.y };
  };

  const handlePointerDown = (e: React.PointerEvent<SVGGElement>, id: string) => {
    e.stopPropagation();
    const product = products.find((p) => p.id === id);
    if (!product) return;
    const { x, y } = toSvgPoint(e.clientX, e.clientY);
    dragRef.current = { id, offsetX: x - product.x, offsetY: y - product.y };
    setSelectedId(id);
    (e.currentTarget as Element).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<SVGGElement>) => {
    if (!dragRef.current) return;
    const { id, offsetX, offsetY } = dragRef.current;
    const { x, y } = toSvgPoint(e.clientX, e.clientY);
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, x: x - offsetX, y: y - offsetY } : p)),
    );
  };

  const handlePointerUp = (e: React.PointerEvent<SVGGElement>) => {
    dragRef.current = null;
    (e.currentTarget as Element).releasePointerCapture?.(e.pointerId);
  };

  const adjustScale = (id: string, delta: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, scale: Math.max(0.3, Math.min(4, p.scale + delta)) } : p,
      ),
    );
  };

  const resetLayout = () => {
    setProducts(initialProducts);
    setSelectedId(null);
  };

  return (
    <figure className="relative mx-auto w-full max-w-6xl rounded-[2rem] border border-[#7a4a22] bg-white shadow-2xl shadow-slate-950/30">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#7a4a22]/30 px-4 py-2 text-xs font-heebo text-[#3a1f08]">
        <div>
          {selectedId
            ? "גרירה: לחיצה ארוכה והזזה • כפתורי + / − להגדלה/הקטנה"
            : "לחץ על מוצר כדי לבחור אותו, ואז גרור או שנה גודל"}
        </div>
        <div className="flex items-center gap-2">
          {selectedId && (
            <>
              <button
                type="button"
                onClick={() => adjustScale(selectedId, -0.1)}
                className="rounded bg-[#7a4a22] px-2 py-1 text-white hover:bg-[#5c3818]"
              >
                −
              </button>
              <button
                type="button"
                onClick={() => adjustScale(selectedId, 0.1)}
                className="rounded bg-[#7a4a22] px-2 py-1 text-white hover:bg-[#5c3818]"
              >
                +
              </button>
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                className="rounded border border-[#7a4a22] px-2 py-1 hover:bg-[#7a4a22]/10"
              >
                ביטול בחירה
              </button>
            </>
          )}
          <button
            type="button"
            onClick={resetLayout}
            className="rounded border border-[#7a4a22] px-2 py-1 hover:bg-[#7a4a22]/10"
          >
            איפוס סידור
          </button>
        </div>
      </div>
      <svg
        ref={svgRef}
        className="h-auto w-full text-[#0a0a0a]"
        viewBox="0 0 1024 576"
        role="img"
        aria-labelledby="infrastructure-blueprint-title infrastructure-blueprint-desc"
        xmlns="http://www.w3.org/2000/svg"
        onPointerDown={() => setSelectedId(null)}
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

        {products.map((product) => {
          const w = BASE_W * product.scale;
          const h = BASE_H * product.scale;
          const isSelected = selectedId === product.id;
          return (
            <g
              key={product.id}
              onPointerDown={(e) => handlePointerDown(e, product.id)}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              style={{ cursor: dragRef.current?.id === product.id ? "grabbing" : "grab", touchAction: "none" }}
            >
              <image
                href={product.src}
                x={product.x - w / 2}
                y={product.y - h}
                width={w}
                height={h}
                preserveAspectRatio="xMidYMax meet"
              >
                <title>{product.alt}</title>
              </image>
              {isSelected && (
                <rect
                  x={product.x - w / 2}
                  y={product.y - h}
                  width={w}
                  height={h}
                  fill="none"
                  stroke="#ff8a00"
                  strokeWidth={1.5}
                  strokeDasharray="4 3"
                  pointerEvents="none"
                />
              )}
            </g>
          );
        })}

      </svg>
    </figure>
  );
};

export default InfrastructureBlueprintScene;
