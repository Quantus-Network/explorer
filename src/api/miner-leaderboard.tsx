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
        leaderboardEntries: account_stats(
          limit: $limit
          offset: $offset
          order_by: { total_rewards: desc }
        ) {
          id
          total_mined_blocks
          total_rewards
        }
        meta: chain_stats_by_pk(id: "global") {
          totalCount: total_miner_rewards
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
