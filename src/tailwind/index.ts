import { fontFamily } from 'tailwindcss/defaultTheme';
import type { CustomThemeConfig } from 'tailwindcss/types/config';
import tailwindcssAnimatePlugin from 'tailwindcss-animate';

import { borderRadius } from './borders';
import { colors } from './colors';
import customPlugin from './plugin';
import { screens } from './screens';

export const theme: Partial<
  CustomThemeConfig & { extend: Partial<CustomThemeConfig> }
> = {
  extend: {
    borderRadius,
    colors,
    fontFamily: {
      sans: ['var(--font-geist)', ...fontFamily.sans],
      mono: ['var(--font-geist-mono)', ...fontFamily.mono],
      heading: ['var(--font-jet-brains)', ...fontFamily.sans],
      geist: ['var(--font-geist)', ...fontFamily.sans],
      'geist-mono': ['var(--font-geist-mono)', ...fontFamily.mono]
    },
    maxWidth: {
      content: 'var(--content-max)'
    },
    height: {
      nav: 'var(--nav-height)'
    },
    keyframes: {
      'live-pulse': {
        '0%, 100%': { opacity: '1', transform: 'scale(1)' },
        '50%': { opacity: '0.4', transform: 'scale(0.8)' }
      }
    },
    animation: {
      'live-pulse': 'live-pulse 1.2s ease-in-out infinite'
    }
  },
  screens
};

export const plugins = [customPlugin, tailwindcssAnimatePlugin];
