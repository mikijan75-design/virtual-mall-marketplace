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
      {/* Elegant outer frame */}
      <div className="relative flex flex-col w-full rounded-lg overflow-hidden"
        style={{
          border: "2px solid hsl(40,25%,72%)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08), inset 0 0 0 1px hsl(40,20%,85%)",
        }}
      >
        {/* Top ornamental trim */}
        <div className="h-[3px]"
          style={{ background: "linear-gradient(90deg, hsl(40,15%,65%), hsl(43,45%,70%), hsl(40,15%,65%))" }}
        />

        {/* Sign board - white background with unique logo */}
        <div className="relative z-10 py-3 md:py-4 px-2 flex flex-col items-center gap-1"
          style={{
            background: "linear-gradient(180deg, hsl(0,0%,100%) 0%, hsl(40,10%,97%) 100%)",
            borderBottom: "2px solid hsl(40,25%,72%)",
          }}
        >
          {/* Logo emoji as brand icon */}
          <span className="text-xl md:text-2xl lg:text-3xl">{store.logoEmoji}</span>
          {/* Brand name */}
          <span className="font-frank font-bold text-[10px] md:text-xs lg:text-sm truncate block tracking-wider w-full text-center"
            style={{ color: "hsl(220,15%,20%)" }}
          >
            {store.name}
          </span>
          {/* Decorative line under name */}
          <div className="w-8 md:w-10 h-[1.5px] mt-0.5"
            style={{ background: "linear-gradient(90deg, transparent, hsl(43,40%,60%), transparent)" }}
          />
        </div>

        {/* Inner gold trim */}
        <div className="h-[2px]"
          style={{ background: "linear-gradient(90deg, hsl(40,20%,75%), hsl(43,50%,68%), hsl(40,20%,75%))" }}
        />

        {/* Store window with open doors */}
        <div className="relative min-h-[85px] md:min-h-[115px] overflow-hidden"
          style={{
            background: "linear-gradient(180deg, hsl(40,8%,96%) 0%, hsl(40,6%,92%) 100%)",
          }}
        >
          {/* Left door */}
          <div className="absolute top-0 bottom-0 left-0 w-[18%] z-20"
            style={{
              background: "linear-gradient(90deg, hsl(40,10%,84%) 0%, hsl(40,8%,90%) 60%, hsl(40,6%,94%) 100%)",
              boxShadow: "2px 0 8px rgba(0,0,0,0.06)",
              transformOrigin: "left center",
              transform: "perspective(200px) rotateY(25deg)",
              borderRight: "1px solid hsl(40,15%,82%)",
            }}
          />

          {/* Right door */}
          <div className="absolute top-0 bottom-0 right-0 w-[18%] z-20"
            style={{
              background: "linear-gradient(270deg, hsl(40,10%,84%) 0%, hsl(40,8%,90%) 60%, hsl(40,6%,94%) 100%)",
              boxShadow: "-2px 0 8px rgba(0,0,0,0.06)",
              transformOrigin: "right center",
              transform: "perspective(200px) rotateY(-25deg)",
              borderLeft: "1px solid hsl(40,15%,82%)",
            }}
          />

          {/* Depth shadows */}
          <div className="absolute inset-0"
            style={{ boxShadow: "inset 0 4px 14px rgba(0,0,0,0.05), inset 0 0 20px rgba(0,0,0,0.02)" }}
          />

          {/* Glass reflection */}
          <div className="absolute inset-0 pointer-events-none z-[5]"
            style={{ background: "linear-gradient(155deg, rgba(255,255,255,0.35) 0%, transparent 30%)" }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full py-4 gap-1.5">
            <span className="text-2xl md:text-3xl lg:text-4xl group-hover:scale-110 transition-transform duration-500"
              style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.08))" }}
            >
              {store.logoEmoji}
            </span>
            <span className="text-[7px] md:text-[9px] font-heebo tracking-widest uppercase"
              style={{ color: "hsl(220,8%,55%)" }}
            >
              {store.category}
            </span>
          </div>

          {/* Hover glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-[15]"
            style={{ background: "radial-gradient(ellipse at center, rgba(255,230,180,0.1) 0%, transparent 65%)" }}
          />
        </div>

        {/* Bottom ornamental trim */}
        <div className="h-[3px]"
          style={{ background: "linear-gradient(90deg, hsl(40,15%,65%), hsl(43,45%,70%), hsl(40,15%,65%))" }}
        />
      </div>
    </button>
  );
};

export default StoreCard;
