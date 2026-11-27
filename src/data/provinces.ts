import { IslandKey, IslandRegionMeta, Province } from "@/types/culture";
import { INDONESIA_GEO_38 } from "./indonesiaGeo38";
import { SUMATRA_PROVINCES } from "./regions/sumatra";
import { JAVA_PROVINCES } from "./regions/jawa";
import { BALI_NUSA_PROVINCES } from "./regions/baliNusa";
import { KALIMANTAN_PROVINCES } from "./regions/kalimantan";
import { SULAWESI_PROVINCES } from "./regions/sulawesi";
import { MALUKU_PAPUA_PROVINCES } from "./regions/malukuPapua";

const RAW_PROVINCES: Province[] = [
  ...SUMATRA_PROVINCES,
  ...JAVA_PROVINCES,
  ...BALI_NUSA_PROVINCES,
  ...KALIMANTAN_PROVINCES,
  ...SULAWESI_PROVINCES,
  ...MALUKU_PAPUA_PROVINCES,
];

/** Hydrate every province with its real Indonesia 38-province GeoJSON polygons & centroid */
export const ALL_PROVINCES: Province[] = RAW_PROVINCES.map((p) => {
  const geo = INDONESIA_GEO_38[p.slug];
  if (!geo) return p;
  const [cx, cz] = geo.center;
  return {
    ...p,
    center3D: [cx, cz],
    polygons3D: geo.polygons,
    polygon2D: geo.polygons[0],
    cameraOffset: [cx, 3.8, cz + 4.4],
  };
});

export const TOTAL_INDONESIA_PROVINCES = ALL_PROVINCES.length; // 38

export const ISLAND_REGIONS: IslandRegionMeta[] = [
  {
    key: "sumatra",
    name: { id: "Sumatra", en: "Sumatra" },
    subtitle: {
      id: "10 Provinsi · Andalas, Rumah Gadang, Songket & Danau Toba",
      en: "10 Provinces · Rumah Gadang, Songket & Lake Toba",
    },
    accent: "#2F6652",
    cameraPos: [-11.5, 9.8, 7.5],
    cameraTarget: [-11.2, 0.2, -1.2],
  },
  {
    key: "jawa",
    name: { id: "Jawa", en: "Java" },
    subtitle: {
      id: "6 Provinsi · Borobudur, Angklung, Joglo, Keraton & Reog",
      en: "6 Provinces · Borobudur, Angklung, Joglo & Reog",
    },
    accent: "#C4532D",
    cameraPos: [-5.2, 5.8, 9.2],
    cameraTarget: [-5.2, 0.2, 3.3],
  },
  {
    key: "bali-nusa",
    name: { id: "Bali & Nusa Tenggara", en: "Bali & Nusa Tenggara" },
    subtitle: {
      id: "3 Provinsi · Subak Bali, Bale Lumbung, Mbaru Niang & Sasando",
      en: "3 Provinces · Balinese Subak, Mbaru Niang & Sasando",
    },
    accent: "#C0562B",
    cameraPos: [1.2, 6.2, 10.6],
    cameraTarget: [1.2, 0.2, 4.4],
  },
  {
    key: "kalimantan",
    name: { id: "Kalimantan", en: "Kalimantan" },
    subtitle: {
      id: "5 Provinsi · Rumah Panjang Betang, Sape', Pasar Terapung & Kutai",
      en: "5 Provinces · Betang Longhouses, Sape' & Floating Markets",
    },
    accent: "#2C6B5B",
    cameraPos: [-2.2, 8.2, 6.4],
    cameraTarget: [-2.2, 0.2, -1.5],
  },
  {
    key: "sulawesi",
    name: { id: "Sulawesi", en: "Sulawesi" },
    subtitle: {
      id: "6 Provinsi · Tongkonan Toraja, Pinisi, Kolintang & Wakatobi",
      en: "6 Provinces · Toraja Tongkonan, Pinisi & Kolintang",
    },
    accent: "#9A3B2E",
    cameraPos: [2.4, 7.8, 6.8],
    cameraTarget: [2.4, 0.2, -0.4],
  },
  {
    key: "maluku",
    name: { id: "Maluku", en: "Maluku" },
    subtitle: {
      id: "2 Provinsi · Kepulauan Rempah, Baileo, Tifa & Pela Gandong",
      en: "2 Provinces · Spice Islands, Baileo & Pela Gandong",
    },
    accent: "#2B6A7A",
    cameraPos: [7.2, 7.0, 6.8],
    cameraTarget: [7.2, 0.2, 0.4],
  },
  {
    key: "papua",
    name: { id: "Papua", en: "Papua" },
    subtitle: {
      id: "6 Provinsi · Raja Ampat, Honai Lembah Baliem, Noken & Asmat",
      en: "6 Provinces · Raja Ampat, Baliem Honai, Noken & Asmat",
    },
    accent: "#2D6A4F",
    cameraPos: [12.8, 8.6, 8.6],
    cameraTarget: [12.8, 0.2, 1.2],
  },
];

export function getProvinceBySlug(slug: string): Province | undefined {
  return ALL_PROVINCES.find((p) => p.slug === slug);
}

export function getProvincesByIsland(island: IslandKey): Province[] {
  return ALL_PROVINCES.filter((p) => p.island === island);
}

/** Deterministic daily cultural spotlight across all 38 provinces */
export function getCultureOfTheDay() {
  const allItems = ALL_PROVINCES.flatMap((province) =>
    province.items.map((item) => ({ item, province }))
  );
  const now = new Date();
  const dayIndex =
    (now.getFullYear() * 366 + now.getMonth() * 31 + now.getDate()) %
    allItems.length;
  return allItems[dayIndex];
}
