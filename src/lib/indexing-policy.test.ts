import fs from 'node:fs';
import path from 'node:path';

import {
  applyExplorerIndexing,
  indexableMeta,
  indexingDecision,
  legacyRedirectResponse
} from './indexing-policy';

const ORIGIN = 'https://explorer.quantus.com';

function routeFullPaths(): string[] {
  const source = fs.readFileSync(
    path.join(process.cwd(), 'src/routeTree.gen.ts'),
    'utf8'
  );
  return [
    ...new Set(
      [...source.matchAll(/fullPath: '([^']+)'/g)].map((match) => match[1]!)
    )
  ];
}

function samplePath(fullPath: string): string {
  return fullPath.replace(/\$[^/]+/g, 'sample-id');
}

function htmlResponse(body: string, status = 200): Response {
  return new Response(body, {
    status,
    headers: { 'content-type': 'text/html; charset=utf-8' }
  });
}

describe('explorer indexing policy', () => {
  const indexHtml = fs.readFileSync(
    path.join(process.cwd(), 'index.html'),
    'utf8'
  );

  it('keeps only the home page, blocks, and miner leaderboard indexable', () => {
    expect(indexingDecision('/')).toBe('indexable');
    expect(indexingDecision('/blocks')).toBe('indexable');
    expect(indexingDecision('/blocks/')).toBe('indexable');
    expect(indexingDecision('/miner-leaderboard')).toBe('indexable');

    for (const fullPath of routeFullPaths()) {
      const sample = samplePath(fullPath);
      const decision = indexingDecision(sample);
      expect(decision).not.toBe('missing');
      if (
        sample === '/' ||
        sample === '/blocks' ||
        sample === '/miner-leaderboard'
      ) {
        expect(decision).toBe('indexable');
      } else {
        expect(decision).toBe('noindex');
      }
    }
  });

  it('treats unknown urls and /sitemap.xml as missing pages', () => {
    expect(indexingDecision('/sitemap.xml')).toBe('missing');
    expect(indexingDecision('/this-page-does-not-exist')).toBe('missing');
    expect(indexingDecision('/blocks/1/extra')).toBe('missing');
    expect(indexingDecision('/bl%2fcks')).toBe('missing');
  });

  it('keeps router spelling variants on the same index decision as the canonical route', async () => {
    const listings = [
      {
        path: '/BLOCKS',
        shortTitle: 'Blocks',
        title: 'Blocks | Quantus Explorer',
        canonical: `${ORIGIN}/blocks`
      },
      {
        path: '/bl%6fcks',
        shortTitle: 'Blocks',
        title: 'Blocks | Quantus Explorer',
        canonical: `${ORIGIN}/blocks`
      },
      {
        path: '/Miner-Leaderboard',
        shortTitle: 'Miner Leaderboard',
        title: 'Miner Leaderboard | Quantus Explorer',
        canonical: `${ORIGIN}/miner-leaderboard`
      }
    ];
    const details = ['/blocks//42', '/TRANSACTIONS/abc', '/BLOCKS/42'];

    for (const page of listings) {
      expect(indexingDecision(page.path)).toBe('indexable');
      expect(indexableMeta(page.path, ORIGIN)).toEqual({
        shortTitle: page.shortTitle,
        fullTitle: page.title,
        canonical: page.canonical
      });
    }

    for (const pagePath of details) {
      expect(indexingDecision(pagePath)).toBe('noindex');
      expect(indexableMeta(pagePath, ORIGIN)).toBeNull();
    }

    expect(indexingDecision('/blocks/%')).toBe('noindex');

    await Promise.all(
      listings.map(async (page) => {
        const response = await applyExplorerIndexing(
          `${ORIGIN}${page.path}`,
          async () => htmlResponse(indexHtml)
        );

        expect(response.status).toBe(200);
        expect(response.headers.get('x-robots-tag')).toBeNull();
        expect(response.headers.get('location')).toBeNull();
      })
    );

    await Promise.all(
      details.map(async (pagePath) => {
        const response = await applyExplorerIndexing(
          `${ORIGIN}${pagePath}`,
          async () => htmlResponse(indexHtml)
        );

        expect(response.status).toBe(200);
        expect(response.headers.get('x-robots-tag')).toBe('noindex');
        expect(response.headers.get('location')).toBeNull();
      })
    );
  });

  it('gives the three indexable pages their own title and self canonical', async () => {
    expect(indexHtml).not.toContain('rel="canonical"');
    expect(indexHtml).not.toContain('property="og:url"');

    const cases = [
      {
        path: '/',
        shortTitle: undefined,
        title: 'Quantus Explorer',
        canonical: `${ORIGIN}`
      },
      {
        path: '/blocks',
        shortTitle: 'Blocks',
        title: 'Blocks | Quantus Explorer',
        canonical: `${ORIGIN}/blocks`
      },
      {
        path: '/miner-leaderboard/',
        shortTitle: 'Miner Leaderboard',
        title: 'Miner Leaderboard | Quantus Explorer',
        canonical: `${ORIGIN}/miner-leaderboard`
      }
    ];

    await Promise.all(
      cases.map(async (page) => {
        expect(indexableMeta(page.path, ORIGIN)).toEqual({
          shortTitle: page.shortTitle,
          fullTitle: page.title,
          canonical: page.canonical
        });

        const response = await applyExplorerIndexing(
          `${ORIGIN}${page.path}`,
          async () => htmlResponse(indexHtml)
        );

        expect(response.status).toBe(200);
        expect(response.headers.get('x-robots-tag')).toBeNull();
        expect(await response.text()).toBe(indexHtml);
      })
    );
  });

  it('noindexes real app routes without sending them to the home page', async () => {
    const paths = [
      '/transactions',
      '/transactions/abc',
      '/accounts/qzSample',
      '/blocks/42',
      '/transactions/wormhole/out-1',
      '/vesting',
      '/errors'
    ];

    await Promise.all(
      paths.map(async (pagePath) => {
        const response = await applyExplorerIndexing(
          `${ORIGIN}${pagePath}`,
          async () => htmlResponse(indexHtml)
        );
        const body = await response.text();

        expect(response.status).toBe(200);
        expect(response.headers.get('x-robots-tag')).toBe('noindex');
        expect(body).not.toContain('rel="canonical"');
        expect(body).not.toContain('property="og:url"');
        expect(body).toContain('<div id="app"');
      })
    );
  });

  it('returns a real 404 for /sitemap.xml and other unknown pages', async () => {
    await Promise.all(
      ['/sitemap.xml', '/this-page-does-not-exist'].map(async (pagePath) => {
        const response = await applyExplorerIndexing(
          `${ORIGIN}${pagePath}`,
          async () => htmlResponse(indexHtml)
        );
        const body = await response.text();

        expect(response.status).toBe(404);
        expect(response.headers.get('x-robots-tag')).toBe('noindex');
        expect(body).not.toContain('rel="canonical"');
        expect(body).not.toContain('https://quantumcanary.org');
        expect(body).toContain('<div id="app"');
      })
    );
  });

  it('does not rewrite assets, api responses, or redirects', async () => {
    const asset = new Response('console.log(1)', {
      status: 200,
      headers: { 'content-type': 'text/javascript' }
    });
    const assetResponse = await applyExplorerIndexing(
      `${ORIGIN}/assets/index-abc.js`,
      async () => asset
    );
    expect(assetResponse.status).toBe(200);
    expect(assetResponse.headers.get('x-robots-tag')).toBeNull();
    expect(await assetResponse.text()).toBe('console.log(1)');

    const image = new Response('png', {
      status: 200,
      headers: { 'content-type': 'image/png' }
    });
    const imageResponse = await applyExplorerIndexing(
      `${ORIGIN}/api/og`,
      async () => image
    );
    expect(imageResponse.status).toBe(200);
    expect(await imageResponse.text()).toBe('png');

    let fetched = false;
    const redirect = await applyExplorerIndexing(
      `${ORIGIN}/immediate-transactions/abc?from=old`,
      async () => {
        fetched = true;
        return htmlResponse(indexHtml);
      }
    );
    expect(fetched).toBe(false);
    expect(redirect.status).toBe(302);
    expect(redirect.headers.get('location')).toBe(
      `${ORIGIN}/transactions/abc?from=old`
    );
  });

  it('keeps the existing legacy transaction redirects', () => {
    const sources = [
      '/immediate-transactions/abc',
      '/cancelled-reversible-transactions/abc',
      '/executed-reversible-transactions/abc',
      '/scheduled-reversible-transactions/abc'
    ];

    for (const source of sources) {
      const response = legacyRedirectResponse(`${ORIGIN}${source}`);
      expect(response?.status).toBe(302);
      expect(response?.headers.get('location')).toBe(
        `${ORIGIN}/transactions/abc`
      );
    }

    expect(legacyRedirectResponse(`${ORIGIN}/transactions/abc`)).toBeNull();
    expect(
      legacyRedirectResponse(`${ORIGIN}/immediate-transactions`)
    ).toBeNull();
  });

  it('preserves escaped hashes in legacy transaction redirects', () => {
    const decodedHex = 'ab'.repeat(32);
    const escapedHex = `${decodedHex.slice(0, 32)}%61${decodedHex.slice(33)}`;
    const hashes = ['%61bc', escapedHex];
    const search = '?from=old&next=%61';

    expect(decodedHex).toHaveLength(64);
    expect(decodeURI(escapedHex)).toBe(decodedHex);

    for (const prefix of [
      '/immediate-transactions/',
      '/cancelled-reversible-transactions/',
      '/executed-reversible-transactions/',
      '/scheduled-reversible-transactions/'
    ]) {
      for (const hash of hashes) {
        const response = legacyRedirectResponse(
          `${ORIGIN}${prefix}${hash}${search}`
        );
        expect(response?.status).toBe(302);
        expect(response?.headers.get('location')).toBe(
          `${ORIGIN}/transactions/${hash}${search}`
        );
      }
    }
  });

  it('encodes a malformed legacy hash once so the router can parse it', () => {
    const response = legacyRedirectResponse(
      `${ORIGIN}/immediate-transactions/%ZZ?from=old`
    );
    expect(response?.status).toBe(302);
    expect(response?.headers.get('location')).toBe(
      `${ORIGIN}/transactions/%25ZZ?from=old`
    );
  });

  it('does not point robots.txt at another site or block crawlable routes', () => {
    const robots = fs.readFileSync(
      path.join(process.cwd(), 'public/robots.txt'),
      'utf8'
    );

    expect(robots).not.toMatch(/sitemap/i);
    expect(robots).not.toContain('quantumcanary.org');
    expect(robots).not.toMatch(/^disallow:\s*\/transactions/im);
    expect(robots).not.toMatch(/^disallow:\s*\/accounts/im);
    expect(robots).not.toMatch(/^disallow:\s*\/blocks/im);
    expect(robots).not.toMatch(/^disallow:\s*\/miner-leaderboard/im);
    expect(robots).not.toMatch(/^disallow:\s*\/error/im);
    expect(robots).toContain('Allow: /*');
  });
});
