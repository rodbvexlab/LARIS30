import type { HTMLAttributes, ReactNode } from 'react';

/**
 * Ported from reference/design-system/components/content/Card.jsx (READ-ONLY).
 *
 * Hard-shadow editorial card for event-detail blocks — When, Where, Dress
 * Code. A primitive, not a default container: sections only use it where the
 * approved layouts actually show a card.
 */

export type CardTone = 'white' | 'cream' | 'pink';

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'style'> {
  kicker?: string;
  title?: string;
  children?: ReactNode;
  tone?: CardTone;
}

const TONE: Record<CardTone, string> = {
  white: 'var(--white)',
  cream: 'var(--warm-cream)',
  pink: 'var(--accent-blush)',
};

export function Card({ kicker, title, children, tone = 'white', ...rest }: CardProps) {
  return (
    <div
      {...rest}
      style={{
        background: TONE[tone],
        border: 'var(--border-w) solid var(--border-default)',
        boxShadow: 'var(--shadow-hard)',
        borderRadius: 'var(--radius-sharp)',
        padding: 'var(--space-5)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-2)',
      }}
    >
      {kicker && (
        <span
          style={{
            font: 'var(--text-kicker)',
            letterSpacing: 'var(--kicker-tracking)',
            textTransform: 'uppercase',
            color: 'var(--coral)',
          }}
        >
          {kicker}
        </span>
      )}

      {/* A heading rather than the original's <span>: a titled card inside a
          section belongs in the document outline. */}
      {title && <h3 style={{ font: 'var(--text-display-sm)', color: 'var(--ink)' }}>{title}</h3>}

      {children && (
        <div style={{ font: 'var(--text-body)', color: 'var(--text-muted)' }}>{children}</div>
      )}
    </div>
  );
}
