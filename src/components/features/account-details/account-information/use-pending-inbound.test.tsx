import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
  Observable
} from '@apollo/client';
import { act, renderHook, waitFor } from '@testing-library/react';
import { JSDOM } from 'jsdom';
import type { PropsWithChildren } from 'react';
import * as React from 'react';

import {
  NetworkProvider,
  useNetwork
} from '@/components/common/network-provider/network-provider';
import type { PendingInboundTransfersResponse } from '@/schemas';

import { usePendingInbound } from './use-pending-inbound';

const dom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'http://localhost'
});
Object.assign(globalThis, {
  window: dom.window,
  document: dom.window.document,
  HTMLElement: dom.window.HTMLElement,
  Element: dom.window.Element,
  Node: dom.window.Node,
  navigator: dom.window.navigator,
  localStorage: dom.window.localStorage,
  IS_REACT_ACT_ENVIRONMENT: true
});

const ACCOUNT = 'qzAccount';

const pendingPage = (amount: string): PendingInboundTransfersResponse => ({
  scheduled: [{ id: 's1', amount, from_id: 'qzSender', to_id: ACCOUNT }],
  executed: [],
  cancelled: [],
  scheduledTotal: { aggregate: { count: 1 } },
  executedTotal: { aggregate: { count: 0 } },
  cancelledTotal: { aggregate: { count: 0 } }
});

const responses = new Map<string, Promise<PendingInboundTransfersResponse>>();

const indexerClient = (networkName: string) =>
  new ApolloClient({
    cache: new InMemoryCache(),
    link: new ApolloLink(
      () =>
        new Observable((observer) => {
          const response = responses.get(networkName);
          if (!response) {
            observer.error(new Error(`No response for ${networkName}`));
            return;
          }
          response.then(
            (data) => {
              observer.next({ data });
              observer.complete();
            },
            (error) => observer.error(error)
          );
        })
    )
  });

const IndexerProvider = ({ children }: PropsWithChildren) => {
  const { networkName } = useNetwork();
  const client = React.useMemo(() => indexerClient(networkName), [networkName]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

const wrapper = ({ children }: PropsWithChildren) => (
  <NetworkProvider storageKey="test-network">
    <IndexerProvider>{children}</IndexerProvider>
  </NetworkProvider>
);

const renderPendingInbound = () =>
  renderHook(
    () => ({
      pendingInbound: usePendingInbound(ACCOUNT),
      setNetwork: useNetwork().setNetwork
    }),
    { wrapper }
  );

describe('usePendingInbound', () => {
  beforeEach(() => {
    responses.clear();
    localStorage.clear();
  });

  it('has no amount until the transfers load, then returns their sum', async () => {
    responses.set('mainnet', Promise.resolve(pendingPage('1000000000000')));

    const { result, unmount } = renderPendingInbound();

    expect(result.current.pendingInbound.amount).toBeUndefined();
    await waitFor(() =>
      expect(result.current.pendingInbound.amount).toBe(BigInt('1000000000000'))
    );
    unmount();
  });

  it('returns the error when the transfers fail to load', async () => {
    responses.set('mainnet', Promise.reject(new Error('indexer down')));

    const { result, unmount } = renderPendingInbound();

    await waitFor(() =>
      expect(result.current.pendingInbound.error?.message).toBe('indexer down')
    );
    expect(result.current.pendingInbound.amount).toBeUndefined();
    unmount();
  });

  it('drops the previous network amount until the new network responds', async () => {
    responses.set('mainnet', Promise.resolve(pendingPage('1000000000000')));
    let respond: (page: PendingInboundTransfersResponse) => void = () => {};
    responses.set(
      'planck',
      new Promise((resolve) => {
        respond = resolve;
      })
    );

    const { result, unmount } = renderPendingInbound();
    await waitFor(() =>
      expect(result.current.pendingInbound.amount).toBe(BigInt('1000000000000'))
    );

    act(() => result.current.setNetwork('planck'));

    expect(result.current.pendingInbound).toEqual({});

    await act(async () => respond(pendingPage('2000000000000')));
    await waitFor(() =>
      expect(result.current.pendingInbound.amount).toBe(BigInt('2000000000000'))
    );
    unmount();
  });
});
