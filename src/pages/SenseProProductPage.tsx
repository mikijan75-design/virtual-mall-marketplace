import { Heart, MessageCircle, Star } from "lucide-react";
import type { ReactNode } from "react";

const galleryImages = [
  {
    id: "hero",
    label: "אוזניות אלחוטיות Sense Pro - תצוגה קדמית",
    background: "linear-gradient(145deg, #eef1f3 0%, #f9fafb 48%, #e6e9ea 100%)",
  },
  {
    id: "lifestyle",
    label: "אוזניות Sense Pro על שולחן",
    background: "linear-gradient(145deg, #2f3840 0%, #536474 44%, #b9c0c5 100%)",
  },
  {
    id: "side",
    label: "אוזניות Sense Pro בזווית צד",
    background: "linear-gradient(145deg, #fbfbfb 0%, #e7e8e8 100%)",
  },
  {
    id: "silver",
    label: "אוזניות Sense Pro בגוון כסוף",
    background: "linear-gradient(145deg, #f4f5f3 0%, #c7cbc7 55%, #eef0ec 100%)",
  },
];

const productSpecs = [
  "סוללה חזקה ל-30 שעות",
  "ביטול רעשים אקטיבי",
  "מתחברים גם באוזניות אלחוטיות",
];

const shippingNotes = ["משלוח חינם 5 ימי עסקים", "אפשרות לאיסוף עצמי"];

const HeadphonesArtwork = ({ compact = false }: { compact?: boolean }) => (
  <svg
    viewBox="0 0 420 420"
    role="img"
    aria-label="אוזניות אלחוטיות SENSE PRO"
    className="h-full w-full overflow-visible"
  >
    <defs>
      <radialGradient id={compact ? "bandLightSmall" : "bandLight"} cx="34%" cy="20%" r="80%">
        <stop offset="0" stopColor="#6d7778" />
        <stop offset="0.42" stopColor="#3d4748" />
        <stop offset="1" stopColor="#202829" />
      </radialGradient>
      <radialGradient id={compact ? "cupLightSmall" : "cupLight"} cx="36%" cy="22%" r="76%">
        <stop offset="0" stopColor="#878b88" />
        <stop offset="0.38" stopColor="#575b57" />
        <stop offset="0.74" stopColor="#313532" />
        <stop offset="1" stopColor="#151918" />
      </radialGradient>
      <linearGradient id={compact ? "metalSmall" : "metal"} x1="0" x2="1">
        <stop offset="0" stopColor="#d8d9d5" />
        <stop offset="0.42" stopColor="#616863" />
        <stop offset="1" stopColor="#f3f4ef" />
      </linearGradient>
      <filter id={compact ? "shadowSmall" : "shadow"} x="-30%" y="-20%" width="160%" height="150%">
        <feDropShadow dx="0" dy="18" stdDeviation="16" floodColor="#0d1110" floodOpacity="0.28" />
      </filter>
    </defs>

    <g filter={`url(#${compact ? "shadowSmall" : "shadow"})`}>
      <path
        d="M97 251 C82 154 119 68 210 66 C301 68 337 154 323 251"
        fill="none"
        stroke={`url(#${compact ? "bandLightSmall" : "bandLight"})`}
        strokeWidth="42"
        strokeLinecap="round"
      />
      <path
        d="M118 156 C139 94 183 87 210 87 C237 87 281 94 302 156"
        fill="none"
        stroke="#111918"
        strokeOpacity="0.28"
        strokeWidth="16"
        strokeLinecap="round"
      />
      <path d="M102 225 L102 273" stroke={`url(#${compact ? "metalSmall" : "metal"})`} strokeWidth="17" strokeLinecap="round" />
      <path d="M318 225 L318 273" stroke={`url(#${compact ? "metalSmall" : "metal"})`} strokeWidth="17" strokeLinecap="round" />
      <ellipse
        cx="123"
        cy="293"
        rx="68"
        ry="89"
        transform="rotate(-14 123 293)"
        fill={`url(#${compact ? "cupLightSmall" : "cupLight"})`}
      />
      <ellipse
        cx="285"
        cy="293"
        rx="70"
        ry="92"
        transform="rotate(18 285 293)"
        fill={`url(#${compact ? "cupLightSmall" : "cupLight"})`}
      />
      <ellipse cx="126" cy="293" rx="42" ry="59" transform="rotate(-14 126 293)" fill="#171d1d" opacity="0.7" />
      <ellipse cx="284" cy="292" rx="44" ry="61" transform="rotate(18 284 292)" fill="#4b4f4c" opacity="0.9" />
      <path d="M240 185 C263 185 278 191 287 211" fill="none" stroke="#a8aaa4" strokeWidth="7" strokeLinecap="round" />
      <circle cx="264" cy="186" r="8" fill="#7d817c" stroke="#d5d6d1" strokeWidth="3" />
      <circle cx="90" cy="354" r="3" fill="#1d2423" />
      <path d="M242 373 C272 389 316 373 338 340" fill="none" stroke="#111817" strokeWidth="5" opacity="0.16" />
    </g>
  </svg>
);

const ContactCard = () => (
  <aside className="rounded-[9px] border-2 border-[#0d5960] bg-[#f8fbfb] p-3 shadow-[0_1px_7px_rgba(0,0,0,0.15)]">
    <h2 className="mb-2 text-center text-[25px] font-black leading-[1.12] text-[#111]">
      רוצה שנחזור אליך?
      <br />
      השאר פרטים
    </h2>
    <form className="space-y-[9px]" aria-label="טופס השארת פרטים">
      <input
        aria-label="שם מלא"
        placeholder="שם מלא"
        className="h-[30px] w-full rounded-[6px] border border-[#a9a9a9] bg-white px-3 text-right text-[13px] outline-none placeholder:text-[#161616]"
      />
      <input
        aria-label="טלפון חובה"
        placeholder="טלפון (חובה)"
        className="h-[30px] w-full rounded-[6px] border border-[#a9a9a9] bg-white px-3 text-right text-[13px] outline-none placeholder:text-[#161616]"
      />
      <textarea
        aria-label="הודעה אופציונלית"
        placeholder="הודעה (אופציונלי)"
        className="h-[73px] w-full resize-none rounded-[6px] border border-[#a9a9a9] bg-white px-3 py-2 text-right text-[13px] outline-none placeholder:text-[#161616]"
      />
      <button
        type="button"
        className="h-[41px] w-full rounded-[6px] bg-gradient-to-b from-[#126d76] to-[#065965] text-[16px] font-black text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]"
      >
        שלח פנייה
      </button>
    </form>
  </aside>
);

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="border-t border-[#ddd8ca] py-[13px] text-right">
    <h2 className="mb-[6px] text-center text-[17px] font-black leading-none text-[#121212]">[{title}]</h2>
    {children}
  </section>
);

const SenseProProductPage = () => {
  return (
    <main className="min-h-screen bg-white font-heebo text-[#101010]" dir="rtl">
      <div
        className="mx-auto grid max-w-[984px] grid-cols-1 gap-8 px-[6px] py-11 lg:grid-cols-[432px_1fr_184px] lg:gap-[56px]"
        dir="ltr"
      >
        <section className="order-1 lg:order-1" dir="rtl">
          <div className="flex h-[415px] items-center justify-center rounded-[7px] bg-gradient-to-br from-[#f0f2f3] via-[#fbfbfb] to-[#ecefee] p-6">
            <HeadphonesArtwork />
          </div>

          <div className="mt-[13px] grid grid-cols-4 gap-[12px]" aria-label="גלריית תמונות מוצר">
            {galleryImages.map((image, index) => (
              <button
                key={image.id}
                type="button"
                aria-label={image.label}
                className={`relative h-[63px] overflow-hidden rounded-[7px] bg-[#f3f4f4] p-1 ${
                  index === 0 ? "border-2 border-[#0d5960]" : "border border-transparent"
                }`}
                style={{ background: image.background }}
              >
                <HeadphonesArtwork compact />
                {index === 1 && (
                  <span className="absolute bottom-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#c7b275] text-[10px]">
                    🧔
                  </span>
                )}
              </button>
            ))}
          </div>
        </section>

        <section className="order-3 mx-auto w-full max-w-[284px] lg:order-2" dir="rtl">
          <div className="text-center">
            <h1 className="mb-[6px] whitespace-nowrap text-[27px] font-black leading-tight tracking-[-0.4px]">
              SENSE PRO אוזניות אלחוטיות - סנס פרו
            </h1>
            <div className="mb-[11px] flex items-center justify-center gap-[3px] text-[14px]">
              <span className="text-[#222]">(112)</span>
              <span className="flex flex-row-reverse gap-[1px] text-[#e3b42f]" aria-label="דירוג 4.8 מתוך 5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-[15px] w-[15px] fill-current stroke-current" />
                ))}
              </span>
              <span className="font-black text-[#222]">4.8</span>
            </div>

            <p className="text-[36px] font-black leading-[0.9] tracking-[-1px]">₪699</p>
            <p className="mt-[5px] text-[15px] font-medium">+ 25 ₪ דמי משלוח</p>

            <div className="mx-auto mt-[10px] w-fit rounded-[6px] border border-[#c6b681] bg-[#fff7dd] px-[12px] py-[6px] text-[14px] shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
              מבצע חג: 10% הנחה נוספת בקניית זוג נוסף! 🎉
            </div>

            <div className="mt-[12px] space-y-[9px]">
              <button className="h-[40px] w-full rounded-[5px] bg-gradient-to-b from-[#136f78] to-[#075965] text-[15px] font-black text-white shadow-[0_1px_2px_rgba(0,0,0,0.2)]">
                תשלום מהיר
              </button>
              <button className="h-[39px] w-full rounded-[5px] border-2 border-[#0d5960] bg-white text-[16px] font-black text-[#115d66]">
                הוספה לעגלה
              </button>
              <button className="flex h-[39px] w-full items-center justify-center gap-2 rounded-[5px] border-2 border-[#0d5960] bg-white text-[16px] font-black text-[#115d66]">
                <span>הוספה ל-WISH</span>
                <Heart className="h-[22px] w-[22px]" />
              </button>
            </div>

            <div className="mx-auto mt-[8px] w-[184px] rounded-[5px] border border-[#9d9d9d] bg-white px-2 py-[8px] text-[13px] font-bold leading-[1.25] shadow-[0_2px_7px_rgba(0,0,0,0.22)]">
              **חובה להשאיר מספר טלפון
              <br />
              לשמירה ברשימה
            </div>
          </div>

          <div className="mt-[20px]">
            <Section title="מפרט טכני">
              <ul className="list-inside list-disc text-[16px] font-semibold leading-[1.45]">
                {productSpecs.map((spec) => (
                  <li key={spec}>{spec}</li>
                ))}
              </ul>
            </Section>

            <Section title="שאלות ותשובות">
              <div className="h-[24px]" />
            </Section>

            <Section title="מדיניות משלוחים">
              <div className="space-y-[1px] text-center text-[16px] font-medium leading-[1.35]">
                {shippingNotes.map((note) => (
                  <p key={note}>{note}</p>
                ))}
              </div>
            </Section>
          </div>
        </section>

        <div className="order-2 w-full lg:order-3 lg:pt-[168px]" dir="rtl">
          <ContactCard />
          <a
            href="https://wa.me/972000000000"
            className="mt-[7px] flex h-[48px] items-center justify-between rounded-[7px] border border-[#e0e5e1] bg-[#eef6f4] px-[10px] text-right shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
            aria-label="צור קשר מהיר בצאט וואטסאפ"
          >
            <span className="flex h-[27px] w-[27px] items-center justify-center rounded-full bg-[#24d366] text-white">
              <MessageCircle className="h-[19px] w-[19px]" />
            </span>
            <span className="flex-1 pr-[8px]">
              <span className="block text-[16px] font-black leading-none">צור קשר מהיר</span>
              <span className="block text-[12px] font-bold leading-[1.25]">צאט וואטסאפ</span>
            </span>
          </a>
        </div>
      </div>
    </main>
  );
};

export default SenseProProductPage;
