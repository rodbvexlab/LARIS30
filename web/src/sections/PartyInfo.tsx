import type { ReactNode } from 'react';
import { motion } from 'motion/react';

import { SectionKicker } from '../components/ui';
import { VIEWPORT, groupReveal } from '../components/motion';
import { event } from '../config/event';
import { formatEventDatePlain, formatEventTime } from '../lib/date';
import { PENDING_LABEL, resolvePending } from '../lib/pending';

/**
 * Party Info — section 3 of 13.
 *
 * Visual reference:
 *   reference/design-system/templates/invitation-experience/PartyInfo.dc.html
 *
 * Editorial rule-separated rows, deliberately not cards: the reference sets a
 * label/value pair on a baseline with a 2px ink rule under it, which reads as
 * an invitation. Cards here would read as a dashboard.
 *
 * Every value comes from src/config/event.ts. Unconfirmed values arrive as
 * `null` and render through resolvePending(), which is also what turns them
 * coral — the pending state is visible, never silently blank or invented.
 */

interface InfoRowProps {
  label: string;
  value: string;
  /** Unconfirmed values are set in coral, matching the reference's "Em Breve". */
  pending?: boolean;
  /** Small line above the value — qualifies it without shrinking the number. */
  prefix?: string;
  /** Secondary line under the value, used by the venue row. */
  detail?: ReactNode;
  /** The reference drops the rule under the last row. */
  divider?: boolean;
}

/** Shared styling for the small lines that sit above and below a value. */
const SUPPORT_LINE = {
  display: 'block',
  fontFamily: 'var(--font-body)',
  fontSize: '13px',
  fontWeight: 600,
  color: 'var(--text-muted)',
} as const;

function InfoRow({ label, value, pending = false, prefix, detail, divider = true }: InfoRowProps) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        gap: 'var(--space-4)',
        ...(divider
          ? { borderBottom: 'var(--border-w) solid var(--ink)', paddingBottom: '14px' }
          : null),
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '13px',
          fontWeight: 700,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
          flexShrink: 0,
        }}
      >
        {label}
      </span>

      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '26px',
          fontWeight: 800,
          color: pending ? 'var(--coral)' : 'var(--ink)',
          textAlign: 'right',
        }}
      >
        {prefix && (
          <span style={{ ...SUPPORT_LINE, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {prefix}
          </span>
        )}
        {value}
        {detail && <span style={SUPPORT_LINE}>{detail}</span>}
      </span>
    </div>
  );
}

export function PartyInfo() {
  const startTime = event.time.start;
  const address = resolvePending(event.venue.address);

  return (
    // Arrives as one block: animating each row separately would turn a
    // three-line fact sheet into a performance.
    <motion.section
      variants={groupReveal}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      style={{
        background: 'var(--warm-cream)',
        padding: '56px var(--space-5)',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
      }}
    >
      {/* The kicker is this section's heading — there is no larger title above
          the rows — so it is exposed as one without changing the component. */}
      <SectionKicker role="heading" aria-level={2}>
        Party Info
      </SectionKicker>

      <InfoRow label="Data" value={formatEventDatePlain(event.date)} />

      {/* The end time is still unconfirmed, so the row states an opening time
          rather than a window — "A partir das" carries that honestly. */}
      <InfoRow
        label="Horário"
        value={startTime ? formatEventTime(startTime) : PENDING_LABEL}
        pending={startTime === null}
        prefix={startTime ? 'A partir das' : undefined}
      />

      {/*
        The venue TYPE is confirmed ("Chácara"); its name, address and city are
        not. Only the type is shown, so nothing is implied about which chácara.
      */}
      <InfoRow
        label="Local"
        value={event.venue.type}
        detail={address.pending ? 'Endereço em breve' : address.text}
        divider={false}
      />
    </motion.section>
  );
}
