import { Link } from "react-router-dom";
import { type ReactNode } from "react";
import MallHeader from "@/components/mall/MallHeader";
import MallFooter from "@/components/mall/MallFooter";
import PageTracker from "@/components/PageTracker";

type DesignedIconName =
  | "storefront"
  | "makerIdea"
  | "handshake"
  | "gears"
  | "thumbsUp"
  | "coins"
  | "magnifier"
  | "community"
  | "factory"
  | "family"
  | "shopBag";

type InfoSection = {
  title: string;
  icon: DesignedIconName;
  accentIcons?: DesignedIconName[];
  body?: string[];
  boldLine?: string;
  bullets?: string[];
  art?: "sun" | "ship";
};

const orange = "#f49634";

const infoSections: InfoSection[] = [
  {
    title: "על האתר",
    icon: "storefront",
    accentIcons: ["makerIdea", "handshake"],
    body: [
      "בית לעיצוב ויצירה ישראלי,",
      "הנגשה של יזמים יבואנים ואומנים פרטיים,",
      "חנויות בוטיק של בעלי מלאכה ועשייה.",
    ],
  },
  {
    title: "החזון והערכים",
    icon: "gears",
    accentIcons: ["thumbsUp"],
    body: ["מתן ערך לפועלו של האחר", "וחיבוק היזדמנויות."],
    art: "sun",
  },
  {
    title: "יתרונות ותרומה לקהילה",
    icon: "coins",
    accentIcons: ["magnifier", "community"],
    bullets: ["חיזוק הכלכלה המקומית", "שקיפות וחיבור ישיר", "קידום יזמות ישראלית"],
    art: "ship",
  },
];

const cycleItems = [
  { label: "היוצרים\nוהיוזמים", icon: "factory", className: "left-1/2 top-[9%] -translate-x-1/2" },
  { label: "לקוחות\nמרוצים", icon: "family", className: "right-[3%] top-[50%] -translate-y-1/2" },
  { label: "תמיכה\nבכלכלה", icon: "coins", className: "left-1/2 bottom-[3%] -translate-x-1/2" },
  { label: "המלצות\nעסקיות", icon: "shopBag", className: "left-[3%] top-[50%] -translate-y-1/2" },
] satisfies { label: string; icon: DesignedIconName; className: string }[];

const iconPalette = {
  ink: "#2f2923",
  orange: "#f49634",
  orangeDark: "#cf7028",
  cream: "#fff1df",
  green: "#8fb65d",
  blue: "#4aa3c7",
  red: "#e9573c",
  yellow: "#ffd45d",
  tan: "#d9a36d",
  white: "#fffdf9",
};

const IconSvg = ({
  children,
  className = "",
  viewBox = "0 0 96 96",
}: {
  children: ReactNode;
  className?: string;
  viewBox?: string;
}) => (
  <svg
    className={className}
    viewBox={viewBox}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const DesignedIcon = ({ name, className = "h-12 w-12" }: { name: DesignedIconName; className?: string }) => {
  const p = iconPalette;

  switch (name) {
    case "storefront":
      return (
        <IconSvg className={className}>
          <path d="M20 42h56v34H20V42Z" fill={p.cream} stroke={p.ink} strokeWidth="3.4" />
          <path d="M26 51h17v25H26V51Z" fill={p.blue} stroke={p.ink} strokeWidth="3" />
          <path d="M51 52h18v14H51V52Z" fill={p.white} stroke={p.ink} strokeWidth="3" />
          <path d="M18 26h60l-5 18H23l-5-18Z" fill={p.orange} stroke={p.ink} strokeWidth="3.4" />
          <path d="M29 26 27 44M42 26l-1 18M55 26l1 18M68 26l2 18" stroke={p.ink} strokeWidth="3" />
          <path d="M23 44c4 7 12 7 16 0 4 7 12 7 16 0 4 7 12 7 18 0" fill={p.white} />
          <path d="M23 44c4 7 12 7 16 0 4 7 12 7 16 0 4 7 12 7 18 0" stroke={p.ink} strokeWidth="3" />
          <path d="M29 18h38v8H29v-8Z" fill={p.cream} stroke={p.ink} strokeWidth="3" />
        </IconSvg>
      );
    case "makerIdea":
      return (
        <IconSvg className={className}>
          <circle cx="38" cy="34" r="11" fill={p.tan} stroke={p.ink} strokeWidth="3" />
          <path d="M25 72c2-14 24-14 27 0H25Z" fill={p.green} stroke={p.ink} strokeWidth="3" />
          <path d="M31 48c5 5 10 5 15 0" stroke={p.ink} strokeWidth="3" strokeLinecap="round" />
          <path d="M61 18c-11 0-17 13-9 22 3 3 4 5 4 9h11c0-4 1-6 4-9 8-9 2-22-10-22Z" fill={p.yellow} stroke={p.ink} strokeWidth="3" />
          <path d="M56 55h11M57 62h9" stroke={p.ink} strokeWidth="3" strokeLinecap="round" />
          <path d="M61 8v6M76 16l-5 5M46 16l5 5M79 33h-6" stroke={p.orange} strokeWidth="4" strokeLinecap="round" />
        </IconSvg>
      );
    case "handshake":
      return (
        <IconSvg className={className}>
          <path d="M15 48 32 34l14 15-18 16L15 48Z" fill={p.blue} stroke={p.ink} strokeWidth="3" />
          <path d="M81 47 64 34 48 50l19 16 14-19Z" fill={p.orange} stroke={p.ink} strokeWidth="3" />
          <path d="M32 36h13l8 8c3 3 8 3 11 0l1-1" stroke={p.ink} strokeWidth="3.4" strokeLinecap="round" />
          <path d="M33 57 49 70c4 3 9 3 12-1l8-9" fill={p.cream} />
          <path d="M33 57 49 70c4 3 9 3 12-1l8-9" stroke={p.ink} strokeWidth="3.4" strokeLinecap="round" />
          <path d="m42 62 10-10M50 68l11-11" stroke={p.ink} strokeWidth="3" strokeLinecap="round" />
        </IconSvg>
      );
    case "gears":
      return (
        <IconSvg className={className}>
          <circle cx="37" cy="39" r="13" fill={p.orange} stroke={p.ink} strokeWidth="3" />
          <circle cx="37" cy="39" r="5" fill={p.cream} stroke={p.ink} strokeWidth="3" />
          <path d="M37 16v8M37 54v8M14 39h8M52 39h8M21 23l6 6M48 50l6 6M53 23l-6 6M26 50l-6 6" stroke={p.ink} strokeWidth="4" strokeLinecap="round" />
          <circle cx="64" cy="61" r="10" fill={p.blue} stroke={p.ink} strokeWidth="3" />
          <circle cx="64" cy="61" r="3.5" fill={p.white} stroke={p.ink} strokeWidth="2.5" />
          <path d="M64 45v6M64 71v6M48 61h6M74 61h6M53 50l4 4M71 68l4 4M75 50l-4 4M57 68l-4 4" stroke={p.ink} strokeWidth="3" strokeLinecap="round" />
        </IconSvg>
      );
    case "thumbsUp":
      return (
        <IconSvg className={className}>
          <path d="M28 43h-9v31h9V43Z" fill={p.blue} stroke={p.ink} strokeWidth="3" />
          <path d="M31 72h31c7 0 9-9 4-13 5-4 3-12-3-13 3-6-1-12-7-12h-8c3-11 0-18-6-18-4 0-5 5-7 10-2 6-5 11-10 16v30Z" fill={p.cream} stroke={p.ink} strokeWidth="3" />
          <path d="M55 46h10M55 59h11" stroke={p.ink} strokeWidth="3" strokeLinecap="round" />
          <path d="m20 73 10-5" stroke={p.ink} strokeWidth="3" />
        </IconSvg>
      );
    case "coins":
      return (
        <IconSvg className={className}>
          <ellipse cx="43" cy="32" rx="20" ry="9" fill={p.yellow} stroke={p.ink} strokeWidth="3" />
          <path d="M23 32v24c0 5 9 9 20 9s20-4 20-9V32" fill={p.yellow} />
          <path d="M23 32v24c0 5 9 9 20 9s20-4 20-9V32" stroke={p.ink} strokeWidth="3" />
          <path d="M23 44c0 5 9 9 20 9s20-4 20-9M23 55c0 5 9 9 20 9s20-4 20-9" stroke={p.ink} strokeWidth="2.4" />
          <circle cx="68" cy="26" r="11" fill={p.orange} stroke={p.ink} strokeWidth="3" />
          <path d="M68 19v14M64 23h6c4 0 4 5 0 5h-5" stroke={p.ink} strokeWidth="2.7" strokeLinecap="round" />
        </IconSvg>
      );
    case "magnifier":
      return (
        <IconSvg className={className}>
          <circle cx="42" cy="40" r="22" fill="#d9f0f4" stroke={p.ink} strokeWidth="3.5" />
          <path d="m58 56 21 21" stroke={p.ink} strokeWidth="8" strokeLinecap="round" />
          <path d="m58 56 21 21" stroke={p.orange} strokeWidth="4" strokeLinecap="round" />
          <path d="M31 42c4 7 10 10 19 6" stroke={p.blue} strokeWidth="3" strokeLinecap="round" />
          <circle cx="35" cy="34" r="3" fill={p.ink} />
          <circle cx="49" cy="34" r="3" fill={p.ink} />
        </IconSvg>
      );
    case "community":
      return (
        <IconSvg className={className}>
          <circle cx="48" cy="24" r="10" fill={p.tan} stroke={p.ink} strokeWidth="3" />
          <path d="M30 73c2-17 34-17 37 0H30Z" fill={p.green} stroke={p.ink} strokeWidth="3" />
          <circle cx="25" cy="40" r="8" fill={p.tan} stroke={p.ink} strokeWidth="3" />
          <path d="M12 74c1-14 25-15 29-2" fill={p.orange} />
          <path d="M12 74c1-14 25-15 29-2" stroke={p.ink} strokeWidth="3" />
          <circle cx="71" cy="40" r="8" fill={p.tan} stroke={p.ink} strokeWidth="3" />
          <path d="M56 72c4-13 28-12 29 2H56Z" fill={p.blue} stroke={p.ink} strokeWidth="3" />
        </IconSvg>
      );
    case "factory":
      return (
        <IconSvg className={className}>
          <path d="M17 40h14l12 10V40h13l13 10V30h10v46H17V40Z" fill={p.cream} stroke={p.ink} strokeWidth="3" />
          <path d="M68 18h11v12H68V18Z" fill={p.orange} stroke={p.ink} strokeWidth="3" />
          <path d="M25 57h10M43 57h10M61 57h10M25 67h46" stroke={p.blue} strokeWidth="4" strokeLinecap="round" />
          <path d="M22 28c7 0 7-8 14-8" stroke={p.ink} strokeWidth="3" strokeLinecap="round" />
        </IconSvg>
      );
    case "family":
      return (
        <IconSvg className={className}>
          <circle cx="35" cy="29" r="10" fill={p.tan} stroke={p.ink} strokeWidth="3" />
          <circle cx="62" cy="31" r="9" fill={p.tan} stroke={p.ink} strokeWidth="3" />
          <circle cx="49" cy="51" r="8" fill={p.tan} stroke={p.ink} strokeWidth="3" />
          <path d="M18 75c2-17 31-18 36-2" fill={p.green} />
          <path d="M18 75c2-17 31-18 36-2" stroke={p.ink} strokeWidth="3" />
          <path d="M48 74c4-14 27-14 31 0H48Z" fill={p.orange} stroke={p.ink} strokeWidth="3" />
          <path d="M36 78c3-11 22-11 25 0H36Z" fill={p.blue} stroke={p.ink} strokeWidth="3" />
        </IconSvg>
      );
    case "shopBag":
      return (
        <IconSvg className={className}>
          <path d="M24 34h48l-5 43H29L24 34Z" fill={p.orange} stroke={p.ink} strokeWidth="3.4" />
          <path d="M37 34c0-17 22-17 22 0" stroke={p.ink} strokeWidth="4" strokeLinecap="round" />
          <path d="M36 50h24M36 62h17" stroke={p.white} strokeWidth="4" strokeLinecap="round" />
          <path d="M20 44h14v26H20V44Z" fill={p.cream} stroke={p.ink} strokeWidth="3" />
          <path d="M17 39c3 5 14 5 18 0" stroke={p.red} strokeWidth="4" strokeLinecap="round" />
        </IconSvg>
      );
    default:
      return null;
  }
};

const DecorativeLeaf = ({ className = "", rotate = 0 }: { className?: string; rotate?: number }) => (
  <span
    className={`absolute block h-6 w-3 rounded-[100%_0] border border-[#6c7d35] bg-[#9eb766] ${className}`}
    style={{ transform: `rotate(${rotate}deg)` }}
    aria-hidden="true"
  />
);

const OrangeDot = ({ className = "" }: { className?: string }) => (
  <span className={`absolute h-2 w-2 rounded-full bg-[#f39a38] ${className}`} aria-hidden="true" />
);

const SunArt = () => (
  <div className="absolute -left-28 top-0 hidden h-28 w-36 md:block" aria-hidden="true">
    <div className="absolute left-12 top-9 h-16 w-16 rounded-full border-[3px] border-[#313131] bg-[#ffd85a]" />
    <div className="absolute left-4 top-16 h-16 w-28 rounded-t-full border-[3px] border-[#313131] bg-[#93bf70]" />
    <div className="absolute left-28 top-14 h-9 w-12 rounded-t-full border-[3px] border-[#313131] bg-[#f7d469]" />
    {Array.from({ length: 12 }).map((_, index) => (
      <span
        key={index}
        className="absolute left-[73px] top-[46px] h-[2px] w-4 origin-left rounded-full bg-[#313131]"
        style={{ transform: `rotate(${index * 30}deg) translateX(30px)` }}
      />
    ))}
  </div>
);

const ShipArt = () => (
  <div className="absolute -left-24 top-2 hidden h-28 w-36 md:block" aria-hidden="true">
    <div className="absolute bottom-6 left-8 h-14 w-24 rounded-b-[34px] border-[3px] border-[#333] bg-[#d5793f]" />
    <div className="absolute bottom-20 left-[68px] h-6 w-8 border-[3px] border-[#333] bg-[#f8efe2]" />
    <div className="absolute bottom-[78px] left-[58px] h-10 w-4 border-[3px] border-[#333] bg-[#e84b2e]" />
    <div className="absolute bottom-[78px] left-[86px] h-10 w-4 border-[3px] border-[#333] bg-[#e84b2e]" />
    <div className="absolute bottom-16 right-7 h-10 w-14 border-[3px] border-[#333] bg-white">
      <div className="absolute inset-y-0 left-1/2 w-[2px] bg-[#3776be]" />
      <div className="absolute inset-x-1 top-1/2 h-[2px] bg-[#3776be]" />
      <span className="absolute left-[19px] top-[10px] h-2 w-2 rounded-full border border-[#3776be]" />
    </div>
    <div className="absolute bottom-2 left-4 h-3 w-32 rounded-full bg-[#42a3ca]" />
  </div>
);

const SectionHeading = ({ title, icon }: { title: string; icon: DesignedIconName }) => (
  <div className="mb-2 flex items-center justify-start gap-3">
    <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/60 drop-shadow-sm">
      <DesignedIcon name={icon} className="h-11 w-11" />
    </span>
    <h2 className="rounded-full bg-[#fbecd8] px-4 py-0.5 text-[clamp(1.35rem,2.6vw,2rem)] font-black leading-tight text-[#3b2618] shadow-[inset_0_-8px_0_rgba(246,171,82,0.16)]">
      {title}
    </h2>
  </div>
);

const InfoBlock = ({ section }: { section: InfoSection }) => (
  <section className="relative text-right">
    {section.art === "sun" && <SunArt />}
    {section.art === "ship" && <ShipArt />}
    <SectionHeading title={section.title} icon={section.icon} />
    <div className="flex items-start justify-start gap-5">
      {section.accentIcons && (
        <div className="mt-1 hidden w-14 flex-col items-center gap-3 sm:flex" aria-hidden="true">
          {section.accentIcons.map((accentIcon) => (
            <DesignedIcon key={accentIcon} name={accentIcon} className="h-12 w-12 drop-shadow-sm" />
          ))}
        </div>
      )}

      <div className="max-w-[510px] text-[clamp(1.1rem,2vw,1.55rem)] font-bold leading-[1.27] text-[#2b241f]">
        {section.body?.map((line) => (
          <p key={line}>{line}</p>
        ))}
        {section.boldLine && <p className="font-black">{section.boldLine}</p>}
        {section.bullets && (
          <ul className="mt-1 space-y-1">
            {section.bullets.map((bullet) => (
              <li key={bullet} className="flex items-center justify-start gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#f49634]" aria-hidden="true" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  </section>
);

const CycleDiagram = () => (
  <section className="relative mx-auto aspect-square w-full max-w-[405px]" aria-label="מעגל התעשייה והרווח הכולל">
    <svg className="absolute inset-[10%] h-[80%] w-[80%]" viewBox="0 0 320 320" aria-hidden="true">
      <defs>
        <marker id="cycle-arrow" markerHeight="10" markerWidth="10" orient="auto" refX="8" refY="5">
          <path d="M0,0 L10,5 L0,10 Z" fill={orange} stroke="#6a3515" strokeWidth="1" />
        </marker>
      </defs>
      <path d="M102 52 A120 120 0 0 1 267 115" fill="none" stroke="#6a3515" strokeWidth="7" />
      <path d="M102 52 A120 120 0 0 1 267 115" fill="none" markerEnd="url(#cycle-arrow)" stroke={orange} strokeWidth="5" />
      <path d="M266 200 A120 120 0 0 1 196 269" fill="none" stroke="#6a3515" strokeWidth="7" />
      <path d="M266 200 A120 120 0 0 1 196 269" fill="none" markerEnd="url(#cycle-arrow)" stroke={orange} strokeWidth="5" />
      <path d="M118 267 A120 120 0 0 1 52 202" fill="none" stroke="#6a3515" strokeWidth="7" />
      <path d="M118 267 A120 120 0 0 1 52 202" fill="none" markerEnd="url(#cycle-arrow)" stroke={orange} strokeWidth="5" />
      <path d="M52 116 A120 120 0 0 1 118 53" fill="none" stroke="#6a3515" strokeWidth="7" />
      <path d="M52 116 A120 120 0 0 1 118 53" fill="none" markerEnd="url(#cycle-arrow)" stroke={orange} strokeWidth="5" />
    </svg>

    {cycleItems.map((item) => (
      <div key={item.label} className={`absolute flex w-28 flex-col items-center text-center ${item.className}`}>
        <DesignedIcon name={item.icon} className="mb-1 h-16 w-16 drop-shadow-sm" />
        <span className="whitespace-pre-line text-[1.35rem] font-extrabold leading-[1.05] text-[#2f2923]">{item.label}</span>
      </div>
    ))}
  </section>
);

const InfoPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#fffdfb] p-0 font-heebo text-[#3b2618]" dir="rtl">
      <MallHeader />
      <PageTracker />
      <main className="relative mx-auto min-h-screen w-full max-w-[1280px] overflow-hidden bg-white px-[clamp(1.5rem,5vw,5rem)] py-[clamp(1.2rem,3vw,2rem)] shadow-[0_0_35px_rgba(91,55,19,0.08)]">
        <div className="absolute -left-10 top-0 h-[64px] w-[230px] rounded-br-[90px] bg-gradient-to-r from-[#f8b65c] to-[#fee5bf]" aria-hidden="true" />
        <div className="absolute -right-8 top-[-66px] h-32 w-32 rounded-full border-[26px] border-[#fbecd8]" aria-hidden="true" />
        <div className="absolute -left-[70px] bottom-[-42px] h-36 w-[430px] rounded-t-[100%] bg-[#f28d32]" aria-hidden="true" />
        <div className="absolute left-[43%] bottom-[-60px] h-36 w-36 rounded-full border-[18px] border-[#fbecd8]" aria-hidden="true" />
        <div className="absolute -right-[88px] top-[34%] h-40 w-40 rounded-full bg-[#fde1ba]" aria-hidden="true" />

        <OrangeDot className="right-[14%] top-[9%]" />
        <OrangeDot className="right-[60%] top-[10%]" />
        <OrangeDot className="left-[28%] top-[18%]" />
        <OrangeDot className="left-[24%] top-[21%]" />
        <OrangeDot className="left-[31%] top-[68%]" />
        <OrangeDot className="left-[28%] top-[71%]" />
        <OrangeDot className="right-[53%] top-[37%]" />
        <DecorativeLeaf className="right-[47%] top-[18%]" rotate={42} />
        <DecorativeLeaf className="right-[37%] top-[36%]" rotate={30} />
        <DecorativeLeaf className="right-[8%] bottom-[18%]" rotate={132} />
        <DecorativeLeaf className="right-[12%] bottom-[17%]" rotate={45} />

        <header className="relative z-10 flex justify-center">
          <h1 className="text-center font-heebo text-[clamp(2.25rem,5vw,4.45rem)] font-black leading-tight tracking-[-0.04em] text-[#3b2618]">
            שופ דיזיין <span className="text-[0.74em]">(Shop Design)</span>
          </h1>
          <span className="absolute right-[68%] top-4 h-4 w-4 rounded-full bg-[#f49634]" aria-hidden="true" />
          <span className="absolute right-[70%] top-7 h-2 w-7 rotate-[115deg] rounded-full bg-[#f49634]" aria-hidden="true" />
          <span className="absolute right-[67%] top-10 h-2 w-5 rotate-[-35deg] rounded-full bg-[#f49634]" aria-hidden="true" />
        </header>

        <div className="relative z-10 mt-8 grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="order-2 flex flex-col items-center lg:order-2">
            <div className="relative mb-3 inline-flex items-center">
              <DecorativeLeaf className="-right-10 top-1" rotate={42} />
              <h2 className="rounded-full bg-[#fbecd8] px-5 py-1 text-center text-[clamp(1.5rem,3vw,2.3rem)] font-black leading-none text-[#3b2618] shadow-[inset_0_-8px_0_rgba(246,171,82,0.16)]">
                מעגל התעשייה והרווח הכולל
              </h2>
            </div>
            <CycleDiagram />
          </div>

          <div className="order-1 space-y-8 lg:order-1">
            {infoSections.map((section) => (
              <InfoBlock key={section.title} section={section} />
            ))}
          </div>
        </div>

        <div className="relative z-10 mt-10 flex justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-[#f49634] px-8 py-3 text-lg font-black text-white shadow-[0_6px_18px_rgba(244,150,52,0.35)] transition-transform hover:scale-105 hover:bg-[#e0852b]"
          >
            <span aria-hidden="true">→</span>
            חזרה לאתר
          </Link>
        </div>

        {/* צור קשר — בעיצוב קו Sense Pro */}
      </main>
      <MallFooter />
    </div>
  );
};

export default InfoPage;
