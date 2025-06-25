import type { CSSProperties } from 'react';
import type { CSSRuleObject } from 'tailwindcss/types/config';

export type CSSObject = {
  [key: string]: CSSProperties | CSSObject;
} & CSSRuleObject;
