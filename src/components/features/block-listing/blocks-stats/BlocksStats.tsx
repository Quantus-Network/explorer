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

export interface BlocksStatsProps {}

export const BlocksStats: React.FC<BlocksStatsProps> = () => {
  const api = useApiClient();
  const { loading, data, error } = api.blocks.getStats().useQuery({
    pollInterval: DATA_POOL_INTERVAL
  });

  const success = !loading && !error;

  return (
    <CardGroup className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>
            <h3>Latest Block</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {success && <p>{data?.chain.block_height}</p>}
          {loading && <Skeleton className="h-6" />}
          {error && <p>Error: {error.message}</p>}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <h3>Finalized Blocks</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {success && <p>{data?.chain.finalized_block_height}</p>}
          {loading && <Skeleton className="h-6" />}
          {error && <p>Error: {error.message}</p>}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <h3>Mined Blocks (24H)</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {success && <p>{data?.minedIn24Hours.aggregate.totalCount}</p>}
          {loading && <Skeleton className="h-6" />}
          {error && <p>Error: {error.message}</p>}
        </CardContent>
      </Card>
    </CardGroup>
  );
};
