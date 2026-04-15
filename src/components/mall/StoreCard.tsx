import { useNavigate } from "react-router-dom";
import type { Store } from "@/data/mallData";

import fashionImg from "@/assets/stores/fashion.jpg";
import techImg from "@/assets/stores/tech.jpg";
import designImg from "@/assets/stores/design.jpg";
import cosmeticsImg from "@/assets/stores/cosmetics.jpg";
import galleryImg from "@/assets/stores/gallery.jpg";
import sportsImg from "@/assets/stores/sports.jpg";
import extremeSportsImg from "@/assets/stores/extreme-sports.jpg";
import bathroomImg from "@/assets/stores/bathroom.jpg";
import bankImg from "@/assets/stores/bank.jpg";
import smartImg from "@/assets/stores/smart.jpg";
import smartLogo from "@/assets/stores/smart-logo.jpg";
import italianImg from "@/assets/stores/italian.jpg";
import cafeImg from "@/assets/stores/cafe.jpg";
import sushiImg from "@/assets/stores/sushi.jpg";
import gelatoImg from "@/assets/stores/gelato.jpg";
import bakeryImg from "@/assets/stores/bakery.jpg";
import juiceImg from "@/assets/stores/juice.jpg";

const brandStyles: Record<string, { bg: string; text: string; accent: string; font: string; image: string; subtitle: string; logo?: string }> = {
  "אופנה עילית": { bg: "linear-gradient(135deg, #f5eef0, #ede4e8)", text: "#3a2a30", accent: "#c9a96e", font: "font-frank", image: fashionImg, subtitle: "קוטור יוקרה" },
  "טכנולוגיה מתקדמת": { bg: "linear-gradient(135deg, #e8f0f8, #dbe6f2)", text: "#1a3a5c", accent: "#4fc3f7", font: "font-heebo", image: techImg, subtitle: "גאדג'טים מהעתיד" },
  "חנות עיצוב": { bg: "linear-gradient(135deg, #f8f0e8, #f0e6d8)", text: "#4a3520", accent: "#d4a373", font: "font-frank", image: designImg, subtitle: "סטודיו לציור" },
  "קוסמטיקה טבעית": { bg: "linear-gradient(135deg, #fdf6f0, #f8ede3)", text: "#5c4033", accent: "#c49b7c", font: "font-frank", image: cosmeticsImg, subtitle: "סודות הטבע" },
  "גלריה לאמנות": { bg: "linear-gradient(135deg, #f5f5f5, #e8e8e8)", text: "#222222", accent: "#888888", font: "font-frank", image: galleryImg, subtitle: "אמנות עכשווית" },
  "ספורט ואתגר": { bg: "linear-gradient(135deg, #fef0f0, #fce4e4)", text: "#8b1a1a", accent: "#ff4444", font: "font-heebo", image: sportsImg, subtitle: "ציוד לאתגרים" },
  "ספורט עיוותי": { bg: "linear-gradient(135deg, #fff3ed, #fce8de)", text: "#6b3015", accent: "#ff6b35", font: "font-heebo", image: extremeSportsImg, subtitle: "ספורט אקסטרים" },
  "אמבטיות מתקדמות": { bg: "linear-gradient(135deg, #f0f4f8, #dce4ed)", text: "#2c3e50", accent: "#5b8fa8", font: "font-frank", image: bathroomImg, subtitle: "עיצוב מודרני" },
  "בנק": { bg: "linear-gradient(135deg, #eef0f8, #e0e4f0)", text: "#1a237e", accent: "#c9b037", font: "font-frank", image: bankImg, subtitle: "שירותים פיננסיים" },
  "סמארט ואתגר": { bg: "linear-gradient(135deg, #f0ecf8, #e6e0f4)", text: "#3a1a6b", accent: "#7c4dff", font: "font-heebo", image: smartImg, subtitle: "סמארטפונים ואביזרים", logo: smartLogo },
  "מסעדה איטלקית": { bg: "linear-gradient(135deg, #fdf2ec, #f8e8de)", text: "#5c2a10", accent: "#c8a96e", font: "font-frank", image: italianImg, subtitle: "פסטה ופיצה אותנטית" },
  "קפה בוטיק": { bg: "linear-gradient(135deg, #f5ece4, #ede0d2)", text: "#3e2723", accent: "#a67c52", font: "font-frank", image: cafeImg, subtitle: "קפה ומאפים" },
  "סושי בר": { bg: "linear-gradient(135deg, #1a1a1a, #0a0a0a)", text: "#e8d5c4", accent: "#c62828", font: "font-heebo", image: sushiImg, subtitle: "סושי טרי יומיומי" },
  "גלידריה": { bg: "linear-gradient(135deg, #fce4ec, #f8bbd0)", text: "#4a2040", accent: "#e91e63", font: "font-frank", image: gelatoImg, subtitle: "גלידה ארטיזנלית" },
  "מאפיית שמרים": { bg: "linear-gradient(135deg, #f5e6d3, #e8d5b7)", text: "#3e2723", accent: "#8d6e63", font: "font-frank", image: bakeryImg, subtitle: "מאפים טריים" },
  "בר מיצים": { bg: "linear-gradient(135deg, #e8f5e9, #c8e6c9)", text: "#1b5e20", accent: "#4caf50", font: "font-heebo", image: juiceImg, subtitle: "מיצים טבעיים" },
};

const defaultStyle = { bg: "linear-gradient(135deg, #f5f0e8, #ede4d8)", text: "#3a2a20", accent: "#c9a96e", font: "font-frank", image: "", subtitle: "" };

interface StoreCardProps {
  store: Store;
}

const StoreCard = ({ store }: StoreCardProps) => {
  const navigate = useNavigate();
  const style = brandStyles[store.name] || defaultStyle;

  return (
    <button
      onClick={() => navigate(`/store/${store.id}`)}
      className="group relative flex flex-col w-full cursor-pointer transition-all duration-300 hover:scale-[1.03] focus:outline-none"
      aria-label={`כניסה לחנות ${store.name}`}
    >
      {/* Elegant outer frame */}
      <div
        className="relative flex flex-col w-full rounded-lg overflow-hidden"
        style={{
          border: "2px solid hsl(40,25%,72%)",
          boxShadow: "0 6px 24px rgba(0,0,0,0.12), inset 0 0 0 1px hsl(40,20%,85%)",
        }}
      >
        {/* Top gold trim */}
        <div
          className="h-[3px]"
          style={{ background: "linear-gradient(90deg, hsl(40,15%,65%), hsl(43,45%,70%), hsl(40,15%,65%))" }}
        />

        {/* Brand sign */}
        <div
          className="relative z-10 py-2.5 md:py-3 px-2 flex flex-col items-center justify-center gap-0.5"
          style={{
            background: style.bg,
            borderBottom: `2px solid ${style.accent}`,
          }}
        >
          {/* Corner accents */}
          <div className="absolute top-1 left-1 w-2 h-2 border-t border-l opacity-40" style={{ borderColor: style.accent }} />
          <div className="absolute top-1 right-1 w-2 h-2 border-t border-r opacity-40" style={{ borderColor: style.accent }} />
          <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l opacity-40" style={{ borderColor: style.accent }} />
          <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r opacity-40" style={{ borderColor: style.accent }} />

          {/* Brand name */}
          {style.logo ? (
            <img src={style.logo} alt={store.name} className="h-5 md:h-6 lg:h-7 object-contain" />
          ) : (
            <span
              className={`${style.font} font-bold text-[10px] md:text-xs lg:text-sm truncate block tracking-wider w-full text-center`}
              style={{ color: style.text }}
            >
              {store.name}
            </span>
          )}
          {/* Accent line */}
          <div className="w-6 md:w-8 h-[1.5px] mt-0.5" style={{ background: style.accent }} />
        </div>

        {/* Subtitle bar */}
        {style.subtitle && (
          <div
            className="py-1 text-center"
            style={{
              background: "linear-gradient(180deg, rgba(0,0,0,0.65), rgba(0,0,0,0.8))",
            }}
          >
            <span className="text-[8px] md:text-[10px] font-heebo font-medium tracking-wide" style={{ color: "hsl(40,30%,85%)" }}>
              {style.subtitle}
            </span>
          </div>
        )}

        {/* Realistic store image */}
        {style.image ? (
          <div className="relative overflow-hidden">
            <img
              src={style.image}
              alt={store.name}
              className="w-full h-[90px] md:h-[130px] object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
              width={512}
              height={512}
            />
            {/* Glass reflection overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(155deg, rgba(255,255,255,0.18) 0%, transparent 35%, transparent 60%, rgba(255,255,255,0.06) 100%)",
              }}
            />
            {/* Hover warm glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at center, rgba(255,230,180,0.15) 0%, transparent 70%)",
              }}
            />
          </div>
        ) : (
          <div
            className="relative min-h-[90px] md:min-h-[130px] flex items-center justify-center"
            style={{ background: "linear-gradient(180deg, hsl(40,8%,96%), hsl(40,6%,92%))" }}
          >
            <span className="text-2xl md:text-3xl">{store.logoEmoji}</span>
          </div>
        )}

        {/* Bottom gold trim */}
        <div
          className="h-[3px]"
          style={{ background: "linear-gradient(90deg, hsl(40,15%,65%), hsl(43,45%,70%), hsl(40,15%,65%))" }}
        />
      </div>
    </button>
  );
};

export default StoreCard;
