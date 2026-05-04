import { useParams, Link } from "react-router-dom";
import { mallFloors } from "@/data/mallData";
import MallHeader from "@/components/mall/MallHeader";
import MallFooter from "@/components/mall/MallFooter";
import PageTracker from "@/components/PageTracker";
import BackButton from "@/components/BackButton";
import { BookOpen, Heart, MapPin, Palette, Phone, Settings, Smartphone } from "lucide-react";
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
import imCategoriesDisplay from "@/assets/stores/im-categories-display.png";
import imClocksCategory from "@/assets/stores/im-clocks-category.webp";
import imVasesCategory from "@/assets/stores/im-vases-category.webp";
import imHanukkiahsCategory from "@/assets/stores/im-hanukkiahs-category.webp";
import imHamsaCategory from "@/assets/stores/im-hamsa-pomegranate-category.webp";
import imServingTraysCategory from "@/assets/stores/im-serving-trays-category.webp";
import imIsraelMapCategory from "@/assets/stores/im-israel-map-category.webp";
import imMezuzahsCategory from "@/assets/stores/im-mezuzahs-category.webp";
import imShabbatCandlesCategory from "@/assets/stores/im-shabbat-candles-category.webp";
import avnerPortraitImg from "@/assets/avner-ovad-portrait.png";
import avnerPainting1 from "@/assets/avner-paintings/p1.png";
import avnerPainting2 from "@/assets/avner-paintings/p2.png";
import avnerPainting3 from "@/assets/avner-paintings/p3.png";
import avnerPainting4 from "@/assets/avner-paintings/p4.png";
import avnerPainting5 from "@/assets/avner-paintings/p5.png";
import avnerPainting6 from "@/assets/avner-paintings/p6.png";
import avnerPainting7 from "@/assets/avner-paintings/p7.png";
import avnerPainting8 from "@/assets/avner-paintings/p8.png";
import avnerPainting9 from "@/assets/avner-paintings/p9.png";
import avnerPainting10 from "@/assets/avner-paintings/p10.png";
import avnerPainting11 from "@/assets/avner-paintings/p11.png";
import avnerPainting12 from "@/assets/avner-paintings/p12.png";
import avnerPainting13 from "@/assets/avner-paintings/p13.png";
import avnerPainting14 from "@/assets/avner-paintings/p14.png";
import avnerPainting15 from "@/assets/avner-paintings/p15.png";
import avnerPainting16 from "@/assets/avner-paintings/p16.png";
import avnerPainting17 from "@/assets/avner-paintings/p17.png";
import avnerPainting18 from "@/assets/avner-paintings/p18.png";
import avnerPainting19 from "@/assets/avner-paintings/p19.png";
import avnerPainting20 from "@/assets/avner-paintings/p20.png";
import type { Store } from "@/data/mallData";

const avnerHighlights = [
  {
    icon: Palette,
    body: "אבנר הוא איש אשכולות אמיתי, המשלב רקע אקדמי כמהנדס אזרחי מהטכניון עם תשוקה עמוקה לציור ולכתיבה. הוא פנסיונר, וכל יצירה שלו קורנת תשוקה.",
  },
  {
    icon: BookOpen,
    body: "הגלריה שלו מציגה מגוון רחב ועשיר של נושאים והיבטים. מנופים ישראליים ועד לרגעים אישיים, הציור הרב תחמי מבטיח שכל אחד ימצא חיבור אישי ועיניין רב בעבודתו ורפרוף בגלרייה יוצר סקרנות והנאה גדולה.",
  },
  {
    icon: Settings,
    body:
      "מדובר ביצירות מקוריות, עבודת יד אישית של אבנר. מתנה מושלמת ליקירכם ותזכורת ויזואלית לחוזק יצירתו ותרומתו של הפועל הישראלי.",
  },
];

const AvnerDivider = () => (
  <div className="mx-auto my-5 h-px w-28 bg-gradient-to-r from-transparent via-[#b3925a] to-transparent" />
);

const AvnerPortraitCard = () => (
  <figure className="relative mx-auto w-full max-w-[280px]">
    <div className="aspect-[4/5] overflow-hidden rounded-lg shadow-[0_18px_28px_rgba(58,43,28,0.35)]">
      <img
        src={avnerPortraitImg}
        alt="דיוקן של אבנר עובד"
        className="h-full w-full object-cover"
        loading="lazy"
      />
    </div>
    <figcaption className="sr-only">דיוקן של אבנר עובד בחליפה כחולה ומשקפיים.</figcaption>
  </figure>
);

const GalleryFrame = ({
  className = "",
  src,
  alt,
}: {
  className?: string;
  src?: string;
  alt?: string;
}) => (
  <div className={`relative ${className}`}>
    {/* Track-light bar */}
    <div className="absolute left-1/2 -top-3 h-[6px] w-[78%] -translate-x-1/2 rounded-[2px] bg-gradient-to-b from-[#3a2f24] to-[#1a1410] shadow-[0_2px_4px_rgba(0,0,0,0.4)]" />
    {/* Lamp glow downward onto frame */}
    <div className="pointer-events-none absolute left-1/2 -top-3 h-16 w-[95%] -translate-x-1/2 rounded-b-[40%] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.95),rgba(255,255,255,0.55)_40%,transparent_80%)] blur-[2px]" />
    {/* Mounting stem */}
    <div className="absolute left-1/2 -top-[10px] h-[10px] w-[3px] -translate-x-1/2 bg-[#2a2018]" />
    {/* Frame */}
    <div className="aspect-square w-full rounded-[3px] border-[3px] border-[#2a1f17] bg-white shadow-[0_8px_16px_rgba(0,0,0,0.25),inset_0_0_0_1px_#a8956f]">
      {src ? (
        <a href={src} target="_blank" rel="noopener noreferrer" className="block h-full w-full">
          <img src={src} alt={alt ?? ""} className="h-full w-full object-cover" loading="lazy" />
        </a>
      ) : (
        <div className="h-full w-full bg-gradient-to-br from-white to-[#f4f0e6]" aria-hidden="true" />
      )}
    </div>
  </div>
);

const avnerPaintings = [
  { src: avnerPainting1, alt: "ציור של אבנר עובד - דיוקן עם מיקרופון" },
  { src: avnerPainting2, alt: "ציור של אבנר עובד - The Boxer" },
  { src: avnerPainting3, alt: "ציור של אבנר עובד - בית כנסת" },
  { src: avnerPainting4, alt: "ציור של אבנר עובד - אם וילד בחדר" },
  { src: avnerPainting5, alt: "ציור של אבנר עובד - אגרטלי פרחים" },
  { src: avnerPainting6, alt: "ציור של אבנר עובד - דמות בבית קפה" },
  { src: avnerPainting7, alt: "ציור של אבנר עובד - נוף עם עננים" },
  { src: avnerPainting8, alt: "ציור של אבנר עובד - דיוקן Amy" },
  { src: avnerPainting9, alt: "ציור של אבנר עובד - דמויות וחוף" },
  { src: avnerPainting10, alt: "ציור של אבנר עובד - דיוקן עם מצנפת" },
  { src: avnerPainting11, alt: "ציור של אבנר עובד - מגדל השעון ביפו" },
  { src: avnerPainting12, alt: "ציור של אבנר עובד - נוף חוף עם ילדים" },
  { src: avnerPainting13, alt: "ציור של אבנר עובד - כפר על הרים" },
  { src: avnerPainting14, alt: "ציור של אבנר עובד - זוג על שפת הים" },
  { src: avnerPainting15, alt: "ציור של אבנר עובד - ילד עם בלון" },
  { src: avnerPainting16, alt: "ציור של אבנר עובד - דיוקן זקן עם כובע" },
  { src: avnerPainting17, alt: "ציור של אבנר עובד - עגורים מעל הרים" },
  { src: avnerPainting18, alt: "ציור של אבנר עובד - דמויות בכפר" },
  { src: avnerPainting19, alt: "ציור של אבנר עובד - רקדנית פלמנקו" },
  { src: avnerPainting20, alt: "ציור של אבנר עובד - אישה בשמלה אדומה" },
];
const galleryFrameItems = Array.from({ length: 20 }, (_, i) => ({
  key: `gf-${i}`,
  src: avnerPaintings[i]?.src,
  alt: avnerPaintings[i]?.alt,
}));

const AvnerOvadStoreView = ({ store }: { store: Store }) => (
  <div className="min-h-screen bg-background font-heebo text-[#2f241d]">
    <MallHeader />
    <PageTracker storeId={store.id} />
    <BackButton />

    <main className="px-4 pt-2 pb-8">
      <div className="mx-auto max-w-[1400px]">
        {/* Top section: 5x4 frames on the left, article on the right */}
        <div className="relative flex items-start justify-between gap-6" dir="ltr">
          {/* Left grid: 5 rows of 4 frames */}
          <div className="hidden md:grid grid-cols-4 gap-4 pt-6 flex-1">
            {galleryFrameItems.map((it) => (
              <GalleryFrame key={it.key} className="w-full max-w-[110px] mx-auto" src={it.src} alt={it.alt} />
            ))}
          </div>

          <article
            className="relative z-10 overflow-hidden rounded-[2rem] border border-[#d4c4a7] bg-[#f8f1e5] shadow-[0_24px_70px_rgba(66,44,20,0.16)] shrink-0"
            style={{ zoom: 0.48, width: "980px" }}
          >
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(181,143,83,0.12),transparent_26%),radial-gradient(circle_at_82%_84%,rgba(181,143,83,0.11),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.72),rgba(245,236,220,0.54))]" />
          <div className="absolute inset-x-0 top-0 h-8 border-y border-[#d3c2a5]/50 bg-[repeating-linear-gradient(45deg,rgba(166,133,78,0.12)_0_2px,transparent_2px_10px)]" />
          <div className="absolute inset-x-0 bottom-0 h-8 border-y border-[#d3c2a5]/50 bg-[repeating-linear-gradient(45deg,rgba(166,133,78,0.12)_0_2px,transparent_2px_10px)]" />
        </div>

        <header className="relative z-10 grid gap-6 bg-[#183247] px-6 py-8 text-center text-white md:grid-cols-[330px_1fr] md:px-10 md:text-left">
          <div className="md:row-span-2 flex items-center justify-center order-1">
            <AvnerPortraitCard />
          </div>
          <div className="flex flex-col items-center justify-center md:items-start order-2">
            <p className="font-frank text-[clamp(3rem,8vw,5.5rem)] font-black leading-none tracking-[-0.05em] text-[#e6d6b9] drop-shadow-[0_3px_0_rgba(0,0,0,0.22)]">
              אבנר עובד
            </p>
            <h1 className="mt-1 font-frank text-[clamp(2.3rem,5vw,4rem)] font-black uppercase tracking-[0.04em] text-[#d9c393]">
              Avner Ovad
            </h1>
            <p className="mt-3 max-w-[520px] text-[clamp(1.15rem,2.3vw,1.55rem)] font-bold leading-tight text-white/95">
              אמן ציור ישראלי, סופר, ומהנדס אזרחי (טכניון)
            </p>
            <span className="inline-block mt-4 bg-white/15 px-4 py-1 rounded-full text-sm font-heebo">
              {store.category} • קומה {store.floor}
            </span>
          </div>
        </header>

        <section className="relative z-10 grid gap-8 px-6 py-8 md:grid-cols-[1.1fr_0.9fr] md:px-10" dir="rtl">
          <div className="space-y-6 text-right order-2 md:order-1">
            <section>
              <h2 className="text-[clamp(1.6rem,3vw,2.25rem)] font-black leading-tight">
                אבנר - אמן ישראלי עם לב פועם.
              </h2>
              <AvnerDivider />
            </section>

            {avnerHighlights.map(({ icon: Icon, body }) => (
              <section key={body} className="grid grid-cols-[auto_1fr] items-start gap-5">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#b3925a]/20 text-[#a4824d]">
                  <Icon className="h-8 w-8" strokeWidth={2.4} aria-hidden="true" />
                </span>
                <p className="text-[clamp(1.05rem,1.8vw,1.35rem)] font-bold leading-[1.45]">{body}</p>
              </section>
            ))}

            <blockquote className="relative rounded-2xl border-2 border-[#b3925a] bg-[#f6eddc]/80 p-5 text-[clamp(1rem,1.8vw,1.25rem)] font-bold leading-snug shadow-sm whitespace-pre-line">
              פגשתי את אבנר ביריד אמנים בנחלת בנימין, שם הוא מציג את עבודותיו. התרשמתי מהאדם אשר אחראי לתרומה גדולה לחברה! עדיפות ליצור קשר ותיאום מראש אם מעוניינים לראות את הגלרייה בעיניים.
            </blockquote>

            <div className="grid gap-4 rounded-2xl bg-white/40 p-5 text-base font-bold sm:grid-cols-1">
              <div className="flex items-center justify-end gap-3 text-right">
                <span className="whitespace-pre-line">
                  To View Works: contact us{"\n"}
                  נחלת בנימין, יריד האמנים{"\n"}
                  תיאום לצפייה בעבודות השאירו לנו הודעה  ונחזור אליכם
                </span>
                <Smartphone className="h-7 w-7 text-[#a4824d]" aria-hidden="true" />
              </div>
              <div className="flex items-center justify-end gap-3 text-right">
                <span>
                  The work is displayed at artist fairs such as Nahalat Binyamin, it is preferable to contact us to arrange arrival.
                </span>
                <MapPin className="h-7 w-7 text-[#a4824d]" aria-hidden="true" />
              </div>
            </div>
          </div>

          <aside className="space-y-6 text-left md:pt-8 order-1 md:order-2" dir="ltr">
            <div className="flex items-center gap-4">
              <Heart className="h-9 w-9 fill-[#b3925a] text-[#b3925a]" aria-hidden="true" />
              <h2 className="text-2xl font-black uppercase leading-tight tracking-wide text-[#30241d]">
                Meet Avner: an Israeli artist with heart.
              </h2>
            </div>
            <AvnerDivider />

            <div className="rounded-2xl border border-[#c8ae7c]/70 bg-white/35 p-5 text-lg leading-snug shadow-sm">
              <p className="font-bold whitespace-pre-line">{"\n"}</p>
              <p className="mt-2 text-[#4d3a2d]">leave us a massage </p>
              <div className="mt-5 border-l-2 border-[#b3925a] pl-4">
                <p className="font-black whitespace-pre-line">{"\n"}</p>
                <p className="whitespace-pre-line">{"\n"}</p>
              </div>
            </div>

            <div className="rounded-2xl bg-[#efe4d1]/80 p-5 text-right" dir="rtl">
              <p className="text-xl font-black">לקבלת מידע רחב השאירו הודעה</p>
              <p className="mt-2 text-lg">ניתן לראות את העבודות ולהציג אותן לקהל.</p>
            </div>
          </aside>
        </section>
        </article>
        </div>
      </div>

      <div className="text-center mt-8">
        <Link
          to="/"
          className="inline-block bg-mall-sign text-mall-gold font-heebo font-bold px-6 py-3 rounded-lg hover:bg-mall-gold hover:text-mall-sign transition-colors shadow-md"
        >
          ← חזרה לקניון
        </Link>
      </div>
    </main>

    <MallFooter />
  </div>
);

const israelMezuzahsProducts = [
  { src: imShabbatCandlesCategory, name: "פמוטי שבת", slug: "shabbat-candles" },
  { src: imServingTraysCategory, name: "מגשי הגשה", slug: "serving-trays" },
  { src: imClocksCategory, name: "שעונים", slug: "coasters" },
  { src: imVasesCategory, name: "אגרטלים", slug: "decorative-beads" },
  { src: imMezuzahsCategory, name: "מזוזות", slug: "mezuzahs" },
  { src: imHamsaCategory, name: "תליוני חמסה ורימון", slug: "hamsa-pomegranate" },
  { src: imIsraelMapCategory, name: "מפת ישראל", slug: "israel-map" },
  { src: imHanukkiahsCategory, name: "חנוכיות", slug: "hanukkiahs" },
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
        <MallFooter />
      </div>
    );
  }

  const isIsraelMezuzahs = store.id === "s2";
  const isAvnerOvad = store.id === "s4";

  if (isAvnerOvad) {
    return <AvnerOvadStoreView store={store} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <MallHeader />
      <PageTracker storeId={store.id} />
      <BackButton />

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

                {/* Categories display photo */}
                <div className="mt-6">
                  <img
                    src={imCategoriesDisplay}
                    alt="תצוגת קטגוריות המוצרים של Israel Mezuzahs"
                    className="w-full h-auto rounded-lg shadow-md object-contain"
                    loading="lazy"
                  />
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
      <MallFooter />
    </div>
  );
};

export default StorePage;
