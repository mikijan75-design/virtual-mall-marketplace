export interface Store {
  id: string;
  name: string;
  floor: number;
  position: number;
  category: string;
  signColor: string;
  logoEmoji: string;
  description: string;
}

export interface Floor {
  id: number;
  name: string;
  stores: Store[];
}

export const mallFloors: Floor[] = [
  {
    id: 1,
    name: "קומה 1 - קומת כניסה",
    stores: [
      { id: "s13", name: "מסעדה איטלקית", floor: 1, position: 1, category: "מזון", signColor: "from-red-500 to-orange-600", logoEmoji: "🍕", description: "פסטה ופיצה אותנטית" },
      { id: "s14", name: "קפה בוטיק", floor: 1, position: 2, category: "מזון", signColor: "from-amber-700 to-yellow-800", logoEmoji: "☕", description: "קפה ומאפים" },
      { id: "s15", name: "סושי בר", floor: 1, position: 3, category: "מזון", signColor: "from-red-400 to-pink-500", logoEmoji: "🍣", description: "סושי טרי יומיומי" },
      { id: "s16", name: "גלידריה", floor: 1, position: 4, category: "מזון", signColor: "from-pink-300 to-blue-400", logoEmoji: "🍦", description: "גלידה ארטיזנלית" },
      { id: "s17", name: "מאפיית שמרים", floor: 1, position: 5, category: "מזון", signColor: "from-yellow-600 to-amber-700", logoEmoji: "🥐", description: "מאפים טריים" },
      { id: "s18", name: "בר מיצים", floor: 1, position: 6, category: "מזון", signColor: "from-green-400 to-lime-500", logoEmoji: "🥤", description: "מיצים טבעיים" },
    ],
  },
  {
    id: 2,
    name: "קומה 2 - קומת פנאי",
    stores: [
      { id: "s7", name: "ספורט עיוותי", floor: 2, position: 1, category: "ספורט", signColor: "from-red-400 to-rose-600", logoEmoji: "🏋️", description: "חנות ספורט אקסטרים" },
      { id: "s8", name: "אמבטיות מתקדמות", floor: 2, position: 2, category: "בית", signColor: "from-sky-400 to-indigo-600", logoEmoji: "🛁", description: "עיצוב חדרי אמבטיה" },
      { id: "s9", name: "בנק", floor: 2, position: 3, category: "שירותים", signColor: "from-slate-400 to-gray-600", logoEmoji: "🏦", description: "שירותים בנקאיים" },
      { id: "s10", name: "קוסמטיקה טבעית", floor: 2, position: 4, category: "קוסמטיקה", signColor: "from-fuchsia-400 to-purple-600", logoEmoji: "💄", description: "מוצרי יופי וטיפוח" },
      { id: "s11", name: "סמארט ואתגר", floor: 2, position: 5, category: "טכנולוגיה", signColor: "from-violet-400 to-purple-600", logoEmoji: "📱", description: "סמארטפונים ואביזרים" },
      { id: "s12", name: "גלריה לאמנות", floor: 2, position: 6, category: "אמנות", signColor: "from-yellow-400 to-amber-600", logoEmoji: "🎭", description: "אמנות ותרבות" },
    ],
  },
  {
    id: 3,
    name: "קומה 3 - קומת עיצוב",
    stores: [
      { id: "s1", name: "אופנה עילית", floor: 3, position: 1, category: "אופנה", signColor: "from-pink-500 to-purple-600", logoEmoji: "👗", description: "בוטיק אופנה יוקרתי" },
      { id: "s2", name: "טכנולוגיה מתקדמת", floor: 3, position: 2, category: "טכנולוגיה", signColor: "from-cyan-400 to-blue-600", logoEmoji: "💻", description: "גאדג'טים וטכנולוגיה" },
      { id: "s3", name: "חנות עיצוב", floor: 3, position: 3, category: "עיצוב", signColor: "from-emerald-400 to-teal-600", logoEmoji: "🎨", description: "עיצוב פנים ואקססוריז" },
      { id: "s4", name: "קוסמטיקה טבעית", floor: 3, position: 4, category: "קוסמטיקה", signColor: "from-rose-400 to-pink-600", logoEmoji: "🌸", description: "מוצרי טיפוח טבעיים" },
      { id: "s5", name: "גלריה לאמנות", floor: 3, position: 5, category: "אמנות", signColor: "from-amber-400 to-orange-600", logoEmoji: "🖼️", description: "גלריה ותערוכות" },
      { id: "s6", name: "ספורט ואתגר", floor: 3, position: 6, category: "ספורט", signColor: "from-lime-400 to-green-600", logoEmoji: "⚽", description: "ציוד ספורט מקצועי" },
    ],
  },
];
