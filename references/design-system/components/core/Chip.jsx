import React from 'react';
export function Chip({ children, selected = false, onClick }) {
  return (
    <button onClick={onClick} style={{
      fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14,
      padding: '8px 16px', borderRadius: 'var(--radius-pill)',
      border: '2px solid var(--ink)',
      background: selected ? 'var(--sun-yellow)' : 'var(--white)',
      color: 'var(--ink)', cursor: 'pointer'
    }}>{children}</button>
  );
}
