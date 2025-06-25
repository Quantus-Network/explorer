import type { CSSObject } from './type';

export const borders: CSSObject = {};

export const borderRadius = {
  lg: 'var(--radius)',
  md: 'calc(var(--radius) - 2px)',
  sm: 'calc(var(--radius) - 4px)'
};
