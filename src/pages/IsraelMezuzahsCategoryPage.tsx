import { useParams, Link, useNavigate } from "react-router-dom";
import MallHeader from "@/components/mall/MallHeader";
import MallFooter from "@/components/mall/MallFooter";
import PageTracker from "@/components/PageTracker";
import { Search } from "lucide-react";
import imProduct1 from "@/assets/stores/im-product-1.png";
import imProduct2 from "@/assets/stores/im-product-2.png";
import imProduct3 from "@/assets/stores/im-product-3.png";
import imProduct4 from "@/assets/stores/im-product-4.png";
import imProduct5 from "@/assets/stores/im-product-5.png";
import imProduct6 from "@/assets/stores/im-product-6.png";
import imProduct7 from "@/assets/stores/im-product-7.png";
import imProduct8 from "@/assets/stores/im-product-8.png";
import { israelMezuzahProducts } from "@/data/israelMezuzahProducts";
import { israelMapProducts } from "@/data/israelMapProducts";
import { pamotProducts } from "@/data/pamotProducts";
import { hanukkiotProducts } from "@/data/hanukkiotProducts";
import { krashimProducts } from "@/data/krashimProducts";
import { rimonimProducts } from "@/data/rimonimProducts";
import { agartelimProducts } from "@/data/agartelimProducts";
import { sheonimProducts } from "@/data/sheonimProducts";

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
    name: "קרשים להגשה",
    hero: imProduct2,
    description: "קרשים להגשה מעץ זית ואפוקסי בעבודת יד – הפריט שבתמונה הוא הפריט המדויק שתקבלו.",
    items: [
      { name: "מגש עגול", img: imProduct2, description: "מגש עגול לאירוח יומיומי." },
      { name: "מגש מלבני גדול", img: imProduct2, description: "מגש מלבני לארוחות שבת וחג." },
      { name: "סט מגשים", img: imProduct2, description: "שלושה מגשים בגדלים שונים." },
    ],
  },
  {
    slug: "coasters",
    name: "שעונים",
    hero: imProduct3,
    description: "שעוני קיר ושולחן מעץ זית ואפוקסי בעבודת יד – הפריט שבתמונה הוא הפריט המדויק שתקבלו.",
    items: [
      { name: "סט 4 תחתיות", img: imProduct3, description: "סט בסיסי בגוונים אחידים." },
      { name: "סט 6 תחתיות", img: imProduct3, description: "סט עשיר במגוון צבעים." },
      { name: "תחתית בודדת מהודרת", img: imProduct3, description: "תחתית מתנה עם אריזה." },
    ],
  },
  {
    slug: "decorative-beads",
    name: "אגרטלים",
    hero: imProduct4,
    description: "אגרטלים מעץ זית ואפוקסי בעבודת יד – שילוב ייחודי של עץ זית טבעי עם אפוקסי צבעוני.",
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
    name: "רימונים",
    hero: imProduct6,
    description: "רימונים מעוצבים מעץ זית ואפוקסי – לשפע ולברכה.",
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
  const navigate = useNavigate();
  const categoryIdx = imCategories.findIndex((c) => c.slug === categorySlug);
  const category = categoryIdx >= 0 ? imCategories[categoryIdx] : undefined;
  const isMezuzahs = category?.slug === "mezuzahs";
  const isIsraelMap = category?.slug === "israel-map";
  const isShabbatCandles = category?.slug === "shabbat-candles";
  const isHanukkiot = category?.slug === "hanukkiahs";
  const isKrashim = category?.slug === "serving-trays";
  const isRimonim = category?.slug === "hamsa-pomegranate";
  const isAgartelim = category?.slug === "decorative-beads";
  const isSheonim = category?.slug === "coasters";
  const productGrid = isMezuzahs
    ? israelMezuzahProducts
    : isIsraelMap
    ? israelMapProducts
    : isShabbatCandles
    ? pamotProducts
    : isHanukkiot
    ? hanukkiotProducts
    : isKrashim
    ? krashimProducts
    : isRimonim
    ? rimonimProducts
    : isAgartelim
    ? agartelimProducts
    : isSheonim
    ? sheonimProducts
    : null;

  const openProduct = (productId: string) => {
    if (!productGrid) return;
    const p = productGrid.find((x) => x.id === productId);
    if (!p) return;
    const collectionKey = isIsraelMap
      ? "israel-map"
      : isShabbatCandles
      ? "shabbat-candles"
      : isHanukkiot
      ? "hanukkiahs"
      : isKrashim
      ? "serving-trays"
      : isRimonim
      ? "hamsa-pomegranate"
      : isAgartelim
      ? "decorative-beads"
      : isSheonim
      ? "coasters"
      : "mezuzahs";
    navigate("/sense-pro", {
      state: {
        mezuzah: {
          productId: p.id,
          collection: collectionKey,
          itemNumber: productGrid.findIndex((x) => x.id === p.id) + 1,
          image: p.image,
          name: p.name,
          brand: "Israel Mezuzahs",
          unitPrice: p.price,
          shippingPerItem: 20,
          sourceUrl: p.url,
        },
      },
    });
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
        <div className="max-w-6xl mx-auto">
          <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-lg">
            {productGrid ? (
              <div dir="rtl">
                <div className="text-center mb-6">
                  <h2 className="text-3xl md:text-4xl font-frank font-bold text-foreground mb-2">
                    {isIsraelMap
                      ? "קולקציית מזוזות בצורת ארץ ישראל"
                      : isShabbatCandles
                      ? "קולקציית פמוטים"
                      : isHanukkiot
                      ? "קולקציית חנוכיות"
                      : isKrashim
                      ? "קולקציית קרשים להגשה"
                      : isRimonim
                      ? "קולקציית רימונים"
                      : isAgartelim
                      ? "קולקציית אגרטלים"
                      : isSheonim
                      ? "קולקציית שעונים"
                      : "קולקציית מזוזות 20 ס״מ"}
                  </h2>
                  <p className="text-muted-foreground font-heebo leading-relaxed max-w-3xl mx-auto">
                    {isIsraelMap
                      ? "בתי מזוזה בצורת מפת ארץ ישראל מעץ זית ואפוקסי – הפריט שבתמונה הוא הפריט המדויק שתקבלו. לחצו על הזכוכית המגדלת כדי לפתוח את המוצר."
                      : isShabbatCandles
                      ? "פמוטי שבת מעץ זית ואפוקסי בעבודת יד – הפריט שבתמונה הוא הפריט המדויק שתקבלו. לחצו על הזכוכית המגדלת כדי לפתוח את המוצר."
                      : isHanukkiot
                      ? "חנוכיות מעץ זית ואפוקסי בעבודת יד – הפריט שבתמונה הוא הפריט המדויק שתקבלו. לחצו על הזכוכית המגדלת כדי לפתוח את המוצר."
                      : isKrashim
                      ? "קרשים להגשה מעץ זית ואפוקסי בעבודת יד – הפריט שבתמונה הוא הפריט המדויק שתקבלו. לחצו על הזכוכית המגדלת כדי לפתוח את המוצר."
                      : isRimonim
                      ? "רימונים מעוצבים מעץ זית ואפוקסי – הפריט שבתמונה הוא הפריט המדויק שתקבלו. לחצו על הזכוכית המגדלת כדי לפתוח את המוצר."
                      : isAgartelim
                      ? "אגרטלים מעץ זית ואפוקסי בעבודת יד – הפריט שבתמונה הוא הפריט המדויק שתקבלו. לחצו על הזכוכית המגדלת כדי לפתוח את המוצר."
                      : isSheonim
                      ? "שעוני קיר ושולחן מעץ זית ואפוקסי בעבודת יד – הפריט שבתמונה הוא הפריט המדויק שתקבלו. לחצו על הזכוכית המגדלת כדי לפתוח את המוצר."
                      : "בית מזוזה 20 ס״מ (לקלף 17 ס״מ) מעץ זית ואפוקסי ייחודי – הפריט שבתמונה הוא הפריט המדויק שתקבלו. לחצו על הזכוכית המגדלת על מזוזה כדי לפתוח אותה בעמוד המוצר."}
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {productGrid.map((p) => (
                    <div
                      key={p.id}
                      className="group relative bg-muted rounded-lg p-3 border border-border flex flex-col"
                    >
                      <button
                        type="button"
                        onClick={() => openProduct(p.id)}
                        className="absolute top-2 left-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-mall-sign text-mall-gold border border-mall-gold/60 shadow-md hover:scale-110 transition-transform"
                        aria-label={`פתח את ${p.name}`}
                        title="פתח בעמוד המוצר"
                      >
                        <Search className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => openProduct(p.id)}
                        className="w-full aspect-square bg-white rounded-md mb-3 overflow-hidden border border-border"
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          loading="lazy"
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                        />
                      </button>
                      <p className="text-sm font-heebo font-bold text-foreground text-right mb-1 line-clamp-2 min-h-[2.5rem]">
                        {p.name}
                      </p>
                      <p className="text-mall-gold font-heebo font-bold text-right">₪{p.price}</p>
                      <p className="text-xs text-muted-foreground font-heebo text-right mt-1">
                        הפריט המוצג הוא הפריט שתקבלו
                      </p>
                    </div>
                  ))}
                </div>
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