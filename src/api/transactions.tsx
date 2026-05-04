import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';
import { endOfToday } from 'date-fns/endOfToday';
import { startOfToday } from 'date-fns/startOfToday';

import type { Transfer_Bool_Exp } from '@/__generated__/graphql';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import { QUERY_RECENT_LIMIT } from '@/constants/query-recent-limit';
import type { TransactionSorts } from '@/constants/query-sorts';
import type {
  ExtrinsicDetailResponse,
  RecentTransactionsResponse,
  TransactionListResponse,
  TransactionsStatsResponse
} from '@/schemas';
import type { PaginatedQueryVariables } from '@/types/query';

export const transactions = {
  useGetAll: (
    config?: QueryHookOptions<
      TransactionListResponse,
      PaginatedQueryVariables<TransactionSorts, Transfer_Bool_Exp>
    >
  ) => {
    const GET_TRANSACTIONS = gql`
      query GetTransactions(
        $limit: Int
        $offset: Int
        $orderBy: [transfer_order_by!]
        $where: Transfer_Bool_Exp
      ) {
        transactions: transfer(
          limit: $limit
          offset: $offset
          order_by: $orderBy
          where: $where
        ) {
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
        meta: transfer_aggregate(where: $where) {
          aggregate {
            totalCount: count
          }
        }
      }
    `;

    return useQuery<
      TransactionListResponse,
      PaginatedQueryVariables<TransactionSorts, Transfer_Bool_Exp>
    >(GET_TRANSACTIONS, {
      ...config,
      variables: {
        orderBy: config?.variables?.orderBy ?? { timestamp: 'desc' },
        limit: config?.variables?.limit ?? QUERY_DEFAULT_LIMIT,
        offset: config?.variables?.offset ?? 0,
        where: {
          _and: [
            { extrinsic_id: { _is_null: false } },
            { ...config?.variables?.where }
          ]
        }
      }
    });
  },
  useGetRecent: (
    config?: Omit<QueryHookOptions<RecentTransactionsResponse>, 'variables'>
  ) => {
    const GET_RECENT_TRANSACTIONS = gql`
      query GetRecentTransactions(
        $limit: Int
        $offset: Int
        $orderBy: [transfer_order_by!]
        $where: Transfer_Bool_Exp
      ) {
        transactions: transfer(
          limit: $limit
          offset: $offset
          order_by: $orderBy
          where: $where
        ) {
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
    `;

    return useQuery<
      RecentTransactionsResponse,
      PaginatedQueryVariables<TransactionSorts, Transfer_Bool_Exp>
    >(GET_RECENT_TRANSACTIONS, {
      ...config,
      variables: {
        orderBy: { timestamp: 'desc' },
        limit: QUERY_RECENT_LIMIT,
        where: { extrinsic_id: { _is_null: false } }
      }
    });
  },
  useGetStats: (
    config?: Omit<QueryHookOptions<TransactionsStatsResponse>, 'variables'>
  ) => {
    const startDate = startOfToday().toISOString();
    const endDate = endOfToday().toISOString();

    const GET_TRANSACTIONS_STATS = gql`
      query GetTransactionsStats(
        $startDate: timestamptz!
        $endDate: timestamptz!
      ) {
        last24Hour: transfer_aggregate(
          where: {
            timestamp: { _gte: $startDate, _lte: $endDate }
            extrinsic_id: { _is_null: false }
          }
        ) {
          aggregate {
            totalCount: count
          }
        }
        allTime: chain_stats {
          totalCount: total_immediate_transfers
        }
      }
    `;

    return useQuery<TransactionsStatsResponse>(GET_TRANSACTIONS_STATS, {
      ...config,
      variables: {
        startDate,
        endDate
      }
    });
  },
  getByHash: () => {
    const QUERY = gql`
      query GetExtrinsicByHash($hash: String!) {
        extrinsics: extrinsic(where: { id: { _eq: $hash } }) {
          id
          pallet
          call
          success
          fee
          timestamp
          index_in_block
          signer {
            id
          }
          block {
            height
          }
        }
        transfers: transfer(
          where: { extrinsic: { id: { _eq: $hash } } }
          order_by: { timestamp: asc }
        ) {
          id
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
    `;

    return {
      useQuery: (
        hash: string,
        config?: QueryHookOptions<ExtrinsicDetailResponse>
      ) =>
        useQuery<ExtrinsicDetailResponse>(QUERY, {
          ...config,
          variables: {
            hash
          }
        })
    };
  }
};
