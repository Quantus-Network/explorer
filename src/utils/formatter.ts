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

  const formatted = `${format(date, 'MM/dd/yyyy, HH:mm:ss', { in: utc })} UTC`;
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

/**
 * Formats milliseconds into a human-readable duration string
 * @param milliseconds - The duration in milliseconds (can be a string or BigInt from GraphQL)
 * @returns Human-readable duration string (e.g., "1d 2h 3m 4s", "5m 30s", "500ms")
 */
export const formatDuration = (
  milliseconds: string | number | bigint
): string => {
  let ms: number;

  // Convert to number if it's a string or BigInt
  if (typeof milliseconds === 'string') {
    ms = Number.parseInt(milliseconds, 10);
  } else if (typeof milliseconds === 'bigint') {
    ms = Number(milliseconds);
  } else {
    ms = milliseconds;
  }

  if (Number.isNaN(ms) || ms < 0) {
    return '0ms';
  }

  const SECOND = 1000;
  const MINUTE = SECOND * 60;
  const HOUR = MINUTE * 60;
  const DAY = HOUR * 24;

  const days = Math.floor(ms / DAY);
  const hours = Math.floor((ms % DAY) / HOUR);
  const minutes = Math.floor((ms % HOUR) / MINUTE);
  const seconds = Math.floor((ms % MINUTE) / SECOND);
  const remainingMs = ms % SECOND;

  const parts: string[] = [];

  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0) parts.push(`${seconds}s`);
  if (remainingMs > 0 && parts.length === 0) parts.push(`${remainingMs}ms`);

  return parts.length > 0 ? parts.join(' ') : '0ms';
};
