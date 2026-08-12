import { useEffect, useRef, useState } from 'react';

import { motion } from 'motion/react';

import { Button, SectionKicker } from '../components/ui';
import { EASE_POP, VIEWPORT, groupReveal } from '../components/motion';
import { event } from '../config/event';
import { resolvePending } from '../lib/pending';
import { formatBrazilianPhone } from '../lib/phone';

/**
 * PIX — section 10 of 13.
 *
 * Visual reference:
 *   reference/design-system/templates/invitation-experience/Pix.dc.html
 *
 * The copy logic is real and complete; only the key is missing. Every state
 * below is derived from `event.pix.key`, so the day that field stops being
 * null the button enables itself and starts copying — no code change here.
 *
 * Deliberately not a checkout: no "pagar", no "valor a pagar", no bank
 * integration, no QR code. It is the contribution, restated with a way to
 * send it.
 */

const COPY_LABEL = 'Copiar Chave Pix';
const COPIED_LABEL = 'Pix Copiado ✓';
const COPY_FAILED_LABEL = 'Não foi possível copiar';

/** MOTION-SPEC K: the label reverts after 2.2s. */
const FEEDBACK_MS = 2200;

/**
 * Clipboard API first, then the legacy selection trick. The fallback matters
 * here: the in-app browsers this invitation opens in are exactly where
 * navigator.clipboard is most often missing or blocked outside a secure
 * context.
 */
async function copyToClipboard(value: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    // Permission denied or insecure context — fall through to the fallback.
  }

  try {
    const field = document.createElement('textarea');
    field.value = value;
    field.setAttribute('readonly', '');
    field.style.position = 'fixed';
    field.style.top = '-9999px';
    document.body.appendChild(field);
    field.select();
    const copied = document.execCommand('copy');
    document.body.removeChild(field);
    return copied;
  } catch {
    return false;
  }
}

type CopyState = 'idle' | 'copied' | 'failed';

export function Pix() {
  const [state, setState] = useState<CopyState>('idle');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const pixKey = event.pix.key;
  const key = resolvePending(pixKey);

  /**
   * Shown formatted, copied raw. A phone-type key is unreadable as a digit
   * run, but the punctuation is presentation only — `handleCopy` always writes
   * `pixKey` itself, so what lands on the clipboard is what the bank expects.
   */
  const displayKey =
    pixKey && event.pix.keyType === 'telefone' ? formatBrazilianPhone(pixKey) : key.text;

  async function handleCopy() {
    if (!pixKey) return;

    const copied = await copyToClipboard(pixKey);
    setState(copied ? 'copied' : 'failed');

    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setState('idle'), FEEDBACK_MS);
  }

  const label =
    state === 'copied' ? COPIED_LABEL : state === 'failed' ? COPY_FAILED_LABEL : COPY_LABEL;

  return (
    <motion.section
      variants={groupReveal}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      style={{
        background: 'var(--white)',
        padding: '56px var(--space-5)',
        textAlign: 'center',
      }}
    >
      <SectionKicker align="center" role="heading" aria-level={2}>
        PIX
      </SectionKicker>

      <p
        style={{
          font: '900 56px var(--font-display)',
          color: 'var(--ink)',
          marginTop: '12px',
        }}
      >
        R${event.contribution}
      </p>

      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '12px',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
          marginTop: '14px',
          wordBreak: 'break-all',
        }}
      >
        Chave Pix · {displayKey}
      </p>

      {/* A single pop when the copy lands — enough to register the change,
          short of celebrating a payment. No confetti here. */}
      <motion.div
        animate={state === 'copied' ? { scale: [1, 1.06, 1] } : { scale: 1 }}
        transition={{ duration: 0.32, ease: EASE_POP }}
        style={{ marginTop: '18px', display: 'flex', justifyContent: 'center' }}
      >
        <Button
          variant={state === 'copied' ? 'secondary' : 'primary'}
          size="lg"
          onClick={handleCopy}
          disabled={key.pending}
        >
          {label}
        </Button>
      </motion.div>

      {/* The button's own label change is not reliably announced, so the
          result is mirrored into a live region. */}
      <p
        aria-live="polite"
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
          clipPath: 'inset(50%)',
          whiteSpace: 'nowrap',
        }}
      >
        {state === 'copied' ? 'Chave Pix copiada.' : ''}
        {state === 'failed' ? 'Não foi possível copiar a chave Pix.' : ''}
      </p>
    </motion.section>
  );
}
