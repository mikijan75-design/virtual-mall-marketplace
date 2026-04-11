import type { Floor } from "@/data/mallData";
import StoreCard from "./StoreCard";

interface MallFloorProps {
  floor: Floor;
  isActive: boolean;
}

const MallFloor = ({ floor, isActive }: MallFloorProps) => {
  if (!isActive) return null;

  return (
    <div className="w-full animate-in fade-in duration-300">
      {/* Floor label */}
      <div className="text-center mb-4">
        <span className="inline-block bg-mall-sign text-mall-gold font-frank font-bold text-lg md:text-xl px-6 py-2 rounded-md shadow-lg">
          {floor.name}
        </span>
      </div>

      {/* Stores grid - always 2 rows of 3 */}
      <div className="max-w-5xl mx-auto px-2">
        {/* Top row */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 mb-3">
          {floor.stores.slice(0, 3).map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
        {/* Bottom row */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
          {floor.stores.slice(3, 6).map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      </div>

      {/* Floor surface */}
      <div className="mt-4 h-6 bg-gradient-to-b from-mall-floor to-mall-wall/50 rounded-b-lg max-w-5xl mx-auto shadow-inner" />
    </div>
  );
};

export default MallFloor;
