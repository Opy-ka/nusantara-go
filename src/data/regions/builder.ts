import {
  CultureItem,
  Hotspot3D,
  IslandKey,
  LandmarkType,
  LocalizedText,
  Province,
  QuizQuestion,
} from "@/types/culture";

/**
 * Helper to create a clean hexagonal/organic non-overlapping diorama tile
 * centered at [cx, cz] with given [rx, rz] radii and slight rotation so
 * zero polygons overlap or Z-fight across all 38 provinces.
 */
export function makeTilePolygon(
  cx: number,
  cz: number,
  rx: number,
  rz: number,
  tilt = 0
): [number, number][] {
  const pts: [number, number][] = [];
  const sides = 7;
  for (let i = 0; i < sides; i++) {
    const angle = (i / sides) * Math.PI * 2 + tilt;
    const jitter = i % 2 === 0 ? 1.0 : 0.88;
    const x = +(cx + Math.cos(angle) * rx * jitter).toFixed(2);
    const z = +(cz + Math.sin(angle) * rz * jitter).toFixed(2);
    pts.push([x, z]);
  }
  return pts;
}

export interface CompactProvinceSeed {
  slug: string;
  code: string;
  name: LocalizedText;
  capital: string;
  island: IslandKey;
  islandLabel: LocalizedText;
  greetingPhrase: string;
  greetingMeaning: LocalizedText;
  greetingLang: string;
  tagline: LocalizedText;
  description: LocalizedText;
  themeColor: string;
  landmarkType: LandmarkType;
  landmarkName: LocalizedText;
  center3D: [number, number];
  tileRadius?: [number, number];
  tileTilt?: number;
  house: [string, string, string, string]; // [nameId, nameEn, summaryId, summaryEn]
  dance: [string, string, string, string];
  attire: [string, string, string, string];
  food: [string, string, string, string];
  music: [string, string, string, string];
  language: [string, string, string, string];
  weapon: [string, string, string, string];
  ceremony: [string, string, string, string];
  destination: [string, string, string, string, string]; // + location
  sourceOrg: string;
}

const ARCHETYPE_HOTSPOTS: Record<LandmarkType, Hotspot3D[]> = {
  gadang: [
    {
      id: "gonjong",
      position: [0, 1.8, 0],
      title: { id: "Atap Gonjong Melengkung", en: "Curved Gonjong Roof" },
      description: {
        id: "Puncak atap melengkung tajam menyerupai tanduk kerbau dari ijuk atau seng berukir, tahan curah hujan tinggi Pegunungan Bukit Barisan.",
        en: "Soaring horn-shaped roof spires symbolizing buffalo horns, engineered to shed heavy Bukit Barisan highland rainfall.",
      },
    },
    {
      id: "ukiran-minang",
      position: [0.85, 0.82, 0.65],
      title: { id: "Dinding Ukiran Alam Takambang", en: "Carved Timber Facade" },
      description: {
        id: "Motif ukiran tumbuhan dan geometri penuh filosofi adat Minangkabau yang diukir pada papan kayu.",
        en: "Botanical and geometric wood carvings embodying Minangkabau ecological philosophy.",
      },
    },
  ],
  bolon: [
    {
      id: "atap-pelana",
      position: [0, 1.75, 0],
      title: { id: "Atap Pelana Melengkung", en: "Sweeping Saddle Roof" },
      description: {
        id: "Atap menjulang tajam di depan dan belakang dari ijuk tebal untuk meredam panas sekaligus menghalau angin danau.",
        en: "Steeply pitched saddle-back palm-fiber roof that insulates against highland chill and lake winds.",
      },
    },
    {
      id: "panggung-kayu",
      position: [0.8, 0.35, 0.7],
      title: { id: "Struktur Panggung Pasak", en: "Pegged Stilt Structure" },
      description: {
        id: "Dibangun dari balok kayu keras yang disambung pasak tanpa paku sehingga tangguh menghadapi guncangan gempa.",
        en: "Hardwood timber joinery fastened with wooden pegs for natural earthquake flexibility.",
      },
    },
  ],
  limas: [
    {
      id: "bertingkat",
      position: [0, 1.55, 0],
      title: { id: "Atap Limas & Ornamen Simbar", en: "Tiered Limas Roof" },
      description: {
        id: "Atap berbentuk limas dengan lantai bertingkat (kekijing) yang mencerminkan tata krama dan kehormatan tamu.",
        en: "Pyramidal roof paired with stepped floor levels reflecting traditional hospitality etiquette.",
      },
    },
    {
      id: "tiang-sungai",
      position: [0.75, 0.3, 0.65],
      title: { id: "Tiang Panggung Pesisir", en: "Riverfront Stilt Pilings" },
      description: {
        id: "Tiang kayu ulin atau tembesu yang tahan air melindungi hunian dari pasang surut sungai dan rawa pesisir.",
        en: "Water-resistant ironwood pilings elevate the home above tidal rivers and coastal wetlands.",
      },
    },
  ],
  pura: [
    {
      id: "candi-bentar",
      position: [0, 1.55, 0],
      title: { id: "Gerbang Candi Bentar / Meru", en: "Candi Bentar / Meru Spire" },
      description: {
        id: "Struktur simetris bertingkat yang melambangkan keharmonisan Tri Hita Karana antara manusia, alam, dan Sang Pencipta.",
        en: "Symmetrical tiered architecture embodying cosmic harmony between people, nature, and the sacred.",
      },
    },
    {
      id: "bale-terbuka",
      position: [0.85, 0.55, 0.7],
      title: { id: "Bale Terbuka Tropis", en: "Open Tropical Pavilion" },
      description: {
        id: "Paviliun berukir batu paras dan kayu yang memaksimalkan angin sepoi-sepoi tropis.",
        en: "Carved sandstone and timber pavilion designed for natural cross-ventilation.",
      },
    },
  ],
  mbaru: [
    {
      id: "kerucut-ijuk",
      position: [0, 1.75, 0],
      title: { id: "Atap Kerucut Mbaru Niang", en: "Conical Mbaru Niang Roof" },
      description: {
        id: "Atap kerucut menjulang hingga lima lantai dari daun lontar dan ijuk yang menyatukan seluruh keluarga besar di bawah satu naungan.",
        en: "Towering five-story conical thatch roof uniting extended families beneath one protective shelter.",
      },
    },
    {
      id: "panggung-bulat",
      position: [0.85, 0.35, 0.55],
      title: { id: "Denah Melingkar Tahan Angin", en: "Wind-Resilient Circular Plan" },
      description: {
        id: "Bentuk melingkar aerodinamis meredam hembusan angin kencang pegunungan Flores dan savana Nusa Tenggara.",
        en: "Aerodynamic circular geometry deflects fierce highland and savanna winds.",
      },
    },
  ],
  betang: [
    {
      id: "rumah-panjang",
      position: [0, 1.25, 0],
      title: { id: "Ruang Komunal Rumah Panjang", en: "Communal Longhouse Hall" },
      description: {
        id: "Rumah panjang dari kayu ulin tahan ratusan tahun yang menampung puluhan keluarga dalam semangat gotong royong.",
        en: "Ironwood longhouse enduring for centuries, sheltering dozens of families in communal harmony.",
      },
    },
    {
      id: "tiang-ulin",
      position: [0.95, 0.3, 0.55],
      title: { id: "Tiang Kayu Ulin Tinggi", en: "Tall Ironwood Stilts" },
      description: {
        id: "Kolong tinggi 2–4 meter menjaga keamanan dari luapan sungai besar Kalimantan dan satwa hutan.",
        en: "High stilts elevate living quarters safely above Borneo's seasonal river floods.",
      },
    },
  ],
  tongkonan: [
    {
      id: "atap-perahu",
      position: [0, 1.8, 0],
      title: { id: "Atap Melengkung Bak Perahu", en: "Boat-Shaped Sweeping Roof" },
      description: {
        id: "Bentuk atap melengkung dramatis menyerupai haluan perahu leluhur pelaut Nusantara yang menatap utara.",
        en: "Dramatic upward-curving roof recalling the prows of ancestral Austronesian voyaging ships.",
      },
    },
    {
      id: "ukiran-paq",
      position: [0.8, 0.72, 0.65],
      title: { id: "Panel Ukiran Warna Alam", en: "Natural-Pigment Carved Panels" },
      description: {
        id: "Ukiran kayu berwarna merah, hitam, putih, dan kuning oker yang merekam sejarah keluarga dan alam.",
        en: "Timber panels carved and pigmented in red, black, white, and ochre recording lineage and cosmos.",
      },
    },
  ],
  baileo: [
    {
      id: "balai-terbuka",
      position: [0, 1.35, 0],
      title: { id: "Balai Adat Tanpa Dinding", en: "Wall-less Ceremonial Hall" },
      description: {
        id: "Rumah adat Maluku yang terbuka di semua sisi sebagai lambang keterbukaan musyawarah (pela gandong) dan persaudaraan.",
        en: "Open-sided Moluccan council hall symbolizing transparency, kinship, and brotherhood.",
      },
    },
    {
      id: "tiang-kayu",
      position: [0.85, 0.45, 0.65],
      title: { id: "Tiang Kayu Meranti & Gaba-gaba", en: "Meranti Timber & Sago Framing" },
      description: {
        id: "Rangka kayu kepulauan rempah yang kokoh dan sejuk untuk pertemuan adat masyarakat negeri.",
        en: "Sturdy Spice Islands timber framing crafted for village assemblies.",
      },
    },
  ],
  honai: [
    {
      id: "kubah-jerami",
      position: [0, 1.48, 0],
      title: { id: "Atap Kubah Jerami Hangat", en: "Insulated Thatch Dome" },
      description: {
        id: "Atap kubah tebal dari rumput alang-alang berlapis yang memerangkap kehangatan perapian di udara dingin pegunungan Papua.",
        en: "Thick layered grass dome trapping hearth warmth against crisp Papuan mountain nights.",
      },
    },
    {
      id: "dinding-kayu",
      position: [0.75, 0.55, 0.65],
      title: { id: "Dinding Papan Melingkar", en: "Circular Timber Wall" },
      description: {
        id: "Dinding papan kayu rapat tanpa jendela besar dengan satu pintu rendah untuk menjaga suhu ruangan tetap hangat.",
        en: "Tightly fitted circular wood walls with a low doorway engineered for thermal retention.",
      },
    },
  ],
  baduy: [],
  monas: [],
  angklung: [],
  borobudur: [],
  tugu: [],
  reog: [],
};

export function buildProvinceFromSeed(s: CompactProvinceSeed): Province {
  const [cx, cz] = s.center3D;
  const [rx, rz] = s.tileRadius ?? [0.78, 0.62];

  const items: CultureItem[] = [
    {
      id: `${s.slug}-rumah`,
      category: "rumah-adat",
      name: { id: s.house[0], en: s.house[1] },
      summary: { id: s.house[2], en: s.house[3] },
      funFact: {
        id: `Arsitektur ${s.house[0]} dirancang adaptif terhadap iklim dan kearifan lokal masyarakat ${s.name.id}.`,
        en: `${s.house[1]} architecture is finely adapted to the local climate and heritage of ${s.name.en}.`,
      },
      source: s.sourceOrg,
      license: "CC BY-SA 4.0 (Teks kurasi edukasi)",
    },
    {
      id: `${s.slug}-tari`,
      category: "tarian",
      name: { id: s.dance[0], en: s.dance[1] },
      summary: { id: s.dance[2], en: s.dance[3] },
      funFact: {
        id: `Tarian ini sering ditampilkan pada upacara penyambutan tamu kehormatan dan perayaan adat ${s.name.id}.`,
        en: `This dance is prominently staged during ceremonial welcomes and cultural celebrations in ${s.name.en}.`,
      },
      source: s.sourceOrg,
      license: "CC BY-SA 4.0",
    },
    {
      id: `${s.slug}-pakaian`,
      category: "pakaian",
      name: { id: s.attire[0], en: s.attire[1] },
      summary: { id: s.attire[2], en: s.attire[3] },
      funFact: {
        id: `Ornamen dan warna pada ${s.attire[0]} melambangkan kehormatan, doa, dan identitas sosial setempat.`,
        en: `The motifs and colors of ${s.attire[1]} symbolize dignity, blessings, and regional identity.`,
      },
      source: s.sourceOrg,
      license: "CC BY-SA 4.0",
    },
    {
      id: `${s.slug}-kuliner`,
      category: "kuliner",
      name: { id: s.food[0], en: s.food[1] },
      summary: { id: s.food[2], en: s.food[3] },
      funFact: {
        id: `Cita rasa khas ${s.food[0]} memanfaatkan rempah dan bahan segar pilihan khas wilayah ${s.islandLabel.id}.`,
        en: `${s.food[1]} showcases signature regional spices and fresh ingredients of ${s.islandLabel.en}.`,
      },
      source: "Kemdikbudristek · Warisan Budaya Takbenda",
      license: "CC BY-SA 4.0",
    },
    {
      id: `${s.slug}-musik`,
      category: "alat-musik",
      name: { id: s.music[0], en: s.music[1] },
      summary: { id: s.music[2], en: s.music[3] },
      funFact: {
        id: `${s.music[0]} berperan penting dalam mengiringi tarian adat dan penceritaan lisan di ${s.name.id}.`,
        en: `${s.music[1]} anchors traditional dance accompaniment and oral storytelling in ${s.name.en}.`,
      },
      source: "WBTb Indonesia",
      license: "CC BY-SA 4.0",
    },
    {
      id: `${s.slug}-bahasa`,
      category: "bahasa",
      name: { id: s.language[0], en: s.language[1] },
      summary: { id: s.language[2], en: s.language[3] },
      funFact: {
        id: `Sapaan khas "${s.greetingPhrase}" mencerminkan keramahan tutur masyarakat ${s.name.id}.`,
        en: `The warm greeting "${s.greetingPhrase}" reflects the hospitality of ${s.name.en}.`,
      },
      source: "Badan Pengembangan dan Pembinaan Bahasa",
      license: "CC BY-SA 4.0",
    },
    {
      id: `${s.slug}-senjata`,
      category: "senjata",
      name: { id: s.weapon[0], en: s.weapon[1] },
      summary: { id: s.weapon[2], en: s.weapon[3] },
      funFact: {
        id: `Kini ${s.weapon[0]} dihormati sebagai pusaka budaya dan kelengkapan busana adat resmi.`,
        en: `Today ${s.weapon[1]} is revered as a cultural heirloom and ceremonial regalia.`,
      },
      source: s.sourceOrg,
      license: "CC BY-SA 4.0",
    },
    {
      id: `${s.slug}-upacara`,
      category: "upacara",
      name: { id: s.ceremony[0], en: s.ceremony[1] },
      summary: { id: s.ceremony[2], en: s.ceremony[3] },
      funFact: {
        id: `Tradisi ${s.ceremony[0]} mempererat ikatan sosial sekaligus rasa syukur masyarakat ${s.name.id}.`,
        en: `${s.ceremony[1]} strengthens communal bonds and gratitude across ${s.name.en}.`,
      },
      source: s.sourceOrg,
      license: "CC BY-SA 4.0",
    },
    {
      id: `${s.slug}-wisata`,
      category: "wisata",
      name: { id: s.destination[0], en: s.destination[1] },
      summary: { id: s.destination[2], en: s.destination[3] },
      funFact: {
        id: `Destinasi unggulan ini menjadi gerbang terbaik mengenal alam dan budaya ${s.name.id}.`,
        en: `This landmark destination offers an unforgettable gateway to ${s.name.en}'s heritage.`,
      },
      source: "Kemenparekraf · Wonderful Indonesia",
      license: "CC BY-SA 4.0",
      location: s.destination[4],
    },
  ];

  const quiz: QuizQuestion[] = [
    {
      id: `${s.slug}-q1`,
      type: "visual-3d",
      question: {
        id: `Rumah adat kebanggaan Provinsi ${s.name.id} adalah…`,
        en: `What is the signature traditional house of ${s.name.en}?`,
      },
      options: [
        { id: s.house[0], en: s.house[1] },
        { id: "Rumah Joglo", en: "Joglo House" },
        { id: "Rumah Kebaya", en: "Rumah Kebaya" },
        { id: "Rumah Sulah Nyanda", en: "Sulah Nyanda House" },
      ],
      correctIndex: 0,
      explanation: {
        id: `${s.house[0]} merupakan ikon arsitektur tradisional dari ${s.name.id}.`,
        en: `${s.house[1]} is the iconic traditional architecture of ${s.name.en}.`,
      },
    },
    {
      id: `${s.slug}-q2`,
      type: "multiple-choice",
      question: {
        id: `Kuliner khas yang terkenal dari ${s.name.id} adalah…`,
        en: `Which culinary dish is famously associated with ${s.name.en}?`,
      },
      options: [
        { id: "Gudeg Jogja", en: "Yogyakarta Gudeg" },
        { id: s.food[0], en: s.food[1] },
        { id: "Kerak Telor", en: "Kerak Telor" },
        { id: "Sate Bandeng", en: "Sate Bandeng" },
      ],
      correctIndex: 1,
      explanation: {
        id: `${s.food[0]} adalah salah satu sajian kuliner paling ikonik dari ${s.name.id}.`,
        en: `${s.food[1]} is among the most beloved traditional dishes of ${s.name.en}.`,
      },
    },
    {
      id: `${s.slug}-q3`,
      type: "sound-guess",
      question: {
        id: `Alat musik tradisional yang dikenal dari ${s.name.id} adalah…`,
        en: `Which traditional musical instrument hails from ${s.name.en}?`,
      },
      options: [
        { id: "Angklung Sunda", en: "Sundanese Angklung" },
        { id: "Gambang Kromong", en: "Gambang Kromong" },
        { id: s.music[0], en: s.music[1] },
        { id: "Dogdog Lojor", en: "Dogdog Lojor" },
      ],
      correctIndex: 2,
      explanation: {
        id: `${s.music[0]} memperkaya khazanah musik tradisional ${s.name.id}.`,
        en: `${s.music[1]} enriches the traditional soundscape of ${s.name.en}.`,
      },
    },
    {
      id: `${s.slug}-q4`,
      type: "multiple-choice",
      question: {
        id: `Ibu kota Provinsi ${s.name.id} berada di…`,
        en: `What is the capital city of ${s.name.en}?`,
      },
      options: [
        { id: s.capital, en: s.capital },
        { id: "Semarang", en: "Semarang" },
        { id: "Bandung", en: "Bandung" },
        { id: "Serang", en: "Serang" },
      ],
      correctIndex: 0,
      explanation: {
        id: `${s.capital} adalah pusat pemerintahan Provinsi ${s.name.id}.`,
        en: `${s.capital} serves as the provincial capital of ${s.name.en}.`,
      },
    },
    {
      id: `${s.slug}-q5`,
      type: "match",
      question: {
        id: `Tari tradisional khas yang berasal dari ${s.name.id} adalah…`,
        en: `Which traditional dance originates from ${s.name.en}?`,
      },
      options: [
        { id: "Tari Jaipong", en: "Jaipong Dance" },
        { id: "Tari Gambyong", en: "Gambyong Dance" },
        { id: "Tari Remo", en: "Remo Dance" },
        { id: s.dance[0], en: s.dance[1] },
      ],
      correctIndex: 3,
      explanation: {
        id: `${s.dance[0]} merupakan warisan seni tari kebanggaan masyarakat ${s.name.id}.`,
        en: `${s.dance[1]} is a treasured traditional dance of ${s.name.en}.`,
      },
    },
  ];

  return {
    slug: s.slug,
    code: s.code,
    name: s.name,
    capital: s.capital,
    island: s.island,
    islandLabel: s.islandLabel,
    status: "available",
    greeting: {
      phrase: s.greetingPhrase,
      meaning: s.greetingMeaning,
      language: s.greetingLang,
    },
    tagline: s.tagline,
    description: s.description,
    themeColor: s.themeColor,
    accentColor: "#D49B35",
    landmarkType: s.landmarkType,
    landmarkName: s.landmarkName,
    polygon2D: makeTilePolygon(cx, cz, rx, rz, s.tileTilt ?? 0.2),
    center3D: [cx, cz],
    cameraOffset: [cx, 3.6, cz + 4.2],
    houseHotspots: ARCHETYPE_HOTSPOTS[s.landmarkType] ?? [],
    items,
    quiz,
  };
}
