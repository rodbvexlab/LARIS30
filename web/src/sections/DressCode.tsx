import { SectionKicker } from '../components/ui';

/**
 * Dress Code — section 4 of 13.
 *
 * Visual reference:
 *   reference/design-system/templates/invitation-experience/DressCode.dc.html
 *
 * A fashion film strip, not an e-commerce carousel: cards run wider than the
 * viewport at 62% each, so the next look is always half-visible and the strip
 * reads as a continuing band rather than a paged gallery.
 *
 * Scrolling is native overflow — no carousel library, no Motion drag. Native
 * panning is also what keeps the vertical page scroll working: `touch-action`
 * is left at its default, so a vertical swipe inside the strip still scrolls
 * the page. Motion drag arrives with the real assets.
 */

/**
 * The four looks have no approved assets yet (CONTENT_PENDING §14). These are
 * intentional placeholders, not loading states: flat design-system colour
 * blocks holding the exact frame the photos will occupy. Swapping them for real
 * images means adding a `src`/`alt` to each entry and rendering an <img> in the
 * slot — the geometry above it does not change.
 */
interface LookSlot {
  id: string;
  label: string;
  surface: string;
  /** Ink reads on every surface here except the deepest one. */
  ink?: string;
}

const LOOK_SLOTS: readonly LookSlot[] = [
  { id: 'look-1', label: 'Look 1', surface: 'var(--accent-blush)' },
  { id: 'look-2', label: 'Look 2', surface: 'var(--sun-yellow)' },
  { id: 'look-3', label: 'Look 3', surface: 'var(--pool-blue)' },
  { id: 'look-4', label: 'Look 4', surface: 'var(--summer-orange)' },
];

const TITLE = 'COME COLORIDO.';
const SUPPORT = 'SUMMER & COLORFUL VIBES';

export function DressCode() {
  return (
    <section style={{ background: 'var(--white)', padding: '56px 0 60px' }}>
      <div style={{ padding: '0 var(--space-5)' }}>
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

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            fontWeight: 500,
            letterSpacing: '0.08em',
            color: 'var(--text-muted)',
            marginTop: 'var(--space-2)',
          }}
        >
          {SUPPORT}
        </p>
      </div>

      <ul
        style={{
          display: 'flex',
          gap: '12px',
          overflowX: 'auto',
          padding: '26px var(--space-5) var(--space-2)',
          margin: 0,
          listStyle: 'none',
          scrollSnapType: 'x proximity',
          // Without this the snapport starts at the padding edge, so the
          // browser immediately snaps the first card 24px left and it ends up
          // flush against the screen edge, out of line with the kicker above.
          scrollPaddingLeft: 'var(--space-5)',
          // Stops a horizontal fling from chaining to the browser's
          // back-gesture in the iOS/Android in-app webviews.
          overscrollBehaviorX: 'contain',
        }}
      >
        {LOOK_SLOTS.map((slot) => (
          <li
            key={slot.id}
            style={{
              flex: '0 0 62%',
              aspectRatio: '3 / 4',
              scrollSnapAlign: 'start',
              border: 'var(--border-w) solid var(--ink)',
              borderRadius: 'var(--radius-sharp)',
              overflow: 'hidden',
              background: slot.surface,
              display: 'flex',
              alignItems: 'flex-end',
              padding: 'var(--space-4)',
            }}
          >
            {/* Real text, not a fake image: a screen reader reads exactly what
                is on screen. Replaced by the photo's alt when assets land. */}
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: slot.ink ?? 'var(--ink)',
              }}
            >
              {slot.label}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
