import { version as reactVersion } from 'react';
import type { ReactNode } from 'react';
import { motion } from 'motion/react';

import { event } from './config/event';

/**
 * CP0 — technical foundation check.
 *
 * This is scaffolding, not design. It exists to prove React, the ported design
 * tokens, the three brand fonts, the CSS motifs, Tailwind and the build all
 * work before any of the 13 sections get implemented. It is replaced, not
 * extended, at the next checkpoint.
 */

const SWATCHES = [
  { label: 'Coral', token: '--coral' },
  { label: 'Summer Orange', token: '--summer-orange' },
  { label: 'Soft Pink', token: '--soft-pink' },
  { label: 'Warm Cream', token: '--warm-cream' },
  { label: 'Pool Blue', token: '--pool-blue' },
  { label: 'Bubblegum', token: '--bubblegum' },
  { label: 'Sun Yellow', token: '--sun-yellow' },
  { label: 'Deep Ink', token: '--ink' },
] as const;

/** Counts unconfirmed fields — every `null` in the event config. */
function countPending(value: unknown): number {
  if (value === null) return 1;
  if (typeof value === 'object') {
    return Object.values(value as Record<string, unknown>).reduce<number>(
      (total, child) => total + countPending(child),
      0,
    );
  }
  return 0;
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b-2 border-ink py-3">
      <span
        className="uppercase"
        style={{ font: 'var(--text-caption)', letterSpacing: 'var(--kicker-tracking)' }}
      >
        {label}
      </span>
      <span style={{ font: 'var(--text-body-sm)' }}>{children}</span>
    </div>
  );
}

export default function App() {
  const pending = countPending(event);

  return (
    <main className="mx-auto max-w-[430px] px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="inline-block bg-ink px-4 py-2 pill"
        style={{ font: 'var(--text-caption)', color: 'var(--text-inverse)' }}
      >
        CP0 · FOUNDATION OK
      </motion.div>

      <h1 className="font-display mt-6 text-5xl font-black">{event.celebrant.wordmark}</h1>

      <div className="bg-sunburst my-6 h-3" />

      <section className="hard-card p-6">
        <p style={{ font: 'var(--text-display-sm)' }}>Display · Unbounded</p>
        <p className="mt-2" style={{ font: 'var(--text-body)' }}>
          Body · Space Grotesk
        </p>
        <p className="mt-2" style={{ font: 'var(--text-editorial)' }}>
          Editorial · Domine
        </p>
      </section>

      <div className="mt-6 grid grid-cols-4 gap-2">
        {SWATCHES.map((swatch) => (
          <div
            key={swatch.token}
            title={swatch.label}
            className="border-ink aspect-square border-2"
            style={{ background: `var(${swatch.token})` }}
          />
        ))}
      </div>

      <div className="mt-6 flex items-center gap-4">
        <div className="chrome-sphere h-16 w-16" />
        <div
          className="bg-sun-yellow border-ink sticker border-2 px-4 py-2"
          style={{ font: 'var(--text-caption)' }}
        >
          STICKER
        </div>
      </div>

      <section className="mt-8">
        <Row label="React">{reactVersion}</Row>
        <Row label="Data">{event.date}</Row>
        <Row label="Rateio">R$ {event.contribution},00</Row>
        <Row label="Campos pendentes">{pending}</Row>
      </section>
    </main>
  );
}
