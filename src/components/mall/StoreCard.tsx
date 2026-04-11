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
      className="group relative flex flex-col w-full cursor-pointer transition-all duration-500 hover:scale-[1.04] focus:outline-none"
      aria-label={`כניסה לחנות ${store.name}`}
    >
      {/* Store sign - frosted glass */}
      <div className="relative z-10 text-center py-2.5 px-2 rounded-t-xl overflow-hidden backdrop-blur-md"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.85), rgba(240,240,245,0.75))",
          borderTop: "1px solid rgba(255,255,255,0.9)",
          borderLeft: "1px solid rgba(255,255,255,0.7)",
          borderRight: "1px solid rgba(220,220,230,0.5)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
        }}
      >
        <span className="font-heebo font-bold text-xs md:text-sm lg:text-base truncate block"
          style={{ color: "hsl(220, 15%, 25%)" }}
        >
          {store.name}
        </span>
      </div>

      {/* Glass vitrine */}
      <div className="relative flex-1 min-h-[110px] md:min-h-[150px] flex flex-col items-center justify-center gap-2.5 rounded-b-xl overflow-hidden transition-all duration-500"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(245,247,250,0.5) 50%, rgba(235,238,245,0.4) 100%)",
          border: "1px solid rgba(255,255,255,0.6)",
          borderTop: "none",
          boxShadow: "0 8px 32px rgba(0,0,0,0.05), inset 0 0 40px rgba(255,255,255,0.3)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Glass reflection sweep */}
        <div className="absolute inset-0 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.5) 45%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.5) 55%, transparent 70%)",
            transform: "translateX(-100%)",
            animation: "none",
          }}
        />
        
        {/* Subtle light reflection on hover */}
        <div className="absolute top-0 left-0 right-0 h-1/3 pointer-events-none rounded-t-xl opacity-40 group-hover:opacity-70 transition-opacity duration-500"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, transparent 100%)",
          }}
        />

        {/* Soft edge highlight */}
        <div className="absolute inset-[1px] rounded-b-xl pointer-events-none"
          style={{
            border: "1px solid rgba(255,255,255,0.4)",
            borderTop: "none",
          }}
        />

        {/* Logo with soft shadow */}
        <span className="relative text-3xl md:text-4xl lg:text-5xl transition-transform duration-500 group-hover:scale-110"
          style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.08))" }}
        >
          {store.logoEmoji}
        </span>

        {/* Category */}
        <span className="relative text-[10px] md:text-xs font-heebo tracking-wider uppercase"
          style={{ color: "hsl(220, 10%, 50%)" }}
        >
          {store.category}
        </span>

        {/* Enter indicator */}
        <div className="absolute bottom-2.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 text-xs font-bold px-4 py-1.5 rounded-full font-heebo backdrop-blur-sm"
          style={{
            background: "rgba(255,255,255,0.85)",
            color: "hsl(220, 15%, 30%)",
            boxShadow: "0 2px 12px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
            border: "1px solid rgba(220,225,235,0.6)",
          }}
        >
          כניסה לחנות ←
        </div>
      </div>
    </button>
  );
};

export default StoreCard;
