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
        leaderboardEntries: minerStats(
          limit: $limit
          offset: $offset
          orderBy: totalMinedBlocks_DESC
        ) {
          id
          totalMinedBlocks
          totalRewards
        }
        meta: minerStatsConnection(orderBy: id_ASC) {
          totalCount
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
