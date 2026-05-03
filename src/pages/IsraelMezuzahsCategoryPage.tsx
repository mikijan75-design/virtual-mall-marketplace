import { useParams, Link } from "react-router-dom";
import { useRef, useState } from "react";
import MallHeader from "@/components/mall/MallHeader";
import MallFooter from "@/components/mall/MallFooter";
import PageTracker from "@/components/PageTracker";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import imProduct1 from "@/assets/stores/im-product-1.png";
import imProduct2 from "@/assets/stores/im-product-2.png";
import imProduct3 from "@/assets/stores/im-product-3.png";
import imProduct4 from "@/assets/stores/im-product-4.png";
import imProduct5 from "@/assets/stores/im-product-5.png";
import imProduct6 from "@/assets/stores/im-product-6.png";
import imProduct7 from "@/assets/stores/im-product-7.png";
import imProduct8 from "@/assets/stores/im-product-8.png";
import imMezuzahsCollection from "@/assets/stores/im-mezuzahs-collection.png";

export interface IMCategory {
  slug: string;
  name: string;
  hero: string;
  description: string;
  items: { name: string; img: string; description: string }[];
}

export const imCategories: IMCategory[] = [
  {
    slug: "shabbat-candles",
    name: "פמוטי שבת",
    hero: imProduct1,
    description: "פמוטים מעוצבים בעבודת יד מעץ זית ואפוקסי, להדלקת נרות שבת וחג.",
    items: [
      { name: "פמוט זוגי קלאסי", img: imProduct1, description: "פמוט זוגי מעץ זית עם שיבוץ אפוקסי כחול." },
      { name: "פמוט מודרני", img: imProduct1, description: "עיצוב נקי וייחודי בגוונים חמים." },
      { name: "פמוט מתנה", img: imProduct1, description: "מארז מתנה מהודר לאירועים מיוחדים." },
    ],
  },
  {
    slug: "serving-trays",
    name: "מגשי הגשה",
    hero: imProduct2,
    description: "מגשי הגשה ייחודיים מעץ זית עם שיבוצי אפוקסי בגוונים מרהיבים.",
    items: [
      { name: "מגש עגול", img: imProduct2, description: "מגש עגול לאירוח יומיומי." },
      { name: "מגש מלבני גדול", img: imProduct2, description: "מגש מלבני לארוחות שבת וחג." },
      { name: "סט מגשים", img: imProduct2, description: "שלושה מגשים בגדלים שונים." },
    ],
  },
  {
    slug: "coasters",
    name: "תחתיות לכוסות",
    hero: imProduct3,
    description: "תחתיות עץ זית עם אפוקסי – מתנה מושלמת לכל בית.",
    items: [
      { name: "סט 4 תחתיות", img: imProduct3, description: "סט בסיסי בגוונים אחידים." },
      { name: "סט 6 תחתיות", img: imProduct3, description: "סט עשיר במגוון צבעים." },
      { name: "תחתית בודדת מהודרת", img: imProduct3, description: "תחתית מתנה עם אריזה." },
    ],
  },
  {
    slug: "decorative-beads",
    name: "חרוזים מעוצבים",
    hero: imProduct4,
    description: "חרוזים בעבודת יד משילוב עץ זית ואפוקסי – לאקססוריז ותכשיטים.",
    items: [
      { name: "מחרוזת קלאסית", img: imProduct4, description: "מחרוזת בגווני טבע." },
      { name: "צמיד תואם", img: imProduct4, description: "צמיד מחרוזים בגוון תואם." },
      { name: "סט תכשיטים", img: imProduct4, description: "מחרוזת וצמיד יחד." },
    ],
  },
  {
    slug: "mezuzahs",
    name: "מזוזות",
    hero: imProduct5,
    description: "מזוזות מעוצבות בעץ זית מארץ ישראל בשילוב אפוקסי בגוונים מרהיבים.",
    items: [
      { name: "מזוזה קלאסית", img: imProduct5, description: "מזוזת עץ זית עם פס אפוקסי." },
      { name: "מזוזה מהודרת", img: imProduct5, description: "מזוזה גדולה לדלת הכניסה." },
      { name: "מארז זוגי", img: imProduct5, description: "שתי מזוזות תואמות לבית." },
    ],
  },
  {
    slug: "hamsa-pomegranate",
    name: "תליוני חמסה ורימון",
    hero: imProduct6,
    description: "תליונים מסורתיים לקיר – חמסות ורימונים בעיצוב מיוחד.",
    items: [
      { name: "תליון חמסה", img: imProduct6, description: "חמסה לברכה ולשמירה." },
      { name: "תליון רימון", img: imProduct6, description: "רימון לשפע ולברכה." },
      { name: "סט חמסה ורימון", img: imProduct6, description: "סט תליונים תואמים." },
    ],
  },
  {
    slug: "israel-map",
    name: "מפת ישראל",
    hero: imProduct7,
    description: "מפת ישראל מעוצבת מעץ זית ואפוקסי – יצירה אומנותית לבית או למשרד.",
    items: [
      { name: "מפה קטנה", img: imProduct7, description: "מפה לתליה במשרד." },
      { name: "מפה גדולה", img: imProduct7, description: "מפה מרשימה לסלון." },
      { name: "מפה אישית", img: imProduct7, description: "מפה עם הקדשה אישית." },
    ],
  },
  {
    slug: "hanukkiahs",
    name: "חנוכיות",
    hero: imProduct8,
    description: "חנוכיות מהודרות בעבודת יד מעץ זית ואפוקסי לחג החנוכה.",
    items: [
      { name: "חנוכייה קלאסית", img: imProduct8, description: "חנוכייה בעיצוב מסורתי." },
      { name: "חנוכייה מודרנית", img: imProduct8, description: "עיצוב עכשווי ונקי." },
      { name: "חנוכייה מהודרת", img: imProduct8, description: "חנוכייה גדולה למשפחה." },
    ],
  },
];

const IsraelMezuzahsCategoryPage = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const categoryIdx = imCategories.findIndex((c) => c.slug === categorySlug);
  const category = categoryIdx >= 0 ? imCategories[categoryIdx] : undefined;
  const isMezuzahs = category?.slug === "mezuzahs";

  const lensSize = 320;
  const zoom = 1.8;
  const imgRef = useRef<HTMLImageElement>(null);
  const [lens, setLens] = useState<{ x: number; y: number; bgX: number; bgY: number; bgW: number; bgH: number; visible: boolean }>({
    x: 0, y: 0, bgX: 0, bgY: 0, bgW: 0, bgH: 0, visible: false,
  });
  const [zoomOpen, setZoomOpen] = useState(false);
  const [snapshot, setSnapshot] = useState<{ bgX: number; bgY: number; bgW: number; bgH: number } | null>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const img = imgRef.current;
    if (!img) return;
    const rect = img.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
      setLens((l) => ({ ...l, visible: false }));
      return;
    }
    setLens({
      x,
      y,
      bgW: rect.width * zoom,
      bgH: rect.height * zoom,
      bgX: -(x * zoom - lensSize / 2),
      bgY: -(y * zoom - lensSize / 2),
      visible: true,
    });
  };

  const handleClick = () => {
    if (!lens.visible) return;
    setSnapshot({ bgX: lens.bgX, bgY: lens.bgY, bgW: lens.bgW, bgH: lens.bgH });
    setZoomOpen(true);
  };

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <MallHeader />
        <PageTracker storeId="s2" />
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <span className="text-6xl">🔍</span>
          <h2 className="text-2xl font-frank font-bold text-foreground">הקטגוריה לא נמצאה</h2>
          <Link to="/store/s2" className="text-mall-gold hover:underline font-heebo">
            חזרה לחנות ←
          </Link>
        </div>
        <MallFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <MallHeader />
      <PageTracker storeId="s2" categorySlug={category.slug} categoryIndex={categoryIdx + 1} />

      <div className="bg-gradient-to-r from-cyan-400 to-blue-600 py-8 md:py-12">
        <div className="container mx-auto text-center text-white px-4">
          <h1 className="text-3xl md:text-5xl font-frank font-bold mb-2">{category.name}</h1>
          <p className="text-lg opacity-90 font-heebo max-w-2xl mx-auto">{category.description}</p>
          <span className="inline-block mt-3 bg-white/20 px-4 py-1 rounded-full text-sm font-heebo">
            Israel Mezuzahs • קומה 3
          </span>
        </div>
      </div>

      <div className="container mx-auto py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-lg">
            {isMezuzahs ? (
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-frank font-bold text-foreground mb-2">
                  על {category.name}
                </h2>
                <p className="text-muted-foreground font-heebo leading-relaxed max-w-3xl mx-auto mb-6">
                  {category.description}
                </p>
                <div
                  className="relative inline-block w-full overflow-hidden rounded-lg shadow-md cursor-crosshair"
                  onMouseMove={handleMove}
                  onMouseLeave={() => setLens((l) => ({ ...l, visible: false }))}
                  onClick={handleClick}
                >
                  <img
                    ref={imgRef}
                    src={imMezuzahsCollection}
                    alt={category.name}
                    className="w-full h-auto block select-none"
                    draggable={false}
                  />
                  {lens.visible && (
                    <>
                    <div
                      className="pointer-events-none absolute rounded-full border-4 border-white shadow-2xl ring-2 ring-black/30"
                      style={{
                        width: lensSize,
                        height: lensSize,
                        left: lens.x - lensSize / 2,
                        top: lens.y - lensSize / 2,
                        backgroundImage: `url(${imMezuzahsCollection})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: `${lens.bgW}px ${lens.bgH}px`,
                        backgroundPosition: `${lens.bgX}px ${lens.bgY}px`,
                      }}
                    />
                      <div
                        className="pointer-events-none absolute bg-mall-sign text-mall-gold text-sm font-heebo font-bold px-3 py-1 rounded-full shadow-lg border border-mall-gold/60 whitespace-nowrap"
                        style={{
                          left: lens.x,
                          top: lens.y + lensSize / 2 + 10,
                          transform: "translateX(-50%)",
                        }}
                      >
                        לחץ לבחירה
                      </div>
                    </>
                  )}
                </div>
                <Dialog open={zoomOpen} onOpenChange={setZoomOpen}>
                  <DialogContent className="max-w-2xl p-4">
                    {snapshot && (
                      <div
                        className="w-full aspect-square rounded-lg shadow-inner"
                        style={{
                          backgroundImage: `url(${imMezuzahsCollection})`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: `${snapshot.bgW * 1.6}px ${snapshot.bgH * 1.6}px`,
                          backgroundPosition: `${snapshot.bgX * 1.6 - 100}px ${snapshot.bgY * 1.6 - 100}px`,
                        }}
                      />
                    )}
                    <p className="text-center font-heebo text-foreground mt-3">תקריב הפריט הנבחר</p>
                  </DialogContent>
                </Dialog>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 items-center">
                  <img
                    src={category.hero}
                    alt={category.name}
                    className="w-full h-auto rounded-lg shadow-md object-cover aspect-square"
                  />
                  <div className="text-right">
                    <h2 className="text-2xl font-frank font-bold text-foreground mb-3">
                      על {category.name}
                    </h2>
                    <p className="text-muted-foreground font-heebo leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </div>

                <h3 className="text-xl font-frank font-bold text-foreground mb-4 text-right">
                  דגמים בקטגוריה
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {category.items.map((item, i) => (
                    <div
                      key={i}
                      className="bg-muted rounded-lg p-4 border border-border flex flex-col"
                    >
                      <div className="w-full aspect-square bg-secondary rounded-md mb-3 overflow-hidden">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <p className="text-base font-heebo font-bold text-foreground text-right mb-1">
                        {item.name}
                      </p>
                      <p className="text-sm text-muted-foreground font-heebo text-right">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="text-center mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              to="/store/s2"
              className="inline-block bg-mall-sign text-mall-gold font-heebo font-bold px-6 py-3 rounded-lg hover:bg-mall-gold hover:text-mall-sign transition-colors shadow-md"
            >
              ← חזרה לחנות
            </Link>
            <Link
              to="/"
              className="inline-block bg-secondary text-foreground font-heebo font-bold px-6 py-3 rounded-lg hover:bg-muted transition-colors shadow-md"
            >
              ← חזרה לקניון
            </Link>
          </div>
        </div>
      </div>
      <MallFooter />
    </div>
  );
};

export default IsraelMezuzahsCategoryPage;