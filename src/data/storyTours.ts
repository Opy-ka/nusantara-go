import { LocalizedText } from "@/types/culture";

export interface StoryTourStop {
  provinceSlug: string;
  headline: LocalizedText;
  story: LocalizedText;
}

export interface StoryTour {
  id: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  color: string;
  stops: StoryTourStop[];
}

export const STORY_TOURS: StoryTour[] = [
  {
    id: "jalur-rempah",
    title: { id: "Jalur Rempah Nusantara", en: "Archipelago Spice Route" },
    subtitle: {
      id: "Menelusuri pelayaran cengkih dan pala yang menghubungkan timur hingga barat Indonesia.",
      en: "Trace the historic clove and nutmeg maritime network linking eastern and western Indonesia.",
    },
    color: "#F2BC52",
    stops: [
      {
        provinceSlug: "maluku-utara",
        headline: { id: "Ternate & Tidore · Asal Cengkih Dunia", en: "Ternate & Tidore · Birthplace of Cloves" },
        story: {
          id: "Dari lereng vulkanik Moloku Kie Raha inilah cengkih purba pertama kali dikenal dunia dan menarik pelaut lintas benua.",
          en: "From the volcanic slopes of Moloku Kie Raha, prized cloves first entered global maritime trade.",
        },
      },
      {
        provinceSlug: "maluku",
        headline: { id: "Kepulauan Banda · Pusat Pala", en: "Banda Islands · Heart of Nutmeg" },
        story: {
          id: "Pala Banda pernah bernilai lebih mahal dari emas, membentuk peradaban maritim Kepulauan Rempah dan semangat Pela Gandong.",
          en: "Banda nutmeg once rivaled gold in value, shaping the Spice Islands' resilient maritime culture.",
        },
      },
      {
        provinceSlug: "sulawesi-selatan",
        headline: { id: "Makassar · Dermaga Kapal Pinisi", en: "Makassar · Port of Pinisi Voyagers" },
        story: {
          id: "Pelaut Bugis-Makassar dengan kapal layar Pinisi menjadi penghubung utama distribusi rempah melintasi Nusantara.",
          en: "Bugis-Makassar navigators aboard Pinisi schooners linked spice ports across the entire archipelago.",
        },
      },
      {
        provinceSlug: "jawa-timur",
        headline: { id: "Pelabuhan Tuban & Majapahit", en: "Majapahit Maritime Hub" },
        story: {
          id: "Pesisir utara Jawa Timur menjadi pusat pertukaran beras, tembikar, dan rempah pada masa kejayaan Majapahit.",
          en: "East Java's northern ports thrived as Majapahit's bustling crossroads for rice, ceramics, and spices.",
        },
      },
      {
        provinceSlug: "banten",
        headline: { id: "Banten Lama · Bandar Lada Internasional", en: "Old Banten · Global Pepper Emporium" },
        story: {
          id: "Di gerbang Selat Sunda, Kesultanan Banten tumbuh sebagai bandar lada terbesar tempat pedagang Asia dan Eropa bertemu.",
          en: "At the Sunda Strait gateway, the Banten Sultanate flourished as a cosmopolitan pepper emporium.",
        },
      },
    ],
  },
  {
    id: "warisan-unesco",
    title: { id: "Jejak Warisan UNESCO", en: "UNESCO Heritage Trail" },
    subtitle: {
      id: "6 mahakarya budaya Indonesia yang diakui dunia dari Aceh hingga Papua.",
      en: "Six globally recognized Indonesian cultural treasures from Aceh to Papua.",
    },
    color: "#E06D44",
    stops: [
      {
        provinceSlug: "aceh",
        headline: { id: "Tari Saman · UNESCO 2011", en: "Saman Dance · UNESCO 2011" },
        story: {
          id: "Gerak tepuk tangan serempak dari dataran tinggi Gayo yang memancarkan kekompakan, persaudaraan, dan pesan moral.",
          en: "Synchronized Gayo highland percussion dance celebrating unity, discipline, and poetic wisdom.",
        },
      },
      {
        provinceSlug: "jawa-barat",
        headline: { id: "Angklung · UNESCO 2010", en: "Angklung · UNESCO 2010" },
        story: {
          id: "Karena satu angklung hanya membunyikan satu nada, melodi hanya lahir lewat kerja sama dan saling mendengarkan.",
          en: "With each bamboo tube tuned to one note, harmony emerges solely through collective teamwork.",
        },
      },
      {
        provinceSlug: "jawa-tengah",
        headline: { id: "Candi Borobudur · Warisan Dunia", en: "Borobudur Temple · World Heritage" },
        story: {
          id: "Monumen Buddha terbesar di dunia dari abad ke-9 yang seluruh balok batu andesitnya tersusun tanpa semen.",
          en: "The world's largest 9th-century Buddhist monument built from interlocking volcanic stone without mortar.",
        },
      },
      {
        provinceSlug: "di-yogyakarta",
        headline: { id: "Sumbu Filosofis Yogyakarta · UNESCO 2023", en: "Cosmological Axis · UNESCO 2023" },
        story: {
          id: "Garis lurus Merapi–Tugu–Keraton–Panggung Krapyak yang melambangkan perjalanan hidup manusia menuju keselarasan.",
          en: "The sacred alignment from Mount Merapi through the Royal Palace symbolizing the journey of human life.",
        },
      },
      {
        provinceSlug: "bali",
        headline: { id: "Sistem Irigasi Subak · UNESCO 2012", en: "Subak Irrigation · UNESCO 2012" },
        story: {
          id: "Sistem pengairan sawah demokratis berbasis Tri Hita Karana yang telah menghidupi Bali selama lebih dari seribu tahun.",
          en: "Cooperative temple-managed rice-terrace irrigation sustaining Bali for over a millennium.",
        },
      },
      {
        provinceSlug: "papua",
        headline: { id: "Tas Rajut Noken · UNESCO 2012", en: "Handwoven Noken · UNESCO 2012" },
        story: {
          id: "Tas serat kulit kayu yang dirajut tangan dan disandang di kepala sebagai simbol kehidupan, kedamaian, dan kemandirian Papua.",
          en: "Hand-knotted bark-fiber bag carried from the forehead, symbolizing life, peace, and Papuan ingenuity.",
        },
      },
    ],
  },
  {
    id: "arsitektur-ikonik",
    title: { id: "Arsitektur Ikonik Nusantara", en: "Iconic Vernacular Architecture" },
    subtitle: {
      id: "Kearifan rumah adat tahan gempa dan adaptif iklim di lima pulau besar Indonesia.",
      en: "Earthquake-resilient, climate-smart traditional homes across five major Indonesian islands.",
    },
    color: "#4DA882",
    stops: [
      {
        provinceSlug: "sumatera-barat",
        headline: { id: "Rumah Gadang · Atap Gonjong", en: "Rumah Gadang · Horned Spires" },
        story: {
          id: "Atap melengkung tajam menyerupai tanduk kerbau yang mengalirkan hujan lebat Bukit Barisan sekaligus meneduhkan keluarga besar.",
          en: "Sweeping buffalo-horn roof spires shedding heavy mountain rainfall over matrilineal family halls.",
        },
      },
      {
        provinceSlug: "kalimantan-barat",
        headline: { id: "Rumah Panjang Radakng / Betang", en: "Radakng / Betang Longhouse" },
        story: {
          id: "Hunian kayu ulin berkolong tinggi yang menaungi puluhan keluarga Dayak dalam semangat kesetaraan dan gotong royong.",
          en: "Elevated ironwood longhouses sheltering dozens of Dayak families under one communal roof.",
        },
      },
      {
        provinceSlug: "sulawesi-selatan",
        headline: { id: "Tongkonan Tana Toraja", en: "Tana Toraja Tongkonan" },
        story: {
          id: "Atap melengkung bak haluan perahu leluhur yang menghadap utara, penuh ukiran kayu berwarna alami merah, hitam, putih, dan kuning.",
          en: "Soaring boat-shaped roofs facing north, dressed in natural-pigment ancestral wood carvings.",
        },
      },
      {
        provinceSlug: "nusa-tenggara-timur",
        headline: { id: "Mbaru Niang Wae Rebo", en: "Wae Rebo Mbaru Niang" },
        story: {
          id: "Rumah kerucut lima lantai di atas awan Flores dengan bentuk melingkar aerodinamis penahan angin pegunungan.",
          en: "Five-story conical thatch houses nestled in Flores' cloud forests, shaped to deflect mountain winds.",
        },
      },
      {
        provinceSlug: "papua-pegunungan",
        headline: { id: "Honai Lembah Baliem", en: "Baliem Valley Honai" },
        story: {
          id: "Atap kubah jerami berlapis dan dinding kayu melingkar yang dirancang cerdas memerangkap hangat perapian di udara dingin Wamena.",
          en: "Layered grass domes and circular timber walls cleverly trapping hearth warmth in cool highlands.",
        },
      },
    ],
  },
];
