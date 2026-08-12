import { motion } from 'motion/react';

import { FloatingDisco, VIEWPORT, staggerGroup, staggerItem } from '../components/motion';
import { event } from '../config/event';

/**
 * Closing — section 13 of 13.
 *
 * Visual reference:
 *   reference/design-system/templates/invitation-experience/Closing.dc.html
 *
 * The sunburst returns to bookend the Hero, but the composition is inverted
 * rather than repeated: the Hero opens on the wordmark and ends on a call to
 * action, while this closes on a statement and rests on the wordmark.
 *
 * The motion is an echo, not a replay. Where the Hero has an eight-beat
 * opening sequence, this is one short stagger — four elements, and the
 * signature lands last.
 *
 * This is the end of the narrative, not a footer: no copyright, no links, no
 * navigation, no social icons.
 */

const CLOSING_LINES = ['VEJO VOCÊ', 'LÁ EM!!'] as const;

export function Closing() {
  return (
    <motion.section
      className="bg-sunburst"
      variants={staggerGroup(0.14)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '72px var(--space-5)',
        textAlign: 'center',
      }}
    >
      <motion.h2
        variants={staggerItem}
        style={{
          font: '800 34px/1.1 var(--font-display)',
          color: 'var(--warm-cream)',
          textShadow: '3px 3px 0 var(--ink)',
        }}
      >
        {CLOSING_LINES.map((line) => (
          <span key={line} style={{ display: 'block' }}>
            {line}
          </span>
        ))}
      </motion.h2>

      <motion.div
        variants={staggerItem}
        style={{ display: 'flex', justifyContent: 'center', margin: 'var(--space-5) 0' }}
      >
        <FloatingDisco size={76} duration={7} delay={0.2} />
      </motion.div>

      <motion.p
        variants={staggerItem}
        style={{ font: '900 44px var(--font-display)', color: 'var(--ink)' }}
      >
        {event.celebrant.wordmark}
      </motion.p>

      <motion.p
        variants={staggerItem}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '13px',
          fontWeight: 600,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'var(--sun-yellow)',
          textShadow: '1.5px 1.5px 0 var(--ink)',
          marginTop: '6px',
        }}
      >
        {event.celebrant.signature}
      </motion.p>
    </motion.section>
  );
}
