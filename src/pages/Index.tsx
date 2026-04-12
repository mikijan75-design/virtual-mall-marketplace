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
            {/* Marble entry path */}
            <div className="max-w-5xl mx-auto px-2 mb-2">
              <div className="h-3 md:h-4 rounded-t-sm mx-4"
                style={{
                  background: "linear-gradient(180deg, hsl(35,15%,88%) 0%, hsl(35,20%,92%) 40%, hsl(35,15%,88%) 100%)",
                  boxShadow: "inset 0 1px 3px rgba(255,255,255,0.6), inset 0 -1px 2px rgba(0,0,0,0.05)",
                  backgroundImage: "linear-gradient(180deg, hsl(35,15%,88%) 0%, hsl(35,20%,92%) 40%, hsl(35,15%,88%) 100%), repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(255,255,255,0.3) 30px, rgba(255,255,255,0.3) 31px)",
                }}
              />
            </div>

            <div className="max-w-5xl mx-auto px-2">
              <div className="relative grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
                {floor.stores.map((store, idx) => (
                  <div key={store.id} className="relative">
                    {/* Wall light above store */}
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none">
                      <div className="w-4 h-1.5 md:w-5 md:h-2 rounded-b-full"
                        style={{
                          background: "linear-gradient(180deg, hsl(45,10%,85%), hsl(45,20%,95%))",
                          boxShadow: "0 0 6px 2px rgba(255,255,240,0.5)",
                        }}
                      />
                      <div className="w-8 h-10 md:w-10 md:h-14"
                        style={{
                          background: "linear-gradient(180deg, rgba(255,255,240,0.25) 0%, rgba(255,255,240,0.08) 40%, transparent 100%)",
                        }}
                      />
                    </div>

                    <StoreCard store={store} />

                    {/* Small planter between stores */}
                    {idx % 3 !== 2 && (
                      <div className="absolute -right-2 md:-right-2.5 bottom-2 z-30 flex flex-col items-center pointer-events-none">
                        <div className="w-1.5 h-2.5 md:w-2 md:h-3 bg-green-700/70 rounded-full" style={{ filter: "blur(0.3px)" }} />
                        <div className="w-2 h-1.5 md:w-2.5 md:h-2 rounded-t-sm"
                          style={{ background: "linear-gradient(180deg, hsl(25,30%,55%), hsl(25,25%,45%))" }}
                        />
                      </div>
                    )}
                  </div>
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
