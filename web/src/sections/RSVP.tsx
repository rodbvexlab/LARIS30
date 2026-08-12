import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import { Button, Input, SectionKicker } from '../components/ui';
import { ConfettiBurst, EASE_POP, VIEWPORT, groupReveal } from '../components/motion';
import { event } from '../config/event';

/**
 * RSVP — section 9 of 13.
 *
 * Visual reference:
 *   reference/design-system/templates/invitation-experience/Rsvp.dc.html
 *
 * The form is real — controlled state, real validation, real submit semantics —
 * but it goes nowhere yet. CP9 wires the Google Apps Script endpoint; until
 * then a valid submit only flips local state.
 *
 * Nothing typed here leaves the browser: no network call, no storage, no
 * logging. A reload clears the form on purpose (persistence is decided with
 * the backend).
 */

const TITLE = 'See You Poolside?';
const SUBMIT_LABEL = 'CONFIRMAR QUE EU VOU';
const SUCCESS_TITLE = "YOU'RE IN ✦";

/**
 * Says nothing about the pool: its rules are still unconfirmed
 * (CONTENT_PENDING §7), so the confirmation stays on the event itself.
 */
const SUCCESS_SUBTITLE = `Presença confirmada. Nos vemos no ${event.celebrant.wordmark}.`;

interface FormErrors {
  name?: string;
  whatsapp?: string;
}

/**
 * Permissive on purpose. Brazilian numbers are written every which way —
 * "(11) 90000-0000", "11 90000 0000", "+55 11 900000000" — so only the digit
 * count is checked: 10 (DDD + 8), 11 (DDD + 9), or the same with the 55
 * country code in front. Anything stricter starts rejecting real guests.
 */
function isValidWhatsapp(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 13;
}

function validate(name: string, whatsapp: string): FormErrors {
  const errors: FormErrors = {};

  if (name.trim().length < 2) {
    errors.name = 'Informe seu nome completo.';
  }

  if (whatsapp.trim() === '') {
    errors.whatsapp = 'Informe seu WhatsApp.';
  } else if (!isValidWhatsapp(whatsapp)) {
    errors.whatsapp = 'Confira o número — inclua o DDD.';
  }

  return errors;
}

export function RSVP() {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [foodRestriction, setFoodRestriction] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  /** Errors only appear after a submit attempt, then track every keystroke. */
  const [attempted, setAttempted] = useState(false);
  const successRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // The form is replaced rather than added to, so focus has to be moved or
    // it lands on <body> and the success is never announced.
    if (submitted) successRef.current?.focus();
  }, [submitted]);

  function revalidate(nextName: string, nextWhatsapp: string) {
    if (attempted) setErrors(validate(nextName, nextWhatsapp));
  }

  function handleSubmit(rsvpEvent: FormEvent<HTMLFormElement>) {
    rsvpEvent.preventDefault();
    setAttempted(true);

    const nextErrors = validate(name, whatsapp);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      // CP9 posts to the Apps Script endpoint here.
      setSubmitted(true);
    }
  }

  return (
    <motion.section
      id="confirmacao"
      variants={groupReveal}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      style={{
        background: 'var(--warm-cream)',
        padding: '56px var(--space-5)',
        position: 'relative',
        overflow: 'hidden',
        scrollMarginTop: 'var(--space-5)',
      }}
    >
      <SectionKicker>Confirmação</SectionKicker>

      <h2
        style={{
          font: '800 32px/1.05 var(--font-display)',
          color: 'var(--ink)',
          margin: '14px 0 var(--space-5)',
        }}
      >
        {TITLE}
      </h2>

      <AnimatePresence mode="wait" initial={false}>
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: EASE_POP }}
          style={{ textAlign: 'center', padding: 'var(--space-5) 0', position: 'relative' }}
        >
          <ConfettiBurst />
          <p
            ref={successRef}
            tabIndex={-1}
            style={{
              font: '900 34px var(--font-display)',
              color: 'var(--coral)',
              outline: 'none',
              position: 'relative',
            }}
          >
            {SUCCESS_TITLE}
          </p>
          <p
            style={{
              font: '500 14px var(--font-body)',
              color: 'var(--text-muted)',
              marginTop: 'var(--space-2)',
              position: 'relative',
            }}
          >
            {SUCCESS_SUBTITLE}
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          noValidate
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
        >
          <Input
            label="Nome completo"
            name="name"
            autoComplete="name"
            placeholder="Seu nome"
            value={name}
            error={errors.name}
            onChange={(field) => {
              setName(field.target.value);
              revalidate(field.target.value, whatsapp);
            }}
          />

          <Input
            label="WhatsApp"
            name="whatsapp"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(11) 90000-0000"
            value={whatsapp}
            error={errors.whatsapp}
            onChange={(field) => {
              setWhatsapp(field.target.value);
              revalidate(name, field.target.value);
            }}
          />

          <Input
            label="Restrição alimentar"
            name="foodRestriction"
            placeholder="Se houver"
            value={foodRestriction}
            onChange={(field) => setFoodRestriction(field.target.value)}
          />

          <div style={{ marginTop: 'var(--space-2)' }}>
            {/* Button omits `style` by design, so full width comes from a class. */}
            <Button type="submit" variant="primary" size="lg" className="w-full">
              {SUBMIT_LABEL}
            </Button>
          </div>
        </motion.form>
      )}
      </AnimatePresence>
    </motion.section>
  );
}
