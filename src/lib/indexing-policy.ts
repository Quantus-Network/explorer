const SITE_NAME = 'Quantus Explorer';

// Keep in sync with fullPath values in src/routeTree.gen.ts.
const ROUTE_FULL_PATHS = [
  '/',
  '/vesting',
  '/transactions',
  '/multisig',
  '/multisig-signer-approved',
  '/multisig-proposal-removed',
  '/multisig-proposal-ready',
  '/multisig-proposal-executed',
  '/multisig-proposal-created',
  '/multisig-proposal-cancelled',
  '/multisig-deposits-claimed',
  '/miner-rewards',
  '/miner-leaderboard',
  '/high-security-sets',
  '/errors',
  '/blocks',
  '/accounts',
  '/transactions/$hash',
  '/multisig/$id',
  '/multisig-signer-approved/$hash',
  '/multisig-proposals/$id',
  '/multisig-proposal-removed/$hash',
  '/multisig-proposal-ready/$hash',
  '/multisig-proposal-executed/$hash',
  '/multisig-proposal-created/$hash',
  '/multisig-proposal-cancelled/$hash',
  '/multisig-deposits-claimed/$hash',
  '/multisig-created/$hash',
  '/miner-rewards/$hash',
  '/high-security-sets/$hash',
  '/errors/$id',
  '/blocks/$id',
  '/accounts/$id',
  '/dev/graphql-benchmark',
  '/transactions/wormhole/$id',
  '/transactions/scheduled-reversible/$txId',
  '/transactions/executed-reversible/$txId',
  '/transactions/cancelled-reversible/$txId'
] as const;

const INDEXABLE_PATHS = new Set(['/', '/blocks', '/miner-leaderboard']);

const LEGACY_TRANSACTION_PREFIXES = [
  '/immediate-transactions/',
  '/cancelled-reversible-transactions/',
  '/executed-reversible-transactions/',
  '/scheduled-reversible-transactions/'
];

export type IndexingDecision = 'indexable' | 'noindex' | 'missing';

export interface IndexablePageMeta {
  shortTitle?: string;
  fullTitle: string;
  canonical: string;
}

function normalizePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return normalizePath(pathname.slice(0, -1));
  }
  return pathname;
}

// Same pathname rules as @tanstack/router-core matchByPath with caseSensitive
// false: collapse repeated slashes, drop a trailing slash, decodeURI each
// segment (keeping an invalid escape as-is), and compare static segments
// without case. Dynamic segments stay case-sensitive.
const PARSED_ROUTES = ROUTE_FULL_PATHS.map((fullPath) => {
  const parts = fullPath === '/' ? [] : fullPath.split('/').slice(1);
  return {
    parts,
    staticCount: parts.filter((part) => !part.startsWith('$')).length
  };
});

function decodePathSegment(segment: string): string {
  try {
    if (segment.includes('%25')) {
      return segment
        .split('%25')
        .map((part) => decodeURI(part))
        .join('%25');
    }
    return decodeURI(segment);
  } catch (error) {
    if (error instanceof URIError) return segment;
    throw error;
  }
}

function requestSegments(pathname: string): string[] {
  const trimmed = pathname === '/' ? pathname : pathname.replace(/\/+$/, '');
  const collapsed = trimmed.replace(/\/{2,}/g, '/');
  const withSlash = collapsed.startsWith('/') ? collapsed : `/${collapsed}`;
  if (withSlash === '/') return [];
  return withSlash.split('/').slice(1).map(decodePathSegment);
}

function canonicalAppPath(pathname: string): string | null {
  const segments = requestSegments(pathname);
  let best: { path: string; staticCount: number } | null = null;

  for (const route of PARSED_ROUTES) {
    if (route.parts.length !== segments.length) continue;

    const canonical: string[] = [];
    let matched = true;
    for (let index = 0; index < route.parts.length; index += 1) {
      const part = route.parts[index]!;
      const segment = segments[index]!;
      if (part.startsWith('$')) {
        if (segment.length === 0) {
          matched = false;
          break;
        }
        canonical.push(segment);
        continue;
      }
      if (part.toLowerCase() !== segment.toLowerCase()) {
        matched = false;
        break;
      }
      canonical.push(part);
    }
    if (!matched) continue;

    const path = canonical.length === 0 ? '/' : `/${canonical.join('/')}`;
    if (!best || route.staticCount > best.staticCount) {
      best = { path, staticCount: route.staticCount };
    }
  }

  return best?.path ?? null;
}

export function indexingDecision(pathname: string): IndexingDecision {
  const path = canonicalAppPath(pathname);
  if (path === null) return 'missing';
  if (INDEXABLE_PATHS.has(path)) return 'indexable';
  return 'noindex';
}

export function canonicalUrl(origin: string, pathname: string): string {
  const path = normalizePath(pathname);
  const base = origin.trim().replace(/\/$/, '');
  if (!base) return path;
  if (path === '/') return base;
  return `${base}${path}`;
}

export function indexableMeta(
  pathname: string,
  origin: string
): IndexablePageMeta | null {
  const path = canonicalAppPath(pathname);
  if (path === null || !INDEXABLE_PATHS.has(path)) return null;

  let shortTitle: string | undefined;
  if (path === '/blocks') shortTitle = 'Blocks';
  if (path === '/miner-leaderboard') shortTitle = 'Miner Leaderboard';
  const fullTitle = shortTitle ? `${shortTitle} | ${SITE_NAME}` : SITE_NAME;

  return {
    shortTitle,
    fullTitle,
    canonical: canonicalUrl(origin, path)
  };
}

function legacyRedirectTarget(pathname: string): string | null {
  const path = normalizePath(pathname);
  for (const prefix of LEGACY_TRANSACTION_PREFIXES) {
    if (!path.startsWith(prefix)) continue;
    const hash = path.slice(prefix.length);
    if (!hash || hash.includes('/')) return null;
    return `/transactions/${encodeURIComponent(hash)}`;
  }
  return null;
}

export function legacyRedirectResponse(requestUrl: string): Response | null {
  const url = new URL(requestUrl);
  const target = legacyRedirectTarget(url.pathname);
  if (!target) return null;
  return Response.redirect(new URL(`${target}${url.search}`, url.origin), 302);
}

function isHtmlResponse(response: Response): boolean {
  const contentType = response.headers.get('content-type') ?? '';
  return contentType.toLowerCase().includes('text/html');
}

export async function withIndexingPolicy(
  requestUrl: string,
  response: Response
): Promise<Response> {
  if (response.status >= 300 && response.status < 400) return response;
  if (!isHtmlResponse(response)) return response;

  const decision = indexingDecision(new URL(requestUrl).pathname);
  if (decision === 'indexable') return response;

  const headers = new Headers(response.headers);
  headers.set('X-Robots-Tag', 'noindex');
  const status =
    decision === 'missing' &&
    (response.status === 200 || response.status === 404)
      ? 404
      : response.status;

  return new Response(response.body, {
    status,
    statusText: status === 404 ? 'Not Found' : response.statusText,
    headers
  });
}

export async function applyExplorerIndexing(
  requestUrl: string,
  fetchAsset: () => Promise<Response>
): Promise<Response> {
  const redirect = legacyRedirectResponse(requestUrl);
  if (redirect) return redirect;
  const response = await fetchAsset();
  return withIndexingPolicy(requestUrl, response);
}
