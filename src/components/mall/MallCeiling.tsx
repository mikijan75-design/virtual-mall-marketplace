import ceilingFresco from "@/assets/ceiling-fresco.jpg";

/**
 * MallCeiling — פיקסל-לפיקסל שחזור של הכיפה העליונה:
 *  - מסגרת זהב כפולה מקודדת ב-CSS
 *  - חצי-אליפסה רחבה (clip-path) שיוצרת את צורת הכיפה
 *  - ציור הפרסקו עצמו כתמונה (אסט אומנותי) בתוך המסגרת המקודדת
 *  - vignette + glare מקודדים ב-CSS למראה תלת־ממדי
 *  - קרניז זהב תחתון
 */
const MallCeiling = () => {
  return (
    <div className="relative w-full" aria-label="כיפת פרסקו">
      {/* רקע קיר קרם מאחורי הכיפה */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, hsl(35 25% 70%) 0%, hsl(36 22% 78%) 100%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto w-full" style={{ aspectRatio: "1630 / 360" }}>
        {/* קונטיינר כיפה עם clip-path בצורת חצי-אליפסה רחבה */}
        <div
          className="absolute inset-x-[1.5%] top-0 bottom-[6%]"
          style={{
            clipPath: "ellipse(49% 100% at 50% 100%)",
            background:
              "radial-gradient(ellipse 60% 90% at 50% 95%, hsl(45 85% 88%) 0%, hsl(40 55% 72%) 75%, hsl(38 45% 60%) 100%)",
          }}
        >
          {/* תמונת הפרסקו — נמתחת בתוך החצי-אליפסה */}
          <img
            src={ceilingFresco}
            alt="פרסקו תקרת רנסנס - מלאכים, עננים וקרני אור"
            className="absolute inset-0 h-full w-full select-none"
            style={{ objectFit: "cover", objectPosition: "center 30%" }}
            draggable={false}
            width={1920}
            height={1080}
          />

          {/* בוהק עליון - אור שמיים מהקרן המרכזית */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 50% 60% at 50% 25%, hsl(48 100% 90% / 0.32) 0%, transparent 70%)",
              mixBlendMode: "screen",
            }}
            aria-hidden
          />

          {/* vignette - הצללה בקצוות החיצוניים של הכיפה */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 75% 95% at 50% 100%, transparent 55%, hsl(28 30% 18% / 0.35) 100%)",
              mixBlendMode: "multiply",
            }}
            aria-hidden
          />
        </div>

        {/* מסגרת זהב חיצונית — קו עבה מקודד עם clip-path כקשת */}
        <div
          className="absolute inset-x-[1.5%] top-0 bottom-[6%] pointer-events-none"
          style={{
            clipPath: "ellipse(49% 100% at 50% 100%)",
            background:
              "radial-gradient(ellipse 49% 100% at 50% 100%, transparent 0, transparent calc(100% - 12px), hsl(43 65% 55%) calc(100% - 11px), hsl(43 75% 70%) calc(100% - 8px), hsl(43 50% 38%) calc(100% - 4px), hsl(43 60% 50%) 100%)",
          }}
          aria-hidden
        />

        {/* קרניז זהב תחתון - בסיס הכיפה */}
        <div
          className="absolute inset-x-0 bottom-0 h-[5%] z-10"
          style={{
            background:
              "linear-gradient(180deg, hsl(43 70% 65%) 0%, hsl(43 55% 45%) 45%, hsl(43 38% 28%) 100%)",
            boxShadow:
              "0 4px 14px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(0,0,0,0.5)",
          }}
          aria-hidden
        />

        {/* קישוט מרכזי בבסיס הקרניז (מדליון) */}
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-0 z-20"
          style={{
            width: "5%",
            aspectRatio: "1",
            background:
              "radial-gradient(circle at 50% 35%, hsl(43 80% 75%), hsl(43 50% 40%))",
            clipPath:
              "polygon(50% 0%, 60% 38%, 95% 50%, 60% 62%, 50% 100%, 40% 62%, 5% 50%, 40% 38%)",
            transform: "translate(50%, 30%)",
            boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
          }}
          aria-hidden
        />
      </div>
    </div>
  );
};

export default MallCeiling;
