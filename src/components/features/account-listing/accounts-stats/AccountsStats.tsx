import { useSearch } from '@tanstack/react-router';
import React from 'react';

import api from '@/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { DATA_POOL_INTERVAL } from '@/constants/data-pool-interval';

export interface AccountsStatsProps {}

export const AccountsStats: React.FC<AccountsStatsProps> = () => {
  const { accountId, block } = useSearch({
    strict: false
  }) as any;

  if (accountId || block) return null;

  const { loading, data, error } = api.accounts.useGetStats({
    pollInterval: DATA_POOL_INTERVAL
  });

  const success = !loading && !error;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>
            <h3>Total Accounts</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {success && <p>{data?.all.totalCount}</p>}
          {loading && <Skeleton className="h-6" />}
          {error && <p>Error: {error.message}</p>}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <h3>Active Accounts (7D)</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {success && <p>{data?.recentlyActive.totalCount}</p>}
          {loading && <Skeleton className="h-6" />}
          {error && <p>Error: {error.message}</p>}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <h3>Deposit Accounts (7D)</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {success && <p>{data?.recentlyDeposited.totalCount}</p>}
          {loading && <Skeleton className="h-6" />}
          {error && <p>Error: {error.message}</p>}
        </CardContent>
      </Card>
    </div>
  );
};
