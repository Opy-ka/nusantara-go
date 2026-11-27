"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  HelpCircle,
  RotateCcw,
  Target,
  Trophy,
  X,
  XCircle,
} from "lucide-react";
import { Locale, Province } from "@/types/culture";
import { CATEGORY_LABELS } from "@/lib/i18n";

export interface GeoGameRound {
  province: Province;
  clueCategory: "rumah-adat" | "kuliner" | "tarian" | "alat-musik";
  clueName: { id: string; en: string };
  clueSummary: { id: string; en: string };
}

interface GeoGameOverlayProps {
  locale: Locale;
  rounds: GeoGameRound[];
  roundIndex: number;
  score: number;
  bestScore: number;
  showHint: boolean;
  lastGuess: { guessed: Province; correct: boolean } | null;
  finished: boolean;
  onToggleHint: () => void;
  onNextRound: () => void;
  onRestart: () => void;
  onExit: () => void;
}

export function GeoGameOverlay({
  locale,
  rounds,
  roundIndex,
  score,
  bestScore,
  showHint,
  lastGuess,
  finished,
  onToggleHint,
  onNextRound,
  onRestart,
  onExit,
}: GeoGameOverlayProps) {
  const current = rounds[roundIndex];
  if (!current) return null;

  return (
    <motion.div
      initial={{ y: 24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="pointer-events-auto absolute right-4 bottom-4 left-4 z-30 mx-auto w-full max-w-xl rounded-2xl border border-[#D49B35]/50 bg-[#1B1410]/92 p-4 text-[#F7F2E8] shadow-2xl backdrop-blur-md sm:p-5"
    >
      {!finished ? (
        <div>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1 rounded-full bg-[#D49B35]/20 px-2.5 py-0.5 font-semibold text-[#F2BC52]">
                <Target className="h-3.5 w-3.5" />
                {locale === "id" ? "Tebak Provinsi 3D" : "Guess the Province 3D"}
              </span>
              <span className="text-[#C5B7A6] tabular-nums">
                {roundIndex + 1}/{rounds.length}
              </span>
              <span className="font-semibold text-[#F7F2E8] tabular-nums">
                · {locale === "id" ? "Skor" : "Score"}: {score}
              </span>
            </div>

            <button
              type="button"
              onClick={onExit}
              aria-label="Exit game"
              className="rounded-lg p-1 text-[#C5B7A6] hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-3">
            <p className="text-[11px] font-medium tracking-wider text-[#D49B35] uppercase">
              {CATEGORY_LABELS[current.clueCategory][locale]}
            </p>
            <h3 className="mt-0.5 font-serif text-xl font-bold text-[#F7F2E8]">
              {current.clueName[locale]}
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-[#C5B7A6]">
              {locale === "id"
                ? "Klik langsung provinsi asalnya di Peta 3D Indonesia!"
                : "Click its home province directly on the 3D map of Indonesia!"}
            </p>
          </div>

          {showHint && !lastGuess && (
            <div className="mt-2.5 rounded-lg border border-[#D49B35]/30 bg-[#D49B35]/10 px-3 py-1.5 text-xs text-[#F2BC52]">
              {locale === "id"
                ? `Petunjuk: Berada di gugus pulau ${current.province.islandLabel.id} (sapaan: "${current.province.greeting.phrase}").`
                : `Hint: Located in ${current.province.islandLabel.en} (greeting: "${current.province.greeting.phrase}").`}
            </div>
          )}

          {lastGuess && (
            <div
              className={`mt-3 flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-xs ${
                lastGuess.correct
                  ? "border border-[#3F6B4E]/50 bg-[#3F6B4E]/20 text-[#D9F2E2]"
                  : "border border-[#E06D44]/50 bg-[#E06D44]/15 text-[#FCE2D8]"
              }`}
            >
              <div className="flex items-center gap-2">
                {lastGuess.correct ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#5EC282]" />
                ) : (
                  <XCircle className="h-4 w-4 shrink-0 text-[#F2845C]" />
                )}
                <span>
                  {lastGuess.correct
                    ? locale === "id"
                      ? `Tepat sekali! ${current.province.name.id} (${current.province.capital}).`
                      : `Spot on! ${current.province.name.en} (${current.province.capital}).`
                    : locale === "id"
                    ? `Kamu klik ${lastGuess.guessed.name.id}. Jawaban benar: ${current.province.name.id}.`
                    : `You clicked ${lastGuess.guessed.name.en}. Correct answer: ${current.province.name.en}.`}
                </span>
              </div>

              <button
                type="button"
                onClick={onNextRound}
                className="shrink-0 rounded-lg bg-[var(--accent)] px-3 py-1.5 text-xs font-semibold text-[#F7F2E8] hover:bg-[var(--accent-hover)]"
              >
                {roundIndex + 1 < rounds.length
                  ? locale === "id"
                    ? "Lanjut"
                    : "Next"
                  : locale === "id"
                  ? "Hasil"
                  : "Results"}
              </button>
            </div>
          )}

          {!lastGuess && (
            <div className="mt-3 flex items-center justify-between">
              <button
                type="button"
                onClick={onToggleHint}
                className="inline-flex items-center gap-1 text-xs font-medium text-[#D49B35] hover:underline"
              >
                <HelpCircle className="h-3.5 w-3.5" />
                {showHint
                  ? locale === "id"
                    ? "Petunjuk aktif"
                    : "Hint shown"
                  : locale === "id"
                  ? "Lihat petunjuk pulau"
                  : "Show island hint"}
              </button>
              <span className="text-[11px] text-[#C5B7A6] tabular-nums">
                {locale === "id" ? "Rekor terbaik" : "Best"}: {bestScore}/{rounds.length}
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center py-2 text-center">
          <Trophy className="h-8 w-8 text-[#F2BC52]" />
          <h3 className="mt-2 font-serif text-2xl font-bold">
            {locale === "id" ? "Tantangan Selesai!" : "Challenge Complete!"}
          </h3>
          <p className="mt-1 text-sm text-[#C5B7A6] tabular-nums">
            {locale === "id"
              ? `Skor akhir: ${score} dari ${rounds.length} · Rekor terbaik: ${Math.max(
                  bestScore,
                  score
                )}/${rounds.length}`
              : `Final score: ${score} of ${rounds.length} · Best: ${Math.max(
                  bestScore,
                  score
                )}/${rounds.length}`}
          </p>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={onRestart}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-[#F7F2E8] hover:bg-[var(--accent-hover)]"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              {locale === "id" ? "Main lagi" : "Play again"}
            </button>
            <button
              type="button"
              onClick={onExit}
              className="rounded-lg border border-white/15 px-4 py-2 text-xs font-medium text-[#F7F2E8] hover:bg-white/10"
            >
              {locale === "id" ? "Kembali ke Peta" : "Back to Map"}
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
