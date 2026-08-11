/**
 * The Vibe — section 2 of 13.
 *
 * Visual reference:
 *   reference/design-system/templates/invitation-experience/TheVibe.dc.html
 *
 * The emotional turn right after the Hero: a stack of words, no card, no
 * container — typography and colour blocks carry it. Static in CP3.
 *
 * The lines are a data array rather than six hand-written elements so CP7 can
 * add StaggerReveal (per-line delay 0/80/160/240/320/400ms, per MOTION-SPEC C)
 * by wrapping the map body, with no restructuring here.
 */

interface VibeLine {
  text: string;
  font: string;
  color: string;
  /** "Sol." is the one line drawn as an outlined fill, per the reference. */
  outlined?: boolean;
}

const VIBE_LINES: readonly VibeLine[] = [
  { text: '30 anos.', font: '800 40px/1.05 var(--font-display)', color: 'var(--coral)' },
  {
    text: 'Sol.',
    font: '700 34px/1.05 var(--font-display)',
    color: 'var(--sun-yellow)',
    outlined: true,
  },
  { text: 'Piscina.', font: '700 34px/1.05 var(--font-display)', color: 'var(--pool-blue)' },
  { text: 'Música.', font: '700 34px/1.05 var(--font-display)', color: 'var(--bubblegum)' },
  { text: 'Cor.', font: '800 40px/1.05 var(--font-display)', color: 'var(--ink)' },
  { text: 'Amigos.', font: '700 34px/1.05 var(--font-display)', color: 'var(--coral)' },
];

export function Vibe() {
  return (
    <section
      style={{
        background: 'var(--white)',
        padding: '64px 28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      {VIBE_LINES.map((line) => (
        <p
          key={line.text}
          style={{
            font: line.font,
            color: line.color,
            ...(line.outlined ? { WebkitTextStroke: '1.5px var(--ink)' } : null),
          }}
        >
          {line.text}
        </p>
      ))}
    </section>
  );
}
