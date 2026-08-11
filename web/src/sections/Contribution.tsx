import { SectionKicker } from '../components/ui';
import { event } from '../config/event';

/**
 * Rateio — section 6 of 13.
 *
 * Visual reference:
 *   reference/design-system/templates/invitation-experience/Rateio.dc.html
 *
 * The number is the whole section: Unbounded 900 in coral with the hard ink
 * shadow, treated as a graphic element rather than a price. The supporting
 * line is the screen's one editorial serif beat.
 *
 * Wording is deliberately about a shared cost, never a ticket: no "valor",
 * no "ingresso", no "pagamento", no call to buy anything here.
 *
 * CP7 wraps the amount in MOTION-SPEC D (StickerPop, scale 0.92 -> 1); it is
 * already an isolated element, so nothing needs restructuring.
 */

const SUPPORT = 'A contribuição ajuda a cobrir a estrutura compartilhada da festa.';

export function Contribution() {
  return (
    <section
      style={{
        background: 'var(--warm-cream)',
        padding: '64px var(--space-5)',
        textAlign: 'center',
      }}
    >
      <SectionKicker align="center" role="heading" aria-level={2}>
        Rateio
      </SectionKicker>

      {/*
        Real text, never an image. clamp() holds the reference's 96px from
        390px up and eases it down on narrower screens so it cannot overflow.
      */}
      <p
        style={{
          font: '900 clamp(4.75rem, 24.6vw, 6rem)/0.9 var(--font-display)',
          color: 'var(--coral)',
          textShadow: '5px 5px 0 var(--ink)',
          marginTop: '12px',
        }}
      >
        R${event.contribution}
      </p>

      <p
        style={{
          font: '400 18px/1.5 var(--font-serif)',
          color: 'var(--ink)',
          marginTop: '18px',
          maxWidth: '320px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        {SUPPORT}
      </p>
    </section>
  );
}
