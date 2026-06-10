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
  size?: "קטן" | "בינוני" | "גדול";
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
  { key: "size", question: "מה הגודל המבוקש?", options: ["קטן", "בינוני", "גדול"] },
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
   LIVE PREVIEW — progressive front-view rendering, inspired by
   github.com/Bruinen90/kitchen-planner. Each answered question adds a layer
   of detail: outline → modules → finish → handles → extras.
   ========================================================================= */

type PreviewProps = { answers: Answers };

function LivePreview({ answers }: PreviewProps) {
  const { type, layout, size, material, handles, extras } = answers;

  const hasType = !!type;
  const isKitchen = type === "מטבח";

  // Width scales with size
  const widthScale = size === "קטן" ? 0.75 : size === "גדול" ? 1.15 : 0.95;
  const VB_W = 900;
  const VB_H = 460;
  const unitW = 720 * widthScale;
  const unitH = isKitchen ? 230 : 320;
  const x0 = (VB_W - unitW) / 2;
  const y0 = VB_H - unitH - 60; // leave floor below

  // Module count from layout
  const modules = (() => {
    if (!layout) return 0;
    if (layout === "ישר") return 4;
    if (layout === "L") return 5;
    if (layout === "U") return 6;
    const m = parseInt(layout, 10);
    return Number.isFinite(m) ? m : 3;
  })();

  const mat = MATERIAL_COLORS[material ?? ""] ?? { fill: "#d8c29b", grain: "#a07a44", edge: "#7a5a32" };

  // Counter top for kitchen
  const counterH = isKitchen ? 14 : 0;

  const moduleW = modules > 0 ? unitW / modules : unitW;

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-[#c9a06a]/40 shadow-inner bg-gradient-to-b from-[#f8f1de] to-[#ecdcbd]">
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="w-full h-auto block"
        role="img"
        aria-label="הדמייה חיה של הרהיט"
      >
        <defs>
          <linearGradient id="floor-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e6d5b3" />
            <stop offset="100%" stopColor="#bf9f6c" />
          </linearGradient>
          <linearGradient id="wall-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fbf3df" />
            <stop offset="100%" stopColor="#ead7b0" />
          </linearGradient>
          <pattern id="wood-grain" patternUnits="userSpaceOnUse" width="6" height="40">
            <rect width="6" height="40" fill={mat.fill} />
            <path d="M0 6 Q3 14 0 22 T0 38" stroke={mat.grain} strokeWidth="0.6" fill="none" opacity="0.55" />
          </pattern>
        </defs>

        {/* Wall + floor */}
        <rect x="0" y="0" width={VB_W} height={VB_H - 60} fill="url(#wall-grad)" />
        <rect x="0" y={VB_H - 60} width={VB_W} height="60" fill="url(#floor-grad)" />
        <line x1="0" y1={VB_H - 60} x2={VB_W} y2={VB_H - 60} stroke="#9a7944" strokeWidth="1.5" />

        {/* Empty-state hint */}
        {!hasType && (
          <g>
            <rect
              x={VB_W / 2 - 180}
              y={VB_H / 2 - 36}
              width="360"
              height="72"
              rx="14"
              fill="#ffffff"
              opacity="0.7"
              stroke="#c9a06a"
              strokeDasharray="6 6"
            />
            <text
              x={VB_W / 2}
              y={VB_H / 2 + 8}
              textAnchor="middle"
              fontFamily="'Frank Ruhl Libre', serif"
              fontWeight="700"
              fontSize="22"
              fill="#5a4126"
            >
              ההדמייה תופיע כאן בזמן שתענה
            </text>
          </g>
        )}

        {/* Outline (after type chosen) */}
        {hasType && (
          <g>
            {/* Base outline */}
            <rect
              x={x0}
              y={y0}
              width={unitW}
              height={unitH}
              fill={material ? "url(#wood-grain)" : "#efe1c8"}
              stroke={mat.edge}
              strokeWidth="2"
              rx="4"
            />

            {/* Kitchen: upper cabinets row */}
            {isKitchen && (
              <rect
                x={x0}
                y={y0 - 130}
                width={unitW}
                height="100"
                fill={material ? "url(#wood-grain)" : "#efe1c8"}
                stroke={mat.edge}
                strokeWidth="2"
                rx="3"
              />
            )}

            {/* Modules (doors / drawers) */}
            {modules > 0 &&
              Array.from({ length: modules }).map((_, i) => {
                const mx = x0 + i * moduleW;
                return (
                  <g key={i}>
                    {/* lower module door */}
                    <rect
                      x={mx + 4}
                      y={y0 + 6}
                      width={moduleW - 8}
                      height={unitH - 12 - counterH}
                      fill="none"
                      stroke={mat.edge}
                      strokeWidth="1.4"
                      rx="3"
                    />
                    {/* horizontal drawer line for kitchen */}
                    {isKitchen && (
                      <line
                        x1={mx + 4}
                        y1={y0 + 50}
                        x2={mx + moduleW - 4}
                        y2={y0 + 50}
                        stroke={mat.edge}
                        strokeWidth="1"
                      />
                    )}
                    {/* upper module */}
                    {isKitchen && (
                      <rect
                        x={mx + 4}
                        y={y0 - 124}
                        width={moduleW - 8}
                        height={88}
                        fill="none"
                        stroke={mat.edge}
                        strokeWidth="1.4"
                        rx="3"
                      />
                    )}
                    {/* Handles */}
                    {handles && handles !== "ללא ידיות" && (
                      <>
                        {handles === "ידיות מוט" ? (
                          <rect
                            x={mx + moduleW / 2 - 16}
                            y={y0 + (isKitchen ? 70 : 30)}
                            width="32"
                            height="3"
                            fill="#3b3b3b"
                            rx="1.5"
                          />
                        ) : (
                          <circle
                            cx={mx + moduleW / 2}
                            cy={y0 + (isKitchen ? 72 : 32)}
                            r="3.5"
                            fill="#3b3b3b"
                          />
                        )}
                        {isKitchen && (
                          handles === "ידיות מוט" ? (
                            <rect
                              x={mx + moduleW / 2 - 14}
                              y={y0 - 50}
                              width="28"
                              height="3"
                              fill="#3b3b3b"
                              rx="1.5"
                            />
                          ) : (
                            <circle cx={mx + moduleW / 2} cy={y0 - 48} r="3" fill="#3b3b3b" />
                          )
                        )}
                      </>
                    )}
                  </g>
                );
              })}

            {/* Kitchen counter (extras: שיש עליון) */}
            {isKitchen && (
              <rect
                x={x0 - 6}
                y={y0 - 6}
                width={unitW + 12}
                height={counterH}
                fill={extras === "שיש עליון" ? "#e9e6df" : "#2a1d12"}
                stroke="#2a1d12"
                strokeWidth="1"
                rx="2"
              />
            )}

            {/* Kitchen extras: stove + oven on a module */}
            {isKitchen && extras === "כיריים + תנור" && modules > 0 && (() => {
              const stoveIdx = Math.floor(modules / 2);
              const sx = x0 + stoveIdx * moduleW;
              return (
                <g>
                  {/* stove top */}
                  <rect x={sx + 8} y={y0 + 4} width={moduleW - 16} height="6" fill="#1b1b1b" />
                  {[0, 1, 2, 3].map((k) => (
                    <circle
                      key={k}
                      cx={sx + 16 + ((moduleW - 32) / 3) * k}
                      cy={y0 + 7}
                      r="3"
                      fill="#3a3a3a"
                      stroke="#0a0a0a"
                      strokeWidth="0.6"
                    />
                  ))}
                  {/* oven door */}
                  <rect
                    x={sx + 10}
                    y={y0 + 56}
                    width={moduleW - 20}
                    height={unitH - 70 - counterH}
                    fill="#2a2a2a"
                    stroke="#0a0a0a"
                    strokeWidth="1"
                    rx="2"
                  />
                  <rect
                    x={sx + 18}
                    y={y0 + 64}
                    width={moduleW - 36}
                    height={unitH - 88 - counterH}
                    fill="#0f0f0f"
                    opacity="0.85"
                    rx="2"
                  />
                </g>
              );
            })()}

            {/* Kitchen extras: fridge takes the rightmost (rtl: leftmost) module */}
            {isKitchen && extras === "מקרר משולב" && modules > 0 && (() => {
              const fx = x0; // leftmost on canvas = rightmost in RTL view
              return (
                <g>
                  <rect
                    x={fx + 4}
                    y={y0 - 124}
                    width={moduleW - 8}
                    height={unitH - 12 + 124}
                    fill="#f5f5f5"
                    stroke="#2a2a2a"
                    strokeWidth="1.5"
                    rx="3"
                  />
                  <line
                    x1={fx + 4}
                    y1={y0 + 40}
                    x2={fx + moduleW - 4}
                    y2={y0 + 40}
                    stroke="#2a2a2a"
                    strokeWidth="1"
                  />
                  <rect
                    x={fx + moduleW - 18}
                    y={y0 - 110}
                    width="3"
                    height="40"
                    fill="#3b3b3b"
                  />
                  <rect
                    x={fx + moduleW - 18}
                    y={y0 + 50}
                    width="3"
                    height="40"
                    fill="#3b3b3b"
                  />
                </g>
              );
            })()}

            {/* Closet extras: shelves / drawers / hanging rod */}
            {!isKitchen && extras && modules > 0 && (() => {
              const elements: JSX.Element[] = [];
              for (let i = 0; i < modules; i++) {
                const mx = x0 + i * moduleW;
                if (extras === "מדפים") {
                  [0.25, 0.5, 0.75].forEach((p, k) => {
                    elements.push(
                      <line
                        key={`sh-${i}-${k}`}
                        x1={mx + 10}
                        y1={y0 + unitH * p}
                        x2={mx + moduleW - 10}
                        y2={y0 + unitH * p}
                        stroke={mat.edge}
                        strokeWidth="1.2"
                        opacity="0.55"
                      />
                    );
                  });
                } else if (extras === "מגירות") {
                  [0.35, 0.55, 0.75].forEach((p, k) => {
                    elements.push(
                      <rect
                        key={`dr-${i}-${k}`}
                        x={mx + 10}
                        y={y0 + unitH * p}
                        width={moduleW - 20}
                        height={unitH * 0.13}
                        fill="none"
                        stroke={mat.edge}
                        strokeWidth="1.1"
                        rx="2"
                      />
                    );
                  });
                } else if (extras === "מוט תלייה") {
                  elements.push(
                    <line
                      key={`rod-${i}`}
                      x1={mx + 10}
                      y1={y0 + 38}
                      x2={mx + moduleW - 10}
                      y2={y0 + 38}
                      stroke="#3b3b3b"
                      strokeWidth="2"
                    />
                  );
                  // little hangers
                  [0.25, 0.5, 0.75].forEach((p, k) => {
                    const hx = mx + 10 + (moduleW - 20) * p;
                    elements.push(
                      <path
                        key={`hg-${i}-${k}`}
                        d={`M ${hx} 38 q -10 14 0 22 q 10 -8 0 -22`}
                        transform={`translate(0,${y0})`}
                        stroke="#5a3d20"
                        strokeWidth="1.2"
                        fill="none"
                      />
                    );
                  });
                }
              }
              return <g>{elements}</g>;
            })()}

            {/* Side shadow */}
            <rect
              x={x0}
              y={y0 + unitH}
              width={unitW}
              height="6"
              fill="#000"
              opacity="0.15"
            />
          </g>
        )}

        {/* Labels at bottom */}
        <g fontFamily="'Heebo', sans-serif" fontSize="14" fill="#5a4126">
          <text x={VB_W / 2} y={VB_H - 18} textAnchor="middle" opacity="0.7">
            {hasType
              ? `${type ?? ""}${layout ? " · " + layout : ""}${size ? " · " + size : ""}${material ? " · " + material : ""}`
              : "ההדמייה מתעדכנת לפי הבחירות שלכם"}
          </text>
        </g>
      </svg>

      {/* Caption */}
      <div className="px-4 py-3 bg-[#2a1d12] text-[#f7e9cf] font-heebo text-sm flex items-center justify-between">
        <span className="opacity-80">תצוגה חיה · נבנית עם כל תשובה</span>
        <span className="opacity-70 text-xs tracking-wider">RAHITI · GAATON LIVE PREVIEW</span>
      </div>
    </div>
  );
}