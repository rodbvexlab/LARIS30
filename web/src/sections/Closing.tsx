import { event } from '../config/event';

/**
 * Closing — section 13 of 13.
 *
 * Visual reference:
 *   reference/design-system/templates/invitation-experience/Closing.dc.html
 *
 * The sunburst returns to bookend the Hero, but the composition is inverted
 * rather than repeated: the Hero opens on the wordmark and ends on a call to
 * action, while this closes on a statement and rests on the wordmark. No
 * photo, no date, no CTA — the experience stops here.
 *
 * This is the end of the narrative, not a footer: no copyright, no links, no
 * navigation, no social icons.
 */

/**
 * Editorial copy belonging to the Pool Party identity, not an operational
 * claim about pool access (whose rules are still pending).
 */
const CLOSING_LINES = ['See You', 'By The Pool'] as const;

export function Closing() {
  return (
    // The sunburst is the section's own background rather than a layer: there
    // is no parallax here, and a CSS background needs no aria-hiding since it
    // never reaches the accessibility tree.
    <section
      className="bg-sunburst"
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '72px var(--space-5)',
        textAlign: 'center',
      }}
    >
      <h2
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
      </h2>

      {/* Disco journey, touchpoint 3 of 3 — the largest of the three, mirroring
          the Hero's to close the loop. Static in CP6. */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: 'var(--space-5) 0' }}>
        <div className="chrome-sphere" aria-hidden="true" style={{ width: '76px', height: '76px' }} />
      </div>

      {/* Real text, never an image — and never retyped: both come from config. */}
      <p style={{ font: '900 44px var(--font-display)', color: 'var(--ink)' }}>
        {event.celebrant.wordmark}
      </p>

      <p
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
      </p>
    </section>
  );
}
