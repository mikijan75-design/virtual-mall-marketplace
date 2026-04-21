import { Floor } from "@/data/mallData";
import StoreCard from "./StoreCard";

interface MallFloorRowProps {
  floor: Floor;
  isLast: boolean;
}

const GoldColumn = () => (
  <div
    className="absolute top-0 bottom-0 w-[5px] md:w-[7px] z-10 pointer-events-none"
    style={{
      background:
        "linear-gradient(90deg, hsl(43,40%,30%) 0%, hsl(43,72%,70%) 35%, hsl(45,90%,90%) 50%, hsl(43,72%,70%) 65%, hsl(43,40%,30%) 100%)",
      boxShadow:
        "0 0 4px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.6)",
      borderRadius: "1px",
    }}
  >
    {/* Capital (top decoration) */}
    <div
      className="absolute -top-1.5 -left-1 -right-1 h-2"
      style={{
        background:
          "linear-gradient(180deg, hsl(43,60%,55%), hsl(43,40%,32%))",
        borderRadius: "1px",
        boxShadow: "0 1px 2px rgba(0,0,0,0.5)",
      }}
    />
    {/* Base (bottom decoration) */}
    <div
      className="absolute -bottom-1.5 -left-1 -right-1 h-2"
      style={{
        background:
          "linear-gradient(0deg, hsl(43,60%,55%), hsl(43,40%,32%))",
        borderRadius: "1px",
        boxShadow: "0 -1px 2px rgba(0,0,0,0.5)",
      }}
    />
  </div>
);

const PottedTree = () => (
  <div className="relative" style={{ width: "20px", height: "32px" }}>
    {/* Foliage ball */}
    <div
      className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full"
      style={{
        background:
          "radial-gradient(circle at 35% 30%, hsl(120,45%,55%), hsl(135,50%,28%) 70%, hsl(135,55%,18%))",
        boxShadow: "inset -1px -2px 4px rgba(0,0,0,0.5), 0 1px 3px rgba(0,0,0,0.3)",
      }}
    />
    {/* Pot */}
    <div
      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3"
      style={{
        background:
          "linear-gradient(180deg, hsl(35,30%,55%), hsl(30,35%,35%))",
        clipPath: "polygon(15% 0%, 85% 0%, 75% 100%, 25% 100%)",
        boxShadow: "inset 0 -1px 2px rgba(0,0,0,0.5)",
      }}
    />
  </div>
);

const CentralGate = () => (
  <div className="relative w-full h-full flex flex-col">
    {/* Gate area takes the full row height below the sign */}
    <div className="relative flex-1 w-full">
      {/* Decorative outer arch frame (cream/beige) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, hsl(40,30%,90%) 0%, hsl(38,25%,82%) 100%)",
          borderTopLeftRadius: "30% 22%",
          borderTopRightRadius: "30% 22%",
          border: "1.5px solid hsl(43,55%,50%)",
          boxShadow:
            "inset 0 2px 8px rgba(255,255,255,0.6), inset 0 -2px 6px rgba(0,0,0,0.1), 0 4px 12px rgba(0,0,0,0.25)",
        }}
      />

      {/* Inner decorative thin gold line */}
      <div
        className="absolute inset-2 pointer-events-none"
        style={{
          borderTopLeftRadius: "30% 22%",
          borderTopRightRadius: "30% 22%",
          border: "1px solid hsl(43,50%,55%)",
          opacity: 0.7,
        }}
      />

      {/* Inner archway opening — DARK like reference */}
      <div
        className="absolute"
        style={{
          inset: "30% 28% 0 28%",
          background:
            "linear-gradient(180deg, hsl(30,12%,38%) 0%, hsl(28,15%,25%) 60%, hsl(28,18%,18%) 100%)",
          borderTopLeftRadius: "50% 45%",
          borderTopRightRadius: "50% 45%",
          boxShadow:
            "inset 0 6px 18px rgba(0,0,0,0.85), inset 0 -2px 6px rgba(255,255,255,0.08)",
        }}
      >
        {/* Warm interior glow at bottom */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 95%, rgba(255,210,140,0.4), transparent 65%)",
            borderTopLeftRadius: "50% 45%",
            borderTopRightRadius: "50% 45%",
          }}
        />
      </div>

      {/* Two potted trees flanking the gate */}
      <div className="absolute bottom-0 left-[18%] z-20">
        <PottedTree />
      </div>
      <div className="absolute bottom-0 right-[18%] z-20">
        <PottedTree />
      </div>
    </div>
  </div>
);

const MallFloorRow = ({ floor, isLast }: MallFloorRowProps) => {
  return (
    <div id={`floor-${floor.id}`} className="relative">
      <div className="max-w-6xl mx-auto">
        {/* Cream wall background for the floor */}
        <div
          className="relative px-2 md:px-3 pt-9 md:pt-11 pb-0"
          style={{
            background:
              "linear-gradient(180deg, hsl(38,25%,86%) 0%, hsl(35,20%,80%) 100%)",
            borderLeft: "3px solid hsl(43,50%,42%)",
            borderRight: "3px solid hsl(43,50%,42%)",
          }}
        >
          {/* Dark floor sign across the top — full width */}
          <div
            className="absolute top-1.5 left-3 right-3 md:left-4 md:right-4 h-7 md:h-8 flex items-center justify-center rounded-sm z-30"
            style={{
              background:
                "linear-gradient(180deg, hsl(220,28%,14%) 0%, hsl(220,22%,20%) 50%, hsl(220,28%,12%) 100%)",
              border: "2px solid hsl(43,55%,48%)",
              boxShadow:
                "0 4px 12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.12), 0 0 0 1px hsl(43,38%,28%)",
            }}
          >
            <span
              className="text-center whitespace-nowrap"
              style={{
                color: "hsl(43,75%,62%)",
                fontFamily: "'Frank Ruhl Libre', serif",
                fontWeight: 700,
                fontSize: "clamp(11px, 1.3vw, 16px)",
                letterSpacing: "0.05em",
              }}
            >
              {floor.name}
            </span>
          </div>

          {/* Stores grid with central gate */}
          <div className="relative grid grid-cols-7 gap-2 md:gap-2.5 items-stretch">
            {floor.stores.slice(0, 3).map((store, idx) => (
              <div key={store.id} className="relative">
                <StoreCard store={store} storeIndex={idx} />
                {/* Gold column on the inner side */}
                <div className="absolute -right-1.5 md:-right-2 top-0 bottom-0">
                  <GoldColumn />
                </div>
              </div>
            ))}

            <div className="relative">
              <CentralGate />
            </div>

            {floor.stores.slice(3, 6).map((store, idx) => (
              <div key={store.id} className="relative">
                <StoreCard store={store} storeIndex={idx + 3} />
                {idx > 0 && (
                  <div className="absolute -left-1.5 md:-left-2 top-0 bottom-0">
                    <GoldColumn />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Marble floor strip at the bottom */}
          <div
            className="mt-1 h-3 md:h-4"
            style={{
              background:
                "linear-gradient(180deg, hsl(35,18%,72%) 0%, hsl(35,15%,62%) 50%, hsl(35,18%,55%) 100%)",
              boxShadow:
                "inset 0 2px 6px rgba(255,255,255,0.4), inset 0 -1px 3px rgba(0,0,0,0.3)",
              borderBottom: isLast
                ? "3px solid hsl(43,50%,42%)"
                : "1px solid hsl(43,45%,38%)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MallFloorRow;
