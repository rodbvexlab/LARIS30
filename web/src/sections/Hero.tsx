import { motion, useScroll, useTransform } from 'motion/react';

import { Button } from '../components/ui';
import { FloatingDisco, EASE_POP } from '../components/motion';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { event } from '../config/event';
import { formatEventDate } from '../lib/date';
import larisPhoto from '../assets/laris/laris-fashion.png';

/**
 * Hero — section 1 of 13.
 *
 * Visual reference:
 *   reference/design-system/templates/invitation-experience/Hero.dc.html
 *
 * Two motion systems, both scoped to this screen:
 *
 *  - the opening sequence, which lands element by element on mount and then
 *    stops. Larissa arrives and stays put; she is the one thing on the page
 *    that must not keep moving.
 *  - a scroll-linked parallax, clamped to the first 600px so it settles
 *    instead of drifting forever. This is the only scroll-driven effect in the
 *    whole experience, kept singular so "cinematic" reads as one considered
 *    moment rather than a page-wide tic.
 *
 * Layout numbers are the composition rhythm from the reference. Colour, type,
 * radius and shadow all come from tokens.
 */

const INVITE_LABEL = "You're Invited";
const CTA_LABEL = 'EU VOU ✦';

/** Natural size of the cutout, used to reserve space and avoid layout shift. */
const PHOTO_WIDTH = 1536;
const PHOTO_HEIGHT = 1024;

/** Where the CTA sends the guest. */
const RSVP_ANCHOR = 'confirmacao';

/** Opening sequence, in ms. Mirrors MOTION-SPEC A. */
const BEAT = {
  label: 150,
  name: 250,
  age: 330,
  signature: 450,
  theme: 520,
  photo: 650,
  date: 800,
  cta: 950,
} as const;

/** One element of the opening: fade up, once, then done. */
function entrance(delayMs: number) {
  return {
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: delayMs / 1000, ease: EASE_POP },
  };
}

function splitWordmark(wordmark: string): [string, string] {
  const separator = wordmark.lastIndexOf(' ');
  if (separator === -1) return [wordmark, ''];
  return [wordmark.slice(0, separator), wordmark.slice(separator + 1)];
}

export function Hero() {
  const [name, age] = splitWordmark(event.celebrant.wordmark);
  const reduced = usePrefersReducedMotion();
  const { scrollY } = useScroll();

  // Clamped to the Hero's own exit. Hooks run unconditionally; the values are
  // simply not applied when the user asked for less motion.
  const sunburstRotate = useTransform(scrollY, [0, 600], [0, 8]);
  const sunburstScale = useTransform(scrollY, [0, 600], [1, 1.06]);
  const wordmarkY = useTransform(scrollY, [0, 600], [0, -24]);
  const photoScale = useTransform(scrollY, [0, 600], [1, 1.05]);
  const discoY = useTransform(scrollY, [0, 600], [0, -30]);

  function scrollToRsvp() {
    document.getElementById(RSVP_ANCHOR)?.scrollIntoView({
      behavior: reduced ? 'auto' : 'smooth',
      block: 'start',
    });
  }

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
      <motion.div
        className="bg-sunburst"
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          ...(reduced ? null : { rotate: sunburstRotate, scale: sunburstScale }),
        }}
      />

      <motion.p
        {...entrance(BEAT.label)}
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
      </motion.p>

      {/*
        Display sizes are the Hero's own literals (88px / 110px at 390px), not
        the --text-display-* scale, whose 10vw ramp is far too small here. The
        clamp shrinks them below 390px — the ~10% drop at 360px that
        MOTION-SPEC.md flags — while staying pinned to the approved values from
        390px up.
      */}
      <motion.h1
        aria-label={event.celebrant.wordmark}
        style={{
          position: 'relative',
          zIndex: 2,
          marginTop: '10px',
          ...(reduced ? null : { y: wordmarkY }),
        }}
      >
        <motion.span
          {...entrance(BEAT.name)}
          style={{
            display: 'block',
            font: '900 clamp(4.5rem, 22.56vw, 5.5rem)/0.82 var(--font-display)',
            color: 'var(--warm-cream)',
            textShadow: '5px 5px 0 var(--ink)',
          }}
        >
          {name}
        </motion.span>
        <motion.span
          {...entrance(BEAT.age)}
          style={{
            display: 'block',
            font: '900 clamp(5.625rem, 28.2vw, 6.875rem)/0.82 var(--font-display)',
            color: 'var(--ink)',
          }}
        >
          {age}
        </motion.span>
      </motion.h1>

      <motion.p
        {...entrance(BEAT.signature)}
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
      </motion.p>

      <motion.p
        {...entrance(BEAT.theme)}
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
      </motion.p>

      {/*
        Editorial cutout, not an avatar: it runs wider than the text column and
        bleeds past the Hero's padding. 115% is sized so the figure's own
        bounding box lands just inside the viewport — the only pixels the
        Hero's overflow clips are the transparent margin baked into the file.
      */}
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: BEAT.photo / 1000, ease: EASE_POP }}
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
        <motion.img
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
            ...(reduced ? null : { scale: photoScale }),
          }}
        />
      </motion.div>

      {/* Disco journey, touchpoint 1 of 3. */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 2,
          marginTop: '14px',
          ...(reduced ? null : { y: discoY }),
        }}
      >
        <FloatingDisco size={64} duration={6.5} />
      </motion.div>

      <motion.p
        {...entrance(BEAT.date)}
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
      </motion.p>

      <motion.div {...entrance(BEAT.cta)} style={{ position: 'relative', zIndex: 2, marginTop: '20px' }}>
        <Button variant="primary" size="lg" onClick={scrollToRsvp}>
          {CTA_LABEL}
        </Button>
      </motion.div>
    </section>
  );
}

