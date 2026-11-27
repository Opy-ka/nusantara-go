"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  BookOpen,
  Calendar,
  Compass,
  Globe,
  Moon,
  Shuffle,
  Sparkles,
  Sun,
} from "lucide-react";
import { Locale } from "@/types/culture";
import { TOTAL_INDONESIA_PROVINCES } from "@/data/provinces";
import { ExploreHubTab } from "./ExploreHubModal";

interface WelcomeMenuProps {
  open: boolean;
  locale: Locale;
  isNight: boolean;
  stampCount: number;
  onStartMap: () => void;
  onSurprise: () => void;
  onOpenPassport: () => void;
  onOpenExploreHub: (tab: ExploreHubTab) => void;
  onToggleLocale: () => void;
  onToggleTheme: () => void;
}

export function WelcomeMenu({
  open,
  locale,
  isNight,
  stampCount,
  onStartMap,
  onSurprise,
  onOpenPassport,
  onOpenExploreHub,
  onToggleLocale,
  onToggleTheme,
}: WelcomeMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="welcome-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35 } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#12262E]/72 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Menu Utama Nusantara.go"
        >
          {/* Top-right language & theme switches */}
          <div className="absolute top-5 right-5 flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label="Toggle day or night"
              className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/15 bg-[#1B1410]/70 px-3 text-xs font-medium text-[#F7F2E8] backdrop-blur-sm transition-colors hover:bg-[#1B1410]"
            >
              {isNight ? (
                <Sun className="h-3.5 w-3.5 text-[#F2BC52]" />
              ) : (
                <Moon className="h-3.5 w-3.5 text-[#F2BC52]" />
              )}
              <span>
                {isNight
                  ? locale === "id"
                    ? "Siang"
                    : "Day"
                  : locale === "id"
                  ? "Malam"
                  : "Night"}
              </span>
            </button>

            <button
              type="button"
              onClick={onToggleLocale}
              className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/15 bg-[#1B1410]/70 px-3 text-xs font-semibold text-[#F7F2E8] backdrop-blur-sm transition-colors hover:bg-[#1B1410]"
            >
              <Globe className="h-3.5 w-3.5 text-[#D49B35]" />
              {locale.toUpperCase()}
            </button>
          </div>

          {/* Centerpiece Artisanal Welcome Card */}
          <motion.div
            initial={{ y: 18, scale: 0.97, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: -14, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-[#D49B35]/35 bg-[var(--bg-canvas)]/95 p-7 text-center shadow-2xl sm:p-9"
          >
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute -top-8 -left-8 h-32 w-32 opacity-[0.08] text-[var(--ink-primary)]"
              viewBox="0 0 120 120"
              fill="currentColor"
            >
              <circle cx="60" cy="30" r="18" />
              <circle cx="60" cy="90" r="18" />
              <circle cx="30" cy="60" r="18" />
              <circle cx="90" cy="60" r="18" />
            </svg>
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute -right-8 -bottom-8 h-32 w-32 opacity-[0.08] text-[var(--ink-primary)]"
              viewBox="0 0 120 120"
              fill="currentColor"
            >
              <circle cx="60" cy="30" r="18" />
              <circle cx="60" cy="90" r="18" />
              <circle cx="30" cy="60" r="18" />
              <circle cx="90" cy="60" r="18" />
            </svg>

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#231A14] shadow-md ring-2 ring-[#D49B35]/40">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <ellipse cx="16" cy="9.5" rx="3.4" ry="5.8" fill="#D49B35" />
                <ellipse cx="16" cy="22.5" rx="3.4" ry="5.8" fill="#D49B35" />
                <ellipse cx="9.5" cy="16" rx="5.8" ry="3.4" fill="#C4532D" />
                <ellipse cx="22.5" cy="16" rx="5.8" ry="3.4" fill="#C4532D" />
                <circle cx="16" cy="16" r="2.8" fill="#F7F2E8" />
              </svg>
            </div>

            <p className="mt-4 text-[11px] font-semibold tracking-[0.2em] text-[var(--accent)] uppercase">
              {locale === "id"
                ? "Atlas Diorama 3D · 38 Provinsi Indonesia"
                : "3D Cultural Diorama · All 38 Indonesian Provinces"}
            </p>

            <h1 className="mt-1.5 font-serif text-4xl font-bold tracking-tight text-[var(--ink-primary)] sm:text-5xl">
              Nusantara<span className="text-[var(--accent)]">.go</span>
            </h1>

            <p className="mx-auto mt-2.5 max-w-md text-sm leading-relaxed text-[var(--ink-secondary)]">
              {locale === "id"
                ? "Jelajahi peta budaya 3D Indonesia secara layar penuh, atau buka sorotan budaya, panggung bunyi, direktori, dan festival dari menu ini."
                : "Explore Indonesia's full-screen 3D cultural map, or open cultural spotlights, soundpad, directory, and festivals right from here."}
            </p>

            <div className="mt-6 space-y-2.5">
              <button
                type="button"
                onClick={onStartMap}
                className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-[var(--accent)] px-6 py-3.5 text-sm font-semibold text-[#F7F2E8] shadow-md transition-colors hover:bg-[var(--accent-hover)]"
              >
                <Compass className="h-4 w-4" />
                <span>
                  {locale === "id"
                    ? "Mulai Jelajah Peta 3D Indonesia"
                    : "Enter Interactive 3D Map"}
                </span>
              </button>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                <button
                  type="button"
                  onClick={() => onOpenExploreHub("spotlight")}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] px-3 py-2.5 text-xs font-semibold text-[var(--ink-primary)] transition-colors hover:border-[var(--accent)]"
                >
                  <Sparkles className="h-3.5 w-3.5 text-[var(--accent)]" />
                  <span>{locale === "id" ? "Sorotan & Bunyi" : "Spotlight"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onOpenExploreHub("directory")}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] px-3 py-2.5 text-xs font-semibold text-[var(--ink-primary)] transition-colors hover:border-[var(--accent)]"
                >
                  <BookOpen className="h-3.5 w-3.5 text-[var(--accent)]" />
                  <span>{locale === "id" ? "Direktori 38" : "Directory"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onOpenExploreHub("festivals")}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] px-3 py-2.5 text-xs font-semibold text-[var(--ink-primary)] transition-colors hover:border-[var(--accent)]"
                >
                  <Calendar className="h-3.5 w-3.5 text-[var(--accent)]" />
                  <span>{locale === "id" ? "Festival" : "Festivals"}</span>
                </button>

                <button
                  type="button"
                  onClick={onOpenPassport}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] px-3 py-2.5 text-xs font-semibold text-[var(--ink-primary)] transition-colors hover:border-[#D49B35]"
                >
                  <Award className="h-3.5 w-3.5 text-[#D49B35]" />
                  <span className="tabular-nums">
                    {locale === "id" ? "Paspor" : "Passport"} ({stampCount}/
                    {TOTAL_INDONESIA_PROVINCES})
                  </span>
                </button>

                <button
                  type="button"
                  onClick={onSurprise}
                  className="col-span-2 flex items-center justify-center gap-1.5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] px-3 py-2.5 text-xs font-semibold text-[var(--ink-primary)] transition-colors hover:border-[var(--accent)] sm:col-span-2"
                >
                  <Shuffle className="h-3.5 w-3.5 text-[var(--accent)]" />
                  <span>
                    {locale === "id"
                      ? "Kejutkan Aku (Provinsi Acak)"
                      : "Surprise Me (Random Province)"}
                  </span>
                </button>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-center gap-4 text-[11px] text-[var(--ink-muted)] tabular-nums">
              <span>38 {locale === "id" ? "Provinsi" : "Provinces"}</span>
              <span>·</span>
              <span>342 {locale === "id" ? "Warisan Budaya" : "Entries"}</span>
              <span>·</span>
              <span>15 {locale === "id" ? "Arsitektur 3D" : "3D Landmarks"}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
