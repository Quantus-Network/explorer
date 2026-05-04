import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';
import { endOfToday } from 'date-fns/endOfToday';
import { startOfToday } from 'date-fns/startOfToday';

import type { Miner_Reward_Bool_Exp } from '@/__generated__/graphql';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import { QUERY_RECENT_LIMIT } from '@/constants/query-recent-limit';
import type { MinerRewardSorts } from '@/constants/query-sorts';
import type {
  MinerRewardListResponse,
  MinerRewardResponse,
  MinerRewardsStatsResponse,
  RecentMinerRewardsResponse
} from '@/schemas';
import type { PaginatedQueryVariables } from '@/types/query';

export const minerRewards = {
  useGetAll: (
    config?: QueryHookOptions<
      MinerRewardListResponse,
      PaginatedQueryVariables<MinerRewardSorts, Miner_Reward_Bool_Exp>
    >
  ) => {
    const GET_MINER_REWARDS = gql`
      query GetMinerRewards(
        $limit: Int
        $offset: Int
        $orderBy: [miner_reward_order_by!]
        $where: Miner_Reward_Bool_Exp
      ) {
        minerRewards: miner_reward(
          limit: $limit
          offset: $offset
          order_by: $orderBy
          where: $where
        ) {
          block {
            height
            hash
          }
          reward
          miner {
            id
          }
          timestamp
        }
        meta: miner_reward_aggregate(where: $where) {
          aggregate {
            totalCount: count
          }
        }
      }
    `;

    return useQuery<
      MinerRewardListResponse,
      PaginatedQueryVariables<MinerRewardSorts, Miner_Reward_Bool_Exp>
    >(GET_MINER_REWARDS, {
      ...config,
      variables: {
        orderBy: config?.variables?.orderBy ?? { timestamp: 'desc' },
        limit: config?.variables?.limit ?? QUERY_DEFAULT_LIMIT,
        offset: config?.variables?.offset ?? 0,
        where: config?.variables?.where
      }
    });
  },
  useGetRecent: (
    config?: Omit<QueryHookOptions<RecentMinerRewardsResponse>, 'variables'>
  ) => {
    const GET_RECENT_MINER_REWARDS = gql`
      query GetRecentMinerRewards(
        $limit: Int
        $offset: Int
        $orderBy: [miner_reward_order_by!]
        $where: Miner_Reward_Bool_Exp
      ) {
        minerRewards: miner_reward(
          limit: $limit
          offset: $offset
          order_by: $orderBy
          where: $where
        ) {
          block {
            height
            hash
          }
          reward
          miner {
            id
          }
          timestamp
        }
      }
    `;

    return useQuery<
      RecentMinerRewardsResponse,
      PaginatedQueryVariables<MinerRewardSorts, Miner_Reward_Bool_Exp>
    >(GET_RECENT_MINER_REWARDS, {
      ...config,
      variables: {
        orderBy: { timestamp: 'desc' },
        limit: QUERY_RECENT_LIMIT
      }
    });
  },
  useGetStats: (
    config?: Omit<QueryHookOptions<MinerRewardsStatsResponse>, 'variables'>
  ) => {
    const startDate = startOfToday().toISOString();
    const endDate = endOfToday().toISOString();

    const GET_MINER_REWARDS_STATS = gql`
      query GetMinerRewardsStats(
        $startDate: timestamptz!
        $endDate: timestamptz!
      ) {
        last24Hour: miner_reward_aggregate(
          where: { timestamp: { _gte: $startDate, _lte: $endDate } }
        ) {
          aggregate {
            totalCount: count
          }
        }
        allTime: chain_stats {
          totalCount: total_miner_rewards
        }
      }
    `;

    return useQuery<MinerRewardsStatsResponse>(GET_MINER_REWARDS_STATS, {
      ...config,
      variables: {
        startDate,
        endDate
      }
    });
  },
  getByHash: () => {
    const QUERY = gql`
      query GetMinerRewardByHash($hash: String!) {
        minerRewards: miner_reward(where: { block: { hash: { _eq: $hash } } }) {
          block {
            height
            hash
          }
          reward
          miner {
            id
          }
          timestamp
        }
      }
    `;

    return {
      useQuery: (
        hash: string,
        config?: QueryHookOptions<MinerRewardResponse>
      ) =>
        useQuery<MinerRewardResponse>(QUERY, {
          ...config,
          variables: {
            hash
          }
        })
    };
  }
};
