interface CenterFeatureProps {
  floorId: number;
}

const CenterFeature = ({ floorId }: CenterFeatureProps) => {
  // Floor 3 (top) - Grand entrance with facade and doorway
  if (floorId === 3) {
    return (
      <div className="relative aspect-[3/4] hidden md:block">
        <div
          className="absolute inset-0 rounded-t-2xl overflow-hidden"
          style={{
            background: "linear-gradient(180deg, hsl(220,25%,20%) 0%, hsl(220,22%,12%) 100%)",
            border: "2px solid hsl(43,55%,45%)",
            borderBottom: "none",
            boxShadow: "0 6px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          {/* Pediment / roman arch top */}
          <div
            className="absolute top-0 left-0 right-0 h-8"
            style={{
              background: "linear-gradient(180deg, hsl(43,45%,55%), hsl(43,40%,40%))",
              clipPath: "polygon(0 100%, 50% 0, 100% 100%)",
            }}
          />
          {/* Facade columns */}
          <div className="absolute top-8 bottom-12 left-2 w-2 rounded-sm"
               style={{ background: "linear-gradient(90deg, hsl(43,40%,75%), hsl(43,35%,55%), hsl(43,40%,75%))" }} />
          <div className="absolute top-8 bottom-12 right-2 w-2 rounded-sm"
               style={{ background: "linear-gradient(90deg, hsl(43,40%,75%), hsl(43,35%,55%), hsl(43,40%,75%))" }} />
          {/* Doorway opening */}
          <div className="absolute top-12 bottom-0 left-1/2 -translate-x-1/2 w-3/5 rounded-t-full"
               style={{
                 background: "radial-gradient(ellipse at center top, hsl(43,60%,30%), hsl(220,30%,8%))",
                 boxShadow: "inset 0 4px 12px rgba(0,0,0,0.6)",
               }} />
          {/* Sign */}
          <div className="absolute top-9 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-center"
               style={{ background: "hsl(220,25%,10%)", border: "1px solid hsl(43,55%,45%)" }}>
            <span className="font-frank font-bold text-[8px] md:text-[10px]" style={{ color: "hsl(43,70%,60%)" }}>
              כניסה למתחם
            </span>
          </div>
          {/* Floor */}
          <div className="absolute bottom-0 left-0 right-0 h-2"
               style={{ background: "linear-gradient(180deg, hsl(43,30%,40%), hsl(43,25%,25%))" }} />
        </div>
      </div>
    );
  }

  // Floor 2 (middle) - Information desk with attendant
  if (floorId === 2) {
    return (
      <div className="relative aspect-[3/4] hidden md:block">
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            background: "linear-gradient(180deg, hsl(220,25%,20%) 0%, hsl(220,22%,12%) 100%)",
            borderLeft: "2px solid hsl(43,55%,45%)",
            borderRight: "2px solid hsl(43,55%,45%)",
            boxShadow: "0 6px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          {/* Sign on top */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-center"
               style={{ background: "hsl(220,30%,10%)", border: "1px solid hsl(43,55%,45%)", boxShadow: "0 2px 6px rgba(0,0,0,0.4)" }}>
            <span className="font-frank font-bold text-[9px] md:text-[11px]" style={{ color: "hsl(43,70%,60%)" }}>
              ℹ מידע
            </span>
          </div>

          {/* Attendant - head */}
          <div className="absolute top-[38%] left-1/2 -translate-x-1/2 w-5 h-5 rounded-full"
               style={{ background: "radial-gradient(circle at 35% 35%, hsl(28,55%,75%), hsl(28,45%,60%))" }} />
          {/* Attendant - body (suit) */}
          <div className="absolute top-[52%] left-1/2 -translate-x-1/2 w-9 h-7 rounded-t-lg"
               style={{ background: "linear-gradient(180deg, hsl(220,30%,25%), hsl(220,30%,15%))" }} />
          {/* Shirt collar */}
          <div className="absolute top-[54%] left-1/2 -translate-x-1/2 w-2 h-3"
               style={{ background: "hsl(0,0%,95%)", clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }} />

          {/* Counter / desk */}
          <div className="absolute bottom-4 left-1 right-1 h-[28%] rounded-md"
               style={{
                 background: "linear-gradient(180deg, hsl(43,40%,55%), hsl(30,40%,30%))",
                 boxShadow: "0 -2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
                 border: "1px solid hsl(30,35%,25%)",
               }} />
          {/* Desk top edge */}
          <div className="absolute bottom-[calc(4px+28%)] left-1 right-1 h-1 rounded-sm"
               style={{ background: "hsl(43,45%,70%)", boxShadow: "0 1px 3px rgba(0,0,0,0.3)" }} />

          {/* Office items - monitor */}
          <div className="absolute bottom-[calc(4px+28%+2px)] left-2 w-3 h-2 rounded-sm"
               style={{ background: "hsl(220,30%,10%)", border: "1px solid hsl(220,15%,30%)" }} />
          {/* Office items - papers */}
          <div className="absolute bottom-[calc(4px+28%+1px)] right-2 w-3 h-1.5 rounded-sm"
               style={{ background: "hsl(0,0%,92%)" }} />

          {/* Floor */}
          <div className="absolute bottom-0 left-0 right-0 h-2"
               style={{ background: "linear-gradient(180deg, hsl(43,30%,40%), hsl(43,25%,25%))" }} />
        </div>
      </div>
    );
  }

  // Floor 1 (bottom) - Balcony with glass railing & half-height columns connecting to dome
  return (
    <div className="relative aspect-[3/4] hidden md:block">
      <div
        className="absolute inset-0 rounded-b-2xl overflow-hidden"
        style={{
          background: "linear-gradient(180deg, hsl(220,25%,20%) 0%, hsl(220,22%,12%) 100%)",
          border: "2px solid hsl(43,55%,45%)",
          borderTop: "none",
          boxShadow: "0 6px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        {/* Roman dome arch on top connecting upward */}
        <div className="absolute top-0 left-0 right-0 h-10 flex items-end justify-center">
          <div
            className="w-full h-8 rounded-t-full relative overflow-hidden"
            style={{
              background: "radial-gradient(ellipse at 50% 100%, hsl(43,50%,55%), hsl(43,35%,30%))",
              boxShadow: "inset 0 -2px 8px rgba(0,0,0,0.4)",
            }}
          >
            {/* Dome rays / segments */}
            <div className="absolute inset-0 opacity-50"
                 style={{
                   backgroundImage: "repeating-linear-gradient(90deg, transparent 0, transparent 8px, rgba(0,0,0,0.25) 8px, rgba(0,0,0,0.25) 9px)",
                 }} />
          </div>
        </div>

        {/* Half-height columns supporting dome */}
        <div className="absolute top-9 left-3 w-1.5 h-10 rounded-sm"
             style={{ background: "linear-gradient(90deg, hsl(43,40%,75%), hsl(43,35%,55%), hsl(43,40%,75%))" }} />
        <div className="absolute top-9 right-3 w-1.5 h-10 rounded-sm"
             style={{ background: "linear-gradient(90deg, hsl(43,40%,75%), hsl(43,35%,55%), hsl(43,40%,75%))" }} />
        <div className="absolute top-9 left-1/2 -translate-x-1/2 w-1.5 h-10 rounded-sm"
             style={{ background: "linear-gradient(90deg, hsl(43,40%,75%), hsl(43,35%,55%), hsl(43,40%,75%))" }} />

        {/* Sign */}
        <div className="absolute top-[52%] left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-center"
             style={{ background: "hsl(220,30%,10%)", border: "1px solid hsl(43,55%,45%)" }}>
          <span className="font-frank font-bold text-[9px] md:text-[10px]" style={{ color: "hsl(43,70%,60%)" }}>
            מרפסת
          </span>
        </div>

        {/* Glass railing area */}
        <div className="absolute bottom-2 left-1 right-1 h-[28%]">
          {/* Glass panel */}
          <div className="absolute inset-0 rounded-sm"
               style={{
                 background: "linear-gradient(180deg, rgba(180,210,230,0.25), rgba(140,180,210,0.15))",
                 border: "1px solid rgba(200,220,240,0.4)",
                 boxShadow: "inset 0 1px 4px rgba(255,255,255,0.2)",
               }} />
          {/* Railing posts */}
          <div className="absolute top-0 bottom-0 left-[20%] w-0.5" style={{ background: "hsl(43,40%,60%)" }} />
          <div className="absolute top-0 bottom-0 left-[50%] w-0.5" style={{ background: "hsl(43,40%,60%)" }} />
          <div className="absolute top-0 bottom-0 left-[80%] w-0.5" style={{ background: "hsl(43,40%,60%)" }} />
          {/* Top handrail */}
          <div className="absolute -top-0.5 left-0 right-0 h-1 rounded-full"
               style={{ background: "linear-gradient(180deg, hsl(43,50%,65%), hsl(43,40%,40%))", boxShadow: "0 1px 2px rgba(0,0,0,0.3)" }} />
        </div>

        {/* Floor */}
        <div className="absolute bottom-0 left-0 right-0 h-2"
             style={{ background: "linear-gradient(180deg, hsl(43,30%,40%), hsl(43,25%,25%))" }} />
      </div>
    </div>
  );
};

export default CenterFeature;
