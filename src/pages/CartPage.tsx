import { CreditCard, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import BackButton from "@/components/BackButton";
import MallHeader from "@/components/mall/MallHeader";
import MallFooter from "@/components/mall/MallFooter";
import PageTracker from "@/components/PageTracker";
import { useCart } from "@/contexts/CartContext";

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
  const { items, setQuantity, removeItem, subtotal } = useCart();
  const VAT_RATE = 0.17;
  const vat = subtotal * VAT_RATE;
  const shipping = items.length > 0 ? 35 : 0;
  const total = subtotal + vat + shipping;
  const fmt = (n: number) => `₪${n.toLocaleString("he-IL", { maximumFractionDigits: 2 })}`;

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
              <div className="flex flex-col items-center justify-center gap-3 bg-white px-4 py-12 text-center">
                <ShoppingBag className="h-12 w-12 text-[#888]" />
                <p className="text-[18px] font-medium text-[#555]">הסל ריק</p>
                <Link to="/" className="text-[16px] font-bold text-[#0a6770] underline">
                  המשך לקנייה
                </Link>
              </div>
            ) : (
              items.map((item) => {
                const lineTotal = item.unitPrice * item.quantity;
                return (
                  <div
                    key={item.id}
                    className="grid min-h-[154px] grid-cols-[120px_1fr] border-b border-[#2d7075] bg-white md:grid-cols-[120px_120px_120px_1fr]"
                  >
                    <div className="flex items-center justify-center border-l border-[#2d7075] px-3 text-[18px] font-black">
                      {fmt(lineTotal)}
                    </div>
                    <div className="hidden items-center justify-center border-l border-[#2d7075] px-3 text-[18px] font-black md:flex">
                      {fmt(item.unitPrice)}
                    </div>
                    <div className="hidden items-center justify-center border-l border-[#2d7075] px-3 md:flex">
                      <div className="flex h-[34px] items-center overflow-hidden rounded-[5px] border border-[#a4aaa7] bg-white shadow-sm">
                        <button
                          type="button"
                          aria-label="הפחת כמות"
                          onClick={() => setQuantity(item.id, item.quantity - 1)}
                          className="flex h-full w-8 items-center justify-center bg-[#f5f5f5]"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="flex h-full w-[38px] items-center justify-center border-x border-[#d0d0d0] text-[18px] font-bold">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label="הוסף כמות"
                          onClick={() => setQuantity(item.id, item.quantity + 1)}
                          className="flex h-full w-8 items-center justify-center bg-[#eef3f1]"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-[1fr_126px] items-center gap-4 px-[14px] py-[14px]">
                      <div className="text-right">
                        <p className="text-[18px] font-medium leading-[1.25]">{item.name}</p>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="mt-2 inline-flex items-center gap-1 text-[14px] font-bold text-[#a3343c] hover:underline"
                        >
                          <Trash2 className="h-4 w-4" />
                          הסר
                        </button>
                      </div>
                      <div className="flex h-[126px] items-center justify-center overflow-hidden rounded-[5px] bg-[#f1f2f2] p-2">
                        {item.image ? (
                          item.imageBgSize ? (
                            <div
                              className="h-full w-full rounded-[3px]"
                              style={{
                                backgroundImage: `url(${item.image})`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: item.imageBgSize,
                                backgroundPosition: item.imageBgPosition,
                              }}
                            />
                          ) : (
                            <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
                          )
                        ) : (
                          <ShoppingBag className="h-10 w-10 text-[#888]" />
                        )}
                      </div>
                    </div>
                    <div className="col-span-2 grid grid-cols-3 border-t border-[#2d7075] text-center text-[15px] md:hidden">
                      <div className="border-l border-[#2d7075] p-2">
                        <div className="font-black">מחיר יחידה</div>
                        <div>{fmt(item.unitPrice)}</div>
                      </div>
                      <div className="border-l border-[#2d7075] p-2">
                        <div className="font-black">כמות</div>
                        <div className="flex items-center justify-center gap-1">
                          <button
                            type="button"
                            onClick={() => setQuantity(item.id, item.quantity - 1)}
                            aria-label="הפחת"
                            className="rounded border border-[#a4aaa7] px-1"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="font-bold">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => setQuantity(item.id, item.quantity + 1)}
                            aria-label="הוסף"
                            className="rounded border border-[#a4aaa7] px-1"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
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

            {([
              ["סכום ביניים", fmt(subtotal)],
              ['מע"מ (17%)', fmt(vat)],
              ["דמי משלוח", items.length === 0 ? "—" : fmt(shipping)],
            ] as const).map(([label, value]) => (
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
    </div>
  );
};

export default CartPage;
