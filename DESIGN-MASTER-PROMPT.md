# VK&S — Master Design Prompt ("Heritage Luxe" Redesign · 2026-06-12)

This is the single brief that governs every visual change across the site
(all pages EXCEPT `vks-timesheet.html` and `admin.html`, which are
self-contained and must never be touched).

> **Owner's rule: NO dark colors.** The footer, stats band, CTA strip,
> page headers and mobile dock all stay light. Depth comes from warm
> champagne tones, gold keylines and shadow — never from dark panels.

---

## 1. Audit Findings (Desktop + Mobile, all pages)

**Desktop**
- The whole site sits on one cream tone: nav `#f7efe6`, hero cream gradient,
  stats bar cream, CTA strip cream, footer cream. Nothing anchors the eye —
  sections melt into each other.
- Cards (bento, achieve, partner, publication, focus, glance) are tidy but
  flat: thin borders, faint shadows, single-color hover.
- Headline accents (`h2 em`) are flat `#8a2338`; no typographic drama.

**Mobile**
- Good bones: glass bottom nav, drawer, partner slider, 2×2 stats grid.
- Same tonal flatness; stat dividers nearly invisible.
- Stat counters: `main.js` already animates `[data-count]` numbers, but the
  HTML never set `data-count` → the animation never ran. Now wired up.

---

## 2. Design Direction — "Heritage Luxe" (all-light)

A premium, heritage chartered-accountancy aesthetic: ivory paper, wine-maroon
accents, antique-gold metalwork. Rhythm comes from alternating **ivory** and
**warm champagne** bands separated by gold keylines.

### Palette (stays inside the brand maroon/gold/cream family — all light)
| Role | Value |
|---|---|
| Wine maroon (accents only) | `#7b1d2e`, `#6f1626`, `#8a2338` |
| Antique gold | `#c49a1a`, bright `#d8b358`, eyebrow `#a07a1c` |
| Ivory / paper | `#fdfcf9`, `#fffefb`, card `#fcf7ec` |
| Champagne bands | `#fcf6ec → #f7efe4 → #f3e7d2` |

### Typography
- Display: **Fraunces** (kept — it is the firm's voice), now loaded as a
  variable font with its **optical-size axis (opsz 9..144)** so large
  headings use the high-contrast display cut automatically.
- Body/UI: **Manrope variable (wght 200..800)** — replaces Inter as primary
  (Inter download dropped; it stays only as a fallback name). Already used in
  the internal timesheet, so the family is consistent firm-wide.
- Precise in-between weights: h1 360, h2 420, h3 480, page-header h1 340.
- Kerning + ligatures on for display text; **tabular numerals** on animated
  counters so digits don't jiggle while counting.
- `h1 em / h2 em` and big stat numerals become a maroon→gold **gradient ink**.

### Cards — one "luxe card" language everywhere
- 18px radius, ivory→warm-cream vertical gradient, hairline maroon border.
- Layered soft shadow; hover = lift −6px, gold hairline, deeper shadow,
  icon tile flips to solid maroon.
- Partner/team photos zoom slowly on hover inside rounded masks.

### Animations (professional, restrained, GPU-friendly)
- Scroll reveals: clean rise + fade only — **no blur filters** (they stutter
  on low-end machines and clash with older passes that pin elements visible).
- Hero: content cascades in on load (CSS only); slow "aurora" drift of warm
  gold/maroon radial glows behind the headline; gradient ink on the serif `em`.
- Buttons: light sheen sweep on hover; gradient maroon primaries.
- Stat numbers count up (`data-count` wired on the home page).
- Thin maroon→gold **scroll-progress bar** at the very top of the viewport.
- Everything wrapped in `@media (prefers-reduced-motion: reduce)` guards.

### Section treatments (all light)
- **Nav**: ivory glass (blur + saturate), gold hairline + shadow once scrolled.
- **Stats bar**: warm champagne band, gold top keyline, gradient-ink numerals.
- **Page headers (`.ph`, jobs/articleship heroes)**: champagne gradient with a
  soft gold glow, faint maroon grid texture, dark ink headline with gradient em.
- **CTA strip**: champagne gradient + gold keyline (text/buttons unchanged).
- **Footer**: warm ivory with a gold top keyline; column links get animated
  underlines. All original light-theme text colors preserved.
- **Mobile bottom nav**: existing light glass, gold hairline ring.

### Per-page notes
- **Home**: hero aurora + cascade, luxe bento cards, animated counters,
  partner cards with photo zoom, industries grid → rounded gapped tiles with
  maroon flood hover.
- **About**: focus/glance/profile cards luxe; split quote gets an oversized
  Fraunces quote mark in gold.
- **Services**: sidebar active state = maroon gradient pill with gold edge;
  visual cards luxe; mobile jump links become pills.
- **Industries / Partners / Publications / Careers / Articleship / Contact /
  Sitemap**: inherit every shared treatment (cards, headers, forms, CTA,
  footer); forms get ivory fields with a maroon focus ring + soft gold halo;
  the contact map sits in a rounded, shadowed frame.

---

## 3. Implementation Rules
1. Never edit `vks-timesheet.html` (and leave `admin.html` alone).
2. No dark backgrounds anywhere (owner's rule). The pre-existing maroon
   "What We Look For" band on Careers keeps its original glass cards.
3. Do not break existing tokens or class names — the site's CSS works in
   **appended dated passes**; this redesign is one new pass at the end of
   `style.css`: `HERITAGE LUXE PASS — 2026-06-12`.
4. Inline `style="color:#8a2338"` accents are overridden via `!important`
   gradient-ink rules — HTML stays untouched where possible.
5. All hover effects must have keyboard `:focus-visible` parity.
6. Mobile-first sanity: every new treatment re-checked at ≤640px and ≤900px.
