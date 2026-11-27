"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Volume2, X, XCircle } from "lucide-react";
import { Locale, Province } from "@/types/culture";
import { playInstrumentPreview, playStampSound } from "@/lib/sound";
import { ProvinceStampSvg } from "./ProvinceStampSvg";

interface QuizModalProps {
  province: Province | null;
  locale: Locale;
  soundEnabled: boolean;
  onClose: () => void;
  onPass: (provinceSlug: string, score: number, total: number) => void;
}

export function QuizModal({
  province,
  locale,
  soundEnabled,
  onClose,
  onPass,
}: QuizModalProps) {
  const [step, setStep] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!province) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [province, onClose]);

  if (!province) return null;

  const questions = province.quiz;
  const current = questions[step];
  const passed = score >= 4;

  const handleChoose = (idx: number) => {
    if (selectedIdx !== null) return;
    setSelectedIdx(idx);
    if (idx === current.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (step + 1 < questions.length) {
      setStep((s) => s + 1);
      setSelectedIdx(null);
    } else {
      const finalScore = score;
      setFinished(true);
      if (finalScore >= 4) {
        playStampSound(soundEnabled);
        onPass(province.slug, finalScore, questions.length);
      }
    }
  };

  const handleRestart = () => {
    setStep(0);
    setSelectedIdx(null);
    setScore(0);
    setFinished(false);
  };

  const instrumentForProvince = ():
    | "angklung"
    | "gamelan"
    | "gambang"
    | "kendang" => {
    if (province.slug === "jawa-barat") return "angklung";
    if (province.slug === "dki-jakarta") return "gambang";
    if (province.slug === "jawa-tengah" || province.slug === "di-yogyakarta")
      return "gamelan";
    return "kendang";
  };

  return (
    <AnimatePresence>
      <div
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-label={
          locale === "id"
            ? `Kuis Stempel ${province.name.id}`
            : `${province.name.en} Stamp Quiz`
        }
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-canvas)] shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-6 py-4">
            <div>
              <p className="text-[11px] font-medium tracking-wider text-[var(--ink-muted)] uppercase">
                {locale === "id" ? "Kuis Paspor Budaya" : "Cultural Passport Quiz"}
              </p>
              <h2 className="font-serif text-xl font-semibold text-[var(--ink-primary)]">
                {province.name[locale]}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close quiz"
              className="rounded-lg p-2 text-[var(--ink-secondary)] transition-colors hover:bg-[var(--bg-surface-strong)] hover:text-[var(--ink-primary)]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6">
            {!finished ? (
              <div>
                {/* Progress bar */}
                <div className="mb-5 flex items-center justify-between text-xs text-[var(--ink-muted)] tabular-nums">
                  <span>
                    {locale === "id"
                      ? `Soal ${step + 1} dari ${questions.length}`
                      : `Question ${step + 1} of ${questions.length}`}
                  </span>
                  <span>
                    {locale === "id" ? `Skor: ${score}` : `Score: ${score}`}
                  </span>
                </div>
                <div className="mb-5 h-1.5 w-full overflow-hidden rounded-full bg-[var(--bg-surface-strong)]">
                  <div
                    className="h-full rounded-full bg-[var(--accent)] transition-all duration-300"
                    style={{ width: `${((step + 1) / questions.length) * 100}%` }}
                  />
                </div>

                {/* Sound hint for sound-guess questions */}
                {current.type === "sound-guess" && (
                  <button
                    type="button"
                    onClick={() =>
                      playInstrumentPreview(true, instrumentForProvince())
                    }
                    className="mb-4 inline-flex items-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] px-3.5 py-2 text-xs font-medium text-[var(--ink-primary)] transition-colors hover:border-[var(--accent-gold)]"
                  >
                    <Volume2 className="h-4 w-4 text-[var(--accent)]" />
                    {locale === "id"
                      ? "Putar cuplikan nada pentatonis"
                      : "Play pentatonic sound cue"}
                  </button>
                )}

                <h3 className="font-serif text-lg leading-snug font-medium text-[var(--ink-primary)]">
                  {current.question[locale]}
                </h3>

                <div className="mt-4 space-y-2.5">
                  {current.options.map((opt, idx) => {
                    const isPicked = selectedIdx === idx;
                    const isCorrect = idx === current.correctIndex;
                    let styleClass =
                      "border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--ink-primary)] hover:border-[var(--accent)]";
                    if (selectedIdx !== null) {
                      if (isCorrect) {
                        styleClass =
                          "border-[#3F6B4E] bg-[#3F6B4E]/15 text-[var(--ink-primary)]";
                      } else if (isPicked) {
                        styleClass =
                          "border-[#B83B2A] bg-[#B83B2A]/12 text-[var(--ink-primary)]";
                      } else {
                        styleClass =
                          "border-[var(--border-subtle)] bg-[var(--bg-surface)]/50 text-[var(--ink-muted)]";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        type="button"
                        disabled={selectedIdx !== null}
                        onClick={() => handleChoose(idx)}
                        className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors ${styleClass}`}
                      >
                        <span>{opt[locale]}</span>
                        {selectedIdx !== null && isCorrect && (
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#3F6B4E]" />
                        )}
                        {selectedIdx !== null && isPicked && !isCorrect && (
                          <XCircle className="h-4 w-4 shrink-0 text-[#B83B2A]" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {selectedIdx !== null && (
                  <div className="mt-4 rounded-xl bg-[var(--bg-surface)] p-3.5 text-xs leading-relaxed text-[var(--ink-secondary)]">
                    {current.explanation[locale]}
                  </div>
                )}

                {selectedIdx !== null && (
                  <div className="mt-5 flex justify-end">
                    <button
                      type="button"
                      onClick={handleNext}
                      className="rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-[#F7F2E8] transition-colors hover:bg-[var(--accent-hover)]"
                    >
                      {step + 1 < questions.length
                        ? locale === "id"
                          ? "Soal berikutnya"
                          : "Next question"
                        : locale === "id"
                        ? "Lihat hasil stempel"
                        : "See stamp result"}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-4 text-center">
                <motion.div
                  initial={{ scale: 2.1, rotate: -18, opacity: 0 }}
                  animate={{ scale: 1, rotate: -6, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 320,
                    damping: 18,
                  }}
                  className="mx-auto mb-4 flex items-center justify-center"
                >
                  <ProvinceStampSvg
                    province={province}
                    earned={passed}
                    size={128}
                    scoreLabel={`${score}/${questions.length}`}
                  />
                </motion.div>

                <h3 className="font-serif text-2xl font-semibold text-[var(--ink-primary)]">
                  {passed
                    ? locale === "id"
                      ? "Stempel Paspor Diraih!"
                      : "Passport Stamp Earned!"
                    : locale === "id"
                    ? "Hampir berhasil!"
                    : "Almost there!"}
                </h3>
                <p className="mt-2 text-sm text-[var(--ink-secondary)] tabular-nums">
                  {locale === "id"
                    ? `Skor Anda ${score} dari ${questions.length} (minimal 4/5 untuk membuka stempel).`
                    : `You scored ${score} of ${questions.length} (need 4/5 to unlock the stamp).`}
                </p>

                <div className="mt-6 flex items-center justify-center gap-3">
                  {!passed && (
                    <button
                      type="button"
                      onClick={handleRestart}
                      className="rounded-lg border border-[var(--border-strong)] px-4 py-2.5 text-sm font-medium text-[var(--ink-primary)] hover:bg-[var(--bg-surface)]"
                    >
                      {locale === "id" ? "Coba lagi" : "Try again"}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-[#F7F2E8] hover:bg-[var(--accent-hover)]"
                  >
                    {locale === "id" ? "Selesai" : "Done"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
