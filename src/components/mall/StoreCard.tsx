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
      className="group relative flex flex-col w-full cursor-pointer transition-all duration-300 hover:scale-[1.05] focus:outline-none"
      aria-label={`כניסה לחנות ${store.name}`}
    >
      {/* Futuristic store sign - unified pink */}
      <div className="relative z-10 text-center py-2.5 px-2 rounded-t-lg shadow-[0_0_15px_rgba(236,72,153,0.4)] overflow-hidden"
        style={{
          background: "linear-gradient(135deg, hsl(330, 80%, 45%), hsl(340, 90%, 55%), hsl(320, 70%, 50%))",
        }}
      >
        {/* Glowing scan line */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-transparent pointer-events-none" />
        <span className="font-heebo font-bold text-xs md:text-sm lg:text-base truncate block text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
          {store.name}
        </span>
      </div>

      {/* Futuristic window */}
      <div className="relative flex-1 min-h-[100px] md:min-h-[140px] flex flex-col items-center justify-center gap-2 transition-all duration-300 rounded-b-lg overflow-hidden border border-pink-500/30 group-hover:border-pink-400/60 group-hover:shadow-[0_0_25px_rgba(236,72,153,0.3)]"
        style={{
          background: "linear-gradient(180deg, hsl(330, 20%, 12%) 0%, hsl(320, 15%, 8%) 100%)",
        }}
      >
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(236,72,153,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(236,72,153,0.3) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Glow behind logo */}
        <div className="absolute w-16 h-16 rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-300"
          style={{ background: "radial-gradient(circle, hsl(330, 80%, 55%) 0%, transparent 70%)" }}
        />

        {/* Logo */}
        <span className="relative text-3xl md:text-4xl lg:text-5xl drop-shadow-[0_0_12px_rgba(236,72,153,0.6)] group-hover:drop-shadow-[0_0_20px_rgba(236,72,153,0.9)] transition-all duration-300">
          {store.logoEmoji}
        </span>

        {/* Category tag */}
        <span className="relative text-[10px] md:text-xs font-heebo tracking-widest uppercase"
          style={{ color: "hsl(330, 60%, 70%)" }}
        >
          {store.category}
        </span>

        {/* Enter indicator */}
        <div className="absolute bottom-2 opacity-0 group-hover:opacity-100 transition-all duration-300 text-xs font-bold px-4 py-1 rounded-full border font-heebo"
          style={{
            background: "linear-gradient(135deg, hsl(330, 80%, 50%), hsl(340, 90%, 60%))",
            borderColor: "hsl(330, 70%, 65%)",
            color: "white",
            boxShadow: "0 0 12px rgba(236,72,153,0.5)",
          }}
        >
          כניסה לחנות ←
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-[10%] right-[10%] h-[2px] group-hover:left-0 group-hover:right-0 transition-all duration-500"
          style={{ background: "linear-gradient(90deg, transparent, hsl(330, 80%, 55%), transparent)" }}
        />
      </div>
    </button>
  );
};

export default StoreCard;
