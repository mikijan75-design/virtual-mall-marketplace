import { useNavigate } from "react-router-dom";
import type { Store } from "@/data/mallData";

import fashionImg from "@/assets/stores/fashion.jpg";
import techImg from "@/assets/stores/tech.jpg";
import designImg from "@/assets/stores/design.jpg";
import cosmeticsImg from "@/assets/stores/cosmetics.jpg";
import galleryImg from "@/assets/stores/gallery.jpg";
import sportsImg from "@/assets/stores/sports.jpg";
import extremeImg from "@/assets/stores/extreme-sports.jpg";
import bathroomImg from "@/assets/stores/bathroom.jpg";
import bankImg from "@/assets/stores/bank.jpg";
import daliaImg from "@/assets/stores/dalia-hadad-logo.jpg";
import smartImg from "@/assets/stores/smart.jpg";
import galleryArtImg from "@/assets/stores/gallery.jpg";
import mallWallTexture from "@/assets/mall-wall.jpg";
import marbleFloorTexture from "@/assets/marble-floor.jpg";

interface FloorOneTwoRowProps {
  stores: Store[];
}

const storefrontPositions = [
  { left: 2.6, width: 11.8 },
  { left: 17.0, width: 11.4 },
  { left: 30.5, width: 12.2 },
  { left: 58.7, width: 12.2 },
  { left: 73.3, width: 11.8 },
  { left: 87.1, width: 11.2 },
] as const;

const storefrontContent: Record<string, { image: string; eyebrow: string; signTone: string; textTone: string }> = {
  // Floor 1
  s1: { image: fashionImg, eyebrow: "בוטיק יוקרתי", signTone: "linear-gradient(180deg, hsl(330 60% 95%) 0%, hsl(320 50% 88%) 100%)", textTone: "hsl(326 50% 26%)" },
  s2: { image: techImg, eyebrow: "גאדג'טים וטכנולוגיה", signTone: "linear-gradient(180deg, hsl(210 60% 95%) 0%, hsl(215 55% 88%) 100%)", textTone: "hsl(218 60% 24%)" },
  s3: { image: designImg, eyebrow: "עיצוב פנים", signTone: "linear-gradient(180deg, hsl(165 50% 94%) 0%, hsl(170 45% 87%) 100%)", textTone: "hsl(170 50% 22%)" },
  s4: { image: cosmeticsImg, eyebrow: "טיפוח טבעי", signTone: "linear-gradient(180deg, hsl(345 65% 95%) 0%, hsl(345 55% 88%) 100%)", textTone: "hsl(340 50% 26%)" },
  s5: { image: galleryImg, eyebrow: "גלריה ותערוכות", signTone: "linear-gradient(180deg, hsl(38 60% 94%) 0%, hsl(38 52% 87%) 100%)", textTone: "hsl(28 55% 24%)" },
  s6: { image: sportsImg, eyebrow: "ציוד ספורט", signTone: "linear-gradient(180deg, hsl(95 50% 94%) 0%, hsl(100 45% 86%) 100%)", textTone: "hsl(125 55% 22%)" },
  // Floor 2
  s7: { image: extremeImg, eyebrow: "ספורט אקסטרים", signTone: "linear-gradient(180deg, hsl(8 65% 95%) 0%, hsl(8 55% 87%) 100%)", textTone: "hsl(8 60% 26%)" },
  s8: { image: bathroomImg, eyebrow: "עיצוב חדרי אמבטיה", signTone: "linear-gradient(180deg, hsl(200 60% 95%) 0%, hsl(210 55% 88%) 100%)", textTone: "hsl(218 55% 24%)" },
  s9: { image: bankImg, eyebrow: "שירותים בנקאיים", signTone: "linear-gradient(180deg, hsl(220 12% 92%) 0%, hsl(220 10% 84%) 100%)", textTone: "hsl(220 20% 22%)" },
  s10: { image: daliaImg, eyebrow: "יופי וטיפוח", signTone: "linear-gradient(180deg, hsl(295 55% 95%) 0%, hsl(295 50% 88%) 100%)", textTone: "hsl(295 50% 26%)" },
  s11: { image: smartImg, eyebrow: "סמארטפונים ואביזרים", signTone: "linear-gradient(180deg, hsl(265 55% 95%) 0%, hsl(265 50% 88%) 100%)", textTone: "hsl(265 50% 26%)" },
  s12: { image: galleryArtImg, eyebrow: "אמנות ותרבות", signTone: "linear-gradient(180deg, hsl(48 70% 94%) 0%, hsl(45 60% 86%) 100%)", textTone: "hsl(35 55% 24%)" },
};

const romanNumerals = ["I", "II", "III", "IV", "V", "VI"];

const GoldDivider = ({ align }: { align: "left" | "right" }) => (
  <div
    className={`absolute top-[2px] bottom-[6px] z-20 w-[5px] md:w-[6px] ${align === "left" ? "-left-[4px] md:-left-[5px]" : "-right-[4px] md:-right-[5px]"}`}
    style={{
      background:
        "linear-gradient(90deg, hsl(43 36% 32%) 0%, hsl(43 64% 58%) 34%, hsl(44 88% 84%) 50%, hsl(43 64% 58%) 66%, hsl(43 36% 32%) 100%)",
      boxShadow: "0 0 4px rgba(0,0,0,0.25)",
      borderRadius: "1px",
    }}
  />
);

const Storefront = ({
  store,
  index,
  divider,
  left,
  width,
}: {
  store: Store;
  index: number;
  divider?: "left" | "right";
  left: number;
  width: number;
}) => {
  const navigate = useNavigate();
  const content = storefrontContent[store.id];
  if (!content) return null;

  return (
    <div className="absolute bottom-0 top-0" style={{ left: `${left}%`, width: `${width}%` }}>
      {divider ? <GoldDivider align={divider} /> : null}
      <button
        type="button"
        onClick={() => navigate(`/store/${store.id}`)}
        aria-label={`כניסה לחנות ${store.name}`}
        className="group relative flex h-full w-full flex-col overflow-hidden border border-mall-gold/55 bg-card/90 shadow-[0_2px_8px_rgba(0,0,0,0.18)] transition-transform duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-mall-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        style={{
          backgroundImage: `linear-gradient(180deg, hsl(var(--card)) 0%, hsl(var(--mall-wall) / 0.88) 100%), url(${mallWallTexture})`,
          backgroundBlendMode: "soft-light, normal",
        }}
        data-store={store.id}
      >
        <div className="h-[2px] w-full bg-gradient-to-r from-mall-trim/70 via-mall-gold to-mall-trim/70" />

        <div
          className="relative flex h-[26px] items-center justify-center border-b border-mall-gold/45 px-1 text-center md:h-[28px]"
          style={{ background: content.signTone }}
        >
          <span className="font-frank text-[9px] font-bold leading-tight md:text-[10px]" style={{ color: content.textTone }}>
            {store.name}
          </span>
        </div>

        <div className="flex h-[14px] items-center justify-center border-b border-mall-gold/35 bg-mall-sign/90 px-1 md:h-[15px]">
          <span className="font-heebo text-[7px] font-medium tracking-[0.05em] text-mall-gold/85">
            {content.eyebrow}
          </span>
        </div>

        <div className="relative flex-1 overflow-hidden bg-background/70 p-[2px]">
          <div className="relative h-full overflow-hidden border border-mall-column/90 bg-background shadow-[inset_0_0_0_1px_rgba(255,255,255,0.55)]">
            <img
              src={content.image}
              alt={store.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-black/15" />
          </div>
        </div>

        <div
          className="relative flex h-[9px] items-center justify-center border-t border-mall-gold/30 md:h-[10px]"
          style={{
            backgroundImage: `linear-gradient(180deg, hsl(var(--mall-floor) / 0.55) 0%, hsl(var(--mall-floor) / 0.85) 100%), url(${marbleFloorTexture})`,
            backgroundBlendMode: "soft-light, normal",
          }}
        >
          <div className="absolute left-1/2 top-1/2 flex h-[12px] w-[12px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-mall-gold/60 bg-[hsl(var(--mall-trim))] text-[5px] font-bold text-primary-foreground shadow-[0_1px_3px_rgba(0,0,0,0.24)]">
            {romanNumerals[index]}
          </div>
        </div>
      </button>
    </div>
  );
};

const FloorOneTwoRow = ({ stores }: FloorOneTwoRowProps) => {
  return (
    <div className="absolute inset-0">
      {stores.slice(0, 3).map((store, index) => (
        <Storefront
          key={store.id}
          store={store}
          index={index}
          divider="right"
          left={storefrontPositions[index].left}
          width={storefrontPositions[index].width}
        />
      ))}
      {stores.slice(3, 6).map((store, index) => (
        <Storefront
          key={store.id}
          store={store}
          index={index + 3}
          divider={index === 0 ? undefined : "left"}
          left={storefrontPositions[index + 3].left}
          width={storefrontPositions[index + 3].width}
        />
      ))}
    </div>
  );
};

export default FloorOneTwoRow;
