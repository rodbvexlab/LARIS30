/**
 * The one place the "not confirmed yet" wording lives.
 *
 * Event data that has not been confirmed is `null` in src/config/event.ts (see
 * the null rule there). Sections render that state through this helper instead
 * of each writing its own "Em Breve", so the wording changes in one edit and no
 * section can quietly invent a value.
 */

export const PENDING_LABEL = 'Em Breve';

export interface ResolvedValue {
  text: string;
  /** True when the value is still unconfirmed — sections use it to style the state. */
  pending: boolean;
}

/** Returns the confirmed value, or the pending label flagged as such. */
export function resolvePending(value: string | null): ResolvedValue {
  if (value === null) return { text: PENDING_LABEL, pending: true };
  return { text: value, pending: false };
}
