import hamsaStainedGlass from "@/assets/stores/hamsa-stained-glass.png";

const frameCount = 20;
const artworkIndex = 6;

const GalleryWallSection = () => {
  return (
    <section className="text-left text-[#2f2f2d]" dir="ltr">
      <div className="overflow-hidden rounded-[2rem] border border-[#bbb8af] bg-[#c7c7c3] shadow-2xl">
        <div
          aria-label="Sampled gallery wall design with twenty white square frames"
          className="relative aspect-[4/3] min-h-[360px] overflow-hidden bg-[#c7c7c3]"
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
                  {index === artworkIndex && (
                    <img
                      src={hamsaStainedGlass}
                      alt="Hamsa stained glass artwork"
                      className="h-full w-full object-contain"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GalleryWallSection;