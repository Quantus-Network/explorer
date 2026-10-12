export const TRACKER_URL = 'https://migration.fail/api/tracker';

export const EXPLORER_ORIGIN = 'https://explorer.quantus.com';

export const OG_IMAGE_URL = `${EXPLORER_ORIGIN}/api/og`;

export const OG_WIDTH = 1200;

export const OG_HEIGHT = 630;

/** Shown on the Vite dev server, which is not the explorer origin. */
export const DEV_QTC_PRICE_USD = 100;

export const OBSERVED_AT_HEADER = 'X-Observed-At';

export const OG_FRESHNESS_MS = 60 * 60 * 1000;

export const OG_RETENTION_SECONDS = 7 * 24 * 60 * 60;

export const OG_STALE_BROWSER_MAX_AGE_SECONDS = 60;

const QTC_COIN_ID = 'quantus';

export interface QtcMarketQuote {
  priceUsd: number;
  marketCapUsd: number;
  updatedAt: string;
}

type TrackerFetch = (url: string, init?: RequestInit) => Promise<Response>;

export function shouldFetchQtcPrice(isDev: boolean): boolean {
  return !isDev;
}

export function qtcMarketQuote(body: unknown): QtcMarketQuote {
  if (!body || typeof body !== 'object') {
    throw new Error('Tracker snapshot is missing');
  }

  const record = body as Record<string, unknown>;
  if (
    typeof record.updatedAt !== 'string' ||
    Number.isNaN(Date.parse(record.updatedAt))
  ) {
    throw new Error('Tracker snapshot is missing updatedAt');
  }
  if (!Array.isArray(record.coins)) {
    throw new Error('Tracker snapshot is missing coins');
  }

  const coin = record.coins.find(
    (entry): entry is Record<string, unknown> =>
      !!entry &&
      typeof entry === 'object' &&
      (entry as { id?: unknown }).id === QTC_COIN_ID
  );
  if (!coin) {
    throw new Error('Tracker snapshot is missing Quantus');
  }
  if (
    typeof coin.current_price !== 'number' ||
    !Number.isFinite(coin.current_price)
  ) {
    throw new Error('Quantus price is missing');
  }
  if (
    typeof coin.market_cap !== 'number' ||
    !Number.isFinite(coin.market_cap)
  ) {
    throw new Error('Quantus market cap is missing');
  }

  return {
    priceUsd: coin.current_price,
    marketCapUsd: coin.market_cap,
    updatedAt: record.updatedAt
  };
}

export function formatUsdPrice(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

export function formatUsdMarketCap(value: number): string {
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  if (value >= 1e3) return `$${(value / 1e3).toFixed(2)}K`;
  return `$${value.toFixed(2)}`;
}

export function isOgImageFresh(
  observedAt: string | null,
  now: number
): boolean {
  if (!observedAt) return false;
  const updated = Date.parse(observedAt);
  if (Number.isNaN(updated)) return false;
  const age = now - updated;
  return age >= 0 && age < OG_FRESHNESS_MS;
}

export function ogBrowserMaxAgeSeconds(
  observedAt: string,
  now: number,
  stale: boolean
): number {
  if (stale) return OG_STALE_BROWSER_MAX_AGE_SECONDS;
  const updated = Date.parse(observedAt);
  if (Number.isNaN(updated)) return OG_STALE_BROWSER_MAX_AGE_SECONDS;
  const remaining = Math.floor((OG_FRESHNESS_MS - (now - updated)) / 1000);
  return Math.max(0, remaining);
}

export async function loadQtcPrice(
  isDev: boolean,
  fetchImpl: TrackerFetch = fetch
): Promise<number> {
  if (!shouldFetchQtcPrice(isDev)) return DEV_QTC_PRICE_USD;

  const response = await fetchImpl(TRACKER_URL);
  if (!response.ok) {
    throw new Error(`Tracker request failed: ${response.status}`);
  }

  return qtcMarketQuote(await response.json()).priceUsd;
}
