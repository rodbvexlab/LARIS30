import React from 'react';
export function Card({ kicker, title, children, tone = 'white' }) {
  const bg = { white: 'var(--white)', cream: 'var(--warm-cream)', pink: 'var(--accent-blush)' }[tone];
  return (
    <div style={{
      background: bg, border: 'var(--border-w) solid var(--border-default)',
      boxShadow: 'var(--shadow-hard)', borderRadius: 'var(--radius-sharp)',
      padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 8
    }}>
      {kicker && <span style={{ font: 'var(--text-kicker)', letterSpacing: 'var(--kicker-tracking)', textTransform: 'uppercase', color: 'var(--coral)' }}>{kicker}</span>}
      {title && <span style={{ font: 'var(--text-display-sm)', color: 'var(--ink)' }}>{title}</span>}
      <div style={{ font: 'var(--text-body)', color: 'var(--text-muted)' }}>{children}</div>
    </div>
  );
}
