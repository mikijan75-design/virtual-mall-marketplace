import { useNavigate } from "react-router-dom";
import { mallFloors } from "@/data/mallData";
import MallHeader from "@/components/mall/MallHeader";
import FloorMap from "@/components/mall/FloorMap";
import FloorThreeRow from "@/components/mall/FloorThreeRow";
import MobileMallView from "@/components/mall/MobileMallView";
import FloorOneTwoRow from "@/components/mall/FloorOneTwoRow";
import referenceMall from "@/assets/reference-mall-exact.png";

// Floor 1 + 2 storefronts overlay zones (percentage of the background image)
const floorOneZone = { top: 45.25, height: 22.5 };
const floorTwoZone = { top: 73.88, height: 23.7 };

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

          {/* Floor 1 storefronts overlay */}
          <div
            className="absolute left-0 right-0"
            style={{ top: `${floorOneZone.top}%`, height: `${floorOneZone.height}%` }}
          >
            <FloorOneTwoRow stores={mallFloors[0].stores} />
          </div>

          {/* Floor 2 storefronts overlay */}
          <div
            className="absolute left-0 right-0"
            style={{ top: `${floorTwoZone.top}%`, height: `${floorTwoZone.height}%` }}
          >
            <FloorOneTwoRow stores={mallFloors[1].stores} />
          </div>

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
