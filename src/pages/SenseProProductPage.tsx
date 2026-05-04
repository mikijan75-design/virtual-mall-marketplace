import { Heart, MessageCircle, Star, ImagePlus, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { toast } from "@/hooks/use-toast";
import BackButton from "@/components/BackButton";
import MallHeader from "@/components/mall/MallHeader";
import MallFooter from "@/components/mall/MallFooter";
import PageTracker from "@/components/PageTracker";
import { israelMezuzahProducts } from "@/data/israelMezuzahProducts";

const galleryImages = [
  {
    id: "hero",
    label: "אוזניות אלחוטיות Sense Pro - תצוגה קדמית",
    background: "linear-gradient(145deg, #eef1f3 0%, #f9fafb 48%, #e6e9ea 100%)",
  },
  {
    id: "lifestyle",
    label: "אוזניות Sense Pro על שולחן",
    background: "linear-gradient(145deg, #2f3840 0%, #536474 44%, #b9c0c5 100%)",
  },
  {
    id: "side",
    label: "אוזניות Sense Pro בזווית צד",
    background: "linear-gradient(145deg, #fbfbfb 0%, #e7e8e8 100%)",
  },
  {
    id: "silver",
    label: "אוזניות Sense Pro בגוון כסוף",
    background: "linear-gradient(145deg, #f4f5f3 0%, #c7cbc7 55%, #eef0ec 100%)",
  },
];

const productSpecs = [
  "\n",
  "\n",
  "\n\n\n",
];

const mezuzahColors = [
  "כחול ים",
  "טורקיז",
  "ירוק זית",
  "ענבר",
  "זהב",
  "ורוד עתיק",
  "סגול מלכותי",
  "אדום יין",
  "שחור פחם",
  "לבן שנהב",
  "חום קפה",
  "כתום שקיעה",
];

const colorForItem = (n: number) => mezuzahColors[(n - 1) % mezuzahColors.length];

const shippingNotes = ["פרטים", "אפשרות לאיסוף עצמי"];

const ImagePlaceholder = ({ src, compact = false }: { src?: string | null; compact?: boolean }) => {
  if (src) {
    return <img src={src} alt="תמונת מוצר" className="h-full w-full object-contain" />;
  }
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-[#888]">
      <ImagePlus className={compact ? "h-5 w-5" : "h-10 w-10"} />
      {!compact && <span className="text-[13px] font-medium">הוסף תמונה</span>}
    </div>
  );
};

const ContactCard = () => (
  <aside className="rounded-[9px] border-2 border-[#0d5960] bg-[#f8fbfb] p-3 shadow-[0_1px_7px_rgba(0,0,0,0.15)]">
    <h2 className="mb-2 text-center text-[25px] font-black leading-[1.12] text-[#111]">
      רוצה שנחזור אליך?
      <br />
      השאר פרטים
    </h2>
    <form className="space-y-[9px]" aria-label="טופס השארת פרטים">
      <input
        aria-label="שם מלא"
        placeholder="שם מלא"
        className="h-[30px] w-full rounded-[6px] border border-[#a9a9a9] bg-white px-3 text-right text-[13px] outline-none placeholder:text-[#161616]"
      />
      <input
        aria-label="טלפון חובה"
        placeholder="טלפון (חובה)"
        className="h-[30px] w-full rounded-[6px] border border-[#a9a9a9] bg-white px-3 text-right text-[13px] outline-none placeholder:text-[#161616]"
      />
      <textarea
        aria-label="הודעה אופציונלית"
        placeholder="הודעה (אופציונלי)"
        className="h-[73px] w-full resize-none rounded-[6px] border border-[#a9a9a9] bg-white px-3 py-2 text-right text-[13px] outline-none placeholder:text-[#161616]"
      />
      <button
        type="button"
        className="h-[41px] w-full rounded-[6px] bg-gradient-to-b from-[#126d76] to-[#065965] text-[16px] font-black text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]"
      >
        שלח פנייה
      </button>
    </form>
  </aside>
);

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="border-t border-[#ddd8ca] py-[13px] text-right">
    <h2 className="mb-[6px] text-center text-[17px] font-black leading-none text-[#121212]">[{title}]</h2>
    {children}
  </section>
);

const SenseProProductPage = () => {
  const location = useLocation();
  const initialMezuzah = (location.state as any)?.mezuzah as
    | {
        col?: number;
        row?: number;
        productId?: string;
        itemNumber: number;
        colBounds?: number[];
        rowBounds?: number[];
        image: string;
        name: string;
        brand: string;
        unitPrice: number;
        shippingPerItem: number;
      }
    | undefined;
  const { addItem: addToCart } = useCart();

  const [mainImage, setMainImage] = useState<string | null>(null);
  const [thumbs, setThumbs] = useState<(string | null)[]>([null, null, null, null]);
  const mainInputRef = useRef<HTMLInputElement>(null);
  const thumbInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const readFile = (file: File, cb: (data: string) => void) => {
    const reader = new FileReader();
    reader.onload = () => cb(String(reader.result));
    reader.readAsDataURL(file);
  };

  // Selected product (by id) for the new product-based mezuzah flow
  const initialIndex = initialMezuzah?.productId
    ? Math.max(0, israelMezuzahProducts.findIndex((p) => p.id === initialMezuzah.productId))
    : 0;
  const [selectedProductIndex, setSelectedProductIndex] = useState<number>(initialIndex);
  const [thumbsStart, setThumbsStart] = useState(0);

  const selectedProduct = initialMezuzah?.productId
    ? israelMezuzahProducts[selectedProductIndex] ?? israelMezuzahProducts[0]
    : null;

  const mezuzah = initialMezuzah
    ? selectedProduct
      ? {
          ...initialMezuzah,
          itemNumber: selectedProductIndex + 1,
          image: selectedProduct.image,
          name: selectedProduct.name,
          unitPrice: selectedProduct.price,
          productId: selectedProduct.id,
        }
      : initialMezuzah
    : undefined;

  // Other products to show as thumbnails (excluding the currently selected one)
  const otherProducts = selectedProduct
    ? israelMezuzahProducts.filter((_, i) => i !== selectedProductIndex)
    : [];
  const visibleThumbProducts = otherProducts.slice(thumbsStart, thumbsStart + 4);
  const stepThumbs = (dir: 1 | -1) => {
    if (otherProducts.length === 0) return;
    const max = Math.max(0, otherProducts.length - 4);
    setThumbsStart((s) => Math.min(max, Math.max(0, s + dir * 4)));
  };

  const handleAddMezuzahToCart = () => {
    if (!mezuzah) return;
    const id = mezuzah.productId ?? `mezuzah-${mezuzah.itemNumber}`;
    addToCart({
      id: `mezuzah-${id}`,
      type: "mezuzah",
      name: mezuzah.name,
      brand: mezuzah.brand,
      unitPrice: mezuzah.unitPrice,
      shippingPerItem: mezuzah.shippingPerItem,
      image: mezuzah.image,
      meta: { itemNumber: mezuzah.itemNumber },
    });
    toast({
      title: "נוסף לעגלה",
      description: `${mezuzah.name} נוספה לעגלה.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <MallHeader />
      <PageTracker />
      <BackButton />
      <main className="flex-1 bg-white font-heebo text-[#101010]" dir="rtl">
      <div
        className="mx-auto grid max-w-[984px] grid-cols-1 gap-8 px-[6px] py-11 lg:grid-cols-[432px_1fr_184px] lg:gap-[56px]"
        dir="ltr"
      >
        <section className="order-1 lg:order-1" dir="rtl">
          {mezuzah ? (
            <div className="flex h-[415px] w-full items-center justify-center rounded-[7px] bg-gradient-to-br from-[#f0f2f3] via-[#fbfbfb] to-[#ecefee] shadow-inner p-4">
              <img
                src={mezuzah.image}
                alt={mezuzah.name}
                className="max-h-full max-w-full object-contain rounded-[7px]"
                style={{ height: "60%" }}
              />
            </div>
          ) : (
            <button
              type="button"
              onClick={() => mainInputRef.current?.click()}
              className="flex h-[415px] w-full items-center justify-center rounded-[7px] border-2 border-dashed border-[#cdd2d2] bg-gradient-to-br from-[#f0f2f3] via-[#fbfbfb] to-[#ecefee] p-6"
              aria-label="העלה תמונת מוצר"
            >
              <ImagePlaceholder src={mainImage} />
            </button>
          )}
          <input
            ref={mainInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) readFile(file, setMainImage);
            }}
          />

          {initialMezuzah && selectedProduct ? (
            <div className="mt-[13px] flex items-center gap-2" aria-label="בחירת מזוזה נוספת">
              <button
                type="button"
                onClick={() => stepThumbs(-1)}
                aria-label="הקודם"
                className="flex h-[63px] w-7 items-center justify-center rounded-[6px] border border-[#0d5960] bg-white text-[#0d5960] disabled:opacity-40"
                disabled={thumbsStart === 0}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <div className="grid flex-1 grid-cols-4 gap-[10px]">
                {visibleThumbProducts.map((p) => {
                  const idx = israelMezuzahProducts.findIndex((x) => x.id === p.id);
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedProductIndex(idx)}
                      title={p.name}
                      aria-label={`בחר ${p.name}`}
                      className="relative flex h-[63px] w-full items-center justify-center overflow-hidden rounded-[7px] border-2 border-[#cdd2d2] bg-white hover:border-[#0d5960]"
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        className="max-h-full max-w-full object-contain"
                      />
                    </button>
                  );
                })}
                {Array.from({ length: Math.max(0, 4 - visibleThumbProducts.length) }).map((_, i) => (
                  <div key={`pad-${i}`} className="h-[63px] w-full rounded-[7px] border-2 border-dashed border-[#cdd2d2] bg-[#f3f4f4]" />
                ))}
              </div>
              <button
                type="button"
                onClick={() => stepThumbs(1)}
                aria-label="הבא"
                className="flex h-[63px] w-7 items-center justify-center rounded-[6px] border border-[#0d5960] bg-white text-[#0d5960] disabled:opacity-40"
                disabled={thumbsStart + 4 >= otherProducts.length}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            </div>
          ) : (
          <div className="mt-[13px] grid grid-cols-4 gap-[12px]" aria-label="גלריית תמונות מוצר">
            {galleryImages.map((image, index) => (
              <div key={image.id} className="relative">
                <button
                  type="button"
                  aria-label={`הוסף תמונה ${index + 1}`}
                  onClick={() => thumbInputRefs.current[index]?.click()}
                  className={`relative flex h-[63px] w-full items-center justify-center overflow-hidden rounded-[7px] border-2 border-dashed border-[#cdd2d2] bg-[#f3f4f4] p-1`}
                >
                  <ImagePlaceholder src={thumbs[index]} compact />
                </button>
                <input
                  ref={(el) => (thumbInputRefs.current[index] = el)}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file)
                      readFile(file, (data) =>
                        setThumbs((prev) => prev.map((t, i) => (i === index ? data : t))),
                      );
                  }}
                />
              </div>
            ))}
          </div>
          )}
        </section>

        <section className="order-3 mx-auto w-full max-w-[284px] lg:order-2" dir="rtl">
          <div className="text-center">
            <h1 className="mb-[6px] whitespace-nowrap text-[27px] font-black leading-tight tracking-[-0.4px]">
              {mezuzah?.name ?? "כותרת 1"}
            </h1>
            <div className="mb-[11px] flex items-center justify-center gap-[3px] text-[14px]">
              <span className="text-[#222]">{mezuzah?.brand ?? "\n"}</span>
              <span className="flex flex-row-reverse gap-[1px] text-[#e3b42f]" aria-label="דירוג">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-[15px] w-[15px] fill-current stroke-current" />
                ))}
              </span>
              <span className="font-black text-[#222]">{"\n"}</span>
            </div>

            <p className="text-[36px] font-black leading-[0.9] tracking-[-1px]">
              ₪{mezuzah?.unitPrice ?? 0}
            </p>
            <p className="mt-[5px] text-[15px] font-medium">
              + {mezuzah?.shippingPerItem ?? 25} ₪ דמי משלוח
            </p>

            <div className="mx-auto mt-[10px] w-fit rounded-[6px] border border-[#c6b681] bg-[#fff7dd] px-[12px] py-[6px] text-[14px] font-bold shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
              🎉 מבצע: משלוח חינם על פריט שני
            </div>

            <div className="mt-[12px] space-y-[9px]">
              <button className="h-[40px] w-full rounded-[5px] bg-gradient-to-b from-[#136f78] to-[#075965] text-[15px] font-black text-white shadow-[0_1px_2px_rgba(0,0,0,0.2)]">
                תשלום מהיר
              </button>
              {mezuzah ? (
                <button
                  type="button"
                  onClick={handleAddMezuzahToCart}
                  className="flex h-[39px] w-full items-center justify-center gap-2 rounded-[5px] border-2 border-[#0d5960] bg-white text-[16px] font-black text-[#115d66]"
                >
                  <Check className="h-4 w-4" />
                  הוספה לעגלה
                </button>
              ) : (
                <Link
                  to="/cart"
                  className="flex h-[39px] w-full items-center justify-center rounded-[5px] border-2 border-[#0d5960] bg-white text-[16px] font-black text-[#115d66]"
                >
                  הוספה לעגלה
                </Link>
              )}
              <button className="flex h-[39px] w-full items-center justify-center gap-2 rounded-[5px] border-2 border-[#0d5960] bg-white text-[16px] font-black text-[#115d66]">
                <span>הוספה ל-WISH</span>
                <Heart className="h-[22px] w-[22px]" />
              </button>
            </div>

            <div className="mx-auto mt-[8px] w-[184px] rounded-[5px] border border-[#9d9d9d] bg-white px-2 py-[8px] text-[13px] font-bold leading-[1.25] shadow-[0_2px_7px_rgba(0,0,0,0.22)]">
              **חובה להשאיר מספר טלפון
              <br />
              לשמירה ברשימה
            </div>
          </div>

          <div className="mt-[20px]">
            <Section title="מפרט טכני">
              {mezuzah ? (
                <ul className="list-inside list-disc pr-2 text-[15px] font-semibold leading-[1.55]">
                  <li>צבע: {colorForItem(mezuzah.itemNumber)}</li>
                  <li>חומר: אפוקסי יצוק בעבודת יד</li>
                  <li>עץ: עץ זית מארץ ישראל</li>
                </ul>
              ) : (
                <ul className="list-inside list-disc text-[16px] font-semibold leading-[1.45] whitespace-pre-line">
                  {productSpecs.map((spec, index) => (
                    <li key={index}>{spec}</li>
                  ))}
                </ul>
              )}
            </Section>

            <Section title="שאלות ותשובות">
              <div className="h-[24px]" />
            </Section>

            <Section title="מדיניות משלוחים">
              <div className="space-y-[1px] text-center text-[16px] font-medium leading-[1.35]">
                {shippingNotes.map((note) => (
                  <p key={note}>{note}</p>
                ))}
              </div>
            </Section>
          </div>
        </section>

        <div className="order-2 w-full lg:order-3 lg:pt-[168px]" dir="rtl">
          <ContactCard />
          <a
            href="https://wa.me/972000000000"
            className="mt-[7px] flex h-[48px] items-center justify-between rounded-[7px] border border-[#e0e5e1] bg-[#eef6f4] px-[10px] text-right shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
            aria-label="צור קשר מהיר בצאט וואטסאפ"
          >
            <span className="flex h-[27px] w-[27px] items-center justify-center rounded-full bg-[#24d366] text-white">
              <MessageCircle className="h-[19px] w-[19px]" />
            </span>
            <span className="flex-1 pr-[8px]">
              <span className="block text-[16px] font-black leading-none">צור קשר מהיר</span>
              <span className="block text-[12px] font-bold leading-[1.25]">צאט וואטסאפ</span>
            </span>
          </a>
        </div>
      </div>
      </main>
      <MallFooter />
    </div>
  );
};

export default SenseProProductPage;
