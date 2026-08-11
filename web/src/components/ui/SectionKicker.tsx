import type { HTMLAttributes, ReactNode } from 'react';

/**
 * Ported from reference/design-system/components/content/SectionKicker.jsx
 * (READ-ONLY). Small uppercase label with a hand-drawn wavy underline, used
 * above every section heading.
 *
 * The wave is drawn inline, exactly as the original component does, so its
 * stroke can read from `var(--ink)`. The standalone asset — copied to
 * src/assets/decorative/divider-wave.svg — carries the same path but with a
 * baked-in hex, since a file cannot inherit a token.
 */

export interface SectionKickerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'style'> {
  children: ReactNode;
  align?: 'left' | 'center';
}

export function SectionKicker({ children, align = 'left', ...rest }: SectionKickerProps) {
  return (
    <div {...rest} style={{ textAlign: align }}>
      <span
        style={{
          font: 'var(--text-kicker)',
          letterSpacing: 'var(--kicker-tracking)',
          textTransform: 'uppercase',
          color: 'var(--coral)',
        }}
      >
        {children}
      </span>

      <svg
        viewBox="0 0 400 40"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
        style={{
          width: '120px',
          height: '12px',
          display: 'block',
          margin: align === 'center' ? '4px auto 0' : '4px 0 0',
        }}
      >
        <path
          d="M0 20 Q25 0 50 20 T100 20 T150 20 T200 20 T250 20 T300 20 T350 20 T400 20"
          fill="none"
          stroke="var(--ink)"
          strokeWidth="4"
        />
      </svg>
    </div>
  );
}
