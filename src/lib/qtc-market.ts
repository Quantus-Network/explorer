export const TRACKER_URL = 'https://migration.fail/api/tracker';

export const EXPLORER_ORIGIN = 'https://explorer.quantus.com';

export const OG_IMAGE_URL = `${EXPLORER_ORIGIN}/api/og`;

export const OG_WIDTH = 1200;

export const OG_HEIGHT = 630;

/** Shown on the Vite dev server, which is not the explorer origin. */
export const DEV_QTC_PRICE_USD = 100;

export const DEV_QTC_PRICE_CHANGE_PERCENTAGE_24H = 1.25;

export const OBSERVED_AT_HEADER = 'X-Observed-At';

export const OG_FRESHNESS_MS = 5 * 60 * 1000;

export const OG_RETENTION_SECONDS = 7 * 24 * 60 * 60;

export const OG_STALE_BROWSER_MAX_AGE_SECONDS = 60;

const QTC_COIN_ID = 'quantus';

export interface QtcMarketQuote {
  priceUsd: number;
  marketCapUsd: number;
  priceChangePercentage24h: number;
  updatedAt: string;
}

export interface QtcPrice {
  priceUsd: number;
  priceChangePercentage24h: number;
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
  if (
    typeof coin.price_change_percentage_24h !== 'number' ||
    !Number.isFinite(coin.price_change_percentage_24h)
  ) {
    throw new Error('Quantus 24h price change is missing');
  }

  return {
    priceUsd: coin.current_price,
    marketCapUsd: coin.market_cap,
    priceChangePercentage24h: coin.price_change_percentage_24h,
    updatedAt: record.updatedAt
  };
}

export function formatPriceChangePercentage(value: number): string {
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    signDisplay: 'exceptZero'
  }).format(value);
  return `${formatted}%`;
}

export function formatPriceChangeBeside(value: number): string {
  return `(${formatPriceChangePercentage(value)})`;
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
): Promise<QtcPrice> {
  if (!shouldFetchQtcPrice(isDev)) {
    return {
      priceUsd: DEV_QTC_PRICE_USD,
      priceChangePercentage24h: DEV_QTC_PRICE_CHANGE_PERCENTAGE_24H
    };
  }

  const response = await fetchImpl(TRACKER_URL);
  if (!response.ok) {
    throw new Error(`Tracker request failed: ${response.status}`);
  }

  const quote = qtcMarketQuote(await response.json());
  return {
    priceUsd: quote.priceUsd,
    priceChangePercentage24h: quote.priceChangePercentage24h
  };
}
