"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Award, MapPin, Volume2, X } from "lucide-react";
import { Locale, Province } from "@/types/culture";
import { CATEGORY_LABELS, UI_COPY, t } from "@/lib/i18n";
import { playProvinceChime } from "@/lib/sound";

interface ProvinceDrawerProps {
  province: Province | null;
  locale: Locale;
  hasStamp: boolean;
  onClose: () => void;
  onOpenQuiz: (province: Province) => void;
}

export function ProvinceDrawer({
  province,
  locale,
  hasStamp,
  onClose,
  onOpenQuiz,
}: ProvinceDrawerProps) {
  return (
    <AnimatePresence>
      {province && (
        <motion.aside
          key={province.slug}
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 32, opacity: 0 }}
          transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
          className="absolute right-4 bottom-4 z-30 w-[calc(100%-2rem)] max-w-sm overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-canvas)]/95 shadow-2xl backdrop-blur-md sm:top-4 sm:bottom-auto"
        >
          {/* Top accent strip */}
          <div
            className="h-1.5 w-full"
            style={{ backgroundColor: province.themeColor }}
          />

          <div className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs text-[var(--ink-muted)]">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>
                    {province.capital} · {province.islandLabel[locale]}
                  </span>
                </div>
                <h2 className="mt-1 font-serif text-2xl font-bold tracking-tight text-[var(--ink-primary)]">
                  {province.name[locale]}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close province preview"
                className="rounded-lg p-1.5 text-[var(--ink-secondary)] hover:bg-[var(--bg-surface-strong)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Greeting card with optional chime */}
            {province.greeting && (
              <div className="mt-3 flex items-center justify-between rounded-xl bg-[var(--bg-surface)] px-3.5 py-2.5">
                <div>
                  <div className="font-serif text-sm font-semibold text-[var(--ink-primary)]">
                    “{province.greeting.phrase}”
                  </div>
                  <div className="text-[11px] text-[var(--ink-muted)]">
                    {province.greeting.meaning[locale]}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    playProvinceChime(true, province.name.id.length)
                  }
                  aria-label="Play regional chime"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--bg-surface-strong)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[#F7F2E8] transition-colors"
                >
                  <Volume2 className="h-4 w-4" />
                </button>
              </div>
            )}

            <p className="mt-3 text-sm leading-relaxed text-[var(--ink-secondary)]">
              {province.tagline[locale]}
            </p>

            {/* Quick Highlights (3 sample items) */}
            <div className="mt-4 grid grid-cols-1 gap-2">
              {province.items.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)]/70 px-3 py-2"
                >
                  <span className="text-xs font-medium text-[var(--ink-primary)]">
                    {item.name[locale]}
                  </span>
                  <span className="text-[11px] text-[var(--ink-muted)]">
                    {CATEGORY_LABELS[item.category][locale]}
                  </span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-5 flex flex-col gap-2">
              <Link
                href={`/provinsi/${province.slug}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-medium text-[#F7F2E8] transition-colors hover:bg-[var(--accent-hover)]"
              >
                <span>{t(UI_COPY.openProvince, locale)}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <button
                type="button"
                onClick={() => onOpenQuiz(province)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] px-4 py-2 text-xs font-medium text-[var(--ink-primary)] transition-colors hover:border-[var(--accent-gold)]"
              >
                <Award
                  className={`h-4 w-4 ${
                    hasStamp ? "text-[#3F6B4E]" : "text-[#D49B35]"
                  }`}
                />
                <span>
                  {hasStamp
                    ? t(UI_COPY.stampEarned, locale)
                    : t(UI_COPY.takeQuiz, locale)}
                </span>
              </button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
