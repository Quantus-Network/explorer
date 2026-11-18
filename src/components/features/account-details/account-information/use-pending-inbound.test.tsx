import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache
} from '@apollo/client';
import { act, renderHook, waitFor } from '@testing-library/react';
import { JSDOM } from 'jsdom';
import type { PropsWithChildren } from 'react';
import * as React from 'react';

import type { PendingInboundTransfersResponse } from '@/schemas';

import { usePendingInbound } from './use-pending-inbound';

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

const ACCOUNT = 'qzAccount';

const network = (networkUrl: string) => ({
  networkUrl,
  client: new ApolloClient({
    link: ApolloLink.empty(),
    cache: new InMemoryCache()
  })
});
const MAINNET = network('https://mainnet.test/graphql');
const PLANCK = network('https://planck.test/graphql');

const pendingPage = (amount: string): PendingInboundTransfersResponse => ({
  scheduled: [{ id: 's1', amount, from_id: 'qzSender', to_id: ACCOUNT }],
  executed: [],
  cancelled: [],
  scheduledTotal: { aggregate: { count: 1 } },
  executedTotal: { aggregate: { count: 0 } },
  cancelledTotal: { aggregate: { count: 0 } }
});

const state: {
  network: ReturnType<typeof network>;
  pages: Map<unknown, Promise<PendingInboundTransfersResponse>>;
} = { network: MAINNET, pages: new Map() };

jest.mock('@/components/common/network-provider/network-provider', () => ({
  useNetwork: () => ({ networkUrl: state.network.networkUrl })
}));

jest.mock('@/api', () => ({
  __esModule: true,
  default: () => ({
    scheduledReversibleTransactions: {
      getPendingInbound: () => ({
        fetchPage: (client: unknown) => state.pages.get(client)
      })
    }
  })
}));

const wrapper = ({ children }: PropsWithChildren) => (
  <ApolloProvider client={state.network.client}>{children}</ApolloProvider>
);

const renderPendingInbound = () =>
  renderHook(() => usePendingInbound(ACCOUNT), { wrapper });

describe('usePendingInbound', () => {
  beforeEach(() => {
    state.network = MAINNET;
    state.pages = new Map();
  });

  it('has no amount until the transfers load, then returns their sum', async () => {
    state.pages.set(
      MAINNET.client,
      Promise.resolve(pendingPage('1000000000000'))
    );

    const { result, unmount } = renderPendingInbound();

    expect(result.current.amount).toBeUndefined();
    await waitFor(() =>
      expect(result.current.amount).toBe(BigInt('1000000000000'))
    );
    unmount();
  });

  it('returns the error when the transfers fail to load', async () => {
    state.pages.set(MAINNET.client, Promise.reject(new Error('indexer down')));

    const { result, unmount } = renderPendingInbound();

    await waitFor(() =>
      expect(result.current.error?.message).toBe('indexer down')
    );
    expect(result.current.amount).toBeUndefined();
    unmount();
  });

  it('drops the previous network amount until the new network responds', async () => {
    state.pages.set(
      MAINNET.client,
      Promise.resolve(pendingPage('1000000000000'))
    );
    let respond: (page: PendingInboundTransfersResponse) => void = () => {};
    state.pages.set(
      PLANCK.client,
      new Promise((resolve) => {
        respond = resolve;
      })
    );

    const { result, rerender, unmount } = renderPendingInbound();
    await waitFor(() =>
      expect(result.current.amount).toBe(BigInt('1000000000000'))
    );

    state.network = PLANCK;
    rerender();

    expect(result.current).toEqual({});

    await act(async () => respond(pendingPage('2000000000000')));
    await waitFor(() =>
      expect(result.current.amount).toBe(BigInt('2000000000000'))
    );
    unmount();
  });
});
