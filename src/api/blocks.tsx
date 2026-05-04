import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';
import { endOfToday } from 'date-fns/endOfToday';
import { startOfToday } from 'date-fns/startOfToday';

import type { Block_Bool_Exp } from '@/__generated__/graphql';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import { QUERY_RECENT_LIMIT } from '@/constants/query-recent-limit';
import type { BlockSorts } from '@/constants/query-sorts';
import type {
  BlockListResponse,
  BlockResponse,
  BlockStatsResponse,
  RecentBlocksResponse
} from '@/schemas';
import type { PaginatedQueryVariables } from '@/types/query';

export const blocks = {
  useGetAll: (
    config?: QueryHookOptions<
      BlockListResponse,
      PaginatedQueryVariables<BlockSorts, Block_Bool_Exp>
    >
  ) => {
    const GET_BLOCKS = gql`
      query GetBlocks(
        $limit: Int
        $offset: Int
        $orderBy: [block_order_by!]!
        $where: block_bool_exp
      ) {
        blocks: block(
          limit: $limit
          offset: $offset
          order_by: $orderBy
          where: $where
        ) {
          id
          hash
          height
          reward
          timestamp
          extrinsics {
            id
          }
        }
        meta: chain_stats_by_pk(id: "global") {
          totalCount: block_height
        }
      }
    `;

    return useQuery<
      BlockListResponse,
      PaginatedQueryVariables<BlockSorts, Block_Bool_Exp>
    >(GET_BLOCKS, {
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
    config?: Omit<QueryHookOptions<RecentBlocksResponse>, 'variables'>
  ) => {
    const GET_RECENT_BLOCKS = gql`
      query GetRecentBlocks(
        $limit: Int
        $offset: Int
        $orderBy: [block_order_by!]
      ) {
        blocks: block(limit: $limit, offset: $offset, order_by: $orderBy) {
          id
          hash
          height
          reward
          timestamp
          extrinsics {
            id
          }
        }
      }
    `;

    return useQuery<RecentBlocksResponse, PaginatedQueryVariables<BlockSorts>>(
      GET_RECENT_BLOCKS,
      {
        ...config,
        variables: {
          orderBy: { timestamp: 'desc' },
          limit: QUERY_RECENT_LIMIT
        }
      }
    );
  },
  getById: () => {
    const QUERY = gql`
      query GetBlockById($height: Int!, $hash: String!) {
        blocks: block(
          where: {
            _or: [{ height: { _eq: $height } }, { hash: { _eq: $hash } }]
          }
        ) {
          id
          hash
          height
          reward
          timestamp
          extrinsics(order_by: { index_in_block: asc }) {
            id
            pallet
            call
            success
            fee
            timestamp
            index_in_block: index_in_block
            signer {
              id
            }
          }
        }
        minerRewards: miner_reward(
          where: {
            block: {
              _or: [{ height: { _eq: $height } }, { hash: { _eq: $hash } }]
            }
          }
        ) {
          reward
          timestamp
          miner {
            id
          }
          block {
            height
            hash
          }
        }
      }
    `;

    return {
      useQuery: (id: string, config?: QueryHookOptions<BlockResponse>) => {
        const isHash = id.startsWith('0x');

        return useQuery<BlockResponse>(QUERY, {
          ...config,
          variables: {
            height: !isHash ? Number(id) : -1,
            hash: isHash ? id : ''
          }
        });
      }
    };
  },
  getStats: () => {
    const startDate = startOfToday().toISOString();
    const endDate = endOfToday().toISOString();

    const QUERY = gql`
      query GetBlockStats($startDate: timestamptz!, $endDate: timestamptz!) {
        chain: chain_stats_by_pk(id: "global") {
          block_height
          finalized_block_height
        }
        minedIn24Hours: block_aggregate(
          where: { timestamp: { _gte: $startDate, _lte: $endDate } }
        ) {
          aggregate {
            totalCount: count
          }
        }
      }
    `;

    return {
      useQuery: (config?: QueryHookOptions<BlockStatsResponse>) => {
        return useQuery<BlockStatsResponse>(QUERY, {
          ...config,
          variables: {
            startDate,
            endDate
          }
        });
      }
    };
  }
};
