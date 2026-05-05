import { Eye, Gift, Phone, Target, type LucideIcon } from "lucide-react";
import danielGlassArtLogo from "@/assets/stores/daniel-glass-art-logo.jpg";
import floor1Shop6Img from "@/assets/stores/floor1-shop6.png";
import hamsaJerusalemBlue from "@/assets/stores/hamsa-jerusalem-blue.png";
import hamsaJerusalemOrange from "@/assets/stores/hamsa-jerusalem-orange.png";
import lampBlueMosaic from "@/assets/stores/lamp-blue-mosaic.png";

type TimelineItem = {
  icon: LucideIcon;
  title: string;
  body: string;
};

const timelineItems: TimelineItem[] = [
  {
    icon: Eye,
    title: "היכרות: דניאל שפגשתי בנחלת בנימין",
    body:
      "פגשתי את דניאל בדוכן שלו, בין הצבעים, האור והאנשים. השיחה איתו חיברה בין עבודת יד מוקפדת, אנושיות חמה ואופי ישראלי שמזמין להתקרב.",
  },
  {
    icon: Target,
    title: "הסיפור: מארגנטינה לישראל דרך העולם",
    body:
      "המסע של דניאל מתחיל במפגש בין תרבויות: מארגנטינה, דרך שנים של למידה ותנועה, ועד לדוכן ישראלי חי שבו כל יצירה מקבלת שפה מקומית וצבע אישי.",
  },
  {
    icon: Target,
    title: "היצירה: מורכבות, צבע וסיפור חיים",
    body:
      "הויטראז' שלו משלב קווי מתאר כהים, חלקי זכוכית צבעוניים ושכבות אור. כל עבודה נראית כמו פסיפס חי שמחבר בין זיכרון, מקום, מסורת ותנועה.",
  },
  {
    icon: Gift,
    title: "ההמלצה: המתנה המושלמת שאין שני לה",
    body:
      "פריטים שמרגישים אישיים, צבעוניים וחד פעמיים. מתנה לחג, לבית, לחברים או לאוספים שאוהבים עבודת יד עם נוכחות, עומק וסיפור מאחורי כל פרט.",
  },
  {
    icon: Phone,
    title: "יצירת קשר: בתיאום מראש",
    body:
      "לסיורים, הזמנות מיוחדות ושאלות על עבודות זמינות, מומלץ ליצור קשר מראש ולתאם את הפריט או הדגם המתאים.",
  },
];

const sampledColors = [
  "#0e5a97",
  "#1f9db4",
  "#e4a821",
  "#d7682d",
  "#102b48",
  "#6d2f67",
  "#f2f4e8",
];

const MosaicShard = ({
  className,
  color,
  clipPath,
}: {
  className: string;
  color: string;
  clipPath: string;
}) => (
  <span
    className={`absolute border border-slate-900/55 shadow-[inset_0_0_18px_rgba(255,255,255,0.28)] ${className}`}
    style={{ backgroundColor: color, clipPath }}
    aria-hidden="true"
  />
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
        <span
          key={index}
          className="absolute left-1/2 top-1/2 h-[145%] w-[18%] origin-bottom rounded-full border border-slate-950/70"
          style={{
            background: sampledColors[index % sampledColors.length],
            transform: `translate(-50%, -100%) rotate(${index * 20 - 92}deg)`,
            opacity: index % 2 ? 0.9 : 1,
          }}
          aria-hidden="true"
        />
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
    <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs font-black uppercase tracking-[0.24em] text-[#5c5c5c]">
      portrait sample
    </span>
  </div>
);

const ProfileCard = () => (
  <aside className="space-y-7">
    <PortraitSample />

    <div className="overflow-hidden rounded-md bg-white p-3 shadow-[0_10px_22px_rgba(15,23,42,0.16)]">
      <img src={danielGlassArtLogo} alt="Daniel Glass-Art" className="h-auto w-full rounded-sm object-contain" loading="lazy" />
    </div>

    <StainedGlassPreview />

    <div className="grid grid-cols-2 gap-3">
      <img
        src={hamsaJerusalemBlue}
        alt="ויטראז' חמסה בגווני כחול"
        className="aspect-square rounded-md border border-slate-200 bg-white object-contain p-2 shadow-md"
        loading="lazy"
      />
      <img
        src={hamsaJerusalemOrange}
        alt="ויטראז' חמסה בגווני כתום"
        className="aspect-square rounded-md border border-slate-200 bg-white object-contain p-2 shadow-md"
        loading="lazy"
      />
    </div>

    <img
      src={floor1Shop6Img}
      alt="דוכן דניאל גלאס ארט עם עבודות ויטראז'"
      className="rounded-md border border-slate-200 bg-white object-cover shadow-md"
      loading="lazy"
    />
  </aside>
);

const TimelineSection = ({ item, isLast }: { item: TimelineItem; isLast: boolean }) => {
  const Icon = item.icon;

  return (
    <section className="grid grid-cols-[minmax(0,1fr)_38px] gap-5 text-right">
      <div className="pb-7">
        <h2 className="text-[clamp(1.35rem,2.8vw,2.15rem)] font-black leading-tight tracking-[-0.03em] text-[#151515]">
          {item.title}
        </h2>
        <p className="mt-2 text-[clamp(1rem,1.65vw,1.3rem)] font-semibold leading-[1.45] text-[#313131]">{item.body}</p>
      </div>

      <div className="relative flex justify-center">
        <span className="grid h-[34px] w-[34px] place-items-center rounded-full bg-white text-[#444]">
          <Icon className="h-7 w-7 stroke-[1.8]" aria-hidden="true" />
        </span>
        {!isLast && <span className="absolute top-11 h-[calc(100%-2rem)] w-px bg-[#606060]" aria-hidden="true" />}
      </div>
    </section>
  );
};

const DanielGlassartProfileDesign = () => {
  return (
    <section
      className="relative mx-auto w-full max-w-[1120px] overflow-hidden rounded-[28px] bg-[#fbfbfb] p-[clamp(1.25rem,4vw,3rem)] shadow-[0_24px_70px_rgba(15,23,42,0.16)]"
      dir="rtl"
    >
      <div className="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-10">
        <ProfileCard />

        <div>
          <header className="mb-6 text-right">
            <p className="text-sm font-black uppercase tracking-[0.35em] text-[#6b7280]">Sampled design code</p>
            <h1 className="mt-2 text-[clamp(2rem,5vw,3.65rem)] font-black leading-none tracking-[-0.05em] text-black">
              אומן ויטראז' - <span dir="ltr">DANIEL GLASSART</span>
            </h1>
          </header>

          <div className="space-y-1">
            {timelineItems.map((item, index) => (
              <TimelineSection key={item.title} item={item} isLast={index === timelineItems.length - 1} />
            ))}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute -bottom-20 -left-24 hidden h-56 w-56 rotate-[-25deg] border border-[#9eb6bd] bg-[#dff0f4]/55 lg:block" aria-hidden="true" />
    </section>
  );
};

export default DanielGlassartProfileDesign;
