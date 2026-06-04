import { type CSSProperties, type ReactNode } from "react";
import guyJanaPortrait from "@/assets/stores/guy-jana-portrait.png";
import guyJanaDecorTl from "@/assets/stores/guy-jana-decor-tl.png";
import guyJanaDecorBr from "@/assets/stores/guy-jana-decor-br.png";
import guyJanaDecorBl from "@/assets/stores/guy-jana-decor-bl.png";
import { GUY_JANA_BANNER_CONTENT } from "@/data/guyJanaBannerContent";

const BANNER_STYLE: CSSProperties = {
  backgroundColor: "#F5F5F0",
  backgroundImage: [
    "radial-gradient(circle at 20% 18%, rgba(255,255,255,0.65) 0 1px, transparent 1.2px)",
    "radial-gradient(circle at 78% 72%, rgba(0,0,0,0.035) 0 1px, transparent 1.2px)",
    "linear-gradient(180deg, #FAFAF7 0%, #F5F5F0 48%, #EEEDE8 100%)",
  ].join(", "),
  backgroundSize: "10px 10px, 12px 12px, 100% 100%",
};

const IconFrame = ({ children }: { children: ReactNode }) => (
  <div
    className="flex h-[52px] w-[52px] shrink-0 items-center justify-center border border-black bg-[#F5F5F0] sm:h-[58px] sm:w-[58px] md:h-[64px] md:w-[64px]"
    aria-hidden="true"
  >
    {children}
  </div>
);

const GlobeStudioIcon = () => (
  <svg viewBox="0 0 48 48" className="h-[72%] w-[72%]" fill="none" stroke="#000" strokeWidth="1.35">
    <circle cx="24" cy="24" r="12.5" />
    <ellipse cx="24" cy="24" rx="5" ry="12.5" />
    <path d="M11.5 24h25M12.5 17.5h23M12.5 30.5h23" />
    <path d="M8 15.5a20 20 0 0 1 32 0" strokeLinecap="round" />
    <path d="M40 32.5a20 20 0 0 1-32 0" strokeLinecap="round" />
    <path d="M33.5 9.5a18 18 0 0 1 5 13.5" strokeLinecap="round" />
    <path d="M14.5 38.5a18 18 0 0 1-5-13.5" strokeLinecap="round" />
  </svg>
);

const PotteryTallIcon = () => (
  <svg viewBox="0 0 48 48" className="h-[72%] w-[72%]" fill="none" stroke="#000" strokeWidth="1.35">
    <ellipse cx="24" cy="37.5" rx="15.5" ry="3.8" />
    <path d="M12.5 37.5c0-7.5 4-13.5 11.5-13.5s11.5 6 11.5 13.5" />
    <path d="M18 21.5c2-5.5 9.5-5.5 12 0 2 7.5-2 11.5-6 11.5s-8-4-6-11.5z" />
    <path d="M14 29.5c-2.8-1.8-4.8-5.5-3.8-9.5M34 29.5c2.8-1.8 4.8-5.5 3.8-9.5" strokeLinecap="round" />
    <path d="M10.5 27.5c3.5 2 7.5 2 11 0M37.5 27.5c-3.5 2-7.5 2-11 0" strokeLinecap="round" />
  </svg>
);

const ContactForumIcon = () => (
  <svg viewBox="0 0 48 48" className="h-[72%] w-[72%]" fill="none" stroke="#000" strokeWidth="1.35">
    <rect x="7.5" y="11.5" width="22.5" height="15.5" rx="0.8" />
    <path d="M7.5 15.5l11.2 7.8 11.3-7.8" />
    <path d="M26 24.5v5.8a2 2 0 0 0 2 2h10.2l4.3 3.8V19.8a2 2 0 0 0-2-2H28" />
    <path d="M28 19.8h12.5v16.3l-4.3-3.2" />
  </svg>
);

const PotteryBowlIcon = () => (
  <svg viewBox="0 0 48 48" className="h-[72%] w-[72%]" fill="none" stroke="#000" strokeWidth="1.35">
    <ellipse cx="24" cy="35.5" rx="16.5" ry="4.5" />
    <path d="M9.5 35.5c2-9.5 7.5-15.5 14.5-15.5s12.5 6 14.5 15.5" />
    <path d="M14 31c3-3.5 9.5-3.5 12.5 0M33.5 31c-3-3.5-9.5-3.5-12.5 0" strokeLinecap="round" />
    <path d="M12 27c4 2.8 8 2.8 12 1M36 27c-4 2.8-8 2.8-12 1" strokeLinecap="round" />
  </svg>
);

const ICONS: Record<string, ReactNode> = {
  studio: <GlobeStudioIcon />,
  about: <PotteryTallIcon />,
  forum: <ContactForumIcon />,
  workshops: <PotteryBowlIcon />,
};

const HEADER = GUY_JANA_BANNER_CONTENT.header;
const SECTIONS = GUY_JANA_BANNER_CONTENT.sections.map((s) => ({
  ...s,
  icon: ICONS[s.id],
}));

const GuyJanaBannerDesign = () => {
  return (
    <section
      className="relative w-full overflow-hidden font-heebo text-black"
      dir="rtl"
      aria-label={`${HEADER.nameHe} — ${HEADER.subtitle}`}
      style={BANNER_STYLE}
    >
      {/* Scanned corner artwork from flyer */}
      <img
        src={guyJanaDecorTl}
        alt=""
        className="pointer-events-none absolute left-0 top-0 h-[38%] w-auto max-w-[22%] object-contain object-left-top opacity-95"
        aria-hidden="true"
      />
      <img
        src={guyJanaDecorBl}
        alt=""
        className="pointer-events-none absolute bottom-0 left-0 h-[34%] w-auto max-w-[20%] object-contain object-left-bottom opacity-90"
        aria-hidden="true"
      />
      <img
        src={guyJanaDecorBr}
        alt=""
        className="pointer-events-none absolute bottom-0 right-0 h-[36%] w-auto max-w-[24%] object-contain object-right-bottom opacity-95"
        aria-hidden="true"
      />

      <div className="relative z-[1] mx-auto w-full max-w-[1100px] px-4 py-5 sm:px-7 sm:py-6 md:py-7">
        <header className="mb-4 flex flex-col items-center text-center sm:mb-5">
          <div className="relative mb-3 h-[92px] w-[92px] overflow-hidden rounded-full border-[3px] border-black bg-[#E8E6DF] shadow-[0_4px_12px_rgba(0,0,0,0.12)] sm:h-[108px] sm:w-[108px] md:h-[120px] md:w-[120px]">
            <img
              src={guyJanaPortrait}
              alt={HEADER.nameHe}
              className="h-full w-full object-cover object-[50%_12%] scale-[1.42]"
              loading="eager"
            />
          </div>
          <h1 className="font-frank text-[1.4rem] font-bold leading-tight tracking-wide text-black sm:text-[1.7rem] md:text-[1.9rem]">
            <span dir="ltr" className="inline-block">
              {HEADER.nameEn}
            </span>{" "}
            {HEADER.nameHe}
          </h1>
          <p className="mt-1 text-sm font-medium text-black/90 sm:text-base">
            {HEADER.subtitle}
          </p>
        </header>

        <div className="grid gap-3 sm:gap-3.5 md:gap-4">
          {SECTIONS.map((section) => (
            <article key={section.id} className="flex items-start gap-3 sm:gap-4">
              <IconFrame>{section.icon}</IconFrame>
              <div className="min-w-0 flex-1 pt-0.5 text-right">
                <h2 className="font-frank text-base font-bold leading-snug text-black sm:text-lg md:text-xl">
                  <span className="me-1.5" aria-hidden="true">
                    ■
                  </span>
                  {section.title}
                </h2>
                <p className="mt-1 text-[0.8rem] leading-[1.65] text-black/88 sm:text-sm md:text-[0.95rem]">
                  {section.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GuyJanaBannerDesign;
