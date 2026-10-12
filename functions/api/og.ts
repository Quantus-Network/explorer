import { generateOgImageResponse } from '../../src/lib/generate-og-response';
import {
  isOgImageFresh,
  OBSERVED_AT_HEADER,
  OG_RETENTION_SECONDS,
  ogBrowserMaxAgeSeconds,
  qtcMarketQuote,
  TRACKER_URL
} from '../../src/lib/qtc-market';

function ogCacheRequest(pageUrl: string): Request {
  const url = new URL(pageUrl);
  url.pathname = '/api/og';
  url.search = '';
  url.hash = '';
  return new Request(url.toString(), { method: 'GET' });
}

function browserImage(
  response: Response,
  options: { stale: boolean; now: number }
): Response {
  const observedAt = response.headers.get(OBSERVED_AT_HEADER) ?? '';
  const headers = new Headers(response.headers);
  headers.set(
    'Cache-Control',
    `public, max-age=${ogBrowserMaxAgeSeconds(observedAt, options.now, options.stale)}`
  );
  return new Response(response.body, {
    status: response.status,
    headers
  });
}

export async function onRequestGet(context: {
  request: Request;
  waitUntil: (promise: Promise<unknown>) => void;
}): Promise<Response> {
  const now = Date.now();
  const cacheKey = ogCacheRequest(context.request.url);
  const cached = await caches.default.match(cacheKey);

  if (cached && isOgImageFresh(cached.headers.get(OBSERVED_AT_HEADER), now)) {
    return browserImage(cached, { stale: false, now });
  }

  try {
    const trackerResponse = await fetch(TRACKER_URL);
    if (!trackerResponse.ok) {
      throw new Error(`Tracker request failed: ${trackerResponse.status}`);
    }
    const quote = qtcMarketQuote(await trackerResponse.json());
    const image = await generateOgImageResponse(context.request.url, quote);
    const headers = new Headers(image.headers);
    headers.set('Content-Type', 'image/png');
    headers.set(OBSERVED_AT_HEADER, quote.updatedAt);
    headers.set('Cache-Control', `public, max-age=${OG_RETENTION_SECONDS}`);
    const stored = new Response(image.body, {
      status: image.status,
      headers
    });
    context.waitUntil(caches.default.put(cacheKey, stored.clone()));
    return browserImage(stored, { stale: false, now });
  } catch (error) {
    if (cached) return browserImage(cached, { stale: true, now });
    const message =
      error instanceof Error ? error.message : 'Failed to generate OG image';
    return new Response(message, {
      status: 500,
      headers: { 'Cache-Control': 'no-store' }
    });
  }
}
