/**
 * Sanity CMS Schema Definitions (Phase 0 Blueprint)
 * Matches Section 6 of konsep_v2_nusantara_go.md.
 * Ready to be connected to a Sanity Studio project when content scales to 38 provinces.
 */

export const provinceSchema = {
  name: "province",
  title: "Provinsi",
  type: "document",
  fields: [
    { name: "slug", title: "Slug", type: "slug", options: { source: "name.id" } },
    { name: "code", title: "Kode ISO/BPS", type: "string" },
    {
      name: "name",
      title: "Nama Provinsi",
      type: "object",
      fields: [
        { name: "id", title: "Bahasa Indonesia", type: "string" },
        { name: "en", title: "English", type: "string" },
      ],
    },
    { name: "capital", title: "Ibu Kota", type: "string" },
    { name: "island", title: "Pulau / Gugus", type: "string" },
    {
      name: "status",
      title: "Status Publikasi",
      type: "string",
      options: { list: ["available", "coming_soon"] },
    },
    { name: "themeColor", title: "Warna Tema (Hex)", type: "string" },
    { name: "landmarkModel", title: "Model 3D Landmark (.glb)", type: "file" },
    { name: "greetingAudio", title: "Audio Sapaan Daerah", type: "file" },
    { name: "musicAudio", title: "Cuplikan Musik Tradisional", type: "file" },
  ],
};

export const cultureItemSchema = {
  name: "cultureItem",
  title: "Item Budaya",
  type: "document",
  fields: [
    { name: "province", title: "Provinsi", type: "reference", to: [{ type: "province" }] },
    {
      name: "category",
      title: "Kategori",
      type: "string",
      options: {
        list: [
          "rumah-adat",
          "tarian",
          "pakaian",
          "kuliner",
          "alat-musik",
          "bahasa",
          "senjata",
          "upacara",
          "wisata",
        ],
      },
    },
    {
      name: "name",
      title: "Nama Item",
      type: "object",
      fields: [
        { name: "id", title: "Indonesia", type: "string" },
        { name: "en", title: "English", type: "string" },
      ],
    },
    {
      name: "summary",
      title: "Deskripsi Singkat",
      type: "object",
      fields: [
        { name: "id", title: "Indonesia", type: "text" },
        { name: "en", title: "English", type: "text" },
      ],
    },
    { name: "source", title: "Sumber Referensi (Wajib)", type: "string" },
    { name: "license", title: "Lisensi Media (Wajib)", type: "string" },
    { name: "model3D", title: "Model 3D Opsional (.glb)", type: "file" },
  ],
};

export const quizSchema = {
  name: "quiz",
  title: "Kuis Provinsi",
  type: "document",
  fields: [
    { name: "province", title: "Provinsi", type: "reference", to: [{ type: "province" }] },
    {
      name: "questions",
      title: "Daftar Soal",
      type: "array",
      of: [{ type: "object", fields: [{ name: "type", type: "string" }] }],
    },
  ],
};

export const festivalEventSchema = {
  name: "festivalEvent",
  title: "Kalender Festival",
  type: "document",
  fields: [
    { name: "province", title: "Provinsi", type: "reference", to: [{ type: "province" }] },
    { name: "isApproximate", title: "Tanggal Perkiraan", type: "boolean" },
    { name: "source", title: "Sumber Resmi", type: "string" },
  ],
};

export const schemaTypes = [
  provinceSchema,
  cultureItemSchema,
  quizSchema,
  festivalEventSchema,
];
