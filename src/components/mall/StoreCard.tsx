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
      className="group relative flex flex-col w-full cursor-pointer transition-transform hover:scale-[1.03] focus:outline-none"
      aria-label={`כניסה לחנות ${store.name}`}
    >
      {/* Store sign */}
      <div className={`relative z-10 bg-gradient-to-r ${store.signColor} text-white text-center py-2 px-2 rounded-t-md shadow-lg`}>
        <span className="font-heebo font-bold text-xs md:text-sm lg:text-base truncate block">
          {store.name}
        </span>
      </div>

      {/* Store window/vitrine */}
      <div className="relative bg-mall-window border-x-4 border-b-4 border-mall-column flex-1 min-h-[100px] md:min-h-[140px] flex flex-col items-center justify-center gap-2 transition-all group-hover:shadow-[inset_0_0_30px_rgba(218,165,32,0.3)]">
        {/* Glass reflection effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 pointer-events-none" />
        
        {/* Logo */}
        <span className="text-3xl md:text-4xl lg:text-5xl drop-shadow-lg">{store.logoEmoji}</span>
        
        {/* Category tag */}
        <span className="text-[10px] md:text-xs text-white/70 font-heebo">{store.category}</span>
        
        {/* Enter indicator */}
        <div className="absolute bottom-2 opacity-0 group-hover:opacity-100 transition-opacity bg-mall-gold/90 text-mall-sign text-xs font-bold px-3 py-1 rounded-full">
          כניסה לחנות ←
        </div>
      </div>

      {/* Column sides */}
      <div className="absolute top-8 bottom-0 -right-1 w-2 bg-gradient-to-b from-mall-column to-mall-floor rounded-sm shadow-inner" />
      <div className="absolute top-8 bottom-0 -left-1 w-2 bg-gradient-to-b from-mall-column to-mall-floor rounded-sm shadow-inner" />
    </button>
  );
};

export default StoreCard;
