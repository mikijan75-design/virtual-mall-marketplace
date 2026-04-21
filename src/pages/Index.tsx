import { mallFloors } from "@/data/mallData";
import MallHeader from "@/components/mall/MallHeader";
import MallCeiling from "@/components/mall/MallCeiling";
import MallFloorRow from "@/components/mall/MallFloorRow";
import FloorMap from "@/components/mall/FloorMap";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <MallHeader />

      {/* Outer mall background — soft grey like the reference */}
      <div
        className="relative pb-8"
        style={{
          background:
            "linear-gradient(180deg, hsl(35,6%,68%) 0%, hsl(35,8%,74%) 40%, hsl(35,10%,78%) 100%)",
        }}
      >
        {/* Dome ceiling with fresco */}
        <MallCeiling />

        {/* Floors stack — directly attached to the dome */}
        <div className="relative -mt-1">
          {mallFloors.map((floor, idx) => (
            <MallFloorRow
              key={floor.id}
              floor={floor}
              isLast={idx === mallFloors.length - 1}
            />
          ))}
        </div>
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
