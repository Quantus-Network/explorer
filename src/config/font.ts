/**
 * @fileoverview configures multiple Google Fonts using the `next/font/google` package and integrated with Tailwind CSS.
 * @see {@link https://nextjs.org/docs/app/building-your-application/optimizing/fonts#with-tailwind-css}
 */

import { Inter, JetBrains_Mono } from 'next/font/google';

/**
 * This configuration specifies different font weights to load and ensures
 * optimization for the Latin script.
 *
 * The `variable` property allows the font to be used with Tailwind CSS utilities.
 */
export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
  variable: '--font-inter'
});

/**
 * This configuration specifies different font weights to load and ensures
 * optimization for the Latin script.
 *
 * The `variable` property allows the font to be used with Tailwind CSS utilities.
 */
export const jetBrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
  variable: '--font-jet-brains'
});
