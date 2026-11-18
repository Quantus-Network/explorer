import { useApolloClient } from '@apollo/client';
import { useEffect, useState } from 'react';

import useApiClient from '@/api';
import { useNetwork } from '@/components/common/network-provider/network-provider';
import { DATA_POOL_INTERVAL } from '@/constants/data-pool-interval';

import {
  fetchPendingInboundRows,
  sumPendingInbound
} from './sum-pending-inbound';

interface PendingInbound {
  amount?: bigint;
  error?: Error;
}

export const usePendingInbound = (accountId: string): PendingInbound => {
  const client = useApolloClient();
  const { networkUrl } = useNetwork();
  const { fetchPage } =
    useApiClient().scheduledReversibleTransactions.getPendingInbound();
  const scope = `${networkUrl} ${accountId}`;
  const [result, setResult] = useState<PendingInbound & { scope: string }>({
    scope
  });

  useEffect(() => {
    let active = true;
    let timer: ReturnType<typeof setTimeout>;

    const load = async () => {
      try {
        const rows = await fetchPendingInboundRows((cursors) =>
          fetchPage(client, { to_id: accountId, ...cursors })
        );
        if (active) setResult({ scope, amount: sumPendingInbound(rows) });
      } catch (caught) {
        if (active) {
          setResult({
            scope,
            error: caught instanceof Error ? caught : new Error(String(caught))
          });
        }
      }
      if (active) timer = setTimeout(load, DATA_POOL_INTERVAL);
    };
    load();

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [client, scope]);

  return result.scope === scope ? result : {};
};
