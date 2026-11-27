"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Compass, RotateCcw, Shuffle } from "lucide-react";
import { ALL_PROVINCES } from "@/data/provinces";
import { Province } from "@/types/culture";
import { useNusantaraStore } from "@/store/useNusantaraStore";
import { UI_COPY, t } from "@/lib/i18n";
import { playHoverTone, playProvinceChime } from "@/lib/sound";
import { NusantaraHeader } from "@/components/layout/NusantaraHeader";
import { WelcomeMenu } from "@/components/home/WelcomeMenu";
import {
  ExploreHubModal,
  ExploreHubTab,
} from "@/components/home/ExploreHubModal";
import { ProvinceDrawer } from "@/components/map/ProvinceDrawer";
import { Map2DFallback } from "@/components/diorama/Map2DFallback";
import { WebGLErrorBoundary } from "@/components/diorama/WebGLErrorBoundary";
import { QuizModal } from "@/components/passport/QuizModal";
import { PassportModal } from "@/components/passport/PassportModal";

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

export function HomeClient() {
  const {
    hasHydrated,
    locale,
    themeMode,
    mapMode,
    soundEnabled,
    introSeen,
    stamps,
    toggleLocale,
    toggleThemeMode,
    markIntroSeen,
    earnStamp,
    exportBackupCode,
    importBackupCode,
  } = useNusantaraStore();

  const [menuOpen, setMenuOpen] = useState(true);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [exploreTab, setExploreTab] = useState<ExploreHubTab>("spotlight");
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(
    null
  );
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [quizProvince, setQuizProvince] = useState<Province | null>(null);
  const [passportOpen, setPassportOpen] = useState(false);

  const safeLocale = hasHydrated ? locale : "id";
  const safeTheme = hasHydrated ? themeMode : "day";
  const safeMapMode = hasHydrated ? mapMode : "3d";
  const safeStamps = hasHydrated ? stamps : {};
  const isNight = safeTheme === "night";

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

  const handleSelectBySlug = (slug: string) => {
    const found = ALL_PROVINCES.find((p) => p.slug === slug);
    if (found) {
      setMenuOpen(false);
      setExploreOpen(false);
      setSelectedProvince(found);
      playProvinceChime(soundEnabled, found.name.id.length);
    }
  };

  const handleSurpriseMe = () => {
    const pool = ALL_PROVINCES.filter(
      (p) => p.slug !== selectedProvince?.slug
    );
    const pick = pool[Math.floor(Math.random() * pool.length)];
    if (pick) {
      setSelectedProvince(pick);
      playProvinceChime(soundEnabled, pick.name.id.length);
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
    () =>
      hoveredSlug ? ALL_PROVINCES.find((p) => p.slug === hoveredSlug) : null,
    [hoveredSlug]
  );

  const activeRegionLabel = selectedProvince
    ? `${selectedProvince.name[safeLocale]} · ${selectedProvince.capital}`
    : hoveredProvince
    ? `${hoveredProvince.name[safeLocale]} · ${hoveredProvince.islandLabel[safeLocale]}`
    : safeLocale === "id"
    ? "Kepulauan Indonesia · 38 Provinsi"
    : "Indonesian Archipelago · 38 Provinces";

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[var(--bg-canvas)]">
      <NusantaraHeader
        onSelectProvinceSlug={handleSelectBySlug}
        onOpenPassport={() => setPassportOpen(true)}
      />

      {/* Full-Viewport Interactive 3D Map — Scroll strictly zooms 3D map in & out */}
      <section className="relative flex-1 overflow-hidden">
        {safeMapMode === "3d" ? (
          <WebGLErrorBoundary
            fallback={
              <Map2DFallback
                locale={safeLocale}
                isNight={isNight}
                activeIsland="all"
                selectedProvince={selectedProvince}
                stamps={safeStamps}
                onSelectProvince={(prov) => {
                  setSelectedProvince(prov);
                  playProvinceChime(soundEnabled, prov.name.id.length);
                }}
              />
            }
          >
            <DioramaCanvas
              locale={safeLocale}
              isNight={isNight}
              activeIsland="all"
              activeCategory="all"
              selectedProvince={selectedProvince}
              stamps={safeStamps}
              playIntro={hasHydrated && !introSeen}
              onIntroFinished={markIntroSeen}
              onSelectProvince={(prov) => {
                setSelectedProvince(prov);
                if (prov) playProvinceChime(soundEnabled, prov.name.id.length);
              }}
              onHoverProvince={handleHoverProvince}
            />
          </WebGLErrorBoundary>
        ) : (
          <Map2DFallback
            locale={safeLocale}
            isNight={isNight}
            activeIsland="all"
            selectedProvince={selectedProvince}
            stamps={safeStamps}
            onSelectProvince={(prov) => {
              setSelectedProvince(prov);
              playProvinceChime(soundEnabled, prov.name.id.length);
            }}
          />
        )}

        {/* Sleek Artisan Compass Navigator HUD */}
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

          {selectedProvince && (
            <button
              type="button"
              onClick={() => setSelectedProvince(null)}
              className="pointer-events-auto inline-flex h-9 items-center gap-1.5 rounded-full border border-white/15 bg-[#1B1410]/75 px-3 text-xs font-medium text-[#F2BC52] shadow-md backdrop-blur-md transition-colors hover:bg-[#1B1410]"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">
                {t(UI_COPY.resetCamera, safeLocale)}
              </span>
            </button>
          )}
        </div>

        {/* Subtle bottom-left interaction cue */}
        <div className="pointer-events-none absolute bottom-4 left-4 z-20 hidden rounded-full border border-white/10 bg-[#1B1410]/65 px-3.5 py-1.5 text-[11px] text-[#F5EFE4]/85 backdrop-blur-sm sm:block">
          {safeLocale === "id"
            ? "Scroll: Zoom In / Out · Seret: Putar Peta · Klik provinsi untuk detail"
            : "Scroll: Zoom In / Out · Drag: Orbit · Click any province for details"}
        </div>

        <ProvinceDrawer
          province={selectedProvince}
          locale={safeLocale}
          hasStamp={Boolean(
            selectedProvince && safeStamps[selectedProvince.slug]
          )}
          onClose={() => setSelectedProvince(null)}
          onOpenQuiz={(prov) => setQuizProvince(prov)}
        />
      </section>

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
        onOpenExploreHub={(tab) => {
          setMenuOpen(false);
          setExploreTab(tab);
          setExploreOpen(true);
        }}
        onToggleLocale={toggleLocale}
        onToggleTheme={toggleThemeMode}
      />

      <ExploreHubModal
        open={exploreOpen}
        initialTab={exploreTab}
        locale={safeLocale}
        stamps={safeStamps}
        onClose={() => setExploreOpen(false)}
        onFlyToProvince={handleSelectBySlug}
        onOpenPassport={() => setPassportOpen(true)}
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
