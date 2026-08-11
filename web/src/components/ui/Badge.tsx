import type { HTMLAttributes, ReactNode } from 'react';

/**
 * Ported from reference/design-system/components/core/Badge.jsx (READ-ONLY).
 *
 * Circular sticker badge — "TURNS 30", "POOL PARTY". Purely decorative
 * treatment: the `sticker` motif (rotate -4deg + hard drop-shadow) comes from
 * the design system's motifs stylesheet. 96px matches --space-9 exactly.
 */

export type BadgeTone = 'bubblegum' | 'coral' | 'yellow' | 'blue';

export interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'style'> {
  children: ReactNode;
  /** Fill color. */
  tone?: BadgeTone;
}

const TONE: Record<BadgeTone, { background: string; color: string }> = {
  bubblegum: { background: 'var(--bubblegum)', color: 'var(--white)' },
  coral: { background: 'var(--coral)', color: 'var(--white)' },
  yellow: { background: 'var(--sun-yellow)', color: 'var(--ink)' },
  blue: { background: 'var(--pool-blue)', color: 'var(--white)' },
};

export function Badge({ children, tone = 'bubblegum', className, ...rest }: BadgeProps) {
  return (
    <span
      {...rest}
      className={className ? `sticker ${className}` : 'sticker'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 'var(--space-9)',
        height: 'var(--space-9)',
        borderRadius: '50%',
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        fontSize: '14px',
        lineHeight: 1.05,
        textAlign: 'center',
        padding: 'var(--space-2)',
        ...TONE[tone],
      }}
    >
      {children}
    </span>
  );
}
