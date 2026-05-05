import hamsaStainedGlass from "@/assets/stores/hamsa-stained-glass.png";
import hummingbirdBlue from "@/assets/stores/hummingbird-blue.png";
import hummingbirdGreen from "@/assets/stores/hummingbird-green.png";
import hamsaAmber from "@/assets/stores/hamsa-amber.png";
import hamsaJerusalem from "@/assets/stores/hamsa-jerusalem.png";
import crossRed from "@/assets/stores/cross-red.png";
import starBlueCircle from "@/assets/stores/star-blue-circle.png";
import starOfDavid from "@/assets/stores/star-of-david.png";
import butterflyRainbow from "@/assets/stores/butterfly-rainbow.png";
import hamsaJerusalemBlue from "@/assets/stores/hamsa-jerusalem-blue.png";
import hamsaBlueGems from "@/assets/stores/hamsa-blue-gems.png";
import lampBlueMosaic from "@/assets/stores/lamp-blue-mosaic.png";
import hamsaJerusalemTeal from "@/assets/stores/hamsa-jerusalem-teal.png";
import hamsaJerusalemOrange from "@/assets/stores/hamsa-jerusalem-orange.png";
import treeOfLife from "@/assets/stores/tree-of-life.png";
import hamsaGreenEye from "@/assets/stores/hamsa-green-eye.png";
import lotusPink from "@/assets/stores/lotus-pink.png";
import candleHolderStarTeal from "@/assets/stores/candle-holder-star-teal.png";
import hanukkiahBlueStar from "@/assets/stores/hanukkiah-blue-star.png";
import hotAirBalloon from "@/assets/stores/hot-air-balloon.png";
import DanielGlassartProfileDesign from "./DanielGlassartProfileDesign";

const frameCount = 20;
const artworks: Record<number, { src: string; alt: string }> = {
  0: { src: starBlueCircle, alt: "Blue star circle stained glass" },
  1: { src: starOfDavid, alt: "Star of David stained glass" },
  2: { src: hummingbirdBlue, alt: "Blue hummingbird stained glass" },
  3: { src: butterflyRainbow, alt: "Rainbow butterfly stained glass" },
  4: { src: hamsaJerusalemBlue, alt: "Blue Jerusalem hamsa stained glass" },
  5: { src: treeOfLife, alt: "Tree of life stained glass" },
  6: { src: hamsaStainedGlass, alt: "Hamsa stained glass artwork" },
  7: { src: hamsaBlueGems, alt: "Blue hamsa with gems stained glass" },
  8: { src: hamsaGreenEye, alt: "Green hamsa with eye stained glass" },
  9: { src: hummingbirdGreen, alt: "Green hummingbird stained glass" },
  10: { src: lampBlueMosaic, alt: "Blue mosaic lamp stained glass" },
  11: { src: lotusPink, alt: "Pink lotus flower stained glass" },
  12: { src: hamsaAmber, alt: "Amber hamsa stained glass" },
  13: { src: hamsaJerusalemTeal, alt: "Teal Jerusalem hamsa stained glass" },
  14: { src: candleHolderStarTeal, alt: "Teal Star of David candle holder stained glass" },
  15: { src: hamsaJerusalem, alt: "Jerusalem hamsa stained glass" },
  16: { src: hamsaJerusalemOrange, alt: "Orange Jerusalem hamsa stained glass" },
  17: { src: hanukkiahBlueStar, alt: "Blue star hanukkiah stained glass" },
  18: { src: crossRed, alt: "Red cross stained glass" },
  19: { src: hotAirBalloon, alt: "Hot air balloon stained glass" },
};

const GalleryWallSection = () => {
  return (
    <section className="text-left text-[#2f2f2d]" dir="ltr">
      <div className="flex overflow-hidden rounded-[2rem] border border-[#bbb8af] bg-[#c7c7c3] shadow-2xl">
        <div
          aria-label="Sampled gallery wall design with twenty white square frames"
          className="relative aspect-[4/3] min-h-[360px] flex-1 overflow-hidden bg-[#c7c7c3]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_35%,rgba(255,255,255,0.42),transparent_45%),linear-gradient(90deg,rgba(80,80,75,0.24)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.24),rgba(120,120,115,0.08))] bg-[length:auto,20%_100%,auto]" />
          <div className="absolute inset-x-0 bottom-0 h-[16%] border-t border-[#9e968a]/70 bg-[linear-gradient(180deg,#d8d0c4,#c8bfb2)]">
            <div className="absolute left-1/2 top-0 h-full w-px bg-[#9e968a]/55" />
            <div className="absolute inset-x-0 top-2 h-5 bg-gradient-to-b from-black/10 to-transparent" />
          </div>

          <div className="absolute left-[7.5%] right-[7.5%] top-[8%] grid grid-cols-5 gap-x-[5.8%] gap-y-[5.5%]">
            {Array.from({ length: frameCount }, (_, index) => (
              <div
                className="relative aspect-square bg-[#e9e9e5] p-[5.5%] shadow-[7px_10px_10px_rgba(54,54,49,0.24)]"
                key={index}
              >
                <div className="absolute inset-0 border border-[#bfc0bc] bg-[linear-gradient(135deg,#fbfbf8_0_9%,#d5d5d0_9%_14%,#f4f4f1_14%_86%,#c5c5c1_86%_91%,#ededeb_91%)]" />
                <div className="relative h-full w-full overflow-hidden border border-[#d5d5d0] bg-[linear-gradient(145deg,#fbfbf9,#ececea)] shadow-inner">
                  {artworks[index] && (
                    <img
                      src={artworks[index].src}
                      alt={artworks[index].alt}
                      className="h-full w-full object-contain"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <aside
          aria-label="Gallery wall side panel"
          className="relative shrink-0 overflow-y-auto border-l border-[#9e968a]/60 bg-[linear-gradient(180deg,#cfcfcb,#bdbdb8)] p-2"
          style={{ width: "50%" }}
        >
          <DanielGlassartProfileDesign />
        </aside>
      </div>
    </section>
  );
};

export default GalleryWallSection;