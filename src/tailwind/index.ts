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
      heading: ['var(--font-jet-brains)', ...fontFamily.sans]
    }
  },
  screens
};

export const plugins = [customPlugin, tailwindcssAnimatePlugin];
