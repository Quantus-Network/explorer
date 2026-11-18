import { render, within } from '@testing-library/react';
import { JSDOM } from 'jsdom';

import { ChainStats } from './ChainStats';

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

jest.mock('./hook', () => ({
  useChainStats: () => ({
    loading: false,
    error: undefined,
    blockHeight: 100,
    totalTransactions: 0,
    last24HourTransactions: 0,
    last24HourActiveAccounts: 0,
    activeAccounts: 0,
    blocksPoints: [],
    transfersPoints: [],
    activeAccountsPoints: [],
    transferredPoints: [],
    totalTransferred: '0',
    last24HourTransferred: '0',
    maxSupply: '21000000000000000000',
    circulatingSupply: '333711807566964724'
  })
}));

jest.mock('./use-qtc-price', () => ({
  useQtcPrice: () => ({
    loading: false,
    error: null,
    priceUsd: 1,
    priceChangePercentage24h: null
  })
}));

describe('ChainStats', () => {
  it('shows only the circulating supply in the Coin Circulation card', () => {
    const { container } = render(<ChainStats />);
    const stats = within(container);

    expect(stats.getByText('Coin Circulation')).toBeTruthy();
    expect(stats.getByText('333,711.8 QTC')).toBeTruthy();
    expect(stats.queryByText('NEAR Intents Bridge')).toBeNull();
  });
});
