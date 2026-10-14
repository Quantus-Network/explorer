import { useEffect, useState } from 'react';

import {
  DEV_QTC_PRICE_CHANGE_PERCENTAGE_24H,
  DEV_QTC_PRICE_USD,
  loadQtcPrice,
  shouldFetchQtcPrice
} from '@/lib/qtc-market';

type QtcPriceState = {
  loading: boolean;
  error: string | null;
  priceUsd: number | null;
  priceChangePercentage24h: number | null;
};

export function useQtcPrice(): QtcPriceState {
  const isDev = import.meta.env.DEV;
  const [state, setState] = useState<QtcPriceState>(() =>
    shouldFetchQtcPrice(isDev)
      ? {
          loading: true,
          error: null,
          priceUsd: null,
          priceChangePercentage24h: null
        }
      : {
          loading: false,
          error: null,
          priceUsd: DEV_QTC_PRICE_USD,
          priceChangePercentage24h: DEV_QTC_PRICE_CHANGE_PERCENTAGE_24H
        }
  );

  useEffect(() => {
    if (!shouldFetchQtcPrice(isDev)) return undefined;

    const controller = new AbortController();

    loadQtcPrice(false, (url) => fetch(url, { signal: controller.signal }))
      .then((price) => {
        setState({
          loading: false,
          error: null,
          priceUsd: price.priceUsd,
          priceChangePercentage24h: price.priceChangePercentage24h
        });
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        const message =
          error instanceof Error ? error.message : 'Failed to load QTC price';
        setState({
          loading: false,
          error: message,
          priceUsd: null,
          priceChangePercentage24h: null
        });
      });

    return () => controller.abort();
  }, [isDev]);

  return state;
}
