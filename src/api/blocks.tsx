import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';

import type { BlockWhereInput } from '@/__generated__/graphql';
import fetchClient from '@/config/fetch-client';
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
import { getGqlString } from '@/utils/get-gql-string';

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
  getByHeight: () => {
    const QUERY_NAME = 'GetBlockByHeight';
    const QUERY = gql`
      query ${QUERY_NAME}($height: Int!) {
        blocks(where: { height_eq: $height }) {
            id
            hash
            height
            timestamp
        }
        transactions: transfersConnection(
          orderBy: timestamp_DESC
          first: ${QUERY_DEFAULT_LIMIT}
          where: {
            block: {
              height_eq: $height
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
      }
    `;

    return {
      query: (height: number) =>
        fetchClient.graphql<BlockResponse>(
          {
            query: getGqlString(QUERY),
            variables: {
              height
            },
            operationName: QUERY_NAME
          },
          {
            retries: 0
          }
        ),
      useQuery: (height: number, config?: QueryHookOptions<BlockResponse>) =>
        useQuery<BlockResponse>(QUERY, {
          ...config,
          variables: {
            height
          }
        })
    };
  }
};
