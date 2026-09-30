import { TOKEN_DECIMALS } from '@/constants/token-decimals';

import { formatMonetaryValue } from './formatter';

const plancks = (units: string) => {
  const [whole, fraction = ''] = units.split('.');
  const padded = fraction.padEnd(TOKEN_DECIMALS, '0').slice(0, TOKEN_DECIMALS);

  return `${whole}${padded}`;
};

describe('formatMonetaryValue', () => {
  it('keeps a zero balance as zero', () => {
    expect(formatMonetaryValue('0')).toBe('0 QTC');
  });

  it('keeps amounts below one thousand without grouping', () => {
    expect(formatMonetaryValue(plancks('123.45'), 2)).toBe('123.45 QTC');
  });

  it('groups thousands and larger amounts so they stay readable', () => {
    expect(formatMonetaryValue(plancks('1234.56'), 2)).toBe('1,234.56 QTC');
    expect(formatMonetaryValue(plancks('12345.67'), 2)).toBe('12,345.67 QTC');
    expect(formatMonetaryValue(plancks('123456.78'), 2)).toBe('123,456.78 QTC');
    expect(formatMonetaryValue(plancks('1234567.89'), 2)).toBe(
      '1,234,567.89 QTC'
    );
  });

  it('strips trailing fractional zeros after grouping', () => {
    expect(formatMonetaryValue(plancks('1000'), 5)).toBe('1,000 QTC');
  });

  it('keeps a leading zero for fractional amounts', () => {
    expect(formatMonetaryValue(plancks('0.5'), 5)).toBe('0.5 QTC');
  });
});
