"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Route,
  X,
} from "lucide-react";
import { STORY_TOURS, StoryTour } from "@/data/storyTours";
import { ALL_PROVINCES } from "@/data/provinces";
import { Locale } from "@/types/culture";

interface StoryTourOverlayProps {
  tour: StoryTour;
  stopIndex: number;
  locale: Locale;
  onChangeTour: (tour: StoryTour) => void;
  onChangeStop: (idx: number) => void;
  onExit: () => void;
}

export function StoryTourOverlay({
  tour,
  stopIndex,
  locale,
  onChangeTour,
  onChangeStop,
  onExit,
}: StoryTourOverlayProps) {
  const stop = tour.stops[stopIndex];
  const province = ALL_PROVINCES.find((p) => p.slug === stop.provinceSlug);

  return (
    <motion.div
      initial={{ y: 24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="pointer-events-auto absolute right-4 bottom-4 left-4 z-30 mx-auto w-full max-w-2xl rounded-2xl border border-[#D49B35]/45 bg-[#1B1410]/92 p-4 text-[#F7F2E8] shadow-2xl backdrop-blur-md sm:p-5"
    >
      {/* Tour Selector Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <Route className="h-4 w-4 text-[#F2BC52]" />
          {STORY_TOURS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onChangeTour(item)}
              className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-colors ${
                item.id === tour.id
                  ? "bg-[#D49B35] text-[#231A14]"
                  : "bg-white/8 text-[#C5B7A6] hover:bg-white/15 hover:text-white"
              }`}
            >
              {item.title[locale]}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={onExit}
          aria-label="Exit story tour"
          className="rounded-lg p-1 text-[#C5B7A6] hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Active Stop Narrative */}
      <div className="mt-3">
        <div className="flex items-center justify-between text-[11px] text-[#D49B35]">
          <span className="font-semibold uppercase tracking-wider">
            {locale === "id"
              ? `Perhentian ${stopIndex + 1} dari ${tour.stops.length}`
              : `Stop ${stopIndex + 1} of ${tour.stops.length}`}{" "}
            · {province?.name[locale]}
          </span>
          {province && (
            <Link
              href={`/provinsi/${province.slug}`}
              className="inline-flex items-center gap-1 font-medium text-[#F2BC52] hover:underline"
            >
              <span>{locale === "id" ? "Buka provinsi" : "Open province"}</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
          )}
        </div>

        <h3 className="mt-1 font-serif text-lg font-bold text-[#F7F2E8] sm:text-xl">
          {stop.headline[locale]}
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-[#C5B7A6]">
          {stop.story[locale]}
        </p>
      </div>

      {/* Step Controls */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-1.5">
          {tour.stops.map((s, idx) => (
            <button
              key={s.provinceSlug}
              type="button"
              aria-label={`Stop ${idx + 1}`}
              onClick={() => onChangeStop(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === stopIndex
                  ? "w-6 bg-[#F2BC52]"
                  : "w-2 bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            disabled={stopIndex === 0}
            onClick={() => onChangeStop(stopIndex - 1)}
            className="inline-flex items-center gap-1 rounded-lg border border-white/15 px-3 py-1.5 text-xs font-medium text-[#F7F2E8] disabled:opacity-35 hover:bg-white/10"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            {locale === "id" ? "Sebelumnya" : "Prev"}
          </button>
          <button
            type="button"
            onClick={() =>
              onChangeStop((stopIndex + 1) % tour.stops.length)
            }
            className="inline-flex items-center gap-1 rounded-lg bg-[var(--accent)] px-3.5 py-1.5 text-xs font-semibold text-[#F7F2E8] hover:bg-[var(--accent-hover)]"
          >
            <span>
              {stopIndex + 1 < tour.stops.length
                ? locale === "id"
                  ? "Terbang lanjut"
                  : "Next stop"
                : locale === "id"
                ? "Ulangi tur"
                : "Replay tour"}
            </span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
