import { useNavigate } from "react-router-dom";
import { mallFloors } from "@/data/mallData";
import MallHeader from "@/components/mall/MallHeader";
import FloorMap from "@/components/mall/FloorMap";
import StoreCard from "@/components/mall/StoreCard";
import referenceMall from "@/assets/reference-mall-exact.png";

const storeHotspots = [
  { id: "s6", left: 2.6, top: 38.5, width: 11.8, height: 22.5 },
  { id: "s5", left: 17.0, top: 38.5, width: 11.4, height: 22.5 },
  { id: "s4", left: 30.5, top: 38.5, width: 12.2, height: 22.5 },
  { id: "s3", left: 58.7, top: 38.5, width: 12.2, height: 22.5 },
  { id: "s2", left: 73.3, top: 38.5, width: 11.8, height: 22.5 },
  { id: "s1", left: 87.1, top: 38.5, width: 11.2, height: 22.5 },
  { id: "s12", left: 2.6, top: 64.4, width: 11.8, height: 23.7 },
  { id: "s11", left: 17.0, top: 64.4, width: 11.4, height: 23.7 },
  { id: "s10", left: 30.5, top: 64.4, width: 12.2, height: 23.7 },
  { id: "s9", left: 58.7, top: 64.4, width: 12.2, height: 23.7 },
  { id: "s8", left: 73.3, top: 64.4, width: 11.8, height: 23.7 },
  { id: "s7", left: 87.1, top: 64.4, width: 11.2, height: 23.7 },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <MallHeader />

      <main
        className="relative bg-background py-0 overflow-x-auto"
        aria-label="מבנה הקניון הווירטואלי"
      >
        <div className="relative mx-auto w-full max-w-[1630px] min-w-[900px]">
          <img
            src={referenceMall}
            alt="מבנה קניון וירטואלי עם כיפת פרסקו, חנויות ושער מרכזי"
            className="block w-full h-auto select-none"
            width={1630}
            height={640}
            draggable={false}
          />

          {storeHotspots.map((hotspot) => (
            <button
              key={hotspot.id}
              type="button"
              aria-label={`כניסה לחנות ${hotspot.id}`}
              className="absolute focus:outline-none focus-visible:ring-2 focus-visible:ring-mall-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              style={{
                left: `${hotspot.left}%`,
                top: `${hotspot.top}%`,
                width: `${hotspot.width}%`,
                height: `${hotspot.height}%`,
              }}
              onClick={() => navigate(`/store/${hotspot.id}`)}
            />
          ))}

          <section
            id="floor-3"
            aria-label="קומה 3 - קומת המזון"
            className="relative bg-mall-wall -mt-px"
          >
            {/* שלט קטן ממורכז כמו בקומות 1-2 */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="bg-mall-sign px-8 py-1.5 rounded-sm border border-mall-gold/70 shadow-md">
                <h2 className="font-frank text-mall-gold text-base md:text-lg tracking-widest">
                  קומה 3 — קומת המזון
                </h2>
              </div>
            </div>

            {/* גריד 7 עמודות: 3 חנויות | מדרגות | 3 חנויות */}
            <div className="grid grid-cols-7 gap-2 px-4 pb-4 items-stretch">
              {mallFloors[2].stores.slice(0, 3).map((store, idx) => (
                <StoreCard key={store.id} store={store} storeIndex={idx} />
              ))}

              {/* כניסה מרכזית עם מדרגות */}
              <div className="flex flex-col items-center justify-end relative">
                <div className="w-full flex-1 flex items-center justify-center bg-gradient-to-b from-mall-wall to-[hsl(30,12%,38%)] rounded-t-[40%] border-x-4 border-t-4 border-mall-gold/60 relative overflow-hidden">
                  <div className="absolute inset-x-2 top-2 bottom-0 bg-gradient-to-b from-[hsl(30,15%,25%)] to-[hsl(30,20%,15%)] rounded-t-[40%]" />
                  <span className="relative font-frank text-mall-gold text-2xl md:text-3xl mb-4">↑</span>
                </div>
                {/* מדרגות */}
                <div className="w-full flex flex-col">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-2 border-t border-mall-gold/30"
                      style={{
                        background: `hsl(35, ${10 + i * 2}%, ${55 - i * 5}%)`,
                        marginInline: `${i * 4}px`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {mallFloors[2].stores.slice(3, 6).map((store, idx) => (
                <StoreCard key={store.id} store={store} storeIndex={idx + 3} />
              ))}
            </div>

            <div className="h-4 bg-gradient-to-b from-mall-trim to-mall-floor border-t-2 border-mall-gold/40" />
          </section>
        </div>
      </main>

      <FloorMap
        floors={mallFloors}
        activeFloor={1}
        onFloorChange={(floorId) => {
          const targetTop = floorId === 1 ? 0 : floorId === 2 ? 0.56 : 0.78;
          window.scrollTo({
            top: document.body.scrollHeight * targetTop,
            behavior: "smooth",
          });
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
