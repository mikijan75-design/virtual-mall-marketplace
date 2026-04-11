import { useNavigate } from "react-router-dom";
import type { Store } from "@/data/mallData";

interface StoreCardProps {
  store: Store;
}

const StoreCard = ({ store }: StoreCardProps) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/store/${store.id}`)}
      className="group relative flex flex-col w-full cursor-pointer transition-all duration-300 hover:scale-[1.02] focus:outline-none"
      aria-label={`כניסה לחנות ${store.name}`}
    >
      <div className="relative flex flex-col w-full">

        {/* Top marble cornice */}
        <div className="h-2.5 rounded-t-sm"
          style={{
            background: "linear-gradient(180deg, hsl(40,15%,88%) 0%, hsl(38,12%,78%) 50%, hsl(36,10%,72%) 100%)",
            boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
          }}
        />

        {/* Sign board - dark elegant */}
        <div className="relative z-10 py-2.5 px-2 text-center"
          style={{
            background: "linear-gradient(180deg, hsl(220,12%,15%) 0%, hsl(220,10%,10%) 100%)",
            borderLeft: "2px solid hsl(40,20%,70%)",
            borderRight: "2px solid hsl(40,20%,70%)",
          }}
        >
          {/* Subtle top light */}
          <div className="absolute top-0 left-[15%] right-[15%] h-[1px]"
            style={{ background: "linear-gradient(90deg, transparent, hsl(40,30%,70%), transparent)" }}
          />
          <span className="font-heebo font-bold text-[10px] md:text-xs lg:text-sm truncate block tracking-wider"
            style={{ color: "hsl(40,25%,80%)", letterSpacing: "0.05em" }}
          >
            {store.name}
          </span>
        </div>

        {/* Thin gold separator */}
        <div className="h-[3px]"
          style={{ background: "linear-gradient(90deg, hsl(40,20%,65%), hsl(43,40%,65%), hsl(40,20%,65%))" }}
        />

        {/* Main display window */}
        <div className="relative flex-1 min-h-[95px] md:min-h-[130px]"
          style={{
            background: "linear-gradient(180deg, hsl(40,8%,95%) 0%, hsl(40,6%,90%) 100%)",
            borderLeft: "2px solid hsl(40,15%,72%)",
            borderRight: "2px solid hsl(40,15%,72%)",
          }}
        >
          {/* Inner shadow frame */}
          <div className="absolute inset-[3px]"
            style={{
              boxShadow: "inset 0 2px 10px rgba(0,0,0,0.06), inset 0 -1px 6px rgba(0,0,0,0.03)",
              border: "1px solid hsl(40,10%,85%)",
            }}
          />

          {/* Glass reflection - subtle diagonal */}
          <div className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(155deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.2) 25%, transparent 50%)",
            }}
          />

          {/* Display content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full py-4 gap-2">
            <span className="text-2xl md:text-3xl lg:text-4xl group-hover:scale-110 transition-transform duration-500"
              style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.1))" }}
            >
              {store.logoEmoji}
            </span>
            <span className="text-[8px] md:text-[10px] font-heebo tracking-widest uppercase"
              style={{ color: "hsl(220,8%,50%)" }}
            >
              {store.category}
            </span>
          </div>

          {/* Hover warm glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center 60%, rgba(218,195,150,0.12) 0%, transparent 70%)" }}
          />
        </div>

        {/* Bottom threshold - marble */}
        <div className="h-2"
          style={{
            background: "linear-gradient(180deg, hsl(38,10%,70%) 0%, hsl(36,8%,62%) 100%)",
            borderLeft: "2px solid hsl(40,15%,72%)",
            borderRight: "2px solid hsl(40,15%,72%)",
          }}
        />

        {/* Entrance area */}
        <div className="flex justify-center"
          style={{ background: "hsl(38,8%,68%)", padding: "0 2px" }}
        >
          <div className="w-[55%] pt-1 pb-1.5 flex flex-col items-center rounded-t-md relative"
            style={{
              background: "linear-gradient(180deg, hsl(220,8%,14%) 0%, hsl(220,6%,10%) 100%)",
              border: "1.5px solid hsl(40,15%,55%)",
              borderBottom: "none",
            }}
          >
            {/* Arch top */}
            <div className="absolute -top-[1px] left-[10%] right-[10%] h-1 rounded-t-full"
              style={{ background: "hsl(40,15%,55%)" }}
            />
            {/* Door handle */}
            <div className="w-[3px] h-2.5 md:h-3 rounded-full mt-0.5"
              style={{ background: "linear-gradient(180deg, hsl(43,45%,68%), hsl(43,35%,50%))" }}
            />
            <span className="text-[6px] md:text-[8px] font-heebo opacity-0 group-hover:opacity-100 transition-opacity tracking-wider"
              style={{ color: "hsl(40,20%,65%)" }}
            >
              כניסה
            </span>
          </div>
        </div>

        {/* Base */}
        <div className="h-1.5 rounded-b-sm"
          style={{ background: "linear-gradient(180deg, hsl(35,8%,58%) 0%, hsl(35,6%,48%) 100%)" }}
        />
      </div>
    </button>
  );
};

export default StoreCard;
