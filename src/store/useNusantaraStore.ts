"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IslandKey, Locale } from "@/types/culture";

export interface StampRecord {
  earnedAt: string;
  score: number;
  total: number;
}

interface NusantaraState {
  hasHydrated: boolean;
  locale: Locale;
  themeMode: "day" | "night";
  mapMode: "3d" | "2d";
  soundEnabled: boolean;
  introSeen: boolean;
  activeIsland: IslandKey | "all";
  geoBestScore: number;
  stamps: Record<string, StampRecord>;
  setHasHydrated: (v: boolean) => void;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  setThemeMode: (mode: "day" | "night") => void;
  toggleThemeMode: () => void;
  setMapMode: (mode: "3d" | "2d") => void;
  toggleSound: () => void;
  markIntroSeen: () => void;
  setActiveIsland: (island: IslandKey | "all") => void;
  updateGeoBestScore: (score: number) => void;
  earnStamp: (provinceSlug: string, score: number, total: number) => void;
  exportBackupCode: () => string;
  importBackupCode: (code: string) => boolean;
}

export const useNusantaraStore = create<NusantaraState>()(
  persist(
    (set, get) => ({
      hasHydrated: false,
      locale: "id",
      themeMode: "day",
      mapMode: "3d",
      soundEnabled: false,
      introSeen: false,
      activeIsland: "all",
      geoBestScore: 0,
      stamps: {},

      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
      setLocale: (locale) => set({ locale }),
      toggleLocale: () =>
        set((s) => ({ locale: s.locale === "id" ? "en" : "id" })),
      setThemeMode: (themeMode) => set({ themeMode }),
      toggleThemeMode: () =>
        set((s) => ({ themeMode: s.themeMode === "day" ? "night" : "day" })),
      setMapMode: (mapMode) => set({ mapMode }),
      toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
      markIntroSeen: () => set({ introSeen: true }),
      setActiveIsland: (activeIsland) => set({ activeIsland }),
      updateGeoBestScore: (score) =>
        set((s) => ({ geoBestScore: Math.max(s.geoBestScore, score) })),

      earnStamp: (provinceSlug, score, total) =>
        set((s) => ({
          stamps: {
            ...s.stamps,
            [provinceSlug]: {
              earnedAt: new Date().toISOString(),
              score,
              total,
            },
          },
        })),

      exportBackupCode: () => {
        const payload = { v: 1, stamps: get().stamps };
        if (typeof window === "undefined") return "";
        return btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
      },

      importBackupCode: (code: string) => {
        try {
          const decoded = decodeURIComponent(escape(atob(code.trim())));
          const parsed = JSON.parse(decoded);
          if (parsed && parsed.v === 1 && typeof parsed.stamps === "object") {
            set({ stamps: parsed.stamps });
            return true;
          }
          return false;
        } catch {
          return false;
        }
      },
    }),
    {
      name: "nusantara-go-storage-v2",
      partialize: (state) => ({
        locale: state.locale,
        themeMode: state.themeMode,
        mapMode: state.mapMode,
        soundEnabled: state.soundEnabled,
        introSeen: state.introSeen,
        geoBestScore: state.geoBestScore,
        stamps: state.stamps,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
