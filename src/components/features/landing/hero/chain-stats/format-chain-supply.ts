import { formatMonetaryValue } from '@/utils/formatter';

export const formatChainSupply = (value: string) => {
  if (!/^\d+$/.test(value)) {
    throw new Error('supply is not an integer');
  }

  return formatMonetaryValue(value, 2);
};
