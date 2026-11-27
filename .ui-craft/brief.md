# Nusantara.go — Design Brief

## 1. Product Identity
- **Name:** Nusantara.go
- **Nature:** Non-commercial educational & portfolio interactive 3D cultural atlas of Indonesia.
- **MVP Scope:** 6 provinces of Java (Banten, DKI Jakarta, Jawa Barat, Jawa Tengah, DI Yogyakarta, Jawa Timur). Other 32 provinces are represented as "Coming soon" / "Segera hadir".
- **Languages:** Bilingual (Indonesian `id` default, English `en`).
- **Accounts:** None. Cultural Passport progress, quiz stamps, and preferences persist in `localStorage` with export/import backup codes.

## 2. Design Intent ("Diorama Nusantara")
- Handcrafted archipelago diorama resting on an artisan's table: warm archival paper neutrals, soga brown ink, terracotta/turmeric-gold accent, low-poly stylized 3D islands floating over a subtle batik-patterned ocean.
- **Knobs:** `CRAFT_LEVEL=8`, `MOTION_INTENSITY=8` (cinematic 3D camera + GSAP, always honoring `prefers-reduced-motion`), `VISUAL_DENSITY=4` (editorial breathing room), `DESIGN_VARIANCE=7`.
- **Signature Detail:** Extruded 3D province tiles that lift with a warm turmeric-gold rim glow on hover, paired with a tactile 3D Cultural Passport stamp animation.

## 3. Target Audience
- Students / Gen Z, local & international travelers, teachers, and general public.

## 4. Voice & Copy
- Warm, curious, grounded, and respectful of regional heritage.
- Sentence case by default. Never use emoji as UI feature icons (use Lucide SVG icons).
- Attribute cultural heritage accurately ("dikenal di..." for shared traditions).

## 5. Accessibility & Performance Floor
- Target 60 fps desktop, >=30 fps mid-range mobile via `PerformanceMonitor` adaptive DPR.
- Full 2D SVG map fallback for WebGL-less devices, screen readers, or user toggle.
- All cultural content rendered as semantic HTML outside the WebGL canvas.
- Keyboard navigation across provinces, WCAG AA contrast, `prefers-reduced-motion` support.

## 6. Learned Constraints
- Project name is **Nusantara.go** (renamed from budaya-go).
- Start MVP with **Java (6 provinces)** only; other provinces show "Segera hadir".
- **No user contribution feature** — explicitly rejected by user.
- Prioritize **eye-pleasing 3D motion & 3D elements**.
