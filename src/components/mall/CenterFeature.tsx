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
    floorId === 3 ? "כניסה" : floorId === 2 ? "תחנת מידע" : "מרפסת";
  const subtitle =
    floorId === 3 ? "מיי" : floorId === 2 ? "שירות ומידע" : "תצפית";
  const isEntrance = floorId === 3;
  const isInfo = floorId === 2;
  const isBalcony = floorId === 1;
  const noFrame = isEntrance || isInfo || isBalcony;

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
        {!isBalcony && !isEntrance && (
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

        {/* Subtitle band (background only) */}
        <div
          className="py-1 text-center relative"
          style={{
            background: isInfo
              ? `linear-gradient(90deg,
                  hsl(210,55%,90%) 0%, hsl(210,55%,90%) 20%,
                  hsl(0,0%,100%) 20%, hsl(0,0%,100%) 40%,
                  hsl(210,55%,90%) 40%, hsl(210,55%,90%) 60%,
                  hsl(0,0%,100%) 60%, hsl(0,0%,100%) 80%,
                  hsl(210,55%,90%) 80%, hsl(210,55%,90%) 100%)`
              : `linear-gradient(90deg,
                  rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.75) 20%,
                  hsl(0,0%,100%) 20%, hsl(0,0%,100%) 40%,
                  rgba(0,0,0,0.75) 40%, rgba(0,0,0,0.75) 60%,
                  hsl(0,0%,100%) 60%, hsl(0,0%,100%) 80%,
                  rgba(0,0,0,0.75) 80%, rgba(0,0,0,0.75) 100%)`,
          }}
        >
          <span className="text-[8px] md:text-[10px] invisible">.</span>
        </div>

        </>
        )}

        {/* "Image" area - same height as StoreCard image (90px / md:130px) */}
        <div
          className={`relative w-full overflow-hidden ${
            isEntrance || isBalcony ? "h-[170px] md:h-[230px]" : "h-[90px] md:h-[130px]"
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
          {/* Wide vertical side stripes layered over the existing background */}
          {!noFrame && (
            <>
              <div
                className="absolute top-0 bottom-0 left-0 w-[14%] pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, hsl(43,55%,55%), hsl(43,40%,32%) 50%, hsl(43,55%,55%))",
                  borderRight: "1px solid hsl(43,30%,22%)",
                  boxShadow:
                    "inset 0 0 6px rgba(0,0,0,0.35), 1px 0 4px rgba(0,0,0,0.4)",
                }}
              />
              <div
                className="absolute top-0 bottom-0 right-0 w-[14%] pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, hsl(43,55%,55%), hsl(43,40%,32%) 50%, hsl(43,55%,55%))",
                  borderLeft: "1px solid hsl(43,30%,22%)",
                  boxShadow:
                    "inset 0 0 6px rgba(0,0,0,0.35), -1px 0 4px rgba(0,0,0,0.4)",
                }}
              />
            </>
          )}
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
              {/* Information kiosk - SVG, no background */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 200 130"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="kioskCounter" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(210,55%,92%)" />
                    <stop offset="60%" stopColor="hsl(210,50%,80%)" />
                    <stop offset="100%" stopColor="hsl(215,55%,55%)" />
                  </linearGradient>
                  <linearGradient id="kioskTop" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(210,70%,45%)" />
                    <stop offset="100%" stopColor="hsl(215,75%,32%)" />
                  </linearGradient>
                  <linearGradient id="kioskPost" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="hsl(210,30%,72%)" />
                    <stop offset="50%" stopColor="hsl(0,0%,98%)" />
                    <stop offset="100%" stopColor="hsl(210,30%,72%)" />
                  </linearGradient>
                  <linearGradient id="skin" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(28,60%,82%)" />
                    <stop offset="100%" stopColor="hsl(28,45%,68%)" />
                  </linearGradient>
                </defs>

                {/* === Attendant (LARGER, more human) === */}
                {/* Body / shirt - white, broader shoulders */}
                <path d="M 78 78 Q 100 60 122 78 L 130 108 L 70 108 Z"
                  fill="hsl(0,0%,98%)" stroke="hsl(210,20%,75%)" strokeWidth="0.6" />
                {/* Blue tie */}
                <path d="M 100 62 L 95 76 L 100 100 L 105 76 Z" fill="hsl(215,75%,40%)" />
                {/* Neck */}
                <rect x="95" y="52" width="10" height="10" fill="url(#skin)" />
                {/* Head */}
                <ellipse cx="100" cy="40" rx="14" ry="16" fill="url(#skin)" stroke="hsl(28,40%,55%)" strokeWidth="0.5" />
                {/* Ears */}
                <ellipse cx="86" cy="42" rx="2.4" ry="3.4" fill="hsl(28,50%,70%)" />
                <ellipse cx="114" cy="42" rx="2.4" ry="3.4" fill="hsl(28,50%,70%)" />
                {/* Hair tufts under cap */}
                <path d="M 86 32 Q 100 26 114 32 L 114 36 Q 100 33 86 36 Z" fill="hsl(28,40%,28%)" />
                {/* Eyes */}
                <circle cx="94" cy="42" r="1.5" fill="hsl(220,40%,18%)" />
                <circle cx="106" cy="42" r="1.5" fill="hsl(220,40%,18%)" />
                <circle cx="94.4" cy="41.5" r="0.5" fill="hsl(0,0%,98%)" />
                <circle cx="106.4" cy="41.5" r="0.5" fill="hsl(0,0%,98%)" />
                {/* Eyebrows */}
                <path d="M 91 38 L 97 37.5" stroke="hsl(28,40%,25%)" strokeWidth="1" strokeLinecap="round" />
                <path d="M 103 37.5 L 109 38" stroke="hsl(28,40%,25%)" strokeWidth="1" strokeLinecap="round" />
                {/* Nose */}
                <path d="M 100 43 L 98.5 49 L 100.5 50 L 101.5 49.5" stroke="hsl(28,40%,55%)" strokeWidth="0.7" fill="none" strokeLinecap="round" />
                {/* Smile */}
                <path d="M 95 52 Q 100 55.5 105 52" stroke="hsl(0,40%,40%)" strokeWidth="1" fill="none" strokeLinecap="round" />
                {/* Cap - blue base */}
                <path d="M 84 30 Q 100 18 116 30 L 116 33 L 84 33 Z" fill="hsl(215,75%,38%)" stroke="hsl(215,55%,22%)" strokeWidth="0.5" />
                {/* Cap stripes */}
                <rect x="84" y="26" width="32" height="2.2" fill="hsl(0,0%,98%)" />
                <rect x="84" y="23" width="32" height="2.2" fill="hsl(0,75%,50%)" />
                {/* Cap brim */}
                <ellipse cx="100" cy="33.5" rx="18" ry="2.5" fill="hsl(215,75%,28%)" />
                {/* Cap top button */}
                <circle cx="100" cy="20.5" r="1.4" fill="hsl(0,0%,98%)" />

                {/* Hands resting on counter */}
                <ellipse cx="70" cy="100" rx="4.5" ry="3" fill="url(#skin)" stroke="hsl(28,40%,55%)" strokeWidth="0.4" />
                <ellipse cx="130" cy="100" rx="4.5" ry="3" fill="url(#skin)" stroke="hsl(28,40%,55%)" strokeWidth="0.4" />

                {/* === LARGER Counter / kiosk desk === */}
                {/* Desk front panel */}
                <rect x="20" y="98" width="160" height="32" rx="2"
                  fill="url(#kioskCounter)"
                  stroke="hsl(215,55%,45%)" strokeWidth="1" />
                {/* Desk top */}
                <rect x="14" y="94" width="172" height="6" rx="2"
                  fill="hsl(0,0%,98%)" stroke="hsl(210,30%,60%)" strokeWidth="0.6" />
                {/* Decorative blue band */}
                <rect x="20" y="120" width="160" height="4" fill="hsl(215,75%,38%)" />
                {/* Front "i" emblem panel */}
                <rect x="88" y="104" width="24" height="14" rx="2" fill="hsl(0,0%,98%)" stroke="hsl(215,75%,38%)" strokeWidth="0.8" />
                <text x="100" y="115.5" textAnchor="middle" fontSize="11" fontWeight="700" fill="hsl(215,75%,38%)" fontFamily="Arial">i</text>
                {/* Side panel divider lines */}
                <line x1="55" y1="100" x2="55" y2="120" stroke="hsl(215,40%,60%)" strokeWidth="0.5" />
                <line x1="145" y1="100" x2="145" y2="120" stroke="hsl(215,40%,60%)" strokeWidth="0.5" />

                {/* Items on desk */}
                <rect x="26" y="86" width="14" height="9" rx="0.8" fill="hsl(220,30%,12%)" stroke="hsl(210,20%,55%)" strokeWidth="0.5" />
                <rect x="27" y="87" width="12" height="7" fill="hsl(195,70%,55%)" />
                <rect x="160" y="88" width="12" height="7" fill="hsl(0,0%,98%)" stroke="hsl(210,20%,70%)" strokeWidth="0.4" />
                <line x1="161" y1="90" x2="171" y2="90" stroke="hsl(210,30%,75%)" strokeWidth="0.5" />
                <line x1="161" y1="92" x2="171" y2="92" stroke="hsl(210,30%,75%)" strokeWidth="0.5" />
                <line x1="161" y1="94" x2="171" y2="94" stroke="hsl(210,30%,75%)" strokeWidth="0.5" />
              </svg>
            </>
          )}

          {floorId === 1 && (
            <>
              {/* Modern ceiling dome with neon LED frame casting light downward */}
              <div
                className="absolute top-0 left-[4%] right-[4%] h-14 md:h-20 rounded-b-[60%] overflow-visible"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 0%, hsl(210,30%,22%), hsl(215,35%,12%) 80%)",
                  boxShadow:
                    "inset 0 -8px 22px rgba(0,0,0,0.55), 0 4px 14px rgba(0,0,0,0.35)",
                }}
              >
                {/* Neon LED ring */}
                <div
                  className="absolute bottom-0 left-[6%] right-[6%] h-[3px] md:h-[4px] rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, hsl(195,100%,75%), hsl(200,100%,88%), hsl(195,100%,75%))",
                    boxShadow:
                      "0 0 12px hsl(195,100%,70%), 0 0 24px hsl(200,100%,65%), 0 0 40px hsl(200,100%,60%)",
                  }}
                />
                {/* Inner secondary LED line */}
                <div
                  className="absolute bottom-2 left-[14%] right-[14%] h-[2px] rounded-full opacity-80"
                  style={{
                    background: "linear-gradient(90deg, transparent, hsl(195,100%,85%), transparent)",
                    boxShadow: "0 0 8px hsl(195,100%,70%)",
                  }}
                />
              </div>

              {/* Light cone projecting downward from the LED frame */}
              <div
                className="absolute top-14 md:top-20 left-1/2 -translate-x-1/2 pointer-events-none"
                style={{
                  width: "85%",
                  height: "55%",
                  background:
                    "radial-gradient(ellipse at 50% 0%, hsla(195,100%,75%,0.28), hsla(200,80%,65%,0.10) 55%, transparent 80%)",
                  filter: "blur(2px)",
                }}
              />

              {/* Bar counter (seating zone) */}
              <div className="absolute bottom-[18%] left-[10%] right-[10%] h-[3px] md:h-[4px] rounded-full"
                style={{
                  background: "linear-gradient(90deg, hsl(200,40%,70%), hsl(210,35%,85%), hsl(200,40%,70%))",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.4), 0 0 10px hsla(195,100%,70%,0.4)",
                }}
              />
              {/* Bar front panel */}
              <div
                className="absolute bottom-[6%] left-[10%] right-[10%] h-[12%] rounded-sm"
                style={{
                  background:
                    "linear-gradient(180deg, hsl(215,30%,22%), hsl(215,35%,14%))",
                  borderTop: "1px solid hsla(195,100%,75%,0.5)",
                  boxShadow:
                    "inset 0 1px 4px rgba(255,255,255,0.08), 0 -2px 8px hsla(195,100%,60%,0.25)",
                }}
              >
                {/* Soft under-counter LED glow */}
                <div
                  className="absolute -bottom-1 left-2 right-2 h-1 rounded-full opacity-80"
                  style={{
                    background: "linear-gradient(90deg, transparent, hsl(195,100%,75%), transparent)",
                    filter: "blur(2px)",
                  }}
                />
              </div>

              {/* Bar stools (3 small seats) */}
              {[20, 50, 80].map((left) => (
                <div key={left} className="absolute" style={{ left: `${left}%`, bottom: "20%", transform: "translateX(-50%)" }}>
                  <div
                    className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full"
                    style={{
                      background: "linear-gradient(180deg, hsl(200,30%,80%), hsl(210,25%,55%))",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.4)",
                    }}
                  />
                  <div
                    className="mx-auto w-[1.5px] h-2 md:h-2.5"
                    style={{ background: "hsl(210,15%,45%)" }}
                  />
                </div>
              ))}

              {/* Modern glass railing — light blue, glossy */}
              <div className="absolute bottom-[34%] left-[6%] right-[6%] h-[24%]">
                <div
                  className="absolute inset-0 rounded-sm overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(180deg, hsla(195,80%,82%,0.45), hsla(200,70%,65%,0.28))",
                    border: "1px solid hsla(195,90%,88%,0.7)",
                    boxShadow:
                      "inset 0 2px 10px hsla(195,100%,90%,0.5), inset 0 -2px 8px hsla(200,80%,55%,0.25), 0 4px 14px hsla(195,90%,55%,0.35), 0 0 18px hsla(195,100%,70%,0.25)",
                  }}
                >
                  {/* Glossy diagonal highlight */}
                  <div
                    className="absolute -inset-1 opacity-60"
                    style={{
                      background:
                        "linear-gradient(115deg, transparent 30%, hsla(195,100%,95%,0.55) 45%, transparent 60%)",
                    }}
                  />
                </div>
                {/* Slim chrome posts */}
                {[10, 35, 65, 90].map((l) => (
                  <div
                    key={l}
                    className="absolute top-0 bottom-0 w-[2px]"
                    style={{
                      left: `${l}%`,
                      background: "linear-gradient(180deg, hsl(210,20%,90%), hsl(210,15%,55%))",
                      boxShadow: "0 0 4px rgba(0,0,0,0.3)",
                    }}
                  />
                ))}
                {/* Top chrome handrail with cyan glow */}
                <div
                  className="absolute -top-1 left-0 right-0 h-1.5 md:h-2 rounded-full"
                  style={{
                    background:
                      "linear-gradient(180deg, hsl(210,25%,95%), hsl(210,15%,55%))",
                    boxShadow:
                      "0 0 6px hsla(195,100%,75%,0.6), 0 2px 4px rgba(0,0,0,0.4)",
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
