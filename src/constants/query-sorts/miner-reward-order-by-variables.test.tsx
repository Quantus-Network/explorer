import { renderHook } from '@testing-library/react';
import { JSDOM } from 'jsdom';

import { useAccountMinerRewards } from '@/components/features/account-details/account-miner-rewards/hook';
import { useMinerRewardsTable } from '@/components/features/miner-reward-listing/miner-rewards-table/hook';

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

const requests: Array<{ variables?: { orderBy?: unknown } }> = [];

const tableState: { orderBy: string | null } = { orderBy: null };

jest.mock('@/api', () => ({
  __esModule: true,
  default: () => ({
    minerRewards: {
      useGetAll: (options: { variables?: { orderBy?: unknown } }) => {
        requests.push(options);
        return { loading: true, data: undefined, error: undefined };
      }
    }
  })
}));

jest.mock('@/hooks/useTableState', () => ({
  useTableState: () => ({
    orderBy: tableState.orderBy,
    limit: 25,
    currentPageIndex: 0,
    handleChangeSorting: () => undefined,
    handleChangePagination: () => undefined,
    paginationValue: { pageSize: 25, pageIndex: 0 }
  })
}));

jest.mock('@tanstack/react-router', () => ({
  useSearch: () => ({}),
  Link: ({ children }: { children?: unknown }) => children ?? null
}));

describe('miner reward query orderBy variables', () => {
  beforeEach(() => {
    requests.length = 0;
    tableState.orderBy = null;
  });

  it.each([
    ['block_height:asc', { block: { height: 'asc' } }],
    ['block_height:desc', { block: { height: 'desc' } }],
    ['block_hash:asc', { block: { hash: 'asc' } }],
    ['block_hash:desc', { block: { hash: 'desc' } }],
    ['reward:desc', { reward: 'desc' }],
    ['timestamp:asc', { timestamp: 'asc' }]
  ] as const)(
    'account tab and miner-rewards listing send %s as a valid orderBy',
    (literal, expected) => {
      tableState.orderBy = literal;

      renderHook(() => useAccountMinerRewards('miner-address'));
      renderHook(() => useMinerRewardsTable());

      expect(requests).toHaveLength(2);
      expect(requests[0]?.variables?.orderBy).toEqual(expected);
      expect(requests[1]?.variables?.orderBy).toEqual(expected);
    }
  );

  it('leaves orderBy unset on both tables when no header is sorted', () => {
    renderHook(() => useAccountMinerRewards('miner-address'));
    renderHook(() => useMinerRewardsTable());

    expect(requests).toHaveLength(2);
    expect(requests[0]?.variables?.orderBy).toBeUndefined();
    expect(requests[1]?.variables?.orderBy).toBeUndefined();
  });
});
