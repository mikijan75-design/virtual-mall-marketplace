import { mallFloors } from "@/data/mallData";
import MallHeader from "@/components/mall/MallHeader";
import FloorMap from "@/components/mall/FloorMap";
import CrossSectionMallScene from "@/components/mall/CrossSectionMallScene";
import MeasurementRulers from "@/components/MeasurementRulers";
import { TICK_BAND_PX } from "@/components/MeasurementRulers.constants";

const Index = () => {
  return (
    <div
      className="bg-background relative overflow-x-hidden"
      style={{
        // Reserve space for the bottom ruler so it never overlaps content,
        // and the rulers (absolute) span exactly this wrapper.
        paddingBottom: TICK_BAND_PX,
        paddingLeft: TICK_BAND_PX,
      }}
    >
      <MeasurementRulers />
      <MallHeader />
      <CrossSectionMallScene floors={mallFloors} />

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
