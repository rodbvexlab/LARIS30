import { useId, useState } from 'react';

import { SectionKicker } from '../components/ui';
import { event } from '../config/event';

/**
 * FAQ — section 12 of 13.
 *
 * Visual reference:
 *   reference/design-system/templates/invitation-experience/Faq.dc.html
 *
 * The reference ships illustrative answers that assert things
 * CONTENT_PENDING.md still lists as unconfirmed — that the pool is open, that a
 * welcome drink is included. Under the Golden Rule none of those can ship, so
 * every answer below is derived from src/config/event.ts: a confirmed field is
 * stated, a `null` field says it is coming. Filling a policy in the config
 * upgrades its answer with no change to this file.
 */

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

/** Confirmed regardless of config: the BYOB model itself is settled. */
const BYOB_LEAD = 'Traga sua bebida alcoólica favorita.';

function buildFaqItems(): FaqItem[] {
  const { policies, time } = event;

  return [
    {
      id: 'acompanhante',
      question: 'Posso levar acompanhante?',
      answer: policies.companions ?? 'As regras para acompanhantes serão confirmadas em breve.',
    },
    {
      id: 'levar',
      question: 'O que devo levar?',
      // Only the drink is asserted. Towel, swimwear and cooler all depend on
      // pool and venue rules that are still open (CONTENT_PENDING §7/§9).
      answer: `${BYOB_LEAD} Outros detalhes serão confirmados em breve.`,
    },
    {
      id: 'piscina',
      question: 'A piscina estará liberada?',
      answer: policies.pool ?? 'As regras de uso da piscina serão confirmadas em breve.',
    },
    {
      id: 'estacionamento',
      question: 'Terá estacionamento?',
      answer:
        policies.parking ?? 'As informações sobre estacionamento serão confirmadas em breve.',
    },
    {
      id: 'bebida',
      question: 'Como funciona a bebida?',
      answer:
        policies.drinks ??
        `O formato será BYOB: ${BYOB_LEAD.toLowerCase()} Os demais detalhes sobre bebidas serão confirmados em breve.`,
    },
    {
      id: 'horario',
      question: 'Qual o horário?',
      answer: time.start
        ? `A festa começa às ${time.start}.`
        : 'O horário será divulgado em breve.',
    },
  ];
}

export function FAQ() {
  const items = buildFaqItems();
  const baseId = useId();

  // One open at a time: a traditional accordion, and it keeps the section
  // short on mobile. Matches the reference, whose logic holds a single index.
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section style={{ background: 'var(--white)', padding: '56px var(--space-5)' }}>
      <SectionKicker role="heading" aria-level={2}>
        FAQ
      </SectionKicker>

      <div style={{ marginTop: 'var(--space-4)', display: 'flex', flexDirection: 'column' }}>
        {items.map((item) => {
          const isOpen = openId === item.id;
          const buttonId = `${baseId}-${item.id}-button`;
          const panelId = `${baseId}-${item.id}-panel`;

          return (
            <div key={item.id} style={{ borderBottom: 'var(--border-w) solid var(--ink)' }}>
              {/* h3 wraps the button so the questions form a real outline under
                  the section heading without the heading swallowing the control. */}
              <h3>
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="focus-ring"
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 'var(--space-4)',
                    // Padding lives on the button, not the row, so the whole
                    // line is the touch target rather than just the text.
                    padding: 'var(--space-4) 0',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    font: '700 15px var(--font-body)',
                    color: 'var(--ink)',
                  }}
                >
                  <span>{item.question}</span>
                  {/* Typographic mark, no icon set. aria-expanded already
                      announces the state, so this is decorative. */}
                  <span aria-hidden="true" style={{ flexShrink: 0 }}>
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
              </h3>

              {/*
                Always in the DOM and toggled with `hidden`, so aria-controls
                always points at a real element; `hidden` also takes the panel
                out of the accessibility tree when closed.
              */}
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!isOpen}
                style={{
                  font: '500 14px/1.5 var(--font-body)',
                  color: 'var(--text-muted)',
                  paddingBottom: 'var(--space-4)',
                }}
              >
                {item.answer}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
