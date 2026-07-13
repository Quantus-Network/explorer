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

export const MinerLeaderboardStats: React.FC = () => {
  const api = useApiClient();
  const { loading, data, error } = api.minerLeaderboard.useGetStats({
    pollInterval: DATA_POOL_INTERVAL
  });

  const success = !loading && !error;

  return (
    <CardGroup className="max-w-[600px] grid-cols-1 sm:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>
            <h3>Total Blocks</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {success && (
            <p>{data?.chain?.block_height?.toLocaleString() ?? '—'}</p>
          )}
          {loading && <Skeleton className="h-6" />}
          {error && <p>Error: {error.message}</p>}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <h3>Active Miners</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {success && (
            <p>{data?.chain?.total_miners?.toLocaleString() ?? '—'}</p>
          )}
          {loading && <Skeleton className="h-6" />}
          {error && <p>Error: {error.message}</p>}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <h3>Rewards (24h)</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {success && (
            <p>
              {data?.last24Hour.aggregate.totalCount?.toLocaleString() ?? '—'}
            </p>
          )}
          {loading && <Skeleton className="h-6" />}
          {error && <p>Error: {error.message}</p>}
        </CardContent>
      </Card>
    </CardGroup>
  );
};
