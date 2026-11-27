"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import {
  Award,
  Box,
  Globe,
  Map as MapIcon,
  Moon,
  Search,
  Sun,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { ALL_PROVINCES, TOTAL_INDONESIA_PROVINCES } from "@/data/provinces";
import { useNusantaraStore } from "@/store/useNusantaraStore";
import { CATEGORY_LABELS, UI_COPY, t } from "@/lib/i18n";

interface NusantaraHeaderProps {
  onSelectProvinceSlug?: (slug: string) => void;
  onOpenPassport: () => void;
}

export function NusantaraHeader({
  onSelectProvinceSlug,
  onOpenPassport,
}: NusantaraHeaderProps) {
  const {
    hasHydrated,
    locale,
    themeMode,
    mapMode,
    soundEnabled,
    stamps,
    toggleLocale,
    toggleThemeMode,
    setMapMode,
    toggleSound,
  } = useNusantaraStore();

  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const searchBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onPointerDown = (e: MouseEvent) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(e.target as Node)
      ) {
        setSearchOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setMobileSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const safeLocale = hasHydrated ? locale : "id";
  const safeTheme = hasHydrated ? themeMode : "day";
  const safeMapMode = hasHydrated ? mapMode : "3d";
  const safeSound = hasHydrated ? soundEnabled : false;
  const stampCount = hasHydrated ? Object.keys(stamps).length : 0;

  const searchIndex = useMemo(() => {
    const records = ALL_PROVINCES.flatMap((province) => [
      {
        kind: "province" as const,
        slug: province.slug,
        title: province.name[safeLocale],
        subtitle: `${province.capital} · ${province.islandLabel[safeLocale]}`,
        keywords: `${province.name.id} ${province.name.en} ${province.capital} ${province.tagline.id} ${province.islandLabel.id}`,
      },
      ...province.items.map((item) => ({
        kind: "item" as const,
        slug: province.slug,
        title: item.name[safeLocale],
        subtitle: `${province.name[safeLocale]} · ${CATEGORY_LABELS[item.category][safeLocale]}`,
        keywords: `${item.name.id} ${item.name.en} ${item.summary.id} ${item.summary.en}`,
      })),
    ]);
    return new Fuse(records, {
      keys: ["title", "subtitle", "keywords"],
      threshold: 0.34,
    });
  }, [safeLocale]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return searchIndex.search(query).slice(0, 7);
  }, [query, searchIndex]);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border-subtle)] bg-[var(--bg-canvas)]/92 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-2.5 sm:gap-3 sm:px-6">
        {/* Custom SVG Kawung Compass Mark */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden="true"
            className="shrink-0"
          >
            <rect width="32" height="32" rx="8" fill="#231A14" />
            <ellipse cx="16" cy="10" rx="3.2" ry="5.5" fill="#D49B35" />
            <ellipse cx="16" cy="22" rx="3.2" ry="5.5" fill="#D49B35" />
            <ellipse cx="10" cy="16" rx="5.5" ry="3.2" fill="#C4532D" />
            <ellipse cx="22" cy="16" rx="5.5" ry="3.2" fill="#C4532D" />
            <circle cx="16" cy="16" r="2.6" fill="#F7F2E8" />
          </svg>
          <div className="leading-tight">
            <span className="font-serif text-base font-bold tracking-tight text-[var(--ink-primary)] sm:text-lg">
              Nusantara<span className="text-[var(--accent)]">.go</span>
            </span>
          </div>
        </Link>

        {/* Desktop Fuzzy Search */}
        <div ref={searchBoxRef} className="relative hidden max-w-md flex-1 md:block">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[var(--ink-muted)]" />
          <input
            type="search"
            value={query}
            onFocus={() => setSearchOpen(true)}
            onChange={(e) => {
              setQuery(e.target.value);
              setSearchOpen(true);
            }}
            placeholder={t(UI_COPY.searchPlaceholder, safeLocale)}
            aria-label={t(UI_COPY.searchPlaceholder, safeLocale)}
            className="w-full rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] py-2 pr-8 pl-9 text-sm text-[var(--ink-primary)] placeholder:text-[var(--ink-muted)] focus-visible:border-[var(--accent)] focus-visible:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setSearchOpen(false);
              }}
              aria-label="Clear search"
              className="absolute top-1/2 right-2.5 -translate-y-1/2 text-[var(--ink-muted)] hover:text-[var(--ink-primary)]"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}

          {searchOpen && results.length > 0 && (
            <div className="absolute top-full right-0 left-0 mt-1.5 overflow-hidden rounded-xl border border-[var(--border-strong)] bg-[var(--bg-canvas)] shadow-xl">
              {results.map(({ item }, i) => (
                <button
                  key={`${item.slug}-${item.title}-${i}`}
                  type="button"
                  onClick={() => {
                    setSearchOpen(false);
                    setQuery("");
                    if (onSelectProvinceSlug) {
                      onSelectProvinceSlug(item.slug);
                    } else {
                      window.location.href = `/provinsi/${item.slug}`;
                    }
                  }}
                  className="flex w-full items-center justify-between px-4 py-2.5 text-left transition-colors hover:bg-[var(--bg-surface)]"
                >
                  <div>
                    <div className="text-sm font-medium text-[var(--ink-primary)]">
                      {item.title}
                    </div>
                    <div className="text-xs text-[var(--ink-muted)]">
                      {item.subtitle}
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-[var(--accent)]">
                    {safeLocale === "id" ? "Terbang" : "Fly to"}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Utility Controls */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
          <button
            type="button"
            onClick={() => setMobileSearchOpen((v) => !v)}
            aria-label={t(UI_COPY.searchPlaceholder, safeLocale)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--ink-primary)] transition-colors hover:border-[var(--border-strong)] md:hidden"
          >
            <Search className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => setMapMode(safeMapMode === "3d" ? "2d" : "3d")}
            title={
              safeMapMode === "3d"
                ? t(UI_COPY.mode2D, safeLocale)
                : t(UI_COPY.mode3D, safeLocale)
            }
            className="hidden h-9 items-center gap-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-2.5 text-xs font-medium text-[var(--ink-primary)] transition-colors hover:border-[var(--border-strong)] sm:inline-flex"
          >
            {safeMapMode === "3d" ? (
              <Box className="h-3.5 w-3.5 text-[var(--accent)]" />
            ) : (
              <MapIcon className="h-3.5 w-3.5 text-[var(--accent)]" />
            )}
            <span>{safeMapMode === "3d" ? "3D" : "2D"}</span>
          </button>

          <button
            type="button"
            onClick={toggleThemeMode}
            aria-label={
              safeTheme === "day"
                ? t(UI_COPY.nightMode, safeLocale)
                : t(UI_COPY.dayMode, safeLocale)
            }
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--ink-primary)] transition-colors hover:border-[var(--border-strong)] sm:h-9 sm:w-9"
          >
            {safeTheme === "day" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4 text-[#F2BC52]" />
            )}
          </button>

          <button
            type="button"
            onClick={toggleSound}
            aria-label={safeSound ? "Mute audio" : "Enable audio"}
            className="hidden h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--ink-primary)] transition-colors hover:border-[var(--border-strong)] sm:inline-flex"
          >
            {safeSound ? (
              <Volume2 className="h-4 w-4 text-[var(--accent)]" />
            ) : (
              <VolumeX className="h-4 w-4 text-[var(--ink-muted)]" />
            )}
          </button>

          <button
            type="button"
            onClick={toggleLocale}
            className="inline-flex h-8 items-center gap-1 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-2 text-xs font-semibold text-[var(--ink-primary)] transition-colors hover:border-[var(--border-strong)] sm:h-9 sm:px-2.5"
          >
            <Globe className="hidden h-3.5 w-3.5 text-[var(--ink-muted)] sm:inline" />
            {safeLocale.toUpperCase()}
          </button>

          <button
            type="button"
            onClick={onOpenPassport}
            className="inline-flex h-8 items-center gap-1 rounded-lg bg-[#231A14] px-2 text-xs font-medium text-[#F7F2E8] transition-opacity hover:opacity-90 sm:h-9 sm:gap-1.5 sm:px-3"
          >
            <Award className="h-3.5 w-3.5 text-[#F2BC52]" />
            <span className="hidden sm:inline">
              {t(UI_COPY.ctaPassport, safeLocale)}
            </span>
            <span className="rounded bg-[#D49B35]/25 px-1.5 py-0.5 text-[10px] font-semibold text-[#F2BC52] tabular-nums sm:text-[11px]">
              {stampCount}/{TOTAL_INDONESIA_PROVINCES}
            </span>
          </button>
        </div>
      </div>

      {mobileSearchOpen && (
        <div className="border-t border-[var(--border-subtle)] bg-[var(--bg-canvas)] px-4 py-3 md:hidden">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[var(--ink-muted)]" />
            <input
              type="search"
              autoFocus
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSearchOpen(true);
              }}
              placeholder={t(UI_COPY.searchPlaceholder, safeLocale)}
              aria-label={t(UI_COPY.searchPlaceholder, safeLocale)}
              className="w-full rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] py-2.5 pr-8 pl-9 text-sm text-[var(--ink-primary)] placeholder:text-[var(--ink-muted)] focus-visible:border-[var(--accent)] focus-visible:outline-none"
            />
          </div>
          {results.length > 0 && (
            <div className="mt-2 divide-y divide-[var(--border-subtle)] overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
              {results.map(({ item }, i) => (
                <button
                  key={`m-${item.slug}-${item.title}-${i}`}
                  type="button"
                  onClick={() => {
                    setMobileSearchOpen(false);
                    setQuery("");
                    if (onSelectProvinceSlug) {
                      onSelectProvinceSlug(item.slug);
                    } else {
                      window.location.href = `/provinsi/${item.slug}`;
                    }
                  }}
                  className="flex w-full items-center justify-between px-3.5 py-2.5 text-left"
                >
                  <div>
                    <div className="text-sm font-medium text-[var(--ink-primary)]">
                      {item.title}
                    </div>
                    <div className="text-xs text-[var(--ink-muted)]">
                      {item.subtitle}
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-[var(--accent)]">
                    {safeLocale === "id" ? "Terbang" : "Fly to"}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </header>
  );
}
