import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';
import { useMemo } from 'react';

import type {
  ChainStatusResponse,
  HomeChainStatsResponse,
  HomeChainStatsVariables
} from '@/schemas';
import {
  HOME_STATS_DAY_COUNT,
  useHomeStatsDayWindows
} from '@/utils/get-home-stats-day-windows';
import { useGetRecentDateRange } from '@/utils/get-recent-date-range';

const GET_HOME_STATS = gql`
  query GetHomeChainStats(
    $startDate: timestamptz!
    $endDate: timestamptz!
    $day0Start: timestamptz!
    $day0End: timestamptz!
    $day1Start: timestamptz!
    $day1End: timestamptz!
    $day2Start: timestamptz!
    $day2End: timestamptz!
    $day3Start: timestamptz!
    $day3End: timestamptz!
    $day4Start: timestamptz!
    $day4End: timestamptz!
    $day5Start: timestamptz!
    $day5End: timestamptz!
    $day6Start: timestamptz!
    $day6End: timestamptz!
  ) {
    status: chain_stats_by_pk(id: "global") {
      block_height
      total_accounts
      total_deposit_accounts
      total_executed_transfers
      total_immediate_transfers
      total_scheduled_transfers
      total_cancelled_transfers
    }
    last24Hour: transfer_aggregate(
      where: {
        timestamp: { _gte: $startDate, _lte: $endDate }
        extrinsic_id: { _is_null: false }
      }
    ) {
      aggregate {
        count
      }
    }
    blocksDay0: block_aggregate(
      where: { timestamp: { _gte: $day0Start, _lte: $day0End } }
    ) {
      aggregate {
        count
      }
    }
    transfersDay0: transfer_aggregate(
      where: {
        timestamp: { _gte: $day0Start, _lte: $day0End }
        extrinsic_id: { _is_null: false }
      }
    ) {
      aggregate {
        count
      }
    }
    activeAccountsDay0: transfer_aggregate(
      where: {
        timestamp: { _gte: $day0Start, _lte: $day0End }
        from_id: { _is_null: false }
      }
    ) {
      aggregate {
        count(columns: [from_id], distinct: true)
      }
    }
    blocksDay1: block_aggregate(
      where: { timestamp: { _gte: $day1Start, _lte: $day1End } }
    ) {
      aggregate {
        count
      }
    }
    transfersDay1: transfer_aggregate(
      where: {
        timestamp: { _gte: $day1Start, _lte: $day1End }
        extrinsic_id: { _is_null: false }
      }
    ) {
      aggregate {
        count
      }
    }
    activeAccountsDay1: transfer_aggregate(
      where: {
        timestamp: { _gte: $day1Start, _lte: $day1End }
        from_id: { _is_null: false }
      }
    ) {
      aggregate {
        count(columns: [from_id], distinct: true)
      }
    }
    blocksDay2: block_aggregate(
      where: { timestamp: { _gte: $day2Start, _lte: $day2End } }
    ) {
      aggregate {
        count
      }
    }
    transfersDay2: transfer_aggregate(
      where: {
        timestamp: { _gte: $day2Start, _lte: $day2End }
        extrinsic_id: { _is_null: false }
      }
    ) {
      aggregate {
        count
      }
    }
    activeAccountsDay2: transfer_aggregate(
      where: {
        timestamp: { _gte: $day2Start, _lte: $day2End }
        from_id: { _is_null: false }
      }
    ) {
      aggregate {
        count(columns: [from_id], distinct: true)
      }
    }
    blocksDay3: block_aggregate(
      where: { timestamp: { _gte: $day3Start, _lte: $day3End } }
    ) {
      aggregate {
        count
      }
    }
    transfersDay3: transfer_aggregate(
      where: {
        timestamp: { _gte: $day3Start, _lte: $day3End }
        extrinsic_id: { _is_null: false }
      }
    ) {
      aggregate {
        count
      }
    }
    activeAccountsDay3: transfer_aggregate(
      where: {
        timestamp: { _gte: $day3Start, _lte: $day3End }
        from_id: { _is_null: false }
      }
    ) {
      aggregate {
        count(columns: [from_id], distinct: true)
      }
    }
    blocksDay4: block_aggregate(
      where: { timestamp: { _gte: $day4Start, _lte: $day4End } }
    ) {
      aggregate {
        count
      }
    }
    transfersDay4: transfer_aggregate(
      where: {
        timestamp: { _gte: $day4Start, _lte: $day4End }
        extrinsic_id: { _is_null: false }
      }
    ) {
      aggregate {
        count
      }
    }
    activeAccountsDay4: transfer_aggregate(
      where: {
        timestamp: { _gte: $day4Start, _lte: $day4End }
        from_id: { _is_null: false }
      }
    ) {
      aggregate {
        count(columns: [from_id], distinct: true)
      }
    }
    blocksDay5: block_aggregate(
      where: { timestamp: { _gte: $day5Start, _lte: $day5End } }
    ) {
      aggregate {
        count
      }
    }
    transfersDay5: transfer_aggregate(
      where: {
        timestamp: { _gte: $day5Start, _lte: $day5End }
        extrinsic_id: { _is_null: false }
      }
    ) {
      aggregate {
        count
      }
    }
    activeAccountsDay5: transfer_aggregate(
      where: {
        timestamp: { _gte: $day5Start, _lte: $day5End }
        from_id: { _is_null: false }
      }
    ) {
      aggregate {
        count(columns: [from_id], distinct: true)
      }
    }
    blocksDay6: block_aggregate(
      where: { timestamp: { _gte: $day6Start, _lte: $day6End } }
    ) {
      aggregate {
        count
      }
    }
    transfersDay6: transfer_aggregate(
      where: {
        timestamp: { _gte: $day6Start, _lte: $day6End }
        extrinsic_id: { _is_null: false }
      }
    ) {
      aggregate {
        count
      }
    }
    activeAccountsDay6: transfer_aggregate(
      where: {
        timestamp: { _gte: $day6Start, _lte: $day6End }
        from_id: { _is_null: false }
      }
    ) {
      aggregate {
        count(columns: [from_id], distinct: true)
      }
    }
  }
`;

export const chainStatus = {
  useGetStatus: (config?: QueryHookOptions) => {
    const GET_STATUS = gql`
      query GetStatus {
        status: chain_stats_by_pk(id: "global") {
          block_height
          total_accounts
          total_deposit_accounts
          total_executed_transfers
          total_immediate_transfers
          total_scheduled_transfers
          total_cancelled_transfers
        }
      }
    `;

    return useQuery<ChainStatusResponse>(GET_STATUS, {
      ...config
    });
  },

  useGetHomeStats: (
    config?: Omit<
      QueryHookOptions<HomeChainStatsResponse, HomeChainStatsVariables>,
      'variables'
    >
  ) => {
    const { startDate, endDate } = useGetRecentDateRange();
    const dayWindows = useHomeStatsDayWindows();

    const variables = useMemo((): HomeChainStatsVariables => {
      const [day0, day1, day2, day3, day4, day5, day6] = dayWindows;

      if (
        dayWindows.length !== HOME_STATS_DAY_COUNT ||
        !day0 ||
        !day1 ||
        !day2 ||
        !day3 ||
        !day4 ||
        !day5 ||
        !day6
      ) {
        throw new Error('Expected 7 day windows for home stats');
      }

      return {
        startDate,
        endDate,
        day0Start: day0.start,
        day0End: day0.end,
        day1Start: day1.start,
        day1End: day1.end,
        day2Start: day2.start,
        day2End: day2.end,
        day3Start: day3.start,
        day3End: day3.end,
        day4Start: day4.start,
        day4End: day4.end,
        day5Start: day5.start,
        day5End: day5.end,
        day6Start: day6.start,
        day6End: day6.end
      };
    }, [dayWindows, endDate, startDate]);

    return useQuery<HomeChainStatsResponse, HomeChainStatsVariables>(
      GET_HOME_STATS,
      {
        ...config,
        variables
      }
    );
  }
};
