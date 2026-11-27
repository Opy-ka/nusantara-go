# 🇮🇩 Rencana Pengembangan Website Peta Budaya Indonesia
**Tujuan:** Lomba `budaya.go`  
**Konsep Utama:** Platform interaktif berbasis peta Indonesia (bergaya infografis/clean) untuk menjelajahi keragaman budaya (rumah adat, tarian, hingga destinasi wisata) di setiap provinsi melalui interaksi *hover* dan *click*.

---

## 💡 Evaluasi Konsep
* **Kekuatan:** 
  * **Interaktif & Edukatif:** Mengubah pengguna dari pembaca pasif menjadi penjelajah digital yang aktif.
  * **Visual:** Peta merupakan medium paling intuitif untuk merepresentasikan persebaran geografis budaya.
  * **Terorganisir:** Mampu merangkum banyak informasi (rumah adat, wisata, tradisi) dalam satu tampilan tanpa terasa penuh sesak.
* **Tantangan & Solusi:**
  * **Performa & Beban Gambar:** Menggunakan optimasi gambar modern (`.webp` atau fitur bawaan Next.js) agar *loading* tetap cepat.
  * **Responsivitas Mobile:** Menyesuaikan ukuran komponen peta SVG dan *panel* informasi agar tetap nyaman diakses lewat layar ponsel.

---

## 🛠️ Rekomendasi Tech Stack (Arsitektur Final)

### 1. Frontend & Styling
* **Next.js (React):** Framework utama untuk performa tinggi, ramah SEO, dan fitur *Image Optimization* bawaan yang sangat berguna untuk memuat banyak foto budaya.
* **Tailwind CSS:** Untuk mempercepat proses *styling*, mengatur palet warna peta, dan membuat desain antarmuka (*UI*) yang modern serta responsif.

### 2. Peta Interaktif & Visual
* **`react-simple-maps`:** Library peta berbasis SVG. Sangat cocok untuk konsep peta bergaya ilustrasi/infografis (tidak terlalu detail seperti peta jalan raya) karena setiap provinsi dapat diwarnai dengan mudah menggunakan CSS/Tailwind dan mendukung penempatan ikon di atasnya.
* **Format Data Peta (TopoJSON / GeoJSON):** Gunakan file **Indonesia TopoJSON** (versi lebih ringan dari GeoJSON) dengan tingkat detail rendah (*low-poly*) agar tampilan peta terlihat estetik dan ringan dimuat.
* **Lucide React & Custom SVG:** Digunakan untuk ikon umum antarmuka serta ikon representatif budaya (seperti siluet Rumah Gadang, Candi, atau alat musik) yang diletakkan di titik koordinat provinsi (`<Marker />`).

### 3. Animasi & Interaksi
* **Framer Motion:** Untuk memberikan animasi transisi yang halus (*smooth*), seperti efek *fade-in* pada panel detail budaya, efek *zoom-in* saat provinsi diklik, atau animasi melayang pada ikon.
* **Tippy.js (Opsional):** Untuk menampilkan *tooltip* nama provinsi secara instan saat kursor melakukan *hover*.

### 4. Backend & Penyimpanan Data
* **Supabase / Headless CMS (Strapi/Contentful):** Untuk menyimpan database informasi budaya (teks deskripsi) dan penyimpanan gambar (*Storage*). *(Catatan: Untuk tahap prototipe awal, data juga bisa disimpan dalam file `data.json` statis).*
* **Deployment:** **Vercel** (gratis, cepat, dan terintegrasi langsung dengan Next.js).

---

## 🎨 Gambaran Alur & Pengalaman Pengguna (UX)
1. **Tampilan Awal:** Pengguna disuguhkan peta Indonesia bergaya modern dengan warna dasar lembut (pastel/monokrom) disertai ikon-ikon budaya representatif yang melayang di atas pulau-pulau besar.
2. **Interaksi Hover:** Saat kursor diarahkan ke suatu provinsi, warna provinsi tersebut berubah menjadi lebih cerah/kontras dan memunculkan nama provinsinya.
3. **Interaksi Click:** Ketika provinsi ditekan, peta akan melakukan fokus/*zoom* ringan ke area tersebut, lalu memunculkan *sidebar* atau *modal* berisi galeri foto rumah adat, kesenian, dan rekomendasi tempat wisata lokal.
4. **Fitur Tambahan (Pengembangan Lanjut):** Kolom pencarian cepat (misal: mencari "Rendang" atau "Toraja" yang otomatis menyorot provinsi asalnya di peta).

---

## 🚀 Strategi Eksekusi Bertahap
1. **Tahap 1 (Persiapan Aset & Data):** Kumpulkan file TopoJSON provinsi Indonesia, susun struktur data budaya (mulai dari 5–7 provinsi representatif terlebih dahulu sebagai sampel), dan siapkan aset ikon SVG.
2. **Tahap 2 (Setup Peta):** Integrasikan `react-simple-maps` di Next.js, atur pewarnaan dasar, efek *hover*, dan penempatan `<Marker />` ikon.
3. **Tahap 3 (Integrasi Konten & Animasi):** Hubungkan interaksi klik pada provinsi dengan panel informasi dinamis menggunakan Framer Motion.
4. **Tahap 4 (Optimasi & Rilis):** Pastikan tampilan responsif di perangkat *mobile*, kompres seluruh aset gambar, dan *deploy* ke Vercel.