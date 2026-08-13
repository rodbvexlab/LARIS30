import type { CSSProperties } from 'react';
import { motion } from 'motion/react';

import { SectionKicker } from '../components/ui';
import { VIEWPORT, groupReveal } from '../components/motion';
import { event } from '../config/event';

/**
 * Location — section 11 of 13.
 *
 * Visual reference:
 *   reference/design-system/templates/invitation-experience/LocationSection.dc.html
 *
 * Every value is derived from `event.venue`, and each action becomes a real
 * link the moment its URL exists.
 */

const ACTION_STYLE: CSSProperties = {
  border: 'var(--border-w) solid var(--ink)',
  borderRadius: 'var(--radius-pill)',
  padding: 'var(--space-3) 20px',
  fontFamily: 'var(--font-body)',
  fontSize: '13px',
  fontWeight: 700,
  color: 'var(--ink)',
  textDecoration: 'none',
  display: 'inline-block',
};

/** Off-screen but readable by assistive tech. */
const SR_ONLY: CSSProperties = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  clipPath: 'inset(50%)',
  whiteSpace: 'nowrap',
};

/**
 * Renders a real anchor when the URL exists and inert text when it does not.
 * Never a disabled <a>: an anchor without an href is not a control, so there
 * is nothing to disable — and a fake one would be announced as a link that
 * goes nowhere.
 *
 * While unavailable, the short visible label is hidden from assistive tech and
 * replaced by the full sentence. Sighted users still read "Abrir no Maps", but
 * a screen reader gets the reason instead of a dead-end label — the greyed-out
 * styling that carries that meaning visually says nothing out loud.
 */
function VenueAction({
  label,
  href,
  unavailableText,
}: {
  label: string;
  href: string | null;
  unavailableText: string;
}) {
  if (!href) {
    return (
      <span style={{ ...ACTION_STYLE, opacity: 0.45 }}>
        <span aria-hidden="true">{label}</span>
        <span style={SR_ONLY}>{unavailableText}</span>
      </span>
    );
  }

  return (
    <a className="focus-ring" href={href} target="_blank" rel="noopener noreferrer" style={ACTION_STYLE}>
      {label}
    </a>
  );
}

export function Location() {
  return (
    // One group reveal, and nothing on the Maps/Waze actions: they are
    // unavailable, and motion on a dead control reads as a promise.
    <motion.section
      variants={groupReveal}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      style={{
        background: 'var(--accent-blush)',
        padding: '56px var(--space-5)',
        textAlign: 'center',
      }}
    >
      <SectionKicker align="center">Location</SectionKicker>

      <h2
        style={{
          font: '800 32px/1.1 var(--font-display)',
          color: 'var(--ink)',
          marginTop: '12px',
        }}
      >
        {event.venue.name ?? event.venue.type}
      </h2>

      {event.venue.address && (
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '15px',
            fontWeight: 600,
            color: 'var(--ink)',
            marginTop: 'var(--space-1)',
          }}
        >
          {event.venue.address}
        </p>
      )}

      {event.venue.city && event.venue.postalCode && (
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            fontWeight: 500,
            color: 'var(--text-muted)',
            marginTop: '6px',
          }}
        >
          {event.venue.city} · CEP {event.venue.postalCode}
        </p>
      )}

      <div
        style={{
          display: 'flex',
          gap: '10px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginTop: '22px',
        }}
      >
        <VenueAction
          label="Abrir no Maps"
          href={event.venue.mapsUrl}
          unavailableText="Google Maps disponível quando o endereço for confirmado."
        />
        <VenueAction
          label="Abrir no Waze"
          href={event.venue.wazeUrl}
          unavailableText="Waze disponível quando o endereço for confirmado."
        />
      </div>
    </motion.section>
  );
}
