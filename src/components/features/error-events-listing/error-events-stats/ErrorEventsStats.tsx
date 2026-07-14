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

export interface ErrorEventsStatsProps {}

export const ErrorEventsStats: React.FC<ErrorEventsStatsProps> = () => {
  const api = useApiClient();
  const { block } = useSearch({
    strict: false
  }) as any;

  const shouldHide = !!block;

  const { loading, data, error } = api.errors.useGetStats({
    pollInterval: DATA_POOL_INTERVAL,
    skip: shouldHide
  });

  if (shouldHide) return null;

  const success = !loading && !error;

  return (
    <CardGroup className="max-w-[600px] grid-cols-1 sm:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>
            <h3>Total Error Events</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {success && (
            <p className="font-mono">
              {data?.allTime.total_error_events.toLocaleString()}
            </p>
          )}
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
          {success && (
            <p className="font-mono">
              {data?.last24Hour.aggregate.totalCount.toLocaleString()}
            </p>
          )}
          {loading && <Skeleton className="h-6" />}
          {error && <p>Error: {error.message}</p>}
        </CardContent>
      </Card>
    </CardGroup>
  );
};
