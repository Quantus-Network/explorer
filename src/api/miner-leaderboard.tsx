import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';

import { MINER_LEADERBOARD_CHART_TOP_N } from '@/constants/miner-leaderboard-chart';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import type {
  MinerLeaderboardChartResponse,
  MinerLeaderboardResponse
} from '@/schemas';
import type { PaginatedQueryVariables } from '@/types/query';

export const minerLeaderboard = {
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
          order_by: { total_rewards: desc }
          where: { total_mined_blocks: { _gt: 0 } }
        ) {
          id
          total_mined_blocks
          total_rewards
        }
        meta: chain_stats_by_pk(id: "global") {
          totalCount: total_miners
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
