import { useApolloClient } from '@apollo/client';
import { useEffect, useState } from 'react';

import useApiClient from '@/api';
import { DATA_POOL_INTERVAL } from '@/constants/data-pool-interval';

import {
  fetchPendingInboundRows,
  sumPendingInbound
} from './sum-pending-inbound';

interface PendingInbound {
  accountId: string;
  amount?: bigint;
  error?: Error;
}

export const usePendingInbound = (accountId: string): PendingInbound => {
  const client = useApolloClient();
  const { fetchPage } =
    useApiClient().scheduledReversibleTransactions.getPendingInbound();
  const [result, setResult] = useState<PendingInbound>({ accountId });

  useEffect(() => {
    let active = true;
    let timer: ReturnType<typeof setTimeout>;

    const load = async () => {
      try {
        const rows = await fetchPendingInboundRows((cursors) =>
          fetchPage(client, { to_id: accountId, ...cursors })
        );
        if (active) setResult({ accountId, amount: sumPendingInbound(rows) });
      } catch (caught) {
        if (active) {
          setResult({
            accountId,
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
  }, [client, accountId]);

  return result.accountId === accountId ? result : { accountId };
};
