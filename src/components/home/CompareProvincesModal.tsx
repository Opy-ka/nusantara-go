"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeftRight, ExternalLink, X } from "lucide-react";
import { ALL_PROVINCES } from "@/data/provinces";
import { CategoryKey, Locale } from "@/types/culture";
import { CATEGORY_LABELS } from "@/lib/i18n";

interface CompareProvincesModalProps {
  open: boolean;
  locale: Locale;
  onClose: () => void;
}

const PRESET_PAIRS: [string, string, { id: string; en: string }][] = [
  ["aceh", "papua-pegunungan", { id: "Aceh vs Papua Pegunungan", en: "Aceh vs Highland Papua" }],
  ["bali", "sumatera-barat", { id: "Bali vs Sumatera Barat", en: "Bali vs West Sumatra" }],
  ["di-yogyakarta", "sulawesi-selatan", { id: "DIY vs Sulawesi Selatan", en: "Yogyakarta vs South Sulawesi" }],
];

const COMPARE_CATEGORIES: CategoryKey[] = [
  "rumah-adat",
  "tarian",
  "kuliner",
  "alat-musik",
  "pakaian",
  "senjata",
  "upacara",
];

export function CompareProvincesModal({
  open,
  locale,
  onClose,
}: CompareProvincesModalProps) {
  const [leftSlug, setLeftSlug] = useState("sumatera-barat");
  const [rightSlug, setRightSlug] = useState("bali");

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const left = ALL_PROVINCES.find((p) => p.slug === leftSlug) ?? ALL_PROVINCES[0];
  const right = ALL_PROVINCES.find((p) => p.slug === rightSlug) ?? ALL_PROVINCES[1];

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-label="Bandingkan 2 Provinsi"
    >
      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-canvas)] shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] px-5 py-3.5">
          <div className="flex items-center gap-2">
            <ArrowLeftRight className="h-4 w-4 text-[var(--accent)]" />
            <h2 className="font-serif text-lg font-bold text-[var(--ink-primary)]">
              {locale === "id"
                ? "Bandingkan Budaya 2 Provinsi"
                : "Compare 2 Provinces Side-by-Side"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close comparison"
            className="rounded-lg p-1.5 text-[var(--ink-secondary)] hover:bg-[var(--bg-surface-strong)]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-5">
          {/* Quick Presets */}
          <div className="mb-4 flex flex-wrap gap-1.5">
            {PRESET_PAIRS.map(([a, b, label]) => (
              <button
                key={`${a}-${b}`}
                type="button"
                onClick={() => {
                  setLeftSlug(a);
                  setRightSlug(b);
                }}
                className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3 py-1 text-[11px] font-medium text-[var(--ink-secondary)] hover:border-[var(--accent)] hover:text-[var(--ink-primary)]"
              >
                {label[locale]}
              </button>
            ))}
          </div>

          {/* Province Selectors */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              { value: leftSlug, set: setLeftSlug, prov: left },
              { value: rightSlug, set: setRightSlug, prov: right },
            ].map((slot, i) => (
              <div
                key={i}
                className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3.5"
                style={{ borderTop: `3px solid ${slot.prov.themeColor}` }}
              >
                <select
                  value={slot.value}
                  onChange={(e) => slot.set(e.target.value)}
                  aria-label={`Select province ${i + 1}`}
                  className="w-full rounded-lg border border-[var(--border-strong)] bg-[var(--bg-canvas)] px-3 py-2 text-sm font-semibold text-[var(--ink-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                >
                  {ALL_PROVINCES.map((p) => (
                    <option key={p.slug} value={p.slug}>
                      {p.name[locale]} ({p.islandLabel[locale]})
                    </option>
                  ))}
                </select>
                <div className="mt-2 flex items-center justify-between text-xs text-[var(--ink-muted)]">
                  <span>
                    {slot.prov.capital} · “{slot.prov.greeting.phrase}”
                  </span>
                  <Link
                    href={`/provinsi/${slot.prov.slug}`}
                    className="inline-flex items-center gap-1 font-medium text-[var(--accent)] hover:underline"
                  >
                    <span>Detail</span>
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Side-by-Side Comparison Rows */}
          <div className="mt-5 divide-y divide-[var(--border-subtle)] overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
            {COMPARE_CATEGORIES.map((cat) => {
              const lItem = left.items.find((it) => it.category === cat);
              const rItem = right.items.find((it) => it.category === cat);
              return (
                <div
                  key={cat}
                  className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-12"
                >
                  <div className="text-[11px] font-semibold tracking-wider text-[var(--accent)] uppercase sm:col-span-2">
                    {CATEGORY_LABELS[cat][locale]}
                  </div>
                  <div className="sm:col-span-5">
                    <div className="font-serif text-sm font-semibold text-[var(--ink-primary)]">
                      {lItem?.name[locale]}
                    </div>
                    <p className="mt-0.5 text-xs leading-relaxed text-[var(--ink-secondary)]">
                      {lItem?.summary[locale]}
                    </p>
                  </div>
                  <div className="border-t border-[var(--border-subtle)] pt-2.5 sm:col-span-5 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-4">
                    <div className="font-serif text-sm font-semibold text-[var(--ink-primary)]">
                      {rItem?.name[locale]}
                    </div>
                    <p className="mt-0.5 text-xs leading-relaxed text-[var(--ink-secondary)]">
                      {rItem?.summary[locale]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
