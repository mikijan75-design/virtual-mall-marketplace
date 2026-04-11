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
      {/* Sign board */}
      <div className="relative z-10 py-2 px-2 text-center rounded-t-md"
        style={{
          background: "linear-gradient(180deg, hsl(220,12%,15%) 0%, hsl(220,10%,10%) 100%)",
          border: "1.5px solid hsl(40,20%,65%)",
          borderBottom: "none",
        }}
      >
        <span className="font-heebo font-bold text-[10px] md:text-xs lg:text-sm truncate block tracking-wider"
          style={{ color: "hsl(40,25%,80%)" }}
        >
          {store.name}
        </span>
      </div>

      {/* Gold separator */}
      <div className="h-[2px]"
        style={{ background: "linear-gradient(90deg, hsl(40,20%,60%), hsl(43,40%,65%), hsl(40,20%,60%))" }}
      />

      {/* Store window with open doors depth effect */}
      <div className="relative min-h-[100px] md:min-h-[140px] overflow-hidden rounded-b-md"
        style={{
          background: "linear-gradient(180deg, hsl(40,8%,96%) 0%, hsl(40,6%,91%) 100%)",
          border: "1.5px solid hsl(40,15%,72%)",
          borderTop: "none",
        }}
      >
        {/* Left door - open outward with perspective */}
        <div className="absolute top-0 bottom-0 left-0 w-[18%] z-20"
          style={{
            background: "linear-gradient(90deg, hsl(40,10%,82%) 0%, hsl(40,8%,88%) 60%, hsl(40,6%,92%) 100%)",
            boxShadow: "2px 0 8px rgba(0,0,0,0.08)",
            transformOrigin: "left center",
            transform: "perspective(200px) rotateY(25deg)",
            borderRight: "1px solid hsl(40,10%,80%)",
          }}
        />

        {/* Right door - open outward with perspective */}
        <div className="absolute top-0 bottom-0 right-0 w-[18%] z-20"
          style={{
            background: "linear-gradient(270deg, hsl(40,10%,82%) 0%, hsl(40,8%,88%) 60%, hsl(40,6%,92%) 100%)",
            boxShadow: "-2px 0 8px rgba(0,0,0,0.08)",
            transformOrigin: "right center",
            transform: "perspective(200px) rotateY(-25deg)",
            borderLeft: "1px solid hsl(40,10%,80%)",
          }}
        />

        {/* Depth shadow at edges behind doors */}
        <div className="absolute top-0 bottom-0 left-0 w-[22%] pointer-events-none z-10"
          style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.06) 0%, transparent 100%)" }}
        />
        <div className="absolute top-0 bottom-0 right-0 w-[22%] pointer-events-none z-10"
          style={{ background: "linear-gradient(270deg, rgba(0,0,0,0.06) 0%, transparent 100%)" }}
        />

        {/* Inner depth - darker recessed area */}
        <div className="absolute inset-0"
          style={{
            boxShadow: "inset 0 4px 16px rgba(0,0,0,0.07), inset 0 0 30px rgba(0,0,0,0.03)",
          }}
        />

        {/* Subtle glass reflection */}
        <div className="absolute inset-0 pointer-events-none z-[5]"
          style={{
            background: "linear-gradient(155deg, rgba(255,255,255,0.4) 0%, transparent 35%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full py-5 gap-2">
          <span className="text-3xl md:text-4xl lg:text-5xl group-hover:scale-110 transition-transform duration-500"
            style={{ filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.1))" }}
          >
            {store.logoEmoji}
          </span>
          <span className="text-[8px] md:text-[10px] font-heebo tracking-widest uppercase"
            style={{ color: "hsl(220,8%,50%)" }}
          >
            {store.category}
          </span>
        </div>

        {/* Hover warm invite glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-[15]"
          style={{ background: "radial-gradient(ellipse at center, rgba(255,230,180,0.12) 0%, transparent 65%)" }}
        />
      </div>
    </button>
  );
};

export default StoreCard;
