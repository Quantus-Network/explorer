import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';
import { endOfToday } from 'date-fns/endOfToday';
import { startOfToday } from 'date-fns/startOfToday';

import type { ReversibleTransferWhereInput } from '@/__generated__/graphql';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import { QUERY_RECENT_LIMIT } from '@/constants/query-recent-limit';
import type { ReversibleTransactionSorts } from '@/constants/query-sorts';
import { REVERSIBLE_TRANSACTION_SORTS } from '@/constants/query-sorts';
import type {
  RecentReversibleTransactionsResponse,
  ReversibleTransactionListResponse,
  ReversibleTransactionResponse,
  ReversibleTransactionsStatsResponse,
  ReversibleTransactionStatusResponse
} from '@/schemas';
import type { PaginatedQueryVariables } from '@/types/query';

export const reversibleTransactions = {
  useGetAll: (
    config?: QueryHookOptions<
      ReversibleTransactionListResponse,
      PaginatedQueryVariables<
        ReversibleTransactionSorts,
        ReversibleTransferWhereInput
      >
    >
  ) => {
    const GET_REVERSIBLE_TRANSACTIONS = gql`
      query GetReversibleTransactions(
        $limit: Int
        $offset: Int
        $orderBy: [ReversibleTransferOrderByInput!]
        $where: ReversibleTransferWhereInput
      ) {
        reversibleTransactions: reversibleTransfers(
          limit: $limit
          offset: $offset
          orderBy: $orderBy
          where: $where
        ) {
          extrinsicHash
          amount
          timestamp
          status
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
        meta: reversibleTransfersConnection(orderBy: id_ASC, where: $where) {
          totalCount
        }
      }
    `;

    return useQuery<
      ReversibleTransactionListResponse,
      PaginatedQueryVariables<
        ReversibleTransactionSorts,
        ReversibleTransferWhereInput
      >
    >(GET_REVERSIBLE_TRANSACTIONS, {
      ...config,
      variables: {
        orderBy:
          config?.variables?.orderBy ??
          REVERSIBLE_TRANSACTION_SORTS.timestamp.DESC,
        limit: config?.variables?.limit ?? QUERY_DEFAULT_LIMIT,
        offset: config?.variables?.offset ?? 0,
        where: config?.variables?.where
      }
    });
  },
  useGetRecent: (
    config?: Omit<
      QueryHookOptions<RecentReversibleTransactionsResponse>,
      'variables'
    >
  ) => {
    const GET_RECENT_REVERSIBLE_TRANSACTIONS = gql`
      query GetRecentReversibleTransactions(
        $limit: Int
        $offset: Int
        $orderBy: [ReversibleTransferOrderByInput!]
      ) {
        reversibleTransactions: reversibleTransfers(
          limit: $limit
          offset: $offset
          orderBy: $orderBy
        ) {
          extrinsicHash
          amount
          timestamp
          status
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
    `;

    return useQuery<
      RecentReversibleTransactionsResponse,
      PaginatedQueryVariables<ReversibleTransactionSorts>
    >(GET_RECENT_REVERSIBLE_TRANSACTIONS, {
      ...config,
      variables: {
        orderBy: REVERSIBLE_TRANSACTION_SORTS.timestamp.DESC,
        limit: QUERY_RECENT_LIMIT
      }
    });
  },
  useGetStats: (
    config?: Omit<
      QueryHookOptions<ReversibleTransactionsStatsResponse>,
      'variables'
    >
  ) => {
    const startDate = startOfToday().toISOString();
    const endDate = endOfToday().toISOString();

    const GET_REVERSIBLE_TRANSACTIONS_STATS = gql`
      query GetReversibleTransactionsStats(
        $startDate: DateTime!
        $endDate: DateTime!
      ) {
        last24Hour: reversibleTransfersConnection(
          orderBy: id_ASC
          where: { timestamp_gte: $startDate, timestamp_lte: $endDate }
        ) {
          totalCount
        }
        allTime: reversibleTransfersConnection(orderBy: id_ASC) {
          totalCount
        }
      }
    `;

    return useQuery<ReversibleTransactionsStatsResponse>(
      GET_REVERSIBLE_TRANSACTIONS_STATS,
      {
        ...config,
        variables: {
          startDate,
          endDate
        }
      }
    );
  },
  getByHash: () => {
    const QUERY_NAME = 'GetReversibleTransactionByHash';
    const QUERY = gql`
      query GetReversibleTransactionByHash($hash: String!) {
        reversibleTransactions: reversibleTransfers(
          where: { extrinsicHash_eq: $hash }
        ) {
          fee
          amount
          extrinsicHash
          txId
          scheduledAt
          timestamp
          status
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
    `;

    return {
      useQuery: (
        hash: string,
        config?: QueryHookOptions<ReversibleTransactionResponse>
      ) =>
        useQuery<ReversibleTransactionResponse>(QUERY, {
          ...config,
          variables: {
            hash
          }
        })
    };
  },
  getStatusByHash: () => {
    const QUERY = gql`
      query GetReversibleTransactionStatusByHash($hash: String!) {
        reversibleTransactions: reversibleTransfers(
          where: { extrinsicHash_eq: $hash }
        ) {
          status
        }
      }
    `;

    return {
      useQuery: (
        hash: string,
        config?: QueryHookOptions<ReversibleTransactionStatusResponse>
      ) =>
        useQuery<ReversibleTransactionStatusResponse>(QUERY, {
          ...config,
          variables: {
            hash
          }
        })
    };
  }
};
