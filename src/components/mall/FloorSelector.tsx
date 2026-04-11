import type { Floor } from "@/data/mallData";

interface FloorSelectorProps {
  floors: Floor[];
  activeFloor: number;
  onFloorChange: (floorId: number) => void;
}

const FloorSelector = ({ floors, activeFloor, onFloorChange }: FloorSelectorProps) => {
  return (
    <div className="flex justify-center gap-2 md:gap-4 py-4">
      {floors.map((floor) => (
        <button
          key={floor.id}
          onClick={() => onFloorChange(floor.id)}
          className={`
            px-4 md:px-6 py-2 rounded-lg font-heebo font-bold text-sm md:text-base transition-all shadow-md
            ${activeFloor === floor.id
              ? "bg-mall-gold text-mall-sign scale-105 shadow-lg"
              : "bg-mall-column text-foreground hover:bg-mall-trim hover:text-primary-foreground"
            }
          `}
        >
          קומה {floor.id}
        </button>
      ))}
    </div>
  );
};

export default FloorSelector;
