"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ArrowRight,
  Award,
  Calendar,
  Compass,
  MapPin,
  Music,
  RotateCcw,
  Shuffle,
  Sparkles,
  Volume2,
} from "lucide-react";
import {
  ALL_PROVINCES,
  ISLAND_REGIONS,
  TOTAL_INDONESIA_PROVINCES,
  getCultureOfTheDay,
  getProvincesByIsland,
} from "@/data/provinces";
import { NATIONAL_FESTIVALS } from "@/data/festivals";
import { IslandKey, Province } from "@/types/culture";
import { useNusantaraStore } from "@/store/useNusantaraStore";
import { CATEGORY_LABELS, UI_COPY, t } from "@/lib/i18n";
import {
  playHoverTone,
  playInstrumentPreview,
  playProvinceChime,
} from "@/lib/sound";
import { NusantaraHeader } from "@/components/layout/NusantaraHeader";
import { WelcomeMenu } from "@/components/home/WelcomeMenu";
import { ProvinceDrawer } from "@/components/map/ProvinceDrawer";
import { Map2DFallback } from "@/components/diorama/Map2DFallback";
import { WebGLErrorBoundary } from "@/components/diorama/WebGLErrorBoundary";
import { QuizModal } from "@/components/passport/QuizModal";
import { PassportModal } from "@/components/passport/PassportModal";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const DioramaCanvas = dynamic(
  () =>
    import("@/components/diorama/DioramaCanvas").then((m) => m.DioramaCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full flex-col items-center justify-center bg-[#1B4D5C] text-[#F7F2E8]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#D49B35] border-t-transparent" />
        <p className="mt-3 font-serif text-sm tracking-wide">
          Menyiapkan Diorama Nusantara 3D (38 Provinsi)…
        </p>
      </div>
    ),
  }
);

const SOUNDPAD_ITEMS = [
  {
    id: "angklung" as const,
    name: "Angklung",
    origin: { id: "Jawa Barat", en: "West Java" },
    note: { id: "Tremolo bambu gotong royong", en: "Cooperative bamboo tremolo" },
  },
  {
    id: "gamelan" as const,
    name: "Gamelan",
    origin: { id: "Jawa & Bali", en: "Java & Bali" },
    note: { id: "Resonansi perunggu Slendro", en: "Bronze Slendro resonance" },
  },
  {
    id: "gambang" as const,
    name: "Gambang / Kolintang",
    origin: { id: "Betawi & Minahasa", en: "Betawi & Minahasa" },
    note: { id: "Bilah kayu pentatonis cerah", en: "Bright wooden pentatonic bars" },
  },
  {
    id: "kendang" as const,
    name: "Tifa & Kendang",
    origin: { id: "Maluku, Papua & Nusantara", en: "Maluku, Papua & Beyond" },
    note: { id: "Detak ritmis perkusi adat", en: "Rhythmic ceremonial drum pulse" },
  },
];

export function HomeClient() {
  const {
    hasHydrated,
    locale,
    themeMode,
    mapMode,
    soundEnabled,
    introSeen,
    activeIsland,
    stamps,
    toggleLocale,
    toggleThemeMode,
    markIntroSeen,
    setActiveIsland,
    earnStamp,
    exportBackupCode,
    importBackupCode,
  } = useNusantaraStore();

  const [menuOpen, setMenuOpen] = useState(true);
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(
    null
  );
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [explorerIsland, setExplorerIsland] = useState<IslandKey>("sumatra");
  const [festivalFilter, setFestivalFilter] = useState<IslandKey | "all">("all");
  const [quizProvince, setQuizProvince] = useState<Province | null>(null);
  const [passportOpen, setPassportOpen] = useState(false);

  const pageRef = useRef<HTMLDivElement>(null);
  const mapSectionRef = useRef<HTMLElement>(null);
  const directoryRef = useRef<HTMLElement>(null);

  const safeLocale = hasHydrated ? locale : "id";
  const safeTheme = hasHydrated ? themeMode : "day";
  const safeMapMode = hasHydrated ? mapMode : "3d";
  const safeStamps = hasHydrated ? stamps : {};
  const isNight = safeTheme === "night";

  const cultureToday = useMemo(() => getCultureOfTheDay(), []);
  const explorerProvinces = useMemo(
    () => getProvincesByIsland(explorerIsland),
    [explorerIsland]
  );
  const explorerMeta = ISLAND_REGIONS.find((r) => r.key === explorerIsland)!;

  const visibleFestivals = useMemo(
    () =>
      festivalFilter === "all"
        ? NATIONAL_FESTIVALS
        : NATIONAL_FESTIVALS.filter((f) => f.island === festivalFilter),
    [festivalFilter]
  );

  useEffect(() => {
    document.documentElement.dataset.theme = safeTheme;
  }, [safeTheme]);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("map") === "1"
    ) {
      setMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    const lenis = new Lenis({ duration: 1.0, smoothWheel: true });
    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".reveal-section", {
          y: 22,
          opacity: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: "power2.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: ".editorial-below",
            start: "top 86%",
            once: true,
          },
        });
      });
    },
    { scope: pageRef }
  );

  const handleSelectBySlug = (slug: string) => {
    const found = ALL_PROVINCES.find((p) => p.slug === slug);
    if (found) {
      setActiveIsland(found.island);
      setSelectedProvince(found);
      playProvinceChime(soundEnabled, found.name.id.length);
      mapSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSurpriseMe = () => {
    const pool = ALL_PROVINCES.filter(
      (p) => p.slug !== selectedProvince?.slug
    );
    const pick = pool[Math.floor(Math.random() * pool.length)];
    if (pick) {
      setActiveIsland(pick.island);
      setSelectedProvince(pick);
      playProvinceChime(soundEnabled, pick.name.id.length);
      mapSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleHoverProvince = (slug: string | null) => {
    setHoveredSlug(slug);
    if (slug) {
      const idx = ALL_PROVINCES.findIndex((p) => p.slug === slug);
      playHoverTone(soundEnabled, idx >= 0 ? idx : 0);
    }
  };

  const hoveredProvince = useMemo(
    () => (hoveredSlug ? ALL_PROVINCES.find((p) => p.slug === hoveredSlug) : null),
    [hoveredSlug]
  );

  const activeRegionLabel = selectedProvince
    ? `${selectedProvince.name[safeLocale]} · ${selectedProvince.capital}`
    : hoveredProvince
    ? `${hoveredProvince.name[safeLocale]} · ${hoveredProvince.islandLabel[safeLocale]}`
    : activeIsland !== "all"
    ? ISLAND_REGIONS.find((r) => r.key === activeIsland)?.name[safeLocale] ?? "Nusantara"
    : safeLocale === "id"
    ? "Kepulauan Indonesia · 38 Provinsi"
    : "Indonesian Archipelago · 38 Provinces";

  return (
    <div ref={pageRef} className="min-h-screen bg-[var(--bg-canvas)]">
      <NusantaraHeader
        onSelectProvinceSlug={handleSelectBySlug}
        onOpenPassport={() => setPassportOpen(true)}
      />

      {/* Full-Bleed Unobstructed 3D Archipelago Stage */}
      <section
        ref={mapSectionRef}
        className="relative h-[82vh] min-h-[540px] max-h-[820px] w-full border-b border-[var(--border-subtle)]"
      >
        {safeMapMode === "3d" ? (
          <WebGLErrorBoundary
            fallback={
              <Map2DFallback
                locale={safeLocale}
                isNight={isNight}
                activeIsland={activeIsland}
                selectedProvince={selectedProvince}
                stamps={safeStamps}
                onSelectProvince={(prov) => {
                  setSelectedProvince(prov);
                  setActiveIsland(prov.island);
                  playProvinceChime(soundEnabled, prov.name.id.length);
                }}
              />
            }
          >
            <DioramaCanvas
              locale={safeLocale}
              isNight={isNight}
              activeIsland={activeIsland}
              activeCategory="all"
              selectedProvince={selectedProvince}
              stamps={safeStamps}
              playIntro={hasHydrated && !introSeen}
              onIntroFinished={markIntroSeen}
              onSelectProvince={(prov) => {
                setSelectedProvince(prov);
                if (prov) {
                  setActiveIsland("all");
                  playProvinceChime(soundEnabled, prov.name.id.length);
                }
              }}
              onHoverProvince={handleHoverProvince}
            />
          </WebGLErrorBoundary>
        ) : (
          <Map2DFallback
            locale={safeLocale}
            isNight={isNight}
            activeIsland={activeIsland}
            selectedProvince={selectedProvince}
            stamps={safeStamps}
            onSelectProvince={(prov) => {
              setSelectedProvince(prov);
              setActiveIsland(prov.island);
              playProvinceChime(soundEnabled, prov.name.id.length);
            }}
          />
        )}

        {/* Sleek Artisan Compass Navigator HUD (replaces old top-left box, zero island obstruction) */}
        <div className="pointer-events-none absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2">
          <div className="pointer-events-auto flex items-center gap-2.5 rounded-full border border-white/15 bg-[#1B1410]/80 py-1.5 pr-3.5 pl-2 text-[#F7F2E8] shadow-lg backdrop-blur-md">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#D49B35]/20 text-[#F2BC52]">
              <Compass
                className={`h-4 w-4 transition-transform duration-500 ${
                  selectedProvince || hoveredProvince ? "rotate-45" : ""
                }`}
              />
            </span>
            <div className="leading-tight">
              <div className="text-[10px] font-medium tracking-wider text-[#D49B35] uppercase">
                {safeLocale === "id" ? "Navigasi Peta" : "Map Navigator"}
              </div>
              <div className="text-xs font-semibold">{activeRegionLabel}</div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="pointer-events-auto inline-flex h-9 items-center gap-1.5 rounded-full border border-white/15 bg-[#1B1410]/75 px-3.5 text-xs font-medium text-[#F7F2E8] shadow-md backdrop-blur-md transition-colors hover:bg-[#1B1410]"
          >
            {safeLocale === "id" ? "Menu Utama" : "Main Menu"}
          </button>

          <button
            type="button"
            onClick={handleSurpriseMe}
            className="pointer-events-auto inline-flex h-9 items-center gap-1.5 rounded-full bg-[var(--accent)] px-3.5 text-xs font-medium text-[#F7F2E8] shadow-md transition-colors hover:bg-[var(--accent-hover)]"
          >
            <Shuffle className="h-3.5 w-3.5" />
            <span>{t(UI_COPY.ctaSurprise, safeLocale)}</span>
          </button>

          {(selectedProvince || activeIsland !== "all") && (
            <button
              type="button"
              onClick={() => {
                setSelectedProvince(null);
                setActiveIsland("all");
              }}
              className="pointer-events-auto inline-flex h-9 items-center gap-1.5 rounded-full border border-white/15 bg-[#1B1410]/75 px-3 text-xs font-medium text-[#F2BC52] shadow-md backdrop-blur-md transition-colors hover:bg-[#1B1410]"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">
                {t(UI_COPY.resetCamera, safeLocale)}
              </span>
            </button>
          )}
        </div>

        <ProvinceDrawer
          province={selectedProvince}
          locale={safeLocale}
          hasStamp={Boolean(selectedProvince && safeStamps[selectedProvince.slug])}
          onClose={() => setSelectedProvince(null)}
          onOpenQuiz={(prov) => setQuizProvince(prov)}
        />
      </section>

      {/* Non-Monotonous Editorial Content Below the Fold */}
      <main className="editorial-below mx-auto max-w-7xl space-y-24 px-4 py-16 sm:px-6">
        {/* SECTION 1: Asymmetric Magazine Feature (Culture of the Day) + Interactive Pentatonic Soundpad */}
        <section className="reveal-section grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-8 lg:col-span-7">
            {/* Subtle Batik Corner Filigree */}
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute -top-6 -right-6 h-36 w-36 opacity-[0.07] text-[var(--ink-primary)]"
              viewBox="0 0 120 120"
              fill="currentColor"
            >
              <circle cx="60" cy="30" r="18" />
              <circle cx="60" cy="90" r="18" />
              <circle cx="30" cy="60" r="18" />
              <circle cx="90" cy="60" r="18" />
            </svg>

            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-[var(--accent)]">
                <Sparkles className="h-4 w-4" />
                <span>{t(UI_COPY.cultureOfDay, safeLocale)}</span>
                <span className="text-[var(--ink-muted)]">·</span>
                <span className="text-[var(--ink-muted)]">
                  {CATEGORY_LABELS[cultureToday.item.category][safeLocale]}
                </span>
              </div>

              <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[var(--ink-primary)] sm:text-4xl">
                {cultureToday.item.name[safeLocale]}
              </h2>
              <p className="mt-1 text-xs font-medium text-[var(--ink-muted)]">
                {cultureToday.province.name[safeLocale]} ·{" "}
                {cultureToday.province.islandLabel[safeLocale]}
              </p>

              <p className="mt-4 text-sm leading-relaxed text-[var(--ink-secondary)] sm:text-base">
                {cultureToday.item.summary[safeLocale]}
              </p>

              <div className="mt-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)]/75 p-4 text-xs leading-relaxed text-[var(--ink-secondary)]">
                <strong className="font-semibold text-[var(--ink-primary)]">
                  {safeLocale === "id" ? "Fakta unik: " : "Fun fact: "}
                </strong>
                {cultureToday.item.funFact[safeLocale]}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-subtle)] pt-4">
              <span className="text-[11px] text-[var(--ink-muted)]">
                {cultureToday.item.source}
              </span>
              <Link
                href={`/provinsi/${cultureToday.province.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)] hover:underline"
              >
                <span>
                  {safeLocale === "id"
                    ? `Jelajahi ${cultureToday.province.name.id}`
                    : `Explore ${cultureToday.province.name.en}`}
                </span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Interactive Pentatonic Soundpad (breaks layout monotony) */}
          <div className="flex flex-col justify-between rounded-2xl border border-[var(--border-subtle)] bg-[#231A14] p-6 text-[#F7F2E8] sm:p-7 lg:col-span-5">
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-xs font-medium text-[#F2BC52]">
                  <Music className="h-4 w-4" />
                  {safeLocale === "id"
                    ? "Panggung Bunyi Nusantara"
                    : "Nusantara Soundpad"}
                </span>
                <span className="text-[11px] text-[#C5B7A6]">Web Audio</span>
              </div>

              <h3 className="mt-2 font-serif text-2xl font-semibold tracking-tight">
                {safeLocale === "id"
                  ? "Dengarkan warna nada tradisional."
                  : "Listen to traditional timbres."}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[#C5B7A6]">
                {safeLocale === "id"
                  ? "Klik instrumen di bawah untuk memutar sintesis nada pentatonis langsung di browser."
                  : "Tap any instrument below to play live synthesized pentatonic cues in your browser."}
              </p>

              <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {SOUNDPAD_ITEMS.map((inst) => (
                  <button
                    key={inst.id}
                    type="button"
                    onClick={() => playInstrumentPreview(true, inst.id)}
                    className="group flex flex-col items-start rounded-xl border border-white/10 bg-white/5 p-3.5 text-left transition-colors hover:border-[#D49B35]/60 hover:bg-white/10"
                  >
                    <div className="flex w-full items-center justify-between">
                      <span className="text-sm font-semibold text-[#F7F2E8]">
                        {inst.name}
                      </span>
                      <Volume2 className="h-3.5 w-3.5 text-[#F2BC52] transition-transform group-hover:scale-110" />
                    </div>
                    <span className="mt-0.5 text-[11px] text-[#D49B35]">
                      {inst.origin[safeLocale]}
                    </span>
                    <span className="mt-1 text-[11px] text-[#C5B7A6]">
                      {inst.note[safeLocale]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-[#C5B7A6]">
              <span>
                {safeLocale === "id"
                  ? "38 Provinsi · 342 Entri Budaya"
                  : "38 Provinces · 342 Cultural Entries"}
              </span>
              <button
                type="button"
                onClick={() => setPassportOpen(true)}
                className="inline-flex items-center gap-1 font-medium text-[#F2BC52] hover:underline"
              >
                <Award className="h-3.5 w-3.5" />
                {t(UI_COPY.ctaPassport, safeLocale)}
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 2: Interactive 7-Island Explorer (All 38 Provinces, Editorial Tabs) */}
        <section ref={directoryRef} className="reveal-section">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-[var(--ink-muted)]">
                <Compass className="h-4 w-4 text-[var(--accent)]" />
                <span>
                  {safeLocale === "id"
                    ? `Direktori Lengkap ${TOTAL_INDONESIA_PROVINCES} Provinsi`
                    : `Complete ${TOTAL_INDONESIA_PROVINCES}-Province Directory`}
                </span>
              </div>
              <h2 className="mt-1.5 font-serif text-3xl font-bold tracking-tight text-[var(--ink-primary)] sm:text-4xl">
                {safeLocale === "id"
                  ? "Dari Sabang sampai Merauke."
                  : "From Sabang to Merauke."}
              </h2>
            </div>

            {/* Island Region Pills */}
            <div className="flex flex-wrap gap-1.5">
              {ISLAND_REGIONS.map((reg) => {
                const active = explorerIsland === reg.key;
                return (
                  <button
                    key={reg.key}
                    type="button"
                    onClick={() => setExplorerIsland(reg.key)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${active
                      ? "bg-[var(--accent)] text-[#F7F2E8]"
                      : "border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]"
                      }`}
                  >
                    {reg.name[safeLocale]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Regional Editorial Banner */}
          <div
            className="mt-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 sm:p-6"
            style={{ borderLeft: `4px solid ${explorerMeta.accent}` }}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="font-serif text-xl font-bold text-[var(--ink-primary)]">
                  {explorerMeta.name[safeLocale]}
                </h3>
                <p className="text-xs text-[var(--ink-secondary)]">
                  {explorerMeta.subtitle[safeLocale]}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedProvince(null);
                  setActiveIsland(explorerIsland);
                  mapSectionRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-canvas)] px-3 py-1.5 text-xs font-medium text-[var(--ink-primary)] hover:border-[var(--accent)]"
              >
                <MapPin className="h-3.5 w-3.5 text-[var(--accent)]" />
                {safeLocale === "id" ? "Sorot di Peta 3D" : "Focus on 3D Map"}
              </button>
            </div>

            {/* Varied Editorial Grid for the Selected Island's Provinces */}
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {explorerProvinces.map((prov, idx) => {
                const stamped = Boolean(safeStamps[prov.slug]);
                const isLead = idx === 0 && explorerProvinces.length >= 4;
                return (
                  <div
                    key={prov.slug}
                    className={`flex flex-col justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-4 transition-colors hover:border-[var(--border-strong)] ${isLead ? "sm:col-span-2 lg:col-span-2" : ""
                      }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[var(--ink-muted)]">
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: prov.themeColor }}
                          />
                          {prov.capital} · {prov.code}
                        </span>
                        {stamped && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#3F6B4E]/15 px-2 py-0.5 text-[10px] font-semibold text-[#3F6B4E]">
                            <Award className="h-3 w-3" />
                            Stamp
                          </span>
                        )}
                      </div>

                      <h4 className="mt-1.5 font-serif text-lg font-bold text-[var(--ink-primary)]">
                        {prov.name[safeLocale]}
                      </h4>
                      <p className="mt-1 text-xs leading-relaxed text-[var(--ink-secondary)]">
                        {prov.tagline[safeLocale]}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-[var(--border-subtle)] pt-3">
                      <button
                        type="button"
                        onClick={() => handleSelectBySlug(prov.slug)}
                        className="text-xs font-medium text-[var(--ink-muted)] hover:text-[var(--ink-primary)]"
                      >
                        {safeLocale === "id" ? "Terbang di 3D" : "Fly in 3D"}
                      </button>
                      <Link
                        href={`/provinsi/${prov.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent)] hover:underline"
                      >
                        <span>{safeLocale === "id" ? "Buka detail" : "Explore"}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 3: National Festival Calendar (Filterable by Island) */}
        <section className="reveal-section">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-3xl font-bold tracking-tight text-[var(--ink-primary)]">
                {t(UI_COPY.festivalCalendar, safeLocale)}
              </h2>
              <p className="mt-1.5 max-w-xl text-sm text-[var(--ink-secondary)]">
                {safeLocale === "id"
                  ? "Perayaan adat dari Sumatra hingga Papua. Klik acara untuk menerbangkan kamera 3D ke provinsi asalnya."
                  : "Iconic ceremonies from Sumatra to Papua. Click any event to fly the 3D camera straight to its province."}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => setFestivalFilter("all")}
                className={`rounded-md px-2.5 py-1 text-xs font-medium ${festivalFilter === "all"
                  ? "bg-[#231A14] text-[#F7F2E8]"
                  : "bg-[var(--bg-surface)] text-[var(--ink-secondary)]"
                  }`}
              >
                {safeLocale === "id" ? "Semua" : "All"}
              </button>
              {ISLAND_REGIONS.filter((r) => r.key !== "maluku").map((r) => (
                <button
                  key={r.key}
                  type="button"
                  onClick={() => setFestivalFilter(r.key)}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium ${festivalFilter === r.key
                    ? "bg-[var(--accent)] text-[#F7F2E8]"
                    : "bg-[var(--bg-surface)] text-[var(--ink-secondary)]"
                    }`}
                >
                  {r.name[safeLocale]}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 divide-y divide-[var(--border-subtle)] rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
            {visibleFestivals.map((ev) => {
              const prov = ALL_PROVINCES.find((p) => p.slug === ev.provinceSlug);
              return (
                <button
                  key={ev.id}
                  type="button"
                  onClick={() => handleSelectBySlug(ev.provinceSlug)}
                  className="group flex w-full flex-col gap-2 px-5 py-4 text-left transition-colors hover:bg-[var(--bg-canvas)]/65 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-serif text-base font-semibold text-[var(--ink-primary)] group-hover:text-[var(--accent)]">
                        {ev.name[safeLocale]}
                      </span>
                      {ev.isApproximate && (
                        <span className="rounded bg-[var(--bg-surface-strong)] px-2 py-0.5 text-[10px] font-medium text-[var(--ink-muted)]">
                          {t(UI_COPY.approxDate, safeLocale)}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-[var(--ink-secondary)]">
                      {ev.description[safeLocale]}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-3 text-xs text-[var(--ink-muted)] sm:flex-col sm:items-end sm:gap-1">
                    <span className="inline-flex items-center gap-1 font-medium text-[var(--ink-primary)]">
                      <Calendar className="h-3 w-3 text-[var(--accent-gold)]" />
                      {ev.month[safeLocale]}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-[var(--accent)]" />
                      {prov?.name[safeLocale]}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-4 text-xs text-[var(--ink-muted)] sm:flex-row sm:items-center sm:px-6">
          <div>
            <span className="font-serif text-sm font-semibold text-[var(--ink-primary)]">
              Nusantara.go
            </span>{" "}
            — {t(UI_COPY.brandSub, safeLocale)}
          </div>
          <p>
            {safeLocale === "id"
              ? "Proyek edukasi & portofolio non-komersial · Seluruh 38 provinsi mencantumkan sumber referensi."
              : "Non-commercial educational & portfolio project · All 38 provinces cite reference sources."}
          </p>
        </div>
      </footer>

      <WelcomeMenu
        open={menuOpen}
        locale={safeLocale}
        isNight={isNight}
        stampCount={Object.keys(safeStamps).length}
        onStartMap={() => {
          setMenuOpen(false);
          markIntroSeen();
        }}
        onSurprise={() => {
          setMenuOpen(false);
          markIntroSeen();
          handleSurpriseMe();
        }}
        onOpenPassport={() => {
          setMenuOpen(false);
          setPassportOpen(true);
        }}
        onJumpDirectory={() => {
          setMenuOpen(false);
          setTimeout(() => {
            directoryRef.current?.scrollIntoView({ behavior: "smooth" });
          }, 150);
        }}
        onToggleLocale={toggleLocale}
        onToggleTheme={toggleThemeMode}
      />

      <QuizModal
        province={quizProvince}
        locale={safeLocale}
        soundEnabled={soundEnabled}
        onClose={() => setQuizProvince(null)}
        onPass={(slug, score, total) => earnStamp(slug, score, total)}
      />

      <PassportModal
        open={passportOpen}
        locale={safeLocale}
        stamps={safeStamps}
        onClose={() => setPassportOpen(false)}
        onExportCode={exportBackupCode}
        onImportCode={importBackupCode}
        onSelectProvinceSlug={handleSelectBySlug}
      />
    </div>
  );
}
