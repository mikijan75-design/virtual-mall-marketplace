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
  const isInfo = floorId === 2;
  const noFrame = isEntrance || isInfo;

  return (
    <div className="hidden md:flex flex-col w-full">
      <div
        className="relative flex flex-col w-full rounded-lg overflow-hidden"
        style={
          noFrame
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
            background: isInfo
              ? "linear-gradient(90deg, hsl(210,40%,75%), hsl(210,55%,85%), hsl(210,40%,75%))"
              : "linear-gradient(90deg, hsl(40,15%,65%), hsl(43,45%,70%), hsl(40,15%,65%))",
          }}
        />

        {/* Sign band */}
        <div
          className="relative z-10 py-2.5 md:py-3 px-2 flex flex-col items-center justify-center gap-0.5"
          style={
            isInfo
              ? {
                  background:
                    "linear-gradient(180deg, hsl(210,70%,42%), hsl(215,75%,32%))",
                  borderBottom: "2px solid hsl(210,40%,85%)",
                }
              : {
                  background:
                    "linear-gradient(180deg, hsl(220,25%,18%), hsl(220,22%,12%))",
                  borderBottom: "2px solid hsl(43,55%,45%)",
                }
          }
        >
          <div className="absolute top-1 left-1 w-2 h-2 border-t border-l opacity-60" style={{ borderColor: isInfo ? "hsl(210,40%,90%)" : "hsl(43,55%,55%)" }} />
          <div className="absolute top-1 right-1 w-2 h-2 border-t border-r opacity-60" style={{ borderColor: isInfo ? "hsl(210,40%,90%)" : "hsl(43,55%,55%)" }} />
          <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l opacity-60" style={{ borderColor: isInfo ? "hsl(210,40%,90%)" : "hsl(43,55%,55%)" }} />
          <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r opacity-60" style={{ borderColor: isInfo ? "hsl(210,40%,90%)" : "hsl(43,55%,55%)" }} />
          <span
            className="font-frank font-bold text-[10px] md:text-xs lg:text-sm tracking-wider w-full text-center"
            style={{ color: isInfo ? "hsl(0,0%,98%)" : "hsl(43,70%,60%)" }}
          >
            {title}
          </span>
          <div className="w-6 md:w-8 h-[1.5px] mt-0.5" style={{ background: isInfo ? "hsl(210,40%,90%)" : "hsl(43,55%,45%)" }} />
        </div>

        {/* Subtitle band */}
        <div
          className="py-1 text-center"
          style={{
            background: isInfo
              ? "linear-gradient(180deg, hsl(210,55%,90%), hsl(210,45%,82%))"
              : "linear-gradient(180deg, rgba(0,0,0,0.65), rgba(0,0,0,0.8))",
          }}
        >
          <span
            className="text-[8px] md:text-[10px] font-heebo font-medium tracking-wide"
            style={{ color: isInfo ? "hsl(215,70%,28%)" : "hsl(40,30%,85%)" }}
          >
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
            noFrame
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
              {/* Doorway with arched stone frame (voussoirs) + depth */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 200 230"
                preserveAspectRatio="none"
              >
                <defs>
                  {/* Cream interior - lighter at center, soft cream all the way through */}
                  <radialGradient id="doorDepth" cx="50%" cy="55%" r="75%">
                    <stop offset="0%" stopColor="hsl(42,75%,96%)" />
                    <stop offset="55%" stopColor="hsl(40,55%,88%)" />
                    <stop offset="100%" stopColor="hsl(38,40%,76%)" />
                  </radialGradient>
                  <linearGradient id="stoneGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(40,18%,96%)" />
                    <stop offset="100%" stopColor="hsl(35,15%,75%)" />
                  </linearGradient>
                  <linearGradient id="redCarpet" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(0,65%,48%)" />
                    <stop offset="100%" stopColor="hsl(0,60%,30%)" />
                  </linearGradient>
                  <clipPath id="doorClip">
                    <path d="M 40 230 L 40 110 A 60 60 0 0 1 160 110 L 160 230 Z" />
                  </clipPath>
                </defs>

                {/* Inside of doorway (depth gradient) */}
                <g clipPath="url(#doorClip)">
                  <path
                    d="M 40 230 L 40 110 A 60 60 0 0 1 160 110 L 160 230 Z"
                    fill="url(#doorDepth)"
                  />
                </g>

                {/* Arched stone voussoirs hugging the opening */}
                {(() => {
                  const stones: JSX.Element[] = [];
                  const cx = 100;
                  const cy = 110;
                  const rInner = 60;
                  const rOuter = 78;
                  const count = 13;
                  // Arch stones from left base up and over to right base
                  for (let i = 0; i < count; i++) {
                    const t = i / count;
                    const a1 = Math.PI + t * Math.PI;
                    const a2 = Math.PI + ((i + 1) / count) * Math.PI;
                    const x1i = cx + rInner * Math.cos(a1);
                    const y1i = cy + rInner * Math.sin(a1);
                    const x2i = cx + rInner * Math.cos(a2);
                    const y2i = cy + rInner * Math.sin(a2);
                    const x1o = cx + rOuter * Math.cos(a1);
                    const y1o = cy + rOuter * Math.sin(a1);
                    const x2o = cx + rOuter * Math.cos(a2);
                    const y2o = cy + rOuter * Math.sin(a2);
                    stones.push(
                      <path
                        key={`v${i}`}
                        d={`M ${x1i} ${y1i} L ${x1o} ${y1o} A ${rOuter} ${rOuter} 0 0 1 ${x2o} ${y2o} L ${x2i} ${y2i} A ${rInner} ${rInner} 0 0 0 ${x1i} ${y1i} Z`}
                        fill="url(#stoneGrad)"
                        stroke="hsl(35,12%,62%)"
                        strokeWidth="0.6"
                      />
                    );
                  }
                  // Side jamb stones (vertical) from arch springline down to floor
                  const jambRows = 5;
                  const jambTop = 110;
                  const jambBottom = 230;
                  const rowH = (jambBottom - jambTop) / jambRows;
                  for (let i = 0; i < jambRows; i++) {
                    const y = jambTop + i * rowH;
                    const offset = i % 2 === 0 ? 0 : 4;
                    stones.push(
                      <rect
                        key={`lj${i}`}
                        x={22 + offset}
                        y={y}
                        width={18 - offset}
                        height={rowH}
                        fill="url(#stoneGrad)"
                        stroke="hsl(35,12%,62%)"
                        strokeWidth="0.6"
                      />,
                      <rect
                        key={`rj${i}`}
                        x={160}
                        y={y}
                        width={18 - offset}
                        height={rowH}
                        fill="url(#stoneGrad)"
                        stroke="hsl(35,12%,62%)"
                        strokeWidth="0.6"
                      />
                    );
                  }
                  return stones;
                })()}

                {/* Infinity symbol at the heart of the opening - cream white */}
                <g
                  transform="translate(100 140)"
                  style={{
                    filter:
                      "drop-shadow(0 0 5px rgba(255,245,215,0.85)) drop-shadow(0 0 12px rgba(245,225,180,0.5))",
                  }}
                >
                  {/* Continuous infinity loop - no endpoints, symbolizing endless flow */}
                  <path
                    d="M 0 0 C -8 -14 -28 -14 -28 0 C -28 14 -8 14 0 0 C 8 -14 28 -14 28 0 C 28 14 8 14 0 0 Z"
                    fill="none"
                    stroke="hsl(42,60%,93%)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>

                {/* Long red carpet — starts deep inside the doorway, widens toward viewer */}
                <g>
                  {/* Inner small arch at the far end of the carpet — a doorway-within-the-doorway */}
                  <path
                    d="M 92 152 L 92 138 A 8 10 0 0 1 108 138 L 108 152 Z"
                    fill="hsl(38,45%,55%)"
                    stroke="hsl(35,30%,40%)"
                    strokeWidth="0.6"
                  />
                  {/* Inner arch dark interior (hint of further depth) */}
                  <path
                    d="M 94 152 L 94 140 A 6 8 0 0 1 106 140 L 106 152 Z"
                    fill="hsl(35,40%,28%)"
                  />
                  {/* Tiny cream glow at the very back of inner arch */}
                  <ellipse cx="100" cy="148" rx="3" ry="2" fill="hsl(42,70%,90%)" opacity="0.85" />

                  {/* Carpet body - narrow at the inner arch, wide at viewer */}
                  <path
                    d="M 92 152 L 108 152 L 158 230 L 42 230 Z"
                    fill="url(#redCarpet)"
                    stroke="hsl(40,35%,68%)"
                    strokeWidth="0.8"
                  />
                  {/* Gold trim along carpet edges */}
                  <path d="M 92 152 L 42 230" stroke="hsl(43,55%,62%)" strokeWidth="1.6" fill="none" />
                  <path d="M 108 152 L 158 230" stroke="hsl(43,55%,62%)" strokeWidth="1.6" fill="none" />
                  {/* Subtle perspective seam down the middle */}
                  <line x1="100" y1="152" x2="100" y2="230" stroke="hsl(0,50%,22%)" strokeWidth="0.4" opacity="0.5" />

                  {/* Two LARGE stanchions at the front end of the carpet */}
                  {/* Left post - base, shaft, ball top */}
                  <rect x="34" y="218" width="14" height="3" rx="0.6" fill="hsl(43,40%,35%)" />
                  <rect x="38" y="188" width="6" height="32" fill="hsl(43,55%,58%)" stroke="hsl(43,40%,32%)" strokeWidth="0.5" />
                  <rect x="36" y="186" width="10" height="3" rx="0.6" fill="hsl(43,60%,68%)" stroke="hsl(43,40%,32%)" strokeWidth="0.4" />
                  <circle cx="41" cy="183" r="5" fill="hsl(43,75%,80%)" stroke="hsl(43,45%,38%)" strokeWidth="0.5" />
                  <ellipse cx="39" cy="181" rx="1.5" ry="1" fill="hsl(45,90%,95%)" opacity="0.85" />
                  {/* Right post */}
                  <rect x="152" y="218" width="14" height="3" rx="0.6" fill="hsl(43,40%,35%)" />
                  <rect x="156" y="188" width="6" height="32" fill="hsl(43,55%,58%)" stroke="hsl(43,40%,32%)" strokeWidth="0.5" />
                  <rect x="154" y="186" width="10" height="3" rx="0.6" fill="hsl(43,60%,68%)" stroke="hsl(43,40%,32%)" strokeWidth="0.4" />
                  <circle cx="159" cy="183" r="5" fill="hsl(43,75%,80%)" stroke="hsl(43,45%,38%)" strokeWidth="0.5" />
                  <ellipse cx="157" cy="181" rx="1.5" ry="1" fill="hsl(45,90%,95%)" opacity="0.85" />
                  {/* Velvet rope between posts (loose curve) */}
                  <path
                    d="M 44 186 Q 100 208 158 186"
                    fill="none"
                    stroke="hsl(0,60%,32%)"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                </g>
              </svg>

              {/* "Welcome" text — placed ABOVE the doorway arch */}
              <div className="absolute top-1 left-0 right-0 flex items-center justify-center pointer-events-none z-10">
                <span
                  className="font-frank font-bold text-[10px] md:text-xs tracking-wider px-2 py-0.5 rounded"
                  style={{
                    color: "hsl(28,45%,18%)",
                    background: "linear-gradient(180deg, hsl(42,70%,92%), hsl(38,55%,80%))",
                    border: "1px solid hsl(35,30%,55%)",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.5)",
                  }}
                >
                  ברוכים הבאים
                </span>
              </div>
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
