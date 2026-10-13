import { useEffect, useState } from 'react';

import {
  DEV_QTC_PRICE_USD,
  loadQtcPrice,
  shouldFetchQtcPrice
} from '@/lib/qtc-market';

type QtcPriceState = {
  loading: boolean;
  error: string | null;
  priceUsd: number | null;
};

export function useQtcPrice(): QtcPriceState {
  const isDev = import.meta.env.DEV;
  const [state, setState] = useState<QtcPriceState>(() =>
    shouldFetchQtcPrice(isDev)
      ? { loading: true, error: null, priceUsd: null }
      : { loading: false, error: null, priceUsd: DEV_QTC_PRICE_USD }
  );

  useEffect(() => {
    if (!shouldFetchQtcPrice(isDev)) return undefined;

    const controller = new AbortController();

    loadQtcPrice(false, (url) => fetch(url, { signal: controller.signal }))
      .then((priceUsd) => {
        setState({ loading: false, error: null, priceUsd });
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        const message =
          error instanceof Error ? error.message : 'Failed to load QTC price';
        setState({ loading: false, error: message, priceUsd: null });
      });

    return () => controller.abort();
  }, [isDev]);

  return state;
}
