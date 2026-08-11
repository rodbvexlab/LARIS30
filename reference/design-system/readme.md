# LARIS 30 — Design System

A one-off visual identity for **Larissa's 30th birthday Pool Party**, 22 August 2026. Built for a single mobile-first invitation site — mainly opened from WhatsApp links on phones — not a reusable product brand.

No codebase, Figma file, or existing brand was supplied. The starting materials were six mood-reference images (`uploads/04_ref_sunburst_disco.jpg` through `uploads/09_ref_smiley_pink.jpg`): 60s/70s radial sunbursts, disco balls, a groovy cowboy-boots illustration, and melty Y2K smiley/heart stickers. Those are references only, not brand assets — nothing was copied from them; the palette and type system below are original interpretations of the same visual language (Retro Summer, Y2K Pop, Disco Culture, Editorial Fashion).

A real cutout photo of Larissa will be dropped into the hero later — the invitation template ships with an image-slot placeholder for it.

## Index
- `styles.css` — root stylesheet, imports everything below
- `tokens/` — colors, typography, spacing, fonts, motifs (all CSS custom properties)
- `guidelines/` — foundation specimen cards (colors, type, spacing, brand motifs)
- `components/core/` — Button, Chip, Badge, Input
- `components/content/` — Card, SectionKicker
- `templates/invitation/` — Phase 01 design-system specimen page (`Invitation.dc.html`) — component/token reference, not the final architecture
- `templates/invitation-experience/` — Phase 02 full scroll-driven mobile experience (`InvitationExperience.dc.html`, 13 section DCs, `MOTION-SPEC.md`)
- `assets/` — sparkle and wave-divider SVGs (only original marks; no logo was supplied)

## Components
- **Button** (`components/core/Button.jsx`) — pill CTA, primary/secondary/ghost, flat press
- **Chip** (`components/core/Chip.jsx`) — toggle chip for RSVP / short choices
- **Badge** (`components/core/Badge.jsx`) — circular sticker badge ("Turns 30", "Pool Party")
- **Input** (`components/core/Input.jsx`) — text field with uppercase label
- **Card** (`components/content/Card.jsx`) — hard-shadow event-detail card
- **SectionKicker** (`components/content/SectionKicker.jsx`) — uppercase label + wavy underline

### Intentional additions
No component source was provided, so the set above is a from-scratch minimum sized to one invitation flow (hero, event details, RSVP) — not a full app component library. Added only what the invitation actually uses.

## Content fundamentals
- **Voice**: direct address, second person ("You're Invited", "See You Poolside?") — confident and a little playful, never cutesy.
- **Casing**: display headlines and kickers are set in full caps or title case with heavy tracking; body/serif copy is normal sentence case.
- **Tone**: warm, celebratory, self-assured. Example line used in the invite: *"Thirty years in, and finally dressed for the occasion."*
- **Length**: short. One punchy sentence per card, no paragraphs.
- **Emoji**: none. The identity leans on color, type weight and stickers for personality instead of emoji.
- **Numerals**: the age ("30") is always oversized and treated as a graphic element, not just a number in a sentence.

## Visual foundations
- **Color**: warm base (Coral, Summer Orange, Soft Pink, Warm Cream) carries most surface area; Bubblegum Pink, Sun Yellow and Pool Blue are used as pops on badges, chips and accents only. Deep Ink is the only text/border color — no gray scale. Max two background colors active in any one view.
- **Type**: Unbounded (display) is oversized, tight-leading, almost always uppercase — used for hero wordmark, section headers, big numerals. Space Grotesk (body) carries UI copy, labels, buttons. Domine (serif) is reserved for one editorial pull-quote per screen — it's the "fashion magazine" beat against the two geometric sans fonts.
- **Backgrounds**: full-bleed only — the hero is a repeating conic-gradient sunburst; content sections alternate cream / ink / white flats. No photo backgrounds behind text, no gradients besides the sunburst and the chrome-sphere radial.
- **Shadows**: one system — a flat, hard-edged offset shadow (`--shadow-hard`, 6px/6px, solid ink, no blur) on cards and badges. No soft/diffuse drop shadows, no glassmorphism.
- **Corners**: sharp (2px) on cards and photos — editorial, not "app-rounded." Full pill radius reserved for buttons, chips and badges only. Nothing in between.
- **Borders**: solid 2px Deep Ink border on cards and inputs — a graphic-poster line weight, not a subtle 1px hairline.
- **Motion**: presses flatten the hard shadow and nudge the element 3px into it (`--ease-pop`), buttons and chips only. No page-load fade-ins, no parallax by default.
- **Imagery**: warm-toned, sun-lit, candid — pool, disco, outfit shots. No black-and-white, no heavy grain/filter treatment implied.
- **Iconography**: no icon font or SVG icon set. The identity uses two custom marks instead — a four-point sparkle (`assets/sparkle.svg`) and a hand-drawn wave divider (`assets/divider-wave.svg`) — plus a CSS-only chrome-sphere motif (`--chrome-sphere` in `tokens/motifs.css`) standing in for the disco ball. No emoji, no unicode glyphs used as icons.
- **Logo**: none was supplied. Every place a mark would go instead uses the "LARIS 30" wordmark set in Unbounded — see `guidelines/brand-wordmark.html`.

## Fonts
All three fonts (Unbounded, Space Grotesk, Domine) are loaded from Google Fonts via `tokens/fonts.css` — no font files were supplied, so nothing needed substituting; these were chosen fresh to fit the creative brief (chunky Y2K display face, clean geometric body, one editorial serif accent).

## Caveats / open questions
- No logo or existing brand assets exist yet — flag if a hand-drawn mark or monogram is wanted instead of the type-only wordmark.
- Hero photo of Larissa is a placeholder (`image-slot`) — drop the real cutout in `templates/invitation/Invitation.dc.html` when ready.
- Component set is intentionally minimal (6 primitives) since this is a single-page invitation, not a multi-screen product — say if the invite grows a second page (e.g. a photo-upload/guestbook screen) and more primitives are needed.
