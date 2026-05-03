import { useParams, Link } from "react-router-dom";
import { mallFloors } from "@/data/mallData";
import MallHeader from "@/components/mall/MallHeader";
import PageTracker from "@/components/PageTracker";
import israelMezuzahsAbout from "@/assets/stores/israel-mezuzahs-about.png";
import imBeadLogo from "@/assets/stores/im-bead-logo.png";
import imProduct1 from "@/assets/stores/im-product-1.png";
import imProduct2 from "@/assets/stores/im-product-2.png";
import imProduct3 from "@/assets/stores/im-product-3.png";
import imProduct4 from "@/assets/stores/im-product-4.png";
import imProduct5 from "@/assets/stores/im-product-5.png";
import imProduct6 from "@/assets/stores/im-product-6.png";
import imProduct7 from "@/assets/stores/im-product-7.png";
import imProduct8 from "@/assets/stores/im-product-8.png";

const israelMezuzahsProducts = [
  { src: imProduct1, name: "פמוטי שבת", slug: "shabbat-candles" },
  { src: imProduct2, name: "מגשי הגשה", slug: "serving-trays" },
  { src: imProduct3, name: "תחתיות לכוסות", slug: "coasters" },
  { src: imProduct4, name: "חרוזים מעוצבים", slug: "decorative-beads" },
  { src: imProduct5, name: "מזוזות", slug: "mezuzahs" },
  { src: imProduct6, name: "תליוני חמסה ורימון", slug: "hamsa-pomegranate" },
  { src: imProduct7, name: "מפת ישראל", slug: "israel-map" },
  { src: imProduct8, name: "חנוכיות", slug: "hanukkiahs" },
];

const StorePage = () => {
  const { storeId } = useParams<{ storeId: string }>();
  
  const store = mallFloors
    .flatMap((f) => f.stores)
    .find((s) => s.id === storeId);

  if (!store) {
    return (
      <div className="min-h-screen bg-background">
        <MallHeader />
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <span className="text-6xl">🚪</span>
          <h2 className="text-2xl font-frank font-bold text-foreground">החנות לא נמצאה</h2>
          <Link to="/" className="text-mall-gold hover:underline font-heebo">חזרה לקניון ←</Link>
        </div>
      </div>
    );
  }

  const isIsraelMezuzahs = store.id === "s2";

  return (
    <div className="min-h-screen bg-background">
      <MallHeader />
      <PageTracker storeId={store.id} />

      {/* Store banner */}
      <div className={`bg-gradient-to-r ${store.signColor} py-8 md:py-12`}>
        <div className="container mx-auto text-center text-white">
          {isIsraelMezuzahs ? (
            <img
              src={imBeadLogo}
              alt="Israel Mezuzahs logo"
              className="block mx-auto mb-4 h-24 md:h-32 w-auto object-contain"
              style={{
                filter:
                  "drop-shadow(-2px -3px 2px rgba(255,240,210,0.55)) drop-shadow(14px 22px 10px rgba(0,0,0,0.65))",
              }}
            />
          ) : (
            <span className="text-6xl md:text-8xl block mb-4">{store.logoEmoji}</span>
          )}
          <h1 className="text-3xl md:text-5xl font-frank font-bold mb-2">
            {isIsraelMezuzahs ? "Israel Mezuzahs" : store.name}
          </h1>
          <p className="text-lg opacity-90 font-heebo">
            {isIsraelMezuzahs ? "Olive Wood & Epoxy Art • אומנות בעץ זית ואפוקסי" : store.description}
          </p>
          <span className="inline-block mt-3 bg-white/20 px-4 py-1 rounded-full text-sm font-heebo">
            {store.category} • קומה {store.floor}
          </span>
        </div>
      </div>

      {/* Store content placeholder */}
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-xl p-8 shadow-lg text-center">
            {isIsraelMezuzahs ? (
              <>
                {/* Image in center with products on sides */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch">
                  {/* Left column - 2 products */}
                  <div className="hidden md:flex flex-col gap-4">
                    {israelMezuzahsProducts.slice(0, 2).map((p, i) => (
                      <Link to={`/store/s2/category/${p.slug}`} key={`l-${i}`} className="bg-muted rounded-lg p-4 border border-border flex-1 hover:border-mall-gold transition-colors">
                        <div className="w-full aspect-square bg-secondary rounded-md mb-3 overflow-hidden">
                          <img src={p.src} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                        </div>
                        <p className="text-sm font-heebo text-foreground text-center">{p.name}</p>
                      </Link>
                    ))}
                  </div>

                  {/* Center - hero image */}
                  <div className="md:col-span-2 flex items-center justify-center">
                    <img
                      src={israelMezuzahsAbout}
                      alt="Rachel & Mauri - יריד האומנים בנחלת בנימין"
                      className="w-full h-auto rounded-lg shadow-md object-contain"
                    />
                  </div>

                  {/* Right column - 2 products */}
                  <div className="hidden md:flex flex-col gap-4">
                    {israelMezuzahsProducts.slice(2, 4).map((p, i) => (
                      <Link to={`/store/s2/category/${p.slug}`} key={`r-${i}`} className="bg-muted rounded-lg p-4 border border-border flex-1 hover:border-mall-gold transition-colors">
                        <div className="w-full aspect-square bg-secondary rounded-md mb-3 overflow-hidden">
                          <img src={p.src} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                        </div>
                        <p className="text-sm font-heebo text-foreground text-center">{p.name}</p>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Bottom row - products under image */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {israelMezuzahsProducts.slice(4, 8).map((p, i) => (
                    <Link to={`/store/s2/category/${p.slug}`} key={`b-${i}`} className="bg-muted rounded-lg p-4 border border-border hover:border-mall-gold transition-colors">
                      <div className="w-full aspect-square bg-secondary rounded-md mb-3 overflow-hidden">
                        <img src={p.src} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <p className="text-sm font-heebo text-foreground text-center">{p.name}</p>
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-frank font-bold text-foreground mb-4">
                  ברוכים הבאים ל{store.name}
                </h2>
                <p className="text-muted-foreground font-heebo mb-8">
                  כאן יוצגו המוצרים של החנות. בעל העסק יוכל להתאים אישית את העמוד הזה עם המוצרים שלו.
                </p>

                {/* Sample product grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-muted rounded-lg p-4 border border-border">
                      <div className="w-full aspect-square bg-secondary rounded-md mb-3 flex items-center justify-center text-3xl">
                        {store.logoEmoji}
                      </div>
                      <div className="h-3 bg-border rounded w-3/4 mx-auto mb-2" />
                      <div className="h-3 bg-mall-gold/30 rounded w-1/2 mx-auto" />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/"
              className="inline-block bg-mall-sign text-mall-gold font-heebo font-bold px-6 py-3 rounded-lg hover:bg-mall-gold hover:text-mall-sign transition-colors shadow-md"
            >
              ← חזרה לקניון
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorePage;
