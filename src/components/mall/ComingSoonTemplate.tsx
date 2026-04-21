import React from "react";

interface ComingSoonTemplateProps {
  /** Sign label - default "בקרוב הפתיחה". Replace anytime to change the sign text. */
  signText?: string;
  /** Optional small subtitle pill below the sign */
  subtitle?: string;
  /** Match the height of a regular store card content area */
  className?: string;
}

/**
 * ComingSoonTemplate - "בקרוב הפתיחה"
 * Pure-CSS construction scene: scaffold, two workers, cement bags,
 * cable spool, tool cart and a white sign with red corner brackets.
 * No external image is used. Sign text is fully replaceable via prop.
 */
const ComingSoonTemplate: React.FC<ComingSoonTemplateProps> = ({
  signText = "בקרוב הפתיחה",
  subtitle,
  className = "",
}) => {
  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{
        height: "100%",
        minHeight: "170px",
        background: "linear-gradient(180deg, #f4e6cc 0%, #ead4ad 55%, #d9bf8f 100%)",
      }}
    >
      {/* Back wall shadow */}
      <div
        className="absolute inset-x-0 top-0 h-[62%]"
        style={{ background: "linear-gradient(180deg, #f1ddb6 0%, #e6cd9d 100%)" }}
      />

      {/* ========== WHITE SIGN ========== */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-[6%] w-[86%] h-[34%] flex items-center justify-center"
        style={{
          background: "#fbf6ee",
          boxShadow: "0 4px 10px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.7)",
          borderRadius: "2px",
        }}
      >
        {/* Red corner brackets */}
        <span className="absolute top-1 left-1 w-2.5 h-2.5 md:w-3 md:h-3 border-t-2 border-l-2" style={{ borderColor: "#b8362c" }} />
        <span className="absolute top-1 right-1 w-2.5 h-2.5 md:w-3 md:h-3 border-t-2 border-r-2" style={{ borderColor: "#b8362c" }} />
        <span className="absolute bottom-1 left-1 w-2.5 h-2.5 md:w-3 md:h-3 border-b-2 border-l-2" style={{ borderColor: "#b8362c" }} />
        <span className="absolute bottom-1 right-1 w-2.5 h-2.5 md:w-3 md:h-3 border-b-2 border-r-2" style={{ borderColor: "#b8362c" }} />

        <div className="flex flex-col items-center gap-0.5 px-2">
          <span
            className="font-frank font-extrabold text-[10px] md:text-base tracking-wide leading-tight text-center"
            style={{ color: "#b8362c" }}
          >
            {signText}
          </span>
          <span className="block w-6 md:w-8 h-[2px] mt-0.5" style={{ background: "#b8362c", opacity: 0.85 }} />
        </div>
      </div>

      {/* ========== SCAFFOLDING ========== */}
      {/* Top platform */}
      <div
        className="absolute left-[6%] right-[6%] top-[42%] h-[3px]"
        style={{ background: "linear-gradient(180deg, #c69558, #8d6131)" }}
      />
      {/* Safety net (top) */}
      <div
        className="absolute left-[6%] right-[6%] top-[42%] h-[10%]"
        style={{
          background:
            "repeating-linear-gradient(45deg, rgba(160,110,60,0.55) 0 1px, transparent 1px 4px), repeating-linear-gradient(-45deg, rgba(160,110,60,0.55) 0 1px, transparent 1px 4px)",
          borderTop: "1px solid rgba(140,90,40,0.6)",
          borderBottom: "1px solid rgba(140,90,40,0.4)",
        }}
      />
      {/* Vertical scaffold poles */}
      {[8, 30, 52, 74, 92].map((left) => (
        <div
          key={left}
          className="absolute"
          style={{
            left: `${left}%`,
            top: "40%",
            width: "2px",
            height: "45%",
            background: "linear-gradient(180deg, #b88248, #7a4f23)",
            boxShadow: "1px 0 0 rgba(0,0,0,0.15)",
          }}
        />
      ))}
      {/* Diagonal cross braces */}
      <div
        className="absolute"
        style={{
          left: "10%",
          top: "55%",
          width: "20%",
          height: "2px",
          background: "#9a6a35",
          transform: "rotate(20deg)",
          transformOrigin: "left center",
        }}
      />
      <div
        className="absolute"
        style={{
          left: "10%",
          top: "55%",
          width: "20%",
          height: "2px",
          background: "#9a6a35",
          transform: "rotate(-20deg)",
          transformOrigin: "left center",
        }}
      />
      <div
        className="absolute"
        style={{
          left: "55%",
          top: "55%",
          width: "20%",
          height: "2px",
          background: "#9a6a35",
          transform: "rotate(20deg)",
          transformOrigin: "left center",
        }}
      />
      <div
        className="absolute"
        style={{
          left: "55%",
          top: "55%",
          width: "20%",
          height: "2px",
          background: "#9a6a35",
          transform: "rotate(-20deg)",
          transformOrigin: "left center",
        }}
      />
      {/* Horizontal rail */}
      <div className="absolute left-[6%] right-[6%] top-[68%] h-[2px]" style={{ background: "#8a5a28" }} />

      {/* ========== WORKER #1 (top-left, painting) ========== */}
      <div className="absolute" style={{ left: "14%", top: "20%", width: "10%", height: "26%" }}>
        {/* Head */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-2 h-2 md:w-2.5 md:h-2.5 rounded-full" style={{ background: "#d4a373" }} />
        {/* Shirt */}
        <div className="absolute left-1/2 -translate-x-1/2 top-2 md:top-2.5 w-3 h-2 md:w-3.5 md:h-2.5 rounded-sm" style={{ background: "#f5f5f5" }} />
        {/* Overalls */}
        <div className="absolute left-1/2 -translate-x-1/2 top-3.5 md:top-4 w-3 h-3.5 md:w-3.5 md:h-4" style={{ background: "#2c4a7a", borderRadius: "1px" }} />
        {/* Roller arm */}
        <div className="absolute left-[80%] top-[20%] w-3 h-[1.5px] rotate-[-30deg] origin-left" style={{ background: "#d4a373" }} />
        <div className="absolute left-[120%] top-[5%] w-1 h-2 rounded-sm" style={{ background: "#888" }} />
      </div>

      {/* ========== WORKER #2 (right, on ground at workbench) ========== */}
      <div className="absolute" style={{ right: "18%", bottom: "12%", width: "12%", height: "38%" }}>
        {/* Hardhat */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-3 h-1.5 md:w-3.5 md:h-2 rounded-t-full" style={{ background: "#f4c542", boxShadow: "inset 0 -1px 0 rgba(0,0,0,0.2)" }} />
        {/* Head */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1.5 md:top-2 w-2 h-2 md:w-2.5 md:h-2.5 rounded-full" style={{ background: "#d4a373" }} />
        {/* Shirt */}
        <div className="absolute left-1/2 -translate-x-1/2 top-3 md:top-4 w-3.5 h-2.5 md:w-4 md:h-3 rounded-sm" style={{ background: "#fafafa" }} />
        {/* Overalls */}
        <div className="absolute left-1/2 -translate-x-1/2 top-5 md:top-6.5 w-3.5 h-4 md:w-4 md:h-5" style={{ background: "#2c4a7a", borderRadius: "1px" }} />
      </div>

      {/* Workbench */}
      <div className="absolute" style={{ right: "10%", bottom: "16%", width: "32%", height: "3px", background: "linear-gradient(180deg, #c89060, #8e5a2a)" }} />
      <div className="absolute" style={{ right: "12%", bottom: "6%", width: "2px", height: "10%", background: "#8e5a2a", transform: "rotate(15deg)" }} />
      <div className="absolute" style={{ right: "38%", bottom: "6%", width: "2px", height: "10%", background: "#8e5a2a", transform: "rotate(-15deg)" }} />
      {/* Bread on bench */}
      <div className="absolute rounded-full" style={{ right: "30%", bottom: "19%", width: "5%", height: "3%", background: "radial-gradient(ellipse, #d9a566, #a06b32)" }} />
      <div className="absolute rounded-sm" style={{ right: "14%", bottom: "19%", width: "6%", height: "3%", background: "linear-gradient(90deg, #c8884a, #a36a2c)" }} />

      {/* ========== CEMENT BAGS (bottom-left) ========== */}
      <div className="absolute" style={{ left: "4%", bottom: "4%", width: "20%", height: "26%" }}>
        <div className="absolute bottom-0 left-0 w-full h-[55%] rounded-sm"
          style={{ background: "linear-gradient(180deg, #d97a3a 0%, #b85a20 100%)", boxShadow: "0 1px 3px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.15)" }} />
        <div className="absolute bottom-[50%] left-[10%] w-[85%] h-[45%] rounded-sm"
          style={{ background: "linear-gradient(180deg, #c4a888 0%, #9a7d5b 100%)", boxShadow: "0 1px 3px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.2)" }} />
        {/* Label stripe */}
        <div className="absolute bottom-[20%] left-[5%] w-[60%] h-[8%]" style={{ background: "rgba(255,255,255,0.6)" }} />
        <div className="absolute bottom-[75%] left-[20%] w-[55%] h-[6%]" style={{ background: "rgba(255,255,255,0.5)" }} />
      </div>

      {/* ========== CABLE SPOOL ========== */}
      <div className="absolute" style={{ left: "32%", bottom: "5%", width: "12%", height: "16%" }}>
        <div className="absolute inset-0 rounded-full"
          style={{ background: "radial-gradient(circle at 35% 35%, #4a4a4a, #1a1a1a)", boxShadow: "0 2px 4px rgba(0,0,0,0.3)" }} />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[35%] h-[35%] rounded-full" style={{ background: "#7a5a3a" }} />
      </div>

      {/* ========== TOOL CART (bottom-right) ========== */}
      <div className="absolute" style={{ right: "4%", bottom: "4%", width: "16%", height: "22%" }}>
        <div className="absolute inset-0 rounded-sm"
          style={{ background: "linear-gradient(180deg, #d97a3a 0%, #2a2a2a 100%)", boxShadow: "0 2px 4px rgba(0,0,0,0.3)" }} />
        {/* Drawer lines */}
        <div className="absolute left-[10%] right-[10%] top-[35%] h-[1px]" style={{ background: "#1a1a1a" }} />
        <div className="absolute left-[10%] right-[10%] top-[55%] h-[1px]" style={{ background: "#1a1a1a" }} />
        <div className="absolute left-[10%] right-[10%] top-[75%] h-[1px]" style={{ background: "#1a1a1a" }} />
        {/* Wheels */}
        <div className="absolute left-[10%] -bottom-1 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full" style={{ background: "#1a1a1a" }} />
        <div className="absolute right-[10%] -bottom-1 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full" style={{ background: "#1a1a1a" }} />
      </div>

      {/* ========== OPTIONAL SUBTITLE PILL ========== */}
      {subtitle && (
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-1.5 px-3 py-0.5 rounded-sm z-10"
          style={{ background: "rgba(0,0,0,0.78)", boxShadow: "0 2px 6px rgba(0,0,0,0.25)" }}
        >
          <span className="font-heebo font-semibold text-[9px] md:text-[11px] tracking-wide text-white">
            {subtitle}
          </span>
        </div>
      )}

      {/* Glass reflection */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(155deg, rgba(255,255,255,0.18) 0%, transparent 35%, transparent 60%, rgba(255,255,255,0.06) 100%)",
        }}
      />
    </div>
  );
};

export default ComingSoonTemplate;