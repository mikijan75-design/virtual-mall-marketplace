import type { CSSProperties, ReactNode } from "react";
import guyJanaPortrait from "@/assets/stores/guy-jana-portrait.png";

/** Sampled from guy-jana-banner.png */
export const GUY_JANA_BANNER_COLORS = {
  background: "#EDEEE6",
  backgroundDeep: "#CDCBC3",
  text: "#1F1E1B",
  ceramic: "#B4B0A4",
  ceramicShadow: "#6D7074",
  blueAccent: "#607487",
  highlight: "#F0F0F0",
} as const;

type Section = {
  id: string;
  title: string;
  body: string;
  icon: ReactNode;
};

const IconFrame = ({ children }: { children: ReactNode }) => (
  <div
    className="flex h-[52px] w-[52px] shrink-0 items-center justify-center border border-[#1F1E1B] bg-[#EDEEE6] sm:h-[60px] sm:w-[60px] md:h-[68px] md:w-[68px]"
    aria-hidden="true"
  >
    {children}
  </div>
);

const GlobeStudioIcon = () => (
  <svg viewBox="0 0 48 48" className="h-[70%] w-[70%]" fill="none" stroke="#1F1E1B" strokeWidth="1.4">
    <circle cx="24" cy="24" r="13" />
    <ellipse cx="24" cy="24" rx="5" ry="13" />
    <path d="M11 24h26M12 17h24M12 31h24" />
    <path d="M8 16a20 20 0 0 1 32 0" strokeLinecap="round" />
    <path d="M40 32a20 20 0 0 1-32 0" strokeLinecap="round" />
    <path d="M34 10a18 18 0 0 1 4 14" strokeLinecap="round" />
    <path d="M14 38a18 18 0 0 1-4-14" strokeLinecap="round" />
  </svg>
);

const PotteryTallIcon = () => (
  <svg viewBox="0 0 48 48" className="h-[70%] w-[70%]" fill="none" stroke="#1F1E1B" strokeWidth="1.4">
    <ellipse cx="24" cy="38" rx="16" ry="4" />
    <path d="M12 38c0-8 4-14 12-14s12 6 12 14" />
    <path d="M18 22c2-6 10-6 12 0 2 8-2 12-6 12s-8-4-6-12z" />
    <path d="M14 30c-3-2-5-6-4-10M34 30c3-2 5-6 4-10" strokeLinecap="round" />
    <path d="M10 28c4 2 8 2 12 0M38 28c-4 2-8 2-12 0" strokeLinecap="round" />
  </svg>
);

const ContactForumIcon = () => (
  <svg viewBox="0 0 48 48" className="h-[70%] w-[70%]" fill="none" stroke="#1F1E1B" strokeWidth="1.4">
    <rect x="8" y="12" width="22" height="16" rx="1" />
    <path d="M8 16l11 8 11-8" />
    <path d="M26 24v6a2 2 0 0 0 2 2h10l4 4V20a2 2 0 0 0-2-2H30" />
    <path d="M30 20h10v12l-4-3" />
  </svg>
);

const PotteryBowlIcon = () => (
  <svg viewBox="0 0 48 48" className="h-[70%] w-[70%]" fill="none" stroke="#1F1E1B" strokeWidth="1.4">
    <ellipse cx="24" cy="36" rx="17" ry="5" />
    <path d="M9 36c2-10 8-16 15-16s13 6 15 16" />
    <path d="M14 32c3-4 10-4 13 0M34 32c-3-4-10-4-13 0" strokeLinecap="round" />
    <path d="M12 28c4 3 8 3 12 1M36 28c-4 3-8 3-12 1" strokeLinecap="round" />
  </svg>
);

const SECTIONS: Section[] = [
  {
    id: "studio",
    title: "סטודיו וייצור גלובלי",
    body: "ייצור קרמיקה בעבודת יד, עיצוב ייחודי והזמנות מותאמות אישית — משלוחים לכל העולם.",
    icon: <GlobeStudioIcon />,
  },
  {
    id: "about",
    title: "אודות האמן",
    body: "גיא ג'אנה — אמן קרמיקה, קדר ומרצה. עבודותיו משלבות מינימליזם, טקסטורה טבעית וחומר גלם אותנטי.",
    icon: <PotteryTallIcon />,
  },
  {
    id: "forum",
    title: "פורום שאלות וקשר ישיר",
    body: "שאלות על מוצרים, הזמנות מיוחדות וייעוץ — צרו קשר ונשמח לעזור.",
    icon: <ContactForumIcon />,
  },
  {
    id: "workshops",
    title: "לימוד וסדנאות קדרות",
    body: "סדנאות קדרות לקבוצות וליחידים, מגוון רמות — מהניסיון הראשון ועד טכניקות מתקדמות.",
    icon: <PotteryBowlIcon />,
  },
];

const paperTextureStyle: CSSProperties = {
  backgroundColor: GUY_JANA_BANNER_COLORS.background,
  backgroundImage: [
    "radial-gradient(circle at 18% 22%, rgba(255,255,255,0.55) 0 1px, transparent 1.2px)",
    "radial-gradient(circle at 72% 64%, rgba(0,0,0,0.04) 0 1px, transparent 1.2px)",
    "linear-gradient(180deg, #F4F3EE 0%, #EDEEE6 42%, #E6E4DC 100%)",
  ].join(", "),
  backgroundSize: "9px 9px, 11px 11px, 100% 100%",
};

const CeramicPlateDecor = () => (
  <div
    className="pointer-events-none absolute left-0 top-0 h-[38%] w-[16%] min-w-[72px] max-w-[200px] opacity-90"
    aria-hidden="true"
  >
    <svg viewBox="0 0 120 140" className="h-full w-full" fill="none">
      <ellipse cx="70" cy="78" rx="58" ry="52" fill="#D8D2C6" stroke="#A39B8E" strokeWidth="1.2" />
      <ellipse cx="70" cy="78" rx="42" ry="38" fill="#E8E4DC" />
      {Array.from({ length: 16 }).map((_, i) => {
        const a = (i / 16) * Math.PI * 2;
        const x1 = 70 + Math.cos(a) * 44;
        const y1 = 78 + Math.sin(a) * 40;
        const x2 = 70 + Math.cos(a) * 54;
        const y2 = 78 + Math.sin(a) * 50;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#9A9286" strokeWidth="1.1" />;
      })}
    </svg>
  </div>
);

const CeramicBowlDecor = () => (
  <div
    className="pointer-events-none absolute bottom-0 right-0 h-[36%] w-[17%] min-w-[80px] max-w-[210px] opacity-90"
    aria-hidden="true"
  >
    <svg viewBox="0 0 130 120" className="h-full w-full" fill="none">
      <path
        d="M20 48 C35 8, 105 8, 120 48 C125 78, 95 108, 68 112 C38 108, 12 78, 20 48 Z"
        fill="#C9C3B8"
        stroke="#8E877C"
        strokeWidth="1.2"
      />
      <ellipse cx="70" cy="52" rx="38" ry="14" fill="#E2DDD4" />
      <path d="M32 56 Q70 72 108 56" stroke="#A8A095" strokeWidth="1" fill="none" />
    </svg>
  </div>
);

const GuyJanaBannerDesign = () => (
  <section
    className="relative w-full overflow-hidden font-heebo text-[#1F1E1B]"
    dir="rtl"
    aria-label="גיא ג'אנה — אמן קרמיקה, קדר ומרצה"
    style={paperTextureStyle}
  >
    <CeramicPlateDecor />
    <CeramicBowlDecor />

    <div className="relative z-[1] mx-auto max-w-[1200px] px-4 py-5 sm:px-8 sm:py-6 md:py-7">
      {/* Header */}
      <header className="mb-4 flex flex-col items-center text-center sm:mb-5">
        <div className="relative mb-3 h-[88px] w-[88px] overflow-hidden rounded-full border-[3px] border-[#1F1E1B]/80 bg-[#E4E2D9] shadow-[0_4px_14px_rgba(31,30,27,0.15)] sm:h-[104px] sm:w-[104px] md:h-[118px] md:w-[118px]">
          <img
            src={guyJanaPortrait}
            alt="גיא ג'אנה"
            className="h-full w-full object-cover object-[50%_18%] scale-[1.35]"
            loading="eager"
          />
        </div>
        <h1 className="font-frank text-[1.35rem] font-bold leading-tight tracking-wide sm:text-[1.65rem] md:text-[1.85rem]">
          <span dir="ltr" className="inline-block">
            GUY JANA //
          </span>{" "}
          גיא ג&apos;אנה
        </h1>
        <p className="mt-1 text-sm font-medium text-[#1F1E1B]/90 sm:text-base">
          אמן קרמיקה, קדר ומרצה
        </p>
      </header>

      {/* Sections */}
      <div className="grid gap-3 sm:gap-3.5 md:gap-4">
        {SECTIONS.map((section) => (
          <article
            key={section.id}
            className="flex items-start gap-3 sm:gap-4"
          >
            <IconFrame>{section.icon}</IconFrame>
            <div className="min-w-0 flex-1 pt-0.5 text-right">
              <h2 className="font-frank text-base font-bold leading-snug sm:text-lg md:text-xl">
                {section.title}
              </h2>
              <p className="mt-0.5 text-[0.78rem] leading-relaxed text-[#1F1E1B]/88 sm:text-sm md:text-[0.95rem]">
                {section.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default GuyJanaBannerDesign;
