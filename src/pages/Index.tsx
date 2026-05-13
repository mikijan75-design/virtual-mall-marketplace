const smallCards = Array.from({ length: 4 }, (_, index) => `small-frame-${index}`);
const tallCards = Array.from({ length: 4 }, (_, index) => `tall-frame-${index}`);

const PANEL_BASE =
  "overflow-hidden rounded-[9px] border border-[#d5cabd] bg-[#ded6cf] shadow-[inset_0_1px_0_rgba(255,255,255,0.42),0_1px_2px_rgba(105,88,64,0.08)]";

const SoftPanel = ({ className = "", hasSparkle = false }: { className?: string; hasSparkle?: boolean }) => (
  <section
    aria-hidden="true"
    className={`${PANEL_BASE} relative bg-[radial-gradient(circle_at_50%_35%,rgba(232,225,207,0.58),transparent_43%),linear-gradient(135deg,#ddd4cd_0%,#e5ded9_100%)] ${className}`}
  >
    {hasSparkle && (
      <div className="absolute bottom-5 right-5 h-12 w-12 text-[#fbfaf3] drop-shadow-[0_1px_2px_rgba(160,145,119,0.12)]">
        <div className="absolute left-1/2 top-0 h-full w-[28%] -translate-x-1/2 rounded-full bg-current" />
        <div className="absolute left-0 top-1/2 h-[28%] w-full -translate-y-1/2 rounded-full bg-current" />
        <div className="absolute inset-0 rotate-45 scale-75 rounded-full bg-current" />
      </div>
    )}
  </section>
);

const SmallFrame = () => (
  <article
    aria-hidden="true"
    className="rounded-[9px] border border-[#d9cfbd] bg-[#f3eed8] p-[5px] pb-[42px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.85),0_1px_2px_rgba(119,99,62,0.08)]"
  >
    <div className="h-full min-h-[105px] rounded-[6px] bg-[radial-gradient(circle_at_55%_45%,rgba(229,220,199,0.55),transparent_46%),linear-gradient(135deg,#d8cec7,#e2d9d1)] shadow-[inset_0_1px_0_rgba(255,255,255,0.28)]" />
  </article>
);

const TallFrame = () => (
  <article
    aria-hidden="true"
    className="overflow-hidden rounded-[8px] border border-[#d6cbbb] bg-[#f3edd7] shadow-[inset_0_1px_0_rgba(255,255,255,0.62),0_1px_2px_rgba(112,91,56,0.08)]"
  >
    <div className="h-[54%] bg-[radial-gradient(circle_at_60%_40%,rgba(232,224,207,0.5),transparent_42%),linear-gradient(135deg,#d9d0c8,#e1d8ce)]" />
    <div className="h-[46%] bg-[linear-gradient(180deg,#f4eed8_0%,#f7f2de_100%)]" />
  </article>
);

const Index = () => {
  return (
    <main
      dir="ltr"
      className="min-h-screen bg-[#f6f5ee] px-[clamp(1rem,3.7vw,2.375rem)] py-[clamp(1rem,3.1vw,2rem)]"
    >
      <div className="mx-auto grid w-full max-w-[960px] gap-5 lg:grid-cols-[minmax(0,1fr)_282px] lg:grid-rows-[344px_226px_277px]">
        <SoftPanel className="min-h-[220px] lg:row-start-1" />
        <SoftPanel className="min-h-[220px] lg:col-start-2 lg:row-start-1" />

        <div className="grid grid-cols-2 gap-[14px] self-start sm:grid-cols-4 lg:row-start-2">
          {smallCards.map((card) => (
            <SmallFrame key={card} />
          ))}
        </div>

        <SoftPanel className="min-h-[226px] lg:col-start-2 lg:row-start-2" />

        <div className="grid min-h-[277px] grid-cols-2 gap-[14px] sm:grid-cols-4 lg:row-start-3">
          {tallCards.map((card) => (
            <TallFrame key={card} />
          ))}
        </div>

        <SoftPanel className="min-h-[277px] lg:col-start-2 lg:row-start-3" hasSparkle />
      </div>
    </main>
  );
};

export default Index;
