import type { Variants } from 'motion/react';

/**
 * Shared motion vocabulary.
 *
 * These are variants rather than wrapper components on purpose: sections apply
 * them to the elements they already render (`motion.section`, `motion.p`), so
 * nothing new enters the DOM and no layout — flex columns, centred stacks —
 * shifts to accommodate an extra div.
 *
 * Easing mirrors --ease-standard and --ease-pop from the design tokens. The
 * values are duplicated here only because Motion cannot read a CSS variable
 * for an easing curve.
 */

export const EASE_STANDARD = [0.4, 0, 0.2, 1] as const;
export const EASE_POP = [0.34, 1.56, 0.64, 1] as const;

/** Fires once, a fifth of the way in — early enough to feel already-there. */
export const VIEWPORT = { once: true, amount: 0.2 } as const;

/** A whole section arriving as one block. */
export const groupReveal: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_STANDARD },
  },
};

/** Parent that releases its children one after another. */
export function staggerGroup(stagger = 0.08, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren } },
  };
}

/** Default child: lifts and fades. */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE_STANDARD },
  },
};

/** Child that pops into place — used for the dress-code dots and the pills. */
export const popItem: Variants = {
  hidden: { opacity: 0, scale: 0.65 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.42, ease: EASE_POP },
  },
};

/**
 * Sticker arrival. `rotate` is left out deliberately: each sticker carries its
 * own final tilt as an inline transform, and animating rotate here would fight
 * it. The scale overshoot alone reads as a sticker being pressed down.
 */
export const stickerPop: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_POP },
  },
};

/** The Rateio number: a single short punch, no loop, no counter. */
export const amountPop: Variants = {
  hidden: { opacity: 0, scale: 0.86 },
  visible: {
    opacity: 1,
    scale: [0.86, 1.04, 1],
    transition: { duration: 0.55, ease: EASE_POP, times: [0, 0.65, 1] },
  },
};
