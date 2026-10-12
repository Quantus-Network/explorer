import { ImageResponse } from 'workers-og';

import { loadOgFonts } from './og-fonts';
import { buildOgElement } from './og-template';
import type { QtcMarketQuote } from './qtc-market';
import { OG_HEIGHT, OG_WIDTH } from './qtc-market';

export async function generateOgImageResponse(
  requestUrl: string,
  quote: QtcMarketQuote
): Promise<Response> {
  const fonts = await loadOgFonts(requestUrl);
  const element = buildOgElement(quote);

  return new ImageResponse(element, {
    width: OG_WIDTH,
    height: OG_HEIGHT,
    fonts
  });
}
