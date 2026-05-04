import { BookOpen, Heart, MapPin, Palette, Phone, Settings, Smartphone } from "lucide-react";
import BackButton from "@/components/BackButton";
import MallFooter from "@/components/mall/MallFooter";
import MallHeader from "@/components/mall/MallHeader";
import PageTracker from "@/components/PageTracker";

const hebrewHighlights = [
  {
    icon: Palette,
    body:
      "אבנר הוא איש אשכולות אמיתי, המשלב רקע אקדמי כמהנדס אזרחי מהטכניון עם תשוקה עמוקה לציור ולכתיבה. הוא פנסיונר, וכל יצירה שלו קורנת תשוקה.",
  },
  {
    icon: BookOpen,
    body:
      "הגלריה שלו מציגה מגוון רחב ועשיר של נושאים והיבטים. מנופים ישראליים ועד לרגעים אישיים, הציור הרב מבטיח שכל אחד ימצא חיבור אישי.",
  },
  {
    icon: Settings,
    body:
      "מדובר ביצירות מקוריות, עבודת יד אישית של אבנר. מתנה מושלמת ליקירכם ותזכורת ויזואלית לחוזק יצירתו ותרומתו של הפועל הישראלי.",
  },
];

const PaperTexture = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(181,143,83,0.12),transparent_26%),radial-gradient(circle_at_82%_84%,rgba(181,143,83,0.11),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.72),rgba(245,236,220,0.54))]" />
    <div className="absolute inset-x-0 top-0 h-8 border-y border-[#d3c2a5]/50 bg-[repeating-linear-gradient(45deg,rgba(166,133,78,0.12)_0_2px,transparent_2px_10px)]" />
    <div className="absolute inset-x-0 bottom-0 h-8 border-y border-[#d3c2a5]/50 bg-[repeating-linear-gradient(45deg,rgba(166,133,78,0.12)_0_2px,transparent_2px_10px)]" />
  </div>
);

const PortraitCard = () => (
  <figure className="relative mx-auto w-full max-w-[315px] rotate-[-3deg] rounded-sm bg-white p-3 shadow-[0_18px_28px_rgba(58,43,28,0.2)]">
    <div className="aspect-[4/5] overflow-hidden bg-gradient-to-b from-[#f8fafc] via-[#e9edf2] to-[#dde3eb]">
      <div className="flex h-full flex-col items-center justify-end px-8 pt-8">
        <div className="relative mb-[-4px] h-32 w-32 rounded-full bg-[#dfc5ad] shadow-inner">
          <div className="absolute -top-2 left-1/2 h-14 w-28 -translate-x-1/2 rounded-t-full bg-[#d9d7d2]" />
          <div className="absolute left-6 top-14 h-6 w-6 rounded-full border-[3px] border-[#1f252a]" />
          <div className="absolute right-6 top-14 h-6 w-6 rounded-full border-[3px] border-[#1f252a]" />
          <div className="absolute left-[50%] top-[66px] h-[3px] w-8 -translate-x-1/2 bg-[#1f252a]" />
          <div className="absolute bottom-8 left-1/2 h-3 w-10 -translate-x-1/2 rounded-b-full border-b-2 border-[#7d4637]" />
        </div>
        <div className="relative w-full rounded-t-[42px] bg-[#263d5a] px-8 pb-16 pt-12">
          <div className="mx-auto h-24 w-20 rounded-b-[28px] rounded-t-sm bg-[#d9e7f4]" />
          <span className="absolute right-12 top-12 h-4 w-6 rounded-sm border border-white/70 bg-white" />
        </div>
      </div>
    </div>
    <figcaption className="sr-only">איור דיוקן מקודד של אבנר עובד בחליפה כחולה ומשקפיים.</figcaption>
  </figure>
);

const Divider = () => <div className="mx-auto my-5 h-px w-28 bg-gradient-to-r from-transparent via-[#b3925a] to-transparent" />;

const AvnerOvadPage = () => {
  return (
    <div className="min-h-screen bg-background font-heebo text-[#2f241d]">
      <MallHeader />
      <PageTracker />
      <BackButton />

      <main className="px-4 py-8">
        <article className="relative mx-auto max-w-[980px] overflow-hidden rounded-[2rem] border border-[#d4c4a7] bg-[#f8f1e5] shadow-[0_24px_70px_rgba(66,44,20,0.16)]">
          <PaperTexture />

          <header className="relative z-10 grid gap-6 bg-[#183247] px-6 py-8 text-center text-white md:grid-cols-[330px_1fr] md:px-10 md:text-right">
            <div className="md:row-span-2">
              <PortraitCard />
            </div>

            <div className="flex flex-col items-center justify-center md:items-end">
              <p className="font-frank text-[clamp(3rem,8vw,5.5rem)] font-black leading-none tracking-[-0.05em] text-[#e6d6b9] drop-shadow-[0_3px_0_rgba(0,0,0,0.22)]">
                אבנר עובד
              </p>
              <h1 className="mt-1 font-frank text-[clamp(2.3rem,5vw,4rem)] font-black uppercase tracking-[0.04em] text-[#d9c393]">
                Avner Ovad
              </h1>
              <p className="mt-3 max-w-[520px] text-[clamp(1.15rem,2.3vw,1.55rem)] font-bold leading-tight text-white/95">
                אמן ציור ישראלי, סופר, ומהנדס אזרחי (טכניון)
              </p>
            </div>
          </header>

          <section className="relative z-10 grid gap-8 px-6 py-8 md:grid-cols-[0.9fr_1.1fr] md:px-10" dir="rtl">
            <aside className="space-y-8 text-left md:pt-8" dir="ltr">
              <div className="flex items-center gap-4">
                <Heart className="h-9 w-9 fill-[#b3925a] text-[#b3925a]" aria-hidden="true" />
                <h2 className="text-2xl font-black uppercase leading-tight tracking-wide text-[#30241d]">
                  Meet Avner: an Israeli artist with heart.
                </h2>
              </div>
              <Divider />

              <div className="rounded-2xl border border-[#c8ae7c]/70 bg-white/35 p-5 text-lg leading-snug shadow-sm">
                <p className="font-bold">For artwork viewing and personal inquiries:</p>
                <p className="mt-2 text-[#4d3a2d]">personartist.com</p>
                <div className="mt-5 border-l-2 border-[#b3925a] pl-4">
                  <p className="font-black">To View Works:</p>
                  <p>Contact Ron [Number]</p>
                </div>
              </div>

              <div className="rounded-2xl bg-[#efe4d1]/80 p-5 text-right" dir="rtl">
                <p className="text-xl font-black">בתיאום לצפייה והשארת הודעה</p>
                <p className="mt-2 text-lg">ניתן לראות את העבודות ולהציג אותן לקהל.</p>
              </div>
            </aside>

            <div className="space-y-6 text-right">
              <section>
                <h2 className="text-[clamp(1.6rem,3vw,2.25rem)] font-black leading-tight">
                  אבנר - אמן ישראלי עם לב פועם.
                </h2>
                <Divider />
              </section>

              {hebrewHighlights.map(({ icon: Icon, body }) => (
                <section key={body} className="grid grid-cols-[1fr_auto] items-start gap-5">
                  <p className="text-[clamp(1.1rem,2vw,1.45rem)] font-bold leading-[1.45]">{body}</p>
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#b3925a]/16 text-[#a4824d]">
                    <Icon className="h-8 w-8" strokeWidth={2.4} aria-hidden="true" />
                  </span>
                </section>
              ))}

              <blockquote className="relative rounded-2xl border-2 border-[#b3925a] bg-[#f6eddc]/80 p-5 text-[clamp(1.05rem,2vw,1.35rem)] font-bold leading-snug shadow-sm">
                פגשתי את אבנר ביריד אמנים בנחלת בנימין, שם הוא מציג את עבודותיו. התרגשתי שיש בעבודות בעל הרגשה ותרומה לחברה!
                <span className="absolute -bottom-5 left-10 h-8 w-8 rotate-45 border-b-2 border-r-2 border-[#b3925a] bg-[#f6eddc]" aria-hidden="true" />
              </blockquote>

              <div className="grid gap-4 rounded-2xl bg-white/40 p-5 text-lg font-bold sm:grid-cols-2">
                <div className="flex items-center justify-end gap-3">
                  <span>To View Works: [Phone Number]</span>
                  <Smartphone className="h-8 w-8 text-[#a4824d]" aria-hidden="true" />
                </div>
                <div className="flex items-center justify-end gap-3">
                  <span>נחלת בנימין, יריד האמנים</span>
                  <MapPin className="h-8 w-8 text-[#a4824d]" aria-hidden="true" />
                </div>
                <div className="flex items-center justify-end gap-3 sm:col-span-2">
                  <span>תיאום לצפייה בעבודות:</span>
                  <Phone className="h-8 w-8 text-[#a4824d]" aria-hidden="true" />
                </div>
              </div>
            </div>
          </section>
        </article>
      </main>

      <MallFooter />
    </div>
  );
};

export default AvnerOvadPage;
