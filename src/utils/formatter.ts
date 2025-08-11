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

  const distance = capitalizeFirstChar(
    formatDistanceToNow(date, { addSuffix: true })
  );

  return `${distance} (${formatted})`;
};

export const formatDistanceTimestamp = (timestamp?: string | Date) => {
  if (typeof timestamp !== 'string' && !(timestamp instanceof Date)) return '';

  const date =
    (typeof timestamp === 'string' && new Date(timestamp)) || timestamp;

  const distance = capitalizeFirstChar(
    formatDistanceToNow(date, { addSuffix: true })
  );

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

/**
 * Capitalizes the first character of a string
 * @param sentence - The input string to capitalize
 * @returns The string with the first character capitalized
 */
export const capitalizeFirstChar = (sentence: string) => {
  if (!sentence || sentence.length === 0) {
    return sentence;
  }

  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
};

export const formatOption = (option: string) => {
  const eachWords = option.split('-');
  let newSentence = '';

  eachWords.forEach((val) => {
    if (newSentence.length !== 0) newSentence += ' ';
    newSentence += capitalizeFirstChar(val);
  });

  return newSentence;
};
