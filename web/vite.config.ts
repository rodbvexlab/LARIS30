import { defineConfig } from 'vite';
import type { Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

import { event } from './src/config/event.ts';

/**
 * Keeps the document title sourced from the event config instead of being
 * hard-coded in index.html. It has to be a build-time injection rather than a
 * runtime one: the title must exist in the served HTML for WhatsApp's link
 * preview and for the browser tab before React hydrates.
 */
function eventHtmlTitle(): Plugin {
  const title = `${event.celebrant.wordmark} — ${titleCase(event.celebrant.signature)}`;

  return {
    name: 'laris30-event-html-title',
    transformIndexHtml(html) {
      return html.replace('%APP_TITLE%', title);
    },
  };
}

/** "IN FULL COLOR" -> "In Full Color", for prose contexts like the tab title. */
function titleCase(value: string): string {
  return value
    .toLowerCase()
    .replace(/(^|\s)(\p{L})/gu, (_, lead: string, char: string) => lead + char.toUpperCase());
}

export default defineConfig({
  plugins: [react(), tailwindcss(), eventHtmlTitle()],
});
