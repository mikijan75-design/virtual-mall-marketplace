type InfoSection = {
  title: string;
  icon: string;
  accentIcons?: string[];
  body?: string[];
  boldLine?: string;
  bullets?: string[];
  art?: "sun" | "ship";
};

const orange = "#f49634";

const infoSections: InfoSection[] = [
  {
    title: "על האתר",
    icon: "🏪",
    accentIcons: ["👨‍💼💡", "🤝"],
    body: [
      "בית לעיצוב ויצירה ישראלי,",
      "הנגשה של יזמים יבואנים ואומנים פרטיים,",
      "חנויות בוטיק של בעלי מלאכה ועשייה.",
    ],
  },
  {
    title: "החזון והערכים",
    icon: "⚙️",
    accentIcons: ["👍"],
    body: ["מתן ערך לפועלו של האחר", "וחיבוק היזדמנויות."],
    art: "sun",
  },
  {
    title: "יתרונות ותרומה לקהילה",
    icon: "💰",
    accentIcons: ["🔎", "👥"],
    bullets: ["חיזוק הכלכלה המקומית", "שקיפות וחיבור ישיר", "קידום יזמות ישראלית"],
    art: "ship",
  },
];

const cycleItems = [
  { label: "היוצרים\nוהיוזמים", icon: "🏭", className: "left-1/2 top-[9%] -translate-x-1/2" },
  { label: "לקוחות\nמרוצים", icon: "👨‍👩‍👧", className: "right-[3%] top-[50%] -translate-y-1/2" },
  { label: "תמיכה\nבכלכלה", icon: "💰", className: "left-1/2 bottom-[3%] -translate-x-1/2" },
  { label: "המלצות\nעסקיות", icon: "🛍️", className: "left-[3%] top-[50%] -translate-y-1/2" },
];

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

const SectionHeading = ({ title, icon }: { title: string; icon: string }) => (
  <div className="mb-2 flex items-center justify-start gap-3">
    <span className="grid h-10 w-10 place-items-center text-3xl leading-none">{icon}</span>
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
        <div className="mt-1 hidden w-12 flex-col items-center gap-4 text-3xl leading-none sm:flex" aria-hidden="true">
          {section.accentIcons.map((accentIcon) => (
            <span key={accentIcon}>{accentIcon}</span>
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
        <span className="text-[3rem] leading-none drop-shadow-sm" aria-hidden="true">
          {item.icon}
        </span>
        <span className="whitespace-pre-line text-[1.35rem] font-extrabold leading-[1.05] text-[#2f2923]">{item.label}</span>
      </div>
    ))}
  </section>
);

const InfoPage = () => {
  return (
    <div className="min-h-screen bg-[#fffdfb] p-0 font-heebo text-[#3b2618]" dir="rtl">
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
      </main>
    </div>
  );
};

export default InfoPage;
