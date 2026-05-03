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
import smartLogo from "@/assets/stores/smart-logo-clean.png";
import daliaLogo from "@/assets/stores/dalia-hadad-logo-clean.png";
import italianImg from "@/assets/stores/italian.jpg";
import cafeImg from "@/assets/stores/cafe.jpg";
import sushiImg from "@/assets/stores/sushi.jpg";
import gelatoImg from "@/assets/stores/gelato.jpg";
import bakeryImg from "@/assets/stores/bakery.jpg";
import juiceImg from "@/assets/stores/juice.jpg";
import comingSoonImg from "@/assets/stores/coming-soon.png";
import forRentImg from "@/assets/stores/for-rent.png";
import IsraelMezuzahsWordmark from "@/components/mall/IsraelMezuzahsWordmark";
import OliveWoodEpoxyWordmark from "@/components/mall/OliveWoodEpoxyWordmark";
import israelMezuzahsImg from "@/assets/stores/israel-mezuzahs.png";

type BrandStyle = {
  bg: string;
  text: string;
  accent: string;
  font: string;
  image: string;
  subtitle: string;
  logo?: string;
  subtitleLogo?: string;
  codedWordmark?: "israel-mezuzahs";
  codedSubtitle?: "olive-wood-epoxy";
};

const brandStyles: Record<string, BrandStyle> = {
  "אופנה עילית": { bg: "linear-gradient(135deg, #f5eef0, #ede4e8)", text: "#3a2a30", accent: "#c9a96e", font: "font-frank", image: fashionImg, subtitle: "קוטור יוקרה" },
  "טכנולוגיה מתקדמת": { bg: "linear-gradient(135deg, #e8f0f8, #dbe6f2)", text: "#1a3a5c", accent: "#4fc3f7", font: "font-heebo", image: techImg, subtitle: "גאדג'טים מהעתיד" },
  "חנות עיצוב": { bg: "linear-gradient(135deg, #f8f0e8, #f0e6d8)", text: "#4a3520", accent: "#d4a373", font: "font-frank", image: designImg, subtitle: "סטודיו לציור" },
  "קוסמטיקה טבעית": { bg: "linear-gradient(135deg, #fdf6f0, #f8ede3)", text: "#5c4033", accent: "#c49b7c", font: "font-frank", image: cosmeticsImg, subtitle: "סודות הטבע" },
  "גלריה לאמנות": { bg: "linear-gradient(135deg, #f5f5f5, #e8e8e8)", text: "#222222", accent: "#888888", font: "font-frank", image: galleryImg, subtitle: "אמנות עכשווית" },
  "ספורט ואתגר": { bg: "linear-gradient(135deg, #fef0f0, #fce4e4)", text: "#8b1a1a", accent: "#ff4444", font: "font-heebo", image: sportsImg, subtitle: "ציוד לאתגרים" },
  "ספורט עיוותי": { bg: "linear-gradient(135deg, #fff3ed, #fce8de)", text: "#6b3015", accent: "#ff6b35", font: "font-heebo", image: extremeSportsImg, subtitle: "ספורט אקסטרים" },
  "אמבטיות מתקדמות": { bg: "linear-gradient(135deg, #f0f4f8, #dce4ed)", text: "#2c3e50", accent: "#5b8fa8", font: "font-frank", image: bathroomImg, subtitle: "עיצוב מודרני" },
  "בנק": { bg: "linear-gradient(135deg, #eef0f8, #e0e4f0)", text: "#1a237e", accent: "#c9b037", font: "font-frank", image: bankImg, subtitle: "שירותים פיננסיים" },
  "סמארט ואתגר": { bg: "linear-gradient(135deg, #f0ecf8, #e6e0f4)", text: "#3a1a6b", accent: "#7c4dff", font: "font-heebo", image: smartImg, subtitle: "סמארטפונים ואביזרים", logo: smartLogo, subtitleLogo: daliaLogo },
  "מסעדה איטלקית": { bg: "linear-gradient(135deg, #fdf2ec, #f8e8de)", text: "#5c2a10", accent: "#c8a96e", font: "font-frank", image: italianImg, subtitle: "פסטה ופיצה אותנטית" },
  "קפה בוטיק": { bg: "linear-gradient(135deg, #f5ece4, #ede0d2)", text: "#3e2723", accent: "#a67c52", font: "font-frank", image: cafeImg, subtitle: "קפה ומאפים" },
  "סושי בר": { bg: "linear-gradient(135deg, #1a1a1a, #0a0a0a)", text: "#e8d5c4", accent: "#c62828", font: "font-heebo", image: sushiImg, subtitle: "סושי טרי יומיומי" },
  "גלידריה": { bg: "linear-gradient(135deg, #fce4ec, #f8bbd0)", text: "#4a2040", accent: "#e91e63", font: "font-frank", image: gelatoImg, subtitle: "גלידה ארטיזנלית" },
  "מאפיית שמרים": { bg: "linear-gradient(135deg, #f5e6d3, #e8d5b7)", text: "#3e2723", accent: "#8d6e63", font: "font-frank", image: bakeryImg, subtitle: "מאפים טריים" },
  "בר מיצים": { bg: "linear-gradient(135deg, #e8f5e9, #c8e6c9)", text: "#1b5e20", accent: "#4caf50", font: "font-heebo", image: juiceImg, subtitle: "מיצים טבעיים" },
};

// Per-store-id overrides — edit a single store independently of mallData
const comingSoonOverride = {
  name: "בקרוב הפתיחה",
  bg: "linear-gradient(135deg, #f5ede0, #ebe0cc)",
  text: "#5a4424",
  accent: "#c9a96e",
  font: "font-frank",
  image: comingSoonImg,
  subtitle: "בשיפוצים",
};

const idOverrides: Record<string, Partial<BrandStyle & { name: string }>> = {
  s6: comingSoonOverride,
  s7: comingSoonOverride,
  s9: {
    name: "להשכרה מיידית",
    bg: "linear-gradient(135deg, #f5ede0, #ebe0cc)",
    text: "#5a4424",
    accent: "#c9a96e",
    font: "font-frank",
    image: forRentImg,
    subtitle: "חנות וירטואלית",
  },
  s13: comingSoonOverride,
  s14: comingSoonOverride,
  s2: {
    name: "Israel Mezuzahs",
    accent: "#10252b",
    subtitle: "מזוזות ועוד",
    codedWordmark: "israel-mezuzahs",
    codedSubtitle: "olive-wood-epoxy",
    image: israelMezuzahsImg,
  },
};

const defaultStyle: BrandStyle = { bg: "linear-gradient(135deg, #f5f0e8, #ede4d8)", text: "#3a2a20", accent: "#c9a96e", font: "font-frank", image: "", subtitle: "", logo: undefined, subtitleLogo: undefined };

const romanNumerals = ["I", "II", "III", "IV", "V", "VI"];
const STORE_CARD_CLASS = "h-[174px] min-h-[174px] max-h-[174px] md:h-[214px] md:min-h-[214px] md:max-h-[214px]";
const SIGN_BAND_CLASS = "relative z-10 flex h-[48px] min-h-[48px] max-h-[48px] items-center justify-center overflow-hidden";
const SUBTITLE_BAND_CLASS = "flex h-[26px] min-h-[26px] max-h-[26px] items-center justify-center overflow-hidden text-center";
const IMAGE_AREA_CLASS = "h-[90px] min-h-[90px] max-h-[90px] md:h-[130px] md:min-h-[130px] md:max-h-[130px]";

interface StoreCardProps {
  store: Store;
  storeIndex?: number;
}

const StoreCard = ({ store, storeIndex }: StoreCardProps) => {
  const navigate = useNavigate();
  const baseStyle = brandStyles[store.name] || defaultStyle;
  const override = idOverrides[store.id];
  const style = override ? { ...baseStyle, ...override } : baseStyle;
  const displayName = override?.name ?? store.name;

  return (
    <button
      onClick={() => navigate(`/store/${store.id}`)}
      className={`group relative flex w-full flex-col ${STORE_CARD_CLASS} cursor-pointer transition-all duration-300 hover:scale-[1.03] focus:outline-none`}
      aria-label={`כניסה לחנות ${store.name}`}
    >
      {/* Elegant outer frame */}
      <div
        className="relative flex h-full w-full flex-col overflow-hidden rounded-lg"
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
        {style.codedWordmark === "israel-mezuzahs" ? (
          <div
            className={SIGN_BAND_CLASS}
            style={{
              background: "#8ccfd0",
              borderBottom: `2px solid ${style.accent}`,
            }}
          >
            <IsraelMezuzahsWordmark
              className="w-full h-full"
              preserveAspectRatio="none"
            />
          </div>
        ) : style.logo ? (
          <div
            className={SIGN_BAND_CLASS}
            style={{
              background: "#ffffff",
              borderBottom: `2px solid ${style.accent}`,
            }}
          >
            <img src={style.logo} alt={store.name} className="h-full w-full object-contain px-2 py-1" />
          </div>
        ) : (
          <div
            className={`${SIGN_BAND_CLASS} flex-col gap-0.5 px-2`}
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
            <span
              className={`${style.font} font-bold text-[10px] md:text-xs lg:text-sm truncate block tracking-wider w-full text-center`}
              style={{ color: style.text }}
            >
              {displayName}
            </span>
            {/* Accent line */}
            <div className="w-6 md:w-8 h-[1.5px] mt-0.5" style={{ background: style.accent }} />
          </div>
        )}

        {/* Subtitle bar */}
        {style.codedSubtitle === "olive-wood-epoxy" ? (
          <div
            className={SUBTITLE_BAND_CLASS}
            style={{ background: "#f8f7f2" }}
          >
            <OliveWoodEpoxyWordmark
              className="w-full h-full"
              preserveAspectRatio="none"
            />
          </div>
        ) : style.subtitleLogo ? (
          <div
            className={SUBTITLE_BAND_CLASS}
            style={{
              background: "#ffffff",
            }}
          >
            <img src={style.subtitleLogo} alt={store.name} className="h-full w-full object-contain px-2 py-0.5" loading="lazy" />
          </div>
        ) : style.subtitle ? (
          <div
            className={SUBTITLE_BAND_CLASS}
            style={{
              background: "linear-gradient(180deg, rgba(0,0,0,0.65), rgba(0,0,0,0.8))",
            }}
          >
            <span className="text-[8px] md:text-[10px] font-heebo font-medium tracking-wide" style={{ color: "hsl(40,30%,85%)" }}>
              {style.subtitle}
            </span>
          </div>
        ) : null}

        {/* Realistic store image */}
        {style.image ? (
          <div className={`relative overflow-hidden ${IMAGE_AREA_CLASS}`}>
            <img
              src={style.image}
              alt={store.name}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
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
            className={`relative flex items-center justify-center ${IMAGE_AREA_CLASS}`}
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

        {/* Roman numeral badge */}
        {storeIndex !== undefined && (
          <div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, hsl(43,45%,55%), hsl(40,40%,45%))",
              color: "hsl(40,10%,98%)",
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              fontSize: "9px",
              fontWeight: 700,
              fontFamily: "serif",
              letterSpacing: "0.02em",
              boxShadow: "0 2px 6px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.3)",
              border: "1.5px solid hsl(43,50%,65%)",
            }}
          >
            {romanNumerals[storeIndex]}
          </div>
        )}
      </div>
    </button>
  );
};

export default StoreCard;
