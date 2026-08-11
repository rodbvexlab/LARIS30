import React from 'react';
export function Input({ label, placeholder, ...rest }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontFamily: 'var(--font-body)' }}>
      {label && <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink)' }}>{label}</span>}
      <input {...rest} placeholder={placeholder} style={{
        font: 'var(--text-body)', padding: '12px 14px', border: '2px solid var(--ink)',
        borderRadius: 'var(--radius-sharp)', background: 'var(--white)', color: 'var(--ink)', outline: 'none'
      }} onFocus={(e) => e.currentTarget.style.boxShadow = '0 0 0 3px var(--focus-ring)'}
        onBlur={(e) => e.currentTarget.style.boxShadow = 'none'} />
    </label>
  );
}
