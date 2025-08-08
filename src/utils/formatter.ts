import { utc } from '@date-fns/utc';
import { format } from 'date-fns/format';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';

import env from '@/config/env';

export const formatTimestamp = (
  timestamp?: string | Date,
  withDistance: boolean = false
) => {
  if (typeof timestamp !== 'string' && !(timestamp instanceof Date)) return '';

  const date =
    (typeof timestamp === 'string' && new Date(timestamp)) || timestamp;

  const formatted = `${format(date, 'MM/dd/yyyy, hh:mm:ss', { in: utc })} UTC`;
  if (!withDistance) return formatted;

  const distance = formatDistanceToNow(date, { addSuffix: true });

  return `${distance} (${formatted})`;
};

export const formatDistanceTimestamp = (timestamp?: string | Date) => {
  if (typeof timestamp !== 'string' && !(timestamp instanceof Date)) return '';

  const date =
    (typeof timestamp === 'string' && new Date(timestamp)) || timestamp;

  const distance = formatDistanceToNow(date, { addSuffix: true });

  return distance;
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
