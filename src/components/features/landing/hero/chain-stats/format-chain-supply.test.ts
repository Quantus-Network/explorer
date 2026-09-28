import { TOKEN_DECIMALS } from '@/constants/token-decimals';

import { formatChainSupply } from './format-chain-supply';

const plancks = (units: string) => {
  const [whole, fraction = ''] = units.split('.');
  const padded = fraction.padEnd(TOKEN_DECIMALS, '0').slice(0, TOKEN_DECIMALS);

  return `${whole}${padded}`;
};

describe('formatChainSupply', () => {
  it('formats an integer planck amount as QTC with two decimal places', () => {
    expect(formatChainSupply(plancks('1234.56'))).toBe('1,234.56 QTC');
  });

  it('rejects a non-integer supply', () => {
    expect(() => formatChainSupply('1234.56')).toThrow(/integer/);
  });
});
