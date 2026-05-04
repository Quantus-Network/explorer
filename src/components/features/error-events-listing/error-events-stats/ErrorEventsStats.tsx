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
          <CardTitle>Total Error Events</CardTitle>
        </CardHeader>
        <CardContent>
          {success && (
            <p className="text-2xl font-bold">
              {data?.allTime.total_error_events.toLocaleString()}
            </p>
          )}
          {loading && <Skeleton className="h-8 w-24" />}
          {error && (
            <p className="text-sm text-destructive">Error: {error.message}</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Error Events (24H)</CardTitle>
        </CardHeader>
        <CardContent>
          {success && (
            <p className="text-2xl font-bold">
              {data?.last24Hour.aggregate.totalCount.toLocaleString()}
            </p>
          )}
          {loading && <Skeleton className="h-8 w-24" />}
          {error && (
            <p className="text-sm text-destructive">Error: {error.message}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
