import { TICK_BAND_PX } from "./MeasurementRulers.constants";

const H_TICKS = Array.from({ length: 41 }, (_, i) => i); // 0..40 horizontal
const V_TICKS = Array.from({ length: 81 }, (_, i) => i); // 0..80 vertical

/**
 * Two rulers, each 0..40, that always span the FULL content of the page —
 * regardless of browser zoom level. They are rendered as `absolute` inside
 * the page wrapper (not `fixed`), so "40" always lines up exactly with the
 * end of the page and there is no extra scroll area beyond them.
 */
const MeasurementRulers = () => {
  return (
    <>
      {/* Vertical ruler — far left, full page height */}
      <div
        className="absolute left-0 top-0 bottom-0 z-[9999] w-7 bg-yellow-300 border-r-2 border-black text-black font-mono text-[10px] pointer-events-none"
      >
        {V_TICKS.map((t) => {
          // 0 at the bottom, 80 at the top
          const top = ((80 - t) / 80) * 100;
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

      {/* Horizontal ruler — bottom of the page, full page width.
          `absolute` (not fixed) so 0 and 40 line up exactly with the page
          edges and zoom-out cannot create extra scrollable area. */}
      <div
        className="absolute left-0 right-0 bottom-0 z-[9999] bg-yellow-300 border-t-2 border-black text-black font-mono text-[10px] pointer-events-none"
        style={{ height: TICK_BAND_PX }}
      >
        {H_TICKS.map((t) => {
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