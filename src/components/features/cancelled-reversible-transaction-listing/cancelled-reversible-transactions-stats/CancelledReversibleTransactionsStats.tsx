import { useSearch } from '@tanstack/react-router';
import React from 'react';

import useApiClient from '@/api';
import {
  Card,
  CardContent,
  CardGroup,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { DATA_POOL_INTERVAL } from '@/constants/data-pool-interval';

export interface CancelledReversibleTransactionsStatsProps {}

export const CancelledReversibleTransactionsStats: React.FC<
  CancelledReversibleTransactionsStatsProps
> = () => {
  const api = useApiClient();
  const { accountId, block } = useSearch({
    strict: false
  }) as any;

  const shouldHide = !!(accountId || block);

  const { loading, data, error } =
    api.cancelledReversibleTransactions.useGetStats({
      pollInterval: DATA_POOL_INTERVAL,
      skip: shouldHide
    });

  if (shouldHide) return null;

  const success = !loading && !error;

  return (
    <CardGroup className="grid-cols-1 sm:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>
            <h3>Total Cancelled Transactions</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {success && <p>{data?.allTime.total_cancelled_transfers}</p>}
          {loading && <Skeleton className="h-6" />}
          {error && <p>Error: {error.message}</p>}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <h3>Recent Cancelled Transactions (24H)</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {success && <p>{data?.last24Hour.aggregate.totalCount}</p>}
          {loading && <Skeleton className="h-6" />}
          {error && <p>Error: {error.message}</p>}
        </CardContent>
      </Card>
    </CardGroup>
  );
};
