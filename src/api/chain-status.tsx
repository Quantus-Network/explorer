import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';
import { useMemo } from 'react';

import type {
  ChainStatusResponse,
  HomeChainStatsResponse,
  HomeChainStatsVariables
} from '@/schemas';
import { HOME_STATS_DAY_COUNT } from '@/utils/get-home-stats-day-windows';
import { useGetRecentDateRange } from '@/utils/get-recent-date-range';
import { withExcludedRewardTransfers } from '@/utils/unified-transaction-filters';

const GET_HOME_STATS = gql`
  query GetHomeChainStats(
    $last24HourWhere: unified_transaction_bool_exp!
    $dayLimit: Int!
  ) {
    status: chain_stats_by_pk(id: "global") {
      block_height
      total_accounts
      total_deposit_accounts
      total_immediate_transfers
      total_scheduled_transfers
      total_executed_transfers
      total_cancelled_transfers
    }
    last24Hour: unified_transaction_aggregate(where: $last24HourWhere) {
      aggregate {
        count
      }
    }
    dailyStats: daily_chain_stats(order_by: { date: desc }, limit: $dayLimit) {
      id
      date
      blocks_count
      tx_count
      active_accounts
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

    const variables = useMemo(
      (): HomeChainStatsVariables => ({
        last24HourWhere: withExcludedRewardTransfers({
          timestamp: { _gte: startDate, _lte: endDate }
        }),
        dayLimit: HOME_STATS_DAY_COUNT
      }),
      [endDate, startDate]
    );

    return useQuery<HomeChainStatsResponse, HomeChainStatsVariables>(
      GET_HOME_STATS,
      {
        ...config,
        variables
      }
    );
  }
};
