"use client";

/**
 * Lightweight Web Audio synthesizer for subtle Nusantara UI feedback
 * and pentatonic (slendro/pelog-inspired) chimes.
 * Never autoplays; strictly gated by soundEnabled user preference.
 */

let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

// Pentatonic Slendro-inspired frequencies (Hz)
const SLENDRO_NOTES = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33];

export function playHoverTone(enabled: boolean, index = 0) {
  if (!enabled) return;
  const ctx = getCtx();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  const freq = SLENDRO_NOTES[index % SLENDRO_NOTES.length];
  osc.frequency.setValueAtTime(freq * 1.5, now);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.04, now + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.24);
}

export function playProvinceChime(enabled: boolean, seed = 0) {
  if (!enabled) return;
  const ctx = getCtx();
  if (!ctx) return;

  const now = ctx.currentTime;
  const pattern = [
    SLENDRO_NOTES[seed % 5],
    SLENDRO_NOTES[(seed + 2) % 6],
    SLENDRO_NOTES[(seed + 4) % 7],
  ];

  pattern.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    const start = now + idx * 0.11;
    osc.frequency.setValueAtTime(freq, start);

    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.08, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.65);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(start);
    osc.stop(start + 0.7);
  });
}

export function playStampSound(enabled: boolean) {
  if (!enabled) return;
  const ctx = getCtx();
  if (!ctx) return;

  const now = ctx.currentTime;
  // Tactile wooden "tok!" thump
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(160, now);
  osc.frequency.exponentialRampToValueAtTime(48, now + 0.12);

  gain.gain.setValueAtTime(0.22, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.18);

  // Celebratory chime after stamp
  playProvinceChime(true, 2);
}

export function playInstrumentPreview(
  enabled: boolean,
  instrument: "angklung" | "gamelan" | "gambang" | "kendang"
) {
  if (!enabled) return;
  const ctx = getCtx();
  if (!ctx) return;

  const now = ctx.currentTime;
  if (instrument === "angklung") {
    // Rapid bamboo tremolo
    for (let i = 0; i < 6; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      const start = now + i * 0.065;
      osc.frequency.setValueAtTime(i % 2 === 0 ? 523.25 : 261.63, start);
      gain.gain.setValueAtTime(0.001, start);
      gain.gain.exponentialRampToValueAtTime(0.08, start + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.13);
    }
  } else if (instrument === "gamelan") {
    // Resonant bronze metallic chord
    [293.66, 440.0, 587.33].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      const start = now + i * 0.2;
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.001, start);
      gain.gain.exponentialRampToValueAtTime(0.09, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 1.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 1.15);
    });
  } else if (instrument === "gambang") {
    // Bright wooden xylophone run
    [392.0, 440.0, 523.25, 587.33, 659.25].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      const start = now + i * 0.09;
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.001, start);
      gain.gain.exponentialRampToValueAtTime(0.08, start + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.27);
    });
  } else {
    // Rhythmic kendang beats
    [120, 180, 120, 210].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      const start = now + i * 0.16;
      osc.frequency.setValueAtTime(freq, start);
      osc.frequency.exponentialRampToValueAtTime(55, start + 0.1);
      gain.gain.setValueAtTime(0.18, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.13);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.15);
    });
  }
}
