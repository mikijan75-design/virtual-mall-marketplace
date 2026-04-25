/** Diagonal red sale ribbon overlaying a store card (top-left corner). */
const SaleRibbon = ({ text = "מבצעים" }: { text?: string }) => (
  <div
    className="absolute z-30 pointer-events-none"
    style={{
      top: "30%",
      left: "-12%",
      transform: "rotate(-18deg)",
      width: "120%",
    }}
  >
    <div
      className="text-center font-frank font-bold text-[10px] md:text-xs py-1 tracking-wider"
      style={{
        background: "linear-gradient(180deg, hsl(0,75%,52%), hsl(0,72%,38%))",
        color: "hsl(0,0%,100%)",
        boxShadow: "0 2px 6px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(0,0,0,0.25)",
        border: "1px solid hsl(0,60%,28%)",
        textShadow: "0 1px 2px rgba(0,0,0,0.4)",
        letterSpacing: "0.08em",
      }}
    >
      ★ {text} ★
    </div>
  </div>
);

export default SaleRibbon;
