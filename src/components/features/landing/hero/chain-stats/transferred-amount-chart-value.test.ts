import { TOKEN_DECIMALS } from '@/constants/token-decimals';

import { transferredAmountToChartValue } from './transferred-amount-chart-value';

const plancks = (units: string) => {
  const [whole, fraction = ''] = units.split('.');
  const padded = fraction.padEnd(TOKEN_DECIMALS, '0').slice(0, TOKEN_DECIMALS);

  return `${whole}${padded}`;
};

describe('transferredAmountToChartValue', () => {
  it('converts an integer planck amount into token units', () => {
    expect(transferredAmountToChartValue(plancks('0'))).toBe(0);
    expect(transferredAmountToChartValue(plancks('1.5'))).toBe(1.5);
    expect(transferredAmountToChartValue(plancks('1000'))).toBe(1000);
  });

  it('rejects a non-integer amount', () => {
    expect(() => transferredAmountToChartValue('1.5')).toThrow(/integer/);
  });

  it('rejects a whole-token part above Number.MAX_SAFE_INTEGER', () => {
    const tooBig = `${BigInt(Number.MAX_SAFE_INTEGER) + BigInt(1)}${'0'.repeat(TOKEN_DECIMALS)}`;

    expect(() => transferredAmountToChartValue(tooBig)).toThrow(/too large/);
  });
});
