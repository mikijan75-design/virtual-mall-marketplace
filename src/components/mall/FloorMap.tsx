import type { Floor } from "@/data/mallData";

interface FloorMapProps {
  floors: Floor[];
  activeFloor: number;
  onFloorChange: (floorId: number) => void;
}

const categoryColors: Record<string, string> = {
  "אופנה": "bg-pink-200 border-pink-400",
  "טכנולוגיה": "bg-cyan-200 border-cyan-400",
  "עיצוב": "bg-emerald-200 border-emerald-400",
  "קוסמטיקה": "bg-rose-200 border-rose-400",
  "אמנות": "bg-amber-200 border-amber-400",
  "ספורט": "bg-lime-200 border-lime-400",
  "בית": "bg-sky-200 border-sky-400",
  "שירותים": "bg-gray-200 border-gray-400",
  "מזון": "bg-orange-200 border-orange-400",
};

const FloorMap = ({ floors, activeFloor, onFloorChange }: FloorMapProps) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-center font-frank font-bold text-xl md:text-2xl text-foreground mb-6">
        מפת הקניון
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {floors.map((floor) => (
          <button
            key={floor.id}
            onClick={() => onFloorChange(floor.id)}
            className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
              activeFloor === floor.id 
                ? "border-mall-gold bg-mall-ceiling shadow-lg scale-105" 
                : "border-border bg-card hover:border-mall-trim"
            }`}
          >
            <h3 className="font-heebo font-bold text-sm mb-3 text-foreground">קומה {floor.id}</h3>
            <div className="grid grid-cols-3 gap-1">
              {floor.stores.map((store) => (
                <div
                  key={store.id}
                  className={`text-[8px] md:text-[10px] p-1 rounded border font-heebo text-center truncate ${
                    categoryColors[store.category] || "bg-muted border-border"
                  }`}
                >
                  {store.name}
                </div>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FloorMap;
