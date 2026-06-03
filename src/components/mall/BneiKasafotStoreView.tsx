import MallHeader from "@/components/mall/MallHeader";
import MallFooter from "@/components/mall/MallFooter";
import PageTracker from "@/components/PageTracker";
import BackButton from "@/components/BackButton";
import type { Store } from "@/data/mallData";
import iconLock from "@/assets/stores/bnei-icons/lock.png";
import iconSafeWrench from "@/assets/stores/bnei-icons/safe-wrench.png";
import iconSafesStack from "@/assets/stores/bnei-icons/safes-stack.png";
import iconSafeDrill from "@/assets/stores/bnei-icons/safe-drill.png";
import iconPoliceBadge from "@/assets/stores/bnei-icons/police-badge.png";
import iconUsedSafe from "@/assets/stores/bnei-icons/used-safe.png";
import iconCraneTruck from "@/assets/stores/bnei-icons/crane-truck.png";

type Category = {
  icon: string;
  title: string;
  desc: string;
};

const categories: Category[] = [
  { icon: iconLock,        title: "פריצת מנעולים",      desc: "פתרון מהיר ומקצועי לכל סוגי המנעולים ללא נזק." },
  { icon: iconSafeWrench,  title: "תיקון ושיפוץ כספות", desc: "שירותי תיקון מקיפים, שיקום מנגנונים מכניים ואלקטרוניים." },
  { icon: iconSafesStack,  title: "מכירת כספות",         desc: "מבחר כספות חדשות ומתקדמות לעסקים ופרטיים, כולל ייעוץ." },
  { icon: iconSafeDrill,   title: "פריצת כספות",         desc: "פריצה מוסמכת לכספות חסומות או תקולות, שמירה על התכולה." },
  { icon: iconPoliceBadge, title: "ספק משטרת ישראל",     desc: "ספק מורשה ומאושר של מנעולים וכספות עבור כוחות הביטחון." },
  { icon: iconUsedSafe,    title: "מכירת כספות יד שנייה", desc: "כספות משומשות ואמינות שעברו שיפוץ, מחירים אטרקטיביים." },
  { icon: iconCraneTruck,  title: "שינוע והובלת כספות",   desc: "הובלה מקצועית ומאובטחת של כספות כבדות ומורכבות." },
];

const BneiKasafotStoreView = ({ store }: { store: Store }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#020617]">
      <MallHeader />
      <PageTracker storeId={store.id} />
      <BackButton />

      {/* Banner */}
      <header
        className="relative overflow-hidden py-10 md:py-14 text-center"
        style={{
          background:
            "radial-gradient(ellipse at center, #0a1a3a 0%, #050b1f 60%, #02060f 100%)",
        }}
      >
        {/* circuit pattern overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(125,211,252,0.18) 1px, transparent 1px), linear-gradient(0deg, rgba(125,211,252,0.18) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />
        <div className="relative">
          <h1 className="font-frank text-3xl md:text-5xl font-black tracking-wide text-[#e0f2fe] drop-shadow-[0_2px_10px_rgba(56,189,248,0.5)]">
            בני כספות
          </h1>
          <p className="mt-3 font-heebo text-base md:text-xl text-[#7dd3fc]">
            שירותי מנעולנות וכספות מתקדמים
          </p>
          <span className="inline-block mt-4 bg-[#0c4a6e]/60 text-[#bae6fd] border border-[#38bdf8]/30 px-4 py-1 rounded-full text-sm font-heebo">
            {store.category} • קומה {store.floor}
          </span>
        </div>
      </header>

      <main
        className="scrolling-layout flex-1 relative"
        dir="rtl"
        style={{
          background:
            "linear-gradient(180deg, #02060f 0%, #050b1f 50%, #02060f 100%)",
        }}
      >
        {/* subtle circuit pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(125,211,252,0.4) 1px, transparent 1px), linear-gradient(0deg, rgba(125,211,252,0.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative mx-auto max-w-3xl px-5 py-12 md:py-16 space-y-10 md:space-y-14">
          {categories.map(({ icon, title, desc }, i) => {
            const reverse = i % 2 === 1;
            return (
              <section
                key={title}
                className={`category-row flex items-center gap-5 md:gap-8 ${
                  reverse ? "flex-row-reverse" : ""
                }`}
              >
                <div className="icon-container shrink-0">
                  <img
                    src={icon}
                    alt={title}
                    className="floating-icon h-24 w-24 md:h-32 md:w-32 object-contain"
                    style={{
                      filter:
                        "drop-shadow(0 0 18px rgba(56,189,248,0.45))",
                      animation: `floaty 4s ease-in-out ${i * 0.3}s infinite`,
                    }}
                    loading="lazy"
                  />
                </div>
                <div
                  className={`text-content flex-1 ${
                    reverse ? "text-left" : "text-right"
                  }`}
                >
                  <h2 className="font-frank text-xl md:text-3xl font-extrabold text-[#e0f2fe] mb-1.5 md:mb-2">
                    {title}
                  </h2>
                  <p className="font-heebo text-sm md:text-base leading-relaxed text-[#94a3b8]">
                    {desc}
                  </p>
                </div>
              </section>
            );
          })}

          <footer className="pt-8 mt-6 border-t border-[#1e3a5f] text-center font-heebo text-[#7dd3fc] text-sm md:text-base">
            לפרטים נוספים:{" "}
            <span dir="ltr" className="tracking-wide">
              050-XXXXXXX
            </span>{" "}
            | info@locksandsafes.co.il
          </footer>
        </div>
      </main>

      <style>{`
        @keyframes floaty {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>

      <MallFooter />
    </div>
  );
};

export default BneiKasafotStoreView;