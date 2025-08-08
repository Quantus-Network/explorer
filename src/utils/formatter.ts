import { format } from 'date-fns/format';

import env from '@/config/env';

export const formatTimestamp = (timestamp?: string | Date) => {
  if (typeof timestamp !== 'string' && !(timestamp instanceof Date)) return '';

  const date =
    (typeof timestamp === 'string' && new Date(timestamp)) || timestamp;

  return format(date, 'MM/dd/yyyy, hh:mm:ss');
};

export const formatMonetaryValue = (value: number, digits?: number) => {
  const denominator = 10 ** 12;
  const convertedValue = value / denominator;

  if (!digits) return `${convertedValue} ${env.COIN_SYMBOL}`;

  const str = convertedValue.toFixed(digits).replace(/\.?(0+)$/, '');

  return `${str} ${env.COIN_SYMBOL}`;
};

export const formatTxAddress = (address: string) => {
  if (!address) return '';

  const firstSix = address.substring(0, 6);
  const lastFive = address.substring(address.length - 5);

  return `${firstSix}....${lastFive}`;
};
