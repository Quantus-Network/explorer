import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';

import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import type { MinerLeaderboardResponse } from '@/schemas';
import type { PaginatedQueryVariables } from '@/types/query';

export const minerLeaderboard = {
  useGetAll: (
    config?: QueryHookOptions<MinerLeaderboardResponse, PaginatedQueryVariables>
  ) => {
    const GET_MINER_LEADERBOARD = gql`
      query GetMinerLeaderboard($limit: Int, $offset: Int) {
        leaderboardEntries: chain_stats(
          limit: $limit
          offset: $offset
          order_by: { total_miner_rewards: desc }
        ) {
          id
          totalMinedBlocks: block_height
          totalRewards: total_miner_rewards
        }
        meta: chain_stats_aggregate {
          aggregate {
            totalCount: count
          }
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
