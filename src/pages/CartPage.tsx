import { CreditCard, Minus, Plus, Trash2 } from "lucide-react";
import type { ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import BackButton from "@/components/BackButton";
import MallHeader from "@/components/mall/MallHeader";
import MallFooter from "@/components/mall/MallFooter";
import PageTracker from "@/components/PageTracker";
import { useCart, type CartItem } from "@/context/CartContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import imMezuzahsCollection from "@/assets/stores/im-mezuzahs-collection.png";

const mezuzahColBounds = [0, 0.0403, 0.0772, 0.1129, 0.1485, 0.1851, 0.2205, 0.2554, 0.2911, 0.3261, 0.362, 0.397, 0.4314, 0.467, 0.5026, 0.538, 0.5739, 0.6096, 0.6449, 0.6809, 0.7162, 0.7515, 0.7875, 0.8228, 0.8584, 0.8937, 0.9297, 0.9657, 1];
const mezuzahRowBounds = [0, 0.2078, 0.4077, 0.6061, 0.8045, 1];
const mezuzahCols = mezuzahColBounds.length - 1;
const mezuzahRows = mezuzahRowBounds.length - 1;

const HeadphonesThumbnail = () => (
  <svg viewBox="0 0 180 180" role="img" aria-label="אוזניות SENSE PRO" className="h-full w-full">
    <defs>
      <radialGradient id="cartBand" cx="36%" cy="18%" r="78%">
        <stop offset="0" stopColor="#7e8787" />
        <stop offset="0.45" stopColor="#3e4848" />
        <stop offset="1" stopColor="#171f20" />
      </radialGradient>
      <radialGradient id="cartCup" cx="36%" cy="24%" r="78%">
        <stop offset="0" stopColor="#858986" />
        <stop offset="0.45" stopColor="#555a56" />
        <stop offset="1" stopColor="#151a19" />
      </radialGradient>
      <linearGradient id="cartMetal" x1="0" x2="1">
        <stop offset="0" stopColor="#d7d8d3" />
        <stop offset="0.48" stopColor="#5e6661" />
        <stop offset="1" stopColor="#eef0eb" />
      </linearGradient>
      <filter id="cartShadow" x="-30%" y="-20%" width="160%" height="150%">
        <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#0c1110" floodOpacity="0.28" />
      </filter>
    </defs>

    <g filter="url(#cartShadow)">
      <path
        d="M42 105 C36 61 53 28 90 28 C127 28 144 61 138 105"
        fill="none"
        stroke="url(#cartBand)"
        strokeLinecap="round"
        strokeWidth="20"
      />
      <path
        d="M52 70 C62 43 78 39 90 39 C102 39 118 43 128 70"
        fill="none"
        stroke="#111918"
        strokeLinecap="round"
        strokeOpacity="0.24"
        strokeWidth="8"
      />
      <path d="M45 96 L45 118" stroke="url(#cartMetal)" strokeLinecap="round" strokeWidth="8" />
      <path d="M135 96 L135 118" stroke="url(#cartMetal)" strokeLinecap="round" strokeWidth="8" />
      <ellipse cx="55" cy="128" rx="27" ry="37" transform="rotate(-14 55 128)" fill="url(#cartCup)" />
      <ellipse cx="123" cy="128" rx="29" ry="39" transform="rotate(18 123 128)" fill="url(#cartCup)" />
      <ellipse cx="56" cy="128" rx="17" ry="25" transform="rotate(-14 56 128)" fill="#171d1d" opacity="0.7" />
      <ellipse cx="122" cy="128" rx="18" ry="26" transform="rotate(18 122 128)" fill="#4b4f4c" opacity="0.9" />
      <path d="M105 82 C116 82 122 85 126 94" fill="none" stroke="#a8aaa4" strokeLinecap="round" strokeWidth="4" />
    </g>
  </svg>
);

const PaymentButton = ({
  children,
  className,
  ariaLabel,
}: {
  children: ReactNode;
  className: string;
  ariaLabel: string;
}) => (
  <button
    type="button"
    aria-label={ariaLabel}
    className={`flex h-[45px] w-full items-center justify-center rounded-[5px] border border-black/20 text-[23px] font-black shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] ${className}`}
  >
    {children}
  </button>
);

const CartPage = () => {
  const { items, addItem, removeItem, updateQuantity, clearCart } = useCart();
  const [params, setParams] = useSearchParams();
  const seededRef = useRef(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const { toast } = useToast();

  const handlePay = (method: string) => {
    setPaymentOpen(false);
    toast({ title: "התשלום בוצע", description: `שולם בהצלחה באמצעות ${method}.` });
    clearCart();
  };

  // Backwards compatibility: if a legacy ?col=&row= URL lands here, seed the cart once
  useEffect(() => {
    if (seededRef.current) return;
    const colParam = params.get("col");
    const rowParam = params.get("row");
    if (colParam === null || rowParam === null) return;
    seededRef.current = true;
    const col = Math.max(0, Math.min(mezuzahCols - 1, parseInt(colParam, 10) || 0));
    const row = Math.max(0, Math.min(mezuzahRows - 1, parseInt(rowParam, 10) || 0));
    const itemNumber = row * mezuzahCols + col + 1;
    addItem({
      id: `mezuzah-${col}-${row}`,
      type: "mezuzah",
      name: `מזוזה מס׳ ${itemNumber}`,
      brand: "Israel Mezuzahs",
      unitPrice: 150,
      shippingPerItem: 20,
      meta: { col, row, itemNumber },
    });
    const next = new URLSearchParams(params);
    next.delete("col");
    next.delete("row");
    setParams(next, { replace: true });
  }, [params, addItem, setParams]);

  const fmt = (n: number) => `₪${n.toLocaleString("he-IL")}`;
  const fmtNeg = (n: number) => `−₪${n.toLocaleString("he-IL")}`;

  const subtotal = items.reduce((s, it) => s + it.unitPrice * it.quantity, 0);
  // Mezuzah (page 3.2.5) rule: free shipping when more than one mezuzah is in the cart
  const mezuzahUnits = items
    .filter((it) => it.type === "mezuzah")
    .reduce((s, it) => s + it.quantity, 0);
  const mezuzahFreeShipping = mezuzahUnits > 1;
  const shipping = items.reduce((s, it) => {
    if (it.type === "mezuzah" && mezuzahFreeShipping) return s;
    return s + (it.shippingPerItem ?? 0) * it.quantity;
  }, 0);
  const vat = Math.round((subtotal * 0.17) / 1.17);
  const total = subtotal + shipping;

  const renderThumbnail = (it: CartItem) => {
    if (it.type === "mezuzah" && it.meta?.col !== undefined && it.meta?.row !== undefined) {
      const col = it.meta.col;
      const row = it.meta.row;
      const cw = mezuzahColBounds[col + 1] - mezuzahColBounds[col];
      const rh = mezuzahRowBounds[row + 1] - mezuzahRowBounds[row];
      const bgW = 100 / cw;
      const bgH = 100 / rh;
      const px = (mezuzahColBounds[col] / (1 - cw)) * 100;
      const py = (mezuzahRowBounds[row] / (1 - rh)) * 100;
      return (
        <div
          className="h-[126px] w-full rounded-[5px] bg-[#f1f2f2]"
          style={{
            backgroundImage: `url(${imMezuzahsCollection})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${bgW}% ${bgH}%`,
            backgroundPosition: `${px}% ${py}%`,
            filter: "saturate(1.6) contrast(1.15) brightness(1.05)",
          }}
          aria-label={it.name}
        />
      );
    }
    return (
      <div className="flex h-[126px] items-center justify-center rounded-[5px] bg-[#f1f2f2] p-2">
        <HeadphonesThumbnail />
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <MallHeader />
      <PageTracker />
      <BackButton />
      <main className="flex-1 bg-white font-heebo text-[#111]" dir="rtl">
      <div className="mx-auto grid max-w-[1000px] grid-cols-1 gap-5 px-2 py-5 lg:grid-cols-[274px_1fr]" dir="rtl">
        <aside className="order-2 space-y-[7px] lg:order-1">
          <section className="rounded-[6px] border border-[#537a7c] bg-[#eef5f4] p-[11px] shadow-[0_1px_8px_rgba(0,0,0,0.16)]">
            <h2 className="mb-[12px] text-center text-[24px] font-black leading-none">אפשרויות תשלום</h2>
            <div className="space-y-[9px]">
              <PaymentButton
                ariaLabel="תשלום בכרטיס אשראי"
                className="gap-3 bg-gradient-to-b from-[#1b7279] to-[#095762] text-white"
              >
                <CreditCard className="h-[32px] w-[32px]" strokeWidth={3.5} />
                <span>כרטיס אשראי</span>
              </PaymentButton>
              <PaymentButton ariaLabel="תשלום ב-bit" className="bg-gradient-to-b from-[#4bd970] to-[#24bd4d] text-white">
                bit
              </PaymentButton>
              <PaymentButton ariaLabel="תשלום ב-PayPal" className="bg-gradient-to-b from-[#12a9e7] to-[#0478bd] text-white">
                <span className="text-[20px] font-black italic">P PayPal</span>
              </PaymentButton>
              <PaymentButton ariaLabel="תשלום ב-Google Pay" className="border-[#7a7a7a] bg-white text-[22px]">
                <span>
                  <span className="text-[#4285f4]">G</span>
                  <span className="text-[#db4437]">o</span>
                  <span className="text-[#f4b400]">o</span>
                  <span className="text-[#4285f4]">g</span>
                  <span className="text-[#0f9d58]">l</span>
                  <span className="text-[#db4437]">e</span>
                  <span className="text-[#5f6368]"> Pay</span>
                </span>
              </PaymentButton>
              <PaymentButton ariaLabel="תשלום ב-Apple Pay" className="bg-black text-white">
                <span className="text-[27px]">Apple Pay</span>
              </PaymentButton>
            </div>
          </section>

          <section className="rounded-[6px] border border-[#537a7c] bg-[#eef5f4] p-[11px] shadow-[0_1px_8px_rgba(0,0,0,0.16)]">
            <h2 className="mb-[10px] text-center text-[24px] font-black leading-none">פרטי הזמנה נוספים</h2>
            <textarea
              aria-label="הערות להזמנה"
              placeholder="הערות להזמנה"
              className="h-[86px] w-full resize-none rounded-[5px] border border-[#8c8c8c] bg-white px-4 py-3 text-right text-[18px] outline-none placeholder:text-[#8a8a8a]"
            />
          </section>

          <button
            type="button"
            className="h-[39px] w-full rounded-[5px] bg-gradient-to-b from-[#126f78] to-[#075a65] text-[19px] font-black text-white shadow-[0_2px_4px_rgba(0,0,0,0.22)]"
          >
            בירורים
          </button>
          <button
            type="button"
            className="h-[43px] w-full rounded-[5px] bg-gradient-to-b from-[#126f78] to-[#075a65] text-[19px] font-black text-white shadow-[0_2px_4px_rgba(0,0,0,0.22)]"
          >
            מדיניות החזר ותשלום
          </button>
        </aside>

        <section className="order-1 lg:order-2">
          <h1 className="mb-[17px] text-right text-[24px] font-black leading-none lg:text-left" dir="ltr">
            Your Cart
          </h1>

          <div className="overflow-hidden rounded-[5px] border border-[#2d7075] shadow-[0_1px_5px_rgba(0,0,0,0.22)]">
            <div className="grid grid-cols-[120px_1fr] bg-gradient-to-b from-[#136c74] to-[#07515b] text-[18px] font-black text-white md:grid-cols-[120px_120px_120px_1fr]">
              <div className="border-l border-[#5d8c8f] px-3 py-[9px] text-center">סכום ביניים</div>
              <div className="hidden border-l border-[#5d8c8f] px-3 py-[9px] text-center md:block">מחיר יחידה</div>
              <div className="hidden border-l border-[#5d8c8f] px-3 py-[9px] text-center md:block">כמות</div>
              <div className="px-3 py-[9px] text-center">מוצר</div>
            </div>

            {items.length === 0 ? (
              <div className="flex min-h-[154px] items-center justify-center bg-white px-3 text-[18px] font-medium text-[#666]">
                העגלה ריקה — נסו להוסיף מוצרים מהחנויות.
              </div>
            ) : (
              items.map((it) => {
                const lineTotal = it.unitPrice * it.quantity;
                return (
                  <div
                    key={it.id}
                    className="grid min-h-[154px] grid-cols-[120px_1fr] border-b border-[#2d7075] bg-white md:grid-cols-[120px_120px_120px_1fr]"
                  >
                    <div className="flex items-center justify-center border-l border-[#2d7075] px-3 text-[18px] font-black">
                      {fmt(lineTotal)}
                    </div>
                    <div className="hidden items-center justify-center border-l border-[#2d7075] px-3 text-[18px] font-black md:flex">
                      {fmt(it.unitPrice)}
                    </div>
                    <div className="hidden items-center justify-center border-l border-[#2d7075] px-3 md:flex">
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex h-[34px] items-center overflow-hidden rounded-[5px] border border-[#a4aaa7] bg-white shadow-sm">
                          <button
                            type="button"
                            aria-label="הפחת כמות"
                            onClick={() => updateQuantity(it.id, it.quantity - 1)}
                            className="flex h-full w-8 items-center justify-center bg-[#f5f5f5]"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="flex h-full w-[38px] items-center justify-center border-x border-[#d0d0d0] text-[18px] font-bold">
                            {it.quantity}
                          </span>
                          <button
                            type="button"
                            aria-label="הוסף כמות"
                            onClick={() => updateQuantity(it.id, it.quantity + 1)}
                            className="flex h-full w-8 items-center justify-center bg-[#eef3f1]"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(it.id)}
                          aria-label="מחיקת פריט"
                          className="flex items-center gap-1 text-[13px] text-[#a8262d] hover:underline"
                        >
                          <Trash2 className="h-3 w-3" /> הסר
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-[1fr_126px] items-center gap-4 px-[14px] py-[14px]">
                      <p className="text-right text-[18px] font-medium leading-[1.25]">
                        {it.name}
                        {it.brand && (
                          <>
                            <br />
                            {it.brand}
                          </>
                        )}
                      </p>
                      {renderThumbnail(it)}
                    </div>
                    <div className="col-span-2 grid grid-cols-3 border-t border-[#2d7075] text-center text-[15px] md:hidden">
                      <div className="border-l border-[#2d7075] p-2">
                        <div className="font-black">מחיר יחידה</div>
                        <div>{fmt(it.unitPrice)}</div>
                      </div>
                      <div className="border-l border-[#2d7075] p-2">
                        <div className="font-black">כמות</div>
                        <div>{it.quantity}</div>
                      </div>
                      <div className="p-2">
                        <div className="font-black">סכום ביניים</div>
                        <div>{fmt(lineTotal)}</div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            {[
              ["סכום כולל (כולל מע״מ)", fmt(subtotal)],
              ['מתוכו מע"מ (17%)', fmtNeg(vat)],
              [
                "דמי משלוח",
                mezuzahFreeShipping
                  ? `${fmt(shipping)} (מזוזות – משלוח חינם מעל פריט אחד)`
                  : fmt(shipping),
              ],
            ].map(([label, value]) => (
              <div key={label} className="grid grid-cols-[120px_1fr] border-b border-[#2d7075] bg-white text-[18px] font-medium">
                <div className="border-l border-[#2d7075] px-3 py-[8px] text-center font-black">{value}</div>
                <div className="px-3 py-[8px] text-center">{label}</div>
              </div>
            ))}

            <div className="grid grid-cols-[120px_1fr] bg-gradient-to-b from-[#136c74] to-[#07515b] text-[18px] font-black text-white">
              <div className="border-l border-[#5d8c8f] px-3 py-[9px] text-center">{fmt(total)}</div>
              <div className="px-3 py-[9px] text-center">סכום כולל לתשלום</div>
            </div>
          </div>

          {items.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center justify-end gap-3">
              <button
                type="button"
                onClick={clearCart}
                className="flex items-center gap-1 rounded-[5px] border border-[#a8262d] px-4 py-2 text-[15px] font-bold text-[#a8262d] hover:bg-[#a8262d]/10"
              >
                <Trash2 className="h-4 w-4" /> רוקן עגלה
              </button>
              <button
                type="button"
                onClick={() => setPaymentOpen(true)}
                className="rounded-[5px] bg-gradient-to-b from-[#126f78] to-[#075a65] px-5 py-2 text-[16px] font-black text-white shadow"
              >
                תשלום
              </button>
            </div>
          )}

          <section className="mt-[24px] border-t border-[#ddd8ca] pt-[14px] text-right">
            <h2 className="mx-auto mb-[14px] w-fit rounded-t-[5px] border border-b-0 border-[#ddd8ca] bg-white px-9 py-[10px] text-[18px] font-black leading-none">
              בירורים נפוצים
            </h2>
            <h3 className="mb-[8px] text-[18px] font-black">מדיניות החזרים</h3>
            <p className="max-w-[760px] text-[18px] font-medium leading-[1.45]">
              מדיניות החזרים מתאפשרת למנוע אק את התממשות הרק משולמים ונכיר אלחוטיות שלךפה המכונה נה
              החזרנית למכניס לאזניות באוננטופ בחרגוליה, המוזמן מתאים ואיכות.
            </p>
          </section>
        </section>
      </div>
      </main>
      <MallFooter />
      <Dialog open={paymentOpen} onOpenChange={setPaymentOpen}>
        <DialogContent dir="rtl" className="max-w-[420px]">
          <DialogHeader>
            <DialogTitle className="text-right text-[22px] font-black">בחר אמצעי תשלום</DialogTitle>
            <DialogDescription className="text-right">
              סכום לתשלום: {fmt(total)}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-[9px]">
            <PaymentButton
              ariaLabel="תשלום בכרטיס אשראי"
              className="gap-3 bg-gradient-to-b from-[#1b7279] to-[#095762] text-white"
              onClick={() => handlePay("כרטיס אשראי")}
            >
              <CreditCard className="h-[32px] w-[32px]" strokeWidth={3.5} />
              <span>כרטיס אשראי</span>
            </PaymentButton>
            <PaymentButton
              ariaLabel="תשלום ב-bit"
              className="bg-gradient-to-b from-[#4bd970] to-[#24bd4d] text-white"
              onClick={() => handlePay("bit")}
            >
              bit
            </PaymentButton>
            <PaymentButton
              ariaLabel="תשלום ב-PayPal"
              className="bg-gradient-to-b from-[#12a9e7] to-[#0478bd] text-white"
              onClick={() => handlePay("PayPal")}
            >
              <span className="text-[20px] font-black italic">P PayPal</span>
            </PaymentButton>
            <PaymentButton
              ariaLabel="תשלום ב-Google Pay"
              className="border-[#7a7a7a] bg-white text-[22px]"
              onClick={() => handlePay("Google Pay")}
            >
              <span>
                <span className="text-[#4285f4]">G</span>
                <span className="text-[#db4437]">o</span>
                <span className="text-[#f4b400]">o</span>
                <span className="text-[#4285f4]">g</span>
                <span className="text-[#0f9d58]">l</span>
                <span className="text-[#db4437]">e</span>
                <span className="text-[#5f6368]"> Pay</span>
              </span>
            </PaymentButton>
            <PaymentButton
              ariaLabel="תשלום ב-Apple Pay"
              className="bg-black text-white"
              onClick={() => handlePay("Apple Pay")}
            >
              <span className="text-[27px]">Apple Pay</span>
            </PaymentButton>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CartPage;
