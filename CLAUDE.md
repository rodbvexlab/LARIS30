# LARIS 30 — IN FULL COLOR

## Project role

This repository contains the production implementation of the interactive web invitation for Larissa's 30th birthday.

Official project wordmark:

LARIS 30

Do not rename it to:
- LARI 30
- LARISSA 30

## Source of truth

The approved Claude Design export is located at:

@reference/design-system/

Read and understand it before implementing anything.

Especially inspect:

@reference/design-system/readme.md
@reference/design-system/SKILL.md

Locate and read the approved invitation experience and MOTION-SPEC.md inside the exported Design System before planning implementation.

The files under `reference/design-system/` are READ-ONLY DESIGN REFERENCES.

DO NOT modify or replace them.

Production code must be created under:

`web/`

## Master brief

Read:

@docs/LARI30_BRIEFING_MASTER.md

## Visual direction

Preserve the approved identity:

- Retro Summer
- Y2K Pop
- Disco
- Editorial Fashion
- Pool Party
- Coral / orange / pink / cream palette
- Chrome elements
- Hard-shadow language
- Sunburst
- Stickers
- LARIS 30 wordmark

Do not redesign the visual identity.

Do not create a generic SaaS-style landing page.

Do not introduce a new design system.

## Production target

Build a real mobile-first web application.

Preferred stack:

- Vite
- React
- TypeScript
- Tailwind CSS
- Motion / Framer Motion

Primary viewport:

390 × 844

The experience is primarily opened through WhatsApp on iPhone and Android.

## Architecture requirements

Use maintainable components.

Do not build the entire page in App.tsx.

Expected section architecture:

- Hero
- Vibe
- PartyInfo
- DressCode
- Mood
- Contribution
- Included
- BYOB
- RSVP
- Pix
- Location
- FAQ
- Closing

Centralize editable event information in:

`src/config/event.ts`

Do not duplicate event data across components.

## Motion

Follow the approved MOTION-SPEC.

Motion must prioritize:

- transform
- opacity
- scroll progress
- subtle parallax
- restrained continuous animation

Respect:

`prefers-reduced-motion`

Avoid:

- heavy WebGL
- persistent particle canvases
- video backgrounds
- scroll hijacking
- excessive blur
- excessive animation

## Assets

Original user-provided assets:

`assets/`

Do not overwrite originals.

Production-optimized versions should be stored inside the application asset structure.

## Missing information

Never fabricate:

- event time
- exact address
- PIX key
- payment deadline
- RSVP deadline
- companion policy
- parking rules
- pool rules

When unavailable, preserve intentional "Em breve" states.

## Safety

Before making major structural changes:

1. inspect the project;
2. explain the implementation plan;
3. identify files that will be created/changed;
4. only then implement.

Never expose secrets in source code.

## Current objective

Convert the approved Claude Design experience into a clean production React application while preserving its visual hierarchy, interaction model and mobile experience.