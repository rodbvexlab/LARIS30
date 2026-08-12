import { useId } from 'react';
import type { InputHTMLAttributes } from 'react';

/**
 * Ported from reference/design-system/components/core/Input.jsx (READ-ONLY).
 *
 * Text field with an uppercase label, sharp 2px ink border and a Bubblegum
 * focus ring. Used by the RSVP form.
 *
 * Two deliberate changes to the original:
 * - the label is bound with `htmlFor` instead of wrapping the input, so an
 *   explicit `id` (and the error message's `aria-describedby`) can be honoured;
 * - the focus ring moves from JS `onFocus`/`onBlur` handlers to the shared
 *   `.focus-ring` `:focus-visible` rule, so it survives keyboard navigation
 *   and does not fire on pointer focus.
 */

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'style'> {
  label?: string;
  /**
   * Optional error message. Renders below the field, turns the border coral
   * and wires up `aria-invalid` / `aria-describedby`.
   *
   * The treatment is deliberately quiet: geometry, fill and the Bubblegum
   * focus ring are all unchanged, and the only signal is the border and the
   * message swapping to coral. No icon, no red fill, no alert card, no shake —
   * the design system has no such vocabulary.
   */
  error?: string;
}

export function Input({ label, error, id, className, ...rest }: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  return (
    <div
      className={className}
      style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}
    >
      {label && (
        <label
          htmlFor={inputId}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '12px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--ink)',
          }}
        >
          {label}
        </label>
      )}

      <input
        {...rest}
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={'focus-ring'}
        style={{
          font: 'var(--text-body)',
          padding: 'var(--space-3) 14px',
          border: `var(--border-w) solid ${error ? 'var(--coral)' : 'var(--border-default)'}`,
          borderRadius: 'var(--radius-sharp)',
          background: 'var(--white)',
          color: 'var(--ink)',
        }}
      />

      {error && (
        <span id={errorId} style={{ font: 'var(--text-body-sm)', color: 'var(--coral)' }}>
          {error}
        </span>
      )}
    </div>
  );
}
