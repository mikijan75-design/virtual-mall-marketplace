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
      className="group relative flex flex-col w-full cursor-pointer transition-all duration-300 hover:scale-[1.03] focus:outline-none"
      aria-label={`כניסה לחנות ${store.name}`}
    >
      {/* === Storefront Frame === */}
      <div className="relative flex flex-col w-full">

        {/* Top cornice / molding */}
        <div className="relative z-20 h-2 rounded-t-sm"
          style={{
            background: "linear-gradient(180deg, hsl(35,20%,75%) 0%, hsl(35,15%,65%) 40%, hsl(35,20%,72%) 100%)",
            boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
          }}
        />

        {/* Sign board */}
        <div className="relative z-10 py-2 px-1 text-center"
          style={{
            background: "linear-gradient(180deg, hsl(30,10%,18%) 0%, hsl(25,8%,12%) 100%)",
            borderLeft: "3px solid hsl(35,15%,60%)",
            borderRight: "3px solid hsl(35,15%,60%)",
          }}
        >
          {/* Sign light glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 rounded-b-full opacity-60"
            style={{ background: "radial-gradient(ellipse, hsl(45,80%,75%) 0%, transparent 80%)" }}
          />
          <span className="font-heebo font-bold text-[10px] md:text-xs lg:text-sm truncate block"
            style={{ color: "hsl(45,70%,75%)", textShadow: "0 0 8px rgba(218,185,100,0.4)" }}
          >
            {store.name}
          </span>
        </div>

        {/* Awning / canopy */}
        <div className="relative z-10 h-3 md:h-4"
          style={{
            background: "repeating-linear-gradient(90deg, hsl(350,50%,40%) 0px, hsl(350,50%,40%) 8px, hsl(0,60%,95%) 8px, hsl(0,60%,95%) 16px)",
            borderBottom: "2px solid hsl(350,30%,35%)",
            clipPath: "polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)",
          }}
        />

        {/* Main shop window area */}
        <div className="relative flex-1 min-h-[90px] md:min-h-[120px]"
          style={{
            borderLeft: "5px solid hsl(35,15%,55%)",
            borderRight: "5px solid hsl(35,15%,55%)",
            borderBottom: "5px solid hsl(35,15%,50%)",
          }}
        >
          {/* Window frame inner border */}
          <div className="absolute inset-0"
            style={{
              border: "2px solid hsl(35,20%,65%)",
              boxShadow: "inset 0 0 15px rgba(0,0,0,0.15)",
            }}
          />

          {/* Glass window background */}
          <div className="absolute inset-0"
            style={{
              background: "linear-gradient(170deg, hsl(210,20%,92%) 0%, hsl(200,15%,85%) 30%, hsl(210,10%,80%) 70%, hsl(200,15%,75%) 100%)",
            }}
          />

          {/* Glass reflection */}
          <div className="absolute inset-0 pointer-events-none opacity-50"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 20%, transparent 45%, rgba(255,255,255,0.1) 80%, rgba(255,255,255,0.3) 100%)",
            }}
          />

          {/* Window divider (vertical mullion) */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[3px]"
            style={{ background: "linear-gradient(180deg, hsl(35,15%,60%), hsl(35,10%,50%))" }}
          />

          {/* Horizontal mullion */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-[3px]"
            style={{ background: "linear-gradient(90deg, hsl(35,15%,60%), hsl(35,10%,50%), hsl(35,15%,60%))" }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full py-3 gap-1.5">
            <span className="text-2xl md:text-3xl lg:text-4xl drop-shadow-md group-hover:scale-110 transition-transform duration-300">
              {store.logoEmoji}
            </span>
            <span className="text-[8px] md:text-[10px] font-heebo font-medium tracking-wide"
              style={{ color: "hsl(220,10%,35%)" }}
            >
              {store.category}
            </span>
          </div>

          {/* Hover glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, rgba(255,220,150,0.15) 0%, transparent 70%)" }}
          />
        </div>

        {/* Door / entrance at bottom */}
        <div className="relative z-10 flex justify-center"
          style={{
            borderLeft: "5px solid hsl(35,15%,55%)",
            borderRight: "5px solid hsl(35,15%,55%)",
            borderBottom: "5px solid hsl(35,15%,50%)",
            background: "hsl(35,12%,52%)",
          }}
        >
          <div className="w-2/3 py-2 md:py-3 flex flex-col items-center gap-0.5 rounded-t-lg relative"
            style={{
              background: "linear-gradient(180deg, hsl(30,10%,22%) 0%, hsl(25,8%,15%) 100%)",
              border: "2px solid hsl(35,15%,45%)",
              borderBottom: "none",
            }}
          >
            {/* Door handle */}
            <div className="w-1.5 h-3 md:w-2 md:h-4 rounded-full"
              style={{ background: "linear-gradient(180deg, hsl(43,60%,65%), hsl(43,50%,45%))" }}
            />
            <span className="text-[7px] md:text-[9px] font-heebo opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ color: "hsl(45,60%,70%)" }}
            >
              כניסה
            </span>
          </div>
        </div>

        {/* Floor / threshold */}
        <div className="h-2 rounded-b-sm"
          style={{
            background: "linear-gradient(180deg, hsl(30,8%,45%) 0%, hsl(30,6%,35%) 100%)",
          }}
        />
      </div>
    </button>
  );
};

export default StoreCard;
