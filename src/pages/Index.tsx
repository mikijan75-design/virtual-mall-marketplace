import { mallFloors } from "@/data/mallData";
import MallHeader from "@/components/mall/MallHeader";
import MallCeiling from "@/components/mall/MallCeiling";
import Decorations from "@/components/mall/Decorations";
import FloorMap from "@/components/mall/FloorMap";
import StoreCard from "@/components/mall/StoreCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <MallHeader />

      <div className="bg-mall-wall pt-4 pb-0">
        <MallCeiling />

        {/* All floors stacked */}
        {mallFloors.map((floor) => (
          <div key={floor.id} className="mb-6">
            {/* Floor label */}
            <div className="text-center my-4">
              <span className="inline-block bg-mall-sign text-mall-gold font-frank font-bold text-lg md:text-xl px-6 py-2 rounded-md shadow-lg">
                {floor.name}
              </span>
            </div>

            {/* Stores row */}
            <div className="max-w-5xl mx-auto px-2">
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
                {floor.stores.map((store) => (
                  <StoreCard key={store.id} store={store} />
                ))}
              </div>
            </div>

            {/* Floor divider */}
            <div className="mt-4 h-6 bg-gradient-to-b from-mall-floor to-mall-wall/50 rounded-b-lg max-w-5xl mx-auto shadow-inner" />
          </div>
        ))}

        <Decorations />
      </div>

      {/* Floor Map */}
      <FloorMap
        floors={mallFloors}
        activeFloor={1}
        onFloorChange={(floorId) => {
          document.getElementById(`floor-${floorId}`)?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      <footer className="bg-mall-sign text-primary-foreground py-8 text-center font-heebo">
        <p className="text-mall-gold font-frank text-xl mb-2">הקניון הווירטואלי</p>
        <p className="text-sm text-muted-foreground">© 2026 כל הזכויות שמורות</p>
      </footer>
    </div>
  );
};

export default Index;
