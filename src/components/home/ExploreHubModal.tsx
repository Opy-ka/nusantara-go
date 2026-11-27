"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  MapPin,
  Music,
  Sparkles,
  Volume2,
  X,
} from "lucide-react";
import {
  ALL_PROVINCES,
  ISLAND_REGIONS,
  getCultureOfTheDay,
  getProvincesByIsland,
} from "@/data/provinces";
import { NATIONAL_FESTIVALS } from "@/data/festivals";
import { IslandKey, Locale } from "@/types/culture";
import { CATEGORY_LABELS, UI_COPY, t } from "@/lib/i18n";
import { playInstrumentPreview } from "@/lib/sound";

export type ExploreHubTab = "spotlight" | "directory" | "festivals";

interface ExploreHubModalProps {
  open: boolean;
  initialTab: ExploreHubTab;
  locale: Locale;
  stamps: Record<string, unknown>;
  onClose: () => void;
  onFlyToProvince: (slug: string) => void;
  onOpenPassport: () => void;
}

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

export function ExploreHubModal({
  open,
  initialTab,
  locale,
  stamps,
  onClose,
  onFlyToProvince,
  onOpenPassport,
}: ExploreHubModalProps) {
  const [tab, setTab] = useState<ExploreHubTab>(initialTab);
  const [explorerIsland, setExplorerIsland] = useState<IslandKey>("sumatra");
  const [festivalFilter, setFestivalFilter] = useState<IslandKey | "all">("all");

  useEffect(() => {
    if (open) setTab(initialTab);
  }, [open, initialTab]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

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

  if (!open) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-label="Jelajah Budaya Nusantara"
    >
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-canvas)] shadow-2xl"
      >
        {/* Top Modal Header + Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] px-5 py-3.5">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setTab("spotlight")}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors ${
                tab === "spotlight"
                  ? "bg-[var(--accent)] text-[#F7F2E8]"
                  : "text-[var(--ink-secondary)] hover:bg-[var(--bg-surface-strong)] hover:text-[var(--ink-primary)]"
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              {locale === "id" ? "Sorotan & Bunyi" : "Spotlight & Sound"}
            </button>

            <button
              type="button"
              onClick={() => setTab("directory")}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors ${
                tab === "directory"
                  ? "bg-[var(--accent)] text-[#F7F2E8]"
                  : "text-[var(--ink-secondary)] hover:bg-[var(--bg-surface-strong)] hover:text-[var(--ink-primary)]"
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              {locale === "id" ? "Direktori 38 Provinsi" : "38-Province Directory"}
            </button>

            <button
              type="button"
              onClick={() => setTab("festivals")}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors ${
                tab === "festivals"
                  ? "bg-[var(--accent)] text-[#F7F2E8]"
                  : "text-[var(--ink-secondary)] hover:bg-[var(--bg-surface-strong)] hover:text-[var(--ink-primary)]"
              }`}
            >
              <Calendar className="h-3.5 w-3.5" />
              {locale === "id" ? "Kalender Festival" : "Festival Calendar"}
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close panel"
            className="rounded-lg p-2 text-[var(--ink-secondary)] hover:bg-[var(--bg-surface-strong)] hover:text-[var(--ink-primary)]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Content Inside Modal */}
        <div className="overflow-y-auto p-5 sm:p-6">
          {tab === "spotlight" && (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 lg:col-span-7">
                <svg
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-6 -right-6 h-32 w-32 opacity-[0.07] text-[var(--ink-primary)]"
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
                    <span>{t(UI_COPY.cultureOfDay, locale)}</span>
                    <span className="text-[var(--ink-muted)]">·</span>
                    <span className="text-[var(--ink-muted)]">
                      {CATEGORY_LABELS[cultureToday.item.category][locale]}
                    </span>
                  </div>

                  <h2 className="mt-2.5 font-serif text-3xl font-bold tracking-tight text-[var(--ink-primary)]">
                    {cultureToday.item.name[locale]}
                  </h2>
                  <p className="mt-1 text-xs font-medium text-[var(--ink-muted)]">
                    {cultureToday.province.name[locale]} ·{" "}
                    {cultureToday.province.islandLabel[locale]}
                  </p>

                  <p className="mt-4 text-sm leading-relaxed text-[var(--ink-secondary)]">
                    {cultureToday.item.summary[locale]}
                  </p>

                  <div className="mt-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)]/75 p-4 text-xs leading-relaxed text-[var(--ink-secondary)]">
                    <strong className="font-semibold text-[var(--ink-primary)]">
                      {locale === "id" ? "Fakta unik: " : "Fun fact: "}
                    </strong>
                    {cultureToday.item.funFact[locale]}
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-subtle)] pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onFlyToProvince(cultureToday.province.slug);
                    }}
                    className="text-xs font-medium text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]"
                  >
                    {locale === "id" ? "Lihat di Peta 3D" : "Fly on 3D Map"}
                  </button>
                  <Link
                    href={`/provinsi/${cultureToday.province.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)] hover:underline"
                  >
                    <span>
                      {locale === "id"
                        ? `Jelajahi ${cultureToday.province.name.id}`
                        : `Explore ${cultureToday.province.name.en}`}
                    </span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="flex flex-col justify-between rounded-2xl border border-[var(--border-subtle)] bg-[#231A14] p-6 text-[#F7F2E8] lg:col-span-5">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-xs font-medium text-[#F2BC52]">
                      <Music className="h-4 w-4" />
                      {locale === "id"
                        ? "Panggung Bunyi Nusantara"
                        : "Nusantara Soundpad"}
                    </span>
                    <span className="text-[11px] text-[#C5B7A6]">Web Audio</span>
                  </div>

                  <h3 className="mt-2 font-serif text-xl font-semibold">
                    {locale === "id"
                      ? "Dengarkan warna nada tradisional."
                      : "Listen to traditional timbres."}
                  </h3>

                  <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {SOUNDPAD_ITEMS.map((inst) => (
                      <button
                        key={inst.id}
                        type="button"
                        onClick={() => playInstrumentPreview(true, inst.id)}
                        className="group flex flex-col items-start rounded-xl border border-white/10 bg-white/5 p-3 text-left transition-colors hover:border-[#D49B35]/60 hover:bg-white/10"
                      >
                        <div className="flex w-full items-center justify-between">
                          <span className="text-xs font-semibold text-[#F7F2E8]">
                            {inst.name}
                          </span>
                          <Volume2 className="h-3.5 w-3.5 text-[#F2BC52]" />
                        </div>
                        <span className="mt-0.5 text-[10px] text-[#D49B35]">
                          {inst.origin[locale]}
                        </span>
                        <span className="mt-1 text-[10px] text-[#C5B7A6]">
                          {inst.note[locale]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-3.5 text-xs text-[#C5B7A6]">
                  <span>38 Provinsi · 342 Entri</span>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenPassport();
                    }}
                    className="inline-flex items-center gap-1 font-medium text-[#F2BC52] hover:underline"
                  >
                    <Award className="h-3.5 w-3.5" />
                    {t(UI_COPY.ctaPassport, locale)}
                  </button>
                </div>
              </div>
            </div>
          )}

          {tab === "directory" && (
            <div>
              <div className="flex flex-wrap gap-1.5">
                {ISLAND_REGIONS.map((reg) => (
                  <button
                    key={reg.key}
                    type="button"
                    onClick={() => setExplorerIsland(reg.key)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                      explorerIsland === reg.key
                        ? "bg-[var(--accent)] text-[#F7F2E8]"
                        : "border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]"
                    }`}
                  >
                    {reg.name[locale]}
                  </button>
                ))}
              </div>

              <div
                className="mt-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5"
                style={{ borderLeft: `4px solid ${explorerMeta.accent}` }}
              >
                <h3 className="font-serif text-xl font-bold text-[var(--ink-primary)]">
                  {explorerMeta.name[locale]}
                </h3>
                <p className="text-xs text-[var(--ink-secondary)]">
                  {explorerMeta.subtitle[locale]}
                </p>

                <div className="mt-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
                  {explorerProvinces.map((prov, idx) => {
                    const stamped = Boolean(stamps[prov.slug]);
                    const isLead = idx === 0 && explorerProvinces.length >= 4;
                    return (
                      <div
                        key={prov.slug}
                        className={`flex flex-col justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-4 ${
                          isLead ? "sm:col-span-2" : ""
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

                          <h4 className="mt-1.5 font-serif text-base font-bold text-[var(--ink-primary)]">
                            {prov.name[locale]}
                          </h4>
                          <p className="mt-1 text-xs leading-relaxed text-[var(--ink-secondary)]">
                            {prov.tagline[locale]}
                          </p>
                        </div>

                        <div className="mt-3.5 flex items-center justify-between border-t border-[var(--border-subtle)] pt-2.5">
                          <button
                            type="button"
                            onClick={() => {
                              onClose();
                              onFlyToProvince(prov.slug);
                            }}
                            className="text-xs font-medium text-[var(--ink-muted)] hover:text-[var(--ink-primary)]"
                          >
                            {locale === "id" ? "Terbang di 3D" : "Fly in 3D"}
                          </button>
                          <Link
                            href={`/provinsi/${prov.slug}`}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent)] hover:underline"
                          >
                            <span>{locale === "id" ? "Buka detail" : "Explore"}</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {tab === "festivals" && (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-[var(--ink-secondary)]">
                  {locale === "id"
                    ? "Klik acara untuk langsung menerbangkan kamera 3D ke provinsi asalnya."
                    : "Click any festival to fly the 3D camera directly to its province."}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => setFestivalFilter("all")}
                    className={`rounded-md px-2.5 py-1 text-xs font-medium ${
                      festivalFilter === "all"
                        ? "bg-[#231A14] text-[#F7F2E8]"
                        : "bg-[var(--bg-surface)] text-[var(--ink-secondary)]"
                    }`}
                  >
                    {locale === "id" ? "Semua" : "All"}
                  </button>
                  {ISLAND_REGIONS.filter((r) => r.key !== "maluku").map((r) => (
                    <button
                      key={r.key}
                      type="button"
                      onClick={() => setFestivalFilter(r.key)}
                      className={`rounded-md px-2.5 py-1 text-xs font-medium ${
                        festivalFilter === r.key
                          ? "bg-[var(--accent)] text-[#F7F2E8]"
                          : "bg-[var(--bg-surface)] text-[var(--ink-secondary)]"
                      }`}
                    >
                      {r.name[locale]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 divide-y divide-[var(--border-subtle)] rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
                {visibleFestivals.map((ev) => {
                  const prov = ALL_PROVINCES.find(
                    (p) => p.slug === ev.provinceSlug
                  );
                  return (
                    <button
                      key={ev.id}
                      type="button"
                      onClick={() => {
                        onClose();
                        onFlyToProvince(ev.provinceSlug);
                      }}
                      className="group flex w-full flex-col gap-2 px-5 py-3.5 text-left transition-colors hover:bg-[var(--bg-canvas)]/65 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="max-w-2xl">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-serif text-sm font-semibold text-[var(--ink-primary)] group-hover:text-[var(--accent)]">
                            {ev.name[locale]}
                          </span>
                          {ev.isApproximate && (
                            <span className="rounded bg-[var(--bg-surface-strong)] px-2 py-0.5 text-[10px] font-medium text-[var(--ink-muted)]">
                              {t(UI_COPY.approxDate, locale)}
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 text-xs leading-relaxed text-[var(--ink-secondary)]">
                          {ev.description[locale]}
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-3 text-xs text-[var(--ink-muted)] sm:flex-col sm:items-end sm:gap-1">
                        <span className="inline-flex items-center gap-1 font-medium text-[var(--ink-primary)]">
                          <Calendar className="h-3 w-3 text-[var(--accent-gold)]" />
                          {ev.month[locale]}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-[var(--accent)]" />
                          {prov?.name[locale]}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
