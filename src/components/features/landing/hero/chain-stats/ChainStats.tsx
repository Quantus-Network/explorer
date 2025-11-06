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
  const totalTransactions =
    (data?.transactions?.totalCount ?? 0) +
    (data?.reversibleTransactions?.totalCount ?? 0);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle>
            <h3>Latest Block</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {success && <p>#{data?.status?.height}</p>}
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
          {success && <p>{data?.allActiveAccounts?.totalCount}</p>}
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
          {success && <p>{data?.allDepositAccounts?.totalCount}</p>}
          {loading && <Skeleton className="h-6" />}
          {error && <p>Error: {error.message}</p>}
        </CardContent>
      </Card>
    </div>
  );
};
