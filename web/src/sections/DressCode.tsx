import { motion } from 'motion/react';

import { SectionKicker } from '../components/ui';
import { VIEWPORT, groupReveal, popItem, staggerGroup } from '../components/motion';

/**
 * Dress Code — section 4 of 13.
 *
 * Visual reference:
 *   reference/design-system/templates/invitation-experience/DressCode.dc.html
 *
 * Reduced to a single instruction and a palette. The reference's four-look
 * film strip is gone: it depended on outfit photography that was never going
 * to exist, and colour communicates the whole dress code on its own — which is
 * also the more honest version, since "come colorido" is the entire rule.
 *
 * The circles are the guidance. They are decorative and carry no text, so they
 * stay out of the accessibility tree; the heading above says everything a
 * screen reader needs.
 */

const TITLE = 'SUMMER VIBES';

/** The palette guests are being pointed at, straight from the tokens. */
const PALETTE = [
  'var(--coral)',
  'var(--bubblegum)',
  'var(--sun-yellow)',
  'var(--pool-blue)',
  'var(--summer-orange)',
] as const;

export function DressCode() {
  return (
    <section style={{ background: 'var(--white)', padding: '56px var(--space-5)' }}>
      <motion.div
        variants={groupReveal}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
      >
        <SectionKicker>Dress Code</SectionKicker>

        <h2
          style={{
            font: '800 36px/1.05 var(--font-display)',
            color: 'var(--ink)',
            marginTop: '14px',
          }}
        >
          {TITLE}
        </h2>
      </motion.div>

      {/* The dots pop in one by one, then hold. Nothing pulses. */}
      <motion.div
        aria-hidden="true"
        variants={staggerGroup(0.07, 0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        style={{
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          marginTop: 'var(--space-5)',
        }}
      >
        {PALETTE.map((color) => (
          <motion.span
            key={color}
            variants={popItem}
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: color,
              border: 'var(--border-w) solid var(--ink)',
              flexShrink: 0,
            }}
          />
        ))}
      </motion.div>
    </section>
  );
}
