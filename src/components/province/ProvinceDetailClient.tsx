"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowLeft, Award, BookOpen, MapPin, Volume2 } from "lucide-react";
import { CategoryKey, Province } from "@/types/culture";
import { getProvincesByIsland } from "@/data/provinces";
import { useNusantaraStore } from "@/store/useNusantaraStore";
import { CATEGORY_LABELS, UI_COPY, t } from "@/lib/i18n";
import { playProvinceChime } from "@/lib/sound";
import { NusantaraHeader } from "@/components/layout/NusantaraHeader";
import { QuizModal } from "@/components/passport/QuizModal";
import { PassportModal } from "@/components/passport/PassportModal";

gsap.registerPlugin(useGSAP);

const HouseViewer3D = dynamic(
  () =>
    import("@/components/province/HouseViewer3D").then((m) => m.HouseViewer3D),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[380px] items-center justify-center rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-sm text-[var(--ink-muted)]">
        Memuat diorama arsitektur 3D…
      </div>
    ),
  }
);

const ALL_CATEGORIES: CategoryKey[] = [
  "rumah-adat",
  "tarian",
  "pakaian",
  "kuliner",
  "alat-musik",
  "bahasa",
  "senjata",
  "upacara",
  "wisata",
];

export function ProvinceDetailClient({ province }: { province: Province }) {
  const {
    hasHydrated,
    locale,
    themeMode,
    soundEnabled,
    stamps,
    earnStamp,
    exportBackupCode,
    importBackupCode,
  } = useNusantaraStore();

  const [activeCategory, setActiveCategory] = useState<CategoryKey | "all">(
    "all"
  );
  const [quizOpen, setQuizOpen] = useState(false);
  const [passportOpen, setPassportOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const safeLocale = hasHydrated ? locale : "id";
  const safeTheme = hasHydrated ? themeMode : "day";
  const safeStamps = hasHydrated ? stamps : {};

  useEffect(() => {
    document.documentElement.dataset.theme = safeTheme;
  }, [safeTheme]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".culture-entry",
          { y: 14, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.42,
            stagger: 0.045,
            ease: "power2.out",
            clearProps: "transform,opacity",
          }
        );
      });
    },
    { scope: containerRef, dependencies: [activeCategory], revertOnUpdate: true }
  );

  const visibleItems =
    activeCategory === "all"
      ? province.items
      : province.items.filter((item) => item.category === activeCategory);

  const siblingProvinces = getProvincesByIsland(province.island).filter(
    (p) => p.slug !== province.slug
  );
  const hasStamp = Boolean(safeStamps[province.slug]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[var(--bg-canvas)]">
      <NusantaraHeader onOpenPassport={() => setPassportOpen(true)} />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <Link
          href="/?map=1"
          className="inline-flex items-center gap-2 text-xs font-medium text-[var(--ink-secondary)] transition-colors hover:text-[var(--accent)]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {t(UI_COPY.backToMap, safeLocale)}
        </Link>

        {/* Editorial Province Hero */}
        <section className="mt-6 grid grid-cols-1 items-end gap-6 border-b border-[var(--border-subtle)] pb-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--ink-muted)]">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: province.themeColor }}
              />
              <span>
                {province.capital} · {province.islandLabel[safeLocale]} ·{" "}
                {province.code}
              </span>
            </div>

            <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-[var(--ink-primary)] sm:text-5xl">
              {province.name[safeLocale]}
            </h1>

            <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--ink-secondary)]">
              {province.description[safeLocale]}
            </p>
          </div>

          <div className="flex flex-col gap-3 lg:col-span-4 lg:items-end">
            <div className="flex w-full items-center justify-between gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-3">
              <div>
                <div className="font-serif text-base font-semibold text-[var(--ink-primary)]">
                  “{province.greeting.phrase}”
                </div>
                <div className="text-xs text-[var(--ink-muted)]">
                  {province.greeting.language}
                </div>
              </div>
              <button
                type="button"
                onClick={() =>
                  playProvinceChime(true, province.name.id.length)
                }
                aria-label="Play regional greeting chime"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--bg-surface-strong)] text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-[#F7F2E8]"
              >
                <Volume2 className="h-4 w-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => setQuizOpen(true)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-3 text-sm font-medium text-[#F7F2E8] transition-colors hover:bg-[var(--accent-hover)]"
            >
              <Award className="h-4 w-4" />
              {hasStamp
                ? `${t(UI_COPY.stampEarned, safeLocale)} · ${
                    safeLocale === "id" ? "Ulangi kuis" : "Replay quiz"
                  }`
                : t(UI_COPY.takeQuiz, safeLocale)}
            </button>
          </div>
        </section>

        {/* Interactive 3D Traditional Architecture Diorama */}
        <section className="mt-10">
          <HouseViewer3D
            province={province}
            locale={safeLocale}
            isNight={safeTheme === "night"}
          />
        </section>

        {/* 9 Cultural Categories — Asymmetric Magazine Layout */}
        <section className="mt-14">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="font-serif text-2xl font-bold tracking-tight text-[var(--ink-primary)] sm:text-3xl">
              {safeLocale === "id"
                ? `Khazanah Budaya ${province.name.id}`
                : `Cultural Heritage of ${province.name.en}`}
            </h2>
            <span className="text-xs text-[var(--ink-muted)] tabular-nums">
              {visibleItems.length}{" "}
              {safeLocale === "id" ? "entri terkurasi" : "curated entries"}
            </span>
          </div>

          <div
            role="tablist"
            aria-label="Cultural categories"
            className="mt-5 flex flex-wrap gap-2"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === "all"}
              onClick={() => setActiveCategory("all")}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                activeCategory === "all"
                  ? "bg-[#231A14] text-[#F7F2E8]"
                  : "border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]"
              }`}
            >
              {t(UI_COPY.allCategories, safeLocale)} ({province.items.length})
            </button>
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-[var(--accent)] text-[#F7F2E8]"
                    : "border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]"
                }`}
              >
                {CATEGORY_LABELS[cat][safeLocale]}
              </button>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
            {visibleItems.map((item, idx) => {
              const isSpotlight = idx === 0 && visibleItems.length > 2;
              return (
                <article
                  key={item.id}
                  className={`culture-entry flex flex-col justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 ${
                    isSpotlight ? "md:col-span-2 md:p-7" : ""
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-semibold tracking-wider text-[var(--accent)] uppercase">
                        {CATEGORY_LABELS[item.category][safeLocale]}
                      </span>
                      {item.location && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-[var(--ink-muted)]">
                          <MapPin className="h-3 w-3" />
                          {item.location}
                        </span>
                      )}
                    </div>

                    <h3
                      className={`mt-2 font-serif font-semibold text-[var(--ink-primary)] ${
                        isSpotlight ? "text-2xl sm:text-3xl" : "text-xl"
                      }`}
                    >
                      {item.name[safeLocale]}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-[var(--ink-secondary)]">
                      {item.summary[safeLocale]}
                    </p>

                    <div className="mt-3.5 rounded-lg bg-[var(--bg-canvas)]/70 p-3 text-xs leading-relaxed text-[var(--ink-secondary)]">
                      <strong className="font-semibold text-[var(--ink-primary)]">
                        {safeLocale === "id" ? "Tahukah kamu? " : "Did you know? "}
                      </strong>
                      {item.funFact[safeLocale]}
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--border-subtle)] pt-3 text-[11px] text-[var(--ink-muted)]">
                    <span className="inline-flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      {item.source}
                    </span>
                    <span>{item.license}</span>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Neighboring Provinces in Same Island Region */}
        {siblingProvinces.length > 0 && (
          <section className="mt-16 border-t border-[var(--border-subtle)] pt-10">
            <h2 className="font-serif text-lg font-semibold text-[var(--ink-primary)]">
              {safeLocale === "id"
                ? `Provinsi lain di ${province.islandLabel.id}`
                : `More provinces in ${province.islandLabel.en}`}
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {siblingProvinces.map((p) => (
                <Link
                  key={p.slug}
                  href={`/provinsi/${p.slug}`}
                  className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-2 text-sm font-medium text-[var(--ink-primary)] transition-colors hover:border-[var(--accent)]"
                >
                  {p.name[safeLocale]}
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <QuizModal
        province={quizOpen ? province : null}
        locale={safeLocale}
        soundEnabled={soundEnabled}
        onClose={() => setQuizOpen(false)}
        onPass={(slug, score, total) => earnStamp(slug, score, total)}
      />

      <PassportModal
        open={passportOpen}
        locale={safeLocale}
        stamps={safeStamps}
        onClose={() => setPassportOpen(false)}
        onExportCode={exportBackupCode}
        onImportCode={importBackupCode}
        onSelectProvinceSlug={(slug) => {
          window.location.href = `/provinsi/${slug}`;
        }}
      />
    </div>
  );
}
