import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { EASE_POP } from './variants';

/**
 * The RSVP celebration — eight dots out and gone, no library.
 *
 * Deliberately not a particle system: a fixed, hand-placed set that finishes
 * in just over a second and leaves nothing running. The parent unmounts it
 * afterwards, so there is no persistent canvas, no rAF loop, no residue.
 *
 * Renders nothing at all under reduced motion.
 */

interface Piece {
  x: number;
  y: number;
  color: string;
  delay: number;
}

/** Design-system colours only, spread so the burst reads as a fan, not a ring. */
const PIECES: readonly Piece[] = [
  { x: -78, y: -46, color: 'var(--sun-yellow)', delay: 0 },
  { x: 64, y: -62, color: 'var(--bubblegum)', delay: 0.04 },
  { x: -44, y: 58, color: 'var(--pool-blue)', delay: 0.08 },
  { x: 86, y: 34, color: 'var(--coral)', delay: 0.12 },
  { x: -96, y: 12, color: 'var(--bubblegum)', delay: 0.06 },
  { x: 34, y: 70, color: 'var(--sun-yellow)', delay: 0.14 },
  { x: 12, y: -84, color: 'var(--coral)', delay: 0.1 },
  { x: -20, y: -70, color: 'var(--pool-blue)', delay: 0.16 },
];

/** Longest piece: 1.2s duration + 0.16s delay, plus a little slack. */
const LIFETIME_MS = 1500;

export function ConfettiBurst() {
  const reduced = usePrefersReducedMotion();
  const [spent, setSpent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setSpent(true), LIFETIME_MS);
    return () => clearTimeout(timer);
  }, []);

  // Leaves nothing behind: once the burst is over the elements are removed
  // rather than parked at opacity 0.
  if (reduced || spent) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: '50%',
        top: '40%',
        width: 0,
        height: 0,
        pointerEvents: 'none',
      }}
    >
      {PIECES.map((piece) => (
        <motion.span
          key={`${piece.x},${piece.y}`}
          initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 1, 0], x: piece.x, y: piece.y, scale: 1 }}
          transition={{ duration: 1.2, delay: piece.delay, ease: EASE_POP }}
          style={{
            position: 'absolute',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: piece.color,
          }}
        />
      ))}
    </div>
  );
}
