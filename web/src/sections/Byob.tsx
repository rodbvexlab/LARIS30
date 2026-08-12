import { motion } from 'motion/react';

import { VIEWPORT, staggerGroup, staggerItem } from '../components/motion';
import { event } from '../config/event';

/**
 * BYOB — section 8 of 13.
 *
 * Visual reference:
 *   reference/design-system/templates/invitation-experience/Byob.dc.html
 *
 * Full ink field, Sun Yellow display type, centred. No card, no icon, no
 * bottle, no emoji — the contrast and the type are the whole treatment.
 */

const TITLE = 'BYOB';
const LEAD = 'Traga sua bebida alcoólica favorita.';

/**
 * The drinks fact lives in event.ts and is never retyped here.
 *
 * `policies.drinks` is written as a full FAQ answer — "Open Cooler: traga sua
 * bebida favorita. Também teremos refrigerante e suquinho!" — and its middle
 * clause repeats what LEAD already says two lines above. So the format name
 * and everything after that first sentence are kept, and the duplicate
 * instruction is dropped. Change the config and this follows.
 */
function compactDrinks(drinks: string | null): string | null {
  if (!drinks) return null;

  const [format, ...remainder] = drinks.split(/:\s*/);
  if (!format) return drinks;
  if (remainder.length === 0) return drinks;

  // Everything past the first sentence — the part LEAD does not already cover.
  const sentences = remainder.join(': ').split(/(?<=[.!?])\s+/);
  const extra = sentences.slice(1).join(' ').trim();

  return extra ? `${format} — ${extra}` : format;
}

const SUPPORT = compactDrinks(event.policies.drinks);

export function Byob() {
  return (
    <motion.section
      variants={staggerGroup(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      style={{
        background: 'var(--ink)',
        padding: '64px var(--space-5)',
        textAlign: 'center',
      }}
    >
      <motion.h2
        variants={staggerItem}
        style={{ font: '900 60px/0.95 var(--font-display)', color: 'var(--sun-yellow)' }}
      >
        {TITLE}
      </motion.h2>

      <motion.p
        variants={staggerItem}
        style={{
          font: '600 16px/1.5 var(--font-body)',
          color: 'var(--warm-cream)',
          maxWidth: '300px',
          margin: '18px auto 0',
        }}
      >
        {LEAD}
      </motion.p>

      {SUPPORT && (
        <motion.p
          variants={staggerItem}
          style={{
            font: '500 14px/1.5 var(--font-body)',
            color: 'var(--chrome-1)',
            maxWidth: '300px',
            margin: '10px auto 0',
          }}
        >
          {SUPPORT}
        </motion.p>
      )}
    </motion.section>
  );
}
