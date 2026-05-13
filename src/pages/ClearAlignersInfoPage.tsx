import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  Camera,
  CheckCircle2,
  Clock3,
  Cpu,
  MessageCircle,
  PackageCheck,
  RotateCw,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  ThumbsUp,
  Tooth,
  Upload,
  type LucideIcon,
} from "lucide-react";

type Callout = {
  title: string;
  body: string;
  Icon: LucideIcon;
};

type InfoCard = {
  title: string;
  Icon: LucideIcon;
  items: string[];
};

const calloutsRight: Callout[] = [
  {
    title: "צילום ראשוני",
    body: "צילום עצמי של השיניים לסינון מקדים וקבלת הצעה ראשונית.",
    Icon: Camera,
  },
  {
    title: "הנדסת התהליך",
    body: "תכנון דיגיטלי מותאם אישית של תנועת השיניים והיעד הרצוי.",
    Icon: Cpu,
  },
  {
    title: "הזמנת הקשתיות",
    body: "ייצור סדרת קשתיות שקופות לפי התוכנית הדיגיטלית.",
    Icon: PackageCheck,
  },
];

const calloutsLeft: Callout[] = [
  {
    title: "ליווי לכל אורך התהליך",
    body: "מעקב והכוונה מקצועית מרופא בכל שלב חשוב.",
    Icon: Stethoscope,
  },
  {
    title: "תהליך עצמאי",
    body: "החלפת קשתיות עצמאית בבית לפי הנחיות התוכנית.",
    Icon: RotateCw,
  },
  {
    title: "התאמה של קוביות",
    body: "בדיקת קוביות סמוכות, צבע השן ומבנה האזור האסתטי.",
    Icon: Tooth,
  },
];

const infoCards: InfoCard[] = [
  {
    title: "תזרים זמנים",
    Icon: Clock3,
    items: [
      "צילום ותכנון ראשוני",
      "ייצור קשתיות לאחר אישור",
      "החלפה עצמאית כל 10-14 יום",
      "ביקורת ומעקב לאורך התהליך",
    ],
  },
  {
    title: "שיטות",
    Icon: Tooth,
    items: [
      "קשתיות שקופות נשלפות",
      "קוביות לבנות במידת הצורך",
      "שילוב פתרונות לפי מצב השיניים",
    ],
  },
  {
    title: "יתרונות",
    Icon: ThumbsUp,
    items: [
      "נראות אסתטית ועדינה",
      "עצמאות גבוהה בהחלפות",
      "תכנון מראש והבנת היעד",
      "מתאים לשגרה, נסיעות וחופשות",
    ],
  },
  {
    title: "אסתטיקה",
    Icon: Sparkles,
    items: [
      "קשתיות כמעט בלתי מורגשות",
      "קוביות בצבע השן",
      "חיוך טבעי גם בזמן טיפול",
    ],
  },
  {
    title: "זמינות",
    Icon: MessageCircle,
    items: [
      "זמינות דיגיטלית לשאלות",
      "תנאי תשלום נוחים",
      "מענה אנושי לאורך הדרך",
    ],
  },
];

const processSteps = [
  { label: "צילום", Icon: Camera, top: "8%", left: "50%" },
  { label: "תכנון", Icon: Cpu, top: "26%", left: "82%" },
  { label: "ייצור", Icon: PackageCheck, top: "68%", left: "82%" },
  { label: "מעקב", Icon: CheckCircle2, top: "92%", left: "50%" },
  { label: "החלפות", Icon: CalendarDays, top: "68%", left: "18%" },
  { label: "ליווי", Icon: Stethoscope, top: "26%", left: "18%" },
] satisfies { label: string; Icon: LucideIcon; top: string; left: string }[];

const polarToCartesian = (cx: number, cy: number, radius: number, angleInDegrees: number) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(angleInRadians),
    y: cy + radius * Math.sin(angleInRadians),
  };
};

const describeArc = (startAngle: number, endAngle: number) => {
  const start = polarToCartesian(250, 250, 178, startAngle);
  const end = polarToCartesian(250, 250, 178, endAngle);
  return `M ${start.x} ${start.y} A 178 178 0 0 1 ${end.x} ${end.y}`;
};

const ProcessRing = () => {
  const arcs = useMemo(
    () => [
      [14, 58],
      [74, 118],
      [134, 178],
      [194, 238],
      [254, 298],
      [314, 358],
    ],
    [],
  );

  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 500 500" aria-hidden="true">
      <defs>
        <linearGradient id="alignerArrowGradient" x1="120" x2="390" y1="80" y2="420">
          <stop offset="0%" stopColor="#5fc6ee" />
          <stop offset="100%" stopColor="#117fb4" />
        </linearGradient>
        <marker id="alignerArrowHead" markerHeight="12" markerWidth="12" orient="auto" refX="9" refY="6">
          <path d="M0,0 L12,6 L0,12 Z" fill="#1688bf" />
        </marker>
        <filter id="softRingShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" floodColor="#0b5c83" floodOpacity="0.22" stdDeviation="5" />
        </filter>
      </defs>
      {arcs.map(([start, end]) => (
        <path
          key={`${start}-${end}`}
          d={describeArc(start, end)}
          fill="none"
          filter="url(#softRingShadow)"
          markerEnd="url(#alignerArrowHead)"
          stroke="url(#alignerArrowGradient)"
          strokeLinecap="round"
          strokeWidth="28"
        />
      ))}
      <circle cx="250" cy="250" r="112" fill="#d8effa" stroke="#0f6697" strokeWidth="8" />
      <circle cx="250" cy="250" r="101" fill="none" stroke="#ffffff" strokeOpacity="0.9" strokeWidth="4" />
    </svg>
  );
};

const TeethSketch = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 180 95" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M13 48c16-27 35-36 57-23 12 7 25 7 39 0 22-12 42-4 58 23-4 28-20 42-45 42H57C32 90 17 76 13 48Z"
      fill="#fff7f0"
      stroke="#8f3444"
      strokeWidth="5"
    />
    <path d="M27 49c37 10 84 10 126 0" stroke="#d9546d" strokeLinecap="round" strokeWidth="5" />
    {Array.from({ length: 8 }).map((_, index) => {
      const x = 42 + index * 14;
      return (
        <path
          key={x}
          d={`M${x} 42c-8 11-7 31 0 41 8-10 8-30 0-41Z`}
          fill="#ffffff"
          stroke="#e2cfc8"
          strokeWidth="2"
        />
      );
    })}
  </svg>
);

const AlignerTraySketch = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 140 90" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M15 51c14-23 31-33 52-30 24-2 43 7 58 30-9 16-27 25-55 25S24 67 15 51Z"
      fill="#dff5ff"
      stroke="#1b83b1"
      strokeWidth="5"
    />
    <path d="M31 51c21 8 55 8 78 0" stroke="#92d9f2" strokeLinecap="round" strokeWidth="8" />
    <path d="M37 48c21 6 45 6 66 0" stroke="#ffffff" strokeLinecap="round" strokeWidth="5" />
  </svg>
);

const LogoMark = ({ align = "left" }: { align?: "left" | "right" }) => (
  <div className={`flex items-center gap-2 ${align === "right" ? "justify-end" : "justify-start"}`}>
    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-sky-100/70 bg-sky-950/20">
      <Tooth className="h-7 w-7 fill-white/25 text-white" strokeWidth={2.4} />
    </div>
    <div className="hidden text-[0.55rem] font-black uppercase leading-tight tracking-[0.12em] text-white/90 sm:block">
      <span className="block">Clear Aligners</span>
      <span className="block">Info</span>
    </div>
  </div>
);

const CalloutCard = ({ callout }: { callout: Callout }) => {
  const Icon = callout.Icon;

  return (
    <article className="group flex items-center gap-3 rounded-2xl border border-sky-100/80 bg-white/85 p-3 text-right shadow-[0_10px_24px_rgba(14,100,145,0.12)] backdrop-blur transition hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(14,100,145,0.18)]">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-100 to-cyan-50 text-sky-700 ring-1 ring-sky-200/80">
        <Icon className="h-8 w-8" strokeWidth={2.25} />
      </div>
      <div>
        <h2 className="text-xl font-black leading-tight text-slate-950">{callout.title}</h2>
        <p className="mt-1 text-[0.82rem] font-semibold leading-snug text-slate-700">{callout.body}</p>
      </div>
    </article>
  );
};

const InfoPanel = ({ card }: { card: InfoCard }) => {
  const Icon = card.Icon;

  return (
    <article className="min-h-[150px] rounded-2xl border border-sky-100 bg-gradient-to-b from-sky-50 to-white p-4 text-right shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_10px_22px_rgba(11,96,141,0.1)]">
      <div className="mb-2 flex items-center justify-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-sky-700 shadow ring-1 ring-sky-100">
          <Icon className="h-7 w-7" />
        </span>
      </div>
      <h3 className="text-center text-lg font-black leading-none text-slate-950">{card.title}</h3>
      <ul className="mt-3 space-y-1.5 text-[0.72rem] font-bold leading-tight text-slate-700">
        {card.items.map((item) => (
          <li key={item} className="flex gap-1.5">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
};

const ClearAlignersInfoPage = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const nextPreview = URL.createObjectURL(file);
    setPreviewUrl((currentPreview) => {
      if (currentPreview) {
        URL.revokeObjectURL(currentPreview);
      }
      return nextPreview;
    });
  };

  return (
    <main
      dir="rtl"
      className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_50%_5%,#f7fdff_0%,#dff5ff_38%,#c8ebfa_100%)] px-3 py-5 text-slate-900 sm:px-6 lg:px-10"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="relative mx-auto rounded-[2.25rem] border-[5px] border-[#0a4e77] bg-gradient-to-b from-[#115b86] via-[#074569] to-[#06395a] p-3 shadow-[0_24px_55px_rgba(5,70,105,0.28)] ring-4 ring-sky-200/80">
          <div className="absolute left-1/2 top-1.5 h-2 w-2 -translate-x-1/2 rounded-full bg-sky-200/40 ring-1 ring-white/30" />

          <section className="overflow-hidden rounded-[1.45rem] bg-white shadow-[inset_0_0_0_3px_rgba(255,255,255,0.38)]">
            <header className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-2 bg-gradient-to-l from-[#0d5e8f] via-[#2399ca] to-[#0d5e8f] px-5 py-4 text-white">
              <LogoMark align="right" />
              <div className="text-center">
                <p className="text-[0.65rem] font-black uppercase tracking-[0.35em] text-cyan-100/90">
                  Clear aligners patient guide
                </p>
                <h1 className="mt-1 text-2xl font-black leading-tight tracking-tight drop-shadow md:text-4xl">
                  דף מידע ראשוני : יישור שיניים בקשתיות שקופות
                </h1>
              </div>
              <LogoMark />
            </header>

            <div className="relative bg-[linear-gradient(180deg,#ffffff_0%,#f3fbff_65%,#eaf7fd_100%)] px-5 pb-5 pt-6 lg:px-7">
              <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(#b9e4f4_1px,transparent_1px)] [background-size:22px_22px]" />

              <section className="relative z-10 grid items-center gap-4 lg:grid-cols-[1.03fr_minmax(390px,0.92fr)_1.03fr]">
                <div className="space-y-5">
                  {calloutsRight.map((callout) => (
                    <CalloutCard key={callout.title} callout={callout} />
                  ))}
                </div>

                <div className="relative mx-auto aspect-square w-full max-w-[440px]">
                  <ProcessRing />

                  {processSteps.map(({ label, Icon, top, left }) => (
                    <div
                      key={label}
                      className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 text-center"
                      style={{ top, left }}
                    >
                      <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-white to-sky-100 text-sky-700 shadow-[0_8px_18px_rgba(16,102,151,0.24)]">
                        <Icon className="h-7 w-7" strokeWidth={2.4} />
                      </span>
                      <span className="rounded-full bg-white/90 px-2 py-0.5 text-[0.64rem] font-black text-sky-900 shadow">
                        {label}
                      </span>
                    </div>
                  ))}

                  <div className="absolute left-1/2 top-1/2 z-20 flex h-[46%] w-[46%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border-[6px] border-[#0d6799] bg-gradient-to-b from-sky-100 to-white p-4 text-center shadow-[inset_0_8px_18px_rgba(255,255,255,0.9),0_10px_28px_rgba(7,86,129,0.28)]">
                    <p className="mb-2 max-w-[12rem] text-[0.68rem] font-black leading-tight text-slate-800">
                      העלה כאן תמונה של השיניים שלך למתן מידע מקצועי ראשוני
                    </p>
                    <div className="relative mb-2 flex h-24 w-36 items-center justify-center overflow-hidden rounded-xl border-4 border-white bg-slate-100 shadow-inner">
                      {previewUrl ? (
                        <img src={previewUrl} alt="תצוגה מקדימה של השיניים שהועלו" className="h-full w-full object-cover" />
                      ) : (
                        <TeethSketch className="h-20 w-32" />
                      )}
                    </div>
                    <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-[#0e83bd] px-3.5 py-2 text-[0.68rem] font-black text-white shadow transition hover:bg-[#096d9e]">
                      <Upload className="h-3.5 w-3.5" />
                      בחירת קובץ
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                    </label>
                  </div>
                </div>

                <div className="space-y-5">
                  {calloutsLeft.map((callout) => (
                    <CalloutCard key={callout.title} callout={callout} />
                  ))}
                </div>
              </section>

              <section className="relative z-10 mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {infoCards.map((card) => (
                  <InfoPanel key={card.title} card={card} />
                ))}
              </section>
            </div>
          </section>
        </div>

        <div className="relative mx-auto h-20 max-w-[420px]">
          <div className="absolute left-1/2 top-0 h-16 w-40 -translate-x-1/2 bg-gradient-to-b from-[#9ed9ee] to-[#e8f8ff] [clip-path:polygon(18%_0,82%_0,92%_100%,8%_100%)]" />
          <div className="absolute bottom-1 left-1/2 h-3 w-72 -translate-x-1/2 rounded-t-full border-2 border-[#357ca0] bg-[#d8f2fb] shadow-[0_8px_18px_rgba(44,126,160,0.18)]" />
        </div>

        <div className="mt-1 flex justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-white/80 px-5 py-2 text-sm font-black text-sky-900 shadow ring-1 ring-sky-200 transition hover:bg-white"
          >
            <ShieldCheck className="h-4 w-4" />
            חזרה לדף הבית
          </Link>
        </div>

        <AlignerTraySketch className="pointer-events-none fixed bottom-8 right-10 hidden h-20 w-32 opacity-30 blur-[0.2px] lg:block" />
      </div>
    </main>
  );
};

export default ClearAlignersInfoPage;
