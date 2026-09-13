import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';

import type { Miner_Reward_Bool_Exp } from '@/__generated__/graphql';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import type { MinerRewardSorts } from '@/constants/query-sorts';
import type {
  MinerRewardListResponse,
  MinerRewardResponse,
  MinerRewardsStatsResponse
} from '@/schemas';
import type { PaginatedQueryVariables } from '@/types/query';
import { useGetRecentDateRange } from '@/utils/get-recent-date-range';
import {
  extractMinerId,
  isUnfilteredMinerRewards
} from '@/utils/miner-reward-filters';

// Field lists are written out per document (no template interpolation) so graphql-codegen
// can still extract typed documents for these queries.
const GET_MINER_REWARDS = gql`
  query GetMinerRewards(
    $limit: Int
    $offset: Int
    $orderBy: [miner_reward_order_by!]
    $where: miner_reward_bool_exp
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

/** Unfiltered list: total from O(1) chain_stats instead of a full-table count. */
const GET_MINER_REWARDS_WITH_CHAIN_TOTAL = gql`
  query GetMinerRewardsWithChainTotal(
    $limit: Int
    $offset: Int
    $orderBy: [miner_reward_order_by!]
    $where: miner_reward_bool_exp
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
    meta: chain_stats_by_pk(id: "global") {
      totalCount: total_miner_rewards
    }
  }
`;

/** Single-miner list: total from O(1) account_stats (one row per reward) instead of a filtered count. */
const GET_MINER_REWARDS_WITH_MINER_TOTAL = gql`
  query GetMinerRewardsWithMinerTotal(
    $limit: Int
    $offset: Int
    $orderBy: [miner_reward_order_by!]
    $where: miner_reward_bool_exp
    $minerId: String!
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
    meta: account_stats_by_pk(id: $minerId) {
      totalCount: total_mined_blocks
    }
  }
`;

type StatsTotalListResponse = {
  minerRewards: MinerRewardListResponse['minerRewards'];
  meta: { totalCount: number } | null;
};

function documentForListTotals(options: {
  useChainTotal: boolean;
  useMinerTotal: boolean;
}) {
  if (options.useChainTotal) {
    return GET_MINER_REWARDS_WITH_CHAIN_TOTAL;
  }
  if (options.useMinerTotal) {
    return GET_MINER_REWARDS_WITH_MINER_TOTAL;
  }
  return GET_MINER_REWARDS;
}

/** A missing stats row means nothing has been indexed for that scope yet, i.e. zero rewards. */
function normalizeListResponse(
  data: MinerRewardListResponse | StatsTotalListResponse | undefined
): MinerRewardListResponse | undefined {
  if (!data) return undefined;
  const meta = data.meta as
    | MinerRewardListResponse['meta']
    | StatsTotalListResponse['meta']
    | undefined;
  if (meta && 'aggregate' in meta) {
    return data as MinerRewardListResponse;
  }
  return {
    minerRewards: data.minerRewards,
    meta: { aggregate: { totalCount: meta?.totalCount ?? 0 } }
  };
}

export const minerRewards = {
  useGetAll: (
    config?: QueryHookOptions<
      MinerRewardListResponse,
      PaginatedQueryVariables<MinerRewardSorts, Miner_Reward_Bool_Exp> & {
        minerId?: string;
      }
    >
  ) => {
    const where = config?.variables?.where;
    const minerId = extractMinerId(where);
    const useChainTotal = isUnfilteredMinerRewards(where);
    const useMinerTotal = !useChainTotal && !!minerId;

    const document = documentForListTotals({ useChainTotal, useMinerTotal });

    const result = useQuery(document, {
      ...config,
      variables: {
        orderBy: config?.variables?.orderBy ?? { timestamp: 'desc' },
        limit: config?.variables?.limit ?? QUERY_DEFAULT_LIMIT,
        offset: config?.variables?.offset ?? 0,
        where,
        ...(useMinerTotal ? { minerId } : {})
      }
    });

    return {
      ...result,
      data: normalizeListResponse(
        result.data as
          | MinerRewardListResponse
          | StatsTotalListResponse
          | undefined
      )
    };
  },
  useGetStats: (
    config?: Omit<QueryHookOptions<MinerRewardsStatsResponse>, 'variables'>
  ) => {
    const { startDate, endDate } = useGetRecentDateRange();

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
        allTime: chain_stats_by_pk(id: "global") {
          total_miner_rewards
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
