# Phase 02 — Motion System Spec

Full experience: `templates/invitation-experience/InvitationExperience.dc.html` (390–430px mobile). Design-system specimen (`templates/invitation/`) is unchanged and stays the component/token reference.

## Disco Journey
Chrome-sphere touchpoints, used with restraint (3 total): Hero (64px, floats up slightly on scroll), The Mood (44px, closes the marquee section), Closing (76px, mirrors the Hero to bookend the page).

## Motion patterns

**A. PageLoadSequence** — Hero only. Purpose: establish the editorial-poster reveal. Trigger: mount. Sequence (delay/element): 150ms label, 250ms "LARIS", 330ms "30", 450ms kicker+subhead, 650ms photo, 800ms date pill, 950ms CTA. Duration 600–700ms each, `--ease-pop` (overshoot). No loop. Reduced motion: skip delays, render all at opacity 1 immediately.

**B. ScrollReveal** — every section below the Hero. Purpose: sections arrive as the user scrolls to them, not all at once. Trigger: IntersectionObserver at 15–20% visibility. Duration 600–800ms, `--ease-standard`. translateY(20–24px)→0 + opacity 0→1. Fires once, no loop. Reduced motion: render revealed state immediately, no transform.

**C. StaggerReveal** — The Vibe word stack. Purpose: each line lands independently for editorial rhythm. Trigger: same observer as B on the container. Per-word delay 0/80/160/240/320/400ms. Reduced motion: all words appear together.

**D. StickerPop** — Rateio price and RSVP/Closing moments. Purpose: give a number or statement graphic weight. Trigger: reveal. Transform: scale(0.92→1), `--ease-pop`. No loop.

**E. FloatingDisco** — chrome sphere in Hero. Purpose: keep the recurring object alive without being busy. Trigger: scroll position (tied to Hero scroll progress, not a separate loop). translateY up to -34px over the Hero's first 600px of scroll. No infinite loop — it's scroll-linked, so it's still when the user is.

**F. ScrollParallax** — Hero only. Purpose: cinematic depth on the one screen that deserves it. Trigger: `scrollY` (rAF-throttled, passive listener). Layers move at different rates: sunburst rotates+scales slowest, title translates/scales mid, photo scales slightly, disco ball moves fastest (furthest layer). Range clamped to first 600px of scroll, so it settles instead of drifting indefinitely.

**G. HorizontalMarquee** — The Mood. Purpose: ambient energy, dual rows moving in opposite directions. Trigger: always running once mounted (ambient, not scroll-gated — only the section kicker above it is scroll-revealed). Duration 26s linear loop, translateX 0→-33.33% / -33.33%→0. Loops indefinitely; paused under reduced motion (see below).

**H. AnimatedHeadline** — reused from A/C (Hero title, Vibe words). No separate mechanism.

**I. ButtonTap** — every `Button`. Purpose: tactile confirmation. Trigger: press. Transform: translate(3px,3px), shadow flattens to none. Duration 140ms (`--dur-fast`). No loop, reverts on release.

**J. ConfettiBurst** — RSVP success. Purpose: one-time celebratory moment, not a persistent effect. Trigger: submit. Four dots animate outward + fade over 0.9s (`--ease-pop`), staggered 0–150ms, then are gone — no residue, no repeat.

**K. PIX success** — copy feedback. Purpose: confirm the copy action clearly on mobile. Trigger: tap "Copiar Chave Pix". Button swaps label + variant ("Pix Copiado ✓", ink fill) for 2.2s, then reverts. No animation beyond the existing ButtonTap.

**L. RSVP success** — see ConfettiBurst; the form is replaced by the "YOU'RE IN ✦" state rather than layered on top of it, so the success moment reads as a clean state change, not a modal.

## Reduced motion
`prefers-reduced-motion: reduce` should: disable the Hero's rAF scroll listener (render layers at rest position), skip PageLoadSequence delays, disable the two Marquee keyframes (rows shown static, first frame), and keep ScrollReveal/StaggerReveal but as an instant opacity swap with no translate. Not yet wired into this HTML pass — flagged for the production build.

## Breakpoint notes
Built at 390–430px (iPhone SE through Pro Max widths sit inside that range without change — the container is `max-width:430px`, fluid below it). At 360px the Hero display type (`clamp`-free literals here) should drop ~10% in the production pass; nothing else needs structural changes. Desktop is out of scope for this phase.

## Self-critique
- The Hero parallax is the only scroll-linked (non-observer) effect — kept deliberately singular so "cinematic" reads as one considered moment, not a page-wide gimmick.
- Considered animating the sunburst continuously (ambient rotation) but cut it: with ScrollParallax already rotating it, a second independent loop would fight the scroll-driven one and read as busy.
- The Mood marquee is the one continuous/looping element on the page by design — flagged here so it doesn't quietly multiply into more looping elements later.
- PIX and Location sections intentionally look inert (disabled-style Maps/Waze links, "Chave Pix · Em Breve") rather than fake-functional, since that data doesn't exist yet — this was chosen over hiding the sections entirely so the page's structure previews correctly.
- Did not add sound, haptics-simulation, or scroll-jacking anywhere — the brief explicitly ruled those out and they're the most common way this genre of page tips into "gimmicky."
