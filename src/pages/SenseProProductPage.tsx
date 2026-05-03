import { Link } from "react-router-dom";
import BackButton from "@/components/BackButton";
import MallHeader from "@/components/mall/MallHeader";
import MallFooter from "@/components/mall/MallFooter";
import PageTracker from "@/components/PageTracker";
import { useCart } from "@/context/CartContext";
import imMezuzahsCollection from "@/assets/stores/im-mezuzahs-collection.png";

// Same boundaries used in IsraelMezuzahsCategoryPage to crop the selected item
const colBounds = [0, 0.0403, 0.0772, 0.1129, 0.1485, 0.1851, 0.2205, 0.2554, 0.2911, 0.3261, 0.362, 0.397, 0.4314, 0.467, 0.5026, 0.538, 0.5739, 0.6096, 0.6449, 0.6809, 0.7162, 0.7515, 0.7875, 0.8228, 0.8584, 0.8937, 0.9297, 0.9657, 1];
const rowBounds = [0, 0.2078, 0.4077, 0.6061, 0.8045, 1];

const fmt = (n: number) => `₪${n.toLocaleString("he-IL")}`;

const SenseProProductPage = () => {
  const { items, removeItem, updateQuantity } = useCart();
  const selected = items.filter((it) => it.type === "mezuzah");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <MallHeader />
      <PageTracker />
      <BackButton />
      <main className="flex-1 font-heebo text-foreground" dir="rtl">
        <div className="container mx-auto max-w-5xl px-4 py-10">
          <header className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-frank font-bold text-foreground mb-2">
              הפריטים שנבחרו
            </h1>
            <p className="text-muted-foreground font-heebo">
              תצוגה מפורטת של הפריטים שבחרת בעמוד 3.2.5 – שם המוצר, המחיר והתוכן.
            </p>
          </header>

          {selected.length === 0 ? (
            <div className="bg-card border border-border rounded-xl p-10 text-center shadow-sm">
              <p className="text-lg font-bold text-foreground mb-2">לא נבחרו פריטים עדיין</p>
              <p className="text-muted-foreground mb-6">
                עברו לעמוד הבחירה כדי להוסיף מזוזות מאוסף Israel Mezuzahs.
              </p>
              <Link
                to="/store/s2/category/mezuzahs"
                className="inline-block bg-mall-sign text-mall-gold font-bold px-6 py-3 rounded-lg hover:bg-mall-gold hover:text-mall-sign transition-colors"
              >
                לבחירת פריטים ←
              </Link>
            </div>
          ) : (
            <div className="space-y-5">
              {selected.map((it) => {
                const col = it.meta?.col ?? 0;
                const row = it.meta?.row ?? 0;
                const cw = colBounds[col + 1] - colBounds[col];
                const rh = rowBounds[row + 1] - rowBounds[row];
                const bgW = 100 / cw;
                const bgH = 100 / rh;
                const px = (colBounds[col] / (1 - cw)) * 100;
                const py = (rowBounds[row] / (1 - rh)) * 100;
                const lineTotal = (it.unitPrice + (it.shippingPerItem ?? 0)) * it.quantity;
                return (
                  <article
                    key={it.id}
                    className="bg-card border border-border rounded-xl p-5 shadow-md flex flex-col md:flex-row gap-5"
                  >
                    <div
                      className="rounded-lg shadow-inner bg-secondary shrink-0 mx-auto md:mx-0"
                      style={{
                        width: 160,
                        height: 320,
                        backgroundImage: `url(${imMezuzahsCollection})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: `${bgW}% ${bgH}%`,
                        backgroundPosition: `${px}% ${py}%`,
                        filter: "saturate(1.6) contrast(1.15) brightness(1.05)",
                      }}
                      aria-label={it.name}
                    />
                    <div className="flex-1 text-right">
                      <h2 className="text-2xl font-frank font-bold text-foreground mb-1">
                        {it.name}
                      </h2>
                      {it.brand && (
                        <p className="text-sm text-muted-foreground mb-3">{it.brand}</p>
                      )}
                      <p className="text-foreground leading-relaxed mb-4">
                        מזוזה מעוצבת בעבודת יד מעץ זית מארץ ישראל בשילוב אפוקסי בגוונים מרהיבים.
                        הפריט נבחר מתוך אוסף הקולקציה בעמוד הבחירה.
                      </p>

                      <table className="w-full text-sm border-t border-border">
                        <tbody className="divide-y divide-border">
                          <tr>
                            <td className="py-2 text-muted-foreground">מחיר ליחידה</td>
                            <td className="py-2 font-bold text-mall-gold text-left">{fmt(it.unitPrice)}</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-muted-foreground">דמי משלוח ליחידה</td>
                            <td className="py-2 font-bold text-foreground text-left">
                              {fmt(it.shippingPerItem ?? 0)}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2 text-muted-foreground">כמות</td>
                            <td className="py-2 text-left">
                              <div className="inline-flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(it.id, it.quantity - 1)}
                                  className="w-7 h-7 rounded border border-border bg-secondary font-bold"
                                  aria-label="הפחת כמות"
                                >
                                  −
                                </button>
                                <span className="min-w-[24px] text-center font-bold">{it.quantity}</span>
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(it.id, it.quantity + 1)}
                                  className="w-7 h-7 rounded border border-border bg-secondary font-bold"
                                  aria-label="הוסף כמות"
                                >
                                  +
                                </button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2 text-muted-foreground">סה״כ לפריט</td>
                            <td className="py-2 font-bold text-foreground text-left">{fmt(lineTotal)}</td>
                          </tr>
                        </tbody>
                      </table>

                      <div className="mt-4 flex justify-end">
                        <button
                          type="button"
                          onClick={() => removeItem(it.id)}
                          className="text-sm text-destructive hover:underline"
                        >
                          הסר פריט
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}

              <div className="flex flex-wrap gap-3 justify-center pt-4">
                <Link
                  to="/store/s2/category/mezuzahs"
                  className="inline-block bg-secondary text-foreground font-bold px-6 py-3 rounded-lg hover:bg-muted transition-colors"
                >
                  ← להוספת פריטים נוספים
                </Link>
                <Link
                  to="/cart"
                  className="inline-block bg-mall-sign text-mall-gold font-bold px-6 py-3 rounded-lg hover:bg-mall-gold hover:text-mall-sign transition-colors"
                >
                  מעבר לעגלה ←
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
      <MallFooter />
    </div>
  );
};

export default SenseProProductPage;
