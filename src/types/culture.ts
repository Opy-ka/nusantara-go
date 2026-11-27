export type Locale = "id" | "en";

export interface LocalizedText {
  id: string;
  en: string;
}

export type CategoryKey =
  | "rumah-adat"
  | "tarian"
  | "pakaian"
  | "kuliner"
  | "alat-musik"
  | "bahasa"
  | "senjata"
  | "upacara"
  | "wisata";

export type IslandKey =
  | "sumatra"
  | "jawa"
  | "bali-nusa"
  | "kalimantan"
  | "sulawesi"
  | "maluku"
  | "papua";

export type LandmarkType =
  | "gadang"
  | "bolon"
  | "limas"
  | "baduy"
  | "monas"
  | "angklung"
  | "borobudur"
  | "tugu"
  | "reog"
  | "pura"
  | "mbaru"
  | "betang"
  | "tongkonan"
  | "baileo"
  | "honai";

export interface Hotspot3D {
  id: string;
  position: [number, number, number];
  title: LocalizedText;
  description: LocalizedText;
}

export interface CultureItem {
  id: string;
  category: CategoryKey;
  name: LocalizedText;
  summary: LocalizedText;
  funFact: LocalizedText;
  source: string;
  license: string;
  location?: string;
}

export interface QuizQuestion {
  id: string;
  type: "multiple-choice" | "sound-guess" | "visual-3d" | "match";
  question: LocalizedText;
  hint?: LocalizedText;
  options: LocalizedText[];
  correctIndex: number;
  explanation: LocalizedText;
}

export interface Province {
  slug: string;
  code: string;
  name: LocalizedText;
  capital: string;
  island: IslandKey;
  islandLabel: LocalizedText;
  status: "available";
  greeting: {
    phrase: string;
    meaning: LocalizedText;
    language: string;
  };
  tagline: LocalizedText;
  description: LocalizedText;
  themeColor: string;
  accentColor: string;
  landmarkType: LandmarkType;
  landmarkName: LocalizedText;
  /** Non-overlapping 2D polygon vertices in diorama space [x, z] */
  polygon2D: [number, number][];
  /** Real multi-island polygons projected from Indonesia 38-province GeoJSON */
  polygons3D?: [number, number][][];
  /** Center position in 3D diorama space [x, z] */
  center3D: [number, number];
  /** Camera position when flying to this province */
  cameraOffset: [number, number, number];
  houseHotspots: Hotspot3D[];
  items: CultureItem[];
  quiz: QuizQuestion[];
}

export interface IslandRegionMeta {
  key: IslandKey;
  name: LocalizedText;
  subtitle: LocalizedText;
  accent: string;
  cameraPos: [number, number, number];
  cameraTarget: [number, number, number];
}

export interface FestivalEvent {
  id: string;
  name: LocalizedText;
  provinceSlug: string;
  island: IslandKey;
  month: LocalizedText;
  isApproximate: boolean;
  description: LocalizedText;
  source: string;
}
