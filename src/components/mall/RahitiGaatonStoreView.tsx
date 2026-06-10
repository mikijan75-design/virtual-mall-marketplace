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
        </div>
      </section>

      <MallFooter />
    </div>
  );
};

const LABEL: Record<StepKey, string> = {
  type: "סוג רהיט",
  style: "סגנון",
  size: "גודל",
  material: "חומר",
};

export default RahitiGaatonStoreView;