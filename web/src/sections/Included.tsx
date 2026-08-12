import { motion } from 'motion/react';

import { SectionKicker } from '../components/ui';
import { VIEWPORT, groupReveal, staggerGroup, staggerItem } from '../components/motion';

/**
 * O que está incluso — section 7 of 13.
 *
 * Visual reference:
 *   reference/design-system/templates/invitation-experience/Included.dc.html
 *
 * Chip *language* — pill, 2px ink border, 13px body — on plain list items, not
 * on the Chip component. Chip is a <button>: these entries are informational,
 * so rendering them as buttons would promise a toggle that does not exist. The
 * reference reaches the same conclusion, using spans rather than chips, and the
 * varied fills below are not something Chip's approved API expresses anyway.
 */

interface IncludedItem {
  label: string;
  /** Omitted items sit on the section's own surface, per the reference. */
  surface?: string;
  color?: string;
}

/**
 * The approved list, and deliberately about the experience rather than an
 * inventory: naming supplies (ice, water, dessert) both reads like a receipt
 * and commits to items CONTENT_PENDING §10 has not settled. Only the churrasco
 * is a concrete deliverable here; the rest is what the day feels like, which
 * nothing can contradict later.
 */
const INCLUDED_ITEMS: readonly IncludedItem[] = [
  { label: 'Churrasco', surface: 'var(--sun-yellow)' },
  { label: 'Música boa' },
  { label: 'Muita festa', surface: 'var(--accent-blush)' },
  { label: 'Bons papos' },
  { label: 'Gente querida', surface: 'var(--pool-blue)' },
  { label: 'Energia lá em cima', surface: 'var(--bubblegum)', color: 'var(--white)' },
];

export function Included() {
  return (
    <section style={{ background: 'var(--white)', padding: 'var(--space-2) var(--space-5) 56px' }}>
      <motion.div
        variants={groupReveal}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
      >
        <SectionKicker role="heading" aria-level={2}>
          O que está incluso
        </SectionKicker>
      </motion.div>

      <motion.ul
        variants={staggerGroup(0.06, 0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          marginTop: '18px',
          padding: 0,
          margin: '18px 0 0',
          listStyle: 'none',
        }}
      >
        {INCLUDED_ITEMS.map((item) => (
          <motion.li
            key={item.label}
            variants={staggerItem}
            style={{
              border: 'var(--border-w) solid var(--ink)',
              borderRadius: 'var(--radius-pill)',
              padding: 'var(--space-2) var(--space-4)',
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 600,
              background: item.surface,
              color: item.color ?? 'var(--ink)',
            }}
          >
            {item.label}
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
