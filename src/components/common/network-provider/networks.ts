const PUBLIC_NETWORKS = {
  mainnet: 'https://sqm.quantus.com/v1/graphql',
  planck: 'https://sub2.quantus.com/v1/graphql'
} as const;

const LOCAL_NETWORK = {
  local: 'http://localhost:4350/v1/graphql'
} as const;

export type Networks = Record<keyof typeof PUBLIC_NETWORKS, string> &
  Record<string, string>;

export interface NetworkConfigOptions {
  isDev: boolean;
  /** `VITE_DEV_GRAPHQL_PROXY`: URL prefix for the public endpoints, such as a local CORS proxy. Development only. */
  devProxy?: string;
  enableLocalNetwork: boolean;
}

const parseDevProxy = (devProxy: string): string => {
  let url: URL;
  try {
    url = new URL(devProxy);
  } catch {
    throw new Error(
      `VITE_DEV_GRAPHQL_PROXY must be an absolute URL, got "${devProxy}"`
    );
  }
  if (
    (url.protocol !== 'http:' && url.protocol !== 'https:') ||
    !devProxy.endsWith('/')
  ) {
    throw new Error(
      `VITE_DEV_GRAPHQL_PROXY must be an http(s) URL ending in "/", got "${devProxy}"`
    );
  }
  return devProxy;
};

/**
 * GraphQL endpoint per network. Production always uses the public endpoints;
 * a dev server may prefix them with `devProxy`.
 */
export function buildNetworks({
  isDev,
  devProxy,
  enableLocalNetwork
}: NetworkConfigOptions): Networks {
  const prefix = isDev && devProxy ? parseDevProxy(devProxy) : '';
  const networks: Networks = {
    mainnet: `${prefix}${PUBLIC_NETWORKS.mainnet}`,
    planck: `${prefix}${PUBLIC_NETWORKS.planck}`
  };

  return enableLocalNetwork ? { ...networks, ...LOCAL_NETWORK } : networks;
}
