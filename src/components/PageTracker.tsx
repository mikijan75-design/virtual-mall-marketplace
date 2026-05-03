import { mallFloors } from "@/data/mallData";

interface PageTrackerProps {
  floor?: number;
  storeId?: string;
  categorySlug?: string;
  categoryIndex?: number;
}

/**
 * Site-wide page tracker badge.
 * Format: floor.store.category  (e.g. "3.2.5")
 * Missing levels are shown as "0".
 * Always rendered in the top-left corner under the header.
 */
const PageTracker = ({ floor, storeId, categorySlug, categoryIndex }: PageTrackerProps) => {
  let f = floor ?? 0;
  let s = 0;

  if (storeId) {
    for (const fl of mallFloors) {
      const idx = fl.stores.findIndex((st) => st.id === storeId);
      if (idx !== -1) {
        f = fl.id;
        s = idx + 1;
        break;
      }
    }
  }

  const c = categoryIndex && categoryIndex > 0 ? categoryIndex : 0;

  const code = `${f}.${s}.${c}`;
  const label = categorySlug
    ? "קומה.חנות.קטגוריה"
    : storeId
      ? "קומה.חנות"
      : "קומה";

  return (
    <div
      dir="ltr"
      className="fixed top-20 left-3 z-40 flex items-center gap-2 rounded-full bg-mall-sign/95 text-mall-gold px-3 py-1.5 shadow-lg border border-mall-gold/40 font-mono text-sm md:text-base backdrop-blur"
      title={label}
      aria-label={`${label}: ${code}`}
    >
      <span className="opacity-70 text-xs hidden md:inline">#</span>
      <span className="font-bold tracking-wider">{code}</span>
    </div>
  );
};

export default PageTracker;