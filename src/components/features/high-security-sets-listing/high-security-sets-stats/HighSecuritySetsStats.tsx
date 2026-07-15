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

export interface HighSecuritySetsStatsProps {}

export const HighSecuritySetsStats: React.FC<
  HighSecuritySetsStatsProps
> = () => {
  const api = useApiClient();
  const { accountId, block } = useSearch({
    strict: false
  }) as { accountId?: string; block?: string };

  const shouldHide = !!(accountId || block);

  const { loading, data, error } = api.highSecuritySets.useGetStats({
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
            <h3>Total</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {success && (
            <p className="font-mono">
              {data?.allTime.total_high_security_sets.toLocaleString()}
            </p>
          )}
          {loading && <Skeleton className="h-6" />}
          {error && <InlineFetchError error={error} />}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <h3>Last 24h</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {success && (
            <p className="font-mono">
              {data?.last24Hour.aggregate.totalCount.toLocaleString()}
            </p>
          )}
          {loading && <Skeleton className="h-6" />}
          {error && <InlineFetchError error={error} />}
        </CardContent>
      </Card>
    </CardGroup>
  );
};
