import { useState } from "react";
import { mallFloors } from "@/data/mallData";
import MallHeader from "@/components/mall/MallHeader";
import MallCeiling from "@/components/mall/MallCeiling";
import FloorSelector from "@/components/mall/FloorSelector";
import MallFloor from "@/components/mall/MallFloor";
import Decorations from "@/components/mall/Decorations";
import FloorMap from "@/components/mall/FloorMap";

const Index = () => {
  const [activeFloor, setActiveFloor] = useState(1);

  return (
    <div className="min-h-screen bg-background">
      <MallHeader />
      
      {/* Mall Building */}
      <div className="bg-mall-wall pt-4 pb-0">
        <MallCeiling />

        <FloorSelector
          floors={mallFloors}
          activeFloor={activeFloor}
          onFloorChange={setActiveFloor}
        />

        {mallFloors.map((floor) => (
          <MallFloor
            key={floor.id}
            floor={floor}
            isActive={floor.id === activeFloor}
          />
        ))}

        <Decorations />
      </div>

      {/* Floor Map section */}
      <FloorMap
        floors={mallFloors}
        activeFloor={activeFloor}
        onFloorChange={(floorId) => {
          setActiveFloor(floorId);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />

      {/* Footer */}
      <footer className="bg-mall-sign text-primary-foreground py-8 text-center font-heebo">
        <p className="text-mall-gold font-frank text-xl mb-2">הקניון הווירטואלי</p>
        <p className="text-sm text-muted-foreground">© 2026 כל הזכויות שמורות</p>
      </footer>
    </div>
  );
};

export default Index;
