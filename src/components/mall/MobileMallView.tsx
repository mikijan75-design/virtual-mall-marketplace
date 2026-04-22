import { useState } from "react";
import { Floor } from "@/data/mallData";
import StoreCard from "@/components/mall/StoreCard";

interface MobileMallViewProps {
  floors: Floor[];
}

const MobileMallView = ({ floors }: MobileMallViewProps) => {
  const [activeFloor, setActiveFloor] = useState<number>(floors[0]?.id ?? 1);

  const current = floors.find((f) => f.id === activeFloor) ?? floors[0];

  return (
    <div className="md:hidden bg-background min-h-screen pb-24" dir="rtl">
      {/* Header + Floor selector */}
      <div className="sticky top-0 z-30 bg-mall-sign/95 backdrop-blur-sm border-b-2 border-mall-gold px-3 py-3 shadow-md">
        <h2 className="text-mall-gold font-frank text-center text-lg mb-2">
          הקניון הווירטואלי
        </h2>
        <div className="flex gap-2 justify-center" role="tablist" aria-label="בחירת קומה">
          {floors.map((floor) => {
            const isActive = floor.id === activeFloor;
            return (
              <button
                key={floor.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFloor(floor.id)}
                className={`flex-1 max-w-[110px] py-2 px-3 rounded-md font-heebo text-sm font-bold transition-all border-2 ${
                  isActive
                    ? "bg-mall-gold text-mall-sign border-mall-gold shadow-lg scale-105"
                    : "bg-transparent text-mall-gold border-mall-gold/40 hover:border-mall-gold"
                }`}
              >
                קומה {floor.id}
              </button>
            );
          })}
        </div>
      </div>

      {/* Floor name sign — same style as desktop */}
      <div className="px-4 pt-5 pb-3 flex justify-center">
        <div
          className="flex h-[34px] min-w-[230px] items-center justify-center rounded-sm border-2 border-mall-gold/70 px-4 shadow-[0_4px_10px_rgba(0,0,0,0.45)]"
          style={{
            background:
              "linear-gradient(180deg, hsl(var(--mall-sign)) 0%, hsl(220 17% 23%) 50%, hsl(var(--mall-sign)) 100%)",
          }}
        >
          <span className="font-frank text-[13px] font-bold tracking-[0.05em] text-mall-gold">
            {current.name}
          </span>
        </div>
      </div>

      {/* Store grid — uses the original StoreCard with full branding */}
      <div className="grid grid-cols-2 gap-3 px-3 pt-2 pb-4">
        {current.stores.map((store, idx) => (
          <div key={store.id} className="pb-3">
            <StoreCard store={store} storeIndex={idx} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileMallView;