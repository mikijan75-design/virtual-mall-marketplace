import { Floor } from "@/data/mallData";
import StoreCard from "@/components/mall/StoreCard";

interface MobileMallViewProps {
  floors: Floor[];
}

const MobileMallView = ({ floors }: MobileMallViewProps) => {
  return (
    <div className="md:hidden bg-background min-h-screen pb-24" dir="rtl">
      {/* All floors — single scrollable page */}
      {floors.map((floor) => (
        <section key={floor.id} aria-label={floor.name}>
          {/* Floor name sign — same style as desktop */}
          <div className="px-4 pt-6 pb-3 flex justify-center">
            <div
              className="flex h-[34px] min-w-[230px] items-center justify-center rounded-sm border-2 border-mall-gold/70 px-4 shadow-[0_4px_10px_rgba(0,0,0,0.45)]"
              style={{
                background:
                  "linear-gradient(180deg, hsl(var(--mall-sign)) 0%, hsl(220 17% 23%) 50%, hsl(var(--mall-sign)) 100%)",
              }}
            >
              <span className="font-frank text-[13px] font-bold tracking-[0.05em] text-mall-gold">
                {floor.name}
              </span>
            </div>
          </div>

          {/* Store grid — uses the original StoreCard with full branding */}
          <div className="grid grid-cols-2 gap-3 px-3 pt-2 pb-4">
            {floor.stores.map((store, idx) => (
              <div key={store.id} className="pb-3">
                <StoreCard store={store} storeIndex={idx} />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default MobileMallView;