import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';
import { endOfToday } from 'date-fns/endOfToday';
import { startOfToday } from 'date-fns/startOfToday';

import type { TransferWhereInput } from '@/__generated__/graphql';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import { QUERY_RECENT_LIMIT } from '@/constants/query-recent-limit';
import type { TransactionSorts } from '@/constants/query-sorts';
import { TRANSACTION_SORTS } from '@/constants/query-sorts';
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
      PaginatedQueryVariables<TransactionSorts, TransferWhereInput>
    >
  ) => {
    const GET_TRANSACTIONS = gql`
      query GetTransactions(
        $limit: Int
        $offset: Int
        $orderBy: [TransferOrderByInput!]
        $where: TransferWhereInput
      ) {
        transactions: transfers(
          limit: $limit
          offset: $offset
          orderBy: $orderBy
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
        meta: transfersConnection(orderBy: id_ASC, where: $where) {
          totalCount
        }
      }
    `;

    return useQuery<
      TransactionListResponse,
      PaginatedQueryVariables<TransactionSorts, TransferWhereInput>
    >(GET_TRANSACTIONS, {
      ...config,
      variables: {
        orderBy: config?.variables?.orderBy ?? TRANSACTION_SORTS.timestamp.DESC,
        limit: config?.variables?.limit ?? QUERY_DEFAULT_LIMIT,
        offset: config?.variables?.offset ?? 0,
        where: {
          AND: [{ extrinsic_isNull: false }, { ...config?.variables?.where }]
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
        $orderBy: [TransferOrderByInput!]
        $where: TransferWhereInput
      ) {
        transactions: transfers(
          limit: $limit
          offset: $offset
          orderBy: $orderBy
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
      PaginatedQueryVariables<TransactionSorts, TransferWhereInput>
    >(GET_RECENT_TRANSACTIONS, {
      ...config,
      variables: {
        orderBy: TRANSACTION_SORTS.timestamp.DESC,
        limit: QUERY_RECENT_LIMIT,
        where: { extrinsic_isNull: false }
      }
    });
  },
  useGetStats: (
    config?: Omit<QueryHookOptions<TransactionsStatsResponse>, 'variables'>
  ) => {
    const startDate = startOfToday().toISOString();
    const endDate = endOfToday().toISOString();

    const GET_TRANSACTIONS_STATS = gql`
      query GetTransactionsStats($startDate: DateTime!, $endDate: DateTime!) {
        last24Hour: transfersConnection(
          orderBy: id_ASC
          where: {
            timestamp_gte: $startDate
            timestamp_lte: $endDate
            extrinsic_isNull: false
          }
        ) {
          totalCount
        }
        allTime: transfersConnection(
          orderBy: id_ASC
          where: { extrinsic_isNull: false }
        ) {
          totalCount
        }
        allTime: transfersConnection(
          orderBy: id_ASC
          where: { extrinsic_isNull: false }
        ) {
          totalCount
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
        extrinsics(where: { id_eq: $hash }) {
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
          block {
            height
          }
        }
        transfers(
          where: { extrinsic: { id_eq: $hash } }
          orderBy: timestamp_ASC
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
