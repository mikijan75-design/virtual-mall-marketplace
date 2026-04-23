import { useNavigate } from "react-router-dom";
import { mallFloors } from "@/data/mallData";
import MallHeader from "@/components/mall/MallHeader";
import FloorMap from "@/components/mall/FloorMap";
import FloorThreeRow from "@/components/mall/FloorThreeRow";
import MobileMallView from "@/components/mall/MobileMallView";
import referenceMall from "@/assets/reference-mall-exact.png";

const storeHotspots = [
  { id: "s6", left: 2.6, top: 45.25, width: 11.8, height: 22.5 },
  { id: "s5", left: 17.0, top: 45.25, width: 11.4, height: 22.5 },
  { id: "s4", left: 30.5, top: 45.25, width: 12.2, height: 22.5 },
  { id: "s3", left: 58.7, top: 45.25, width: 12.2, height: 22.5 },
  { id: "s2", left: 73.3, top: 45.25, width: 11.8, height: 22.5 },
  { id: "s1", left: 87.1, top: 45.25, width: 11.2, height: 22.5 },
  { id: "s12", left: 2.6, top: 73.88, width: 11.8, height: 23.7 },
  { id: "s11", left: 17.0, top: 73.88, width: 11.4, height: 23.7 },
  { id: "s10", left: 30.5, top: 73.88, width: 12.2, height: 23.7 },
  { id: "s9", left: 58.7, top: 73.88, width: 12.2, height: 23.7 },
  { id: "s8", left: 73.3, top: 73.88, width: 11.8, height: 23.7 },
  { id: "s7", left: 87.1, top: 73.88, width: 11.2, height: 23.7 },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <MallHeader />

      {/* Mobile view */}
      <MobileMallView floors={mallFloors} />

      {/* Desktop view */}
      <div className="hidden md:block">
      <main
        className="relative bg-background py-0 overflow-x-auto"
        aria-label="מבנה הקניון הווירטואלי"
      >
        <div
          className="relative mx-auto w-full max-w-[1630px] min-w-[900px]"
          style={{ aspectRatio: "1630 / 883" }}
        >
          <img
            src={referenceMall}
            alt="מבנה קניון וירטואלי עם כיפת פרסקו, חנויות ושער מרכזי"
            className="block w-full h-full select-none"
            width={1630}
            height={883}
            draggable={false}
            style={{ objectFit: "fill" }}
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

        </div>

        {/* קומה 3 — חיבור מדויק למבנה העליון */}
        <div
          className="mx-auto w-full max-w-[1630px] min-w-[900px] -mt-px"
          style={{ transform: "scaleY(1.38)", transformOrigin: "top center", paddingBottom: "6%" }}
        >
          <FloorThreeRow stores={mallFloors[2].stores} />
        </div>
      </main>
      </div>

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
