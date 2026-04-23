interface CenterFeatureProps {
  floorId: number;
}

/**
 * Center feature occupies one store-width slot and matches store card dimensions:
 * - Top sign band (~36-48px) + subtitle band (~24px) + image area (90px / md:130px)
 * - Same outer frame, gold trim and bottom alignment as StoreCard.
 * - Two vertical "connector columns" run through the image area on every floor,
 *   creating visual continuity from floor 1 (balcony) up to floor 3 (entrance).
 */
const CenterFeature = ({ floorId }: CenterFeatureProps) => {
  const title =
    floorId === 3 ? "כניסה למתחם" : floorId === 2 ? "תחנת מידע" : "מרפסת";
  const subtitle =
    floorId === 3 ? "ברוכים הבאים" : floorId === 2 ? "שירות ומידע" : "תצפית";

  return (
    <div className="hidden md:flex flex-col w-full">
      <div
        className="relative flex flex-col w-full rounded-lg overflow-hidden"
        style={{
          border: "2px solid hsl(40,25%,72%)",
          boxShadow: "0 6px 24px rgba(0,0,0,0.18), inset 0 0 0 1px hsl(40,20%,85%)",
        }}
      >
        {/* Top gold trim - matches StoreCard */}
        <div
          className="h-[3px]"
          style={{
            background:
              "linear-gradient(90deg, hsl(40,15%,65%), hsl(43,45%,70%), hsl(40,15%,65%))",
          }}
        />

        {/* Sign band - matches StoreCard sign height */}
        <div
          className="relative z-10 py-2.5 md:py-3 px-2 flex flex-col items-center justify-center gap-0.5"
          style={{
            background: "linear-gradient(180deg, hsl(220,25%,18%), hsl(220,22%,12%))",
            borderBottom: "2px solid hsl(43,55%,45%)",
          }}
        >
          <div className="absolute top-1 left-1 w-2 h-2 border-t border-l opacity-60" style={{ borderColor: "hsl(43,55%,55%)" }} />
          <div className="absolute top-1 right-1 w-2 h-2 border-t border-r opacity-60" style={{ borderColor: "hsl(43,55%,55%)" }} />
          <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l opacity-60" style={{ borderColor: "hsl(43,55%,55%)" }} />
          <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r opacity-60" style={{ borderColor: "hsl(43,55%,55%)" }} />
          <span
            className="font-frank font-bold text-[10px] md:text-xs lg:text-sm tracking-wider w-full text-center"
            style={{ color: "hsl(43,70%,60%)" }}
          >
            {title}
          </span>
          <div className="w-6 md:w-8 h-[1.5px] mt-0.5" style={{ background: "hsl(43,55%,45%)" }} />
        </div>

        {/* Subtitle band - matches StoreCard */}
        <div
          className="py-1 text-center"
          style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.65), rgba(0,0,0,0.8))" }}
        >
          <span className="text-[8px] md:text-[10px] font-heebo font-medium tracking-wide" style={{ color: "hsl(40,30%,85%)" }}>
            {subtitle}
          </span>
        </div>

        {/* "Image" area - same height as StoreCard image (90px / md:130px) */}
        <div
          className="relative w-full h-[90px] md:h-[130px] overflow-hidden"
          style={{
            background: "linear-gradient(180deg, hsl(220,25%,20%) 0%, hsl(220,22%,10%) 100%)",
          }}
        >
          {/* === Connector columns spanning every floor === */}
          <div
            className="absolute top-0 bottom-0 left-[18%] w-2 rounded-sm"
            style={{
              background:
                "linear-gradient(90deg, hsl(43,40%,75%), hsl(43,35%,55%) 50%, hsl(43,40%,75%))",
              boxShadow: "0 0 4px rgba(0,0,0,0.4)",
            }}
          />
          <div
            className="absolute top-0 bottom-0 right-[18%] w-2 rounded-sm"
            style={{
              background:
                "linear-gradient(90deg, hsl(43,40%,75%), hsl(43,35%,55%) 50%, hsl(43,40%,75%))",
              boxShadow: "0 0 4px rgba(0,0,0,0.4)",
            }}
          />

          {/* === Floor-specific scene between the columns === */}
          {floorId === 3 && (
            <>
              {/* Pediment over doorway */}
              <div
                className="absolute top-1 left-[14%] right-[14%] h-4"
                style={{
                  background: "linear-gradient(180deg, hsl(43,50%,60%), hsl(43,40%,40%))",
                  clipPath: "polygon(0 100%, 50% 0, 100% 100%)",
                }}
              />
              {/* Doorway opening */}
              <div
                className="absolute top-5 bottom-3 left-[26%] right-[26%] rounded-t-full"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 0%, hsl(43,55%,35%) 0%, hsl(220,30%,8%) 75%)",
                  boxShadow: "inset 0 4px 14px rgba(0,0,0,0.7)",
                }}
              />
              {/* Welcome carpet */}
              <div
                className="absolute bottom-0 left-[20%] right-[20%] h-2"
                style={{ background: "linear-gradient(180deg, hsl(0,55%,40%), hsl(0,50%,28%))" }}
              />
            </>
          )}

          {floorId === 2 && (
            <>
              {/* Attendant head */}
              <div
                className="absolute top-3 left-1/2 -translate-x-1/2 w-6 h-6 md:w-7 md:h-7 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 35% 35%, hsl(28,55%,78%), hsl(28,45%,55%))",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.4)",
                }}
              />
              {/* Attendant suit / shoulders */}
              <div
                className="absolute top-[42%] left-1/2 -translate-x-1/2 w-12 md:w-14 h-7 md:h-8 rounded-t-lg"
                style={{
                  background: "linear-gradient(180deg, hsl(220,30%,28%), hsl(220,30%,15%))",
                }}
              />
              {/* Shirt collar */}
              <div
                className="absolute top-[46%] left-1/2 -translate-x-1/2 w-2.5 h-3.5"
                style={{
                  background: "hsl(0,0%,95%)",
                  clipPath: "polygon(50% 0, 100% 100%, 0 100%)",
                }}
              />
              {/* Counter / desk */}
              <div
                className="absolute bottom-0 left-[10%] right-[10%] h-[38%] rounded-t-md"
                style={{
                  background: "linear-gradient(180deg, hsl(43,40%,55%), hsl(30,40%,28%))",
                  boxShadow:
                    "0 -2px 8px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.18)",
                  border: "1px solid hsl(30,35%,25%)",
                }}
              />
              {/* Desk top edge */}
              <div
                className="absolute bottom-[38%] left-[10%] right-[10%] h-1 rounded-sm"
                style={{ background: "hsl(43,50%,72%)" }}
              />
              {/* Monitor on desk */}
              <div
                className="absolute bottom-[40%] left-[16%] w-4 h-3 rounded-sm"
                style={{ background: "hsl(220,30%,10%)", border: "1px solid hsl(220,15%,35%)" }}
              />
              {/* Papers */}
              <div
                className="absolute bottom-[40%] right-[16%] w-4 h-2 rounded-sm"
                style={{ background: "hsl(0,0%,92%)" }}
              />
            </>
          )}

          {floorId === 1 && (
            <>
              {/* Roman dome top - connects upward to floor above */}
              <div
                className="absolute top-0 left-[8%] right-[8%] h-6 rounded-t-full overflow-hidden"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 100%, hsl(43,55%,60%), hsl(43,38%,30%))",
                  boxShadow: "inset 0 -3px 10px rgba(0,0,0,0.45)",
                }}
              >
                <div
                  className="absolute inset-0 opacity-50"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(90deg, transparent 0, transparent 7px, rgba(0,0,0,0.3) 7px, rgba(0,0,0,0.3) 8px)",
                  }}
                />
              </div>

              {/* Center half-height column under dome */}
              <div
                className="absolute top-6 bottom-[40%] left-1/2 -translate-x-1/2 w-1.5 rounded-sm"
                style={{
                  background:
                    "linear-gradient(90deg, hsl(43,40%,75%), hsl(43,35%,55%), hsl(43,40%,75%))",
                }}
              />

              {/* Glass railing */}
              <div className="absolute bottom-0 left-[10%] right-[10%] h-[36%]">
                <div
                  className="absolute inset-0 rounded-sm"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(180,210,230,0.28), rgba(140,180,210,0.18))",
                    border: "1px solid rgba(200,220,240,0.45)",
                    boxShadow: "inset 0 1px 4px rgba(255,255,255,0.25)",
                  }}
                />
                {/* Railing posts */}
                <div className="absolute top-0 bottom-0 left-[15%] w-0.5" style={{ background: "hsl(43,40%,60%)" }} />
                <div className="absolute top-0 bottom-0 left-[40%] w-0.5" style={{ background: "hsl(43,40%,60%)" }} />
                <div className="absolute top-0 bottom-0 left-[60%] w-0.5" style={{ background: "hsl(43,40%,60%)" }} />
                <div className="absolute top-0 bottom-0 left-[85%] w-0.5" style={{ background: "hsl(43,40%,60%)" }} />
                {/* Top handrail */}
                <div
                  className="absolute -top-0.5 left-0 right-0 h-1 rounded-full"
                  style={{
                    background: "linear-gradient(180deg, hsl(43,55%,68%), hsl(43,40%,40%))",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.35)",
                  }}
                />
              </div>
            </>
          )}

          {/* Floor strip (shared) */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1.5"
            style={{ background: "linear-gradient(180deg, hsl(43,30%,42%), hsl(43,25%,22%))" }}
          />
        </div>
      </div>
    </div>
  );
};

export default CenterFeature;
