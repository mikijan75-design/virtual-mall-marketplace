const frameCount = 20;

const palette = [
  { name: "Concrete wall", hex: "#c7c7c3" },
  { name: "Wall shadow", hex: "#9f9f9a" },
  { name: "Frame face", hex: "#f3f3f0" },
  { name: "Frame bevel", hex: "#d6d6d1" },
  { name: "Gallery floor", hex: "#d1c9bd" },
  { name: "Floor seam", hex: "#9e968a" },
];

const GalleryWallDesignPage = () => {
  return (
    <main className="min-h-screen bg-[#ece8df] px-4 py-8 text-left text-[#2f2f2d]" dir="ltr">
      <section className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
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
                  <div className="relative h-full w-full border border-[#d5d5d0] bg-[linear-gradient(145deg,#fbfbf9,#ececea)] shadow-inner" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="rounded-[2rem] border border-[#c7c0b5] bg-[#f6f1e8] p-6 shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#7b756c]">Image sample</p>
          <h1 className="mt-3 font-frank text-4xl font-black leading-tight">Minimal gallery wall</h1>
          <p className="mt-4 text-sm leading-6 text-[#5f5a52]">
            A concrete museum wall with a five-by-four grid of raised white square panels, soft left-to-right
            lighting, long frame shadows, and a muted stone floor.
          </p>

          <div className="mt-7 space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-[#6f685f]">Sampled palette</h2>
            {palette.map((color) => (
              <div className="flex items-center justify-between gap-3 rounded-xl bg-white/55 p-3" key={color.hex}>
                <div className="flex items-center gap-3">
                  <span className="h-9 w-9 rounded-lg border border-black/10" style={{ backgroundColor: color.hex }} />
                  <span className="text-sm font-medium">{color.name}</span>
                </div>
                <code className="rounded bg-[#e8e1d6] px-2 py-1 text-xs">{color.hex}</code>
              </div>
            ))}
          </div>

          <dl className="mt-7 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl bg-white/55 p-3">
              <dt className="font-bold text-[#6f685f]">Grid</dt>
              <dd>5 columns x 4 rows</dd>
            </div>
            <div className="rounded-xl bg-white/55 p-3">
              <dt className="font-bold text-[#6f685f]">Frame ratio</dt>
              <dd>1:1 square</dd>
            </div>
            <div className="rounded-xl bg-white/55 p-3">
              <dt className="font-bold text-[#6f685f]">Wall rhythm</dt>
              <dd>20% vertical panels</dd>
            </div>
            <div className="rounded-xl bg-white/55 p-3">
              <dt className="font-bold text-[#6f685f]">Lighting</dt>
              <dd>soft top center</dd>
            </div>
          </dl>
        </aside>
      </section>
    </main>
  );
};

export default GalleryWallDesignPage;
