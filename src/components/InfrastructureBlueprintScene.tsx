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
import n12 from "@/assets/beggars-new/n12.png";
import n13 from "@/assets/beggars-new/n13.png";

import { useRef, useState } from "react";

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

const STORAGE_KEY = "beggars-product-layout-v2";
const BASE_W = 110;
const BASE_H = 100;

// Available BEGGARS products randomly scattered across the 3×5 shelf grid (remaining cells stay empty)
const productPool = [n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12, n13];
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

type DecorType = "vase" | "books" | "lantern" | "plant";

const ShelfDecor = ({ type, cx, baseY }: { type: DecorType; cx: number; baseY: number }) => {
  // baseY is the shelf surface (objects sit on this line)
  switch (type) {
    case "vase":
      return (
        <g>
          {/* Vase */}
          <path
            d={`M ${cx - 14} ${baseY - 4}
                C ${cx - 22} ${baseY - 22}, ${cx - 22} ${baseY - 38}, ${cx - 12} ${baseY - 50}
                L ${cx - 8} ${baseY - 60}
                L ${cx + 8} ${baseY - 60}
                L ${cx + 12} ${baseY - 50}
                C ${cx + 22} ${baseY - 38}, ${cx + 22} ${baseY - 22}, ${cx + 14} ${baseY - 4} Z`}
            fill="url(#vaseBody)"
            stroke="#5e4b30"
            strokeWidth="0.6"
          />
          {/* Vase rim */}
          <ellipse cx={cx} cy={baseY - 60} rx="9" ry="2.4" fill="#3a2c1a" opacity="0.55" />
          {/* Stems */}
          <path d={`M ${cx - 4} ${baseY - 58} Q ${cx - 14} ${baseY - 76}, ${cx - 18} ${baseY - 92}`} stroke="#3e6b3a" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          <path d={`M ${cx} ${baseY - 58} Q ${cx + 2} ${baseY - 80}, ${cx} ${baseY - 100}`} stroke="#3e6b3a" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          <path d={`M ${cx + 4} ${baseY - 58} Q ${cx + 14} ${baseY - 76}, ${cx + 18} ${baseY - 90}`} stroke="#3e6b3a" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          {/* Leaves */}
          <ellipse cx={cx - 10} cy={baseY - 78} rx="4.5" ry="2" fill="#4f8a4a" transform={`rotate(-30 ${cx - 10} ${baseY - 78})`} />
          <ellipse cx={cx + 10} cy={baseY - 76} rx="4.5" ry="2" fill="#4f8a4a" transform={`rotate(30 ${cx + 10} ${baseY - 76})`} />
          {/* Flowers */}
          <Flower cx={cx - 18} cy={baseY - 92} fill="url(#petalRed)" />
          <Flower cx={cx} cy={baseY - 100} fill="url(#petalYellow)" />
          <Flower cx={cx + 18} cy={baseY - 90} fill="url(#petalPink)" />
        </g>
      );
    case "books": {
      const y = baseY - 4;
      return (
        <g>
          {/* Stack of books lying down */}
          <rect x={cx - 32} y={y - 14} width="64" height="14" fill="url(#bookA)" stroke="#2a140a" strokeWidth="0.5" />
          <rect x={cx - 30} y={y - 11} width="60" height="2" fill="#fff" opacity="0.25" />
          <rect x={cx - 28} y={y - 26} width="56" height="12" fill="url(#bookB)" stroke="#0f1f30" strokeWidth="0.5" />
          <rect x={cx - 26} y={y - 23} width="52" height="2" fill="#fff" opacity="0.25" />
          <rect x={cx - 24} y={y - 36} width="48" height="10" fill="url(#bookC)" stroke="#0f2410" strokeWidth="0.5" />
          {/* Standing book leaning */}
          <g transform={`translate(${cx + 18} ${y - 36}) rotate(-8)`}>
            <rect x="0" y="-44" width="10" height="44" fill="url(#bookA)" stroke="#2a140a" strokeWidth="0.5" />
            <rect x="1" y="-43" width="1.2" height="42" fill="#fff" opacity="0.35" />
          </g>
          {/* Small decorative apple */}
          <circle cx={cx - 26} cy={y - 42} r="5" fill="#c83a3a" />
          <path d={`M ${cx - 26} ${y - 47} q 1 -3 4 -3`} stroke="#3e6b3a" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        </g>
      );
    }
    case "lantern": {
      const y = baseY - 4;
      return (
        <g>
          {/* Base */}
          <rect x={cx - 16} y={y - 6} width="32" height="6" fill="url(#lanternMetal)" />
          {/* Glass body */}
          <rect x={cx - 12} y={y - 50} width="24" height="44" fill="#fef9d8" opacity="0.55" stroke="#3a2a18" strokeWidth="0.7" />
          {/* Vertical bars */}
          <line x1={cx - 12} y1={y - 50} x2={cx - 12} y2={y - 6} stroke="#2c2014" strokeWidth="1.2" />
          <line x1={cx + 12} y1={y - 50} x2={cx + 12} y2={y - 6} stroke="#2c2014" strokeWidth="1.2" />
          <line x1={cx} y1={y - 50} x2={cx} y2={y - 6} stroke="#2c2014" strokeWidth="0.6" opacity="0.6" />
          {/* Top cap */}
          <path d={`M ${cx - 16} ${y - 50} L ${cx} ${y - 62} L ${cx + 16} ${y - 50} Z`} fill="url(#lanternMetal)" />
          <rect x={cx - 1.2} y={y - 70} width="2.4" height="8" fill="url(#lanternMetal)" />
          <path d={`M ${cx - 8} ${y - 70} Q ${cx} ${y - 78}, ${cx + 8} ${y - 70}`} stroke="#2c2014" strokeWidth="1.2" fill="none" />
          {/* Flame glow */}
          <ellipse cx={cx} cy={y - 28} rx="14" ry="18" fill="url(#lanternFlame)" />
          <ellipse cx={cx} cy={y - 26} rx="2.2" ry="5" fill="#ffd76a" />
        </g>
      );
    }
    case "plant": {
      const y = baseY - 4;
      return (
        <g>
          {/* Pot */}
          <path
            d={`M ${cx - 18} ${y - 22} L ${cx + 18} ${y - 22} L ${cx + 14} ${y} L ${cx - 14} ${y} Z`}
            fill="url(#potClay)"
            stroke="#4a2614"
            strokeWidth="0.6"
          />
          <ellipse cx={cx} cy={y - 22} rx="18" ry="3" fill="#3a1f08" opacity="0.45" />
          <ellipse cx={cx} cy={y - 22} rx="16" ry="2" fill="#2a1a10" />
          {/* Foliage — layered leaves */}
          {[
            { dx: -16, dy: -34, r: -50, c: "#3e7a3a" },
            { dx: -6, dy: -46, r: -20, c: "#4f9a4a" },
            { dx: 8, dy: -44, r: 25, c: "#3e7a3a" },
            { dx: 18, dy: -34, r: 55, c: "#5aa84f" },
            { dx: 0, dy: -56, r: 0, c: "#67b85a" },
            { dx: -10, dy: -52, r: -12, c: "#4f9a4a" },
            { dx: 12, dy: -52, r: 18, c: "#67b85a" },
          ].map((l, i) => (
            <ellipse
              key={i}
              cx={cx + l.dx}
              cy={y + l.dy}
              rx="4.5"
              ry="11"
              fill={l.c}
              transform={`rotate(${l.r} ${cx + l.dx} ${y + l.dy})`}
              stroke="#1f3d1f"
              strokeWidth="0.4"
            />
          ))}
        </g>
      );
    }
    default:
      return null;
  }
};

const Flower = ({ cx, cy, fill }: { cx: number; cy: number; fill: string }) => (
  <g>
    {[0, 60, 120, 180, 240, 300].map((deg) => (
      <ellipse
        key={deg}
        cx={cx}
        cy={cy - 3}
        rx="2.4"
        ry="3.6"
        fill={fill}
        transform={`rotate(${deg} ${cx} ${cy})`}
      />
    ))}
    <circle cx={cx} cy={cy} r="1.6" fill="#3a2a14" />
  </g>
);

const InfrastructureBlueprintScene = () => {
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
  const [deleteMode, setDeleteMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const dragRef = useRef<{ id: string; offX: number; offY: number } | null>(null);

  const persist = (next: FeaturedProduct[]) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  const toSvgPoint = (clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };
    const sp = pt.matrixTransform(ctm.inverse());
    return { x: sp.x, y: sp.y };
  };

  const onPointerDownItem = (e: React.PointerEvent, p: FeaturedProduct) => {
    if (!editMode) return;
    e.stopPropagation();
    setSelectedId(p.id);
    const { x, y } = toSvgPoint(e.clientX, e.clientY);
    dragRef.current = { id: p.id, offX: x - p.x, offY: y - p.y };
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!editMode || !dragRef.current) return;
    const { id, offX, offY } = dragRef.current;
    const { x, y } = toSvgPoint(e.clientX, e.clientY);
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, x: x - offX, y: y - offY } : p)));
  };

  const onPointerUp = () => {
    if (dragRef.current) {
      dragRef.current = null;
      setProducts((prev) => {
        persist(prev);
        return prev;
      });
    }
  };

  const updateScale = (id: string, scale: number) => {
    setProducts((prev) => {
      const next = prev.map((p) => (p.id === id ? { ...p, scale } : p));
      persist(next);
      return next;
    });
  };

  const handleDelete = (id: string) => {
    setProducts((prev) => {
      const next = prev.filter((p) => p.id !== id);
      persist(next);
      return next;
    });
  };
  // Decorative fillers placed in shelf cells without products
  const decorCells: { cell: number; type: "vase" | "books" | "lantern" | "plant" }[] = [
    { cell: 1, type: "vase" },
    { cell: 5, type: "books" },
    { cell: 8, type: "lantern" },
    { cell: 12, type: "plant" },
  ];

  return (
    <figure className="relative mx-auto w-full max-w-6xl rounded-[2rem] border border-[#7a4a22] bg-white shadow-2xl shadow-slate-950/30">
      <div className="absolute right-3 top-3 z-10 flex gap-2">
        <button
          type="button"
          onClick={() => {
            setEditMode((v) => !v);
            setSelectedId(null);
            if (!editMode) setDeleteMode(false);
          }}
          className={`rounded-full border px-3 py-1 text-xs font-medium shadow-md transition ${
            editMode
              ? "border-emerald-700 bg-emerald-600 text-white"
              : "border-[#7a4a22] bg-white text-[#7a4a22] hover:bg-[#f5ead8]"
          }`}
        >
          {editMode ? "סיים עריכה" : "מצב עריכה"}
        </button>
        <button
          type="button"
          onClick={() => {
            setDeleteMode((v) => !v);
            if (!deleteMode) setEditMode(false);
          }}
          className={`rounded-full border px-3 py-1 text-xs font-medium shadow-md transition ${
            deleteMode
              ? "border-red-700 bg-red-600 text-white"
              : "border-[#7a4a22] bg-white text-[#7a4a22] hover:bg-[#f5ead8]"
          }`}
        >
          {deleteMode ? "סיים מחיקה" : "מצב מחיקה"}
        </button>
      </div>
      {editMode && selectedId && (() => {
        const sel = products.find((p) => p.id === selectedId);
        if (!sel) return null;
        return (
          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 rounded-full border border-[#7a4a22] bg-white/95 px-4 py-2 text-xs shadow-md">
            <span className="font-medium text-[#7a4a22]">גודל</span>
            <input
              type="range"
              min={0.3}
              max={3}
              step={0.05}
              value={sel.scale}
              onChange={(e) => updateScale(sel.id, parseFloat(e.target.value))}
              className="w-48"
            />
            <span className="tabular-nums text-[#7a4a22]">{sel.scale.toFixed(2)}×</span>
            <button
              type="button"
              onClick={() => setSelectedId(null)}
              className="rounded-full border border-[#7a4a22] px-2 py-0.5 text-[#7a4a22] hover:bg-[#f5ead8]"
            >
              סגור
            </button>
          </div>
        );
      })()}
      <svg
        ref={svgRef}
        className="h-auto w-full text-[#0a0a0a] [overflow:visible]"
        viewBox="0 0 1024 576"
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onClick={() => editMode && setSelectedId(null)}
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
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          {/* Decor gradients */}
          <linearGradient id="vaseBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e8e2d2" />
            <stop offset="50%" stopColor="#cdbfa0" />
            <stop offset="100%" stopColor="#8a7654" />
          </linearGradient>
          <radialGradient id="petalRed" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff9a9a" />
            <stop offset="100%" stopColor="#c83a3a" />
          </radialGradient>
          <radialGradient id="petalYellow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff2a8" />
            <stop offset="100%" stopColor="#e8a83a" />
          </radialGradient>
          <radialGradient id="petalPink" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffd2e6" />
            <stop offset="100%" stopColor="#d8588f" />
          </radialGradient>
          <linearGradient id="bookA" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7a3a2a" />
            <stop offset="100%" stopColor="#4d2418" />
          </linearGradient>
          <linearGradient id="bookB" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a4d6e" />
            <stop offset="100%" stopColor="#173049" />
          </linearGradient>
          <linearGradient id="bookC" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3e6b3a" />
            <stop offset="100%" stopColor="#1f3d1f" />
          </linearGradient>
          <linearGradient id="lanternMetal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5a4632" />
            <stop offset="100%" stopColor="#2c2014" />
          </linearGradient>
          <radialGradient id="lanternFlame" cx="50%" cy="55%" r="55%">
            <stop offset="0%" stopColor="#fff6c4" />
            <stop offset="55%" stopColor="#ffb84a" />
            <stop offset="100%" stopColor="#ffb84a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="potClay" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c47a52" />
            <stop offset="100%" stopColor="#7a4226" />
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
            {/* Soft outer halo */}
            <rect x="78" y={topY + 4} width="866" height="100" fill="url(#ledGlow)" pointerEvents="none" />
            {/* Bright core wash on top of products */}
            <rect x="78" y={topY + 4} width="866" height="38" fill="#ffffff" opacity="0.35" pointerEvents="none" />
            {/* LED strip housing */}
            <rect x="78" y={topY + 1} width="866" height="3.5" fill="#f4f1e6" />
            {/* Bright white LED line (with glow) */}
            <rect x="80" y={topY + 1.6} width="862" height="2.4" fill="#ffffff" />
            <rect x="80" y={topY + 2} width="862" height="1.2" fill="#ffffff" opacity="1" filter="url(#blueprintSoftGlow)" />
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

        {/* Decorative fillers for empty cells (drawn beneath products) */}
        {decorCells.map(({ cell, type }) => {
          const rowIdx = Math.floor(cell / 5);
          const colIdx = cell % 5;
          const cx = cellCenters[colIdx];
          const baseY = shelfRows[rowIdx];
          return <ShelfDecor key={`decor-${cell}`} type={type} cx={cx} baseY={baseY} />;
        })}

        {products.map((product) => {
          const w = BASE_W * product.scale;
          const h = BASE_H * product.scale;
          return (
            <ellipse
              key={`shadow-${product.id}`}
              cx={product.x + w * 0.45}
              cy={product.y - h * 0.5}
              rx={w * 0.28}
              ry={h * 0.42}
              fill="#000"
              opacity="0.32"
              style={{ filter: "blur(6px)" }}
              pointerEvents="none"
            />
          );
        })}

        {products.map((product) => {
          const w = BASE_W * product.scale;
          const h = BASE_H * product.scale;
          const isSelected = editMode && selectedId === product.id;
          return (
            <g
              key={product.id}
              onPointerDown={(e) => onPointerDownItem(e, product)}
              onClick={(e) => {
                if (editMode) {
                  e.stopPropagation();
                  setSelectedId(product.id);
                }
              }}
              style={editMode ? { cursor: "move" } : undefined}
            >
              <image
                href={product.src}
                x={product.x - w / 2}
                y={product.y - h}
                width={w}
                height={h}
                preserveAspectRatio="xMidYMax meet"
                style={
                  deleteMode
                    ? { cursor: "pointer", opacity: 0.85 }
                    : editMode
                    ? { cursor: "move" }
                    : undefined
                }
                onClick={deleteMode ? () => handleDelete(product.id) : undefined}
              >
                <title>{deleteMode ? "לחץ למחיקה" : product.alt}</title>
              </image>
              {isSelected && (
                <rect
                  x={product.x - w / 2 - 3}
                  y={product.y - h - 3}
                  width={w + 6}
                  height={h + 6}
                  fill="none"
                  stroke="#10b981"
                  strokeDasharray="4 3"
                  strokeWidth="1.4"
                  pointerEvents="none"
                />
              )}
              {deleteMode && (
                <g
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDelete(product.id)}
                >
                  <circle
                    cx={product.x + w / 2 - 8}
                    cy={product.y - h + 8}
                    r="9"
                    fill="#dc2626"
                    stroke="#fff"
                    strokeWidth="1.5"
                  />
                  <path
                    d={`M ${product.x + w / 2 - 12} ${product.y - h + 4} L ${product.x + w / 2 - 4} ${product.y - h + 12} M ${product.x + w / 2 - 4} ${product.y - h + 4} L ${product.x + w / 2 - 12} ${product.y - h + 12}`}
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </g>
              )}
            </g>
          );
        })}

      </svg>
    </figure>
  );
};

export default InfrastructureBlueprintScene;
