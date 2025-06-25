'use client';

import React from 'react';

import api from '@/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { DATA_POOL_INTERVAL } from '@/constants/data-pool-interval';

export interface ChainStatsProps {}

export const ChainStats: React.FC<ChainStatsProps> = () => {
  const { loading, data, error } = api.chainStatus.useGetStatus({
    pollInterval: DATA_POOL_INTERVAL
  });

  const success = !loading && !error;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>
            <h3>Latest Block</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {success ? (
            <p>#{data?.status?.height}</p>
          ) : (
            <Skeleton className="h-6" />
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <h3>Total Transactions</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {success ? (
            <p>{data?.transactions?.totalCount}</p>
          ) : (
            <Skeleton className="h-6" />
          )}
        </CardContent>
      </Card>
    </div>
  );
};
