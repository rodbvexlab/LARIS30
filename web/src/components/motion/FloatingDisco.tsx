import { motion } from 'motion/react';
import type { CSSProperties } from 'react';

import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/**
 * The chrome sphere of the Disco Journey, with a slow drift.
 *
 * Three instances exist and no more — Hero, Mood, Closing. Each takes a
 * slightly different duration so they never fall into step, which is what
 * would make the page feel mechanical.
 *
 * This is the only looping animation left on the page. Under reduced motion it
 * renders completely still.
 */

export interface FloatingDiscoProps {
  size: number;
  /** 5–7s. Vary it per instance so the three never synchronise. */
  duration?: number;
  delay?: number;
  style?: CSSProperties;
}

export function FloatingDisco({ size, duration = 6, delay = 0, style }: FloatingDiscoProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      className="chrome-sphere"
      aria-hidden="true"
      style={{ width: size, height: size, flexShrink: 0, ...style }}
      animate={reduced ? undefined : { y: [-3, 4], rotate: [-1.5, 1.5] }}
      transition={
        reduced
          ? undefined
          : { duration, delay, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }
      }
    />
  );
}

