import { Province } from "@/types/culture";
import { makeTilePolygon } from "./builder";

export const JAVA_PROVINCES: Province[] = [
  {
    slug: "banten",
    code: "ID-BT",
    name: { id: "Banten", en: "Banten" },
    capital: "Serang",
    island: "jawa",
    islandLabel: { id: "Jawa", en: "Java" },
    status: "available",
    greeting: {
      phrase: "Wilujeng sumping!",
      meaning: { id: "Selamat datang di Tanah Jawara", en: "Welcome to the Land of Jawara" },
      language: "Sunda Banten / Jawa Serang",
    },
    tagline: {
      id: "Gerbang barat Jawa, rumah kearifan Baduy dan tradisi Rampak Bedug.",
      en: "Western gateway of Java, home to Baduy ecological wisdom and Rampak Bedug.",
    },
    description: {
      id: "Banten memadukan sejarah kesultanan maritim Nusantara di pesisir utara dengan kearifan adat masyarakat Baduy di pegunungan Kendeng yang hidup selaras dengan alam.",
      en: "Banten blends maritime sultanate history along the northern coast with the enduring ecological traditions of the Baduy people in the Kendeng highlands.",
    },
    themeColor: "#8C5A3C",
    accentColor: "#D49B35",
    landmarkType: "baduy",
    landmarkName: { id: "Rumah Sulah Nyanda (Baduy)", en: "Sulah Nyanda House (Baduy)" },
    center3D: [-5.5, 2.2],
    cameraOffset: [-5.5, 3.6, 6.2],
    polygon2D: makeTilePolygon(-5.5, 2.2, 0.78, 0.58, 0.15),
    houseHotspots: [
      {
        id: "atap-ijuk",
        position: [0, 1.45, 0.2],
        title: { id: "Atap Sulah Nyanda", en: "Sulah Nyanda Roof" },
        description: {
          id: "Atap asimetris dari daun kirai dan ijuk yang melandai di bagian belakang, melambangkan sikap rendah hati dan menyatu dengan kontur tanah.",
          en: "Asymmetrical palm-thatch roof sloping gently at the rear, symbolizing humility and harmony with hillside terrain.",
        },
      },
      {
        id: "tiang-batu",
        position: [0.85, 0.28, 0.65],
        title: { id: "Umpak Batu Alam", en: "Natural Stone Footings" },
        description: {
          id: "Tiang rumah tidak ditanam ke tanah dan tanpa paku besi, melainkan bertumpu pada batu kali agar tahan gempa dan tidak merusak kontur bumi.",
          en: "Timber stilts rest on river stones without iron nails or excavation, providing natural earthquake resilience.",
        },
      },
      {
        id: "bilik-bambu",
        position: [-0.85, 0.78, 0.3],
        title: { id: "Dinding Anyaman Bambu", en: "Woven Bamboo Walls" },
        description: {
          id: "Anyaman bambu (bilik) menjaga sirkulasi udara pegunungan tetap sejuk tanpa perlu jendela kaca.",
          en: "Breathable woven bamboo panels naturally ventilate the highland interior.",
        },
      },
    ],
    items: [
      {
        id: "banten-rumah",
        category: "rumah-adat",
        name: { id: "Rumah Sulah Nyanda", en: "Sulah Nyanda House" },
        summary: {
          id: "Rumah panggung tradisional suku Baduy yang dibangun gotong royong dari bambu, kayu, dan daun kirai tanpa satu pun paku logam.",
          en: "Traditional Baduy stilt house crafted communally from bamboo, timber, and palm leaves without a single iron nail.",
        },
        funFact: {
          id: "Setiap rumah menghadap utara atau selatan mengikuti adat pikukuh karuhun.",
          en: "Every house faces strictly north or south following ancestral pikukuh law.",
        },
        source: "Kemdikbudristek · Warisan Budaya Takbenda",
        license: "CC BY-SA 4.0",
      },
      {
        id: "banten-tari",
        category: "tarian",
        name: { id: "Tari Rampak Bedug", en: "Rampak Bedug Dance" },
        summary: {
          id: "Pertunjukan tari dan tabuhan bedug serempak khas Pandeglang yang memadukan ritme perkusi energik dan gerak silat.",
          en: "Synchronized drum-and-dance performance from Pandeglang combining driving percussion with martial-arts choreography.",
        },
        funFact: {
          id: "Berawal dari tradisi menyemarakkan bulan Ramadan dan menyambut Hari Raya.",
          en: "Originated as a communal celebration welcoming Ramadan and Eid.",
        },
        source: "Disdikbud Banten",
        license: "CC BY-SA 4.0",
      },
      {
        id: "banten-pakaian",
        category: "pakaian",
        name: { id: "Pakaian Pangsi & Jamang Sangsang", en: "Pangsi & Jamang Sangsang" },
        summary: {
          id: "Busana tradisional masyarakat Baduy berwarna putih polos (Baduy Dalam) atau hitam nila (Baduy Luar) dengan ikat kepala tenun.",
          en: "Traditional Baduy attire in natural white (Inner Baduy) or indigo-black (Outer Baduy) paired with handwoven headbands.",
        },
        funFact: {
          id: "Kain ditenun tangan sendiri menggunakan pewarna alami dari tumbuhan hutan.",
          en: "Cloth is hand-loomed using natural botanical dyes from the forest.",
        },
        source: "Museum Negeri Banten",
        license: "CC BY-SA 4.0",
      },
      {
        id: "banten-kuliner",
        category: "kuliner",
        name: { id: "Sate Bandeng", en: "Sate Bandeng (Milkfish Satay)" },
        summary: {
          id: "Ikan bandeng tanpa duri yang dagingnya dihaluskan dengan santan dan rempah, dimasukkan kembali ke kulitnya lalu dibakar di atas bara.",
          en: "Deboned milkfish minced with coconut milk and spices, stuffed back into its skin, and grilled over charcoal.",
        },
        funFact: {
          id: "Konon diciptakan juru masak Kesultanan Banten agar Sultan bisa menyantap bandeng tanpa khawatir duri halus.",
          en: "Created by Banten Sultanate cooks so royalty could enjoy milkfish without tiny bones.",
        },
        source: "Indonesiana · Kemdikbud",
        license: "CC BY-SA 4.0",
      },
      {
        id: "banten-musik",
        category: "alat-musik",
        name: { id: "Dogdog Lojor", en: "Dogdog Lojor" },
        summary: {
          id: "Alat musik perkusi berbentuk silinder kayu panjang dengan membran kulit kambing yang dimainkan bersama angklung buhun.",
          en: "Elongated wooden cylindrical drum with goat-skin head played alongside ancient angklung buhun ensembles.",
        },
        funFact: {
          id: "Nama 'lojor' berarti panjang dalam bahasa Sunda, merujuk pada panjang tabungnya yang hampir satu meter.",
          en: "'Lojor' means long in Sundanese, referring to its nearly one-meter wooden body.",
        },
        source: "WBTb Indonesia",
        license: "CC BY-SA 4.0",
      },
      {
        id: "banten-bahasa",
        category: "bahasa",
        name: { id: "Bahasa Sunda Banten & Jawa Serang", en: "Banten Sundanese & Serang Javanese" },
        summary: {
          id: "Banten unik karena dituturkan dalam dua rumpun utama: Sunda Banten di selatan dan Jawa Serang (Jaseng) di utara.",
          en: "Banten uniquely spans two major regional tongues: Banten Sundanese in the south and Serang Javanese in the north.",
        },
        funFact: {
          id: "Bahasa Sunda Banten mempertahankan banyak kosakata kuno tanpa tingkatan undak-usuk seketat Priangan.",
          en: "Banten Sundanese preserves archaic vocabulary with egalitarian speech registers.",
        },
        source: "Badan Bahasa Kemdikbud",
        license: "CC BY-SA 4.0",
      },
      {
        id: "banten-senjata",
        category: "senjata",
        name: { id: "Golok Ciomas", en: "Golok Ciomas" },
        summary: {
          id: "Golok pusaka legendaris dari Kecamatan Ciomas, Serang, yang ditempa dengan teknik pandai besi turun-temurun.",
          en: "Legendary heirloom machete from Ciomas, Serang, forged through centuries-old blacksmithing rituals.",
        },
        funFact: {
          id: "Penempaan tradisionalnya hanya dilakukan pada bulan Maulid menggunakan palu pusaka Si Denok.",
          en: "Traditional forging takes place only during the month of Maulid using an heirloom hammer.",
        },
        source: "Kemdikbudristek",
        license: "CC BY-SA 4.0",
      },
      {
        id: "banten-upacara",
        category: "upacara",
        name: { id: "Seba Baduy", en: "Seba Baduy" },
        summary: {
          id: "Tradisi tahunan ribuan warga Baduy berjalan kaki membawa hasil bumi menuju pusat pemerintahan untuk menyampaikan pesan pelestarian alam.",
          en: "Annual pilgrimage of Baduy elders walking to regional halls with harvest gifts to reaffirm ecological guardianship.",
        },
        funFact: {
          id: "Warga Baduy Dalam menempuh perjalanan puluhan kilometer tanpa alas kaki dan tanpa kendaraan bermotor.",
          en: "Inner Baduy participants walk dozens of kilometers barefoot without motorized transport.",
        },
        source: "Dinas Pariwisata Banten",
        license: "CC BY-SA 4.0",
      },
      {
        id: "banten-wisata",
        category: "wisata",
        name: { id: "Desa Adat Baduy & Banten Lama", en: "Baduy Village & Old Banten" },
        summary: {
          id: "Kompleks situs Kesultanan Banten serta kawasan adat Baduy di Kabupaten Lebak.",
          en: "Historic Banten Sultanate ruins alongside the living Baduy heritage highlands.",
        },
        funFact: {
          id: "Menara Masjid Agung Banten dirancang bergaya mercusuar segi delapan pada abad ke-16.",
          en: "The Great Mosque's octagonal lighthouse-like minaret dates back to the 16th century.",
        },
        source: "BPCB Banten",
        license: "CC BY-SA 4.0",
        location: "Serang & Lebak, Banten",
      },
    ],
    quiz: [
      {
        id: "bt-q1",
        type: "visual-3d",
        question: {
          id: "Rumah adat Baduy di Banten yang dibangun tanpa paku besi dan bertumpu pada batu kali disebut…",
          en: "What is the nail-free Baduy stilt house resting on river stones in Banten called?",
        },
        options: [
          { id: "Sulah Nyanda", en: "Sulah Nyanda" },
          { id: "Joglo Sinom", en: "Joglo Sinom" },
          { id: "Rumah Kebaya", en: "Rumah Kebaya" },
          { id: "Limasan", en: "Limasan" },
        ],
        correctIndex: 0,
        explanation: {
          id: "Sulah Nyanda adalah rumah adat masyarakat Baduy yang menyatu dengan kontur perbukitan tanpa merusak tanah.",
          en: "Sulah Nyanda is the traditional Baduy house built to harmonize with hillside contours without excavation.",
        },
      },
      {
        id: "bt-q2",
        type: "multiple-choice",
        question: {
          id: "Kuliner ikonik Banten yang mengolah ikan bandeng tanpa duri lalu dibakar bersama santan rempah adalah…",
          en: "Which iconic Banten dish features deboned milkfish seasoned with coconut milk and grilled?",
        },
        options: [
          { id: "Kerak Telor", en: "Kerak Telor" },
          { id: "Sate Bandeng", en: "Sate Bandeng" },
          { id: "Rawon", en: "Rawon" },
          { id: "Lumpia", en: "Lumpia" },
        ],
        correctIndex: 1,
        explanation: {
          id: "Sate Bandeng lahir dari dapur Kesultanan Banten sejak abad ke-16.",
          en: "Sate Bandeng originated in the kitchens of the Banten Sultanate in the 16th century.",
        },
      },
      {
        id: "bt-q3",
        type: "sound-guess",
        question: {
          id: "Alat musik perkusi silinder panjang dari kayu khas Banten yang dimainkan bersama angklung buhun adalah…",
          en: "Which elongated wooden percussion drum from Banten accompanies angklung buhun?",
        },
        options: [
          { id: "Gambang Kromong", en: "Gambang Kromong" },
          { id: "Dogdog Lojor", en: "Dogdog Lojor" },
          { id: "Siter", en: "Siter" },
          { id: "Rebab", en: "Rebab" },
        ],
        correctIndex: 1,
        explanation: {
          id: "Dogdog Lojor dimainkan dalam upacara adat panen padi di wilayah Banten selatan.",
          en: "Dogdog Lojor is played during harvest rituals across southern Banten.",
        },
      },
      {
        id: "bt-q4",
        type: "multiple-choice",
        question: {
          id: "Ritual tahunan masyarakat Baduy berjalan kaki mengantarkan hasil panen ke pemimpin daerah disebut…",
          en: "What is the annual Baduy pilgrimage delivering harvest gifts called?",
        },
        options: [
          { id: "Yadnya Kasada", en: "Yadnya Kasada" },
          { id: "Grebeg Maulud", en: "Grebeg Maulud" },
          { id: "Seba Baduy", en: "Seba Baduy" },
          { id: "Palang Pintu", en: "Palang Pintu" },
        ],
        correctIndex: 2,
        explanation: {
          id: "Seba Baduy dilaksanakan setiap selesai panen ladang (huma) sebagai wujud syukur.",
          en: "Seba Baduy is held annually after harvest to express gratitude.",
        },
      },
      {
        id: "bt-q5",
        type: "match",
        question: {
          id: "Senjata tradisional pusaka yang terkenal dari Kecamatan Ciomas, Banten adalah…",
          en: "Which heirloom traditional blade is famed from Ciomas, Banten?",
        },
        options: [
          { id: "Kujang", en: "Kujang" },
          { id: "Celurit", en: "Celurit" },
          { id: "Golok Ciomas", en: "Golok Ciomas" },
          { id: "Keris", en: "Keris" },
        ],
        correctIndex: 2,
        explanation: {
          id: "Golok Ciomas adalah warisan pandai besi Banten yang sarat nilai sejarah.",
          en: "Golok Ciomas is a revered Banten blacksmithing heirloom.",
        },
      },
    ],
  },

  {
    slug: "dki-jakarta",
    code: "ID-JK",
    name: { id: "DKI Jakarta", en: "DKI Jakarta" },
    capital: "Jakarta",
    island: "jawa",
    islandLabel: { id: "Jawa", en: "Java" },
    status: "available",
    greeting: {
      phrase: "Assalamu'alaikum, aye sambut!",
      meaning: { id: "Sapaan hangat khas Betawi", en: "Warm Betawi hospitality greeting" },
      language: "Bahasa Betawi",
    },
    tagline: {
      id: "Simpul kosmopolitan budaya Betawi, Ondel-ondel, dan Gambang Kromong.",
      en: "Cosmopolitan crossroads of Betawi culture, Ondel-ondel, and Gambang Kromong.",
    },
    description: {
      id: "Sebagai kota pelabuhan tua sejak era Sunda Kelapa, budaya Betawi di Jakarta adalah perpaduan cair unsur Melayu, Sunda, Jawa, Tionghoa, Arab, dan Eropa yang jenaka dan terbuka.",
      en: "Rooted in the historic port of Sunda Kelapa, Jakarta's Betawi culture weaves together Malay, Sundanese, Javanese, Chinese, Arab, and European influences.",
    },
    themeColor: "#C4532D",
    accentColor: "#F2BC52",
    landmarkType: "monas",
    landmarkName: { id: "Monumen Nasional (Monas)", en: "National Monument (Monas)" },
    center3D: [-4.15, 1.35],
    cameraOffset: [-4.15, 3.2, 4.9],
    polygon2D: makeTilePolygon(-4.15, 1.35, 0.52, 0.42, 0.4),
    houseHotspots: [
      {
        id: "gigi-balang",
        position: [0, 1.15, 0.95],
        title: { id: "Ornamen Gigi Balang", en: "Gigi Balang Trim" },
        description: {
          id: "Lisplang kayu berukir segitiga bergerigi menyerupai gigi belalang, melambangkan kejujuran dan kesabaran.",
          en: "Carved wooden fascia resembling grasshopper teeth, symbolizing honesty and patience.",
        },
      },
      {
        id: "teras-lebar",
        position: [0, 0.35, 1.0],
        title: { id: "Teras Paseban", en: "Paseban Veranda" },
        description: {
          id: "Teras depan yang sangat luas dilengkapi bale-bale sebagai ruang terbuka menerima tamu.",
          en: "Generous open front porch expressing Betawi warmth and neighborly hospitality.",
        },
      },
    ],
    items: [
      {
        id: "jkt-rumah",
        category: "rumah-adat",
        name: { id: "Rumah Kebaya", en: "Rumah Kebaya" },
        summary: {
          id: "Rumah tradisional Betawi dengan teras luas, pagar langkan, dan ornamen khas lisplang kayu Gigi Balang.",
          en: "Traditional Betawi house distinguished by its expansive veranda and Gigi Balang wooden eaves.",
        },
        funFact: {
          id: "Teras depannya sering lebih luas daripada ruang tidur karena tamu dianggap pembawa berkah.",
          en: "The front veranda is often larger than the bedrooms, reflecting the honor given to guests.",
        },
        source: "UPK Perkampungan Budaya Betawi Setu Babakan",
        license: "CC BY-SA 4.0",
      },
      {
        id: "jkt-tari",
        category: "tarian",
        name: { id: "Tari Topeng Betawi", en: "Betawi Mask Dance" },
        summary: {
          id: "Seni tari teaterikal dengan tiga karakter topeng (Panji, Samba, Jingga) yang menggabungkan gerak lincah dan humor.",
          en: "Theatrical mask dance portraying Panji, Samba, and Jingga characters with lively movement and wit.",
        },
        funFact: {
          id: "Penari sering menggigit tali kulit di balik topeng kayu agar ekspresi gerak kepala tetap presisi.",
          en: "Dancers hold a leather bite-strap inside the carved wooden mask to snap head movements cleanly.",
        },
        source: "Disparekraf DKI Jakarta",
        license: "CC BY-SA 4.0",
      },
      {
        id: "jkt-pakaian",
        category: "pakaian",
        name: { id: "Kebaya Encim & Baju Sadariah", en: "Kebaya Encim & Sadariah" },
        summary: {
          id: "Kebaya bordir kerancang berwarna cerah yang dipadukan kain batik Betawi, serta baju koko Sadariah.",
          en: "Intricately embroidered Kebaya Encim paired with vibrant Betawi batik, and Sadariah tunic.",
        },
        funFact: {
          id: "Kebaya Encim merupakan akulturasi cantik antara busana Melayu-Jawa dan sulaman peranakan Tionghoa.",
          en: "Kebaya Encim embodies the graceful fusion of Malay-Javanese attire and Peranakan embroidery.",
        },
        source: "Museum Tekstil Jakarta",
        license: "CC BY-SA 4.0",
      },
      {
        id: "jkt-kuliner",
        category: "kuliner",
        name: { id: "Kerak Telor", en: "Kerak Telor" },
        summary: {
          id: "Beras ketan putih, telur bebek, ebi sangrai, dan serundeng kelapa yang dimasak di wajan arang hingga renyah.",
          en: "Glutinous rice, duck egg, dried shrimp, and toasted coconut crisped over glowing charcoal.",
        },
        funFact: {
          id: "Wajan dibalik langsung ke arah bara api untuk memanggang permukaan atas hingga kecokelatan.",
          en: "Vendors flip the wok upside down directly over embers to caramelize the top crust.",
        },
        source: "WBTb Kemdikbudristek",
        license: "CC BY-SA 4.0",
      },
      {
        id: "jkt-musik",
        category: "alat-musik",
        name: { id: "Gambang Kromong", en: "Gambang Kromong" },
        summary: {
          id: "Orkes tradisional Betawi yang memadukan bilah kayu gambang, kromong perunggu, serta alat gesek tehyan.",
          en: "Betawi ensemble harmonizing wooden xylophones and bronze gongs with Chinese two-string fiddles.",
        },
        funFact: {
          id: "Tangga nadanya menggunakan pentatonis khas yang membuat lagunya terdengar riang seperti 'Jali-Jali'.",
          en: "Its bright pentatonic scale powers beloved classics such as 'Jali-Jali'.",
        },
        source: "Lembaga Kebudayaan Betawi",
        license: "CC BY-SA 4.0",
      },
      {
        id: "jkt-bahasa",
        category: "bahasa",
        name: { id: "Bahasa Betawi", en: "Betawi Language" },
        summary: {
          id: "Kreol berbasis Melayu yang kaya serapan Sunda, Jawa, Hokkien, Arab, dan Belanda dengan akhiran vokal '-e'.",
          en: "Malay-based creole rich in regional and maritime loanwords with its trademark '-e' inflection.",
        },
        funFact: {
          id: "Banyak kosakata pergaulan Indonesia modern berakar dari dialek Betawi.",
          en: "Much of modern Indonesian urban slang traces its roots directly to Betawi speech.",
        },
        source: "Badan Bahasa Kemdikbud",
        license: "CC BY-SA 4.0",
      },
      {
        id: "jkt-senjata",
        category: "senjata",
        name: { id: "Golok Betawi", en: "Betawi Golok" },
        summary: {
          id: "Senjata tradisional bilah pendek yang erat dengan tradisi bela diri Maen Pukulan (silat Betawi).",
          en: "Traditional short blade closely tied to Betawi martial arts (Maen Pukulan).",
        },
        funFact: {
          id: "Dalam upacara adat, golok diselipkan di pinggang sebagai simbol tanggung jawab melindungi keluarga.",
          en: "In ceremonies, wearing the golok symbolizes the duty to protect one's family.",
        },
        source: "Museum Betawi Setu Babakan",
        license: "CC BY-SA 4.0",
      },
      {
        id: "jkt-upacara",
        category: "upacara",
        name: { id: "Palang Pintu", en: "Palang Pintu" },
        summary: {
          id: "Tradisi menyambut mempelai pria dengan adu pantun jenaka dan jurus silat sebelum masuk rumah pengantin.",
          en: "Wedding welcome ritual blending witty rhyming duels and silat demonstrations.",
        },
        funFact: {
          id: "Adu pantunnya bersifat improvisasi dan selalu memancing tawa tamu undangan.",
          en: "The rhyming banter is improvised live, keeping wedding guests laughing.",
        },
        source: "WBTb Indonesia",
        license: "CC BY-SA 4.0",
      },
      {
        id: "jkt-wisata",
        category: "wisata",
        name: { id: "Setu Babakan & Kota Tua", en: "Setu Babakan & Old Town" },
        summary: {
          id: "Perkampungan Budaya Betawi di Jakarta Selatan serta kawasan bersejarah Batavia di utara Jakarta.",
          en: "The living Betawi Cultural Village in South Jakarta and historic Batavia heritage quarter.",
        },
        funFact: {
          id: "Setu Babakan menyajikan pertunjukan lenong dan kuliner asli Betawi setiap akhir pekan.",
          en: "Setu Babakan hosts live lenong theater and Betawi street food every weekend.",
        },
        source: "Disparekraf DKI Jakarta",
        license: "CC BY-SA 4.0",
        location: "Jakarta Selatan & Barat",
      },
    ],
    quiz: [
      {
        id: "jk-q1",
        type: "visual-3d",
        question: {
          id: "Ornamen lisplang kayu bergerigi khas Rumah Kebaya Betawi disebut…",
          en: "What is the carved wooden fascia trim on a Betawi Rumah Kebaya called?",
        },
        options: [
          { id: "Gigi Balang", en: "Gigi Balang" },
          { id: "Saka Guru", en: "Saka Guru" },
          { id: "Tumpang Sari", en: "Tumpang Sari" },
          { id: "Julang Ngapak", en: "Julang Ngapak" },
        ],
        correctIndex: 0,
        explanation: {
          id: "Gigi Balang melambangkan ketekunan, kejujuran, dan keberanian masyarakat Betawi.",
          en: "Gigi Balang symbolizes perseverance, honesty, and courage in Betawi philosophy.",
        },
      },
      {
        id: "jk-q2",
        type: "sound-guess",
        question: {
          id: "Orkes tradisional Betawi yang memadukan bilah kayu, kromong, dan gesekan tehyan adalah…",
          en: "Which Betawi ensemble combines wooden xylophones, bronze gongs, and Chinese fiddles?",
        },
        options: [
          { id: "Angklung", en: "Angklung" },
          { id: "Gambang Kromong", en: "Gambang Kromong" },
          { id: "Gamelan Sekaten", en: "Gamelan Sekaten" },
          { id: "Kendang Kempul", en: "Kendang Kempul" },
        ],
        correctIndex: 1,
        explanation: {
          id: "Gambang Kromong adalah bukti akulturasi harmonis musik lokal dan Tionghoa di Jakarta.",
          en: "Gambang Kromong showcases the historic fusion of local and Chinese music in Jakarta.",
        },
      },
      {
        id: "jk-q3",
        type: "multiple-choice",
        question: {
          id: "Tradisi adu pantun dan silat saat menyambut rombongan pengantin pria Betawi disebut…",
          en: "What is the Betawi wedding tradition of rhyming banter and silat called?",
        },
        options: [
          { id: "Seren Taun", en: "Seren Taun" },
          { id: "Palang Pintu", en: "Palang Pintu" },
          { id: "Seba", en: "Seba" },
          { id: "Ruwatan", en: "Ruwatan" },
        ],
        correctIndex: 1,
        explanation: {
          id: "Palang Pintu menguji kecakapan bela diri, kecerdasan berpantun, dan akhlak mempelai.",
          en: "Palang Pintu playfully tests the groom's wit, martial arts, and character.",
        },
      },
      {
        id: "jk-q4",
        type: "multiple-choice",
        question: {
          id: "Kuliner Betawi dari beras ketan, telur bebek, dan serundeng yang dipanggang di atas bara disebut…",
          en: "Which Betawi charcoal-grilled specialty uses glutinous rice, duck egg, and toasted coconut?",
        },
        options: [
          { id: "Gudeg", en: "Gudeg" },
          { id: "Kerak Telor", en: "Kerak Telor" },
          { id: "Surabi", en: "Surabi" },
          { id: "Lumpia", en: "Lumpia" },
        ],
        correctIndex: 1,
        explanation: {
          id: "Kerak Telor adalah ikon kuliner khas Jakarta sejak zaman Batavia.",
          en: "Kerak Telor has been a beloved Jakarta street icon since the Batavia era.",
        },
      },
      {
        id: "jk-q5",
        type: "match",
        question: {
          id: "Kawasan pusat pelestarian Perkampungan Budaya Betawi di Jakarta Selatan berada di…",
          en: "Where is the official Betawi Cultural Village located in South Jakarta?",
        },
        options: [
          { id: "Kampung Naga", en: "Kampung Naga" },
          { id: "Setu Babakan", en: "Setu Babakan" },
          { id: "Kotagede", en: "Kotagede" },
          { id: "Trowulan", en: "Trowulan" },
        ],
        correctIndex: 1,
        explanation: {
          id: "Setu Babakan ditetapkan sebagai cagar budaya hidup masyarakat Betawi.",
          en: "Setu Babakan is designated as a living cultural sanctuary for Betawi heritage.",
        },
      },
    ],
  },

  {
    slug: "jawa-barat",
    code: "ID-JB",
    name: { id: "Jawa Barat", en: "West Java" },
    capital: "Bandung",
    island: "jawa",
    islandLabel: { id: "Jawa", en: "Java" },
    status: "available",
    greeting: {
      phrase: "Sampurasun!",
      meaning: { id: "Sapaan hormat Tatar Sunda (dijawab: Rampes)", en: "Gracious Sundanese greeting (reply: Rampes)" },
      language: "Bahasa Sunda",
    },
    tagline: {
      id: "Tatar Parahyangan yang sejuk, rumah Angklung UNESCO dan Tari Jaipong.",
      en: "Misty Parahyangan highlands, birthplace of UNESCO-recognized Angklung and Jaipong.",
    },
    description: {
      id: "Dikelilingi gunung api hijau dan lembah subur, kebudayaan Sunda di Jawa Barat menjunjung nilai silih asah, silih asih, silih asuh yang tercermin dari musik bambu hingga arsitektur kayu.",
      en: "Cradled by volcanic highlands, Sundanese culture in West Java celebrates mutual care and harmony through bamboo music, vibrant dance, and timber architecture.",
    },
    themeColor: "#3F6B4E",
    accentColor: "#D49B35",
    landmarkType: "angklung",
    landmarkName: { id: "Angklung Bambu", en: "Bamboo Angklung" },
    center3D: [-3.1, 2.55],
    cameraOffset: [-3.1, 3.8, 6.7],
    polygon2D: makeTilePolygon(-3.1, 2.55, 0.95, 0.65, 0.1),
    houseHotspots: [
      {
        id: "sayap-julang",
        position: [0, 1.5, 0],
        title: { id: "Atap Julang Ngapak", en: "Julang Ngapak Wings" },
        description: {
          id: "Bentuk atap melebar di kiri dan kanan menyerupai burung julang membentangkan sayap.",
          en: "Broad overhanging eaves shaped like a hornbill spreading its wings to shed highland rain.",
        },
      },
      {
        id: "capit-hurang",
        position: [0, 1.92, 0.5],
        title: { id: "Ornamen Capit Hurang", en: "Capit Hurang Finial" },
        description: {
          id: "Ujung bubungan menyilang menyerupai capit udang pelindung sambungan atap.",
          en: "Crossed ridge finials shaped like shrimp pincers shielding the roof crest.",
        },
      },
    ],
    items: [
      {
        id: "jabar-rumah",
        category: "rumah-adat",
        name: { id: "Imah Julang Ngapak", en: "Imah Julang Ngapak" },
        summary: {
          id: "Rumah panggung Sunda dengan atap melebar bak sayap burung julang dan hiasan puncak capit hurang.",
          en: "Sundanese stilt house featuring sweeping hornbill-wing eaves and crossed ridge finials.",
        },
        funFact: {
          id: "Arsitektur atap Julang Ngapak menginspirasi desain aula ikonik di ITB Bandung.",
          en: "The Julang Ngapak silhouette inspired the iconic campus pavilions of ITB in Bandung.",
        },
        source: "Disparbud Jawa Barat",
        license: "CC BY-SA 4.0",
      },
      {
        id: "jabar-tari",
        category: "tarian",
        name: { id: "Tari Jaipong", en: "Jaipong Dance" },
        summary: {
          id: "Tarian energik khas Sunda yang memadukan gerak pencak silat, ketuk tilu, dan kendang dinamis.",
          en: "Spirited Sundanese dance fusing pencak silat stances, ketuk tilu folk motifs, and dynamic kendang drumming.",
        },
        funFact: {
          id: "Dikembangkan pada akhir 1970-an oleh seniman Gugum Gumbira di Bandung.",
          en: "Choreographed in the late 1970s by Gugum Gumbira in Bandung.",
        },
        source: "Kemdikbudristek · WBTb",
        license: "CC BY-SA 4.0",
      },
      {
        id: "jabar-pakaian",
        category: "pakaian",
        name: { id: "Kebaya Sunda & Baju Pangsi", en: "Sundanese Kebaya & Pangsi" },
        summary: {
          id: "Kebaya lembut berwarna cerah dengan kain sinjang batik Priangan, serta baju pangsi dan iket Sunda.",
          en: "Graceful pastel kebaya paired with Priangan batik, alongside tailored pangsi and folded iket headwear.",
        },
        funFact: {
          id: "Iket Sunda memiliki puluhan gaya lipatan tradisional.",
          en: "Sundanese iket headbands have dozens of traditional folding styles.",
        },
        source: "Museum Sri Baduga Bandung",
        license: "CC BY-SA 4.0",
      },
      {
        id: "jabar-kuliner",
        category: "kuliner",
        name: { id: "Nasi Timbel & Surabi", en: "Nasi Timbel & Surabi" },
        summary: {
          id: "Nasi hangat dibungkus daun pisang disajikan dengan lalapan segar dan sambal terasi, plus surabi tungku tanah liat.",
          en: "Banana-leaf wrapped rice served with mountain herbs and sambal, plus clay-griddle coconut pancakes.",
        },
        funFact: {
          id: "Panas nasi melepaskan aroma alami daun pisang yang menggugah selera.",
          en: "Steam from hot rice releases delicate botanical aromas from the banana leaf.",
        },
        source: "Indonesiana · Kemdikbud",
        license: "CC BY-SA 4.0",
      },
      {
        id: "jabar-musik",
        category: "alat-musik",
        name: { id: "Angklung", en: "Angklung" },
        summary: {
          id: "Alat musik bambu bernada ganda yang dibunyikan dengan digoyangkan secara berkelompok, diakui UNESCO sejak 2010.",
          en: "Tuned bamboo shaker instrument played cooperatively in ensembles, inscribed by UNESCO in 2010.",
        },
        funFact: {
          id: "Satu angklung menghasilkan satu nada, sehingga musiknya hanya tercipta lewat gotong royong.",
          en: "Since each angklung plays a single note, melodies emerge only through collective teamwork.",
        },
        source: "UNESCO Intangible Cultural Heritage",
        license: "CC BY-SA 4.0",
      },
      {
        id: "jabar-bahasa",
        category: "bahasa",
        name: { id: "Bahasa Sunda", en: "Sundanese Language" },
        summary: {
          id: "Salah satu bahasa daerah dengan penutur terbesar di Indonesia, lengkap dengan aksara Sunda Kaganga.",
          en: "One of Indonesia's most widely spoken regional languages, complete with its own Kaganga script.",
        },
        funFact: {
          id: "Sapaan 'Sampurasun' berasal dari ungkapan 'sampurna ning ingsun'.",
          en: "'Sampurasun' derives from a classical expression of humility and mutual respect.",
        },
        source: "Balai Bahasa Jawa Barat",
        license: "CC BY-SA 4.0",
      },
      {
        id: "jabar-senjata",
        category: "senjata",
        name: { id: "Kujang", en: "Kujang" },
        summary: {
          id: "Bilah melengkung unik simbol budaya Sunda sejak era Kerajaan Pajajaran.",
          en: "Distinctive curved blade emblematic of Sundanese heritage since the Pajajaran Kingdom.",
        },
        funFact: {
          id: "Siluet Kujang menjadi ikon tugu pusat Kota Bogor dan lambang Provinsi Jawa Barat.",
          en: "The Kujang silhouette crowns Bogor's central monument and West Java's crest.",
        },
        source: "Museum Sri Baduga",
        license: "CC BY-SA 4.0",
      },
      {
        id: "jabar-upacara",
        category: "upacara",
        name: { id: "Seren Taun", en: "Seren Taun" },
        summary: {
          id: "Upacara syukur panen padi masyarakat agraris Sunda dengan arak-arakan padi menuju lumbung (leuit).",
          en: "Sundanese rice-harvest thanksgiving storing grain in communal barns (leuit).",
        },
        funFact: {
          id: "Padi yang disimpan di leuit tradisional bisa bertahan hingga puluhan tahun.",
          en: "Paddy stored in traditional leuit granaries can remain viable for decades.",
        },
        source: "Kemdikbudristek · WBTb",
        license: "CC BY-SA 4.0",
      },
      {
        id: "jabar-wisata",
        category: "wisata",
        name: { id: "Kampung Naga & Saung Angklung Udjo", en: "Kampung Naga & Saung Angklung Udjo" },
        summary: {
          id: "Kampung adat Sunda di lembah Tasikmalaya serta pusat edukasi seni bambu di Bandung.",
          en: "Preserved traditional Sundanese valley hamlet and Bandung's living bamboo music sanctuary.",
        },
        funFact: {
          id: "Semua rumah di Kampung Naga memiliki ukuran dan arah hadap seragam sebagai simbol kesetaraan.",
          en: "Every house in Kampung Naga shares uniform proportions to symbolize equality.",
        },
        source: "Disparbud Jawa Barat",
        license: "CC BY-SA 4.0",
        location: "Tasikmalaya & Bandung",
      },
    ],
    quiz: [
      {
        id: "jb-q1",
        type: "sound-guess",
        question: {
          id: "Alat musik bambu dari Jawa Barat yang diakui UNESCO dan harus dimainkan secara gotong royong adalah…",
          en: "Which UNESCO-recognized bamboo instrument from West Java relies on cooperative group play?",
        },
        options: [
          { id: "Angklung", en: "Angklung" },
          { id: "Gambang", en: "Gambang" },
          { id: "Saron", en: "Saron" },
          { id: "Sasando", en: "Sasando" },
        ],
        correctIndex: 0,
        explanation: {
          id: "Angklung diakui UNESCO sebagai Warisan Budaya Takbenda Kemanusiaan pada tahun 2010.",
          en: "Angklung was inscribed on UNESCO's Intangible Cultural Heritage list in 2010.",
        },
      },
      {
        id: "jb-q2",
        type: "visual-3d",
        question: {
          id: "Rumah adat Sunda dengan atap melebar menyerupai sayap burung julang disebut…",
          en: "Which Sundanese house features broad eaves resembling a hornbill's wings?",
        },
        options: [
          { id: "Sulah Nyanda", en: "Sulah Nyanda" },
          { id: "Imah Julang Ngapak", en: "Imah Julang Ngapak" },
          { id: "Bangsal Kencono", en: "Bangsal Kencono" },
          { id: "Rumah Osing", en: "Rumah Osing" },
        ],
        correctIndex: 1,
        explanation: {
          id: "Julang Ngapak berarti burung julang yang sedang mengepakkan sayapnya.",
          en: "Julang Ngapak translates to a hornbill spreading its wings.",
        },
      },
      {
        id: "jb-q3",
        type: "multiple-choice",
        question: {
          id: "Ketika seseorang menyapa 'Sampurasun' di Jawa Barat, jawaban hormat yang tepat adalah…",
          en: "When greeted with 'Sampurasun' in West Java, what is the traditional gracious reply?",
        },
        options: [
          { id: "Rampes", en: "Rampes" },
          { id: "Matur nuwun", en: "Matur nuwun" },
          { id: "Sugeng rawuh", en: "Sugeng rawuh" },
          { id: "Horas", en: "Horas" },
        ],
        correctIndex: 0,
        explanation: {
          id: "'Rampes' bermakna semoga kebaikan dan kedamaian menyertai kita bersama.",
          en: "'Rampes' conveys wishing harmony and goodness in return.",
        },
      },
      {
        id: "jb-q4",
        type: "multiple-choice",
        question: {
          id: "Tari pergaulan energik asal Jawa Barat yang memadukan gerak silat dan ketuk tilu adalah…",
          en: "Which energetic West Javanese dance fuses pencak silat and ketuk tilu?",
        },
        options: [
          { id: "Tari Gambyong", en: "Gambyong Dance" },
          { id: "Tari Jaipong", en: "Jaipong Dance" },
          { id: "Tari Remo", en: "Remo Dance" },
          { id: "Tari Bedhaya", en: "Bedhaya Dance" },
        ],
        correctIndex: 1,
        explanation: {
          id: "Tari Jaipong diciptakan di Bandung dan menjadi ikon seni tari Jawa Barat.",
          en: "Jaipong emerged in Bandung and became West Java's signature dance.",
        },
      },
      {
        id: "jb-q5",
        type: "match",
        question: {
          id: "Senjata tradisional melengkung yang menjadi lambang Provinsi Jawa Barat adalah…",
          en: "Which curved traditional blade appears on West Java's emblem?",
        },
        options: [
          { id: "Golok Ciomas", en: "Golok Ciomas" },
          { id: "Celurit", en: "Celurit" },
          { id: "Kujang", en: "Kujang" },
          { id: "Mandau", en: "Mandau" },
        ],
        correctIndex: 2,
        explanation: {
          id: "Kujang merupakan pusaka khas Tatar Sunda sejak era Kerajaan Pajajaran.",
          en: "The Kujang is an iconic Sundanese heirloom dating back to the Pajajaran era.",
        },
      },
    ],
  },

  {
    slug: "jawa-tengah",
    code: "ID-JT",
    name: { id: "Jawa Tengah", en: "Central Java" },
    capital: "Semarang",
    island: "jawa",
    islandLabel: { id: "Jawa", en: "Java" },
    status: "available",
    greeting: {
      phrase: "Sugeng rawuh!",
      meaning: { id: "Selamat datang dengan penuh hormat", en: "Warm and respectful welcome" },
      language: "Bahasa Jawa",
    },
    tagline: {
      id: "Jantung peradaban candi agung Borobudur, batik pesisir hingga keraton, dan gamelan.",
      en: "Heartland of Borobudur's monumental stone terraces, classical batik, and bronze gamelan.",
    },
    description: {
      id: "Jawa Tengah menyimpan warisan arsitektur megah Dinasti Syailendra dan Mataram Kuno, tradisi keraton Surakarta, hingga kekayaan batik pesisir Pekalongan dan Lasem.",
      en: "Central Java preserves ancient temple architecture from Borobudur to Dieng, the royal arts of Surakarta, and renowned coastal batik centers.",
    },
    themeColor: "#A66332",
    accentColor: "#D49B35",
    landmarkType: "borobudur",
    landmarkName: { id: "Candi Borobudur", en: "Borobudur Temple" },
    center3D: [-0.85, 2.15],
    cameraOffset: [-0.85, 3.8, 6.4],
    polygon2D: makeTilePolygon(-0.85, 2.15, 0.96, 0.62, 0.25),
    houseHotspots: [
      {
        id: "tajug-joglo",
        position: [0, 1.85, 0],
        title: { id: "Atap Tajug / Brunjung", en: "Tajug / Brunjung Crown" },
        description: {
          id: "Puncak atap berbentuk limas tinggi menyerupai gunung, melambangkan hubungan manusia dengan Yang Maha Kuasa.",
          en: "Steep pyramidal central roof evocative of a sacred mountain connecting earth and heaven.",
        },
      },
      {
        id: "saka-guru",
        position: [0.42, 0.75, 0.42],
        title: { id: "Empat Saka Guru", en: "Four Saka Guru Pillars" },
        description: {
          id: "Empat tiang kayu jati utama penopang atap tengah yang melambangkan empat penjuru angin.",
          en: "Four master teak pillars supporting the central roof, symbolizing the four cardinal directions.",
        },
      },
    ],
    items: [
      {
        id: "jateng-rumah",
        category: "rumah-adat",
        name: { id: "Rumah Joglo", en: "Joglo House" },
        summary: {
          id: "Arsitektur kayu jati khas Jawa yang ditopang empat tiang utama Saka Guru dan struktur tumpang sari berukir.",
          en: "Classic Javanese teak pavilion anchored by four Saka Guru pillars and an inverted stepped-beam ceiling.",
        },
        funFact: {
          id: "Struktur sambungan kayu tanpa paku membuat Joglo sangat lentur meredam getaran gempa.",
          en: "Mortise-and-tenon teak joinery flexes naturally to absorb seismic tremors.",
        },
        source: "Museum Ranggawarsita Semarang",
        license: "CC BY-SA 4.0",
      },
      {
        id: "jateng-tari",
        category: "tarian",
        name: { id: "Tari Gambyong", en: "Gambyong Dance" },
        summary: {
          id: "Tari penyambutan klasik khas Surakarta yang luwes, lembut, dan diiringi gending gamelan.",
          en: "Graceful classical welcome dance from Surakarta accompanied by melodic gamelan.",
        },
        funFact: {
          id: "Gerakan kendang dan penari saling berkomunikasi langsung selama pertunjukan.",
          en: "Dancers and the kendang drummer engage in live musical dialogue throughout the piece.",
        },
        source: "Kemdikbudristek · WBTb",
        license: "CC BY-SA 4.0",
      },
      {
        id: "jateng-pakaian",
        category: "pakaian",
        name: { id: "Kebaya Jawa, Beskap & Batik", en: "Javanese Kebaya, Beskap & Batik" },
        summary: {
          id: "Paduan beskap atau kebaya dengan kain batik bermotif filosofis seperti Parang, Kawung, dan Truntum.",
          en: "Tailored beskap or kebaya paired with philosophical batik motifs such as Parang, Kawung, and Truntum.",
        },
        funFact: {
          id: "Motif batik Truntum diciptakan di Surakarta sebagai simbol cinta yang tumbuh kembali.",
          en: "The Truntum motif was created in Surakarta to symbolize blossoming, enduring love.",
        },
        source: "Museum Batik Pekalongan",
        license: "CC BY-SA 4.0",
      },
      {
        id: "jateng-kuliner",
        category: "kuliner",
        name: { id: "Lumpia Semarang", en: "Semarang Lumpia" },
        summary: {
          id: "Lumpia renyah berisi rebung muda berbumbu manis-gurih, telur, dan udang dengan saus kental.",
          en: "Crisp spring rolls filled with savory-sweet young bamboo shoots, egg, and shrimp.",
        },
        funFact: {
          id: "Lahir dari akulturasi cita rasa Tionghoa dan Jawa pada abad ke-19.",
          en: "Born from a 19th-century blend of Chinese culinary technique and Javanese flavors.",
        },
        source: "WBTb Kemdikbudristek",
        license: "CC BY-SA 4.0",
      },
      {
        id: "jateng-musik",
        category: "alat-musik",
        name: { id: "Gamelan Jawa", en: "Javanese Gamelan" },
        summary: {
          id: "Ansambel musik perunggu berlaras slendro dan pelog yang dikenal luas di Jawa Tengah & DIY.",
          en: "Bronze percussion ensemble tuned in slendro and pelog scales, celebrated across Central Java & Yogyakarta.",
        },
        funFact: {
          id: "Gamelan diakui UNESCO pada 2021 dan menginspirasi komposer Claude Debussy.",
          en: "Inscribed by UNESCO in 2021, Javanese gamelan famously inspired Claude Debussy.",
        },
        source: "UNESCO Intangible Cultural Heritage",
        license: "CC BY-SA 4.0",
      },
      {
        id: "jateng-bahasa",
        category: "bahasa",
        name: { id: "Bahasa Jawa (Ngoko & Krama)", en: "Javanese Language" },
        summary: {
          id: "Bahasa daerah dengan tingkatan tutur serta kekayaan dialek seperti Banyumasan (Ngapak).",
          en: "Nuanced regional language with politeness levels and lively dialects like Banyumasan.",
        },
        funFact: {
          id: "Aksara Jawa (Hanacaraka) memiliki 20 huruf dasar yang tersusun seperti puisi.",
          en: "The 20-letter Hanacaraka script reads as a poetic pangram tale.",
        },
        source: "Balai Bahasa Jawa Tengah",
        license: "CC BY-SA 4.0",
      },
      {
        id: "jateng-senjata",
        category: "senjata",
        name: { id: "Keris Jawa", en: "Javanese Keris" },
        summary: {
          id: "Bilah asimetris berpola pamor hasil lipatan besi dan nikel, diakui UNESCO.",
          en: "Asymmetrical damascened dagger forged with layered iron and nickel pamor, recognized by UNESCO.",
        },
        funFact: {
          id: "Keris dihormati sebagai karya seni dan simbol spiritual.",
          en: "The keris is revered primarily as spiritual art and ceremonial regalia.",
        },
        source: "UNESCO & Museum Keris Solo",
        license: "CC BY-SA 4.0",
      },
      {
        id: "jateng-upacara",
        category: "upacara",
        name: { id: "Ruwatan Rambut Gimbal Dieng", en: "Dieng Hair-Cutting Ruwatan" },
        summary: {
          id: "Ritual sakral pencukuran rambut gimbal alami anak-anak Dataran Tinggi Dieng.",
          en: "Sacred ritual cutting the naturally occurring dreadlocks of Dieng children.",
        },
        funFact: {
          id: "Permintaan khusus sang anak wajib dipenuhi sebelum ritual pencukuran dimulai.",
          en: "Each child's heartfelt request is fulfilled before the ceremony begins.",
        },
        source: "Disporapar Jawa Tengah",
        license: "CC BY-SA 4.0",
      },
      {
        id: "jateng-wisata",
        category: "wisata",
        name: { id: "Candi Borobudur", en: "Borobudur Temple" },
        summary: {
          id: "Monumen Buddha terbesar di dunia dari abad ke-9 di Magelang dengan 2.672 panel relief.",
          en: "The world's largest 9th-century Buddhist monument in Magelang.",
        },
        funFact: {
          id: "Seluruh balok batu andesitnya disusun saling mengunci tanpa semen.",
          en: "Its volcanic andesite blocks interlock without mortar.",
        },
        source: "UNESCO World Heritage Centre",
        license: "CC BY-SA 4.0",
        location: "Magelang, Jawa Tengah",
      },
    ],
    quiz: [
      {
        id: "jt-q1",
        type: "visual-3d",
        question: {
          id: "Empat tiang kayu jati utama yang menopang atap tengah Rumah Joglo disebut…",
          en: "What are the four main teak pillars supporting the central roof of a Joglo house called?",
        },
        options: [
          { id: "Saka Guru", en: "Saka Guru" },
          { id: "Gigi Balang", en: "Gigi Balang" },
          { id: "Capit Hurang", en: "Capit Hurang" },
          { id: "Umpak", en: "Umpak" },
        ],
        correctIndex: 0,
        explanation: {
          id: "Empat Saka Guru melambangkan keseimbangan empat penjuru mata angin.",
          en: "The four Saka Guru represent balance across the four cardinal directions.",
        },
      },
      {
        id: "jt-q2",
        type: "multiple-choice",
        question: {
          id: "Candi Buddha terbesar di dunia yang berada di Magelang, Jawa Tengah adalah…",
          en: "Which world-largest Buddhist temple stands in Magelang, Central Java?",
        },
        options: [
          { id: "Candi Penataran", en: "Penataran Temple" },
          { id: "Candi Borobudur", en: "Borobudur Temple" },
          { id: "Candi Prambanan", en: "Prambanan Temple" },
          { id: "Candi Muaro Jambi", en: "Muaro Jambi Temple" },
        ],
        correctIndex: 1,
        explanation: {
          id: "Candi Borobudur dibangun pada abad ke-9 pada masa Dinasti Syailendra.",
          en: "Borobudur was constructed in the 9th century under the Sailendra dynasty.",
        },
      },
      {
        id: "jt-q3",
        type: "multiple-choice",
        question: {
          id: "Tari penyambutan klasik yang luwes dari Surakarta, Jawa Tengah adalah…",
          en: "Which graceful classical welcome dance originates from Surakarta, Central Java?",
        },
        options: [
          { id: "Tari Gambyong", en: "Gambyong Dance" },
          { id: "Tari Jaipong", en: "Jaipong Dance" },
          { id: "Tari Topeng Betawi", en: "Betawi Mask Dance" },
          { id: "Tari Rampak Bedug", en: "Rampak Bedug Dance" },
        ],
        correctIndex: 0,
        explanation: {
          id: "Tari Gambyong diperhalus di lingkungan Keraton Surakarta.",
          en: "Gambyong evolved into a refined court welcome dance in Surakarta.",
        },
      },
      {
        id: "jt-q4",
        type: "sound-guess",
        question: {
          id: "Dua sistem tangga nada utama dalam Gamelan Jawa disebut…",
          en: "What are the two primary tuning systems of Javanese Gamelan?",
        },
        options: [
          { id: "Mayor dan Minor", en: "Major and Minor" },
          { id: "Slendro dan Pelog", en: "Slendro and Pelog" },
          { id: "Pentatonis dan Diatonis", en: "Pentatonic and Diatonic" },
          { id: "Dorian dan Phrygian", en: "Dorian and Phrygian" },
        ],
        correctIndex: 1,
        explanation: {
          id: "Slendro dan Pelog memberi karakter khas pada gamelan Jawa.",
          en: "Slendro and Pelog define gamelan's unmistakable resonance.",
        },
      },
      {
        id: "jt-q5",
        type: "match",
        question: {
          id: "Kuliner ikonik Semarang berisi rebung muda hasil akulturasi Tionghoa-Jawa adalah…",
          en: "Which Semarang specialty stuffed with young bamboo shoots reflects Chinese-Javanese fusion?",
        },
        options: [
          { id: "Gudeg", en: "Gudeg" },
          { id: "Lumpia Semarang", en: "Semarang Lumpia" },
          { id: "Rawon", en: "Rawon" },
          { id: "Sate Bandeng", en: "Sate Bandeng" },
        ],
        correctIndex: 1,
        explanation: {
          id: "Lumpia Semarang telah ditetapkan sebagai Warisan Budaya Takbenda Indonesia.",
          en: "Semarang Lumpia is officially recognized as Indonesian Intangible Cultural Heritage.",
        },
      },
    ],
  },

  {
    slug: "di-yogyakarta",
    code: "ID-YO",
    name: { id: "DI Yogyakarta", en: "DI Yogyakarta" },
    capital: "Yogyakarta",
    island: "jawa",
    islandLabel: { id: "Jawa", en: "Java" },
    status: "available",
    greeting: {
      phrase: "Sugeng rawuh ing Ngayogyakarta!",
      meaning: { id: "Selamat datang di Yogyakarta yang damai", en: "Welcome to peaceful Yogyakarta" },
      language: "Bahasa Jawa Mataram",
    },
    tagline: {
      id: "Sumbu filosofis Keraton Yogyakarta, Gudeg legendaris, dan tradisi Sekaten.",
      en: "Philosophical axis of the Yogyakarta Royal Palace, iconic Gudeg, and Sekaten heritage.",
    },
    description: {
      id: "Daerah Istimewa Yogyakarta memelihara kesinambungan hidup antara Keraton, seni tari klasik, dan sumbu kosmologis Gunung Merapi hingga Laut Selatan yang diakui UNESCO.",
      en: "Yogyakarta sustains a living royal tradition aligned along the UNESCO-recognized Cosmological Axis from Mount Merapi to the Indian Ocean.",
    },
    themeColor: "#9A3F2B",
    accentColor: "#E5B143",
    landmarkType: "tugu",
    landmarkName: { id: "Tugu Pal Putih (Tugu Jogja)", en: "Tugu Jogja Monument" },
    center3D: [-0.55, 3.3],
    cameraOffset: [-0.55, 3.2, 6.8],
    polygon2D: makeTilePolygon(-0.55, 3.3, 0.56, 0.44, 0.3),
    houseHotspots: [
      {
        id: "tumpang-sari",
        position: [0, 1.38, 0],
        title: { id: "Langit-langit Tumpang Sari", en: "Tumpang Sari Ceiling" },
        description: {
          id: "Susunan balok kayu bertingkat terbalik berlapis cat merah-emas (prada) di pusat Bangsal Kencono.",
          en: "Stepped inverted timber ceiling adorned with crimson and gold-leaf prada motifs.",
        },
      },
      {
        id: "sumbu-filosofis",
        position: [0, 0.25, 1.05],
        title: { id: "Orientasi Sumbu Filosofis", en: "Philosophical Axis" },
        description: {
          id: "Menghadap garis imajiner lurus Merapi – Tugu – Keraton – Panggung Krapyak.",
          en: "Aligned along the sacred north-south line linking Mount Merapi, Tugu, the Palace, and Krapyak.",
        },
      },
    ],
    items: [
      {
        id: "diy-rumah",
        category: "rumah-adat",
        name: { id: "Bangsal Kencono", en: "Bangsal Kencono" },
        summary: {
          id: "Pendopo utama bergaya Joglo di dalam Keraton Yogyakarta dengan ukiran prada emas.",
          en: "The Golden Pavilion of Yogyakarta Palace showcasing gilded Joglo carpentry.",
        },
        funFact: {
          id: "Pilar-pilarnya memadukan simbol budaya Jawa, Hindu-Buddha, Islam, dan Eropa.",
          en: "Its pillars harmoniously weave Javanese, Hindu-Buddhist, Islamic, and European motifs.",
        },
        source: "Karaton Ngayogyakarta Hadiningrat",
        license: "CC BY-SA 4.0",
      },
      {
        id: "diy-tari",
        category: "tarian",
        name: { id: "Tari Bedhaya & Serimpi", en: "Bedhaya & Serimpi Dance" },
        summary: {
          id: "Tari pusaka keraton yang ditarikan dengan gerak meditatif dan anggun.",
          en: "Sacred court dances performed with meditative grace symbolizing inner harmony.",
        },
        funFact: {
          id: "Tari Bedhaya dibawakan oleh sembilan penari yang melambangkan sembilan lubang indra manusia.",
          en: "Bedhaya is traditionally danced by nine performers.",
        },
        source: "Karaton Ngayogyakarta Hadiningrat",
        license: "CC BY-SA 4.0",
      },
      {
        id: "diy-pakaian",
        category: "pakaian",
        name: { id: "Surjan Lurik & Kebaya", en: "Surjan Lurik & Kebaya" },
        summary: {
          id: "Baju surjan bermotif garis tenun lurik dipadukan blangkon bergaya Yogyakarta.",
          en: "Handwoven striped lurik surjan jacket paired with the signature Yogyakarta blangkon.",
        },
        funFact: {
          id: "Mondolan di belakang blangkon Jogja melambangkan kebijaksanaan menjaga tutur kata.",
          en: "The rounded bun on a Yogya blangkon symbolizes guarding wisdom.",
        },
        source: "Museum Sonobudoyo",
        license: "CC BY-SA 4.0",
      },
      {
        id: "diy-kuliner",
        category: "kuliner",
        name: { id: "Gudeg Jogja", en: "Yogyakarta Gudeg" },
        summary: {
          id: "Nangka muda yang dimasak perlahan berjam-jam dengan santan, gula aren, dan daun jati.",
          en: "Young jackfruit slow-simmered for hours with coconut milk, palm sugar, and teak leaves.",
        },
        funFact: {
          id: "Warna cokelat khas Gudeg berasal secara alami dari daun jati muda.",
          en: "Gudeg's signature reddish-brown hue comes naturally from young teak leaves.",
        },
        source: "Dinas Pariwisata DIY",
        license: "CC BY-SA 4.0",
      },
      {
        id: "diy-musik",
        category: "alat-musik",
        name: { id: "Gamelan Sekaten", en: "Sekaten Gamelan" },
        summary: {
          id: "Sepasang gamelan pusaka Keraton Yogyakarta yang dikeluarkan setahun sekali pada Sekaten.",
          en: "Twin heirloom royal gamelan sets brought out once a year during Sekaten.",
        },
        funFact: {
          id: "Alunan gamelannya digelar di pelataran Masjid Gedhe Kauman.",
          en: "Its sacred melodies resonate from the courtyard of Masjid Gedhe Kauman.",
        },
        source: "Karaton Ngayogyakarta Hadiningrat",
        license: "CC BY-SA 4.0",
      },
      {
        id: "diy-bahasa",
        category: "bahasa",
        name: { id: "Bahasa Jawa Mataram", en: "Mataram Javanese" },
        summary: {
          id: "Dialek baku Bahasa Jawa halus (Krama Inggil) serta bahasa gaul unik 'Basa Walikan' Jogja.",
          en: "Refined standard Javanese alongside Yogyakarta's playful Basa Walikan slang.",
        },
        funFact: {
          id: "Dalam Basa Walikan Jogja, kata 'Mas' berubah menjadi 'Dab'!",
          en: "In Yogyakarta's cipher slang, 'Mas' transforms into 'Dab'!",
        },
        source: "Balai Bahasa DIY",
        license: "CC BY-SA 4.0",
      },
      {
        id: "diy-senjata",
        category: "senjata",
        name: { id: "Keris Gayaman & Branggah", en: "Yogyakarta Keris" },
        summary: {
          id: "Keris dengan bentuk warangka khas Yogyakarta yang melengkapi busana resmi keraton.",
          en: "Ceremonial keris fitted with signature Yogyakarta sheaths.",
        },
        funFact: {
          id: "Memakai keris di punggung melambangkan pengendalian diri sebelum bertindak.",
          en: "Wearing the keris behind the back signifies self-restraint.",
        },
        source: "Museum Sonobudoyo",
        license: "CC BY-SA 4.0",
      },
      {
        id: "diy-upacara",
        category: "upacara",
        name: { id: "Grebeg Maulud", en: "Grebeg Maulud" },
        summary: {
          id: "Kirab prajurit keraton mengawal Gunungan hasil bumi dari Keraton menuju Masjid Gedhe.",
          en: "Royal guard procession escorting towering Gunungan harvest mounds.",
        },
        funFact: {
          id: "Gunungan melambangkan sedekah raja kepada rakyat sebagai wujud syukur.",
          en: "The Gunungan symbolizes royal generosity and communal gratitude.",
        },
        source: "Karaton Ngayogyakarta Hadiningrat",
        license: "CC BY-SA 4.0",
      },
      {
        id: "diy-wisata",
        category: "wisata",
        name: { id: "Sumbu Filosofis, Keraton & Prambanan", en: "Philosophical Axis & Prambanan" },
        summary: {
          id: "Warisan Dunia UNESCO Sumbu Filosofis Yogyakarta, Keraton, dan kompleks megah Candi Prambanan.",
          en: "UNESCO World Heritage Cosmological Axis, Royal Palace, and Prambanan Temple.",
        },
        funFact: {
          id: "Sumbu Filosofis Yogyakarta resmi ditetapkan sebagai Warisan Dunia UNESCO pada 2023.",
          en: "Yogyakarta's Cosmological Axis was inscribed by UNESCO in 2023.",
        },
        source: "UNESCO World Heritage Centre",
        license: "CC BY-SA 4.0",
        location: "Kota Yogyakarta & Sleman",
      },
    ],
    quiz: [
      {
        id: "yo-q1",
        type: "multiple-choice",
        question: {
          id: "Bahan alami yang memberi warna cokelat kemerahan khas pada Gudeg Jogja adalah…",
          en: "Which natural ingredient gives Yogyakarta Gudeg its signature reddish-brown color?",
        },
        options: [
          { id: "Daun pandan", en: "Pandan leaf" },
          { id: "Daun jati muda", en: "Young teak leaf" },
          { id: "Kunyit", en: "Turmeric" },
          { id: "Kluwek", en: "Kluwek nut" },
        ],
        correctIndex: 1,
        explanation: {
          id: "Daun jati muda direbus bersama nangka muda sehingga menghasilkan warna merah kecokelatan alami.",
          en: "Young teak leaves simmered with jackfruit naturally impart the deep mahogany color.",
        },
      },
      {
        id: "yo-q2",
        type: "visual-3d",
        question: {
          id: "Pendopo utama berlapis emas di dalam Keraton Yogyakarta bernama…",
          en: "What is the gilded main pavilion inside Yogyakarta Royal Palace called?",
        },
        options: [
          { id: "Bangsal Kencono", en: "Bangsal Kencono" },
          { id: "Rumah Kebaya", en: "Rumah Kebaya" },
          { id: "Sulah Nyanda", en: "Sulah Nyanda" },
          { id: "Imah Julang Ngapak", en: "Imah Julang Ngapak" },
        ],
        correctIndex: 0,
        explanation: {
          id: "Bangsal Kencono berarti 'Balai Emas' yang menjadi pusat upacara kenegaraan Keraton.",
          en: "Bangsal Kencono translates to 'Golden Pavilion'.",
        },
      },
      {
        id: "yo-q3",
        type: "multiple-choice",
        question: {
          id: "Garis imajiner Merapi – Tugu – Keraton – Panggung Krapyak yang diakui UNESCO pada 2023 disebut…",
          en: "What is the UNESCO-recognized Merapi–Tugu–Palace–Krapyak alignment called?",
        },
        options: [
          { id: "Sumbu Filosofis Yogyakarta", en: "Cosmological Axis of Yogyakarta" },
          { id: "Jalur Rempah", en: "Spice Route" },
          { id: "Poros Majapahit", en: "Majapahit Axis" },
          { id: "Tatar Parahyangan", en: "Parahyangan Axis" },
        ],
        correctIndex: 0,
        explanation: {
          id: "Sumbu Filosofis melambangkan perjalanan hidup manusia (Sangkan Paraning Dumadi).",
          en: "The Cosmological Axis symbolizes the human journey of origin and return.",
        },
      },
      {
        id: "yo-q4",
        type: "sound-guess",
        question: {
          id: "Perayaan tahunan Keraton Yogyakarta dengan menabuh gamelan pusaka di Masjid Gedhe disebut…",
          en: "Which annual royal celebration sounds heirloom gamelan at Masjid Gedhe?",
        },
        options: [
          { id: "Sekaten", en: "Sekaten" },
          { id: "Seren Taun", en: "Seren Taun" },
          { id: "Yadnya Kasada", en: "Yadnya Kasada" },
          { id: "Seba", en: "Seba" },
        ],
        correctIndex: 0,
        explanation: {
          id: "Sekaten ditutup oleh kirab Grebeg Maulud dengan Gunungan hasil bumi.",
          en: "Sekaten culminates in the Grebeg Maulud Gunungan procession.",
        },
      },
      {
        id: "yo-q5",
        type: "match",
        question: {
          id: "Baju tradisional pria Yogyakarta bermotif garis tenun lurik disebut…",
          en: "What is the traditional striped woven men's jacket of Yogyakarta called?",
        },
        options: [
          { id: "Pesa'an", en: "Pesa'an" },
          { id: "Surjan", en: "Surjan" },
          { id: "Pangsi", en: "Pangsi" },
          { id: "Sadariah", en: "Sadariah" },
        ],
        correctIndex: 1,
        explanation: {
          id: "Surjan lurik melambangkan kesederhanaan dan keteguhan hati.",
          en: "Lurik surjan reflects simplicity and steadiness of character.",
        },
      },
    ],
  },

  {
    slug: "jawa-timur",
    code: "ID-JI",
    name: { id: "Jawa Timur", en: "East Java" },
    capital: "Surabaya",
    island: "jawa",
    islandLabel: { id: "Jawa", en: "Java" },
    status: "available",
    greeting: {
      phrase: "Sugeng rawuh, Rek!",
      meaning: { id: "Sapaan hangat dan egaliter khas Jawa Timur", en: "Warm, egalitarian East Javanese welcome" },
      language: "Bahasa Jawa Timuran / Madura",
    },
    tagline: {
      id: "Bumi Majapahit, megahnya Reog Ponorogo, kawah Bromo, dan Rawon hitam gurih.",
      en: "Land of Majapahit, towering Reog Ponorogo, Mount Bromo rituals, and savory black Rawon.",
    },
    description: {
      id: "Jawa Timur kaya akan karakter budaya yang lugas dan ekspresif: mulai dari subkultur Arek, Mataraman, Osing Banyuwangi, Tengger Bromo, hingga Madura.",
      en: "East Java pulses with bold, expressive heritage spanning Arek, Mataraman, Osing of Banyuwangi, Tengger of Bromo, and Madurese traditions.",
    },
    themeColor: "#B3472A",
    accentColor: "#E8A938",
    landmarkType: "reog",
    landmarkName: { id: "Candi Bentar & Mahkota Reog", en: "Majapahit Gate & Reog Crown" },
    center3D: [1.65, 2.45],
    cameraOffset: [1.65, 3.8, 6.7],
    polygon2D: makeTilePolygon(1.65, 2.45, 1.05, 0.68, 0.08),
    houseHotspots: [
      {
        id: "atap-tikel",
        position: [0, 1.55, 0],
        title: { id: "Atap Tikel Balung (Osing)", en: "Tikel Balung Roof (Osing)" },
        description: {
          id: "Bentuk atap bersudut tegas khas suku Osing Banyuwangi dan Joglo Situbondo.",
          en: "Crisp multi-angled roof of the Osing and East Java Joglo.",
        },
      },
      {
        id: "bata-majapahit",
        position: [0.95, 0.55, 0.6],
        title: { id: "Inspirasi Terakota Majapahit", en: "Majapahit Terracotta Accent" },
        description: {
          id: "Sentuhan bata merah terakota yang terinspirasi arsitektur klasik Trowulan abad ke-14.",
          en: "Warm red-brick terracotta accents inspired by 14th-century Majapahit Trowulan.",
        },
      },
    ],
    items: [
      {
        id: "jatim-rumah",
        category: "rumah-adat",
        name: { id: "Joglo Situbondo & Rumah Osing", en: "Situbondo Joglo & Osing House" },
        summary: {
          id: "Arsitektur kayu Jawa Timur yang tegas dengan variasi atap Tikel Balung khas Banyuwangi.",
          en: "Distinctive East Javanese timber homes featuring Tikel Balung roof styles.",
        },
        funFact: {
          id: "Rumah adat Osing dibangun tanpa paku menggunakan pasak kayu (paju).",
          en: "Traditional Osing houses use removable wooden pegs instead of iron nails.",
        },
        source: "Disbudpar Jawa Timur",
        license: "CC BY-SA 4.0",
      },
      {
        id: "jatim-tari",
        category: "tarian",
        name: { id: "Reog Ponorogo & Tari Remo", en: "Reog Ponorogo & Remo Dance" },
        summary: {
          id: "Pertunjukan kolosal Reog Ponorogo dengan topeng Dadak Merak megah serta Tari Remo yang dinamis.",
          en: "Monumental Reog Ponorogo featuring the peacock-feather Dadak Merak mask, plus energetic Remo dance.",
        },
        funFact: {
          id: "Reog Ponorogo resmi masuk daftar Warisan Budaya Takbenda UNESCO pada Desember 2024.",
          en: "Reog Ponorogo was officially inscribed by UNESCO in December 2024.",
        },
        source: "UNESCO ICH 2024 & Kemdikbud",
        license: "CC BY-SA 4.0",
      },
      {
        id: "jatim-pakaian",
        category: "pakaian",
        name: { id: "Pesa'an Madura", en: "Madurese Pesa'an" },
        summary: {
          id: "Baju hitam longgar dengan kaus belang merah-putih dan odheng kepala.",
          en: "Loose black outer jacket over bold red-and-white striped shirt with odheng headwear.",
        },
        funFact: {
          id: "Garis merah-putih mencerminkan sikap jujur, berani, dan pekerja keras.",
          en: "The bold red-and-white stripes signify candor, bravery, and hard work.",
        },
        source: "Museum Mpu Tantular",
        license: "CC BY-SA 4.0",
      },
      {
        id: "jatim-kuliner",
        category: "kuliner",
        name: { id: "Rawon", en: "Rawon (Black Beef Soup)" },
        summary: {
          id: "Sup daging sapi berkuah hitam pekat dari buah kluwek (pucung), disajikan bersama tauge pendek dan telur asin.",
          en: "Rich dark beef soup colored with fermented kluwek nut, served with mung bean sprouts and salted egg.",
        },
        funFact: {
          id: "Rawon tercatat dalam prasasti kuno Jawa sejak abad ke-10 dengan nama 'rarawwan'.",
          en: "Mentioned in 10th-century Javanese inscriptions as 'rarawwan'.",
        },
        source: "WBTb Indonesia",
        license: "CC BY-SA 4.0",
      },
      {
        id: "jatim-musik",
        category: "alat-musik",
        name: { id: "Kendang Kempul & Angklung Caruk", en: "Kendang Kempul & Angklung Caruk" },
        summary: {
          id: "Musik ritmis khas Banyuwangi yang memadukan gamelan, biola, kendang dinamis, dan adu musikal angklung.",
          en: "Vibrant Banyuwangi rhythm combining gamelan, violin, kendang, and dueling bamboo angklung.",
        },
        funFact: {
          id: "Angklung Caruk dimainkan dalam format duel persahabatan antara dua grup musik.",
          en: "Angklung Caruk is performed as a friendly musical duel between two rival ensembles.",
        },
        source: "Disbudpar Banyuwangi",
        license: "CC BY-SA 4.0",
      },
      {
        id: "jatim-bahasa",
        category: "bahasa",
        name: { id: "Bahasa Jawa Timuran, Madura & Osing", en: "East Javanese, Madurese & Osing" },
        summary: {
          id: "Dialek Arekan yang akrab dan egaliter, bahasa Madura, serta bahasa Osing di Banyuwangi.",
          en: "Egalitarian Arekan Javanese, expressive Madurese, and the Osing language.",
        },
        funFact: {
          id: "Sapaan 'Rek' di Surabaya merupakan kependekan dari 'Arek'.",
          en: "Surabaya's friendly 'Rek' shortens 'Arek', meaning friend.",
        },
        source: "Balai Bahasa Jawa Timur",
        license: "CC BY-SA 4.0",
      },
      {
        id: "jatim-senjata",
        category: "senjata",
        name: { id: "Celurit", en: "Celurit" },
        summary: {
          id: "Bilah melengkung berbentuk bulan sabit khas Madura yang berakar dari perkakas pertanian.",
          en: "Crescent-shaped blade from Madura rooted in traditional agricultural tools.",
        },
        funFact: {
          id: "Kerap hadir sebagai properti tari dan simbol etos kerja petani.",
          en: "Featured in cultural performances as a symbol of agricultural diligence.",
        },
        source: "Museum Mpu Tantular",
        license: "CC BY-SA 4.0",
      },
      {
        id: "jatim-upacara",
        category: "upacara",
        name: { id: "Yadnya Kasada Bromo", en: "Yadnya Kasada Bromo" },
        summary: {
          id: "Upacara persembahan hasil bumi suku Tengger di bibir kawah Gunung Bromo.",
          en: "Sacred Tengger offering ritual at Mount Bromo's crater rim.",
        },
        funFact: {
          id: "Berakar dari legenda kesetiaan Roro Anteng dan Joko Seger sejak akhir era Majapahit.",
          en: "Honors the legend of Roro Anteng and Joko Seger.",
        },
        source: "WBTb Kemdikbudristek",
        license: "CC BY-SA 4.0",
      },
      {
        id: "jatim-wisata",
        category: "wisata",
        name: { id: "Gunung Bromo & Situs Trowulan", en: "Mount Bromo & Trowulan" },
        summary: {
          id: "Kaldera vulkanik Tengger Bromo serta situs ibu kota Kerajaan Majapahit di Mojokerto.",
          en: "Bromo's dramatic volcanic caldera and the red-brick Majapahit capital ruins of Trowulan.",
        },
        funFact: {
          id: "Gapura Wringin Lawang adalah contoh paling megah gerbang terbelah Candi Bentar abad ke-14.",
          en: "Wringin Lawang gate is a monumental 14th-century Candi Bentar split gate.",
        },
        source: "BPCB Jawa Timur",
        license: "CC BY-SA 4.0",
        location: "Probolinggo & Mojokerto",
      },
    ],
    quiz: [
      {
        id: "ji-q1",
        type: "multiple-choice",
        question: {
          id: "Bumbu utama yang membuat kuah Rawon khas Jawa Timur berwarna hitam pekat dan gurih adalah…",
          en: "Which ingredient gives East Java's Rawon soup its signature deep black color?",
        },
        options: [
          { id: "Daun jati", en: "Teak leaf" },
          { id: "Kluwek (pucung)", en: "Kluwek nut" },
          { id: "Kecap manis", en: "Sweet soy sauce" },
          { id: "Biji wijen hitam", en: "Black sesame" },
        ],
        correctIndex: 1,
        explanation: {
          id: "Kluwek memberi warna hitam pekat sekaligus rasa umami yang khas pada Rawon.",
          en: "Fermented kluwek nuts lend Rawon its dark color and rich umami.",
        },
      },
      {
        id: "ji-q2",
        type: "visual-3d",
        question: {
          id: "Kesenian megah asal Ponorogo dengan topeng kepala singa berhias bulu merak disebut…",
          en: "Which monumental Ponorogo performance features a towering lion-and-peacock headdress?",
        },
        options: [
          { id: "Reog Ponorogo", en: "Reog Ponorogo" },
          { id: "Ondel-ondel", en: "Ondel-ondel" },
          { id: "Wayang Golek", en: "Wayang Golek" },
          { id: "Tari Bedhaya", en: "Bedhaya Dance" },
        ],
        correctIndex: 0,
        explanation: {
          id: "Reog Ponorogo resmi masuk daftar Warisan Budaya Takbenda UNESCO pada Desember 2024.",
          en: "Reog Ponorogo was officially inscribed by UNESCO in December 2024.",
        },
      },
      {
        id: "ji-q3",
        type: "multiple-choice",
        question: {
          id: "Upacara persembahan hasil bumi suku Tengger di kawah Gunung Bromo disebut…",
          en: "What is the Tengger people's offering ceremony at Mount Bromo crater called?",
        },
        options: [
          { id: "Seren Taun", en: "Seren Taun" },
          { id: "Yadnya Kasada", en: "Yadnya Kasada" },
          { id: "Grebeg Maulud", en: "Grebeg Maulud" },
          { id: "Seba Baduy", en: "Seba Baduy" },
        ],
        correctIndex: 1,
        explanation: {
          id: "Yadnya Kasada digelar setiap bulan Kasada dalam penanggalan suku Tengger.",
          en: "Yadnya Kasada is held every Kasada month in the Tengger calendar.",
        },
      },
      {
        id: "ji-q4",
        type: "sound-guess",
        question: {
          id: "Kesenian musik bambu asal Banyuwangi yang dimainkan dalam format adu musikal dua grup disebut…",
          en: "Which Banyuwangi bamboo music tradition features two ensembles in a friendly musical duel?",
        },
        options: [
          { id: "Angklung Caruk", en: "Angklung Caruk" },
          { id: "Gambang Kromong", en: "Gambang Kromong" },
          { id: "Dogdog Lojor", en: "Dogdog Lojor" },
          { id: "Gamelan Sekaten", en: "Sekaten Gamelan" },
        ],
        correctIndex: 0,
        explanation: {
          id: "Kata 'caruk' berarti bertemu atau bersahutan, khas kreativitas musik masyarakat Osing.",
          en: "'Caruk' means meeting in musical call-and-response, signature to Osing Banyuwangi.",
        },
      },
      {
        id: "ji-q5",
        type: "match",
        question: {
          id: "Pakaian adat khas Madura dengan kaus belang merah-putih dan baju hitam longgar disebut…",
          en: "What is the traditional Madurese attire with red-and-white stripes called?",
        },
        options: [
          { id: "Surjan", en: "Surjan" },
          { id: "Pesa'an", en: "Pesa'an" },
          { id: "Pangsi", en: "Pangsi" },
          { id: "Beskap", en: "Beskap" },
        ],
        correctIndex: 1,
        explanation: {
          id: "Pesa'an melambangkan keberanian, keterbukaan, dan kebanggaan masyarakat Madura.",
          en: "Pesa'an embodies Madurese bravery, openness, and pride.",
        },
      },
    ],
  },
];
