import { useEffect, useState, type CSSProperties } from "react";
import { Download, Eye, Gift, Pencil, Phone, Target, Trash2, X, type LucideIcon } from "lucide-react";
import danielGlassArtLogo from "@/assets/stores/daniel-glass-art-logo.jpg";
import floor1Shop6Img from "@/assets/stores/floor1-shop6.png";
import hamsaJerusalemBlue from "@/assets/stores/hamsa-jerusalem-blue.png";
import hamsaJerusalemOrange from "@/assets/stores/hamsa-jerusalem-orange.png";
import lampBlueMosaic from "@/assets/stores/lamp-blue-mosaic.png";

type TimelineItem = {
  id: string;
  iconKey: IconKey;
  title: string;
  body: string;
};

type IconKey = "eye" | "target" | "gift" | "phone";
const iconMap: Record<IconKey, LucideIcon> = { eye: Eye, target: Target, gift: Gift, phone: Phone };

const initialTimeline: TimelineItem[] = [
  { id: "t1", iconKey: "eye", title: " בנחלת בנימין", body: "פגשתי את דניאל בדוכן שלו שם הוא מציג את עבודותיו, עדיפות לתיאום מראש למעוניינים להשתתף בתצוגה" },
  { id: "t2", iconKey: "target", title: "מארגנטינה לישראל דרך העולם", body: "דניאל יליד ארגנטינה ביקר בישראל בשנות ה70 ומאז נדד בעולם עד שהחליט להשתקע בישראל" },
  { id: "t3", iconKey: "target", title: "היצירות שלו מספרות", body: "את סיפור חיו של יציאה מאזור הנוח והמוכר אל העולם ככה הן עבודותיו מלאות בפרטים מורכבים ושלל צבעים כנאה לעבודות ויטראז'" },
  { id: "t4", iconKey: "gift", title: " המתנה המושלמת שאין שני לה", body: "לכם וליקירכם תמיד תתקבל בברכה  ותמלא  כל חלל בצבע אם זה בפתח הבית, על אחת הקירות, על ענף בחצר או על שידה." },
  { id: "t5", iconKey: "phone", title: "לבירורים ושאלות", body: "השאירו לנו הודעה ונשמח לעזור" },
];

const STORAGE_KEY = "daniel-glassart-profile-v2";
type PersistedState = {
  items: TimelineItem[];
  headerTag: string;
  headerTitleHe: string;
  headerTitleEn: string;
  blocks: Record<BlockId, boolean>;
};
type BlockId = "portrait" | "logo" | "stained" | "hamsaBlue" | "hamsaOrange" | "shop";
const defaultBlocks: Record<BlockId, boolean> = { portrait: false, logo: false, stained: false, hamsaBlue: false, hamsaOrange: false, shop: false };

const loadState = (): PersistedState => {
  if (typeof window === "undefined") return { items: initialTimeline, headerTag: "\n", headerTitleHe: "אומן ויטראז' - ", headerTitleEn: "DANIEL GLASSART", blocks: defaultBlocks };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) throw new Error("none");
    const parsed = JSON.parse(raw) as PersistedState;
    return {
      items: parsed.items?.map((i) => ({ ...i, iconKey: (i.iconKey ?? "target") as IconKey })) ?? initialTimeline,
      headerTag: parsed.headerTag ?? "Sampled design code",
      headerTitleHe: parsed.headerTitleHe ?? "אומן ויטראז' - ",
      headerTitleEn: parsed.headerTitleEn ?? "DANIEL GLASSART",
      blocks: { ...defaultBlocks, ...(parsed.blocks ?? {}) },
    };
  } catch {
    return { items: initialTimeline, headerTag: "\n", headerTitleHe: "אומן ויטראז' - ", headerTitleEn: "DANIEL GLASSART", blocks: defaultBlocks };
  }
};

const sampledColors = ["#0e5a97","#1f9db4","#e4a821","#d7682d","#102b48","#6d2f67","#f2f4e8"];

const MosaicShard = ({ className, color, clipPath }: { className: string; color: string; clipPath: string }) => (
  <span className={`absolute border border-slate-900/55 shadow-[inset_0_0_18px_rgba(255,255,255,0.28)] ${className}`} style={{ backgroundColor: color, clipPath }} aria-hidden="true" />
);

const StainedGlassPreview = () => (
  <div className="relative mx-auto aspect-[1.32] w-full max-w-[530px]" aria-label="דוגמת ויטראז' צבעונית בקוד">
    <div className="absolute left-[2%] top-[4%] h-[64%] w-[45%] overflow-hidden rounded-sm border-[5px] border-[#1a1a1a] bg-[#dce7da] shadow-xl">
      <MosaicShard className="inset-x-0 top-0 h-[48%]" color="#9ab98e" clipPath="polygon(0 0, 100% 0, 66% 100%, 0 72%)" />
      <MosaicShard className="bottom-0 left-0 h-[42%] w-[55%]" color="#d69b27" clipPath="polygon(0 0, 100% 36%, 78% 100%, 0 100%)" />
      <MosaicShard className="bottom-0 right-0 h-[58%] w-[58%]" color="#e9d8b7" clipPath="polygon(22% 0, 100% 0, 100% 100%, 0 100%)" />
      <MosaicShard className="right-[18%] top-[22%] h-[42%] w-[46%]" color="#198fba" clipPath="polygon(28% 0, 100% 35%, 70% 100%, 0 80%, 0 22%)" />
      <MosaicShard className="right-[4%] top-[8%] h-[24%] w-[28%]" color="#eba92e" clipPath="polygon(0 0, 100% 0, 92% 100%, 20% 82%)" />
      <div className="absolute bottom-[9%] left-[16%] h-[28%] w-[42%] rounded-t-full border-[6px] border-[#223040] border-b-0 bg-[#f5d653]" />
      <div className="absolute bottom-[12%] left-[25%] h-[36%] w-[22%] rounded-t-full border-[4px] border-[#223040] bg-[#86b9c4]" />
      <div className="absolute bottom-[12%] left-[6%] h-[18%] w-[16%] rounded-t-full border-[4px] border-[#223040] bg-[#e6c373]" />
      <div className="absolute bottom-0 left-0 h-[9%] w-full bg-[#3b5537]" />
    </div>
    <div className="absolute right-[1%] top-[3%] h-[66%] w-[55%] overflow-hidden rounded-sm border-[5px] border-[#1a1a1a] bg-[#102b48] shadow-xl">
      {Array.from({ length: 11 }).map((_, index) => (
        <span key={index} className="absolute left-1/2 top-1/2 h-[145%] w-[18%] origin-bottom rounded-full border border-slate-950/70" style={{ background: sampledColors[index % sampledColors.length], transform: `translate(-50%, -100%) rotate(${index * 20 - 92}deg)`, opacity: index % 2 ? 0.9 : 1 }} aria-hidden="true" />
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_54%_58%,rgba(255,222,114,0.9)_0_8%,transparent_9%),radial-gradient(circle_at_50%_54%,transparent_0_14%,rgba(255,255,255,0.2)_15%,transparent_32%)]" />
    </div>
    <div className="absolute bottom-[2%] left-[31%] h-[42%] w-[24%] overflow-hidden rounded-sm border-[5px] border-[#1a1a1a] bg-[#0b4f86] shadow-2xl">
      <img src={lampBlueMosaic} alt="" className="h-full w-full object-cover" loading="lazy" />
    </div>
  </div>
);

const PortraitSample = () => (
  <div className="relative mx-auto aspect-[0.86] w-full max-w-[220px] overflow-hidden rounded-sm bg-[#f4f4f2] shadow-[0_8px_18px_rgba(15,23,42,0.2)]">
    <div className="absolute inset-x-[18%] top-[8%] aspect-square rounded-full bg-[#c79264]" />
    <div className="absolute left-[22%] top-[19%] h-[11%] w-[24%] rounded-full border-[3px] border-[#2f3135]" />
    <div className="absolute right-[22%] top-[19%] h-[11%] w-[24%] rounded-full border-[3px] border-[#2f3135]" />
    <div className="absolute left-[45%] top-[23%] h-[3px] w-[10%] bg-[#2f3135]" />
    <div className="absolute left-[35%] top-[36%] h-[9%] w-[30%] rounded-b-full bg-[#4e3327]" />
    <div className="absolute inset-x-[16%] bottom-0 h-[42%] rounded-t-[46%] bg-[#efefec]" />
    <div className="absolute bottom-0 right-[15%] h-[52%] w-[12%] rotate-[-18deg] bg-[#2f3135]" />
    <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs font-black uppercase tracking-[0.24em] text-[#5c5c5c]">portrait sample</span>
  </div>
);

const EditableBlock = ({ editing, onDelete, children, style }: { editing: boolean; onDelete: () => void; children: React.ReactNode; style?: CSSProperties }) => (
  <div className={`relative ${editing ? "outline outline-2 outline-dashed outline-rose-400/70 rounded-md" : ""}`} style={style}>
    {editing && (
      <button type="button" onClick={onDelete} aria-label="מחיקה" className="absolute -top-2 -left-2 z-10 grid h-6 w-6 place-items-center rounded-full bg-rose-600 text-white shadow-md hover:bg-rose-700">
        <X className="h-3.5 w-3.5" />
      </button>
    )}
    {children}
  </div>
);

const DanielGlassartProfileDesign = () => {
  const initial = loadState();
  const [editing, setEditing] = useState(false);
  const [items, setItems] = useState<TimelineItem[]>(initial.items);
  const [headerTag, setHeaderTag] = useState(initial.headerTag);
  const [headerTitleHe, setHeaderTitleHe] = useState(initial.headerTitleHe);
  const [headerTitleEn, setHeaderTitleEn] = useState(initial.headerTitleEn);
  const [blocks, setBlocks] = useState<Record<BlockId, boolean>>(initial.blocks);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ items, headerTag, headerTitleHe, headerTitleEn, blocks }));
    } catch { /* ignore */ }
  }, [items, headerTag, headerTitleHe, headerTitleEn, blocks]);

  const resetAll = () => {
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
    setItems(initialTimeline);
    setHeaderTag("Sampled design code");
    setHeaderTitleHe("אומן ויטראז' - ");
    setHeaderTitleEn("DANIEL GLASSART");
    setBlocks(defaultBlocks);
  };

  const hideBlock = (id: BlockId) => setBlocks((b) => ({ ...b, [id]: false }));
  const removeItem = (id: string) => setItems((arr) => arr.filter((i) => i.id !== id));
  const updateItem = (id: string, patch: Partial<TimelineItem>) => setItems((arr) => arr.map((i) => (i.id === id ? { ...i, ...patch } : i)));

  const exportEdits = () => {
    const data = JSON.stringify({ items, headerTag, headerTitleHe, headerTitleEn, blocks }, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "daniel-glassart-edits.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const editProps = (value: string, onChange: (v: string) => void): React.HTMLAttributes<HTMLElement> =>
    editing
      ? {
          contentEditable: true,
          suppressContentEditableWarning: true,
          onBlur: (e) => onChange((e.target as HTMLElement).innerText),
          className: "focus:outline focus:outline-2 focus:outline-sky-400 rounded px-0.5",
        }
      : {};

  return (
    <section className="relative mx-auto w-full overflow-hidden rounded-[20px] bg-[#fbfbfb] p-[clamp(0.75rem,1.6vw,1.5rem)] shadow-[0_18px_50px_rgba(15,23,42,0.16)]" dir="rtl">
    <div style={{ transform: "scale(0.6)", transformOrigin: "top right", width: "166.6667%" }}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setEditing((e) => !e)} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold shadow ${editing ? "bg-rose-600 text-white" : "bg-slate-900 text-white hover:bg-slate-700"}`}>
            {editing ? <><Trash2 className="h-3.5 w-3.5" /> סיום עריכה</> : <><Pencil className="h-3.5 w-3.5" /> עריכה</>}
          </button>
          {editing && (
            <button type="button" onClick={resetAll} className="inline-flex items-center gap-1 rounded-full bg-slate-200 px-2.5 py-1 text-[10px] font-bold text-slate-700 hover:bg-slate-300">
              איפוס
            </button>
          )}
          <button type="button" onClick={exportEdits} className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-2.5 py-1 text-[10px] font-bold text-white hover:bg-emerald-700">
            <Download className="h-3 w-3" /> ייצוא
          </button>
        </div>
        {editing && <span className="text-[10px] text-rose-600 font-bold">השינויים נשמרים אוטומטית</span>}
      </div>

      <div className="grid gap-5">
        <header className="text-right">
          <p {...editProps(headerTag, setHeaderTag)} className={`text-[10px] font-black uppercase tracking-[0.35em] text-[#6b7280] ${editing ? "focus:outline focus:outline-2 focus:outline-sky-400 rounded px-0.5" : ""}`}>
            {headerTag}
          </p>
          <h1 className="mt-1 text-[clamp(1.2rem,1.9vw,2.1rem)] font-black leading-none tracking-[-0.05em] text-black">
            <span {...editProps(headerTitleHe, setHeaderTitleHe)}>{headerTitleHe}</span>
            <span dir="ltr" {...editProps(headerTitleEn, setHeaderTitleEn)}>{headerTitleEn}</span>
          </h1>
        </header>

        <aside className="space-y-7">
          {blocks.portrait && (
            <EditableBlock editing={editing} onDelete={() => hideBlock("portrait")}>
              <PortraitSample />
            </EditableBlock>
          )}
          {blocks.logo && (
            <EditableBlock editing={editing} onDelete={() => hideBlock("logo")}>
              <div className="overflow-hidden rounded-md bg-white p-3 shadow-[0_10px_22px_rgba(15,23,42,0.16)]">
                <img src={danielGlassArtLogo} alt="Daniel Glass-Art" className="h-auto w-full rounded-sm object-contain" loading="lazy" />
              </div>
            </EditableBlock>
          )}
          {blocks.stained && (
            <EditableBlock editing={editing} onDelete={() => hideBlock("stained")}>
              <StainedGlassPreview />
            </EditableBlock>
          )}
          {(blocks.hamsaBlue || blocks.hamsaOrange) && (
            <div className="grid grid-cols-2 gap-3">
              {blocks.hamsaBlue && (
                <EditableBlock editing={editing} onDelete={() => hideBlock("hamsaBlue")}>
                  <img src={hamsaJerusalemBlue} alt="ויטראז' חמסה בגווני כחול" className="aspect-square w-full rounded-md border border-slate-200 bg-white object-contain p-2 shadow-md" loading="lazy" />
                </EditableBlock>
              )}
              {blocks.hamsaOrange && (
                <EditableBlock editing={editing} onDelete={() => hideBlock("hamsaOrange")}>
                  <img src={hamsaJerusalemOrange} alt="ויטראז' חמסה בגווני כתום" className="aspect-square w-full rounded-md border border-slate-200 bg-white object-contain p-2 shadow-md" loading="lazy" />
                </EditableBlock>
              )}
            </div>
          )}
          {blocks.shop && (
            <EditableBlock editing={editing} onDelete={() => hideBlock("shop")}>
              <img src={floor1Shop6Img} alt="דוכן דניאל גלאס ארט" className="w-full rounded-md border border-slate-200 bg-white object-cover shadow-md" loading="lazy" />
            </EditableBlock>
          )}
        </aside>

        <div className="space-y-1">
          {items.map((item, index) => {
            const Icon = iconMap[item.iconKey] ?? Target;
            const isLast = index === items.length - 1;
            return (
              <EditableBlock key={item.id} editing={editing} onDelete={() => removeItem(item.id)}>
                <section className="grid grid-cols-[minmax(0,1fr)_38px] gap-5 text-right">
                  <div className="pb-7">
                    <h2 {...editProps(item.title, (v) => updateItem(item.id, { title: v }))} className={`text-[clamp(1.1rem,1.6vw,1.6rem)] font-black leading-tight tracking-[-0.03em] text-[#151515] ${editing ? "focus:outline focus:outline-2 focus:outline-sky-400 rounded px-0.5" : ""}`}>
                      {item.title}
                    </h2>
                    <p {...editProps(item.body, (v) => updateItem(item.id, { body: v }))} className={`mt-2 text-[clamp(0.85rem,1.05vw,1.05rem)] font-semibold leading-[1.45] text-[#313131] ${editing ? "focus:outline focus:outline-2 focus:outline-sky-400 rounded px-0.5" : ""}`}>
                      {item.body}
                    </p>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="grid h-[34px] w-[34px] place-items-center rounded-full bg-white text-[#444]">
                      <Icon className="h-7 w-7 stroke-[1.8]" aria-hidden="true" />
                    </span>
                    {!isLast && <span className="absolute top-11 h-[calc(100%-2rem)] w-px bg-[#606060]" aria-hidden="true" />}
                  </div>
                </section>
              </EditableBlock>
            );
          })}
        </div>
      </div>
    </div>
    </section>
  );
};

export default DanielGlassartProfileDesign;
