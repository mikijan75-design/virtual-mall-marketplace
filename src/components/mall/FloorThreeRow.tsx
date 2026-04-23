import { useNavigate } from "react-router-dom";
import type { Store } from "@/data/mallData";

import italianImg from "@/assets/stores/italian.jpg";
import cafeImg from "@/assets/stores/cafe.jpg";
import sushiImg from "@/assets/stores/sushi.jpg";
import gelatoImg from "@/assets/stores/gelato.jpg";
import bakeryImg from "@/assets/stores/bakery.jpg";
import juiceImg from "@/assets/stores/juice.jpg";
import mallWallTexture from "@/assets/mall-wall.jpg";
import marbleFloorTexture from "@/assets/marble-floor.jpg";
import floor3StairsImg from "@/assets/floor3-stairs.png";

interface FloorThreeRowProps {
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

const centralGatePosition = { left: 42.7, width: 16.0 };

const storefrontContent: Record<string, { image: string; eyebrow: string; signTone: string; textTone: string }> = {
  s13: {
    image: italianImg,
    eyebrow: "פסטה ופיצה",
    signTone: "linear-gradient(180deg, hsl(18 52% 95%) 0%, hsl(20 45% 88%) 100%)",
    textTone: "hsl(18 55% 26%)",
  },
  s14: {
    image: cafeImg,
    eyebrow: "קפה ומאפים",
    signTone: "linear-gradient(180deg, hsl(32 36% 95%) 0%, hsl(34 38% 88%) 100%)",
    textTone: "hsl(26 34% 24%)",
  },
  s15: {
    image: sushiImg,
    eyebrow: "סושי טרי יומיומי",
    signTone: "linear-gradient(180deg, hsl(0 0% 14%) 0%, hsl(0 0% 9%) 100%)",
    textTone: "hsl(34 35% 86%)",
  },
  s16: {
    image: gelatoImg,
    eyebrow: "גלידה ארטיזנלית",
    signTone: "linear-gradient(180deg, hsl(335 84% 95%) 0%, hsl(331 72% 88%) 100%)",
    textTone: "hsl(326 46% 32%)",
  },
  s17: {
    image: bakeryImg,
    eyebrow: "מאפים טריים",
    signTone: "linear-gradient(180deg, hsl(38 52% 94%) 0%, hsl(39 46% 87%) 100%)",
    textTone: "hsl(28 36% 24%)",
  },
  s18: {
    image: juiceImg,
    eyebrow: "מיצים טבעיים",
    signTone: "linear-gradient(180deg, hsl(106 63% 94%) 0%, hsl(104 49% 86%) 100%)",
    textTone: "hsl(132 54% 24%)",
  },
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
  >
    <div
      className="absolute -top-[3px] -left-[2px] -right-[2px] h-[5px]"
      style={{
        background: "linear-gradient(180deg, hsl(43 62% 58%), hsl(43 42% 33%))",
        boxShadow: "0 1px 2px rgba(0,0,0,0.28)",
      }}
    />
    <div
      className="absolute -bottom-[3px] -left-[2px] -right-[2px] h-[5px]"
      style={{
        background: "linear-gradient(0deg, hsl(43 62% 58%), hsl(43 42% 33%))",
        boxShadow: "0 -1px 2px rgba(0,0,0,0.28)",
      }}
    />
  </div>
);

const FloorThreeStorefront = ({
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
        data-floor3-store={store.id}
      >
        <div className="h-[2px] w-full bg-gradient-to-r from-mall-trim/70 via-mall-gold to-mall-trim/70" />

        <div
          className="relative flex h-[22px] items-center justify-center border-b border-mall-gold/45 px-1 text-center md:h-[24px]"
          style={{ background: content.signTone }}
        >
          <div className="absolute inset-x-[4px] top-[3px] h-px bg-mall-gold/40" />
          <div className="absolute inset-x-[4px] bottom-[3px] h-px bg-mall-gold/35" />
          <span
            className="font-frank text-[7px] font-bold leading-tight md:text-[8px]"
            style={{ color: content.textTone }}
          >
            {store.name}
          </span>
        </div>

        <div className="flex h-[12px] items-center justify-center border-b border-mall-gold/35 bg-mall-sign/90 px-1 md:h-[13px]">
          <span className="font-heebo text-[6px] font-medium tracking-[0.05em] text-mall-gold/85 md:text-[6px]">
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
            <div className="pointer-events-none absolute inset-y-0 left-[18%] w-px bg-white/55" />
            <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/60" />
            <div className="pointer-events-none absolute inset-y-0 right-[18%] w-px bg-white/55" />
            <div className="pointer-events-none absolute inset-x-0 top-[28%] h-px bg-white/45" />
            <div className="pointer-events-none absolute inset-x-0 bg-gradient-to-b from-white/20 via-transparent to-black/10" />
          </div>
        </div>

        <div
          className="relative flex h-[8px] items-center justify-center border-t border-mall-gold/30 md:h-[9px]"
          style={{
            backgroundImage: `linear-gradient(180deg, hsl(var(--mall-floor) / 0.55) 0%, hsl(var(--mall-floor) / 0.85) 100%), url(${marbleFloorTexture})`,
            backgroundBlendMode: "soft-light, normal",
          }}
        >
          <div className="absolute left-1/2 top-1/2 flex h-[11px] w-[11px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-mall-gold/60 bg-[hsl(var(--mall-trim))] text-[5px] font-bold text-primary-foreground shadow-[0_1px_3px_rgba(0,0,0,0.24)] md:h-[12px] md:w-[12px] md:text-[5px]">
            {romanNumerals[index]}
          </div>
        </div>
      </button>
    </div>
  );
};

const FloorThreeGate = () => (
  <div
    className="absolute bottom-0 top-0 flex flex-col"
    style={{ left: `${centralGatePosition.left}%`, width: `${centralGatePosition.width}%` }}
    data-floor3-gate
  >
    <div className="relative flex-1 overflow-hidden border-x border-t border-mall-gold/60 bg-mall-wall shadow-[inset_0_2px_8px_rgba(255,255,255,0.35)]">
      <img
        src={floor3StairsImg}
        alt="מדרגות שיש מרכזיות עם פסלי אריות"
        className="absolute inset-0 h-full w-full object-cover object-center"
        loading="lazy"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/15" />
    </div>

    <div
      className="h-[8px] border-t border-mall-gold/40 md:h-[9px]"
      style={{
        backgroundImage: `linear-gradient(180deg, hsl(var(--mall-floor) / 0.55) 0%, hsl(var(--mall-floor) / 0.85) 100%), url(${marbleFloorTexture})`,
        backgroundBlendMode: "soft-light, normal",
      }}
    />
  </div>
);

const FloorThreeRow = ({ stores }: FloorThreeRowProps) => {
  return (
    <section id="floor-3" className="relative -mt-px" aria-label="קומה 3 - קומת המזון" data-floor3-row>
      <div
        className="relative px-0 pb-0 pt-4 md:pt-5"
        style={{
          backgroundImage: `linear-gradient(180deg, hsl(var(--mall-ceiling) / 0.96) 0%, hsl(var(--mall-wall) / 0.98) 100%), url(${mallWallTexture})`,
          backgroundBlendMode: "soft-light, normal",
        }}
      >
        <div
          className="absolute inset-x-0 top-0 h-[10px] border-y border-mall-gold/45"
          style={{
            backgroundImage: `linear-gradient(180deg, hsl(var(--mall-floor) / 0.45) 0%, hsl(var(--mall-wall) / 0.88) 100%), url(${marbleFloorTexture})`,
            backgroundBlendMode: "soft-light, normal",
          }}
        />

        <div className="absolute left-1/2 top-0 z-30 -translate-x-1/2 -translate-y-[30%]" data-floor3-sign>
          <div
            className="flex h-[26px] min-w-[195px] items-center justify-center rounded-sm border-2 border-mall-gold/70 px-3 shadow-[0_4px_10px_rgba(0,0,0,0.45)] md:min-w-[210px]"
            style={{
              background: "linear-gradient(180deg, hsl(var(--mall-sign)) 0%, hsl(220 17% 23%) 50%, hsl(var(--mall-sign)) 100%)",
            }}
          >
            <span className="font-frank text-[11px] font-bold tracking-[0.05em] text-mall-gold md:text-[12px]">
              קומה 3 - קומת המזון
            </span>
          </div>
        </div>

        <div className="relative aspect-[1630/158] min-h-[92px] max-h-[158px] pt-4 md:pt-5">
          {stores.slice(0, 3).map((store, index) => (
            <FloorThreeStorefront
              key={store.id}
              store={store}
              index={index}
              divider="right"
              left={storefrontPositions[index].left}
              width={storefrontPositions[index].width}
            />
          ))}

          <FloorThreeGate />

          {stores.slice(3, 6).map((store, index) => (
            <FloorThreeStorefront
              key={store.id}
              store={store}
              index={index + 3}
              divider={index === 0 ? undefined : "left"}
              left={storefrontPositions[index + 3].left}
              width={storefrontPositions[index + 3].width}
            />
          ))}
        </div>

        <div
          className="mt-[2px] h-[14px] border-t border-mall-gold/35"
          style={{
            backgroundImage: `linear-gradient(180deg, hsl(var(--mall-floor) / 0.55) 0%, hsl(var(--mall-floor) / 0.9) 100%), url(${marbleFloorTexture})`,
            backgroundBlendMode: "soft-light, normal",
            boxShadow: "inset 0 2px 6px rgba(255,255,255,0.35), inset 0 -1px 3px rgba(0,0,0,0.2)",
          }}
        />
      </div>
    </section>
  );
};

export default FloorThreeRow;