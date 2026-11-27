# Nusantara.go — Atlas Budaya 3D Indonesia

**Nusantara.go** adalah web interaktif edukasi budaya Indonesia bergaya *"Diorama Nusantara"* yang menampilkan **seluruh 38 provinsi Indonesia** dari Sabang sampai Merauke dalam peta 3D interaktif, lengkap dengan viewer arsitektur rumah adat 3D, kuis stempel, dan Paspor Budaya Nusantara.

## Fitur Utama

- **Diorama 3D Nusantara (38 Provinsi):** Seluruh 38 provinsi (termasuk 4 provinsi pemekaran Papua 2022) tampil sebagai lempeng 3D di atas shader laut bermotif batik *Kawung* & *Parang*, dengan mode **Siang / Malam**, 15 arketipe landmark 3D, **Dock 7 Gugus Pulau**, lensa filter kategori, dan kamera *fly-to* halus berbasis GSAP.
- **Peta 2D SVG Cadangan:** Mode hemat daya dan aksesibel dengan navigasi keyboard penuh, plus fallback otomatis bila WebGL tidak tersedia.
- **Halaman Detail 38 Provinsi (SSG):** 342 entri budaya dwibahasa (**ID + EN**) mencakup 9 kategori (*Rumah Adat, Tarian, Pakaian Adat, Kuliner, Alat Musik, Bahasa Daerah, Senjata Tradisional, Upacara & Tradisi, Wisata Budaya*) lengkap dengan sumber referensi.
- **Viewer Arsitektur 3D Interaktif:** Model rumah adat 3D yang bisa diputar/di-zoom lengkap dengan pin emas *hotspot* penjelasan struktur bangunan.
- **Panggung Bunyi Nusantara:** Sintesis nada pentatonis Web Audio (*Angklung, Gamelan, Gambang/Kolintang, Tifa/Kendang*) tanpa autoplay.
- **Kuis & Paspor Budaya 38 Stempel:** Kuis 5 soal per provinsi, progres tersimpan lokal di browser tanpa akun + fitur **Ekspor/Impor Kode Cadangan**.
- **Pencarian Fuzzy & Kalender Festival Nasional:** Pencarian cepat `Fuse.js` lintas 38 provinsi dan 342 item budaya, serta 14 festival adat Nusantara.

## Tech Stack

- **Framework:** Next.js 15 (App Router, SSG) + TypeScript
- **Styling:** Tailwind CSS v4 + desain token Nusantara (*Fraunces* & *Plus Jakarta Sans*)
- **3D & Motion:** Three.js, React Three Fiber, `@react-three/drei`, GSAP + ScrollTrigger, Framer Motion, Lenis
- **State & Search:** Zustand (`persist`), Fuse.js, Web Audio API
- **CMS Blueprint:** Schema Sanity CMS siap pakai di `sanity/schemas/`

## Menjalankan Secara Lokal

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

Untuk production build:

```bash
npm run build
npm run start
```
