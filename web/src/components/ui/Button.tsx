import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';
import { motion } from 'motion/react';

/**
 * Ported from reference/design-system/components/core/Button.jsx (READ-ONLY).
 *
 * Pill CTA with a flat hard-edge shadow that flattens on press.
 * Raw size values from the original, for review:
 *   sm  8px/18px · 13px    md  12px/24px · 15px    lg  16px/32px · 17px
 * Padding uses spacing tokens wherever the scale has an exact match; 18px and
 * the three font sizes have no token in the design system and stay literal.
 */

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

/** Motion owns these handlers; drop the React versions to avoid a type clash. */
type NativeButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onAnimationStart' | 'onAnimationEnd' | 'onDrag' | 'onDragStart' | 'onDragEnd' | 'style'
>;

export interface ButtonProps extends NativeButtonProps {
  children: ReactNode;
  /** primary = coral fill, secondary = ink fill, ghost = outline only. */
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
}

const VARIANT: Record<ButtonVariant, CSSProperties> = {
  primary: {
    background: 'var(--coral)',
    color: 'var(--white)',
    border: 'none',
    boxShadow: 'var(--shadow-hard-sm)',
  },
  secondary: {
    background: 'var(--ink)',
    color: 'var(--warm-cream)',
    border: 'none',
    boxShadow: 'var(--shadow-hard-sm)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--ink)',
    border: 'var(--border-w) solid var(--border-default)',
    boxShadow: 'none',
  },
};

const SIZE: Record<ButtonSize, CSSProperties> = {
  sm: { padding: 'var(--space-2) 18px', fontSize: '13px' },
  md: { padding: 'var(--space-3) var(--space-5)', fontSize: '15px' },
  lg: { padding: 'var(--space-4) var(--space-6)', fontSize: '17px' },
};

/**
 * The press moves the button exactly onto its own 3px shadow, which is what
 * reads as the shadow "flattening" — no box-shadow animation needed, and the
 * brief rules that out anyway. Values mirror --dur-fast and --ease-pop; they
 * are duplicated here only because Motion cannot read a CSS variable for
 * easing. CP7 should lift them into a shared motion module.
 */
const PRESS = { x: 3, y: 3 } as const;
const PRESS_TRANSITION = { duration: 0.14, ease: [0.34, 1.56, 0.64, 1] } as const;

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  type = 'button',
  disabled = false,
  className,
  ...rest
}: ButtonProps) {
  return (
    <motion.button
      {...rest}
      type={type}
      disabled={disabled}
      whileTap={disabled ? undefined : PRESS}
      transition={PRESS_TRANSITION}
      className={className ? `focus-ring ${className}` : 'focus-ring'}
      style={{
        fontFamily: 'var(--font-body)',
        fontWeight: 700,
        letterSpacing: '0.01em',
        borderRadius: 'var(--radius-pill)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-2)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        // 0.45 is the design system's own inert treatment — the Location
        // section renders its unavailable Maps/Waze actions at that opacity.
        opacity: disabled ? 0.45 : 1,
        ...VARIANT[variant],
        ...SIZE[size],
      }}
    >
      {icon}
      {children}
    </motion.button>
  );
}
