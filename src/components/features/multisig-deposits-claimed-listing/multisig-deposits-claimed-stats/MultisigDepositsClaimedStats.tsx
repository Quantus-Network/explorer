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

export const MultisigDepositsClaimedStats: React.FC = () => {
  const api = useApiClient();
  const { block } = useSearch({
    strict: false
  }) as { block?: string };

  const shouldHide = !!block;

  const { loading, data, error } = api.multisigDepositsClaimed.useGetStats({
    pollInterval: DATA_POOL_INTERVAL,
    skip: shouldHide
  });

  if (shouldHide) return null;

  const success = !loading && !error;

  return (
    <CardGroup className="grid-cols-1 sm:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Total Deposits Claimed</CardTitle>
        </CardHeader>
        <CardContent>
          {success && (
            <p className="text-2xl font-bold">
              {data?.allTime.total_multisig_deposits_claimed.toLocaleString()}
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
          <CardTitle>Recent Deposits Claimed (24H)</CardTitle>
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
    </CardGroup>
  );
};
