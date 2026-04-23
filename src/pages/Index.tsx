import { mallFloors } from "@/data/mallData";
import MallHeader from "@/components/mall/MallHeader";
import FloorMap from "@/components/mall/FloorMap";
import FloorThreeRow from "@/components/mall/FloorThreeRow";
import MobileMallView from "@/components/mall/MobileMallView";
import CodedMallView from "@/components/mall/CodedMallView";

const Index = () => {
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
        {/* קומות 1 + 2 + כיפה — הכל מקודד CSS/HTML */}
        <CodedMallView floors={[mallFloors[0], mallFloors[1]]} />

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
