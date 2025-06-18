import { colors } from './colors';
import customPlugin from './plugin';
import { screens } from './screens';

export const theme = {
  extend: {
    colors
  },
  screens
};

export const plugins = [customPlugin];
