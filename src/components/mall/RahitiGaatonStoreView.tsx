import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import MallHeader from "@/components/mall/MallHeader";
import MallFooter from "@/components/mall/MallFooter";
import PageTracker from "@/components/PageTracker";
import BackButton from "@/components/BackButton";
import rahitigaatonLogoAsset from "@/assets/rahitigaaton-logo-white.png.asset.json";
import type { Store } from "@/data/mallData";

type Answers = {
  type?: "ארון" | "מטבח";
  layout?: string;       // for kitchen: ישר / L / U ; for closet: 2 דלתות / 3 / 4
  material?: "אלון" | "אגוז" | "אורן" | "לבן מט";
  handles?: "ידיות מוט" | "ידיות כפתור" | "ללא ידיות";
  extras?: string;       // kitchen: כיריים+תנור / מקרר / שיש עליון ; closet: מגירות / מדפים / תלייה
};

type StepKey = keyof Answers;

type StepDef = {
  key: StepKey;
  question: string;
  options: string[] | ((a: Answers) => string[]);
};

const STEPS: StepDef[] = [
  { key: "type", question: "מה תרצה לבנות?", options: ["ארון", "מטבח"] },
  {
    key: "layout",
    question: "איך לסדר את היחידות?",
    options: (a) => (a.type === "מטבח" ? ["ישר", "L", "U"] : ["2 דלתות", "3 דלתות", "4 דלתות"]),
  },
  { key: "material", question: "איזה חומר/גוון?", options: ["אלון", "אגוז", "אורן", "לבן מט"] },
  { key: "handles", question: "סוג ידיות?", options: ["ידיות מוט", "ידיות כפתור", "ללא ידיות"] },
  {
    key: "extras",
    question: "מה להוסיף?",
    options: (a) =>
      a.type === "מטבח"
        ? ["כיריים + תנור", "מקרר משולב", "שיש עליון"]
        : ["מגירות", "מדפים", "מוט תלייה"],
  },
];

const MATERIAL_COLORS: Record<string, { fill: string; grain: string; edge: string }> = {
  "אלון":    { fill: "#c9a06a", grain: "#a07a44", edge: "#7a5a32" },
  "אגוז":    { fill: "#6b4525", grain: "#4a2e16", edge: "#2e1c0d" },
  "אורן":    { fill: "#e7c79a", grain: "#c69b6a", edge: "#9c7344" },
  "לבן מט":  { fill: "#f3ede2", grain: "#dcd2c0", edge: "#a8a090" },
};

const WOOD_BG =
  "repeating-linear-gradient(92deg, #f6ecdc 0 6px, #efe1c8 6px 13px, #f3e6d0 13px 22px, #ead8b8 22px 34px)";

const RahitiGaatonStoreView = ({ store }: { store: Store }) => {
  const navigate = useNavigate();
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone] = useState(false);

  const step = STEPS[stepIdx];
  const stepOptions = typeof step.options === "function" ? step.options(answers) : step.options;
  const progress = useMemo(
    () => Math.round(((done ? STEPS.length : stepIdx) / STEPS.length) * 100),
    [stepIdx, done]
  );

  const pick = (value: string) => {
    const next: Answers = { ...answers, [step.key]: value as Answers[StepKey] };
    // Reset dependent fields if `type` changes
    if (step.key === "type" && answers.type && answers.type !== value) {
      next.layout = undefined;
      next.extras = undefined;
    }
    setAnswers(next);
    if (stepIdx + 1 < STEPS.length) {
      setTimeout(() => setStepIdx(stepIdx + 1), 220);
    } else {
      setTimeout(() => setDone(true), 220);
    }
  };

  const reset = () => {
    setAnswers({});
    setStepIdx(0);
    setDone(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background" dir="rtl">
      <MallHeader />
      <PageTracker storeId={store.id} />
      <BackButton />

      {/* Full-bleed hero attached directly to header */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #2a1d12 0%, #3b2918 55%, #4a3320 100%)",
        }}
      >
        {/* subtle wood-grain texture */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.18] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(255,220,170,0.6) 0 2px, transparent 2px 7px), repeating-linear-gradient(90deg, rgba(0,0,0,0.5) 0 1px, transparent 1px 23px)",
          }}
        />
        {/* warm glow */}
        <div
          aria-hidden
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[120%] h-[420px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(closest-side, rgba(225,176,109,0.35), transparent 70%)",
          }}
        />

        <div className="relative w-full max-w-[1280px] mx-auto px-5 md:px-10 py-8 md:py-12 flex items-center justify-center">
          <img
            src={rahitigaatonLogoAsset.url}
            alt="רהיטיגעתון - ברוכים הבאים למשפחה"
            className="mx-auto h-32 md:h-44 w-auto object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
            style={{ filter: "brightness(0) invert(1) drop-shadow(0 6px 18px rgba(0,0,0,0.45))" }}
          />
        </div>
      </section>

      {/* Quiz section, full width band that hugs the hero */}
      <section className="relative w-full flex-1" style={{ background: "#f5ecd9" }}>
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-60"
          style={{ background: WOOD_BG }}
        />
        <div className="relative w-full max-w-[1100px] mx-auto px-5 md:px-10 py-12 md:py-20">
          {/* Titles moved from hero */}
          <div className="text-center mb-10 md:mb-14">
            <h1
              className="font-frank font-black tracking-tight text-[#2a1d12] leading-[1.05]"
              style={{ fontSize: "clamp(2.25rem, 5vw, 4.25rem)" }}
            >
              תכנון נגרות בלחיצה כפתור
            </h1>
            <p
              className="mt-4 font-heebo text-[#5a4126]"
              style={{ fontSize: "clamp(1rem, 1.7vw, 1.5rem)" }}
            >
              תענו על השאלות ותקבלו הדמייה אישית של הרהיט שלכם
            </p>
            <div className="mx-auto mt-6 flex items-center justify-center gap-3 opacity-80">
              <span className="h-px w-12 bg-[#8b5e2b]" />
              <span className="text-[#8b5e2b] text-xs tracking-[0.4em] font-heebo">
                RAHITI · GAATON
              </span>
              <span className="h-px w-12 bg-[#8b5e2b]" />
            </div>
          </div>

          {/* progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2 font-heebo text-sm md:text-base text-[#5a4126]">
              <span>שאלה {Math.min(stepIdx + 1, STEPS.length)} מתוך {STEPS.length}</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-[#e0cda6] overflow-hidden shadow-inner">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${progress}%`,
                  background:
                    "linear-gradient(90deg, #8b5e2b, #c9a06a, #8b5e2b)",
                }}
              />
            </div>
          </div>

          {!done ? (
            <div
              key={step.key}
              className="mx-auto w-full max-w-[820px] rounded-[28px] border border-[#c9a06a]/40 bg-white/85 backdrop-blur shadow-[0_20px_60px_rgba(80,55,25,0.18)] p-7 md:p-12 text-center animate-in fade-in slide-in-from-bottom-2"
            >
              <h2 className="font-frank font-bold text-[#3b2918] text-2xl md:text-4xl">
                {step.question}
              </h2>
              <p className="mt-2 font-heebo text-[#7a5a36]">
                בחרו אופציה ונמשיך הלאה
              </p>

              <div
                className={`mt-8 grid gap-4 md:gap-5 ${
                  stepOptions.length <= 2
                    ? "grid-cols-2"
                    : stepOptions.length === 3
                      ? "grid-cols-1 sm:grid-cols-3"
                      : "grid-cols-2 md:grid-cols-4"
                }`}
              >
                {stepOptions.map((opt) => {
                  const selected = answers[step.key] === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => pick(opt)}
                      className={`group relative overflow-hidden rounded-2xl border-2 px-4 py-6 md:py-8 font-frank font-bold text-lg md:text-2xl transition-all duration-300 hover:-translate-y-1 ${
                        selected
                          ? "border-[#3b2918] text-[#f7e9cf] shadow-lg"
                          : "border-[#c9a06a]/60 text-[#3b2918] bg-[#f8efd9] hover:border-[#8b5e2b] hover:shadow-md"
                      }`}
                      style={
                        selected
                          ? {
                              background:
                                "linear-gradient(160deg, #5a3d20, #2a1d12)",
                            }
                          : undefined
                      }
                    >
                      <span className="relative z-10">{opt}</span>
                      <span
                        aria-hidden
                        className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[#c9a06a] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </button>
                  );
                })}
              </div>

              {stepIdx > 0 && (
                <button
                  type="button"
                  onClick={() => setStepIdx(stepIdx - 1)}
                  className="mt-8 font-heebo text-sm text-[#7a5a36] hover:text-[#3b2918] underline underline-offset-4"
                >
                  ← חזרה לשאלה הקודמת
                </button>
              )}
            </div>
          ) : (
            <div className="mx-auto w-full max-w-[860px] rounded-[28px] border border-[#c9a06a]/40 bg-white/90 backdrop-blur shadow-[0_20px_60px_rgba(80,55,25,0.2)] p-8 md:p-14 text-center animate-in fade-in zoom-in-95">
              <div className="mx-auto mb-4 inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#c9a06a] to-[#8b5e2b] text-white text-2xl shadow-lg">
                ✓
              </div>
              <h2 className="font-frank font-black text-[#3b2918] text-3xl md:text-5xl">
                ההדמייה בדרך אליכם
              </h2>
              <p className="mt-3 font-heebo text-[#5a4126] text-base md:text-lg">
                על סמך הבחירות שלכם נכין הדמייה תלת-ממדית מותאמת אישית
                ונחזור אליכם עם הצעת מחיר.
              </p>

              <ul className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 text-right">
                {(Object.keys(answers) as StepKey[]).map((k) => (
                  <li
                    key={k}
                    className="rounded-xl border border-[#c9a06a]/40 bg-[#f8efd9] px-4 py-3"
                  >
                    <div className="font-heebo text-xs text-[#7a5a36]">
                      {LABEL[k]}
                    </div>
                    <div className="font-frank font-bold text-[#3b2918] mt-1">
                      {answers[k]}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  onClick={() =>
                    navigate("/contact", {
                      state: { product: `הדמיית ${answers.type ?? "רהיט"} - רהיטי געתון`, contact: true },
                    })
                  }
                  className="rounded-xl px-7 py-3 font-frank font-bold text-white shadow-lg hover:opacity-95 transition"
                  style={{ background: "linear-gradient(180deg, #5a3d20, #2a1d12)" }}
                >
                  השאר פרטים לקבלת ההדמייה
                </button>
                <button
                  type="button"
                  onClick={reset}
                  className="rounded-xl px-7 py-3 font-frank font-bold text-[#3b2918] border-2 border-[#3b2918]/60 hover:bg-[#3b2918] hover:text-white transition"
                >
                  התחל מחדש
                </button>
              </div>
            </div>
          )}

          {/* Live preview below the questions */}
          <div className="mt-10 md:mt-14">
            <div className="text-center mb-4">
              <h3 className="font-frank font-bold text-[#3b2918] text-xl md:text-2xl">
                ההדמייה החיה שלכם
              </h3>
              <p className="font-heebo text-sm text-[#7a5a36]">
                מתעדכנת בזמן אמת לפי כל בחירה
              </p>
            </div>
            <LivePreview answers={answers} />
          </div>
        </div>
      </section>

      <MallFooter />
    </div>
  );
};

const LABEL: Record<StepKey, string> = {
  type: "סוג רהיט",
  layout: "סידור",
  size: "גודל",
  material: "חומר",
  handles: "ידיות",
  extras: "תוספות",
};

export default RahitiGaatonStoreView;

/* =========================================================================
   LIVE PREVIEW — progressive ISOMETRIC (45°) rendering, inspired by
   github.com/Bruinen90/kitchen-planner. Each answered question adds a layer
   of detail: footprint → modules → finish → handles → extras. The 30°/30°
   axonometric projection lets the user see L / U layouts and depth.
   ========================================================================= */

type PreviewProps = { answers: Answers };

function LivePreview({ answers }: PreviewProps) {
  const { type, layout, size, material, handles, extras } = answers;

  const hasType = !!type;
  const isKitchen = type === "מטבח";

  const VB_W = 900;
  const VB_H = 520;

  // --- Isometric projection (30° / 30°) ---
  const COS = Math.cos(Math.PI / 6); // ~0.866
  const SIN = Math.sin(Math.PI / 6); // 0.5
  // Origin chosen so the whole layout sits centered above the floor line
  const OX = VB_W / 2;
  const OY = VB_H - 80;
  const iso = (x: number, y: number, z: number): [number, number] => [
    OX + (x - z) * COS,
    OY - y + (x + z) * SIN,
  ];
  const pt = (x: number, y: number, z: number) => iso(x, y, z).join(",");

  // Size affects per-module dimensions
  const sizeScale = size === "קטן" ? 0.8 : size === "גדול" ? 1.15 : 1;
  const W = 70 * sizeScale; // module width along arm
  const D = 60 * sizeScale; // depth
  const H = isKitchen ? 95 : 200; // base/closet body height
  const UH = 80; // upper kitchen cabinet height
  const UD = 38; // upper cabinet depth
  const UY = 130; // y where upper cabinet starts

  const mat =
    MATERIAL_COLORS[material ?? ""] ?? { fill: "#d8c29b", grain: "#a07a44", edge: "#7a5a32" };
  // Shading variants for the 3 visible faces
  const FACE = {
    front: mat.fill,
    side: shade(mat.fill, -0.18),
    top: shade(mat.fill, 0.12),
    edge: mat.edge,
  };
  // Neutral / no-material-yet
  const NEUTRAL = { front: "#e7d6b1", side: "#c9b487", top: "#f0e2bf", edge: "#7a5a32" };
  const F = material ? FACE : NEUTRAL;

  // --- Build module list as 3D boxes ---
  type Box = {
    x: number; z: number; w: number; d: number; h: number; y0?: number;
    kind: "base" | "upper" | "tall" | "stove" | "counter";
    facingX?: boolean; // door faces +x direction (default +z)
  };

  const boxes: Box[] = [];

  if (hasType && layout) {
    if (isKitchen) {
      // Number of modules per arm depends on size
      const nMain = size === "קטן" ? 3 : size === "גדול" ? 5 : 4;
      const nArm = Math.max(2, Math.round(nMain / 2));

      // Arm 1: along +x at z = 0..D, x = 0..nMain*W
      for (let i = 0; i < nMain; i++) {
        boxes.push({ x: i * W, z: 0, w: W, d: D, h: H, kind: "base" });
        boxes.push({ x: i * W, z: 0, w: W, d: UD, h: UH, y0: UY, kind: "upper" });
      }

      if (layout === "L" || layout === "U") {
        // Arm 2: perpendicular, at x = 0..D, z = D..D + nArm*W (door faces -x → flip via facingX)
        for (let i = 0; i < nArm; i++) {
          boxes.push({ x: 0, z: D + i * W, w: D, d: W, h: H, kind: "base", facingX: true });
          boxes.push({ x: 0, z: D + i * W, w: UD, d: W, h: UH, y0: UY, kind: "upper", facingX: true });
        }
      }
      if (layout === "U") {
        // Arm 3: also perpendicular on the far x side
        const x3 = nMain * W - D;
        for (let i = 0; i < nArm; i++) {
          boxes.push({ x: x3, z: D + i * W, w: D, d: W, h: H, kind: "base", facingX: true });
          boxes.push({ x: x3, z: D + i * W, w: UD, d: W, h: UH, y0: UY, kind: "upper", facingX: true });
        }
      }
    } else {
      // Closet — N doors in a row
      const n =
        layout === "2 דלתות" ? 2 : layout === "3 דלתות" ? 3 : layout === "4 דלתות" ? 4 : 3;
      for (let i = 0; i < n; i++) {
        boxes.push({ x: i * W, z: 0, w: W, d: D, h: H, kind: "base" });
      }
    }
  }

  // --- Compute global bounds, then re-center via translate ---
  // For now we shift OX based on layout footprint width.
  // (Recompute centering offset for the whole composition.)
  const projected = boxes.flatMap((b) => {
    const y = b.y0 ?? 0;
    return [
      iso(b.x, y, b.z),
      iso(b.x + b.w, y, b.z),
      iso(b.x, y, b.z + b.d),
      iso(b.x + b.w, y, b.z + b.d),
      iso(b.x, y + b.h, b.z),
      iso(b.x + b.w, y + b.h, b.z + b.d),
    ];
  });
  const minX = projected.length ? Math.min(...projected.map((p) => p[0])) : OX;
  const maxX = projected.length ? Math.max(...projected.map((p) => p[0])) : OX;
  const minY = projected.length ? Math.min(...projected.map((p) => p[1])) : OY;
  const maxY = projected.length ? Math.max(...projected.map((p) => p[1])) : OY;
  const dx = VB_W / 2 - (minX + maxX) / 2;
  const dy = (VB_H - 70) - maxY; // keep base slightly above floor line

  // --- Draw helpers ---
  const renderBox = (b: Box, key: string) => {
    const y0 = b.y0 ?? 0;
    const y1 = y0 + b.h;
    // 8 corners
    const A = pt(b.x, y0, b.z);
    const B = pt(b.x + b.w, y0, b.z);
    const C = pt(b.x + b.w, y0, b.z + b.d);
    const D2 = pt(b.x, y0, b.z + b.d);
    const E = pt(b.x, y1, b.z);
    const F2 = pt(b.x + b.w, y1, b.z);
    const G = pt(b.x + b.w, y1, b.z + b.d);
    const Hh = pt(b.x, y1, b.z + b.d);

    // Decide which face is the "door face" (front) for handles / details.
    const frontFaceIsZ = !b.facingX;

    // Front face polygon (visible large face)
    const frontPoly = frontFaceIsZ
      ? `${D2} ${C} ${G} ${Hh}` // z = +d face
      : `${B} ${C} ${G} ${F2}`; // x = +w face
    // Side face polygon
    const sidePoly = frontFaceIsZ
      ? `${B} ${C} ${G} ${F2}` // x = +w face
      : `${D2} ${C} ${G} ${Hh}`; // z = +d face
    // Top face polygon
    const topPoly = `${E} ${F2} ${G} ${Hh}`;

    // Front face color overrides for special boxes
    let frontFill = F.front;
    let topFill = F.top;
    if (b.kind === "upper") frontFill = shade(F.front, -0.05);
    if (b.kind === "counter") {
      frontFill = "#1a1410";
      topFill = extras === "שיש עליון" ? "#ece8df" : "#1f1812";
    }

    // Compute handle / detail position on the front face
    const details: JSX.Element[] = [];
    if (b.kind !== "counter") {
      // Door split line: a vertical line down the middle of the front face
      const midTop = frontFaceIsZ
        ? iso(b.x + b.w / 2, y1, b.z + b.d)
        : iso(b.x + b.w, y1, b.z + b.d / 2);
      const midBot = frontFaceIsZ
        ? iso(b.x + b.w / 2, y0, b.z + b.d)
        : iso(b.x + b.w, y0, b.z + b.d / 2);
      details.push(
        <line
          key={`split-${key}`}
          x1={midTop[0]} y1={midTop[1]} x2={midBot[0]} y2={midBot[1]}
          stroke={F.edge} strokeWidth="0.8" opacity="0.55"
        />
      );

      // Handles (only on base / closet, not on upper)
      if (handles && handles !== "ללא ידיות") {
        const handleY = b.kind === "upper" ? y0 + b.h * 0.15 : y0 + b.h * 0.78;
        const a = frontFaceIsZ
          ? iso(b.x + b.w * 0.55, handleY, b.z + b.d)
          : iso(b.x + b.w, handleY, b.z + b.d * 0.55);
        const bb = frontFaceIsZ
          ? iso(b.x + b.w * 0.85, handleY, b.z + b.d)
          : iso(b.x + b.w, handleY, b.z + b.d * 0.85);
        if (handles === "ידיות מוט") {
          details.push(
            <line key={`h-${key}`} x1={a[0]} y1={a[1]} x2={bb[0]} y2={bb[1]} stroke="#2b2b2b" strokeWidth="2.2" strokeLinecap="round" />
          );
        } else {
          const cx = (a[0] + bb[0]) / 2;
          const cy = (a[1] + bb[1]) / 2;
          details.push(<circle key={`h-${key}`} cx={cx} cy={cy} r="2.6" fill="#2b2b2b" />);
        }
      }
    }

    // Stove / sink decoration on top of base when extras chosen
    if (b.kind === "base" && isKitchen && extras === "כיריים + תנור") {
      // place hob on second module-ish (just decorate every other base box top)
      if ((b.x / W) % 2 === 0 && b.z === 0) {
        const T1 = iso(b.x + b.w * 0.18, y1 + 0.5, b.z + b.d * 0.25);
        const T2 = iso(b.x + b.w * 0.82, y1 + 0.5, b.z + b.d * 0.25);
        const T3 = iso(b.x + b.w * 0.82, y1 + 0.5, b.z + b.d * 0.78);
        const T4 = iso(b.x + b.w * 0.18, y1 + 0.5, b.z + b.d * 0.78);
        details.push(
          <polygon key={`hob-${key}`} points={`${T1.join(",")} ${T2.join(",")} ${T3.join(",")} ${T4.join(",")}`} fill="#1a1a1a" />
        );
        // 2 burners
        [[0.32, 0.4], [0.68, 0.65]].forEach(([u, v], idx) => {
          const c = iso(b.x + b.w * u, y1 + 0.6, b.z + b.d * v);
          details.push(<circle key={`burn-${key}-${idx}`} cx={c[0]} cy={c[1]} r="3.5" fill="#3a3a3a" stroke="#000" strokeWidth="0.4" />);
        });
      }
    }

    return (
      <g key={key}>
        {/* side first (back), then top, then front for correct overlap */}
        <polygon points={sidePoly} fill={F.side} stroke={F.edge} strokeWidth="0.8" />
        <polygon points={topPoly} fill={topFill} stroke={F.edge} strokeWidth="0.8" />
        <polygon points={frontPoly} fill={frontFill} stroke={F.edge} strokeWidth="0.8" />
        {details}
      </g>
    );
  };

  // Sort boxes back-to-front for painter's algorithm (depth = x + z + y0)
  const sortedBoxes = [...boxes].sort(
    (a, bb) => a.x + a.z + (a.y0 ?? 0) * 0.2 - (bb.x + bb.z + (bb.y0 ?? 0) * 0.2)
  );

  // Footprint (top-view shadow) for clarity of L/U shape
  const footprintPolys = boxes
    .filter((b) => b.kind === "base")
    .map((b, i) => {
      const a1 = iso(b.x, 0, b.z);
      const a2 = iso(b.x + b.w, 0, b.z);
      const a3 = iso(b.x + b.w, 0, b.z + b.d);
      const a4 = iso(b.x, 0, b.z + b.d);
      return (
        <polygon
          key={`fp-${i}`}
          points={`${a1.join(",")} ${a2.join(",")} ${a3.join(",")} ${a4.join(",")}`}
          fill="#000"
          opacity="0.12"
        />
      );
    });

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-[#c9a06a]/40 shadow-inner bg-gradient-to-b from-[#f8f1de] to-[#ecdcbd]">
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="w-full h-auto block"
        role="img"
        aria-label="הדמייה איזומטרית חיה של הרהיט"
      >
        <defs>
          <linearGradient id="floor-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f0e1bf" />
            <stop offset="100%" stopColor="#c39e63" />
          </linearGradient>
          <linearGradient id="wall-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fbf3df" />
            <stop offset="100%" stopColor="#ead7b0" />
          </linearGradient>
        </defs>

        {/* Background wall + floor */}
        <rect x="0" y="0" width={VB_W} height={VB_H} fill="url(#wall-grad)" />
        {/* Isometric floor tile */}
        {(() => {
          const a = iso(-260, 0, -260);
          const b = iso(560, 0, -260);
          const c = iso(560, 0, 560);
          const d = iso(-260, 0, 560);
          return (
            <polygon
              points={`${a.join(",")} ${b.join(",")} ${c.join(",")} ${d.join(",")}`}
              fill="url(#floor-grad)"
            />
          );
        })()}

        {!hasType && (
          <g>
            <rect
              x={VB_W / 2 - 200} y={VB_H / 2 - 38}
              width="400" height="76" rx="14"
              fill="#ffffff" opacity="0.75"
              stroke="#c9a06a" strokeDasharray="6 6"
            />
            <text
              x={VB_W / 2} y={VB_H / 2 + 10}
              textAnchor="middle"
              fontFamily="'Frank Ruhl Libre', serif"
              fontWeight="700" fontSize="22" fill="#5a4126"
            >
              ההדמייה תופיע כאן בזמן שתענה
            </text>
          </g>
        )}

        {hasType && layout && (
          <g transform={`translate(${dx} ${dy})`}>
            {/* footprint shadow */}
            {footprintPolys}
            {sortedBoxes.map((b, i) => renderBox(b, `b${i}`))}
          </g>
        )}

        {/* Labels at bottom */}
        <g fontFamily="'Heebo', sans-serif" fontSize="14" fill="#5a4126">
          <text x={VB_W / 2} y={VB_H - 18} textAnchor="middle" opacity="0.75">
            {hasType
              ? `${type ?? ""}${layout ? " · " + layout : ""}${size ? " · " + size : ""}${material ? " · " + material : ""}`
              : "ההדמייה מתעדכנת לפי הבחירות שלכם"}
          </text>
        </g>
      </svg>

      <div className="px-4 py-3 bg-[#2a1d12] text-[#f7e9cf] font-heebo text-sm flex items-center justify-between">
        <span className="opacity-80">תצוגה איזומטרית חיה · 45°</span>
        <span className="opacity-70 text-xs tracking-wider">RAHITI · GAATON LIVE PREVIEW</span>
      </div>
    </div>
  );
}

/** Adjust a hex color brightness. amount in [-1..1], negative = darker. */
function shade(hex: string, amount: number): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  const adj = (c: number) =>
    Math.max(0, Math.min(255, Math.round(c + (amount > 0 ? (255 - c) * amount : c * amount))));
  const to2 = (n: number) => n.toString(16).padStart(2, "0");
  return `#${to2(adj(r))}${to2(adj(g))}${to2(adj(b))}`;
}