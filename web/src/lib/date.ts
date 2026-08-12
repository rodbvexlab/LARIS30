/**
 * Date formatting for the invitation.
 *
 * The config stores dates as plain ISO days ("2026-08-22"). They are parsed by
 * hand rather than with `new Date(iso)`, which would read the string as UTC
 * midnight and then render the *previous* day for anyone west of Greenwich —
 * including every guest in Brazil. No timezone is involved here at all: an
 * event day is a calendar day, not an instant.
 */

/**
 * pt-BR month abbreviations. Stored in title case because the two approved
 * formats disagree on casing — the Hero pill shouts "AGO", Party Info sets
 * "Ago" — and upper-casing is the only direction that is lossless.
 */
const MONTHS_PT_BR = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
] as const;

export interface IsoDayParts {
  year: number;
  /** 1-12. */
  month: number;
  day: number;
}

/** Splits "YYYY-MM-DD" into its parts, or returns null if it is not that shape. */
export function parseIsoDay(iso: string): IsoDayParts | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return null;

  const [, year, month, day] = match as unknown as [string, string, string, string];
  const parts = { year: Number(year), month: Number(month), day: Number(day) };

  if (parts.month < 1 || parts.month > 12 || parts.day < 1 || parts.day > 31) return null;
  return parts;
}

/**
 * "2026-08-22" -> "22 · AGO · 2026", the Hero's date-pill format.
 * Falls back to the raw string if the input is not a valid ISO day, so a bad
 * config value shows up as itself rather than as a wrong date.
 */
export function formatEventDate(iso: string): string {
  const parts = parseIsoDay(iso);
  if (!parts) return iso;

  return `${parts.day} · ${MONTHS_PT_BR[parts.month - 1]?.toUpperCase()} · ${parts.year}`;
}

/**
 * "14:00" -> "14h00", the Brazilian way of writing a time on an invitation.
 * The stored value stays 24h "HH:MM"; this is presentation only.
 */
export function formatEventTime(value: string): string {
  const match = /^(\d{1,2}):(\d{2})$/.exec(value);
  if (!match) return value;

  const [, hours, minutes] = match as unknown as [string, string, string];
  return `${hours}h${minutes}`;
}

/**
 * "2026-08-22" -> "22 Ago 2026", the Party Info row format.
 * Same fallback behaviour as formatEventDate.
 */
export function formatEventDatePlain(iso: string): string {
  const parts = parseIsoDay(iso);
  if (!parts) return iso;

  return `${parts.day} ${MONTHS_PT_BR[parts.month - 1]} ${parts.year}`;
}
