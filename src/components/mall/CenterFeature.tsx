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
    floorId === 3 ? "" : floorId === 2 ? "תחנת מידע" : "מרפסת";
  const subtitle =
    floorId === 3 ? "" : floorId === 2 ? "שירות ומידע" : "תצפית";
  const isEntrance = floorId === 3;

  return (
    <div className="hidden md:flex flex-col w-full">
      <div
        className="relative flex flex-col w-full rounded-lg overflow-hidden"
        style={
          isEntrance
            ? {}
            : {
                border: "2px solid hsl(40,25%,72%)",
                boxShadow:
                  "0 6px 24px rgba(0,0,0,0.18), inset 0 0 0 1px hsl(40,20%,85%)",
              }
        }
      >
        {!isEntrance && (
        <>
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
        </>
        )}

        {/* "Image" area - same height as StoreCard image (90px / md:130px) */}
        <div
          className={`relative w-full overflow-hidden ${
            isEntrance ? "h-[170px] md:h-[230px]" : "h-[90px] md:h-[130px]"
          }`}
          style={
            isEntrance
              ? { background: "transparent" }
              : {
                  background:
                    "linear-gradient(180deg, hsl(220,25%,20%) 0%, hsl(220,22%,10%) 100%)",
                }
          }
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
              {/* Pediment - light stone */}
              <div
                className="absolute top-0 left-[2%] right-[2%] h-8 md:h-10"
                style={{
                  background:
                    "linear-gradient(180deg, hsl(40,20%,94%), hsl(35,15%,78%))",
                  clipPath: "polygon(0 100%, 50% 0, 100% 100%)",
                  filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.25))",
                }}
              />
              {/* White stone block frame around the entrance (top + sides) */}
              {/* Top lintel - rows of white stones */}
              <div
                className="absolute left-[6%] right-[6%] top-7 md:top-9 h-5 md:h-6 rounded-sm overflow-hidden"
                style={{
                  background: "hsl(40,15%,88%)",
                  border: "1px solid hsl(35,12%,68%)",
                  backgroundImage:
                    "repeating-linear-gradient(90deg, hsl(35,12%,72%) 0 1px, transparent 1px 22px), repeating-linear-gradient(0deg, hsl(35,12%,72%) 0 1px, transparent 1px 12px)",
                  boxShadow: "inset 0 1px 2px rgba(255,255,255,0.6), 0 2px 3px rgba(0,0,0,0.18)",
                }}
              />
              {/* Left stone column */}
              <div
                className="absolute top-7 md:top-9 bottom-3 left-[6%] w-[10%] rounded-sm"
                style={{
                  background:
                    "linear-gradient(90deg, hsl(35,15%,72%), hsl(40,20%,94%) 45%, hsl(40,20%,90%) 55%, hsl(35,15%,70%))",
                  border: "1px solid hsl(35,12%,68%)",
                  backgroundImage:
                    "repeating-linear-gradient(0deg, hsl(35,12%,72%) 0 1px, transparent 1px 16px)",
                  boxShadow:
                    "inset 1px 0 1px rgba(255,255,255,0.5), 2px 0 4px rgba(0,0,0,0.18)",
                }}
              />
              {/* Right stone column */}
              <div
                className="absolute top-7 md:top-9 bottom-3 right-[6%] w-[10%] rounded-sm"
                style={{
                  background:
                    "linear-gradient(90deg, hsl(35,15%,70%), hsl(40,20%,90%) 45%, hsl(40,20%,94%) 55%, hsl(35,15%,72%))",
                  border: "1px solid hsl(35,12%,68%)",
                  backgroundImage:
                    "repeating-linear-gradient(0deg, hsl(35,12%,72%) 0 1px, transparent 1px 16px)",
                  boxShadow:
                    "inset -1px 0 1px rgba(255,255,255,0.5), -2px 0 4px rgba(0,0,0,0.18)",
                }}
              />
              {/* Column capitals (left/right) */}
              <div
                className="absolute top-7 md:top-9 left-[5%] w-[12%] h-2 rounded-sm"
                style={{
                  background: "linear-gradient(180deg, hsl(40,18%,96%), hsl(35,15%,78%))",
                  border: "1px solid hsl(35,12%,65%)",
                }}
              />
              <div
                className="absolute top-7 md:top-9 right-[5%] w-[12%] h-2 rounded-sm"
                style={{
                  background: "linear-gradient(180deg, hsl(40,18%,96%), hsl(35,15%,78%))",
                  border: "1px solid hsl(35,12%,65%)",
                }}
              />
              {/* Column bases */}
              <div
                className="absolute bottom-3 left-[5%] w-[12%] h-2 rounded-sm"
                style={{
                  background: "linear-gradient(180deg, hsl(35,15%,78%), hsl(35,12%,62%))",
                  border: "1px solid hsl(35,12%,55%)",
                }}
              />
              <div
                className="absolute bottom-3 right-[5%] w-[12%] h-2 rounded-sm"
                style={{
                  background: "linear-gradient(180deg, hsl(35,15%,78%), hsl(35,12%,62%))",
                  border: "1px solid hsl(35,12%,55%)",
                }}
              />

              {/* Doorway opening with depth perspective */}
              <div
                className="absolute left-[16%] right-[16%]"
                style={{ top: "calc(1.75rem + 20px)", bottom: "0.75rem" }}
              >
                {/* Outer arch - bright entry */}
                <div
                  className="absolute inset-0 rounded-t-full overflow-hidden"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 110%, hsl(45,80%,88%) 0%, hsl(40,55%,70%) 25%, hsl(30,40%,45%) 55%, hsl(220,35%,12%) 90%)",
                    boxShadow:
                      "inset 0 8px 20px rgba(0,0,0,0.55), inset 0 -4px 10px rgba(255,230,180,0.4)",
                  }}
                >
                  {/* Perspective floor inside doorway */}
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-[35%]"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent, hsl(40,30%,55%) 30%, hsl(40,40%,75%))",
                      clipPath: "polygon(20% 0, 80% 0, 100% 100%, 0 100%)",
                      opacity: 0.85,
                    }}
                  />
                  {/* Inner depth arch (darker, smaller) */}
                  <div
                    className="absolute left-[18%] right-[18%] top-[20%] bottom-[10%] rounded-t-full"
                    style={{
                      background:
                        "radial-gradient(ellipse at 50% 100%, hsl(45,70%,75%) 0%, hsl(35,40%,40%) 50%, hsl(220,40%,8%) 95%)",
                      boxShadow: "inset 0 6px 14px rgba(0,0,0,0.7)",
                    }}
                  />
                  {/* Light glow at far end */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 bottom-[18%] w-[28%] h-[22%] rounded-full"
                    style={{
                      background:
                        "radial-gradient(ellipse, rgba(255,240,200,0.85), rgba(255,230,180,0) 70%)",
                      filter: "blur(2px)",
                    }}
                  />
                </div>
              </div>

              {/* Welcome carpet */}
              <div
                className="absolute bottom-0 left-[18%] right-[18%] h-3"
                style={{
                  background:
                    "linear-gradient(180deg, hsl(0,55%,45%), hsl(0,50%,30%))",
                  clipPath: "polygon(8% 0, 92% 0, 100% 100%, 0 100%)",
                }}
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
