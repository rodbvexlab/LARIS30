import { motion } from 'motion/react';

import { VIEWPORT, staggerGroup, staggerItem } from '../components/motion';

/**
 * The Vibe — section 2 of 13.
 *
 * Visual reference:
 *   reference/design-system/templates/invitation-experience/TheVibe.dc.html
 *
 * The emotional turn right after the Hero: a stack of words, no card, no
 * container — typography and colour blocks carry it.
 *
 * Each line lands on its own (MOTION-SPEC C) so the stack reads as a rhythm
 * rather than a paragraph appearing. The section element is itself the stagger
 * parent, which keeps the flex column intact — no wrapper div is introduced.
 */

interface VibeLine {
  text: string;
  font: string;
  color: string;
  /** "Sol." is the one line drawn as an outlined fill, per the reference. */
  outlined?: boolean;
}

const VIBE_LINES: readonly VibeLine[] = [
  { text: '30 anos.', font: '800 40px/1.05 var(--font-display)', color: 'var(--coral)' },
  {
    text: 'Sol.',
    font: '700 34px/1.05 var(--font-display)',
    color: 'var(--sun-yellow)',
    outlined: true,
  },
  { text: 'Piscina.', font: '700 34px/1.05 var(--font-display)', color: 'var(--pool-blue)' },
  { text: 'Música.', font: '700 34px/1.05 var(--font-display)', color: 'var(--bubblegum)' },
  { text: 'Cor.', font: '800 40px/1.05 var(--font-display)', color: 'var(--ink)' },
  { text: 'Amigos.', font: '700 34px/1.05 var(--font-display)', color: 'var(--coral)' },
];

export function Vibe() {
  return (
    <motion.section
      variants={staggerGroup(0.08)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      style={{
        background: 'var(--white)',
        padding: '64px 28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      {VIBE_LINES.map((line) => (
        <motion.p
          key={line.text}
          variants={staggerItem}
          style={{
            font: line.font,
            color: line.color,
            ...(line.outlined ? { WebkitTextStroke: '1.5px var(--ink)' } : null),
          }}
        >
          {line.text}
        </motion.p>
      ))}
    </motion.section>
  );
}
