import React from 'react';
export function Button({ children, variant = 'primary', size = 'md', icon, ...rest }) {
  const bg = variant === 'primary' ? 'var(--coral)' : variant === 'secondary' ? 'var(--ink)' : 'transparent';
  const color = variant === 'ghost' ? 'var(--ink)' : variant === 'secondary' ? 'var(--warm-cream)' : '#fff';
  const border = variant === 'ghost' ? '2px solid var(--ink)' : 'none';
  const pad = size === 'sm' ? '8px 18px' : size === 'lg' ? '16px 32px' : '12px 24px';
  const fs = size === 'sm' ? '13px' : size === 'lg' ? '17px' : '15px';
  return (
    <button
      {...rest}
      style={{
        fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: fs, letterSpacing: '0.01em',
        padding: pad, background: bg, color, border, borderRadius: 'var(--radius-pill)',
        boxShadow: variant === 'ghost' ? 'none' : 'var(--shadow-hard-sm)',
        cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
        transition: 'transform var(--dur-fast) var(--ease-pop), box-shadow var(--dur-fast)'
      }}
      onMouseDown={(e) => { e.currentTarget.style.transform = 'translate(3px,3px)'; e.currentTarget.style.boxShadow = 'none'; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = variant === 'ghost' ? 'none' : 'var(--shadow-hard-sm)'; }}
    >
      {icon}{children}
    </button>
  );
}
