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
import { formatMonetaryValue } from '@/utils/formatter';

import { type VestingScheduleChartState } from '../vesting-schedule-chart/hook';

export const VestingScheduleStats: React.FC<{
  chart: VestingScheduleChartState;
}> = ({ chart: unlocked }) => {
  const api = useApiClient();
  const { loading, data, error } = api.vestingSchedules.useGetStats({
    pollInterval: DATA_POOL_INTERVAL
  });

  const success = !loading && !error;
  const aggregate = data?.meta.aggregate;
  const unlockedStatus = unlocked.getStatus();

  return (
    <CardGroup className="max-w-[600px] grid-cols-1 sm:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>
            <h3>Schedules</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {success && <p>{aggregate?.count.toLocaleString() ?? '—'}</p>}
          {loading && <Skeleton className="h-6" />}
          {error && <InlineFetchError error={error} />}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <h3>Total allocated</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {success && (
            <p>{formatMonetaryValue(aggregate?.sum?.total ?? '0', 2)}</p>
          )}
          {loading && <Skeleton className="h-6" />}
          {error && <InlineFetchError error={error} />}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <h3>Claimed</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {success && (
            <p>{formatMonetaryValue(aggregate?.sum?.claimed ?? '0', 2)}</p>
          )}
          {loading && <Skeleton className="h-6" />}
          {error && <InlineFetchError error={error} />}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <h3>Unlocked now</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {unlockedStatus === 'success' && unlocked.unlockedNow !== null && (
            <p>{formatMonetaryValue(unlocked.unlockedNow, 2)}</p>
          )}
          {unlockedStatus === 'loading' && <Skeleton className="h-6" />}
          {unlockedStatus === 'error' && (
            <InlineFetchError error={unlocked.error} />
          )}
        </CardContent>
      </Card>
    </CardGroup>
  );
};
