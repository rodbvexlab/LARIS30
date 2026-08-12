const MAX_NAME = 120;
const MAX_FOOD_RESTRICTION = 240;
const UPSTREAM_ATTEMPTS = 3;
const RETRY_DELAY_MS = 700;

function sendJson(response, status, payload) {
  response.setHeader('Cache-Control', 'no-store');
  return response.status(status).json(payload);
}

async function readJsonBody(request) {
  if (request.body && typeof request.body === 'object') return request.body;

  if (typeof request.body === 'string') {
    return request.body ? JSON.parse(request.body) : {};
  }

  let raw = '';
  for await (const chunk of request) raw += chunk;
  return raw ? JSON.parse(raw) : {};
}

function safeText(value, maxLength) {
  const text = String(value ?? '').trim().slice(0, maxLength);
  return /^[=+\-@]/.test(text) ? `'${text}` : text;
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function sendToAppsScript(scriptUrl, payload) {
  let lastFailure = null;

  for (let attempt = 1; attempt <= UPSTREAM_ATTEMPTS; attempt += 1) {
    try {
      const upstream = await fetch(scriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        redirect: 'follow',
      });

      const text = await upstream.text();
      let result = null;

      try {
        result = JSON.parse(text);
      } catch {
        result = null;
      }

      if (upstream.ok && result?.ok === true) {
        return { ok: true };
      }

      lastFailure = {
        attempt,
        status: upstream.status,
        appsScriptError: result?.error ?? 'invalid_response',
        contentType: upstream.headers.get('content-type') ?? 'unknown',
      };

      console.warn('RSVP upstream attempt failed', lastFailure);
    } catch (error) {
      lastFailure = {
        attempt,
        status: null,
        appsScriptError: 'network_error',
        message: error instanceof Error ? error.message : 'unknown_error',
      };

      console.warn('RSVP upstream request failed', lastFailure);
    }

    if (attempt < UPSTREAM_ATTEMPTS) {
      await wait(RETRY_DELAY_MS * attempt);
    }
  }

  return { ok: false, failure: lastFailure };
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return sendJson(response, 405, { ok: false, error: 'method_not_allowed' });
  }

  const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_RSVP_URL;
  const sharedSecret = process.env.RSVP_SHARED_SECRET;

  if (!scriptUrl || !sharedSecret) {
    console.error('RSVP server configuration missing');
    return sendJson(response, 500, { ok: false, error: 'server_not_configured' });
  }

  try {
    const body = await readJsonBody(request);
    const name = safeText(body.name, MAX_NAME);
    const whatsapp = String(body.whatsapp ?? '').replace(/\D/g, '').slice(0, 13);
    const foodRestriction = safeText(body.foodRestriction, MAX_FOOD_RESTRICTION);

    if (name.length < 2 || whatsapp.length < 10 || whatsapp.length > 13) {
      return sendJson(response, 400, { ok: false, error: 'invalid_payload' });
    }

    const result = await sendToAppsScript(scriptUrl, {
      secret: sharedSecret,
      name,
      whatsapp,
      foodRestriction,
      source: 'laris30-web',
    });

    if (!result.ok) {
      console.error('RSVP upstream exhausted retries', result.failure);
      return sendJson(response, 502, { ok: false, error: 'upstream_error' });
    }

    return sendJson(response, 200, { ok: true });
  } catch (error) {
    console.error('RSVP internal error', {
      message: error instanceof Error ? error.message : 'unknown_error',
    });
    return sendJson(response, 500, { ok: false, error: 'internal_error' });
  }
}
