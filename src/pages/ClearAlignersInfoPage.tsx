import { useEffect, useMemo, useState, type ChangeEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import beforeImage1 from "@/assets/clear-aligners/before-1.jpg";
import afterImage1 from "@/assets/clear-aligners/after-1.jpg";
import beforeImage2 from "@/assets/clear-aligners/before-2.jpg";
import afterImage2 from "@/assets/clear-aligners/after-2.jpg";
import beforeImage3 from "@/assets/clear-aligners/before-3.jpg";
import afterImage3 from "@/assets/clear-aligners/after-3.jpg";
import beforeImage4 from "@/assets/clear-aligners/before-4.jpg";
import afterImage4 from "@/assets/clear-aligners/after-4.jpg";
import beforeImage5 from "@/assets/clear-aligners/before-5.jpg";
import afterImage5 from "@/assets/clear-aligners/after-5.jpg";
import centerTeethImg from "@/assets/clear-aligners/center-teeth.jpg";
import customer1 from "@/assets/clear-aligners/customer-1.png";
import customer2 from "@/assets/clear-aligners/customer-2.png";
import customer3 from "@/assets/clear-aligners/customer-3.png";
import customer4 from "@/assets/clear-aligners/customer-4.png";
import customer5 from "@/assets/clear-aligners/customer-5.png";

type IconName =
  | "camera"
  | "engineering"
  | "package"
  | "doctor"
  | "cycle"
  | "toothCheck"
  | "clock"
  | "methods"
  | "benefits"
  | "aesthetic"
  | "message"
  | "check"
  | "calendar"
  | "shield"
  | "upload";

type Callout = {
  title: string;
  body: string;
  icon: IconName;
};

type InfoCard = {
  title: string;
  icon: IconName;
  items: string[];
};

const calloutsRight: Callout[] = [
  {
    title: "צילום ראשוני",
    body: "צילום עצמי של השיניים לסינון מקדים וקבלת הצעה ראשונית.",
    icon: "camera",
  },
  {
    title: "הנדסת התהליך",
    body: "תכנון דיגיטלי מותאם אישית של תנועת השיניים והיעד הרצוי.",
    icon: "engineering",
  },
  {
    title: "הזמנת הקשתיות",
    body: "ייצור סדרת קשתיות שקופות לפי התוכנית הדיגיטלית.",
    icon: "package",
  },
];

const calloutsLeft: Callout[] = [
  {
    title: "ליווי לכל אורך התהליך",
    body: "מעקב והכוונה מקצועית מרופא בכל שלב חשוב.",
    icon: "doctor",
  },
  {
    title: "תהליך עצמאי",
    body: "החלפת קשתיות עצמאית בבית לפי הנחיות התוכנית.",
    icon: "cycle",
  },
  {
    title: "התאמה של קוביות",
    body: "בדיקת קוביות סמוכות, צבע השן ומבנה האזור האסתטי.",
    icon: "toothCheck",
  },
];

const infoCards: InfoCard[] = [
  {
    title: "תזרים זמנים",
    icon: "clock",
    items: [
      "צילום ותכנון ראשוני",
      "ייצור קשתיות לאחר אישור",
      "החלפה עצמאית כל 10-14 יום",
      "ביקורת ומעקב לאורך התהליך",
    ],
  },
  {
    title: "שיטות",
    icon: "methods",
    items: [
      "קשתיות שקופות נשלפות",
      "קוביות לבנות במידת הצורך",
      "שילוב פתרונות לפי מצב השיניים",
    ],
  },
  {
    title: "יתרונות",
    icon: "benefits",
    items: [
      "נראות אסתטית ועדינה",
      "עצמאות גבוהה בהחלפות",
      "תכנון מראש והבנת היעד",
      "מתאים לשגרה, נסיעות וחופשות",
    ],
  },
  {
    title: "אסתטיקה",
    icon: "aesthetic",
    items: [
      "קשתיות כמעט בלתי מורגשות",
      "קוביות בצבע השן",
      "חיוך טבעי גם בזמן טיפול",
    ],
  },
  {
    title: "זמינות",
    icon: "message",
    items: [
      "זמינות דיגיטלית לשאלות",
      "תנאי תשלום נוחים",
      "מענה אנושי לאורך הדרך",
    ],
  },
];

const processSteps = [
  { label: "צילום", icon: "camera", top: "8%", left: "50%" },
  { label: "תכנון", icon: "engineering", top: "26%", left: "82%" },
  { label: "ייצור", icon: "package", top: "68%", left: "82%" },
  { label: "מעקב", icon: "check", top: "92%", left: "50%" },
  { label: "החלפות", icon: "calendar", top: "68%", left: "18%" },
  { label: "ליווי", icon: "doctor", top: "26%", left: "18%" },
] satisfies { label: string; icon: IconName; top: string; left: string }[];

const polarToCartesian = (cx: number, cy: number, radius: number, angleInDegrees: number) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(angleInRadians),
    y: cy + radius * Math.sin(angleInRadians),
  };
};

const describeArc = (startAngle: number, endAngle: number) => {
  const radius = 165;
  const start = polarToCartesian(250, 250, radius, startAngle);
  const end = polarToCartesian(250, 250, radius, endAngle);
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 0 1 ${end.x} ${end.y}`;
};

const iconPalette = {
  ink: "#154461",
  blue: "#1688bf",
  blueDark: "#0d5f90",
  blueLight: "#bcecff",
  cyan: "#54c7e8",
  cream: "#fff7ef",
  gum: "#f39aaa",
  gumDark: "#bd5263",
  mint: "#dff9f3",
  white: "#ffffff",
  gold: "#ffd166",
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
  <svg className={className} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {children}
  </svg>
);

const DesignedIcon = ({ name, className = "h-8 w-8" }: { name: IconName; className?: string }) => {
  const p = iconPalette;
  const commonStroke = {
    stroke: p.ink,
    strokeWidth: 4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "camera":
      return (
        <IconSvg className={className}>
          <path d="M22 31h13l5-8h16l5 8h13c5 0 8 3 8 8v29c0 5-3 8-8 8H22c-5 0-8-3-8-8V39c0-5 3-8 8-8Z" fill={p.blueLight} {...commonStroke} />
          <circle cx="48" cy="54" r="15" fill={p.white} {...commonStroke} />
          <circle cx="48" cy="54" r="7" fill={p.blue} />
          <path d="M67 41h6" {...commonStroke} />
          <path d="M25 22v-8M21 18h8" stroke={p.gold} strokeWidth="4" strokeLinecap="round" />
        </IconSvg>
      );
    case "engineering":
      return (
        <IconSvg className={className}>
          <path d="M18 21h60v42H18V21Z" fill={p.blueLight} {...commonStroke} />
          <path d="M29 75h38M40 63v12M56 63v12" {...commonStroke} />
          <path d="M29 47c8-13 22-17 39-12" stroke={p.blueDark} strokeWidth="5" strokeLinecap="round" />
          <path d="M31 35h10M31 43h6M61 47h8" stroke={p.white} strokeWidth="4" strokeLinecap="round" />
          <circle cx="49" cy="40" r="5" fill={p.gum} stroke={p.ink} strokeWidth="3" />
          <path d="M72 17l2-7M78 21l7-3" stroke={p.gold} strokeWidth="4" strokeLinecap="round" />
        </IconSvg>
      );
    case "package":
      return (
        <IconSvg className={className}>
          <path d="M18 38 48 22l30 16-30 17-30-17Z" fill={p.cream} {...commonStroke} />
          <path d="M18 38v33l30 15 30-15V38" fill={p.blueLight} {...commonStroke} />
          <path d="M48 55v31M31 29l30 17" {...commonStroke} />
          <path d="M57 63c-7-5-13-5-20 0 2 7 18 7 20 0Z" fill={p.white} stroke={p.blueDark} strokeWidth="3" />
          <path d="M59 61c5-3 10-3 15 1" stroke={p.blueDark} strokeWidth="3" strokeLinecap="round" />
        </IconSvg>
      );
    case "doctor":
      return (
        <IconSvg className={className}>
          <circle cx="48" cy="28" r="13" fill="#f2c6a4" {...commonStroke} />
          <path d="M29 80c2-22 36-22 38 0H29Z" fill={p.white} {...commonStroke} />
          <path d="M39 49 48 62l9-13" stroke={p.blueDark} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M33 60c-8 11-7 21 1 24M63 60c8 11 7 21-1 24" stroke={p.blue} strokeWidth="4" strokeLinecap="round" />
          <circle cx="34" cy="84" r="5" fill={p.gum} stroke={p.ink} strokeWidth="3" />
          <path d="M35 24c8 3 17 3 26-2" stroke={p.ink} strokeWidth="4" strokeLinecap="round" />
        </IconSvg>
      );
    case "cycle":
      return (
        <IconSvg className={className}>
          <path d="M25 35c10-15 31-18 45-6" stroke={p.blueDark} strokeWidth="7" strokeLinecap="round" />
          <path d="M70 29h-1l-2-13 13 7-10 6Z" fill={p.blueDark} />
          <path d="M71 61c-11 14-32 16-46 4" stroke={p.cyan} strokeWidth="7" strokeLinecap="round" />
          <path d="m25 65 2 13-13-7 11-6Z" fill={p.cyan} />
          <path d="M29 50c10-10 29-11 39 0-6 9-33 9-39 0Z" fill={p.mint} stroke={p.ink} strokeWidth="4" />
          <path d="M38 50c7 3 13 3 21 0" stroke={p.white} strokeWidth="4" strokeLinecap="round" />
        </IconSvg>
      );
    case "toothCheck":
      return (
        <IconSvg className={className}>
          <path d="M24 16c7-5 14-2 22 3 8-5 15-8 22-3 12 8 6 31 0 43-4 9-7 18-14 18-6 0-5-15-8-24-3 9-2 24-8 24-7 0-10-9-14-18-6-12-12-35 0-43Z" fill={p.white} {...commonStroke} />
          <path d="m55 58 7 7 16-18" stroke={p.blue} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M31 27c5-3 10-3 16 0" stroke={p.blueLight} strokeWidth="4" strokeLinecap="round" />
        </IconSvg>
      );
    case "clock":
      return (
        <IconSvg className={className}>
          <rect x="13" y="22" width="53" height="57" rx="8" fill={p.white} {...commonStroke} />
          <path d="M13 36h53M27 16v12M52 16v12" {...commonStroke} />
          <circle cx="64" cy="61" r="20" fill={p.blueLight} {...commonStroke} />
          <path d="M64 50v12l8 5" stroke={p.blueDark} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M25 49h9M25 61h9M42 49h4" stroke={p.cyan} strokeWidth="4" strokeLinecap="round" />
        </IconSvg>
      );
    case "methods":
      return (
        <IconSvg className={className}>
          <path d="M17 33c14-20 46-20 62 0-7 14-20 21-31 21S24 47 17 33Z" fill={p.mint} stroke={p.ink} strokeWidth="4" />
          <path d="M30 34c12 5 25 5 38 0" stroke={p.white} strokeWidth="5" strokeLinecap="round" />
          <path d="M23 68h50" stroke={p.ink} strokeWidth="4" strokeLinecap="round" />
          {[31, 42, 53, 64].map((x) => (
            <rect key={x} x={x - 4} y="61" width="8" height="8" rx="2" fill={p.white} stroke={p.blueDark} strokeWidth="3" />
          ))}
          <path d="M27 65h41" stroke={p.gum} strokeWidth="3" strokeLinecap="round" />
        </IconSvg>
      );
    case "benefits":
      return (
        <IconSvg className={className}>
          <path d="M39 41V27c0-6 8-7 10-2 1 3 0 10 0 16h14c7 0 9 5 7 10l-8 24H36V47l3-6Z" fill={p.cream} {...commonStroke} />
          <path d="M19 43h17v34H19V43Z" fill={p.blueLight} {...commonStroke} />
          <path d="M70 28c0 6-4 10-10 10 6 0 10 4 10 10 0-6 4-10 10-10-6 0-10-4-10-10Z" fill={p.gold} stroke={p.ink} strokeWidth="3" />
        </IconSvg>
      );
    case "aesthetic":
      return (
        <IconSvg className={className}>
          <path d="M23 21c7-5 15-2 25 4 10-6 18-9 25-4 11 8 5 29-2 42-4 8-7 15-14 15-6 0-5-12-9-22-4 10-3 22-9 22-7 0-10-7-14-15-7-13-13-34-2-42Z" fill={p.white} {...commonStroke} />
          <path d="M63 14c0 6-4 10-10 10 6 0 10 4 10 10 0-6 4-10 10-10-6 0-10-4-10-10Z" fill={p.gold} stroke={p.ink} strokeWidth="3" />
          <path d="M29 34c8-3 17-2 25 2" stroke={p.blueLight} strokeWidth="4" strokeLinecap="round" />
          <path d="M20 74h16M14 66h9" stroke={p.cyan} strokeWidth="4" strokeLinecap="round" />
        </IconSvg>
      );
    case "message":
      return (
        <IconSvg className={className}>
          <path d="M19 27h58c5 0 8 3 8 8v25c0 5-3 8-8 8H49L32 80v-12H19c-5 0-8-3-8-8V35c0-5 3-8 8-8Z" fill={p.blueLight} {...commonStroke} />
          <path d="M30 45h36M30 55h22" stroke={p.white} strokeWidth="5" strokeLinecap="round" />
          <circle cx="73" cy="23" r="11" fill={p.gum} stroke={p.ink} strokeWidth="3" />
          <path d="M68 23h10" stroke={p.white} strokeWidth="3" strokeLinecap="round" />
        </IconSvg>
      );
    case "check":
      return (
        <IconSvg className={className}>
          <rect x="24" y="14" width="48" height="67" rx="8" fill={p.white} {...commonStroke} />
          <path d="M36 14h24v11H36V14Z" fill={p.blueLight} {...commonStroke} />
          <path d="m35 52 9 9 19-23" stroke={p.blue} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M35 72h26" stroke={p.cyan} strokeWidth="4" strokeLinecap="round" />
        </IconSvg>
      );
    case "calendar":
      return (
        <IconSvg className={className}>
          <rect x="17" y="20" width="62" height="58" rx="8" fill={p.white} {...commonStroke} />
          <path d="M17 36h62M31 14v12M65 14v12" {...commonStroke} />
          <path d="M31 51h8M47 51h8M63 51h8M31 65h8M47 65h8" stroke={p.blue} strokeWidth="5" strokeLinecap="round" />
          <path d="m61 66 5 5 12-14" stroke={p.gumDark} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </IconSvg>
      );
    case "shield":
      return (
        <IconSvg className={className}>
          <path d="M48 11 76 23v20c0 20-11 34-28 42-17-8-28-22-28-42V23l28-12Z" fill={p.blueLight} {...commonStroke} />
          <path d="m34 49 10 10 20-24" stroke={p.blueDark} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M30 28 48 20l18 8" stroke={p.white} strokeWidth="4" strokeLinecap="round" />
        </IconSvg>
      );
    case "upload":
      return (
        <IconSvg className={className}>
          <path d="M29 68H23c-9 0-15-6-15-14 0-8 6-14 14-14 3-13 14-22 27-22 15 0 27 12 27 27 7 1 12 6 12 12 0 7-6 11-14 11h-7" fill={p.blueLight} {...commonStroke} />
          <path d="M48 72V40M36 52l12-12 12 12" stroke={p.blueDark} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M34 78h28" stroke={p.white} strokeWidth="5" strokeLinecap="round" />
        </IconSvg>
      );
  }
};

const ProcessRing = () => {
  const arcs = useMemo(
    () => [
      [12, 52],
      [72, 112],
      [132, 172],
      [192, 232],
      [252, 292],
      [312, 352],
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
        <marker
          id="alignerArrowHead"
          markerHeight="8"
          markerWidth="8"
          orient="auto"
          refX="4"
          refY="4"
          viewBox="0 0 8 8"
        >
          <path d="M0,0 L8,4 L0,8 L2,4 Z" fill="#0d6799" />
        </marker>
        <filter id="softRingShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" floodColor="#0b5c83" floodOpacity="0.18" stdDeviation="3" />
        </filter>
      </defs>
      <circle cx="250" cy="250" r="165" fill="none" stroke="#bfe3f3" strokeOpacity="0.55" strokeWidth="2" strokeDasharray="3 6" />
      {arcs.map(([start, end]) => (
        <path
          key={`${start}-${end}`}
          d={describeArc(start, end)}
          fill="none"
          filter="url(#softRingShadow)"
          markerEnd="url(#alignerArrowHead)"
          stroke="url(#alignerArrowGradient)"
          strokeLinecap="round"
          strokeWidth="6"
        />
      ))}
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

const ToothMark = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M23 13c6-4 12-2 17 2 5-4 11-6 17-2 11 7 7 28 1 40-4 8-6 14-12 14-5 0-4-12-6-18-2 6-1 18-6 18-6 0-8-6-12-14-6-12-10-33 1-40Z"
      fill="currentColor"
      opacity="0.96"
    />
    <path d="M27 22c4-3 8-3 12 0" stroke="#dff5ff" strokeLinecap="round" strokeWidth="4" opacity="0.9" />
  </svg>
);

const LogoMark = ({ align = "left" }: { align?: "left" | "right" }) => (
  <div className={`flex items-center gap-2 ${align === "right" ? "justify-end" : "justify-start"}`}>
    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-sky-100/70 bg-sky-950/20">
      <ToothMark className="h-7 w-7 text-white" />
    </div>
    <div className="hidden text-[0.55rem] font-black uppercase leading-tight tracking-[0.12em] text-white/90 sm:block">
      <span className="block">Clear Aligners</span>
      <span className="block">Info</span>
    </div>
  </div>
);

const CalloutCard = ({ callout }: { callout: Callout }) => {
  return (
    <article className="group flex items-center gap-3 rounded-2xl border border-sky-100/80 bg-white/85 p-3 text-right shadow-[0_10px_24px_rgba(14,100,145,0.12)] backdrop-blur transition hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(14,100,145,0.18)]">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-100 to-cyan-50 text-sky-700 ring-1 ring-sky-200/80">
        <DesignedIcon name={callout.icon} className="h-12 w-12" />
      </div>
      <div>
        <h2 className="text-xl font-black leading-tight text-slate-950">{callout.title}</h2>
        <p className="mt-1 text-[0.82rem] font-semibold leading-snug text-slate-700">{callout.body}</p>
      </div>
    </article>
  );
};

const InfoPanel = ({ card }: { card: InfoCard }) => {
  return (
    <article className="min-h-[150px] rounded-2xl border border-sky-100 bg-gradient-to-b from-sky-50 to-white p-4 text-right shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_10px_22px_rgba(11,96,141,0.1)]">
      <div className="mb-2 flex items-center justify-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-sky-700 shadow ring-1 ring-sky-100">
          <DesignedIcon name={card.icon} className="h-10 w-10" />
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
  const [pickerOpen, setPickerOpen] = useState(false);
  const galleryInputRef = useMemo(() => ({ current: null as HTMLInputElement | null }), []);
  const cameraInputRef = useMemo(() => ({ current: null as HTMLInputElement | null }), []);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [phoneError, setPhoneError] = useState<string | null>(null);

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
    setPickerOpen(false);
    setUploadedFile(file);
    setFormOpen(true);
    event.target.value = "";
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const phone = formPhone.trim();
    if (!/^[0-9+\-\s()]{7,20}$/.test(phone)) {
      setPhoneError("נא להזין מספר טלפון תקין");
      return;
    }
    setPhoneError(null);
    toast({
      title: "הפרטים נשלחו בהצלחה",
      description: `תודה${formName.trim() ? ` ${formName.trim()}` : ""}! ניצור איתך קשר בקרוב בטלפון ${phone}.`,
    });
    setFormOpen(false);
    setFormName("");
    setFormPhone("");
  };

  return (
    <>
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

                <div className="relative mx-auto aspect-square w-full max-w-[540px]">
                  <ProcessRing />

                  {processSteps.map(({ label, icon, top, left }) => (
                    <div
                      key={label}
                      className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 text-center"
                      style={{ top, left }}
                    >
                      <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-white to-sky-100 text-sky-700 shadow-[0_8px_18px_rgba(16,102,151,0.24)]">
                        <DesignedIcon name={icon} className="h-11 w-11" />
                      </span>
                      <span className="rounded-full bg-white/90 px-2 py-0.5 text-[0.64rem] font-black text-sky-900 shadow">
                        {label}
                      </span>
                    </div>
                  ))}

                  <div className="absolute left-1/2 top-1/2 z-20 flex h-[58%] w-[58%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border-[6px] border-[#0d6799] bg-gradient-to-b from-sky-100 to-white p-5 text-center shadow-[inset_0_8px_18px_rgba(255,255,255,0.9),0_10px_28px_rgba(7,86,129,0.28)]">
                    <p className="mb-2 max-w-[14rem] text-[0.78rem] font-black leading-tight text-slate-800">
                      העלה כאן תמונה של השיניים שלך למתן מידע מקצועי ראשוני
                    </p>
                    <div className="relative mb-2 flex h-24 w-36 items-center justify-center overflow-hidden rounded-xl border-4 border-white bg-slate-100 shadow-inner">
                      {previewUrl ? (
                        <img src={previewUrl} alt="תצוגה מקדימה של השיניים שהועלו" className="h-full w-full object-cover" />
                      ) : (
                        <img src={centerTeethImg} alt="דוגמת שיניים" className="h-full w-full object-cover" />
                      )}
                    </div>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setPickerOpen((o) => !o)}
                        className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-[#0e83bd] px-3.5 py-2 text-[0.68rem] font-black text-white shadow transition hover:bg-[#096d9e]"
                      >
                        <DesignedIcon name="upload" className="h-5 w-5" />
                        בחירת קובץ/צילום
                      </button>
                      {pickerOpen && (
                        <div className="absolute left-1/2 top-full z-30 mt-2 flex w-40 -translate-x-1/2 flex-col overflow-hidden rounded-xl border border-sky-200 bg-white shadow-xl">
                          <button
                            type="button"
                            onClick={() => galleryInputRef.current?.click()}
                            className="px-3 py-2 text-right text-xs font-bold text-sky-900 hover:bg-sky-50"
                          >
                            📁 גלריה
                          </button>
                          <button
                            type="button"
                            onClick={() => cameraInputRef.current?.click()}
                            className="border-t border-sky-100 px-3 py-2 text-right text-xs font-bold text-sky-900 hover:bg-sky-50"
                          >
                            📷 צילום (מצלמה)
                          </button>
                        </div>
                      )}
                      <input
                        ref={(el) => { galleryInputRef.current = el; }}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                      <input
                        ref={(el) => { cameraInputRef.current = el; }}
                        type="file"
                        accept="image/*"
                        capture="environment"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </div>
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

              <section className="relative z-10 mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <article
                    key={`empty-${index}`}
                    className="flex min-h-[260px] flex-col overflow-hidden rounded-2xl border border-dashed border-sky-200 bg-gradient-to-b from-sky-50/60 to-white text-right shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_10px_22px_rgba(11,96,141,0.06)]"
                  >
                    <div className="flex flex-1 flex-col p-3">
                      <h3 className="text-center text-lg font-black leading-none text-slate-950">לפני</h3>
                      <div className="mt-2 flex-1 overflow-hidden rounded-xl bg-white/40">
                        {index === 0 && (
                          <img
                            src={beforeImage1}
                            alt="לפני - מצב התחלתי של השיניים"
                            className="h-full w-full object-cover"
                          />
                        )}
                        {index === 1 && (
                          <img
                            src={beforeImage2}
                            alt="לפני - מצב התחלתי של השיניים"
                            className="h-full w-full object-cover"
                          />
                        )}
                        {index === 2 && (
                          <img
                            src={beforeImage3}
                            alt="לפני - מצב התחלתי של השיניים"
                            className="h-full w-full object-cover"
                          />
                        )}
                        {index === 3 && (
                          <img
                            src={afterImage4}
                            alt="לפני - מצב התחלתי של השיניים"
                            className="h-full w-full object-cover"
                          />
                        )}
                        {index === 4 && (
                          <img
                            src={afterImage5}
                            alt="לפני - מצב התחלתי של השיניים"
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                    </div>
                    <div className="h-px bg-sky-200" />
                    <div className="flex flex-1 flex-col p-3">
                      <h3 className="text-center text-lg font-black leading-none text-slate-950">אחרי</h3>
                      <div className="mt-2 flex-1 overflow-hidden rounded-xl bg-white/40">
                        {index === 0 && (
                          <img
                            src={afterImage1}
                            alt="אחרי - תוצאה לאחר טיפול בקשתיות שקופות"
                            className="h-full w-full object-cover"
                          />
                        )}
                        {index === 1 && (
                          <img
                            src={afterImage2}
                            alt="אחרי - תוצאה לאחר טיפול בקשתיות שקופות"
                            className="h-full w-full object-cover"
                          />
                        )}
                        {index === 2 && (
                          <img
                            src={afterImage3}
                            alt="אחרי - תוצאה לאחר טיפול בקשתיות שקופות"
                            className="h-full w-full object-cover"
                          />
                        )}
                        {index === 3 && (
                          <img
                            src={beforeImage4}
                            alt="אחרי - תוצאה לאחר טיפול בקשתיות שקופות"
                            className="h-full w-full object-cover"
                          />
                        )}
                        {index === 4 && (
                          <img
                            src={beforeImage5}
                            alt="אחרי - תוצאה לאחר טיפול בקשתיות שקופות"
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </section>

              <section className="relative z-10 mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {[customer1, customer2, customer3, customer4, customer5].map((src, index) => (
                  <article
                    key={`customer-row-${index}`}
                    className="flex flex-col overflow-hidden rounded-2xl border border-sky-200 bg-gradient-to-b from-sky-50/60 to-white text-right shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_10px_22px_rgba(11,96,141,0.06)]"
                  >
                    <div className="flex flex-1 flex-col p-3">
                      <div className="aspect-[3/4] w-full overflow-hidden rounded-xl bg-white/40">
                        <img
                          src={src}
                          alt={`לקוח/ה ${index + 1} לאחר טיפול בקשתיות שקופות`}
                          className="h-full w-full object-cover object-center"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </article>
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
            <DesignedIcon name="shield" className="h-5 w-5" />
            חזרה לדף הבית
          </Link>
        </div>

        <AlignerTraySketch className="pointer-events-none fixed bottom-8 right-10 hidden h-20 w-32 opacity-30 blur-[0.2px] lg:block" />
      </div>
    </main>
    {formOpen && (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        onClick={() => setFormOpen(false)}
      >
        <form
          dir="rtl"
          onClick={(e) => e.stopPropagation()}
          onSubmit={handleFormSubmit}
          className="w-full max-w-md overflow-hidden rounded-3xl border border-mall-gold/50 bg-gradient-to-b from-white to-sky-50 shadow-2xl"
        >
          <header className="bg-mall-sign px-5 py-4 text-center">
            <h2 className="font-frank text-2xl font-black text-mall-gold">פרטי יצירת קשר</h2>
            <p className="mt-1 text-xs font-heebo text-mall-gold/80">
              {uploadedFile?.name ? `קובץ: ${uploadedFile.name}` : "השאירו פרטים ונחזור אליכם"}
            </p>
          </header>
          <div className="space-y-4 px-5 py-5 text-right">
            {previewUrl && (
              <div className="mx-auto h-24 w-32 overflow-hidden rounded-xl border-2 border-sky-200 shadow">
                <img src={previewUrl} alt="תצוגה מקדימה" className="h-full w-full object-cover" />
              </div>
            )}
            <label className="block">
              <span className="mb-1 block font-heebo text-sm font-bold text-slate-800">שם</span>
              <input
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                maxLength={100}
                placeholder="השם שלך"
                className="w-full rounded-lg border border-sky-200 bg-white px-3 py-2 text-right font-heebo text-sm shadow-inner focus:border-mall-gold focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="mb-1 block font-heebo text-sm font-bold text-slate-800">
                מספר טלפון <span className="text-red-600">*</span>
              </span>
              <input
                type="tel"
                required
                value={formPhone}
                onChange={(e) => setFormPhone(e.target.value)}
                maxLength={20}
                placeholder="050-0000000"
                className="w-full rounded-lg border border-sky-200 bg-white px-3 py-2 text-right font-heebo text-sm shadow-inner focus:border-mall-gold focus:outline-none"
              />
              {phoneError && (
                <span className="mt-1 block text-xs font-bold text-red-600">{phoneError}</span>
              )}
            </label>
          </div>
          <footer className="flex gap-2 border-t border-sky-100 bg-sky-50/60 px-5 py-4">
            <button
              type="button"
              onClick={() => setFormOpen(false)}
              className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 font-heebo text-sm font-bold text-slate-700 hover:bg-slate-50"
            >
              ביטול
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-mall-sign px-4 py-2 font-heebo text-base font-black text-mall-gold shadow hover:bg-mall-gold hover:text-mall-sign transition-colors"
            >
              שלח
            </button>
          </footer>
        </form>
      </div>
    )}
    </>
  );
};

export default ClearAlignersInfoPage;
