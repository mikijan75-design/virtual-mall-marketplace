import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Floor } from "@/data/mallData";

interface MobileMallViewProps {
  floors: Floor[];
}

const MobileMallView = ({ floors }: MobileMallViewProps) => {
  const navigate = useNavigate();
  const [activeFloor, setActiveFloor] = useState<number>(floors[0]?.id ?? 1);

  const current = floors.find((f) => f.id === activeFloor) ?? floors[0];

  return (
    <div className="md:hidden bg-background min-h-screen pb-24">
      {/* Floor selector */}
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

      {/* Floor name */}
      <div className="px-4 pt-4 pb-2 text-center">
        <p className="font-frank text-mall-sign text-base">{current.name}</p>
      </div>

      {/* Store grid */}
      <div className="grid grid-cols-2 gap-3 px-3 pt-2">
        {current.stores.map((store, idx) => (
          <button
            key={store.id}
            type="button"
            onClick={() => navigate(`/store/${store.id}`)}
            aria-label={`כניסה לחנות ${store.name}`}
            className="group relative flex flex-col items-center justify-center aspect-square rounded-xl bg-gradient-to-br from-mall-cream to-mall-cream/60 border-2 border-mall-gold/50 shadow-md active:scale-95 transition-transform overflow-hidden"
          >
            <span className="absolute top-1.5 right-1.5 bg-mall-sign text-mall-gold text-[10px] font-bold rounded-full w-6 h-6 flex items-center justify-center font-frank">
              {idx + 1}
            </span>
            <span className="text-4xl mb-2" aria-hidden>
              {store.logoEmoji}
            </span>
            <span className="font-heebo text-xs font-bold text-mall-sign text-center px-2 leading-tight">
              {store.name}
            </span>
            <span className="font-heebo text-[10px] text-muted-foreground mt-1">
              {store.category}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileMallView;