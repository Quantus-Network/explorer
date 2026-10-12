import fs from 'node:fs';
import path from 'node:path';

import { defaultMetadata } from '@/config/metadata';

import {
  DEV_QTC_PRICE_USD,
  formatUsdMarketCap,
  formatUsdPrice,
  isOgImageFresh,
  loadQtcPrice,
  OBSERVED_AT_HEADER,
  OG_FRESHNESS_MS,
  OG_HEIGHT,
  OG_IMAGE_URL,
  OG_RETENTION_SECONDS,
  OG_STALE_BROWSER_MAX_AGE_SECONDS,
  OG_WIDTH,
  ogBrowserMaxAgeSeconds,
  qtcMarketQuote,
  TRACKER_URL
} from './qtc-market';

const UPDATED_AT = '2026-10-07T11:30:00.000Z';
const NOW = Date.parse('2026-10-07T12:00:00.000Z');

const snapshot = {
  updatedAt: UPDATED_AT,
  coins: [
    {
      id: 'quantus',
      symbol: 'QTC',
      current_price: 101.84,
      market_cap: 27373239
    }
  ]
};

describe('qtcMarketQuote', () => {
  it('reads the Quantus price, market cap, and observation time', () => {
    expect(qtcMarketQuote(snapshot)).toEqual({
      priceUsd: 101.84,
      marketCapUsd: 27373239,
      updatedAt: UPDATED_AT
    });
  });

  it('rejects a snapshot that has no Quantus price', () => {
    expect(() => qtcMarketQuote({ updatedAt: UPDATED_AT, coins: [] })).toThrow(
      /Quantus/
    );
    expect(() =>
      qtcMarketQuote({
        updatedAt: UPDATED_AT,
        coins: [{ id: 'quantus', current_price: null, market_cap: 1 }]
      })
    ).toThrow(/price/);
    expect(() =>
      qtcMarketQuote({
        updatedAt: UPDATED_AT,
        coins: [{ id: 'quantus', current_price: 1, market_cap: null }]
      })
    ).toThrow(/market cap/);
  });
});

describe('USD formatting', () => {
  it('formats the spot price in dollars and cents', () => {
    expect(formatUsdPrice(101.84)).toBe('$101.84');
    expect(formatUsdPrice(DEV_QTC_PRICE_USD)).toBe('$100.00');
  });

  it('formats market cap in millions', () => {
    expect(formatUsdMarketCap(27373239)).toBe('$27.37M');
  });
});

describe('loadQtcPrice', () => {
  it('returns the fixed local price without calling the tracker', async () => {
    const fetchImpl = jest.fn();

    await expect(loadQtcPrice(true, fetchImpl)).resolves.toBe(
      DEV_QTC_PRICE_USD
    );
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it('loads the live Quantus price from the tracker', async () => {
    const fetchImpl = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => snapshot
    });

    await expect(loadQtcPrice(false, fetchImpl)).resolves.toBe(101.84);
    expect(fetchImpl).toHaveBeenCalledWith(TRACKER_URL);
  });

  it('fails when the tracker request fails', async () => {
    const fetchImpl = jest.fn().mockResolvedValue({
      ok: false,
      status: 503,
      json: async () => ({})
    });

    await expect(loadQtcPrice(false, fetchImpl)).rejects.toThrow(
      'Tracker request failed: 503'
    );
  });
});

describe('OG cache timing', () => {
  it('treats an image as fresh for one hour after the tracker observation', () => {
    expect(isOgImageFresh(UPDATED_AT, NOW)).toBe(true);
    expect(isOgImageFresh(UPDATED_AT, NOW + OG_FRESHNESS_MS)).toBe(false);
    expect(isOgImageFresh(null, NOW)).toBe(false);
    expect(isOgImageFresh('not-a-date', NOW)).toBe(false);
  });

  it('keeps a short browser cache and a week-long stored copy', () => {
    expect(ogBrowserMaxAgeSeconds(UPDATED_AT, NOW, false)).toBe(1800);
    expect(ogBrowserMaxAgeSeconds(UPDATED_AT, NOW, true)).toBe(
      OG_STALE_BROWSER_MAX_AGE_SECONDS
    );
    expect(OG_RETENTION_SECONDS).toBe(7 * 24 * 60 * 60);
    expect(OBSERVED_AT_HEADER).toBe('X-Observed-At');
  });
});

describe('Open Graph tags', () => {
  it('points the static page and client metadata at the same 1200x630 image', () => {
    const html = fs.readFileSync(
      path.join(process.cwd(), 'index.html'),
      'utf8'
    );

    expect(OG_IMAGE_URL).toBe('https://explorer.quantus.com/api/og');
    expect(OG_WIDTH).toBe(1200);
    expect(OG_HEIGHT).toBe(630);
    expect(html).toContain(`content="${OG_IMAGE_URL}"`);
    expect(html).toContain('content="1200"');
    expect(html).toContain('content="630"');
    expect(defaultMetadata.images.url).toBe(OG_IMAGE_URL);
    expect(defaultMetadata.images.width).toBe(OG_WIDTH);
    expect(defaultMetadata.images.height).toBe(OG_HEIGHT);
  });

  it('draws the card with the explorer flare, not the tracker accent', () => {
    const template = fs.readFileSync(
      path.join(process.cwd(), 'src/lib/og-template.tsx'),
      'utf8'
    );

    expect(template).toContain('#ff6b35');
    expect(template).toContain('formatUsdPrice');
    expect(template).toContain('formatUsdMarketCap');
    expect(template).not.toContain('#ff2d55');
  });
});
