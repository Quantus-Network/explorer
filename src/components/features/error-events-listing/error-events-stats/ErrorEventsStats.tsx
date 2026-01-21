import { useSearch } from '@tanstack/react-router';
import React from 'react';

import useApiClient from '@/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { DATA_POOL_INTERVAL } from '@/constants/data-pool-interval';

export interface ErrorEventsStatsProps {}

export const ErrorEventsStats: React.FC<ErrorEventsStatsProps> = () => {
  const api = useApiClient();
  const { block } = useSearch({
    strict: false
  }) as any;

  if (block) return null;

  const { loading, data, error } = api.errors.useGetStats({
    pollInterval: DATA_POOL_INTERVAL
  });

  const success = !loading && !error;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>
            <h3>Total Error Events</h3>
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
            <h3>Recent Error Events (24H)</h3>
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
