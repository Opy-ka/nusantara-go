# Nusantara.go — Design Tokens

## 1. Color Palette (3-Layer Spine)

### Light Mode (Day / Siang — Archival Paper)
- `--bg-canvas`: `#F7F2E8` (Warm archival paper / krem kertas)
- `--bg-surface`: `#EFE8D8` (Elevated parchment card)
- `--bg-surface-strong`: `#E5DBC7` (Subtle control fill)
- `--ink-primary`: `#231A14` (Deep soga wood ink)
- `--ink-secondary`: `#594A3E` (Warm muted brown)
- `--ink-muted`: `#827162` (Caption / metadata)
- `--border-subtle`: `rgba(35, 26, 20, 0.10)`
- `--border-strong`: `rgba(35, 26, 20, 0.18)`
- `--accent`: `#C4532D` (Terracotta / bata nusantara — primary CTA & active state)
- `--accent-hover`: `#A94322`
- `--accent-gold`: `#D49B35` (Emas kunyit — signature hover rim & passport stamp highlight, subordinate)
- `--ocean-deep`: `#1B4D5C` (Biru laut kehijauan — diorama water)
- `--leaf`: `#3F6B4E` (Hijau daun — completed stamp / verified status)

### Night Mode (Malam — Soga Lantern)
- `--bg-canvas`: `#14100E` (Deep soga night)
- `--bg-surface`: `#1E1815` (Elevated dark timber)
- `--bg-surface-strong`: `#2A211C`
- `--ink-primary`: `#F5EFE4`
- `--ink-secondary`: `#C5B7A6`
- `--ink-muted`: `#8E7F6F`
- `--border-subtle`: `rgba(245, 239, 228, 0.10)`
- `--border-strong`: `rgba(245, 239, 228, 0.18)`
- `--accent`: `#E06D44` (Warm lantern terracotta)
- `--accent-gold`: `#F2BC52` (Lantern gold)

## 2. Typography
- **Display / Headings:** `Fraunces` (serif, tight tracking `-0.025em` above 24px, `text-wrap: balance`)
- **Body / UI:** `Plus Jakarta Sans` (clean humanist sans, `tabular-nums` for counts/stats)

## 3. Radius Scale (Varied by Element)
- Inputs & pills: `6px` / `9999px` (chips only)
- Cards & panels: `12px`
- Modals & drawers: `16px`

## 4. Motion Scale
- Micro-interactions: `160ms` `cubic-bezier(0.22, 1, 0.36, 1)`
- Panels / drawers: `280ms` enter, `210ms` exit (~75%)
- 3D camera fly-to: `1.35s` `power3.inOut`
