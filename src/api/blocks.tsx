import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';

import type { BlockWhereInput } from '@/__generated__/graphql';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import { QUERY_RECENT_LIMIT } from '@/constants/query-recent-limit';
import type { BlockSorts } from '@/constants/query-sorts';
import { BLOCK_SORTS } from '@/constants/query-sorts';
import type {
  BlockListResponse,
  BlockResponse,
  RecentBlocksResponse
} from '@/schemas';
import type { PaginatedQueryVariables } from '@/types/query';

export const blocks = {
  useGetAll: (
    config?: QueryHookOptions<
      BlockListResponse,
      PaginatedQueryVariables<BlockSorts, BlockWhereInput>
    >
  ) => {
    const GET_BLOCKS = gql`
      query GetBlocks(
        $limit: Int
        $offset: Int
        $orderBy: [BlockOrderByInput!]!
        $where: BlockWhereInput
      ) {
        blocks(
          limit: $limit
          offset: $offset
          orderBy: $orderBy
          where: $where
        ) {
          id
          hash
          height
          reward
          timestamp
        }
        meta: blocksConnection(orderBy: id_ASC) {
          totalCount
        }
      }
    `;

    return useQuery<
      BlockListResponse,
      PaginatedQueryVariables<BlockSorts, BlockWhereInput>
    >(GET_BLOCKS, {
      ...config,
      variables: {
        orderBy: config?.variables?.orderBy ?? BLOCK_SORTS.timestamp.DESC,
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
        $orderBy: [BlockOrderByInput!]
      ) {
        blocks(limit: $limit, offset: $offset, orderBy: $orderBy) {
          id
          hash
          height
          reward
          timestamp
        }
      }
    `;

    return useQuery<RecentBlocksResponse, PaginatedQueryVariables<BlockSorts>>(
      GET_RECENT_BLOCKS,
      {
        ...config,
        variables: {
          orderBy: BLOCK_SORTS.timestamp.DESC,
          limit: QUERY_RECENT_LIMIT
        }
      }
    );
  },
  getById: () => {
    const QUERY = gql`
      query GetBlockById($height: Int!, $hash: String!, $limit: Int!) {
        blocks(where: { height_eq: $height, OR: { hash_eq: $hash } }) {
          id
          hash
          height
          reward
          timestamp
        }
        miners: minerRewards(
          where: {
            block: { height_eq: $height }
            OR: { block: { hash_eq: $hash } }
          }
        ) {
          miner {
            id
          }
        }
        transactions: transfersConnection(
          orderBy: timestamp_DESC
          first: $limit
          where: {
            extrinsicHash_isNull: false
            AND: {
              block: { height_eq: $height }
              OR: { block: { hash_eq: $hash } }
            }
          }
        ) {
          edges {
            node {
              fee
              extrinsicHash
              block {
                height
              }
              amount
              timestamp
              from {
                id
              }
              to {
                id
              }
            }
          }

          totalCount
        }
        reversibleTransactions: reversibleTransfersConnection(
          orderBy: timestamp_DESC
          first: $limit
          where: {
            block: { height_eq: $height }
            OR: { block: { hash_eq: $hash } }
          }
        ) {
          edges {
            node {
              extrinsicHash
              timestamp
              status
              amount
              block {
                height
              }
              from {
                id
              }
              to {
                id
              }
            }
          }

          totalCount
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
            hash: isHash ? id : '',
            limit: QUERY_DEFAULT_LIMIT
          }
        });
      }
    };
  }
};
