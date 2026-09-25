import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';

import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import type { VestingScheduleSorts } from '@/constants/query-sorts';
import type {
  VestingScheduleChartResponse,
  VestingScheduleListResponse,
  VestingScheduleStatsResponse
} from '@/schemas';
import type { PaginatedQueryVariables } from '@/types/query';

const GET_VESTING_SCHEDULE_STATS = gql`
  query GetVestingScheduleStats {
    meta: vesting_schedule_aggregate {
      aggregate {
        count
        sum {
          total
          claimed
        }
      }
    }
  }
`;

const GET_VESTING_SCHEDULE_CHART = gql`
  query GetVestingScheduleChart($limit: Int!) {
    schedules: vesting_schedule(limit: $limit) {
      id
      start
      cliff
      end
      total
    }
  }
`;

const GET_VESTING_SCHEDULES = gql`
  query GetVestingSchedules(
    $limit: Int
    $offset: Int
    $orderBy: [vesting_schedule_order_by!]
  ) {
    schedules: vesting_schedule(
      limit: $limit
      offset: $offset
      order_by: $orderBy
    ) {
      id
      beneficiary
      total
      claimed
      start
      cliff
      end
      last_claim_at
    }
    meta: vesting_schedule_aggregate {
      aggregate {
        totalCount: count
      }
    }
  }
`;

export const vestingSchedules = {
  useGetStats: (
    config?: Omit<QueryHookOptions<VestingScheduleStatsResponse>, 'variables'>
  ) =>
    useQuery<VestingScheduleStatsResponse>(GET_VESTING_SCHEDULE_STATS, config),

  useGetChartData: (
    config?: Omit<QueryHookOptions<VestingScheduleStatsResponse>, 'variables'>
  ) => {
    const stats = useQuery<VestingScheduleStatsResponse>(
      GET_VESTING_SCHEDULE_STATS,
      config
    );
    const count = stats.data?.meta.aggregate?.count;
    const rows = useQuery<VestingScheduleChartResponse, { limit: number }>(
      GET_VESTING_SCHEDULE_CHART,
      {
        pollInterval: config?.pollInterval,
        skip: typeof count !== 'number' || config?.skip,
        variables: { limit: count ?? 0 }
      }
    );

    const schedules = rows.data?.schedules;
    const incomplete =
      typeof count === 'number' &&
      schedules !== undefined &&
      schedules.length !== count;

    const error =
      stats.error ??
      rows.error ??
      (incomplete
        ? new Error(
            `Vesting chart loaded ${schedules.length} of ${count} schedules`
          )
        : undefined);

    const loading =
      stats.loading ||
      (typeof count === 'number' && rows.loading && schedules === undefined);

    return {
      schedules: incomplete ? undefined : schedules,
      loading,
      error
    };
  },

  useGetAll: (
    config?: QueryHookOptions<
      VestingScheduleListResponse,
      PaginatedQueryVariables<VestingScheduleSorts>
    >
  ) =>
    useQuery<
      VestingScheduleListResponse,
      PaginatedQueryVariables<VestingScheduleSorts>
    >(GET_VESTING_SCHEDULES, {
      ...config,
      variables: {
        orderBy: config?.variables?.orderBy ?? { cliff: 'desc' },
        limit: config?.variables?.limit ?? QUERY_DEFAULT_LIMIT,
        offset: config?.variables?.offset ?? 0
      }
    })
};
