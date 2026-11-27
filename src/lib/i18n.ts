import { CategoryKey, Locale } from "@/types/culture";

export const CATEGORY_LABELS: Record<CategoryKey, { id: string; en: string }> = {
  "rumah-adat": { id: "Rumah Adat", en: "Traditional House" },
  tarian: { id: "Tarian", en: "Dance" },
  pakaian: { id: "Pakaian Adat", en: "Traditional Attire" },
  kuliner: { id: "Kuliner", en: "Culinary" },
  "alat-musik": { id: "Alat Musik", en: "Musical Instrument" },
  bahasa: { id: "Bahasa Daerah", en: "Regional Language" },
  senjata: { id: "Senjata Tradisional", en: "Traditional Weapon" },
  upacara: { id: "Upacara & Tradisi", en: "Ceremony & Tradition" },
  wisata: { id: "Wisata Budaya", en: "Cultural Destination" },
};

export const UI_COPY = {
  brandSub: {
    id: "Atlas Budaya 3D Indonesia · 38 Provinsi",
    en: "Interactive 3D Cultural Atlas · All 38 Provinces",
  },
  heroEyebrow: {
    id: "Edisi Lengkap · 38 Provinsi dari Sabang sampai Merauke",
    en: "Complete Edition · All 38 Provinces of Indonesia",
  },
  heroTitle: {
    id: "Jelajahi 38 provinsi Nusantara dalam diorama 3D.",
    en: "Explore all 38 Indonesian provinces in a living 3D diorama.",
  },
  heroSubtitle: {
    id: "Pilih gugus pulau, klik provinsi mana saja, putar rumah adat 3D, dan kumpulkan 38 stempel di Paspor Budaya.",
    en: "Jump between island regions, inspect 3D traditional architecture, play pentatonic cues, and collect all 38 passport stamps.",
  },
  ctaSurprise: {
    id: "Kejutkan aku",
    en: "Surprise me",
  },
  ctaPassport: {
    id: "Paspor Budaya",
    en: "Cultural Passport",
  },
  searchPlaceholder: {
    id: "Cari 38 provinsi, rendang, tongkonan, honai, angklung...",
    en: "Search 38 provinces, rendang, tongkonan, honai, angklung...",
  },
  mode3D: { id: "Peta 3D", en: "3D Map" },
  mode2D: { id: "Peta 2D", en: "2D Map" },
  dayMode: { id: "Siang", en: "Day" },
  nightMode: { id: "Malam", en: "Night" },
  openProvince: { id: "Buka halaman provinsi", en: "Open province page" },
  takeQuiz: { id: "Ikuti kuis stempel", en: "Take stamp quiz" },
  stampEarned: { id: "Stempel terkumpul", en: "Stamp collected" },
  resetCamera: { id: "Seluruh Nusantara", en: "Full Archipelago" },
  cultureOfDay: { id: "Sorotan Budaya Hari Ini", en: "Culture of the Day" },
  festivalCalendar: { id: "Kalender Festival Nusantara", en: "Archipelago Festival Calendar" },
  approxDate: { id: "Tanggal perkiraan", en: "Approximate date" },
  allCategories: { id: "Semua kategori", en: "All categories" },
  backToMap: { id: "Kembali ke peta 3D", en: "Back to 3D map" },
  houseViewerTitle: {
    id: "Diorama Arsitektur 3D Interaktif",
    en: "Interactive 3D Architecture Diorama",
  },
  houseViewerHint: {
    id: "Seret untuk memutar · Klik titik emas untuk detail arsitektur",
    en: "Drag to orbit · Click gold pins for architectural notes",
  },
  noAccountsNote: {
    id: "Progres 38 stempel disimpan lokal di browser tanpa akun. Gunakan kode cadangan untuk memindahkan paspor.",
    en: "Your 38-stamp progress saves locally with no account required. Use a backup code to transfer anytime.",
  },
} as const;

export function t(obj: { id: string; en: string }, locale: Locale): string {
  return obj[locale];
}
