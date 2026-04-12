import { mallFloors } from "@/data/mallData";
import MallHeader from "@/components/mall/MallHeader";
import MallCeiling from "@/components/mall/MallCeiling";
import Decorations from "@/components/mall/Decorations";
import FloorMap from "@/components/mall/FloorMap";
import StoreCard from "@/components/mall/StoreCard";
import mallWall from "@/assets/mall-wall.jpg";
import marbleFloor from "@/assets/marble-floor.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <MallHeader />

      <div
        className="pt-4 pb-0"
        style={{
          backgroundImage: `url(${mallWall})`,
          backgroundSize: "400px 400px",
          backgroundRepeat: "repeat",
        }}
      >
        <MallCeiling />

        {/* All floors stacked */}
        {mallFloors.map((floor) => (
          <div key={floor.id} className="mb-6">
            {/* Floor label */}
            <div className="text-center my-4">
              <span
                className="inline-block font-frank font-bold text-lg md:text-xl px-6 py-2 rounded-md"
                style={{
                  background: "linear-gradient(135deg, hsl(220,20%,14%), hsl(220,18%,20%))",
                  color: "hsl(43,70%,55%)",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
                  border: "1px solid hsl(43,50%,35%)",
                  letterSpacing: "0.05em",
                }}
              >
                {floor.name}
              </span>
            </div>

            {/* Marble entry path */}
            <div className="max-w-5xl mx-auto px-2 mb-2">
              <div
                className="h-4 md:h-5 rounded-t-sm mx-4"
                style={{
                  backgroundImage: `url(${marbleFloor})`,
                  backgroundSize: "200px 200px",
                  backgroundRepeat: "repeat",
                  boxShadow: "inset 0 2px 6px rgba(255,255,255,0.4), inset 0 -1px 3px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.1)",
                }}
              />
            </div>

            <div className="max-w-5xl mx-auto px-2">
              <div className="relative grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
                {floor.stores.map((store, idx) => (
                  <div key={store.id} className="relative">
                    {/* Recessed ceiling light fixture */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none">
                      {/* Light fixture body */}
                      <div
                        className="w-5 h-2 md:w-6 md:h-2.5 rounded-b-full"
                        style={{
                          background: "linear-gradient(180deg, hsl(40,10%,75%), hsl(40,8%,88%))",
                          boxShadow: "0 1px 4px rgba(0,0,0,0.15), 0 0 8px rgba(255,250,230,0.6)",
                          border: "1px solid hsl(40,12%,70%)",
                        }}
                      />
                      {/* Light bulb glow */}
                      <div
                        className="w-2 h-1 md:w-2.5 md:h-1.5 rounded-b-full -mt-0.5"
                        style={{
                          background: "radial-gradient(ellipse, rgba(255,250,220,0.95), rgba(255,245,200,0.5))",
                          boxShadow: "0 0 6px 3px rgba(255,250,220,0.4)",
                        }}
                      />
                      {/* Light beam cone */}
                      <div
                        className="w-10 h-14 md:w-14 md:h-20"
                        style={{
                          background: "linear-gradient(180deg, rgba(255,250,230,0.22) 0%, rgba(255,250,230,0.06) 50%, transparent 100%)",
                          clipPath: "polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%)",
                        }}
                      />
                    </div>

                    <StoreCard store={store} />

                    {/* Realistic planter between stores */}
                    {idx % 3 !== 2 && (
                      <div className="absolute -right-2 md:-right-2.5 bottom-3 z-30 flex flex-col items-center pointer-events-none">
                        {/* Plant foliage */}
                        <div className="relative">
                          <div
                            className="w-2.5 h-3 md:w-3 md:h-4 rounded-full"
                            style={{
                              background: "radial-gradient(ellipse at 40% 30%, hsl(120,35%,40%), hsl(130,30%,28%))",
                              boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                            }}
                          />
                          <div
                            className="absolute -left-0.5 top-0.5 w-1.5 h-2 md:w-2 md:h-2.5 rounded-full"
                            style={{
                              background: "radial-gradient(ellipse, hsl(115,30%,45%), hsl(125,28%,32%))",
                            }}
                          />
                        </div>
                        {/* Pot */}
                        <div
                          className="w-2.5 h-2 md:w-3 md:h-2.5 rounded-b-md -mt-0.5"
                          style={{
                            background: "linear-gradient(180deg, hsl(20,40%,50%), hsl(15,35%,38%))",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
                            borderTop: "1px solid hsl(20,30%,55%)",
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Marble floor divider */}
            <div
              className="mt-4 h-6 md:h-8 rounded-b-lg max-w-5xl mx-auto"
              style={{
                backgroundImage: `url(${marbleFloor})`,
                backgroundSize: "300px 300px",
                backgroundRepeat: "repeat",
                boxShadow: "inset 0 3px 10px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.08)",
              }}
            />
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
