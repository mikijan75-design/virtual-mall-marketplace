import { useEffect, useState } from "react";

const TICKS = Array.from({ length: 41 }, (_, i) => i); // 0..40

const MeasurementRulers = () => {
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const update = () => {
      setSize({
        w: document.documentElement.scrollWidth,
        h: document.documentElement.scrollHeight,
      });
    };
    update();
    window.addEventListener("resize", update);
    const ro = new ResizeObserver(update);
    ro.observe(document.body);
    return () => {
      window.removeEventListener("resize", update);
      ro.disconnect();
    };
  }, []);

  return (
    <>
      {/* Vertical ruler — far left, full page height */}
      <div
        className="absolute left-0 top-0 z-[9999] w-7 bg-yellow-300 border-r-2 border-black text-black font-mono text-[10px] pointer-events-none"
        style={{ height: size.h || "100%" }}
      >
        {TICKS.map((t) => {
          const top = (t / 40) * 100;
          return (
            <div
              key={`v-${t}`}
              className="absolute left-0 right-0 flex items-center"
              style={{ top: `${top}%`, transform: "translateY(-50%)" }}
            >
              <div className="h-px w-3 bg-black" />
              <span className="ml-0.5 leading-none">{t}</span>
            </div>
          );
        })}
      </div>

      {/* Horizontal ruler — bottom, full page width, fixed so it's always visible */}
      <div
        className="fixed left-0 bottom-0 z-[9999] h-7 bg-yellow-300 border-t-2 border-black text-black font-mono text-[10px] pointer-events-none"
        style={{ width: "100vw" }}
      >
        {TICKS.map((t) => {
          const left = (t / 40) * 100;
          return (
            <div
              key={`h-${t}`}
              className="absolute top-0 bottom-0 flex flex-col items-center"
              style={{ left: `${left}%`, transform: "translateX(-50%)" }}
            >
              <div className="w-px h-3 bg-black" />
              <span className="leading-none mt-0.5">{t}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MeasurementRulers;