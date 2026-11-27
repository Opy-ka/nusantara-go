"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Award, Check, Copy, Download, ShieldCheck, Upload, X } from "lucide-react";
import { IslandKey, Locale } from "@/types/culture";
import {
  ALL_PROVINCES,
  ISLAND_REGIONS,
  TOTAL_INDONESIA_PROVINCES,
  getProvincesByIsland,
} from "@/data/provinces";
import { StampRecord } from "@/store/useNusantaraStore";
import { UI_COPY, t } from "@/lib/i18n";

interface PassportModalProps {
  open: boolean;
  locale: Locale;
  stamps: Record<string, StampRecord>;
  onClose: () => void;
  onExportCode: () => string;
  onImportCode: (code: string) => boolean;
  onSelectProvinceSlug: (slug: string) => void;
}

export function PassportModal({
  open,
  locale,
  stamps,
  onClose,
  onExportCode,
  onImportCode,
  onSelectProvinceSlug,
}: PassportModalProps) {
  const [page, setPage] = useState<"stamps" | "backup">("stamps");
  const [islandTab, setIslandTab] = useState<IslandKey>("jawa");
  const [copied, setCopied] = useState(false);
  const [importValue, setImportValue] = useState("");
  const [importStatus, setImportStatus] = useState<"idle" | "ok" | "err">("idle");

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const collectedTotal = Object.keys(stamps).length;
  const regionProvinces = getProvincesByIsland(islandTab);
  const regionCollected = regionProvinces.filter((p) => stamps[p.slug]).length;
  const regionComplete = regionCollected === regionProvinces.length;
  const allComplete = collectedTotal >= ALL_PROVINCES.length;

  const handleCopyBackup = () => {
    const code = onExportCode();
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImport = () => {
    const ok = onImportCode(importValue);
    setImportStatus(ok ? "ok" : "err");
    if (ok) setImportValue("");
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={t(UI_COPY.ctaPassport, locale)}
    >
      <motion.div
        initial={{ opacity: 0, rotateY: -10, scale: 0.96 }}
        animate={{ opacity: 1, rotateY: 0, scale: 1 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        style={{ perspective: 1200 }}
        className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-[#D49B35]/40 bg-[var(--bg-canvas)] shadow-2xl"
      >
        {/* Passport Spine Header */}
        <div className="flex items-center justify-between bg-[#231A14] px-6 py-4 text-[#F7F2E8]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D49B35]/60 bg-[#D49B35]/15 text-[#F2BC52]">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] tracking-widest text-[#D49B35] uppercase">
                Republik Indonesia · Nusantara.go
              </p>
              <h2 className="font-serif text-lg font-semibold">
                {t(UI_COPY.ctaPassport, locale)}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close passport"
            className="rounded-lg p-2 text-[#C5B7A6] hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Sub-nav */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] px-6 py-2.5">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPage("stamps")}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                page === "stamps"
                  ? "bg-[var(--accent)] text-[#F7F2E8]"
                  : "text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]"
              }`}
            >
              {locale === "id" ? "38 Stempel Provinsi" : "38 Province Stamps"}
            </button>
            <button
              type="button"
              onClick={() => setPage("backup")}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                page === "backup"
                  ? "bg-[var(--accent)] text-[#F7F2E8]"
                  : "text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]"
              }`}
            >
              {locale === "id" ? "Kode Cadangan" : "Backup Code"}
            </button>
          </div>

          <div className="text-xs font-semibold text-[var(--ink-primary)] tabular-nums">
            {collectedTotal} / {TOTAL_INDONESIA_PROVINCES}{" "}
            {locale === "id" ? "Stempel Nusantara" : "Archipelago Stamps"}
          </div>
        </div>

        <div className="overflow-y-auto p-6">
          {page === "stamps" ? (
            <div>
              {allComplete && (
                <div className="mb-4 flex items-center gap-2.5 rounded-xl border border-[#D49B35]/50 bg-[#D49B35]/15 px-4 py-3 text-sm font-medium text-[var(--ink-primary)]">
                  <ShieldCheck className="h-5 w-5 text-[#D49B35]" />
                  <span>
                    {locale === "id"
                      ? "Lencana Utama Terbuka: Nusantara Lengkap (38/38 Provinsi)!"
                      : "Master Badge Unlocked: Complete Archipelago (38/38 Provinces)!"}
                  </span>
                </div>
              )}

              {/* 7 Island Region Tabs */}
              <div className="mb-4 flex gap-1.5 overflow-x-auto pb-1">
                {ISLAND_REGIONS.map((reg) => {
                  const list = getProvincesByIsland(reg.key);
                  const count = list.filter((p) => stamps[p.slug]).length;
                  const active = islandTab === reg.key;
                  return (
                    <button
                      key={reg.key}
                      type="button"
                      onClick={() => setIslandTab(reg.key)}
                      className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                        active
                          ? "bg-[#231A14] text-[#F2BC52]"
                          : "border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]"
                      }`}
                    >
                      {reg.name[locale]}{" "}
                      <span className="ml-1 opacity-75 tabular-nums">
                        {count}/{list.length}
                      </span>
                    </button>
                  );
                })}
              </div>

              {regionComplete && (
                <div className="mb-4 flex items-center gap-2 rounded-lg border border-[#3F6B4E]/40 bg-[#3F6B4E]/12 px-3.5 py-2 text-xs text-[var(--ink-primary)]">
                  <ShieldCheck className="h-4 w-4 text-[#3F6B4E]" />
                  <span>
                    {locale === "id"
                      ? `Lencana Penjelajah ${
                          ISLAND_REGIONS.find((r) => r.key === islandTab)?.name.id
                        } terbuka!`
                      : `${
                          ISLAND_REGIONS.find((r) => r.key === islandTab)?.name.en
                        } Explorer Badge unlocked!`}
                  </span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {regionProvinces.map((prov) => {
                  const record = stamps[prov.slug];
                  return (
                    <button
                      key={prov.slug}
                      type="button"
                      onClick={() => {
                        onClose();
                        onSelectProvinceSlug(prov.slug);
                      }}
                      className={`group flex flex-col items-center rounded-xl border p-3.5 text-center transition-colors ${
                        record
                          ? "border-[#3F6B4E]/45 bg-[#3F6B4E]/10"
                          : "border-dashed border-[var(--border-strong)] bg-[var(--bg-surface)]/60 hover:border-[var(--accent)]"
                      }`}
                    >
                      <div
                        className={`flex h-14 w-14 flex-col items-center justify-center rounded-full border-2 border-dashed transition-transform group-hover:scale-105 ${
                          record
                            ? "-rotate-6 border-[#3F6B4E] bg-[#3F6B4E]/15 text-[#3F6B4E]"
                            : "border-[var(--ink-muted)]/40 text-[var(--ink-muted)]"
                        }`}
                      >
                        <span className="text-[10px] font-bold tracking-wider">
                          {prov.code}
                        </span>
                        {record && (
                          <span className="text-[10px] tabular-nums">
                            {record.score}/{record.total}
                          </span>
                        )}
                      </div>
                      <span className="mt-2 text-xs font-semibold text-[var(--ink-primary)]">
                        {prov.name[locale]}
                      </span>
                      <span className="text-[10px] text-[var(--ink-muted)]">
                        {record
                          ? locale === "id"
                            ? "Terkumpul"
                            : "Collected"
                          : prov.capital}
                      </span>
                    </button>
                  );
                })}
              </div>

              <p className="mt-5 text-xs text-[var(--ink-muted)]">
                {t(UI_COPY.noAccountsNote, locale)}
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-[var(--ink-primary)]">
                  <Download className="h-4 w-4 text-[var(--accent)]" />
                  {locale === "id" ? "Ekspor kode cadangan" : "Export backup code"}
                </h3>
                <p className="mt-1 text-xs text-[var(--ink-secondary)]">
                  {locale === "id"
                    ? "Salin kode ini untuk memulihkan koleksi 38 stempel Anda di browser atau perangkat lain."
                    : "Copy this code to restore your collected stamps on another browser or device."}
                </p>
                <button
                  type="button"
                  onClick={handleCopyBackup}
                  className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2 text-xs font-medium text-[#F7F2E8] hover:bg-[var(--accent-hover)]"
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                  {copied
                    ? locale === "id"
                      ? "Kode disalin!"
                      : "Code copied!"
                    : locale === "id"
                    ? "Salin kode paspor"
                    : "Copy passport code"}
                </button>
              </div>

              <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-[var(--ink-primary)]">
                  <Upload className="h-4 w-4 text-[var(--accent)]" />
                  {locale === "id" ? "Impor kode cadangan" : "Import backup code"}
                </h3>
                <div className="mt-2.5 flex gap-2">
                  <input
                    type="text"
                    value={importValue}
                    onChange={(e) => {
                      setImportValue(e.target.value);
                      setImportStatus("idle");
                    }}
                    placeholder={
                      locale === "id"
                        ? "Tempel kode cadangan di sini..."
                        : "Paste backup code here..."
                    }
                    className="flex-1 rounded-md border border-[var(--border-strong)] bg-[var(--bg-canvas)] px-3 py-2 text-xs text-[var(--ink-primary)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                  />
                  <button
                    type="button"
                    onClick={handleImport}
                    className="rounded-md bg-[#231A14] px-4 py-2 text-xs font-medium text-[#F7F2E8] hover:opacity-90"
                  >
                    {locale === "id" ? "Pulihkan" : "Restore"}
                  </button>
                </div>
                {importStatus === "ok" && (
                  <p className="mt-2 text-xs text-[#3F6B4E]">
                    {locale === "id"
                      ? "Progres paspor berhasil dipulihkan!"
                      : "Passport progress restored!"}
                  </p>
                )}
                {importStatus === "err" && (
                  <p className="mt-2 text-xs text-[#B83B2A]">
                    {locale === "id"
                      ? "Kode tidak valid. Periksa kembali salinan Anda."
                      : "Invalid backup code. Please check your pasted text."}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
