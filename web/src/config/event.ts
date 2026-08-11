/**
 * LARIS 30 — central event configuration.
 *
 * This is the single source of truth for every editable piece of event data.
 * No section component may hard-code a date, a price, an address or a key.
 *
 * THE NULL RULE
 * `null` means "not confirmed yet" — never an empty string, so that
 * "unconfirmed" is always distinguishable from "confirmed as blank". Any field
 * that is `null` must render as an intentional "Em Breve" state or be hidden.
 * Nothing here may be invented: a value only stops being `null` when it is
 * confirmed in docs/CONTENT_PENDING.md.
 *
 * @see docs/CONTENT_PENDING.md — the operational checklist this file mirrors
 * @see docs/LARI30_BRIEFING_MASTER.md §24 — the approved shape
 */

export interface Celebrant {
  name: string;
  /** Official project wordmark. Never "LARI 30" or "LARISSA 30". */
  wordmark: string;
  /** Project signature line, always paired with the wordmark. */
  signature: string;
  age: number;
}

/** CONTENT_PENDING §2 tracks start and end separately. */
export interface EventTime {
  /** 24h local time, e.g. "14:00". */
  start: string | null;
  end: string | null;
}

/** CONTENT_PENDING §3. Until confirmed: "CHÁCARA / ENDEREÇO EM BREVE". */
export interface Venue {
  name: string | null;
  address: string | null;
  city: string | null;
  mapsUrl: string | null;
  wazeUrl: string | null;
}

/** CONTENT_PENDING §4. The amount is confirmed; the key is not. */
export interface Pix {
  key: string | null;
  /** e.g. "cpf" | "telefone" | "email" | "aleatoria" — confirm before typing further. */
  keyType: string | null;
  /** Account holder name, only if it will be displayed. */
  holder: string | null;
  /** ISO date, payment deadline. */
  deadline: string | null;
}

/** CONTENT_PENDING §5. */
export interface Rsvp {
  /** ISO date. */
  deadline: string | null;
  /** Google Apps Script Web App URL — comes from an env var at CP9, never committed. */
  endpoint: string | null;
  /** WhatsApp number that receives questions / payment proof. */
  whatsapp: string | null;
}

/**
 * CONTENT_PENDING §6, §7, §8, §9.
 * These gate FAQ answers. While `null`, the FAQ must not assert a rule —
 * the copy already written in the design-system .dc.html files is
 * illustrative placeholder, not confirmed fact.
 */
export interface Policies {
  companions: string | null;
  pool: string | null;
  parking: string | null;
  drinks: string | null;
}

export interface EventConfig {
  celebrant: Celebrant;
  /** Party theme. Confirmed. */
  theme: string;
  /** ISO date. Confirmed. */
  date: string;
  time: EventTime;
  /** Shared cost per person, in BRL. Confirmed. */
  contribution: number;
  venue: Venue;
  pix: Pix;
  rsvp: Rsvp;
  policies: Policies;
}

export const event: EventConfig = {
  celebrant: {
    name: 'Larissa',
    wordmark: 'LARIS 30',
    signature: 'IN FULL COLOR',
    age: 30,
  },

  theme: 'POOL PARTY',

  date: '2026-08-22',

  time: {
    start: null,
    end: null,
  },

  contribution: 85,

  venue: {
    name: null,
    address: null,
    city: null,
    mapsUrl: null,
    wazeUrl: null,
  },

  pix: {
    key: null,
    keyType: null,
    holder: null,
    deadline: null,
  },

  rsvp: {
    deadline: null,
    endpoint: null,
    whatsapp: null,
  },

  policies: {
    companions: null,
    pool: null,
    parking: null,
    drinks: null,
  },
};
