/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
import type { Config } from 'tailwindcss';

import { plugins, theme } from './src/tailwind';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme,
  plugins
};

export default config;
