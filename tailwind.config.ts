import type { Config } from 'tailwindcss';

import { plugins, theme } from './src/tailwind';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: ['class', 'class'],
  theme,
  plugins
};

export default config;
