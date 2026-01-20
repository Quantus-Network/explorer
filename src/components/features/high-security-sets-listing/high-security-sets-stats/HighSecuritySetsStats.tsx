import { useSearch } from '@tanstack/react-router';
import React from 'react';

import useApiClient from '@/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { DATA_POOL_INTERVAL } from '@/constants/data-pool-interval';

export interface HighSecuritySetsStatsProps {}

export const HighSecuritySetsStats: React.FC<
  HighSecuritySetsStatsProps
> = () => {
  const api = useApiClient();
  const { accountId, block } = useSearch({
    strict: false
  }) as any;

  if (accountId || block) return null;

  const { loading, data, error } = api.highSecuritySets.useGetStats({
    pollInterval: DATA_POOL_INTERVAL
  });

  const success = !loading && !error;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>
            <h3>Total High Security Sets</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {success && <p>{data?.allTime.totalCount}</p>}
          {loading && <Skeleton className="h-6" />}
          {error && <p>Error: {error.message}</p>}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <h3>Recent High Security Sets (24H)</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {success && <p>{data?.last24Hour.totalCount}</p>}
          {loading && <Skeleton className="h-6" />}
          {error && <p>Error: {error.message}</p>}
        </CardContent>
      </Card>
    </div>
  );
};
