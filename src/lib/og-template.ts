import React from 'react';

import type { QtcMarketQuote } from './qtc-market';
import {
  formatUsdMarketCap,
  formatUsdPrice,
  OG_HEIGHT,
  OG_WIDTH
} from './qtc-market';

const colors = {
  void: '#0e0e0e',
  flare: '#ff6b35',
  content: '#e8e6e0',
  muted: '#8a8784',
  border: '#262626'
} as const;

function div(
  style: React.CSSProperties,
  ...children: React.ReactNode[]
): React.ReactElement {
  return React.createElement('div', { style }, ...children);
}

export function buildOgElement(quote: QtcMarketQuote) {
  const price = formatUsdPrice(quote.priceUsd);
  const marketCap = formatUsdMarketCap(quote.marketCapUsd);

  return div(
    {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: OG_WIDTH,
      height: OG_HEIGHT,
      padding: '64px 72px',
      background: colors.void,
      color: colors.content,
      fontFamily: 'Geist'
    },
    div(
      {
        display: 'flex',
        fontFamily: 'Geist Mono',
        fontSize: 18,
        fontWeight: 500,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: colors.muted
      },
      'Quantus Explorer'
    ),
    div(
      { display: 'flex', flexDirection: 'column' },
      div(
        {
          display: 'flex',
          marginBottom: 16,
          fontFamily: 'Geist Mono',
          fontSize: 20,
          fontWeight: 500,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: colors.muted
        },
        'QTC Price'
      ),
      div(
        {
          display: 'flex',
          fontSize: 112,
          fontWeight: 500,
          letterSpacing: '-0.04em',
          lineHeight: 1,
          color: colors.flare
        },
        price
      )
    ),
    div(
      {
        display: 'flex',
        alignItems: 'baseline',
        paddingTop: 28,
        borderTop: `1px solid ${colors.border}`
      },
      div(
        {
          display: 'flex',
          fontFamily: 'Geist Mono',
          fontSize: 20,
          fontWeight: 500,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: colors.muted
        },
        'Market Cap'
      ),
      div(
        {
          display: 'flex',
          marginLeft: 24,
          fontSize: 42,
          fontWeight: 500,
          letterSpacing: '-0.02em'
        },
        marketCap
      )
    )
  );
}
