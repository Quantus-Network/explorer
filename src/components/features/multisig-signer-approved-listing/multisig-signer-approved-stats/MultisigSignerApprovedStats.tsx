import { useSearch } from '@tanstack/react-router';
import React from 'react';

import useApiClient from '@/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { DATA_POOL_INTERVAL } from '@/constants/data-pool-interval';

export const MultisigSignerApprovedStats: React.FC = () => {
  const api = useApiClient();
  const { block } = useSearch({
    strict: false
  }) as { block?: string };

  if (block) return null;

  const { loading, data, error } = api.multisigSignerApproved.useGetStats({
    pollInterval: DATA_POOL_INTERVAL
  });

  const success = !loading && !error;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Total Signer Approved</CardTitle>
        </CardHeader>
        <CardContent>
          {success && (
            <p className="text-2xl font-bold">
              {data?.allTime.total_multisig_signer_approved.toLocaleString()}
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
          <CardTitle>Recent Signer Approved (24H)</CardTitle>
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
