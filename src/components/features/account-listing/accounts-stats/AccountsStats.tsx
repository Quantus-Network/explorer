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
import { InlineFetchError } from '@/components/ui/composites/fetch-error/FetchError';
import { Skeleton } from '@/components/ui/skeleton';
import { DATA_POOL_INTERVAL } from '@/constants/data-pool-interval';

export interface AccountsStatsProps {}

export const AccountsStats: React.FC<AccountsStatsProps> = () => {
  const api = useApiClient();
  const { accountId, block } = useSearch({
    strict: false
  }) as { accountId?: string; block?: string };

  const shouldHide = !!(accountId || block);

  const { loading, data, error } = api.accounts.useGetStats({
    pollInterval: DATA_POOL_INTERVAL,
    skip: shouldHide
  });

  if (shouldHide) return null;

  const success = !loading && !error;

  return (
    <CardGroup className="max-w-[600px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>
            <h3>Total Accounts</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {success && (
            <p className="font-mono">
              {data?.all.total_accounts.toLocaleString()}
            </p>
          )}
          {loading && <Skeleton className="h-6" />}
          {error && <InlineFetchError error={error} />}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <h3>Active (7D)</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {success && (
            <p className="font-mono">
              {data?.recentlyActive.aggregate.count.toLocaleString()}
            </p>
          )}
          {loading && <Skeleton className="h-6" />}
          {error && <InlineFetchError error={error} />}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <h3>Deposit Accounts</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {success && (
            <p className="font-mono">
              {data?.recentlyDeposited.aggregate.count.toLocaleString()}
            </p>
          )}
          {loading && <Skeleton className="h-6" />}
          {error && <InlineFetchError error={error} />}
        </CardContent>
      </Card>
    </CardGroup>
  );
};
