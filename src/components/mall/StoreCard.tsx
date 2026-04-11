import { useNavigate } from "react-router-dom";
import type { Store } from "@/data/mallData";

const brandStyles: Record<string, { bg: string; text: string; accent: string; font: string }> = {
  "אופנה עילית": { bg: "linear-gradient(135deg, #1a1a2e, #16213e)", text: "#e8d5b7", accent: "#c9a96e", font: "font-frank" },
  "טכנולוגיה מתקדמת": { bg: "linear-gradient(135deg, #0a0a0a, #1a1a1a)", text: "#ffffff", accent: "#4fc3f7", font: "font-heebo" },
  "חנות עיצוב": { bg: "linear-gradient(135deg, #2d2d2d, #1a1a1a)", text: "#f5f0e8", accent: "#d4a373", font: "font-frank" },
  "קוסמטיקה טבעית": { bg: "linear-gradient(135deg, #fdf6f0, #f8ede3)", text: "#5c4033", accent: "#c49b7c", font: "font-frank" },
  "גלריה לאמנות": { bg: "linear-gradient(135deg, #f5f5f5, #e8e8e8)", text: "#222222", accent: "#888888", font: "font-frank" },
  "ספורט ואתגר": { bg: "linear-gradient(135deg, #1b1b1b, #2d2d2d)", text: "#ffffff", accent: "#ff4444", font: "font-heebo" },
  "ספורט עיוותי": { bg: "linear-gradient(135deg, #0d0d0d, #1a1a2e)", text: "#e0e0e0", accent: "#ff6b35", font: "font-heebo" },
  "אמבטיות מתקדמות": { bg: "linear-gradient(135deg, #f0f4f8, #dce4ed)", text: "#2c3e50", accent: "#5b8fa8", font: "font-frank" },
  "בנק": { bg: "linear-gradient(135deg, #1a237e, #0d1642)", text: "#ffffff", accent: "#c9b037", font: "font-frank" },
  "סמארט ואתגר": { bg: "linear-gradient(135deg, #111111, #222222)", text: "#ffffff", accent: "#7c4dff", font: "font-heebo" },
  "מסעדה איטלקית": { bg: "linear-gradient(135deg, #3e0c0c, #1a0505)", text: "#f5e6d3", accent: "#c8a96e", font: "font-frank" },
  "קפה בוטיק": { bg: "linear-gradient(135deg, #3e2723, #1b0f0c)", text: "#eedcca", accent: "#a67c52", font: "font-frank" },
  "סושי בר": { bg: "linear-gradient(135deg, #1a1a1a, #0a0a0a)", text: "#e8d5c4", accent: "#c62828", font: "font-heebo" },
  "גלידריה": { bg: "linear-gradient(135deg, #fce4ec, #f8bbd0)", text: "#4a2040", accent: "#e91e63", font: "font-frank" },
  "מאפיית שמרים": { bg: "linear-gradient(135deg, #f5e6d3, #e8d5b7)", text: "#3e2723", accent: "#8d6e63", font: "font-frank" },
  "בר מיצים": { bg: "linear-gradient(135deg, #e8f5e9, #c8e6c9)", text: "#1b5e20", accent: "#4caf50", font: "font-heebo" },
};

const defaultStyle = { bg: "linear-gradient(135deg, #1a1a1a, #2d2d2d)", text: "#f5f0e8", accent: "#c9a96e", font: "font-frank" };

interface StoreCardProps {
  store: Store;
}

const StoreCard = ({ store }: StoreCardProps) => {
  const navigate = useNavigate();
  const style = brandStyles[store.name] || defaultStyle;

  return (
    <button
      onClick={() => navigate(`/store/${store.id}`)}
      className="group relative flex flex-col w-full cursor-pointer transition-all duration-300 hover:scale-[1.02] focus:outline-none"
      aria-label={`כניסה לחנות ${store.name}`}
    >
      {/* Elegant outer frame */}
      <div className="relative flex flex-col w-full rounded-lg overflow-hidden"
        style={{
          border: "2px solid hsl(40,25%,72%)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08), inset 0 0 0 1px hsl(40,20%,85%)",
        }}
      >
        {/* Top gold trim */}
        <div className="h-[3px]"
          style={{ background: "linear-gradient(90deg, hsl(40,15%,65%), hsl(43,45%,70%), hsl(40,15%,65%))" }}
        />

        {/* Brand sign - unique per store */}
        <div className="relative z-10 py-3 md:py-4 px-2 flex flex-col items-center justify-center gap-0.5"
          style={{
            background: style.bg,
            borderBottom: `2px solid ${style.accent}`,
          }}
        >
          {/* Decorative corner accents */}
          <div className="absolute top-1 left-1 w-2 h-2 border-t border-l opacity-40"
            style={{ borderColor: style.accent }}
          />
          <div className="absolute top-1 right-1 w-2 h-2 border-t border-r opacity-40"
            style={{ borderColor: style.accent }}
          />
          <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l opacity-40"
            style={{ borderColor: style.accent }}
          />
          <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r opacity-40"
            style={{ borderColor: style.accent }}
          />

          {/* Brand name */}
          <span className={`${style.font} font-bold text-[10px] md:text-xs lg:text-sm truncate block tracking-wider w-full text-center`}
            style={{ color: style.text }}
          >
            {store.name}
          </span>
          {/* Accent line */}
          <div className="w-6 md:w-8 h-[1.5px] mt-0.5"
            style={{ background: style.accent }}
          />
        </div>

        {/* Store window with open doors */}
        <div className="relative min-h-[85px] md:min-h-[115px] overflow-hidden"
          style={{
            background: "linear-gradient(180deg, hsl(40,8%,96%) 0%, hsl(40,6%,92%) 100%)",
          }}
        >
          {/* Left door */}
          <div className="absolute top-0 bottom-0 left-0 w-[18%] z-20"
            style={{
              background: "linear-gradient(90deg, hsl(40,10%,84%) 0%, hsl(40,8%,90%) 60%, hsl(40,6%,94%) 100%)",
              boxShadow: "2px 0 8px rgba(0,0,0,0.06)",
              transformOrigin: "left center",
              transform: "perspective(200px) rotateY(25deg)",
              borderRight: "1px solid hsl(40,15%,82%)",
            }}
          />

          {/* Right door */}
          <div className="absolute top-0 bottom-0 right-0 w-[18%] z-20"
            style={{
              background: "linear-gradient(270deg, hsl(40,10%,84%) 0%, hsl(40,8%,90%) 60%, hsl(40,6%,94%) 100%)",
              boxShadow: "-2px 0 8px rgba(0,0,0,0.06)",
              transformOrigin: "right center",
              transform: "perspective(200px) rotateY(-25deg)",
              borderLeft: "1px solid hsl(40,15%,82%)",
            }}
          />

          {/* Inner depth */}
          <div className="absolute inset-0"
            style={{ boxShadow: "inset 0 4px 14px rgba(0,0,0,0.05), inset 0 0 20px rgba(0,0,0,0.02)" }}
          />

          {/* Glass reflection */}
          <div className="absolute inset-0 pointer-events-none z-[5]"
            style={{ background: "linear-gradient(155deg, rgba(255,255,255,0.35) 0%, transparent 30%)" }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full py-4 gap-1.5">
            <span className="text-2xl md:text-3xl lg:text-4xl group-hover:scale-110 transition-transform duration-500"
              style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.08))" }}
            >
              {store.logoEmoji}
            </span>
            <span className="text-[7px] md:text-[9px] font-heebo tracking-widest uppercase"
              style={{ color: "hsl(220,8%,55%)" }}
            >
              {store.category}
            </span>
          </div>

          {/* Hover glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-[15]"
            style={{ background: "radial-gradient(ellipse at center, rgba(255,230,180,0.1) 0%, transparent 65%)" }}
          />
        </div>

        {/* Bottom gold trim */}
        <div className="h-[3px]"
          style={{ background: "linear-gradient(90deg, hsl(40,15%,65%), hsl(43,45%,70%), hsl(40,15%,65%))" }}
        />
      </div>
    </button>
  );
};

export default StoreCard;
