import { SectionKicker } from '../components/ui';

/**
 * What's Included — section 7 of 13.
 *
 * Visual reference:
 *   reference/design-system/templates/invitation-experience/Included.dc.html
 *
 * Chip *language* — pill, 2px ink border, 13px body — on plain list items, not
 * on the Chip component. Chip is a <button>: these entries are informational,
 * so rendering them as buttons would promise a toggle that does not exist. The
 * reference reaches the same conclusion, using spans rather than chips, and the
 * varied fills below are not something Chip's approved API expresses anyway.
 */

interface IncludedItem {
  label: string;
  /** Omitted items sit on the section's own surface, per the reference. */
  surface?: string;
  color?: string;
}

// CONTENT PENDING: validar lista final com Larissa antes do release
// (CONTENT_PENDING §10 — the planning list is approved as design content, but
// which items are actually guaranteed on the day is still unvalidated.)
const INCLUDED_ITEMS: readonly IncludedItem[] = [
  { label: 'Chácara' },
  { label: 'Churrasco', surface: 'var(--sun-yellow)' },
  { label: 'Acompanhamentos' },
  { label: 'Frutas / Sobremesa', surface: 'var(--accent-blush)' },
  { label: 'Welcome Drink' },
  { label: 'Água', surface: 'var(--pool-blue)' },
  { label: 'Refrigerante / Suco' },
  { label: 'Gelo' },
  { label: 'Decoração / Estrutura', surface: 'var(--bubblegum)', color: 'var(--white)' },
  { label: 'Mimos' },
];

export function Included() {
  return (
    <section style={{ background: 'var(--white)', padding: 'var(--space-2) var(--space-5) 56px' }}>
      <SectionKicker role="heading" aria-level={2}>
        What&apos;s Included
      </SectionKicker>

      <ul
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          marginTop: '18px',
          padding: 0,
          margin: '18px 0 0',
          listStyle: 'none',
        }}
      >
        {INCLUDED_ITEMS.map((item) => (
          <li
            key={item.label}
            style={{
              border: 'var(--border-w) solid var(--ink)',
              borderRadius: 'var(--radius-pill)',
              padding: 'var(--space-2) var(--space-4)',
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 600,
              background: item.surface,
              color: item.color ?? 'var(--ink)',
            }}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </section>
  );
}
