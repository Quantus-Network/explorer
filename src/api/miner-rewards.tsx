import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';
import { endOfToday } from 'date-fns/endOfToday';
import { startOfToday } from 'date-fns/startOfToday';

import type { MinerRewardWhereInput } from '@/__generated__/graphql';
import fetchClient from '@/config/fetch-client';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import { QUERY_RECENT_LIMIT } from '@/constants/query-recent-limit';
import type { MinerRewardSorts } from '@/constants/query-sorts';
import { TRANSACTION_SORTS } from '@/constants/query-sorts';
import type {
  MinerRewardListResponse,
  MinerRewardResponse,
  MinerRewardsStatsResponse,
  RecentMinerRewardsResponse
} from '@/schemas';
import type { PaginatedQueryVariables } from '@/types/query';
import { getGqlString } from '@/utils/get-gql-string';

export const minerRewards = {
  useGetAll: (
    config?: QueryHookOptions<
      MinerRewardListResponse,
      PaginatedQueryVariables<MinerRewardSorts, MinerRewardWhereInput>
    >
  ) => {
    const GET_MINER_REWARDS = gql`
      query GetMinerRewards(
        $limit: Int
        $offset: Int
        $orderBy: [MinerRewardOrderByInput!]
        $where: MinerRewardWhereInput
      ) {
        minerRewards(
          limit: $limit
          offset: $offset
          orderBy: $orderBy
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
        meta: minerRewardsConnection(orderBy: id_ASC, where: $where) {
          totalCount
        }
      }
    `;

    return useQuery<
      MinerRewardListResponse,
      PaginatedQueryVariables<MinerRewardSorts, MinerRewardWhereInput>
    >(GET_MINER_REWARDS, {
      ...config,
      variables: {
        orderBy: config?.variables?.orderBy ?? TRANSACTION_SORTS.timestamp.DESC,
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
        $orderBy: [MinerRewardOrderByInput!]
        $where: MinerRewardWhereInput
      ) {
        minerRewards(
          limit: $limit
          offset: $offset
          orderBy: $orderBy
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
      PaginatedQueryVariables<MinerRewardSorts, MinerRewardWhereInput>
    >(GET_RECENT_MINER_REWARDS, {
      ...config,
      variables: {
        orderBy: TRANSACTION_SORTS.timestamp.DESC,
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
      query GetMinerRewardsStats($startDate: DateTime!, $endDate: DateTime!) {
        last24Hour: minerRewardsConnection(
          orderBy: id_ASC
          where: { timestamp_gte: $startDate, timestamp_lte: $endDate }
        ) {
          totalCount
        }
        allTime: minerRewardsConnection(orderBy: id_ASC) {
          totalCount
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
    const QUERY_NAME = 'GetMinerRewardByHash';
    const QUERY = gql`
      query GetMinerRewardByHash($hash: String!) {
        minerRewards(where: { block: { hash_eq: $hash } }) {
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
      query: (hash: string) =>
        fetchClient.graphql<MinerRewardResponse>(
          {
            query: getGqlString(QUERY),
            variables: {
              hash
            },
            operationName: QUERY_NAME
          },
          {
            retries: 0
          }
        ),
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
