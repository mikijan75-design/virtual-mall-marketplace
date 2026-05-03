import { Link, useNavigate, useSearchParams } from "react-router-dom";
import MallHeader from "@/components/mall/MallHeader";
import MallFooter from "@/components/mall/MallFooter";
import PageTracker from "@/components/PageTracker";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowRight } from "lucide-react";
import imMezuzahsCollection from "@/assets/stores/im-mezuzahs-collection.png";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const colBounds = [0, 0.0403, 0.0772, 0.1129, 0.1485, 0.1851, 0.2205, 0.2554, 0.2911, 0.3261, 0.362, 0.397, 0.4314, 0.467, 0.5026, 0.538, 0.5739, 0.6096, 0.6449, 0.6809, 0.7162, 0.7515, 0.7875, 0.8228, 0.8584, 0.8937, 0.9297, 0.9657, 1];
const rowBounds = [0, 0.2078, 0.4077, 0.6061, 0.8045, 1];
const gridCols = colBounds.length - 1;
const gridRows = rowBounds.length - 1;

const MezuzahProductPage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const col = Math.max(0, Math.min(gridCols - 1, parseInt(params.get("col") || "0", 10)));
  const row = Math.max(0, Math.min(gridRows - 1, parseInt(params.get("row") || "0", 10)));
  const itemNumber = row * gridCols + col + 1;
  const PRICE = 249;

  const cw = colBounds[col + 1] - colBounds[col];
  const rh = rowBounds[row + 1] - rowBounds[row];
  const bgW = 100 / cw;
  const bgH = 100 / rh;
  const px = (colBounds[col] / (1 - cw)) * 100;
  const py = (rowBounds[row] / (1 - rh)) * 100;

  return (
    <div className="min-h-screen bg-background">
      <MallHeader />
      <PageTracker storeId="s2" categorySlug="mezuzahs" categoryIndex={9} />

      <div className="bg-gradient-to-r from-cyan-400 to-blue-600 py-8">
        <div className="container mx-auto text-center text-white px-4">
          <h1 className="text-3xl md:text-4xl font-frank font-bold">מזוזה מס׳ {itemNumber}</h1>
          <p className="text-lg opacity-90 font-heebo mt-1">פריט נבחר מתוך הקולקציה</p>
        </div>
      </div>

      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto bg-card border border-border rounded-xl p-6 md:p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex justify-center">
              <div
                className="rounded-lg shadow-inner bg-secondary"
                style={{
                  width: 260,
                  height: 520,
                  backgroundImage: `url(${imMezuzahsCollection})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: `${bgW}% ${bgH}%`,
                  backgroundPosition: `${px}% ${py}%`,
                  filter: "saturate(1.6) contrast(1.15) brightness(1.05)",
                }}
              />
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-frank font-bold text-foreground mb-3">מזוזה מעוצבת בעבודת יד</h2>
              <p className="font-heebo text-muted-foreground mb-4">
                מזוזה ייחודית מעץ זית ושיבוצי אפוקסי, פריט מס׳ {itemNumber} מתוך הקולקציה המלאה של Israel Mezuzahs.
              </p>
              <div className="text-3xl font-frank font-bold text-mall-gold mb-6">₪249</div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  className="bg-mall-gold text-mall-sign hover:bg-mall-gold/90 font-heebo font-bold"
                  onClick={() => {
                    addItem({
                      id: `mezuzah-${col}-${row}`,
                      name: `מזוזה מס׳ ${itemNumber}`,
                      unitPrice: PRICE,
                      image: imMezuzahsCollection,
                      imageBgSize: `${bgW}% ${bgH}%`,
                      imageBgPosition: `${px}% ${py}%`,
                    });
                    toast.success("הפריט נוסף לסל");
                    navigate("/cart");
                  }}
                >
                  <ShoppingCart className="h-4 w-4 ml-2" />
                  הוסף לסל
                </Button>
                <Button asChild variant="outline" className="font-heebo">
                  <Link to="/store/s2/category/mezuzahs">
                    <ArrowRight className="h-4 w-4 ml-2" />
                    חזרה לקטגוריה
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MallFooter />
    </div>
  );
};

export default MezuzahProductPage;