import React from 'react';
export function SectionKicker({ children, align = 'left' }) {
  return (
    <div style={{ textAlign: align }}>
      <span style={{ font: 'var(--text-kicker)', letterSpacing: 'var(--kicker-tracking)', textTransform: 'uppercase', color: 'var(--coral)' }}>{children}</span>
      <svg viewBox="0 0 400 40" preserveAspectRatio="none" style={{ width: 120, height: 12, display: 'block', margin: align === 'center' ? '4px auto 0' : '4px 0 0' }}>
        <path d="M0 20 Q25 0 50 20 T100 20 T150 20 T200 20 T250 20 T300 20 T350 20 T400 20" fill="none" stroke="var(--ink)" strokeWidth="4" />
      </svg>
    </div>
  );
}
