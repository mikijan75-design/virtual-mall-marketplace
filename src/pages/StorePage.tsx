import { useParams, Link } from "react-router-dom";
import { mallFloors } from "@/data/mallData";
import MallHeader from "@/components/mall/MallHeader";
import israelMezuzahsAbout from "@/assets/stores/israel-mezuzahs-about.png";

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
      
      {/* Store banner */}
      <div className={`bg-gradient-to-r ${store.signColor} py-8 md:py-12`}>
        <div className="container mx-auto text-center text-white">
          <span className="text-6xl md:text-8xl block mb-4">{store.logoEmoji}</span>
          <h1 className="text-3xl md:text-5xl font-frank font-bold mb-2">
            {isIsraelMezuzahs ? "Rachel & Mauri" : store.name}
          </h1>
          <p className="text-lg opacity-90 font-heebo">
            {isIsraelMezuzahs ? "יריד האומנים בנחלת בנימין" : store.description}
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
                    {[1, 2].map((i) => (
                      <div key={`l-${i}`} className="bg-muted rounded-lg p-4 border border-border flex-1">
                        <div className="w-full aspect-square bg-secondary rounded-md mb-3 flex items-center justify-center text-3xl">
                          {store.logoEmoji}
                        </div>
                        <div className="h-3 bg-border rounded w-3/4 mx-auto mb-2" />
                        <div className="h-3 bg-mall-gold/30 rounded w-1/2 mx-auto" />
                      </div>
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
                    {[3, 4].map((i) => (
                      <div key={`r-${i}`} className="bg-muted rounded-lg p-4 border border-border flex-1">
                        <div className="w-full aspect-square bg-secondary rounded-md mb-3 flex items-center justify-center text-3xl">
                          {store.logoEmoji}
                        </div>
                        <div className="h-3 bg-border rounded w-3/4 mx-auto mb-2" />
                        <div className="h-3 bg-mall-gold/30 rounded w-1/2 mx-auto" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom row - products under image */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {[5, 6, 7, 8].map((i) => (
                    <div key={`b-${i}`} className="bg-muted rounded-lg p-4 border border-border">
                      <div className="w-full aspect-square bg-secondary rounded-md mb-3 flex items-center justify-center text-3xl">
                        {store.logoEmoji}
                      </div>
                      <div className="h-3 bg-border rounded w-3/4 mx-auto mb-2" />
                      <div className="h-3 bg-mall-gold/30 rounded w-1/2 mx-auto" />
                    </div>
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
