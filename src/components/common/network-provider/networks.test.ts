import { NETWORKS } from './network-provider';
import { buildNetworks } from './networks';

const MAINNET = 'https://sqm.quantus.com/v1/graphql';
const PLANCK = 'https://sub2.quantus.com/v1/graphql';
const LOCAL = 'http://localhost:4350/v1/graphql';
const DEV_PROXY = 'http://127.0.0.1:8080/';

describe('buildNetworks', () => {
  it('points mainnet and planck at the public GraphQL endpoints in production', () => {
    expect(buildNetworks({ isDev: false, enableLocalNetwork: false })).toEqual({
      mainnet: MAINNET,
      planck: PLANCK
    });
  });

  it('ignores a development proxy in production', () => {
    expect(
      buildNetworks({
        isDev: false,
        devProxy: DEV_PROXY,
        enableLocalNetwork: false
      })
    ).toEqual({ mainnet: MAINNET, planck: PLANCK });
  });

  it('uses the public GraphQL endpoints in development without a proxy', () => {
    expect(buildNetworks({ isDev: true, enableLocalNetwork: false })).toEqual({
      mainnet: MAINNET,
      planck: PLANCK
    });
  });

  it('routes mainnet and planck through the development proxy when one is set', () => {
    expect(
      buildNetworks({
        isDev: true,
        devProxy: DEV_PROXY,
        enableLocalNetwork: false
      })
    ).toEqual({
      mainnet: `${DEV_PROXY}${MAINNET}`,
      planck: `${DEV_PROXY}${PLANCK}`
    });
  });

  it('adds the local network only when enabled, without the proxy', () => {
    expect(
      buildNetworks({
        isDev: true,
        devProxy: DEV_PROXY,
        enableLocalNetwork: true
      }).local
    ).toBe(LOCAL);
    expect(
      buildNetworks({ isDev: false, enableLocalNetwork: false })
    ).not.toHaveProperty('local');
  });

  it('rejects a development proxy that is not an absolute URL ending in a slash', () => {
    expect(() =>
      buildNetworks({
        isDev: true,
        devProxy: 'http://127.0.0.1:8080',
        enableLocalNetwork: false
      })
    ).toThrow(/VITE_DEV_GRAPHQL_PROXY/);
    expect(() =>
      buildNetworks({
        isDev: true,
        devProxy: '127.0.0.1:8080/',
        enableLocalNetwork: false
      })
    ).toThrow(/VITE_DEV_GRAPHQL_PROXY/);
  });
});

describe('NETWORKS outside a Vite dev server', () => {
  it('points mainnet and planck at the public GraphQL endpoints', () => {
    expect(NETWORKS).toMatchObject({ mainnet: MAINNET, planck: PLANCK });
  });
});
