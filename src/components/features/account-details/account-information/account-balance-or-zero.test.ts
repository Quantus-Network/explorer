import { formatMonetaryValue } from '@/utils/formatter';

import { accountBalanceOrZero } from './account-balance-or-zero';

describe('accountBalanceOrZero', () => {
  it('formats a missing Subsquid balance as zero QTC', () => {
    expect(formatMonetaryValue(accountBalanceOrZero(null))).toBe('0 QTC');
  });
});
