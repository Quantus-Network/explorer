import React from 'react';

import useApiClient from '@/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from '@/components/ui/composites/info/Info';
import { Skeleton } from '@/components/ui/skeleton';
import { DATA_POOL_INTERVAL } from '@/constants/data-pool-interval';

export interface ChainStatsProps {}

export const ChainStats: React.FC<ChainStatsProps> = () => {
  const api = useApiClient();
  const { loading, data, error } = api.chainStatus.useGetStatus({
    pollInterval: DATA_POOL_INTERVAL
  });

  const success = !loading && !error;

  const depositAccounts = data?.status?.total_deposit_accounts ?? 0;
  const totalAccounts = data?.status?.total_accounts ?? 0;
  const activeAccounts = totalAccounts - depositAccounts;

  const totalImmediateTransactions =
    data?.status?.total_immediate_transfers ?? 0;
  const totalScheduledTransactions =
    data?.status?.total_scheduled_transfers ?? 0;
  const totalExecutedTransactions = data?.status?.total_executed_transfers ?? 0;
  const totalCancelledTransactions =
    data?.status?.total_cancelled_transfers ?? 0;
  const totalTransactions =
    totalImmediateTransactions +
    totalScheduledTransactions +
    totalExecutedTransactions +
    totalCancelledTransactions;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle>
            <h3>Latest Block</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {success && <p>#{data?.status?.block_height}</p>}
          {loading && <Skeleton className="h-6" />}
          {error && <p>Error: {error.message}</p>}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <h3>Transactions</h3>

            <Info>
              Total count of immediate transactions and reversible transactions
            </Info>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {success && <p>{totalTransactions}</p>}
          {loading && <Skeleton className="h-6" />}
          {error && <p>Error: {error.message}</p>}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <h3>Active Accounts</h3>

            <Info>Account that has an activity.</Info>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {success && <p>{activeAccounts}</p>}
          {loading && <Skeleton className="h-6" />}
          {error && <p>Error: {error.message}</p>}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <h3>Deposit Accounts</h3>

            <Info>Account receiving transfers.</Info>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {success && <p>{depositAccounts}</p>}
          {loading && <Skeleton className="h-6" />}
          {error && <p>Error: {error.message}</p>}
        </CardContent>
      </Card>
    </div>
  );
};
