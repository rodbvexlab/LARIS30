import { Button } from '../components/ui';
import { event } from '../config/event';
import { formatEventDate } from '../lib/date';
import larisPhoto from '../assets/laris/laris-fashion.png';

/**
 * Hero — section 1 of 13.
 *
 * Visual reference:
 *   reference/design-system/templates/invitation-experience/Hero.dc.html
 *
 * CP2 is the static composition. The motion described in MOTION-SPEC.md
 * (PageLoadSequence, ScrollParallax, FloatingDisco) lands at CP7; nothing here
 * animates yet, and the layout is built so those layers can be wrapped around
 * it without restructuring.
 *
 * Layout numbers below are the composition rhythm taken verbatim from
 * Hero.dc.html. They are one-off editorial values, not scale steps, so they
 * stay literal — colour, type, radius and shadow all come from tokens.
 */

/** Interface copy, not event data. ✦ is part of the approved graphic language. */
const INVITE_LABEL = "You're Invited";
const CTA_LABEL = 'EU VOU ✦';

/** Natural size of the cutout, used to reserve space and avoid layout shift. */
const PHOTO_WIDTH = 1536;
const PHOTO_HEIGHT = 1024;

/**
 * "LARIS 30" -> ["LARIS", "30"], so the two display lines stay derived from
 * the configured wordmark instead of being retyped here.
 */
function splitWordmark(wordmark: string): [string, string] {
  const separator = wordmark.lastIndexOf(' ');
  if (separator === -1) return [wordmark, ''];
  return [wordmark.slice(0, separator), wordmark.slice(separator + 1)];
}

export function Hero() {
  const [name, age] = splitWordmark(event.celebrant.wordmark);

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100dvh',
        overflow: 'hidden',
        background: 'var(--warm-cream)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        paddingTop: 'calc(36px + env(safe-area-inset-top))',
        paddingBottom: 'calc(40px + env(safe-area-inset-bottom))',
        paddingLeft: 'calc(20px + env(safe-area-inset-left))',
        paddingRight: 'calc(20px + env(safe-area-inset-right))',
      }}
    >
      {/* Approved sunburst motif — CSS conic gradient, never an image. */}
      <div className="bg-sunburst" aria-hidden="true" style={{ position: 'absolute', inset: 0 }} />

      <p
        style={{
          position: 'relative',
          zIndex: 2,
          font: 'var(--text-caption)',
          fontWeight: 700,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'var(--ink)',
        }}
      >
        {INVITE_LABEL}
      </p>

      {/*
        The display sizes are the Hero's own literals (88px / 110px at 390px),
        not the --text-display-* scale, whose 10vw ramp is far too small here.
        They are wrapped in clamp() so they shrink below 390px — the ~10% drop
        at 360px that MOTION-SPEC.md flags for the production pass — while
        staying pinned to the approved values from 390px up.
      */}
      <h1
        aria-label={event.celebrant.wordmark}
        style={{ position: 'relative', zIndex: 2, marginTop: '10px' }}
      >
        <span
          style={{
            display: 'block',
            font: '900 clamp(4.5rem, 22.56vw, 5.5rem)/0.82 var(--font-display)',
            color: 'var(--warm-cream)',
            textShadow: '5px 5px 0 var(--ink)',
          }}
        >
          {name}
        </span>
        <span
          style={{
            display: 'block',
            font: '900 clamp(5.625rem, 28.2vw, 6.875rem)/0.82 var(--font-display)',
            color: 'var(--ink)',
          }}
        >
          {age}
        </span>
      </h1>

      <p
        style={{
          position: 'relative',
          zIndex: 2,
          marginTop: '14px',
          fontFamily: 'var(--font-body)',
          fontSize: '15px',
          fontWeight: 600,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'var(--sun-yellow)',
          textShadow: '2px 2px 0 var(--ink)',
        }}
      >
        {event.celebrant.signature}
      </p>

      <p
        style={{
          position: 'relative',
          zIndex: 2,
          marginTop: '6px',
          fontFamily: 'var(--font-body)',
          fontSize: '13px',
          fontWeight: 700,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--ink)',
        }}
      >
        {event.theme}
      </p>

      {/*
        Editorial cutout, not an avatar: it runs wider than the text column and
        bleeds past the Hero's padding. 115% is sized so the figure's own
        bounding box lands just inside the viewport — the only pixels the
        Hero's overflow clips are the transparent margin baked into the file,
        so nothing of Larissa is ever cropped.
      */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '115%',
          marginTop: '8px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '240px',
            height: '240px',
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, var(--bubblegum) 0%, transparent 70%)',
            opacity: 0.5,
          }}
        />
        <img
          src={larisPhoto}
          width={PHOTO_WIDTH}
          height={PHOTO_HEIGHT}
          alt={`${event.celebrant.name}, aniversariante dos ${event.celebrant.age} anos`}
          fetchPriority="high"
          decoding="async"
          style={{
            position: 'relative',
            width: '100%',
            height: 'auto',
            display: 'block',
            objectFit: 'contain',
          }}
        />
      </div>

      {/* Disco journey, touchpoint 1 of 3. Static in CP2. */}
      <div
        className="chrome-sphere"
        aria-hidden="true"
        style={{
          position: 'relative',
          zIndex: 2,
          marginTop: '14px',
          width: '64px',
          height: '64px',
          flexShrink: 0,
        }}
      />

      <p
        style={{
          position: 'relative',
          zIndex: 2,
          marginTop: '18px',
          background: 'var(--ink)',
          color: 'var(--warm-cream)',
          padding: '13px var(--space-5)',
          borderRadius: 'var(--radius-pill)',
          fontFamily: 'var(--font-display)',
          fontSize: '16px',
          fontWeight: 700,
        }}
      >
        {formatEventDate(event.date)}
      </p>

      <div style={{ position: 'relative', zIndex: 2, marginTop: '20px' }}>
        {/* Scrolls to the RSVP section once that section exists (CP5). */}
        <Button variant="primary" size="lg">
          {CTA_LABEL}
        </Button>
      </div>
    </section>
  );
}
