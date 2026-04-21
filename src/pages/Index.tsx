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

const GoldColumn = () => (
  <div
    className="absolute top-0 bottom-0 w-[6px] md:w-[8px] z-10 pointer-events-none"
    style={{
      background:
        "linear-gradient(90deg, hsl(43,35%,32%) 0%, hsl(43,70%,72%) 30%, hsl(45,85%,88%) 50%, hsl(43,70%,72%) 70%, hsl(43,35%,32%) 100%)",
      boxShadow:
        "0 0 6px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.5)",
      borderRadius: "2px",
    }}
  >
    {/* Capital top */}
    <div
      className="absolute -top-1 -left-1 -right-1 h-2"
      style={{
        background:
          "linear-gradient(180deg, hsl(43,55%,50%), hsl(43,40%,38%))",
        borderRadius: "2px",
        boxShadow: "0 1px 2px rgba(0,0,0,0.4)",
      }}
    />
    {/* Base bottom */}
    <div
      className="absolute -bottom-1 -left-1 -right-1 h-2"
      style={{
        background:
          "linear-gradient(0deg, hsl(43,55%,50%), hsl(43,40%,38%))",
        borderRadius: "2px",
        boxShadow: "0 -1px 2px rgba(0,0,0,0.4)",
      }}
    />
  </div>
);

const PottedPlant = ({ side }: { side: "left" | "right" }) => (
  <div
    className={`absolute bottom-0 ${side === "left" ? "left-2" : "right-2"} z-20 pointer-events-none`}
    style={{ width: "28px", height: "44px" }}
  >
    {/* Foliage */}
    <div
      className="absolute top-0 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full"
      style={{
        background:
          "radial-gradient(circle at 35% 30%, hsl(120,40%,55%), hsl(130,45%,30%) 70%, hsl(130,50%,20%))",
        boxShadow: "inset -2px -3px 6px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.3)",
      }}
    />
    {/* Pot */}
    <div
      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-4"
      style={{
        background:
          "linear-gradient(180deg, hsl(35,30%,55%), hsl(30,35%,38%))",
        clipPath: "polygon(10% 0%, 90% 0%, 80% 100%, 20% 100%)",
        boxShadow: "inset 0 -2px 3px rgba(0,0,0,0.4)",
      }}
    />
  </div>
);

const CentralGate = ({ label }: { label: string }) => (
  <div className="relative flex flex-col items-center justify-end h-full col-span-1">
    <div className="relative w-full h-full flex flex-col">
      {/* Dark sign with gold text at top */}
      <div
        className="relative mx-auto px-3 md:px-4 py-1.5 rounded text-center whitespace-nowrap z-30 mb-1"
        style={{
          background:
            "linear-gradient(135deg, hsl(220,28%,10%) 0%, hsl(220,22%,18%) 50%, hsl(220,28%,10%) 100%)",
          color: "hsl(43,75%,62%)",
          border: "2px solid hsl(43,55%,48%)",
          boxShadow:
            "0 4px 12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 0 1px hsl(43,40%,30%)",
          fontFamily: "'Frank Ruhl Libre', serif",
          fontWeight: 700,
          fontSize: "clamp(9px, 1.1vw, 13px)",
          letterSpacing: "0.05em",
        }}
      >
        {label}
      </div>

      {/* Arched gateway structure */}
      <div className="relative flex-1 w-full">
        {/* Outer cream/beige arch frame */}
        <div
          className="absolute inset-x-0 bottom-0 top-0"
          style={{
            background:
              "linear-gradient(180deg, hsl(40,30%,88%) 0%, hsl(38,25%,80%) 100%)",
            borderTopLeftRadius: "50% 35%",
            borderTopRightRadius: "50% 35%",
            border: "2px solid hsl(43,45%,55%)",
            boxShadow:
              "0 8px 24px rgba(0,0,0,0.4), inset 0 2px 8px rgba(255,255,255,0.5)",
          }}
        />

        {/* Gold trim band on arch */}
        <div
          className="absolute inset-x-1 top-1 bottom-0 pointer-events-none"
          style={{
            borderTopLeftRadius: "50% 35%",
            borderTopRightRadius: "50% 35%",
            border: "2px solid transparent",
            borderImage:
              "linear-gradient(180deg, hsl(43,70%,65%), hsl(43,45%,42%)) 1",
            background:
              "linear-gradient(180deg, transparent 0%, transparent 75%, rgba(0,0,0,0.05) 100%)",
          }}
        />

        {/* Inner archway opening (recessed dark) */}
        <div
          className="absolute"
          style={{
            inset: "12% 18% 0 18%",
            background:
              "linear-gradient(180deg, hsl(35,18%,55%) 0%, hsl(30,15%,32%) 55%, hsl(28,18%,20%) 100%)",
            borderTopLeftRadius: "50% 40%",
            borderTopRightRadius: "50% 40%",
            boxShadow:
              "inset 0 8px 22px rgba(0,0,0,0.8), inset 0 -3px 8px rgba(255,255,255,0.1)",
          }}
        >
          {/* Warm interior glow */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 90%, rgba(255,210,140,0.55), transparent 70%)",
              borderTopLeftRadius: "50% 40%",
              borderTopRightRadius: "50% 40%",
            }}
          />
        </div>

        {/* Gold side columns of the gate */}
        <div
          className="absolute left-[10%] top-[10%] bottom-0 w-[5px]"
          style={{
            background:
              "linear-gradient(90deg, hsl(43,40%,38%), hsl(43,75%,75%) 50%, hsl(43,40%,38%))",
            boxShadow: "0 0 4px rgba(0,0,0,0.4)",
            borderRadius: "2px",
          }}
        />
        <div
          className="absolute right-[10%] top-[10%] bottom-0 w-[5px]"
          style={{
            background:
              "linear-gradient(90deg, hsl(43,40%,38%), hsl(43,75%,75%) 50%, hsl(43,40%,38%))",
            boxShadow: "0 0 4px rgba(0,0,0,0.4)",
            borderRadius: "2px",
          }}
        />

        {/* Keystone */}
        <div
          className="absolute top-[8%] left-1/2 -translate-x-1/2 w-6 h-3 z-10"
          style={{
            background:
              "linear-gradient(180deg, hsl(43,80%,72%), hsl(43,50%,40%))",
            clipPath: "polygon(20% 100%, 80% 100%, 100% 0%, 0% 0%)",
            boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
          }}
        />

        {/* Potted plants at gate entrance */}
        <PottedPlant side="left" />
        <PottedPlant side="right" />
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
