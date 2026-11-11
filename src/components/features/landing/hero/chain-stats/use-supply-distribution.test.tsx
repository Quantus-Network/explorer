import { renderHook } from '@testing-library/react';
import { JSDOM } from 'jsdom';

import { KNOWN_ADDRESSES } from '@/constants/known-addresses';
import type { SupplyDistributionResponse } from '@/schemas';

import { useSupplyDistribution } from './use-supply-distribution';

const dom = new JSDOM('<!doctype html><html><body></body></html>');
Object.assign(globalThis, {
  window: dom.window,
  document: dom.window.document,
  HTMLElement: dom.window.HTMLElement,
  Element: dom.window.Element,
  Node: dom.window.Node,
  navigator: dom.window.navigator,
  IS_REACT_ACT_ENVIRONMENT: true
});

const BRIDGE = KNOWN_ADDRESSES.nearIntentsBridge.address;
const VESTING = KNOWN_ADDRESSES.vestingContract.address;

const MAINNET_DATA: SupplyDistributionResponse = {
  status: {
    total_supply: '5786516725244095623',
    circulating_supply: '333711807566964724'
  },
  holders: [
    { id: BRIDGE, free: '218522096109355884', reserved: '0' },
    { id: VESTING, free: '5459940001000000000', reserved: '0' }
  ]
};

const state: {
  networkName: string;
  data: SupplyDistributionResponse | undefined;
  requests: Array<{ skip?: boolean; variables?: { holders: string[] } }>;
} = { networkName: 'mainnet', data: undefined, requests: [] };

jest.mock('@/components/common/network-provider/network-provider', () => ({
  useNetwork: () => ({ networkName: state.networkName })
}));

jest.mock('@/api', () => ({
  __esModule: true,
  default: () => ({
    chainStatus: {
      useGetSupplyDistribution: (options: {
        skip?: boolean;
        variables?: { holders: string[] };
      }) => {
        state.requests.push(options);
        return {
          loading: false,
          data: options.skip ? undefined : state.data,
          error: undefined
        };
      }
    }
  })
}));

beforeEach(() => {
  state.networkName = 'mainnet';
  state.data = MAINNET_DATA;
  state.requests = [];
});

describe('useSupplyDistribution', () => {
  it('queries the known holder balances on mainnet and splits circulating supply', () => {
    const { result } = renderHook(() => useSupplyDistribution());

    expect(state.requests.at(-1)?.skip).toBe(false);
    expect(state.requests.at(-1)?.variables?.holders).toEqual([
      BRIDGE,
      VESTING
    ]);
    expect(result.current.enabled).toBe(true);
    expect(result.current.error).toBeNull();
    expect(result.current.buckets?.map(({ amount }) => amount)).toEqual([
      BigInt('218522096109355884'),
      BigInt('7135083322869101'),
      BigInt('108054628134739739')
    ]);
  });

  it('skips the query and the breakdown off mainnet', () => {
    state.networkName = 'planck';

    const { result } = renderHook(() => useSupplyDistribution());

    expect(state.requests.every(({ skip }) => skip === true)).toBe(true);
    expect(result.current.enabled).toBe(false);
    expect(result.current.buckets).toBeNull();
  });

  it('reports a supply invariant violation as an error instead of buckets', () => {
    state.data = {
      ...MAINNET_DATA,
      holders: [
        { id: BRIDGE, free: '218522096109355884', reserved: '0' },
        { id: VESTING, free: '1', reserved: '0' }
      ]
    };

    const { result } = renderHook(() => useSupplyDistribution());

    expect(result.current.buckets).toBeNull();
    expect(result.current.error).toMatch(/vesting contract/);
  });
});
