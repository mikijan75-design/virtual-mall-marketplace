import { mallFloors } from "@/data/mallData";
import { Fragment } from "react";
import MallHeader from "@/components/mall/MallHeader";
import MallCeiling from "@/components/mall/MallCeiling";
import Decorations from "@/components/mall/Decorations";
import FloorMap from "@/components/mall/FloorMap";
import StoreCard from "@/components/mall/StoreCard";
import CenterFeature from "@/components/mall/CenterFeature";
import SaleRibbon from "@/components/mall/SaleRibbon";
import mallWall from "@/assets/mall-wall.jpg";
import marbleFloor from "@/assets/marble-floor.jpg";

const TrashBin = () => (
  <div className="flex flex-col items-center">
    {/* Lid */}
    <div
      className="w-5 h-1 md:w-6 md:h-1.5 rounded-t-md"
      style={{
        background: "linear-gradient(180deg, hsl(210,8%,42%), hsl(210,10%,28%))",
        boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
      }}
    />
    {/* Body */}
    <div
      className="relative w-4 h-6 md:w-5 md:h-8 rounded-b-md overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, hsl(210,10%,55%), hsl(210,12%,32%))",
        boxShadow:
          "0 3px 6px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.15), inset -2px 0 3px rgba(0,0,0,0.25)",
        border: "1px solid hsl(210,12%,28%)",
      }}
    >
      {/* Vertical ridges */}
      <div className="absolute inset-y-1 left-1 w-px bg-black/30" />
      <div className="absolute inset-y-1 left-1/2 w-px bg-black/30" />
      <div className="absolute inset-y-1 right-1 w-px bg-black/30" />
      {/* Recycle label */}
      <div
        className="absolute top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(140,55%,55%), hsl(140,50%,32%))",
          boxShadow: "0 0 2px rgba(0,0,0,0.4)",
        }}
      />
    </div>
  </div>
);

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
        {mallFloors.map((floor, floorIdx) => (
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
              <div className="relative grid grid-cols-3 md:grid-cols-7 gap-3 md:gap-4">
                {floor.stores.map((store, idx) => {
                  // Insert a center feature column between left 3 stores and right 3 stores
                  const centerSlot = idx === 3 ? (
                    <CenterFeature key={`center-${floor.id}`} floorId={floor.id} />
                  ) : null;
                  // Sale ribbon on a couple of stores per floor for visual interest
                  const showSale = (floorIdx === 0 && idx === 0) || (floorIdx === 1 && idx === 3) || (floorIdx === 2 && idx === 5);
                  return (
                  <Fragment key={store.id}>
                  {centerSlot}
                  <div className="relative">
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

                    <StoreCard store={store} storeIndex={idx} />
                    {showSale && <SaleRibbon />}

                    {/* Planter centered in the gap between stores (skip last in each row half) */}
                    {idx % 3 !== 2 && (
                      <div
                        className="absolute bottom-3 z-30 flex flex-col items-center pointer-events-none"
                        style={{ right: "calc(-0.375rem)", transform: "translateX(50%)" }}
                      >
                        {/* Lush fruit tree foliage */}
                        <div className="relative w-8 h-9 md:w-12 md:h-14">
                          {/* Foliage clusters */}
                          <div
                            className="absolute left-1/2 -translate-x-1/2 top-0 w-7 h-7 md:w-11 md:h-11 rounded-full"
                            style={{
                              background:
                                "radial-gradient(ellipse at 35% 25%, hsl(95,55%,55%), hsl(125,45%,30%) 70%, hsl(130,40%,22%))",
                              boxShadow: "0 2px 5px rgba(0,0,0,0.3), inset 0 -2px 4px rgba(0,0,0,0.25)",
                            }}
                          />
                          <div
                            className="absolute -left-0.5 top-1.5 w-4 h-4 md:w-6 md:h-6 rounded-full opacity-90"
                            style={{
                              background:
                                "radial-gradient(ellipse at 40% 30%, hsl(105,50%,50%), hsl(125,42%,28%))",
                            }}
                          />
                          <div
                            className="absolute -right-0.5 top-2 w-4 h-4 md:w-6 md:h-6 rounded-full opacity-90"
                            style={{
                              background:
                                "radial-gradient(ellipse at 60% 30%, hsl(115,48%,48%), hsl(130,42%,26%))",
                            }}
                          />
                          {/* Fruits — alternate orange / strawberry / lemon */}
                          {idx % 3 === 0 && (
                            <>
                              {/* Oranges */}
                              <div className="absolute top-2 left-1.5 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full"
                                style={{ background: "radial-gradient(circle at 35% 30%, hsl(30,100%,68%), hsl(20,95%,48%))", boxShadow: "0 0 2px rgba(0,0,0,0.3)" }} />
                              <div className="absolute top-4 right-2 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full"
                                style={{ background: "radial-gradient(circle at 35% 30%, hsl(32,100%,70%), hsl(22,95%,50%))", boxShadow: "0 0 2px rgba(0,0,0,0.3)" }} />
                              <div className="absolute top-5 left-3 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full"
                                style={{ background: "radial-gradient(circle at 35% 30%, hsl(28,100%,65%), hsl(18,95%,45%))", boxShadow: "0 0 2px rgba(0,0,0,0.3)" }} />
                            </>
                          )}
                          {idx % 3 === 1 && (
                            <>
                              {/* Strawberries */}
                              <div className="absolute top-2.5 left-2 w-1.5 h-2 md:w-2 md:h-2.5 rounded-b-full"
                                style={{ background: "radial-gradient(circle at 35% 25%, hsl(355,90%,68%), hsl(350,85%,42%))", boxShadow: "0 0 2px rgba(0,0,0,0.35)" }} />
                              <div className="absolute top-4 right-1.5 w-1.5 h-2 md:w-2 md:h-2.5 rounded-b-full"
                                style={{ background: "radial-gradient(circle at 35% 25%, hsl(355,90%,65%), hsl(350,85%,40%))", boxShadow: "0 0 2px rgba(0,0,0,0.35)" }} />
                              <div className="absolute top-5 left-3.5 w-1.5 h-2 md:w-2 md:h-2.5 rounded-b-full"
                                style={{ background: "radial-gradient(circle at 35% 25%, hsl(355,92%,70%), hsl(350,85%,45%))", boxShadow: "0 0 2px rgba(0,0,0,0.35)" }} />
                            </>
                          )}
                          {idx % 3 === 2 && (
                            <>
                              {/* Lemons */}
                              <div className="absolute top-2 left-2 w-2 h-1.5 md:w-2.5 md:h-2 rounded-full"
                                style={{ background: "radial-gradient(circle at 35% 30%, hsl(55,100%,75%), hsl(48,95%,52%))", boxShadow: "0 0 2px rgba(0,0,0,0.3)" }} />
                              <div className="absolute top-4.5 right-1.5 w-2 h-1.5 md:w-2.5 md:h-2 rounded-full"
                                style={{ background: "radial-gradient(circle at 35% 30%, hsl(55,100%,72%), hsl(48,95%,50%))", boxShadow: "0 0 2px rgba(0,0,0,0.3)" }} />
                            </>
                          )}
                        </div>
                        {/* Trunk */}
                        <div
                          className="w-1 h-1.5 md:w-1.5 md:h-2 -mt-1"
                          style={{ background: "linear-gradient(180deg, hsl(28,45%,38%), hsl(22,40%,22%))" }}
                        />
                        {/* Pot */}
                        <div
                          className="w-4 h-2.5 md:w-5 md:h-3 rounded-b-md"
                          style={{
                            background:
                              "linear-gradient(180deg, hsl(20,55%,55%), hsl(15,50%,32%))",
                            boxShadow: "0 2px 5px rgba(0,0,0,0.25), inset 0 1px 2px rgba(255,255,255,0.2)",
                            borderTop: "1.5px solid hsl(22,45%,62%)",
                          }}
                        />
                      </div>
                    )}

                    {/* Trash bin where there's no planter — idx 2 (right gap before center) and idx 5 (left gap after last) */}
                    {idx === 2 && (
                      <div
                        className="absolute bottom-3 z-30 flex flex-col items-center pointer-events-none"
                        style={{ right: "calc(-0.375rem)", transform: "translateX(50%)" }}
                      >
                        <TrashBin />
                      </div>
                    )}
                    {idx === 5 && (
                      <div
                        className="absolute bottom-3 z-30 flex flex-col items-center pointer-events-none"
                        style={{ left: "calc(-0.375rem)", transform: "translateX(-50%)" }}
                      >
                        <TrashBin />
                      </div>
                    )}
                  </div>
                  </Fragment>
                  );
                })}
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
