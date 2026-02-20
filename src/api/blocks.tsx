import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';

import type { BlockWhereInput } from '@/__generated__/graphql';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import { QUERY_RECENT_LIMIT } from '@/constants/query-recent-limit';
import { QUERY_UNIFIED_LIMIT } from '@/constants/query-unified-limit';
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
          extrinsics {
            id
          }
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
          extrinsics(orderBy: indexInBlock_ASC) {
            id
            pallet
            call
            success
            fee
            timestamp
            indexInBlock
            signer {
              id
            }
          }
        }
        minerRewards(
          where: {
            block: { height_eq: $height }
            OR: { block: { hash_eq: $hash } }
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
        transactions: transfersConnection(
          orderBy: timestamp_DESC
          first: $limit
          where: {
            extrinsic_isNull: false
            AND: {
              block: { height_eq: $height }
              OR: { block: { hash_eq: $hash } }
            }
          }
        ) {
          edges {
            node {
              fee
              extrinsic {
                id
                pallet
                call
              }
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
              extrinsic {
                id
                pallet
                call
              }
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
        highSecuritySets: highSecuritySetsConnection(
          orderBy: timestamp_DESC
          first: $limit
          where: {
            block: { height_eq: $height }
            OR: { block: { hash_eq: $hash } }
          }
        ) {
          edges {
            node {
              extrinsic {
                id
                pallet
                call
              }
              timestamp
              delay
              block {
                height
              }
              who {
                id
              }
              interceptor {
                id
              }
            }
          }

          totalCount
        }
        errorEvents: errorEventsConnection(
          orderBy: timestamp_DESC
          first: $limit
          where: {
            block: { height_eq: $height }
            OR: { block: { hash_eq: $hash } }
          }
        ) {
          edges {
            node {
              errorDocs
              errorModule
              errorName
              errorType
              extrinsic {
                id
                pallet
                call
              }
              timestamp
              block {
                height
              }
            }
          }

          totalCount
        }
        wormholeExtrinsics(
          orderBy: timestamp_DESC
          limit: $limit
          where: {
            block: { height_eq: $height }
            OR: { block: { hash_eq: $hash } }
          }
        ) {
          id
          extrinsic {
            id
            pallet
            call
          }
          totalAmount
          outputCount
          timestamp
          block {
            height
          }
          outputs {
            id
            exitAccount {
              id
            }
            amount
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
            hash: isHash ? id : '',
            limit: QUERY_UNIFIED_LIMIT
          }
        });
      }
    };
  }
};
