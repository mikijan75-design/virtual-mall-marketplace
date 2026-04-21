import { mallFloors } from "@/data/mallData";
import MallHeader from "@/components/mall/MallHeader";
import MallCeiling from "@/components/mall/MallCeiling";
import Decorations from "@/components/mall/Decorations";
import FloorMap from "@/components/mall/FloorMap";
import StoreCard from "@/components/mall/StoreCard";
import mallWall from "@/assets/mall-wall.jpg";
import marbleFloor from "@/assets/marble-floor.jpg";

const CeilingLight = () => (
  <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none">
    <div
      className="w-5 h-2 md:w-6 md:h-2.5 rounded-b-full"
      style={{
        background: "linear-gradient(180deg, hsl(40,10%,75%), hsl(40,8%,88%))",
        boxShadow: "0 1px 4px rgba(0,0,0,0.15), 0 0 8px rgba(255,250,230,0.6)",
        border: "1px solid hsl(40,12%,70%)",
      }}
    />
    <div
      className="w-2 h-1 md:w-2.5 md:h-1.5 rounded-b-full -mt-0.5"
      style={{
        background:
          "radial-gradient(ellipse, rgba(255,250,220,0.95), rgba(255,245,200,0.5))",
        boxShadow: "0 0 6px 3px rgba(255,250,220,0.4)",
      }}
    />
    <div
      className="w-10 h-14 md:w-14 md:h-20"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,250,230,0.22) 0%, rgba(255,250,230,0.06) 50%, transparent 100%)",
        clipPath: "polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%)",
      }}
    />
  </div>
);

const CentralGate = ({ label }: { label: string }) => (
  <div className="relative flex items-end justify-center">
    <div className="relative w-full" style={{ aspectRatio: "1 / 1.45" }}>
      {/* Outer gold arch */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, hsl(43,60%,58%) 0%, hsl(43,45%,38%) 100%)",
          borderTopLeftRadius: "100%",
          borderTopRightRadius: "100%",
          boxShadow:
            "0 10px 28px rgba(0,0,0,0.5), inset 0 2px 6px rgba(255,255,255,0.4), inset 0 -4px 10px rgba(0,0,0,0.3)",
        }}
      />
      {/* Inner archway recess */}
      <div
        className="absolute"
        style={{
          inset: "10% 10% 0 10%",
          background:
            "linear-gradient(180deg, hsl(35,15%,55%) 0%, hsl(30,12%,28%) 60%, hsl(30,15%,18%) 100%)",
          borderTopLeftRadius: "100%",
          borderTopRightRadius: "100%",
          boxShadow:
            "inset 0 8px 22px rgba(0,0,0,0.75), inset 0 -2px 6px rgba(255,255,255,0.08)",
        }}
      >
        {/* Warm light glow from inside */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 95%, rgba(255,220,160,0.5), transparent 65%)",
          }}
        />
      </div>
      {/* Keystone */}
      <div
        className="absolute -top-1 left-1/2 -translate-x-1/2 w-7 h-3.5 z-10"
        style={{
          background: "linear-gradient(180deg, hsl(43,75%,65%), hsl(43,45%,35%))",
          clipPath: "polygon(20% 100%, 80% 100%, 100% 0%, 0% 0%)",
          boxShadow: "0 2px 6px rgba(0,0,0,0.5)",
        }}
      />
      {/* Floor sign hanging in the gate */}
      <div
        className="absolute left-1/2 -translate-x-1/2 px-2 md:px-3 py-1 rounded text-center whitespace-nowrap z-10"
        style={{
          top: "38%",
          background:
            "linear-gradient(135deg, hsl(220,20%,12%), hsl(220,18%,20%))",
          color: "hsl(43,72%,58%)",
          border: "1.5px solid hsl(43,55%,45%)",
          boxShadow: "0 4px 14px rgba(0,0,0,0.55)",
          fontFamily: "'Frank Ruhl Libre', serif",
          fontWeight: 700,
          fontSize: "clamp(8px, 1vw, 12px)",
          letterSpacing: "0.04em",
        }}
      >
        {label}
      </div>
    </div>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <MallHeader />

      <div
        className="pt-4 pb-0 relative"
        style={{
          backgroundImage: `url(${mallWall})`,
          backgroundSize: "400px 400px",
          backgroundRepeat: "repeat",
          boxShadow: "inset 0 0 140px rgba(0,0,0,0.4)",
        }}
      >
        <MallCeiling />

        {mallFloors.map((floor, floorIdx) => (
          <div key={floor.id} id={`floor-${floor.id}`} className="mb-1 relative">
            <div className="max-w-6xl mx-auto px-2 md:px-4">
              {/* Architectural arched frame around the floor */}
              <div
                className="relative pt-6 pb-4 px-3 md:px-6"
                style={{
                  background:
                    "linear-gradient(180deg, hsl(35,28%,84%) 0%, hsl(35,22%,76%) 100%)",
                  borderTopLeftRadius: floorIdx === 0 ? "0" : "100px",
                  borderTopRightRadius: floorIdx === 0 ? "0" : "100px",
                  border: "4px solid hsl(43,50%,42%)",
                  borderTop:
                    floorIdx === 0 ? "none" : "4px solid hsl(43,55%,45%)",
                  boxShadow:
                    "0 18px 42px rgba(0,0,0,0.45), inset 0 4px 18px rgba(255,255,255,0.45), inset 0 -10px 28px rgba(0,0,0,0.22), inset 10px 0 22px rgba(0,0,0,0.18), inset -10px 0 22px rgba(0,0,0,0.18)",
                }}
              >
                {/* Marble entry path */}
                <div className="px-2 mb-2">
                  <div
                    className="h-4 md:h-5 rounded-t-sm mx-4"
                    style={{
                      backgroundImage: `url(${marbleFloor})`,
                      backgroundSize: "200px 200px",
                      backgroundRepeat: "repeat",
                      boxShadow:
                        "inset 0 2px 6px rgba(255,255,255,0.4), inset 0 -1px 3px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.1)",
                    }}
                  />
                </div>

                {/* Stores grid with central gate */}
                <div className="px-1">
                  <div className="relative grid grid-cols-7 gap-1.5 md:gap-2.5 items-end">
                    {floor.stores.slice(0, 3).map((store, idx) => (
                      <div key={store.id} className="relative">
                        <CeilingLight />
                        <StoreCard store={store} storeIndex={idx} />
                      </div>
                    ))}

                    <CentralGate label={floor.name} />

                    {floor.stores.slice(3, 6).map((store, idx) => (
                      <div key={store.id} className="relative">
                        <CeilingLight />
                        <StoreCard store={store} storeIndex={idx + 3} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Marble floor */}
                <div
                  className="mt-3 h-7 md:h-10 rounded-b-md"
                  style={{
                    backgroundImage: `url(${marbleFloor})`,
                    backgroundSize: "300px 300px",
                    backgroundRepeat: "repeat",
                    boxShadow:
                      "inset 0 4px 14px rgba(0,0,0,0.28), inset 0 -2px 6px rgba(255,255,255,0.3), 0 4px 10px rgba(0,0,0,0.22)",
                  }}
                />
              </div>
            </div>
          </div>
        ))}

        <Decorations />
      </div>

      <FloorMap
        floors={mallFloors}
        activeFloor={1}
        onFloorChange={(floorId) => {
          document
            .getElementById(`floor-${floorId}`)
            ?.scrollIntoView({ behavior: "smooth" });
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
