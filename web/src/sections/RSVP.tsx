import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import { Button, Input, SectionKicker } from '../components/ui';
import { ConfettiBurst, EASE_POP, VIEWPORT, groupReveal } from '../components/motion';
import { event } from '../config/event';

const TITLE = 'Vejo você lá?';
const SUBMIT_LABEL = 'CONFIRMAR QUE EU VOU';
const SUCCESS_TITLE = "YOU'RE IN ✦";
const SUCCESS_SUBTITLE = `Presença confirmada. Nos vemos no ${event.celebrant.wordmark}.`;

interface FormErrors {
  name?: string;
  whatsapp?: string;
}

interface RsvpResponse {
  ok?: boolean;
}

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
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [attempted, setAttempted] = useState(false);
  const successRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (submitted) successRef.current?.focus();
  }, [submitted]);

  function revalidate(nextName: string, nextWhatsapp: string) {
    if (attempted) setErrors(validate(nextName, nextWhatsapp));
  }

  async function handleSubmit(rsvpEvent: FormEvent<HTMLFormElement>) {
    rsvpEvent.preventDefault();
    setAttempted(true);
    setSubmitError(null);

    const nextErrors = validate(name, whatsapp);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0 || submitting) return;

    if (!event.rsvp.endpoint) {
      setSubmitError('A confirmação está temporariamente indisponível. Tente novamente em instantes.');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(event.rsvp.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          whatsapp: whatsapp.replace(/\D/g, ''),
          foodRestriction: foodRestriction.trim(),
        }),
      });

      let payload: RsvpResponse = {};
      try {
        payload = (await response.json()) as RsvpResponse;
      } catch {
        payload = {};
      }

      if (!response.ok || payload.ok !== true) {
        throw new Error('rsvp_failed');
      }

      setSubmitted(true);
    } catch {
      setSubmitError('Não conseguimos registrar sua confirmação. Tente novamente em alguns segundos.');
    } finally {
      setSubmitting(false);
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
              disabled={submitting}
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
              disabled={submitting}
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
              disabled={submitting}
              onChange={(field) => setFoodRestriction(field.target.value)}
            />

            {submitError && (
              <p
                role="alert"
                aria-live="polite"
                style={{
                  margin: 0,
                  font: '600 13px/1.4 var(--font-body)',
                  color: 'var(--coral)',
                }}
              >
                {submitError}
              </p>
            )}

            <div style={{ marginTop: 'var(--space-2)' }}>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={submitting}
                aria-busy={submitting}
              >
                {submitting ? 'CONFIRMANDO...' : SUBMIT_LABEL}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
