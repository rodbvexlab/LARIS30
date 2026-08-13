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
 */

export interface Celebrant {
  name: string;
  wordmark: string;
  signature: string;
  age: number;
}

export interface EventTime {
  start: string | null;
  end: string | null;
}

export interface Venue {
  type: string;
  name: string | null;
  area: string | null;
  address: string | null;
  city: string | null;
  postalCode: string | null;
  mapsUrl: string | null;
  wazeUrl: string | null;
}

export interface Pix {
  key: string | null;
  keyType: string | null;
  holder: string | null;
  deadline: string | null;
}

export interface Rsvp {
  deadline: string | null;
  /** Same-origin public API endpoint. The Google Apps Script URL stays server-side in Vercel. */
  endpoint: string | null;
  whatsapp: string | null;
}

export interface Policies {
  companions: string | null;
  bring: string | null;
  pool: string | null;
  parking: string | null;
  drinks: string | null;
}

export interface EventConfig {
  celebrant: Celebrant;
  theme: string;
  date: string;
  time: EventTime;
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
    start: '14:00',
    end: null,
  },

  contribution: 85,

  venue: {
    type: 'Chácara',
    name: 'Chácara NIN 3 Estrelas',
    area: 'Zona Sul',
    address: 'Rua José Montenegro de Lima, 57',
    city: 'São Paulo - SP',
    postalCode: '04875-155',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Ch%C3%A1cara+NIN+3+Estrelas%2C+Rua+Jos%C3%A9+Montenegro+de+Lima%2C+57%2C+S%C3%A3o+Paulo%2C+SP%2C+04875-155',
    wazeUrl:
      'https://www.waze.com/ul?q=Rua%20Jos%C3%A9%20Montenegro%20de%20Lima%2C%2057%2C%20S%C3%A3o%20Paulo%2C%20SP%2C%2004875-155&navigate=yes',
  },

  pix: {
    key: '11952196901',
    keyType: 'telefone',
    holder: null,
    deadline: null,
  },

  rsvp: {
    deadline: null,
    endpoint: '/api/rsvp',
    whatsapp: '11952196901',
  },

  policies: {
    companions:
      'Claro que não, né? Convidado não convida. Se precisar falar comigo, me chama no Whats kkk.',
    bring: 'Sua linda presença e sua bebidinha favorita.',
    pool: 'Sim! Piscina liberada — traga seu melhor kit de piscina.',
    parking: 'Sim! Teremos estacionamento dentro da chácara.',
    drinks: 'Open Cooler: traga sua bebida favorita. Também teremos refrigerante e suquinho!',
  },
};
