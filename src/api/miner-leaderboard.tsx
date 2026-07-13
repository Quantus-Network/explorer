import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';

import { MINER_LEADERBOARD_CHART_TOP_N } from '@/constants/miner-leaderboard-chart';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import type {
  MinerLeaderboardChartResponse,
  MinerLeaderboardResponse,
  MinerLeaderboardStatsResponse
} from '@/schemas';
import type { PaginatedQueryVariables } from '@/types/query';
import { useGetRecentDateRange } from '@/utils/get-recent-date-range';

export const minerLeaderboard = {
  useGetStats: (
    config?: Omit<QueryHookOptions<MinerLeaderboardStatsResponse>, 'variables'>
  ) => {
    const { startDate, endDate } = useGetRecentDateRange();

    const GET_MINER_LEADERBOARD_STATS = gql`
      query GetMinerLeaderboardStats(
        $startDate: timestamptz!
        $endDate: timestamptz!
      ) {
        chain: chain_stats_by_pk(id: "global") {
          block_height
          total_miners
        }
        last24Hour: miner_reward_aggregate(
          where: { timestamp: { _gte: $startDate, _lte: $endDate } }
        ) {
          aggregate {
            totalCount: count
          }
        }
      }
    `;

    return useQuery<MinerLeaderboardStatsResponse>(
      GET_MINER_LEADERBOARD_STATS,
      {
        ...config,
        variables: {
          startDate,
          endDate
        }
      }
    );
  },

  useGetChartData: (
    config?: QueryHookOptions<MinerLeaderboardChartResponse, { limit: number }>
  ) => {
    const GET_MINER_LEADERBOARD_CHART = gql`
      query GetMinerLeaderboardChart($limit: Int) {
        topMiners: account_stats(
          limit: $limit
          order_by: { total_mined_blocks: desc }
          where: { total_mined_blocks: { _gt: 0 } }
        ) {
          id
          total_mined_blocks
        }
        blocks: chain_stats_by_pk(id: "global") {
          totalCount: block_height
        }
      }
    `;

    return useQuery<MinerLeaderboardChartResponse, { limit: number }>(
      GET_MINER_LEADERBOARD_CHART,
      {
        ...config,
        variables: {
          limit: config?.variables?.limit ?? MINER_LEADERBOARD_CHART_TOP_N
        }
      }
    );
  },

  useGetAll: (
    config?: QueryHookOptions<MinerLeaderboardResponse, PaginatedQueryVariables>
  ) => {
    const GET_MINER_LEADERBOARD = gql`
      query GetMinerLeaderboard($limit: Int, $offset: Int) {
        leaderboardEntries: account_stats(
          limit: $limit
          offset: $offset
          order_by: { total_mined_blocks: desc }
          where: { total_mined_blocks: { _gt: 0 } }
        ) {
          id
          total_mined_blocks
          total_rewards
        }
        meta: chain_stats_by_pk(id: "global") {
          totalCount: total_miners
          block_height
        }
        topMiner: account_stats(
          limit: 1
          order_by: { total_mined_blocks: desc }
          where: { total_mined_blocks: { _gt: 0 } }
        ) {
          total_mined_blocks
        }
      }
    `;

    return useQuery<MinerLeaderboardResponse, PaginatedQueryVariables>(
      GET_MINER_LEADERBOARD,
      {
        ...config,
        variables: {
          limit: config?.variables?.limit ?? QUERY_DEFAULT_LIMIT,
          offset: config?.variables?.offset ?? 0
        }
      }
    );
  }
};
