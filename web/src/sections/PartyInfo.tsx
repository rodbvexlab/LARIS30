import type { ReactNode } from 'react';

import { SectionKicker } from '../components/ui';
import { event } from '../config/event';
import { formatEventDatePlain } from '../lib/date';
import { resolvePending } from '../lib/pending';

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
  /** Secondary line under the value, used by the venue row. */
  detail?: ReactNode;
  /** The reference drops the rule under the last row. */
  divider?: boolean;
}

function InfoRow({ label, value, pending = false, detail, divider = true }: InfoRowProps) {
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
        {value}
        {detail && (
          <span
            style={{
              display: 'block',
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--text-muted)',
            }}
          >
            {detail}
          </span>
        )}
      </span>
    </div>
  );
}

export function PartyInfo() {
  const time = resolvePending(event.time.start);
  const address = resolvePending(event.venue.address);

  return (
    <section
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

      <InfoRow label="Horário" value={time.text} pending={time.pending} />

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
    </section>
  );
}
