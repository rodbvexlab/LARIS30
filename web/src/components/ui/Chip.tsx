import type { ButtonHTMLAttributes, ReactNode } from 'react';

/**
 * Ported from reference/design-system/components/core/Chip.jsx (READ-ONLY).
 *
 * Toggle chip for short single choices — RSVP status, dietary tags, outfit
 * picks. Fills Sun Yellow when selected. Controlled by props: it holds no
 * internal state, so a group of chips stays owned by its parent.
 */

type NativeButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'style' | 'value'>;

export interface ChipProps extends NativeButtonProps {
  children: ReactNode;
  /** Toggled state — fills sun-yellow when selected. */
  selected?: boolean;
}

export function Chip({
  children,
  selected = false,
  type = 'button',
  disabled = false,
  className,
  ...rest
}: ChipProps) {
  return (
    <button
      {...rest}
      type={type}
      disabled={disabled}
      // Communicates the toggle state to screen readers; the original conveys
      // it through fill colour alone.
      aria-pressed={selected}
      className={className ? `focus-ring ${className}` : 'focus-ring'}
      style={{
        fontFamily: 'var(--font-body)',
        fontWeight: 600,
        fontSize: '14px',
        padding: 'var(--space-2) var(--space-4)',
        borderRadius: 'var(--radius-pill)',
        border: 'var(--border-w) solid var(--border-default)',
        background: selected ? 'var(--sun-yellow)' : 'var(--white)',
        color: 'var(--ink)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
      }}
    >
      {children}
    </button>
  );
}
