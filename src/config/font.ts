/**
 * @fileoverview configures multiple Google Fonts using the `next/font/google` package and integrated with Tailwind CSS.
 * @see {@link https://nextjs.org/docs/app/building-your-application/optimizing/fonts#with-tailwind-css}
 */

import { Figtree, Source_Serif_4 } from 'next/font/google';

/**
 * This configuration specifies different font weights to load and ensures
 * optimization for the Latin script.
 *
 * The `variable` property allows the font to be used with Tailwind CSS utilities.
 */
export const figtree = Figtree({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal'],
  variable: '--font-figtree'
});

/**
 * This configuration specifies different font weights to load and ensures
 * optimization for the Latin script.
 *
 * The `variable` property allows the font to be used with Tailwind CSS utilities.
 */
export const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-source-serif'
});
