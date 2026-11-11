import { render, within } from '@testing-library/react';
import { JSDOM } from 'jsdom';

import type { SupplyBucket } from './supply-distribution';
import { SupplyDistribution } from './SupplyDistribution';

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

const BUCKETS: SupplyBucket[] = [
  {
    label: 'NEAR Intents Bridge',
    amount: BigInt('218522096109355884'),
    share: 65.48
  },
  {
    label: 'Vesting (unlocked, unclaimed)',
    amount: BigInt('7135083322869101'),
    share: 2.14
  },
  {
    label: 'Users & miners',
    amount: BigInt('108054628134739739'),
    share: 32.38
  }
];

describe('SupplyDistribution', () => {
  it('lists each bucket with its label, amount, and share of circulating supply', () => {
    const { container } = render(<SupplyDistribution buckets={BUCKETS} />);

    const rows = within(container)
      .getAllByRole('listitem')
      .map((row) => [
        within(row).getByTestId('supply-bucket-label').textContent,
        within(row).getByTestId('supply-bucket-amount').textContent,
        within(row).getByTestId('supply-bucket-share').textContent
      ]);

    expect(rows).toEqual([
      ['NEAR Intents Bridge', '218,522.09 QTC', '65.48%'],
      ['Vesting (unlocked, unclaimed)', '7,135.08 QTC', '2.14%'],
      ['Users & miners', '108,054.62 QTC', '32.38%']
    ]);
  });

  it('draws one bar segment per bucket sized to its share', () => {
    const { container } = render(<SupplyDistribution buckets={BUCKETS} />);

    expect(
      within(container)
        .getAllByTestId('supply-bucket-segment')
        .map((segment) => (segment as HTMLElement).style.width)
    ).toEqual(['65.48%', '2.14%', '32.38%']);
  });
});
