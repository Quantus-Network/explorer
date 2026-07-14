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

export const MultisigStats: React.FC = () => {
  const api = useApiClient();
  const { block } = useSearch({
    strict: false
  }) as { block?: string };

  const shouldHide = !!block;

  const walletsStats = api.multisigCreated.useGetStats({
    pollInterval: DATA_POOL_INTERVAL,
    skip: shouldHide
  });

  const proposalsStats = api.multisigProposals.useGetStats({
    pollInterval: DATA_POOL_INTERVAL,
    skip: shouldHide
  });

  if (shouldHide) return null;

  const walletsLoading = walletsStats.loading;
  const walletsError = walletsStats.error;
  const walletsSuccess = !walletsLoading && !walletsError;

  const proposalsLoading = proposalsStats.loading;
  const proposalsError = proposalsStats.error;
  const proposalsSuccess = !proposalsLoading && !proposalsError;

  return (
    <CardGroup className="max-w-[600px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>
            <h3>Total Wallets</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {walletsSuccess && (
            <p>
              {walletsStats.data?.allTime.total_multisigs_created.toLocaleString()}
            </p>
          )}
          {walletsLoading && <Skeleton className="h-6" />}
          {walletsError && <InlineFetchError error={walletsError} />}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <h3>Total Proposals</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {proposalsSuccess && (
            <p>
              {proposalsStats.data?.allTime.total_multisig_proposals.toLocaleString()}
            </p>
          )}
          {proposalsLoading && <Skeleton className="h-6" />}
          {proposalsError && <InlineFetchError error={proposalsError} />}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <h3>Proposals (24h)</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {proposalsSuccess && (
            <p>
              {proposalsStats.data?.last24Hour.aggregate.totalCount.toLocaleString()}
            </p>
          )}
          {proposalsLoading && <Skeleton className="h-6" />}
          {proposalsError && <InlineFetchError error={proposalsError} />}
        </CardContent>
      </Card>
    </CardGroup>
  );
};
