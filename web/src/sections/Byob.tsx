/**
 * BYOB — section 8 of 13.
 *
 * Visual reference:
 *   reference/design-system/templates/invitation-experience/Byob.dc.html
 *
 * Full ink field, Sun Yellow display type, centred. No card, no icon, no
 * bottle, no emoji — the contrast and the type are the whole treatment.
 */

const TITLE = 'BYOB';

/** Confirmed: CONTENT_PENDING §9 lists the BYOB model and this instruction. */
const LEAD = 'Traga sua bebida alcoólica favorita.';

/**
 * CONTENT PENDING: provisional wording, needs approval (CONTENT_PENDING §9/§16).
 *
 * The reference reads "Teremos welcome drink e estrutura básica de bebidas
 * disponível", which names items CONTENT_PENDING §9 explicitly still lists as
 * unvalidated ("quais itens estarão efetivamente garantidos no dia"). Under the
 * Golden Rule that sentence cannot ship as written, so this says only what is
 * settled — that a shared base exists — and defers the contents.
 */
const SUPPORT = 'O resto da estrutura de bebidas será confirmado em breve.';

export function Byob() {
  return (
    <section
      style={{
        background: 'var(--ink)',
        padding: '64px var(--space-5)',
        textAlign: 'center',
      }}
    >
      <h2 style={{ font: '900 60px/0.95 var(--font-display)', color: 'var(--sun-yellow)' }}>
        {TITLE}
      </h2>

      <p
        style={{
          font: '600 16px/1.5 var(--font-body)',
          color: 'var(--warm-cream)',
          maxWidth: '300px',
          margin: '18px auto 0',
        }}
      >
        {LEAD}
      </p>

      <p
        style={{
          font: '500 14px/1.5 var(--font-body)',
          color: 'var(--chrome-1)',
          maxWidth: '300px',
          margin: '10px auto 0',
        }}
      >
        {SUPPORT}
      </p>
    </section>
  );
}
