import { Link } from "react-router-dom";
import gateV1 from "@/assets/floor-gate-v1.png";
import gateV2 from "@/assets/floor-gate-v2.png";
import gateV3 from "@/assets/floor-gate-v3.png";

const variants = [
  {
    id: 1,
    title: "וריאציה 1 — קלאסית",
    desc: "שער זהב מקושט עם עציצים על מעקות זכוכית ומדרגות שיש ירוק. הכי קרוב לתמונה המקורית.",
    image: gateV1,
  },
  {
    id: 2,
    title: "וריאציה 2 — מפוארת",
    desc: "שער גרנדיוזי עם עמודי שיש, קישוטי זהב עשירים ומדרגות רחבות. הכי יוקרתי.",
    image: gateV2,
  },
  {
    id: 3,
    title: "וריאציה 3 — נקייה",
    desc: "שער זהב עם פחות פרטים וקומפוזיציה ברורה. הכי מינימליסטי וקריא.",
    image: gateV3,
  },
];

const FloorPreview = ({ image, label }: { image: string; label: string }) => (
  <div className="relative mx-auto max-w-5xl border-4 border-mall-gold/70 bg-mall-wall shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
    <div className="grid grid-cols-7 gap-2 p-3">
      {[0, 1, 2].map((i) => (
        <div
          key={`l-${i}`}
          className="aspect-[3/4] border border-mall-gold/50 bg-card/80 flex items-center justify-center text-xs text-muted-foreground"
        >
          חנות {i + 1}
        </div>
      ))}
      <div className="relative aspect-[3/4] border-2 border-mall-gold bg-background overflow-hidden">
        <img src={image} alt={label} className="absolute inset-0 h-full w-full object-cover" />
      </div>
      {[3, 4, 5].map((i) => (
        <div
          key={`r-${i}`}
          className="aspect-[3/4] border border-mall-gold/50 bg-card/80 flex items-center justify-center text-xs text-muted-foreground"
        >
          חנות {i + 1}
        </div>
      ))}
    </div>
  </div>
);

const PreviewGates = () => {
  return (
    <div dir="rtl" className="min-h-screen bg-background py-10 px-4">
      <div className="max-w-6xl mx-auto mb-10 text-center">
        <h1 className="font-frank text-3xl md:text-4xl font-bold text-foreground mb-3">
          תצוגת וריאציות שער מרכזי לקומות
        </h1>
        <p className="text-muted-foreground">
          השוואה זו אחר זו של שלוש הוריאציות. בחר את המועדפת עליך.
        </p>
        <Link
          to="/"
          className="inline-block mt-4 text-sm text-primary underline underline-offset-4"
        >
          ← חזרה לעמוד הראשי
        </Link>
      </div>

      <div className="space-y-16">
        {variants.map((v) => (
          <section key={v.id} className="space-y-4">
            <div className="max-w-5xl mx-auto flex items-end justify-between gap-4 flex-wrap">
              <div>
                <h2 className="font-frank text-2xl font-bold text-foreground">{v.title}</h2>
                <p className="text-sm text-muted-foreground mt-1 max-w-2xl">{v.desc}</p>
              </div>
              <div className="text-xs text-muted-foreground">
                לבחירה: כתוב לי "אני בוחר וריאציה {v.id}"
              </div>
            </div>

            <FloorPreview image={v.image} label={v.title} />

            <div className="max-w-5xl mx-auto">
              <details className="text-sm">
                <summary className="cursor-pointer text-muted-foreground">
                  הצג תמונה מלאה של השער
                </summary>
                <img
                  src={v.image}
                  alt={`${v.title} - תמונה מלאה`}
                  className="mt-3 w-full max-w-2xl rounded border border-mall-gold/50"
                />
              </details>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default PreviewGates;