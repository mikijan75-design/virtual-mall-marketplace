import { useEffect, useMemo, useState } from "react";
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
  height?: number;       // closet total height in cm (160/200/220/240)
  designCategory?: "עץ" | "בד" | "מלא";
  material?: string;
  handles?: "ידיות מוט" | "ידיות כפתור" | "ללא ידיות";
  extras?: string[];     // kitchen: כיריים+תנור / מקרר / שיש עליון ; closet: מגירות / מדפים / תלייה (multi-select)
};

type StepKey = keyof Answers;

type StepDef = {
  key: StepKey;
  question: string;
  options: string[] | ((a: Answers) => string[]);
};

const getSteps = (a: Answers): StepDef[] => {
  const isCloset = a.type === "ארון";
  return [
    { key: "type", question: "מה תרצה לבנות?", options: ["ארון", "מטבח"] },
    {
      key: "layout",
      question: isCloset ? "סוג פתיחת דלתות?" : "איך לסדר את היחידות?",
      options: a.type === "מטבח"
        ? ["ישר", "L", "U"]
        : ["דלתות נפתחות", "דלתות הזזה"],
    },
    ...(isCloset
      ? [{
          key: "height" as StepKey,
          question: "מה הגובה?",
          options: a.layout === "דלתות הזזה"
            ? ["160 ס\"מ", "180 ס\"מ", "200 ס\"מ", "220 ס\"מ", "240 ס\"מ"]
            : ["160 ס\"מ", "180 ס\"מ", "200 ס\"מ", "220 ס\"מ", "240 ס\"מ"],
        }]
      : []),
    { key: "designCategory", question: "איזה עיצוב אתם מעוניינים?", options: ["עץ", "בד", "מלא"] },
    {
      key: "material",
      question: "איזה גוון?",
      options: (ans: Answers) => {
        if (ans.designCategory === "עץ") return ["אלון", "אגוז", "אורן"];
        if (ans.designCategory === "בד")
          return ["תכלת בהיר", "לבן", "אפור בהיר", "אפור כהה"];
        if (ans.designCategory === "מלא")
          return ["לבן", "קרם בהיר", "נס", "תכלת בהיר", "ורוד בהיר", "אפרסק בהיר"];
        return [];
      },
    },
    { key: "handles", question: "סוג ידיות?", options: ["ידיות מוט", "ידיות כפתור", "ללא ידיות"] },
    {
      key: "extras",
      question: "מה להוסיף?",
      options: a.type === "מטבח"
        ? ["כיריים + תנור", "מקרר משולב", "שיש עליון"]
        : ["מגירות", "מדפים", "מוט תלייה"],
    },
  ];
};

const MATERIAL_COLORS: Record<string, { fill: string; grain: string; edge: string }> = {
  // עץ
  "עץ:אלון":              { fill: "#c9a06a", grain: "#a07a44", edge: "#7a5a32" },
  "עץ:אגוז":              { fill: "#6b4525", grain: "#4a2e16", edge: "#2e1c0d" },
  "עץ:אורן":              { fill: "#e7c79a", grain: "#c69b6a", edge: "#9c7344" },
  // בד (פשתן) — גוונים רכים
  "בד:תכלת בהיר":         { fill: "#dff0fb", grain: "#b9d8ec", edge: "#8fb4cc" },
  "בד:לבן":               { fill: "#f6f1e7", grain: "#e2d9c7", edge: "#b6ad9a" },
  "בד:אפור בהיר":         { fill: "#d9d9d4", grain: "#bcbcb5", edge: "#8d8d86" },
  "בד:אפור כהה":          { fill: "#5e5e5a", grain: "#464643", edge: "#2c2c2a" },
  // מלא
  "מלא:לבן":              { fill: "#fafafa", grain: "#ececec", edge: "#bdbdbd" },
  "מלא:קרם בהיר":         { fill: "#f4ead6", grain: "#e4d6b6", edge: "#b09c72" },
  "מלא:נס":               { fill: "#efe1cf", grain: "#dcc7ad", edge: "#a98a64" },
  "מלא:תכלת בהיר":        { fill: "#e3f1fb", grain: "#c2dcef", edge: "#92b7ce" },
  "מלא:ורוד בהיר":        { fill: "#fbe4ea", grain: "#f0c5d1", edge: "#c389a0" },
  "מלא:אפרסק בהיר":       { fill: "#fde2cf", grain: "#f5c4a3", edge: "#c98c5e" },
};

const WOOD_BG =
  "repeating-linear-gradient(92deg, #f6ecdc 0 6px, #efe1c8 6px 13px, #f3e6d0 13px 22px, #ead8b8 22px 34px)";

const RahitiGaatonStoreView = ({ store }: { store: Store }) => {
  const navigate = useNavigate();
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone] = useState(false);
  const [counts, setCounts] = useState<Counts>({
    centerBase: 4,
    centerUpper: 4,
    leftBase: 2,
    leftUpper: 2,
    rightBase: 2,
    rightUpper: 2,
  });

  const steps = useMemo(() => getSteps(answers), [answers]);
  const safeIdx = Math.min(stepIdx, steps.length - 1);
  const step = steps[safeIdx];
  const stepOptions = typeof step.options === "function" ? step.options(answers) : step.options;
  const progress = useMemo(
    () => Math.round(((done ? steps.length : safeIdx) / steps.length) * 100),
    [safeIdx, done, steps.length]
  );

  const pick = (value: string) => {
    let next: Answers = { ...answers, [step.key]: value as Answers[StepKey] };
    // Multi-select for extras (toggle)
    if (step.key === "extras") {
      const cur = answers.extras ?? [];
      const updated = cur.includes(value)
        ? cur.filter((v) => v !== value)
        : [...cur, value];
      next = { ...answers, extras: updated };
    }
    // Reset dependent fields if `type` changes
    if (step.key === "type" && answers.type && answers.type !== value) {
      next.layout = undefined;
      next.extras = undefined;
      next.height = undefined;
      next.designCategory = undefined;
      next.material = undefined;
    }
    // Reset material when category changes
    if (step.key === "designCategory" && answers.designCategory !== value) {
      next.material = undefined;
    }
    // Parse closet height (e.g. "200 ס\"מ" -> 200)
    if (step.key === "height") {
      const h = parseInt(value, 10);
      next.height = isNaN(h) ? 240 : h;
    }
    // Initialise unit counts when layout chosen
    if (step.key === "layout") {
      if (next.type === "מטבח") {
        setCounts({
          centerBase: 4, centerUpper: 4,
          leftBase: 2, leftUpper: 2,
          rightBase: 2, rightUpper: 2,
        });
      } else {
        // 2 default units (sliding => 2 sliding doors, hinged => 2 units of 2 doors)
        const n = 2;
        setCounts({
          centerBase: n, centerUpper: n,
          leftBase: 0, leftUpper: 0,
          rightBase: 0, rightUpper: 0,
        });
      }
    }
    setAnswers(next);
    // Extras is multi-select: don't auto-advance, user clicks "סיום" button
    if (step.key === "extras") return;
    // Recompute steps with the new answers so dynamic insertion (height for closet) is respected
    const nextSteps = getSteps(next);
    if (safeIdx + 1 < nextSteps.length) {
      setTimeout(() => setStepIdx(safeIdx + 1), 220);
    } else {
      setTimeout(() => setDone(true), 220);
    }
  };

  const reset = () => {
    setAnswers({});
    setStepIdx(0);
    setDone(false);
    setCounts({
      centerBase: 4, centerUpper: 4,
      leftBase: 2, leftUpper: 2,
      rightBase: 2, rightUpper: 2,
    });
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
              <span>שאלה {Math.min(safeIdx + 1, steps.length)} מתוך {steps.length}</span>
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
                {step.key === "extras"
                  ? "ניתן לבחור כמה אופציות. בסיום לחצו ׳סיום ושליחת פרטים׳"
                  : "בחרו אופציה ונמשיך הלאה"}
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
                  const cur = answers[step.key];
                  const selected = Array.isArray(cur) ? cur.includes(opt) : cur === opt;
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

              {step.key === "extras" && (
                <button
                  type="button"
                  onClick={() => setDone(true)}
                  className="mt-8 inline-flex items-center gap-2 rounded-xl px-7 py-3 font-frank font-bold text-white shadow-lg hover:opacity-95 transition"
                  style={{ background: "linear-gradient(180deg, #5a3d20, #2a1d12)" }}
                >
                  סיום ושליחת פרטים ←
                </button>
              )}

              {stepIdx > 0 && (
                <button
                  type="button"
                  onClick={() => setStepIdx(stepIdx - 1)}
                  className="mt-8 inline-flex items-center gap-2 rounded-xl border-2 border-[#8b5e2b]/60 bg-[#f8efd9] px-5 py-2.5 font-heebo text-sm font-semibold text-[#3b2918] shadow-sm hover:-translate-y-0.5 hover:bg-[#ece3cd] hover:border-[#8b5e2b] hover:shadow-md transition-all duration-200"
                >
                  <span aria-hidden="true">←</span>
                  <span>חזרה לשאלה הקודמת</span>
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
                {(Object.keys(answers) as StepKey[])
                  .filter((k) => {
                    const v = answers[k];
                    if (v === undefined || v === null || v === "") return false;
                    if (Array.isArray(v) && v.length === 0) return false;
                    return true;
                  })
                  .map((k) => (
                  <li
                    key={k}
                    className="rounded-xl border border-[#c9a06a]/40 bg-[#f8efd9] px-4 py-3"
                  >
                    <div className="font-heebo text-xs text-[#7a5a36]">
                      {LABEL[k]}
                    </div>
                    <div className="font-frank font-bold text-[#3b2918] mt-1">
                      {Array.isArray(answers[k]) ? (answers[k] as string[]).join(", ") : (answers[k] as string | number)}
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
                  onClick={() => {
                    setDone(false);
                    setStepIdx(steps.length - 1);
                  }}
                  className="rounded-xl px-7 py-3 font-frank font-bold text-[#3b2918] border-2 border-[#8b5e2b]/70 bg-[#f8efd9] hover:bg-[#ece3cd] hover:border-[#8b5e2b] shadow-sm hover:shadow-md transition inline-flex items-center justify-center gap-2"
                >
                  <span aria-hidden="true">←</span>
                  <span>חזרה ושינוי בחירות</span>
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
            <LivePreview answers={answers} setAnswers={setAnswers} counts={counts} setCounts={setCounts} />
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
  height: "גובה",
  designCategory: "עיצוב",
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

type Counts = {
  centerBase: number;
  centerUpper: number;
  leftBase: number;
  leftUpper: number;
  rightBase: number;
  rightUpper: number;
};
type PreviewProps = {
  answers: Answers;
  setAnswers: React.Dispatch<React.SetStateAction<Answers>>;
  counts: Counts;
  setCounts: React.Dispatch<React.SetStateAction<Counts>>;
};

function LivePreview({ answers, setAnswers, counts, setCounts }: PreviewProps) {
  const { type, layout, material, handles, extras } = answers;

  const hasType = !!type;
  const isKitchen = type === "מטבח";

  // L-shape mirror toggle (right arm → left arm)
  const [lMirror, setLMirror] = useState(false);

  // Fridge / Stove positions along the center arm (0 = leftmost slot)
  // Fridge replaces the cabinet at that slot; stove overlays the cabinet at that slot.
  const [fridgePos, setFridgePos] = useState<number | null>(null);
  const [stovePos, setStovePos] = useState<number | null>(null);

  // In-preview shape switcher for kitchen (ישר / L / U)
  const setLayoutShape = (shape: "ישר" | "L" | "U") => {
    setAnswers((a) => ({ ...a, layout: shape }));
  };

  // Effective center base count for kitchen
  const centerCountEff = isKitchen ? Math.max(1, counts.centerBase) : 0;
  const hasFridge = !!(isKitchen && extras?.includes("מקרר משולב"));
  const hasStove = !!(isKitchen && extras?.includes("כיריים + תנור"));

  // Initialise / clamp positions when extras or layout change
  useEffect(() => {
    if (!hasFridge) { if (fridgePos !== null) setFridgePos(null); return; }
    setFridgePos((p) => {
      const max = centerCountEff;             // 0..nC (insert positions)
      if (p === null) return max;             // default: after all cabinets
      return Math.max(0, Math.min(max, p));
    });
  }, [hasFridge, centerCountEff]);
  useEffect(() => {
    if (!hasStove) { if (stovePos !== null) setStovePos(null); return; }
    setStovePos((p) => {
      const max = centerCountEff - 1;
      const def = Math.min(1, max);            // default like before (index 1)
      if (p === null) return def;
      // Avoid overlapping fridge if possible
      let np = Math.max(0, Math.min(max, p));
      if (hasFridge && fridgePos !== null && np === fridgePos && max > 0) {
        np = np === 0 ? 1 : np - 1;
      }
      return np;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasStove, centerCountEff]);

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

  // Real-world centimetres mapped 1:1 into SVG units.
  // Kitchen: standard base 60×60×90 with 38cm upper at 130cm.
  // Closet: each unit 80cm wide (2 doors), total height 240cm
  // (lower body 160cm + upper section 80cm, connected, same 60cm depth).
  const W = isKitchen ? 70 : 80;   // module width along arm
  const D = 60;                    // depth (same for closet upper & lower)
  // Closet: lower body fixed 160, upper section = chosen total height - 160
  const closetTotal = answers.height ?? 240;
  const closetUpperH = Math.max(0, closetTotal - 160);
  const H = isKitchen ? 95 : 160;  // base / closet lower body height
  const UH = isKitchen ? 80 : closetUpperH; // upper section height
  const UD = isKitchen ? 38 : D;   // closet upper keeps full depth (connected)
  const UY = 130;                  // kitchen upper Y start
  const isSliding = !isKitchen && layout === "דלתות הזזה";

  const matKey = answers.designCategory && material ? `${answers.designCategory}:${material}` : "";
  const mat =
    MATERIAL_COLORS[matKey] ?? { fill: "#d8c29b", grain: "#a07a44", edge: "#7a5a32" };
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
  const textureId = material
    ? answers.designCategory === "עץ"
      ? "tex-wood"
      : answers.designCategory === "בד"
      ? "tex-linen"
      : null
    : null;

  // --- Build module list as 3D boxes ---
  type Box = {
    x: number; z: number; w: number; d: number; h: number; y0?: number;
    kind: "base" | "upper" | "tall" | "stove" | "counter";
    facingX?: boolean; // door faces +x direction (default +z)
  };

  const boxes: Box[] = [];

  if (hasType && layout) {
    if (isKitchen) {
      const nC = Math.max(1, counts.centerBase);
      const nCU = Math.max(0, counts.centerUpper);
      const nR = Math.max(0, counts.rightBase);
      const nRU = Math.max(0, counts.rightUpper);
      const nL = Math.max(0, counts.leftBase);
      const nLU = Math.max(0, counts.leftUpper);

      // Fridge is an ADDITION (not a replacement). It inserts a new slot at
      // `fridgePos` in 0..nC, shifting cabinets at index >= fridgePos by W.
      const fridgeOn = !!(extras?.includes("מקרר משולב") && fridgePos !== null);
      const fp = fridgeOn ? Math.max(0, Math.min(nC, fridgePos!)) : -1;
      const shift = (i: number) => (fridgeOn && i >= fp ? W : 0);

      // Center arm: along +x at z = 0
      for (let i = 0; i < nC; i++) {
        boxes.push({ x: i * W + shift(i), z: 0, w: W, d: D, h: H, kind: "base" });
      }
      for (let i = 0; i < nCU; i++) {
        boxes.push({ x: i * W + shift(i), z: 0, w: W, d: UD, h: UH, y0: UY, kind: "upper" });
      }

      // Right arm (L or U) — at right end of center, extending +z.
      // When L is mirrored, render this arm at the LEFT end instead.
      if (layout === "L" || layout === "U") {
        const centerSpan = nC * W + (fridgeOn ? W : 0);
        const xR = (layout === "L" && lMirror) ? 0 : centerSpan - D;
        for (let i = 0; i < nR; i++) {
          boxes.push({ x: xR, z: D + i * W, w: D, d: W, h: H, kind: "base", facingX: true });
        }
        for (let i = 0; i < nRU; i++) {
          boxes.push({ x: xR, z: D + i * W, w: UD, d: W, h: UH, y0: UY, kind: "upper", facingX: true });
        }
      }
      // Left arm (U only) — at left end of center, extending +z
      if (layout === "U") {
        for (let i = 0; i < nL; i++) {
          boxes.push({ x: 0, z: D + i * W, w: D, d: W, h: H, kind: "base", facingX: true });
        }
        for (let i = 0; i < nLU; i++) {
          boxes.push({ x: 0, z: D + i * W, w: UD, d: W, h: UH, y0: UY, kind: "upper", facingX: true });
        }
      }
    } else {
      // Closet: tall single units (full height), optional horizontal split at 160cm for upper doors.
      const n = Math.max(isSliding ? 2 : 1, counts.centerBase);
      const totalW = n * W;
      for (let i = 0; i < n; i++) {
        boxes.push({ x: i * W, z: 0, w: W, d: D, h: closetTotal, kind: "tall" });
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
      topFill = extras?.includes("שיש עליון") ? "#ece8df" : "#1f1812";
    }

    // Compute handle / detail position on the front face
    const details: JSX.Element[] = [];
    if (b.kind !== "counter") {
      // Door split line: a vertical line down the middle of the front face
      // (skip on sliding-door closet — each unit is one sliding door)
      if (!isSliding) {
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
      }

      // Horizontal split line for tall closet units at 160cm (upper door division)
      if (b.kind === "tall" && !isKitchen && !isSliding && closetTotal > 160) {
        const splitY = 160;
        const h1 = frontFaceIsZ
          ? iso(b.x, splitY, b.z + b.d)
          : iso(b.x + b.w, splitY, b.z);
        const h2 = frontFaceIsZ
          ? iso(b.x + b.w, splitY, b.z + b.d)
          : iso(b.x + b.w, splitY, b.z + b.d);
        details.push(
          <line
            key={`hsplit-${key}`}
            x1={h1[0]} y1={h1[1]} x2={h2[0]} y2={h2[1]}
            stroke={F.edge} strokeWidth="0.8" opacity="0.55"
          />
        );
      }

      // Handles (only on base / closet, not on upper)
      if (handles && handles !== "ללא ידיות") {
        const handleY = b.kind === "upper" ? y0 + b.h * 0.15 : y0 + b.h * 0.78;
        // For split units (two doors), place a handle on each door near the center split.
        // For sliding-door units (no split), place a single handle only.
        const handleRanges: Array<[number, number]> = isSliding
          ? [[0.55, 0.85]]
          : [
              [0.15, 0.42], // left door — handle near inner (right) edge
              [0.58, 0.85], // right door — handle near inner (left) edge
            ];
        handleRanges.forEach(([u1, u2], hi) => {
          const a = frontFaceIsZ
            ? iso(b.x + b.w * u1, handleY, b.z + b.d)
            : iso(b.x + b.w, handleY, b.z + b.d * u1);
          const bb = frontFaceIsZ
            ? iso(b.x + b.w * u2, handleY, b.z + b.d)
            : iso(b.x + b.w, handleY, b.z + b.d * u2);
          if (handles === "ידיות מוט") {
            details.push(
              <line key={`h-${key}-${hi}`} x1={a[0]} y1={a[1]} x2={bb[0]} y2={bb[1]} stroke="#2b2b2b" strokeWidth="2.2" strokeLinecap="round" />
            );
          } else {
            const cx = (a[0] + bb[0]) / 2;
            const cy = (a[1] + bb[1]) / 2;
            details.push(<circle key={`h-${key}-${hi}`} cx={cx} cy={cy} r="2.6" fill="#2b2b2b" />);
          }
        });
      }
    }

    // Stove + oven decoration on the chosen center-arm base when "כיריים + תנור" selected.
    // Account for fridge insertion shift: cabinets at original index >= fridgePos are shifted by W.
    const fridgeOnHere = !!(isKitchen && extras?.includes("מקרר משולב") && fridgePos !== null);
    const stoveShift = fridgeOnHere && stovePos !== null && stovePos >= (fridgePos ?? 0) ? W : 0;
    if (
      b.kind === "base" && isKitchen && extras?.includes("כיריים + תנור") &&
      b.z === 0 && !b.facingX &&
      stovePos !== null && b.x === stovePos * W + stoveShift
    ) {
      // Hob (top of counter) — 4 burners
      const T1 = iso(b.x + b.w * 0.12, y1 + 0.5, b.z + b.d * 0.18);
      const T2 = iso(b.x + b.w * 0.88, y1 + 0.5, b.z + b.d * 0.18);
      const T3 = iso(b.x + b.w * 0.88, y1 + 0.5, b.z + b.d * 0.82);
      const T4 = iso(b.x + b.w * 0.12, y1 + 0.5, b.z + b.d * 0.82);
      details.push(
        <polygon key={`hob-${key}`} points={`${T1.join(",")} ${T2.join(",")} ${T3.join(",")} ${T4.join(",")}`} fill="#141414" stroke="#000" strokeWidth="0.3" />
      );
      [[0.3, 0.32], [0.7, 0.32], [0.3, 0.7], [0.7, 0.7]].forEach(([u, v], idx) => {
        const c = iso(b.x + b.w * u, y1 + 0.6, b.z + b.d * v);
        details.push(<circle key={`burn-${key}-${idx}`} cx={c[0]} cy={c[1]} r="3" fill="#2c2c2c" stroke="#0a0a0a" strokeWidth="0.4" />);
        details.push(<circle key={`burn2-${key}-${idx}`} cx={c[0]} cy={c[1]} r="1.2" fill="#5a5a5a" />);
      });
      // Oven door on the FRONT face of the same base unit
      const ovU0 = 0.12, ovU1 = 0.88;
      const ovY0 = y0 + b.h * 0.18;
      const ovY1 = y0 + b.h * 0.92;
      const O1 = frontFaceIsZ ? iso(b.x + b.w * ovU0, ovY0, b.z + b.d) : iso(b.x + b.w, ovY0, b.z + b.d * ovU0);
      const O2 = frontFaceIsZ ? iso(b.x + b.w * ovU1, ovY0, b.z + b.d) : iso(b.x + b.w, ovY0, b.z + b.d * ovU1);
      const O3 = frontFaceIsZ ? iso(b.x + b.w * ovU1, ovY1, b.z + b.d) : iso(b.x + b.w, ovY1, b.z + b.d * ovU1);
      const O4 = frontFaceIsZ ? iso(b.x + b.w * ovU0, ovY1, b.z + b.d) : iso(b.x + b.w, ovY1, b.z + b.d * ovU0);
      details.push(
        <polygon key={`oven-${key}`} points={`${O1.join(",")} ${O2.join(",")} ${O3.join(",")} ${O4.join(",")}`} fill="#1a1a1a" stroke="#000" strokeWidth="0.4" />
      );
      // Oven inner glass panel
      const gU0 = 0.18, gU1 = 0.82, gY0 = y0 + b.h * 0.30, gY1 = y0 + b.h * 0.80;
      const G1 = frontFaceIsZ ? iso(b.x + b.w * gU0, gY0, b.z + b.d) : iso(b.x + b.w, gY0, b.z + b.d * gU0);
      const G2 = frontFaceIsZ ? iso(b.x + b.w * gU1, gY0, b.z + b.d) : iso(b.x + b.w, gY0, b.z + b.d * gU1);
      const G3 = frontFaceIsZ ? iso(b.x + b.w * gU1, gY1, b.z + b.d) : iso(b.x + b.w, gY1, b.z + b.d * gU1);
      const G4 = frontFaceIsZ ? iso(b.x + b.w * gU0, gY1, b.z + b.d) : iso(b.x + b.w, gY1, b.z + b.d * gU0);
      details.push(
        <polygon key={`ovglass-${key}`} points={`${G1.join(",")} ${G2.join(",")} ${G3.join(",")} ${G4.join(",")}`} fill="#3a3530" opacity="0.85" />
      );
      // Oven handle bar near top of door
      const hY = y0 + b.h * 0.24;
      const Ha = frontFaceIsZ ? iso(b.x + b.w * 0.2, hY, b.z + b.d) : iso(b.x + b.w, hY, b.z + b.d * 0.2);
      const Hb = frontFaceIsZ ? iso(b.x + b.w * 0.8, hY, b.z + b.d) : iso(b.x + b.w, hY, b.z + b.d * 0.8);
      details.push(
        <line key={`ovhandle-${key}`} x1={Ha[0]} y1={Ha[1]} x2={Hb[0]} y2={Hb[1]} stroke="#c8c8c8" strokeWidth="2.4" strokeLinecap="round" />
      );
    }

    // Marble veins on counter top when "שיש עליון"
    if (b.kind === "base" && isKitchen && extras?.includes("שיש עליון")) {
      const seed = (b.x * 13 + b.z * 7) % 100;
      [0.25, 0.55, 0.78].forEach((vy, i) => {
        const offset = ((seed + i * 17) % 20) / 100;
        const v1 = iso(b.x + b.w * (0.05 + offset), y1 + 0.6, b.z + b.d * vy);
        const v2 = iso(b.x + b.w * (0.4 + offset), y1 + 0.6, b.z + b.d * (vy + 0.08));
        const v3 = iso(b.x + b.w * (0.95), y1 + 0.6, b.z + b.d * (vy - 0.04));
        details.push(
          <polyline key={`vein-${key}-${i}`} points={`${v1.join(",")} ${v2.join(",")} ${v3.join(",")}`} fill="none" stroke="#a8a299" strokeWidth="0.6" opacity="0.7" />
        );
      });
    }

    return (
      <g key={key}>
        {/* side first (back), then top, then front for correct overlap */}
        <polygon points={sidePoly} fill={F.side} stroke={F.edge} strokeWidth="0.8" />
        {textureId && (
          <polygon points={sidePoly} fill={`url(#${textureId})`} stroke="none" pointerEvents="none" />
        )}
        <polygon points={topPoly} fill={topFill} stroke={F.edge} strokeWidth="0.8" />
        {textureId && (
          <polygon points={topPoly} fill={`url(#${textureId})`} stroke="none" pointerEvents="none" />
        )}
        <polygon points={frontPoly} fill={frontFill} stroke={F.edge} strokeWidth="0.8" />
        {textureId && (
          <polygon points={frontPoly} fill={`url(#${textureId})`} stroke="none" pointerEvents="none" />
        )}
        {details}
      </g>
    );
  };

  // Sort boxes back-to-front for painter's algorithm (depth = x + z + y0)
  const sortedBoxes = [...boxes].sort(
    (a, bb) => a.x + a.z + (a.y0 ?? 0) * 0.2 - (bb.x + bb.z + (bb.y0 ?? 0) * 0.2)
  );

  // Fridge is an ADDITION at slot `fridgePos` (0..nC, where nC = center base count).
  // It does not hide any cabinet. Cabinets at index >= fridgePos were already shifted by W above.
  const nC = isKitchen ? Math.max(1, counts.centerBase) : 0;
  const fridgeBase: Box | null = (isKitchen && extras?.includes("מקרר משולב") && fridgePos !== null)
    ? { x: Math.max(0, Math.min(nC, fridgePos)) * W, z: 0, w: W, d: D, h: H, kind: "base" }
    : null;
  const visibleSorted = sortedBoxes;

  const renderFridge = (b: Box) => {
    const fH = 210; // full height (covers base + upper zone)
    const y0 = 0;
    const y1 = fH;
    const C = pt(b.x + b.w, y0, b.z + b.d);
    const G = pt(b.x + b.w, y1, b.z + b.d);
    const Hh = pt(b.x, y1, b.z + b.d);
    const D2 = pt(b.x, y0, b.z + b.d);
    const B = pt(b.x + b.w, y0, b.z);
    const F2 = pt(b.x + b.w, y1, b.z);
    const E = pt(b.x, y1, b.z);
    const frontPoly = `${D2} ${C} ${G} ${Hh}`;
    const sidePoly = `${B} ${C} ${G} ${F2}`;
    const topPoly = `${E} ${F2} ${G} ${Hh}`;
    // Door split (freezer top ~ 60cm)
    const splitY = fH - 60;
    const s1 = iso(b.x, splitY, b.z + b.d);
    const s2 = iso(b.x + b.w, splitY, b.z + b.d);
    // Vertical handles (right side of each door)
    const hx = b.x + b.w * 0.88;
    const h1a = iso(hx, fH - 45, b.z + b.d);
    const h1b = iso(hx, fH - 12, b.z + b.d);
    const h2a = iso(hx, splitY - 15, b.z + b.d);
    const h2b = iso(hx, 25, b.z + b.d);
    return (
      <g key="fridge">
        <polygon points={sidePoly} fill="#9097a0" stroke="#3a4048" strokeWidth="0.8" />
        <polygon points={topPoly} fill="#c6cbd2" stroke="#3a4048" strokeWidth="0.8" />
        <polygon points={frontPoly} fill="#b9bfc6" stroke="#3a4048" strokeWidth="0.8" />
        {/* subtle brushed-metal vertical lines */}
        {[0.15, 0.3, 0.45, 0.6, 0.75].map((u, i) => {
          const a = iso(b.x + b.w * u, 5, b.z + b.d);
          const c = iso(b.x + b.w * u, fH - 5, b.z + b.d);
          return <line key={`fb-${i}`} x1={a[0]} y1={a[1]} x2={c[0]} y2={c[1]} stroke="#fff" strokeOpacity="0.18" strokeWidth="0.5" />;
        })}
        <line x1={s1[0]} y1={s1[1]} x2={s2[0]} y2={s2[1]} stroke="#3a4048" strokeWidth="1" opacity="0.8" />
        <line x1={h1a[0]} y1={h1a[1]} x2={h1b[0]} y2={h1b[1]} stroke="#2b2b2b" strokeWidth="2.4" strokeLinecap="round" />
        <line x1={h2a[0]} y1={h2a[1]} x2={h2b[0]} y2={h2b[1]} stroke="#2b2b2b" strokeWidth="2.4" strokeLinecap="round" />
      </g>
    );
  };

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

  // --- Measurement rulers (width above center arm, height on right side) ---
  const rulers = (() => {
    if (!hasType || !layout) return null;
    const baseCenterCount = isKitchen
      ? Math.max(1, counts.centerBase)
      : Math.max(isSliding ? 2 : 1, counts.centerBase);
    const UNIT_CM = isKitchen ? 70 : 80;
    const fridgeOnRuler = !!(isKitchen && extras?.includes("מקרר משולב") && fridgePos !== null);
    const centerCount = baseCenterCount + (fridgeOnRuler ? 1 : 0);
    const widthCm = centerCount * UNIT_CM;
    const hasUpper = isKitchen && (counts.centerUpper + counts.rightUpper + counts.leftUpper) > 0;
    const topY = isKitchen ? (hasUpper ? UY + UH : H) : closetTotal;
    const heightCm = isKitchen ? (hasUpper ? 235 : 90) : closetTotal;
    const [lx, ly] = iso(0, topY, 0);
    const [rx, ry] = iso(centerCount * W, topY, 0);
    const [bx, by] = iso(centerCount * W, 0, 0);
    const L = { x: lx + dx, y: ly + dy };
    const R = { x: rx + dx, y: ry + dy };
    const B = { x: bx + dx, y: by + dy };
    const topRulerY = Math.min(L.y, R.y) - 30;
    const rightRulerX = Math.max(R.x, B.x) + 26;
    return (
      <g stroke="#3b2918" fill="#3b2918" fontFamily="'Heebo',sans-serif" fontSize="14">
        {/* Top width ruler */}
        <line x1={L.x} y1={topRulerY} x2={R.x} y2={topRulerY} strokeWidth="1.6" />
        <line x1={L.x} y1={topRulerY - 7} x2={L.x} y2={topRulerY + 7} strokeWidth="1.6" />
        <line x1={R.x} y1={topRulerY - 7} x2={R.x} y2={topRulerY + 7} strokeWidth="1.6" />
        <line x1={L.x} y1={topRulerY} x2={L.x} y2={L.y} strokeDasharray="3 3" strokeWidth="1" opacity="0.55" />
        <line x1={R.x} y1={topRulerY} x2={R.x} y2={R.y} strokeDasharray="3 3" strokeWidth="1" opacity="0.55" />
        <text
          x={(L.x + R.x) / 2}
          y={topRulerY - 9}
          textAnchor="middle"
          fontWeight="700"
          stroke="none"
        >
          {widthCm} ס״מ
        </text>
        {/* Right vertical height ruler */}
        <line x1={rightRulerX} y1={R.y} x2={rightRulerX} y2={B.y} strokeWidth="1.6" />
        <line x1={rightRulerX - 7} y1={R.y} x2={rightRulerX + 7} y2={R.y} strokeWidth="1.6" />
        <line x1={rightRulerX - 7} y1={B.y} x2={rightRulerX + 7} y2={B.y} strokeWidth="1.6" />
        <line x1={R.x} y1={R.y} x2={rightRulerX} y2={R.y} strokeDasharray="3 3" strokeWidth="1" opacity="0.55" />
        <line x1={B.x} y1={B.y} x2={rightRulerX} y2={B.y} strokeDasharray="3 3" strokeWidth="1" opacity="0.55" />
        <text
          x={rightRulerX + 10}
          y={(R.y + B.y) / 2}
          dominantBaseline="middle"
          fontWeight="700"
          stroke="none"
        >
          {heightCm} ס״מ
        </text>
      </g>
    );
  })();

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
          {/* Subtle wood-grain texture (color-agnostic overlay) */}
          <pattern id="tex-wood" patternUnits="userSpaceOnUse" width="14" height="80" patternTransform="rotate(2)">
            <rect width="14" height="80" fill="transparent" />
            <path d="M0 10 Q7 12 14 9" stroke="#000" strokeOpacity="0.18" strokeWidth="0.6" fill="none" />
            <path d="M0 26 Q7 24 14 27" stroke="#000" strokeOpacity="0.12" strokeWidth="0.5" fill="none" />
            <path d="M0 42 Q7 45 14 41" stroke="#000" strokeOpacity="0.20" strokeWidth="0.7" fill="none" />
            <path d="M0 58 Q7 56 14 59" stroke="#000" strokeOpacity="0.10" strokeWidth="0.5" fill="none" />
            <path d="M0 72 Q7 74 14 71" stroke="#000" strokeOpacity="0.16" strokeWidth="0.6" fill="none" />
            <path d="M0 18 Q7 19 14 18" stroke="#fff" strokeOpacity="0.10" strokeWidth="0.4" fill="none" />
            <path d="M0 50 Q7 49 14 50" stroke="#fff" strokeOpacity="0.10" strokeWidth="0.4" fill="none" />
          </pattern>
          {/* Linen weave (color-agnostic overlay) */}
          <pattern id="tex-linen" patternUnits="userSpaceOnUse" width="6" height="6">
            <rect width="6" height="6" fill="transparent" />
            {/* Broken horizontal weave threads */}
            <path d="M0.4 0.8 L2.3 0.8 M3.1 0.8 L5.4 0.8" stroke="#000" strokeOpacity="0.28" strokeWidth="0.55" strokeLinecap="round" />
            <path d="M0.6 3.2 L2.6 3.2 M3.4 3.2 L5.7 3.2" stroke="#000" strokeOpacity="0.22" strokeWidth="0.5" strokeLinecap="round" />
            {/* Broken vertical weave threads, offset */}
            <path d="M1.5 0.3 L1.5 2.1 M1.5 2.9 L1.5 5.2" stroke="#000" strokeOpacity="0.24" strokeWidth="0.5" strokeLinecap="round" />
            <path d="M4.2 0.6 L4.2 2.4 M4.2 3.3 L4.2 5.5" stroke="#000" strokeOpacity="0.20" strokeWidth="0.5" strokeLinecap="round" />
            {/* Tiny highlight slubs to feel like linen fiber */}
            <path d="M0.8 4.6 L1.6 4.6" stroke="#fff" strokeOpacity="0.22" strokeWidth="0.35" strokeLinecap="round" />
            <path d="M3.6 1.9 L4.4 1.9" stroke="#fff" strokeOpacity="0.20" strokeWidth="0.35" strokeLinecap="round" />
          </pattern>
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
            {visibleSorted.map((b, i) => renderBox(b, `b${i}`))}
            {fridgeBase && renderFridge(fridgeBase)}
          </g>
        )}

        {rulers}

        {/* Labels at bottom */}
        <g fontFamily="'Heebo', sans-serif" fontSize="14" fill="#5a4126">
          <text x={VB_W / 2} y={VB_H - 18} textAnchor="middle" opacity="0.75">
            {hasType
              ? `${type ?? ""}${layout ? " · " + layout : ""}${material ? " · " + material : ""}${
                  !isKitchen && layout
                    ? ` · ${counts.centerBase * 80} ס"מ רוחב × ${closetTotal} ס"מ גובה`
                    : ""
                }`
              : "ההדמייה מתעדכנת לפי הבחירות שלכם"}
          </text>
        </g>
      </svg>

      {/* Add/remove units controls */}
      {hasType && layout && (
        <div className="absolute top-3 bottom-12 right-3 pointer-events-none flex items-start">
          {isKitchen ? (
            <div className="rounded-2xl bg-white/90 backdrop-blur border border-[#c9a06a]/60 shadow px-2.5 py-2.5 pointer-events-auto flex flex-col gap-2 max-h-full overflow-auto">
              <div className="font-heebo text-[11px] font-bold text-[#7a5a36] text-center uppercase tracking-wider">עליונים</div>
              {layout === "U" && (
                <ArmStepper
                  label="שמאל"
                  value={counts.leftUpper}
                  min={0}
                  onChange={(n) => setCounts((c) => ({ ...c, leftUpper: n }))}
                />
              )}
              <ArmStepper
                label="אמצע"
                value={counts.centerUpper}
                min={0}
                onChange={(n) => setCounts((c) => ({ ...c, centerUpper: n }))}
              />
              {(layout === "L" || layout === "U") && (
                <ArmStepper
                  label="ימין"
                  value={counts.rightUpper}
                  min={0}
                  onChange={(n) => setCounts((c) => ({ ...c, rightUpper: n }))}
                />
              )}
              <div className="h-px bg-[#c9a06a]/40 my-0.5" />
              <div className="font-heebo text-[11px] font-bold text-[#7a5a36] text-center uppercase tracking-wider">תחתונים</div>
              {layout === "U" && (
                <ArmStepper
                  label="שמאל"
                  value={counts.leftBase}
                  min={0}
                  onChange={(n) => setCounts((c) => ({ ...c, leftBase: n }))}
                />
              )}
              <ArmStepper
                label="אמצע"
                value={counts.centerBase}
                onChange={(n) => setCounts((c) => ({ ...c, centerBase: n }))}
              />
              {(layout === "L" || layout === "U") && (
                <ArmStepper
                  label="ימין"
                  value={counts.rightBase}
                  min={0}
                  onChange={(n) => setCounts((c) => ({ ...c, rightBase: n }))}
                />
              )}
            </div>
          ) : (
            <div className="rounded-2xl bg-white/90 backdrop-blur border border-[#c9a06a]/60 shadow px-2.5 py-2.5 pointer-events-auto flex flex-col gap-2">
              <ArmStepper
                label={isSliding ? "דלתות הזזה" : "יחידות (2 דלתות)"}
                value={counts.centerBase}
                min={isSliding ? 2 : 1}
                max={10}
                onChange={(n) =>
                  setCounts((c) => ({ ...c, centerBase: n }))
                }
              />
            </div>
          )}
        </div>
      )}

      {/* Left-side preview controls: shape switcher + L mirror + fridge/stove movers */}
      {hasType && isKitchen && (
        <div className="absolute top-3 left-3 pointer-events-none flex flex-col gap-2 items-start">
          {/* Shape switcher */}
          <div className="pointer-events-auto rounded-xl bg-white/90 backdrop-blur border border-[#c9a06a]/60 shadow px-2 py-1.5 flex items-center gap-1">
            <span className="font-heebo text-[11px] font-bold text-[#7a5a36] px-1">צורה:</span>
            {(["ישר", "L", "U"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setLayoutShape(s)}
                className={`rounded-lg px-2.5 py-1 font-heebo text-xs font-bold transition ${
                  layout === s
                    ? "bg-[#3b2918] text-[#f7e9cf]"
                    : "bg-[#f8efd9] text-[#3b2918] hover:bg-[#ece3cd] border border-[#c9a06a]/60"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {layout === "L" && (
            <button
              type="button"
              onClick={() => setLMirror((v) => !v)}
              className="pointer-events-auto rounded-xl bg-[#f8efd9] border-2 border-[#8b5e2b]/60 px-3 py-2 font-heebo text-sm font-bold text-[#5a4126] shadow hover:-translate-y-0.5 hover:bg-[#ece3cd] hover:shadow-md transition"
            >
              {lMirror ? "שינוי לצד ימין" : "שינוי לצד שמאל"}
            </button>
          )}

          {hasFridge && fridgePos !== null && (
            <PositionMover
              label="מקרר"
              value={fridgePos}
              min={0}
              max={centerCountEff - 1}
              onChange={setFridgePos}
            />
          )}
          {hasStove && stovePos !== null && (
            <PositionMover
              label="כיריים + תנור"
              value={stovePos}
              min={0}
              max={centerCountEff - 1}
              onChange={setStovePos}
            />
          )}
        </div>
      )}

      <div className="px-4 py-3 bg-[#2a1d12] text-[#f7e9cf] font-heebo text-sm flex items-center justify-between">
        <span className="opacity-80">הוסיפו או הסירו יחידות בכפתורי + / − למעלה</span>
        <span className="opacity-70 text-xs tracking-wider">RAHITI · GAATON LIVE PREVIEW</span>
      </div>
    </div>
  );
}

function ArmStepper({
  label,
  value,
  onChange,
  min = 1,
  max = 10,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full bg-[#f8efd9] border border-[#c9a06a]/60 px-1.5 py-0.5 font-heebo text-xs text-[#3b2918]">
      <button
        type="button"
        aria-label={`הסר יחידה מ${label}`}
        onClick={() => onChange(Math.max(min, value - 1))}
        className="w-6 h-6 rounded-full bg-white hover:bg-[#e7d29f] border border-[#c9a06a] flex items-center justify-center font-bold text-base leading-none"
      >
        −
      </button>
      <span className="min-w-[64px] text-center">
        {label}: <span className="font-bold">{value}</span>
      </span>
      <button
        type="button"
        aria-label={`הוסף יחידה ל${label}`}
        onClick={() => onChange(Math.min(max, value + 1))}
        className="w-6 h-6 rounded-full bg-[#3b2918] text-[#f7e9cf] hover:bg-[#5a3d20] border border-[#3b2918] flex items-center justify-center font-bold text-base leading-none"
      >
        +
      </button>
    </div>
  );
}

function PositionMover({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
}) {
  const canLeft = value > min;   // index 0 = leftmost in scene
  const canRight = value < max;
  return (
    <div className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full bg-white/95 border border-[#c9a06a]/70 shadow px-2 py-1 font-heebo text-xs text-[#3b2918]">
      <button
        type="button"
        aria-label={`הזז ${label} שמאלה`}
        disabled={!canLeft}
        onClick={() => onChange(Math.max(min, value - 1))}
        className="w-6 h-6 rounded-full bg-[#f8efd9] hover:bg-[#e7d29f] border border-[#c9a06a] flex items-center justify-center font-bold leading-none disabled:opacity-40 disabled:hover:bg-[#f8efd9]"
      >
        ◄
      </button>
      <span className="px-1 font-bold">{label}</span>
      <button
        type="button"
        aria-label={`הזז ${label} ימינה`}
        disabled={!canRight}
        onClick={() => onChange(Math.min(max, value + 1))}
        className="w-6 h-6 rounded-full bg-[#f8efd9] hover:bg-[#e7d29f] border border-[#c9a06a] flex items-center justify-center font-bold leading-none disabled:opacity-40 disabled:hover:bg-[#f8efd9]"
      >
        ►
      </button>
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