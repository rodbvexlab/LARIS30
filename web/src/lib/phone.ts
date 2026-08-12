/**
 * Phone formatting for display only.
 *
 * The config stores numbers as digits, which is what a payment app or a
 * wa.me link needs. These helpers never feed anything back into storage — the
 * formatted string exists purely to be read on screen.
 */

/**
 * "11952196901" -> "(11) 95219-6901"
 * Handles both mobile (11 digits) and landline (10). Anything else is
 * returned untouched rather than mangled into a wrong-looking number.
 */
export function formatBrazilianPhone(value: string): string {
  const digits = value.replace(/\D/g, '');

  if (digits.length === 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }

  if (digits.length === 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }

  return value;
}
