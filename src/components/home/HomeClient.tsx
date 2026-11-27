"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Compass, RotateCcw, Shuffle } from "lucide-react";
import { ALL_PROVINCES } from "@/data/provinces";
import { STORY_TOURS, StoryTour } from "@/data/storyTours";
import { CategoryKey, Province } from "@/types/culture";
import { useNusantaraStore } from "@/store/useNusantaraStore";
import { UI_COPY, t } from "@/lib/i18n";
import { playHoverTone, playProvinceChime, playStampSound } from "@/lib/sound";
import { NusantaraHeader } from "@/components/layout/NusantaraHeader";
import { WelcomeMenu } from "@/components/home/WelcomeMenu";
import {
  ExploreHubModal,
  ExploreHubTab,
} from "@/components/home/ExploreHubModal";
import { CompareProvincesModal } from "@/components/home/CompareProvincesModal";
import { StoryTourOverlay } from "@/components/home/StoryTourOverlay";
import { GeoGameOverlay, GeoGameRound } from "@/components/home/GeoGameOverlay";
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

const GEO_CLUE_CATEGORIES: CategoryKey[] = [
  "rumah-adat",
  "tarian",
  "pakaian",
  "kuliner",
  "alat-musik",
  "senjata",
  "upacara",
  "wisata",
];

function secureRandomInt(max: number): number {
  if (typeof window !== "undefined" && window.crypto?.getRandomValues) {
    const arr = new Uint32Array(1);
    window.crypto.getRandomValues(arr);
    return arr[0] % max;
  }
  return Math.floor(Math.random() * max);
}

function fisherYatesShuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = secureRandomInt(i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function generateGeoRounds(
  count: number,
  recentSlugs: Set<string>
): GeoGameRound[] {
  let pool = ALL_PROVINCES.filter((p) => !recentSlugs.has(p.slug));
  if (pool.length < count) {
    recentSlugs.clear();
    pool = [...ALL_PROVINCES];
  }
  const picks = fisherYatesShuffle(pool).slice(0, count);
  picks.forEach((p) => recentSlugs.add(p.slug));

  return picks.map((province) => {
    const cat =
      GEO_CLUE_CATEGORIES[secureRandomInt(GEO_CLUE_CATEGORIES.length)];
    const item =
      province.items.find((it) => it.category === cat) ?? province.items[0];
    return {
      province,
      clueCategory: item.category,
      clueName: item.name,
      clueSummary: item.summary,
    };
  });
}

export function HomeClient() {
  const {
    hasHydrated,
    locale,
    themeMode,
    mapMode,
    soundEnabled,
    introSeen,
    geoBestScore,
    stamps,
    toggleLocale,
    toggleThemeMode,
    markIntroSeen,
    updateGeoBestScore,
    earnStamp,
    exportBackupCode,
    importBackupCode,
  } = useNusantaraStore();

  const [menuOpen, setMenuOpen] = useState(true);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [exploreTab, setExploreTab] = useState<ExploreHubTab>("spotlight");
  const [compareOpen, setCompareOpen] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(
    null
  );
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [quizProvince, setQuizProvince] = useState<Province | null>(null);
  const [passportOpen, setPassportOpen] = useState(false);

  // Story Tour state
  const [activeTour, setActiveTour] = useState<StoryTour | null>(null);
  const [tourStopIndex, setTourStopIndex] = useState(0);

  // Geo-Culture 3D Game state
  const recentGeoSlugsRef = useRef<Set<string>>(new Set());
  const [geoRounds, setGeoRounds] = useState<GeoGameRound[]>([]);
  const [geoIndex, setGeoIndex] = useState(0);
  const [geoScore, setGeoScore] = useState(0);
  const [geoHint, setGeoHint] = useState(false);
  const [geoLastGuess, setGeoLastGuess] = useState<{
    guessed: Province;
    correct: boolean;
  } | null>(null);
  const [geoFinished, setGeoFinished] = useState(false);

  const isGeoActive = geoRounds.length > 0;
  const safeLocale = hasHydrated ? locale : "id";
  const safeTheme = hasHydrated ? themeMode : "day";
  const safeMapMode = hasHydrated ? mapMode : "3d";
  const safeStamps = hasHydrated ? stamps : {};
  const safeBestScore = hasHydrated ? geoBestScore : 0;
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

  // Sync selectedProvince with active Story Tour stop
  useEffect(() => {
    if (!activeTour) return;
    const stop = activeTour.stops[tourStopIndex];
    const prov = ALL_PROVINCES.find((p) => p.slug === stop.provinceSlug);
    if (prov) {
      setSelectedProvince(prov);
      playProvinceChime(soundEnabled, tourStopIndex);
    }
  }, [activeTour, tourStopIndex, soundEnabled]);

  const startStoryTour = (tour: StoryTour = STORY_TOURS[0]) => {
    setGeoRounds([]);
    setMenuOpen(false);
    setExploreOpen(false);
    markIntroSeen();
    setActiveTour(tour);
    setTourStopIndex(0);
  };

  const startGeoGame = () => {
    setActiveTour(null);
    setMenuOpen(false);
    setExploreOpen(false);
    markIntroSeen();
    setSelectedProvince(null);
    setGeoRounds(generateGeoRounds(5, recentGeoSlugsRef.current));
    setGeoIndex(0);
    setGeoScore(0);
    setGeoHint(false);
    setGeoLastGuess(null);
    setGeoFinished(false);
  };

  const handleProvinceClickOnMap = (prov: Province | null) => {
    if (isGeoActive) {
      if (!prov || geoLastGuess || geoFinished) return;
      const target = geoRounds[geoIndex].province;
      const correct = prov.slug === target.slug;
      const nextScore = correct ? geoScore + 1 : geoScore;
      setGeoScore(nextScore);
      setGeoLastGuess({ guessed: prov, correct });
      setSelectedProvince(target);
      if (correct) {
        playStampSound(soundEnabled);
      } else {
        playProvinceChime(soundEnabled, 1);
      }
      return;
    }

    if (activeTour) return;
    setSelectedProvince(prov);
    if (prov) playProvinceChime(soundEnabled, prov.name.id.length);
  };

  const handleNextGeoRound = () => {
    if (geoIndex + 1 < geoRounds.length) {
      setGeoIndex((i) => i + 1);
      setGeoHint(false);
      setGeoLastGuess(null);
      setSelectedProvince(null);
    } else {
      updateGeoBestScore(geoScore);
      setGeoFinished(true);
      setSelectedProvince(null);
    }
  };

  const handleSelectBySlug = (slug: string) => {
    const found = ALL_PROVINCES.find((p) => p.slug === slug);
    if (found) {
      setActiveTour(null);
      setGeoRounds([]);
      setMenuOpen(false);
      setExploreOpen(false);
      setSelectedProvince(found);
      playProvinceChime(soundEnabled, found.name.id.length);
    }
  };

  const handleSurpriseMe = () => {
    setActiveTour(null);
    setGeoRounds([]);
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
    if (slug && !isGeoActive) {
      const idx = ALL_PROVINCES.findIndex((p) => p.slug === slug);
      playHoverTone(soundEnabled, idx >= 0 ? idx : 0);
    }
  };

  const hoveredProvince = useMemo(
    () =>
      hoveredSlug ? ALL_PROVINCES.find((p) => p.slug === hoveredSlug) : null,
    [hoveredSlug]
  );

  const activeRegionLabel = isGeoActive
    ? safeLocale === "id"
      ? "Mode Tantangan · Tebak Provinsi"
      : "Challenge Mode · Guess Province"
    : activeTour
    ? activeTour.title[safeLocale]
    : selectedProvince
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
                onSelectProvince={handleProvinceClickOnMap}
              />
            }
          >
            <DioramaCanvas
              locale={safeLocale}
              isNight={isNight}
              activeIsland="all"
              activeCategory="all"
              activeTour={activeTour}
              selectedProvince={selectedProvince}
              stamps={safeStamps}
              playIntro={hasHydrated && !introSeen}
              onIntroFinished={markIntroSeen}
              onSelectProvince={handleProvinceClickOnMap}
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
            onSelectProvince={handleProvinceClickOnMap}
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

          {!activeTour && !isGeoActive && (
            <button
              type="button"
              onClick={handleSurpriseMe}
              className="pointer-events-auto inline-flex h-9 items-center gap-1.5 rounded-full bg-[var(--accent)] px-3.5 text-xs font-medium text-[#F7F2E8] shadow-md transition-colors hover:bg-[var(--accent-hover)]"
            >
              <Shuffle className="h-3.5 w-3.5" />
              <span>{t(UI_COPY.ctaSurprise, safeLocale)}</span>
            </button>
          )}

          {selectedProvince && !activeTour && !isGeoActive && (
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

        {/* Subtle bottom-left interaction cue (hidden during tour/game overlays) */}
        {!activeTour && !isGeoActive && (
          <div className="pointer-events-none absolute bottom-4 left-4 z-20 hidden rounded-full border border-white/10 bg-[#1B1410]/65 px-3.5 py-1.5 text-[11px] text-[#F5EFE4]/85 backdrop-blur-sm sm:block">
            {safeLocale === "id"
              ? "Scroll: Zoom In / Out · Seret: Putar Peta · Klik provinsi untuk detail"
              : "Scroll: Zoom In / Out · Drag: Orbit · Click any province for details"}
          </div>
        )}

        {/* Active Story Tour HUD */}
        {activeTour && (
          <StoryTourOverlay
            tour={activeTour}
            stopIndex={tourStopIndex}
            locale={safeLocale}
            onChangeTour={(tObj) => {
              setActiveTour(tObj);
              setTourStopIndex(0);
            }}
            onChangeStop={(idx) => setTourStopIndex(idx)}
            onExit={() => {
              setActiveTour(null);
              setSelectedProvince(null);
            }}
          />
        )}

        {/* Active Geo-Culture 3D Game HUD */}
        {isGeoActive && (
          <GeoGameOverlay
            locale={safeLocale}
            rounds={geoRounds}
            roundIndex={geoIndex}
            score={geoScore}
            bestScore={safeBestScore}
            showHint={geoHint}
            lastGuess={geoLastGuess}
            finished={geoFinished}
            onToggleHint={() => setGeoHint((h) => !h)}
            onNextRound={handleNextGeoRound}
            onRestart={startGeoGame}
            onExit={() => {
              setGeoRounds([]);
              setSelectedProvince(null);
            }}
          />
        )}

        {/* Province Preview Drawer (normal explore mode only) */}
        {!activeTour && !isGeoActive && (
          <ProvinceDrawer
            province={selectedProvince}
            locale={safeLocale}
            hasStamp={Boolean(
              selectedProvince && safeStamps[selectedProvince.slug]
            )}
            onClose={() => setSelectedProvince(null)}
            onOpenQuiz={(prov) => setQuizProvince(prov)}
          />
        )}
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
        onStartTour={() => startStoryTour(STORY_TOURS[0])}
        onStartGeoGame={startGeoGame}
        onOpenCompare={() => {
          setMenuOpen(false);
          setCompareOpen(true);
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

      <CompareProvincesModal
        open={compareOpen}
        locale={safeLocale}
        onClose={() => setCompareOpen(false)}
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
