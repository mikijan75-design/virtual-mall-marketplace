/** Design tokens for GuyJanaBannerDesign (sampled from guy-jana-banner.png). */
export const GUY_JANA_BANNER_DESIGN = {
  colors: {
    background: "#EDEEE6",
    backgroundDeep: "#CDCBC3",
    text: "#1F1E1B",
    ceramic: "#B4B0A4",
    ceramicShadow: "#6D7074",
    blueAccent: "#607487",
    highlight: "#F0F0F0",
  },
  header: {
    nameEn: "GUY JANA //",
    nameHe: "גיא ג'אנה",
    subtitle: "אמן קרמיקה, קדר ומרצה",
  },
  sections: [
    { id: "studio", title: "סטודיו וייצור גלובלי" },
    { id: "about", title: "אודות האמן" },
    { id: "forum", title: "פורום שאלות וקשר ישיר" },
    { id: "workshops", title: "לימוד וסדנאות קדרות" },
  ],
} as const;
