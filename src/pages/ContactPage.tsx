import { useLocation } from "react-router-dom";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import MallHeader from "@/components/mall/MallHeader";
import MallFooter from "@/components/mall/MallFooter";
import PageTracker from "@/components/PageTracker";

const ContactPage = () => {
  const location = useLocation();
  const incoming = (location.state as any) || {};
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: incoming.product ? `מתעניין/ת ביצירה: ${incoming.product}` : "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast({ title: "חסרים פרטים", description: "נא למלא שם וטלפון" });
      return;
    }
    toast({
      title: "תודה! קיבלנו את הפנייה",
      description: `${form.name}, נחזור אליך בהקדם.`,
    });
    setForm({ name: "", phone: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fffdfb] font-heebo text-[#3b2618]" dir="rtl">
      <MallHeader />
      <PageTracker />
      <main className="mx-auto w-full max-w-[1100px] px-6 py-10">
        <h1 className="text-center text-[clamp(2rem,4vw,3rem)] font-black text-[#3b2618]">
          <span className="rounded-full bg-[#fbecd8] px-6 py-2 shadow-[inset_0_-8px_0_rgba(246,171,82,0.16)]">
            צור קשר
          </span>
        </h1>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="text-right">
            <p className="text-[clamp(1rem,1.7vw,1.25rem)] font-bold leading-[1.5] text-[#2b241f]">
              השאירו פרטים — נחזור אליכם בהקדם עם מידע נוסף, תיאום צפייה והצעת מחיר.
            </p>
            {incoming.image && (
              <div className="mt-6 rounded-2xl border-2 border-[#0d5960] bg-white p-4 shadow-md">
                <p className="mb-3 text-sm font-bold text-[#0d5960]">הציור שבחרת</p>
                <div className="flex items-center gap-4">
                  <img
                    src={incoming.image}
                    alt={incoming.product ?? ""}
                    className="h-32 w-32 rounded-lg object-cover"
                  />
                  <div className="text-right">
                    <p className="text-xs text-[#666]">מוצר נבחר</p>
                    <p className="text-base font-black text-[#0d5960]">{incoming.product}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <aside className="rounded-[12px] border-2 border-[#0d5960] bg-[#f8fbfb] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.18)]">
            <h3 className="mb-3 text-center text-[24px] font-black leading-[1.15] text-[#111]">
              רוצה שנחזור אליך?
              <br />
              השאר/י פרטים
            </h3>
            <form className="space-y-[10px]" aria-label="טופס השארת פרטים" onSubmit={handleSubmit}>
              <input
                aria-label="שם מלא"
                placeholder="שם מלא"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="h-[36px] w-full rounded-[6px] border border-[#a9a9a9] bg-white px-3 text-right text-[14px] outline-none placeholder:text-[#161616]"
              />
              <input
                aria-label="טלפון חובה"
                placeholder="טלפון (חובה)"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="h-[36px] w-full rounded-[6px] border border-[#a9a9a9] bg-white px-3 text-right text-[14px] outline-none placeholder:text-[#161616]"
              />
              <input
                aria-label="אימייל"
                type="email"
                placeholder="אימייל (אופציונלי)"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="h-[36px] w-full rounded-[6px] border border-[#a9a9a9] bg-white px-3 text-right text-[14px] outline-none placeholder:text-[#161616]"
              />
              <textarea
                aria-label="הודעה"
                placeholder="הודעה (אופציונלי)"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="h-[88px] w-full resize-none rounded-[6px] border border-[#a9a9a9] bg-white px-3 py-2 text-right text-[14px] outline-none placeholder:text-[#161616]"
              />
              <button
                type="submit"
                className="h-[44px] w-full rounded-[6px] bg-gradient-to-b from-[#126d76] to-[#065965] text-[16px] font-black text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] hover:opacity-95"
              >
                שלח פנייה
              </button>
            </form>
          </aside>
        </div>
      </main>
      <MallFooter />
    </div>
  );
};

export default ContactPage;