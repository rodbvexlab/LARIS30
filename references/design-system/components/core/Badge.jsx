import React from 'react';
export function Badge({ children, tone = 'bubblegum' }) {
  const bg = { bubblegum: 'var(--bubblegum)', coral: 'var(--coral)', yellow: 'var(--sun-yellow)', blue: 'var(--pool-blue)' }[tone];
  const color = tone === 'yellow' ? 'var(--ink)' : '#fff';
  return (
    <span className="sticker" style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: 96, height: 96, borderRadius: '50%', background: bg, color,
      fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14, textAlign: 'center',
      lineHeight: 1.05, padding: 8
    }}>{children}</span>
  );
}
