import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';

import type { ScheduledReversibleTransferWhereInput } from '@/__generated__/graphql';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import { QUERY_RECENT_LIMIT } from '@/constants/query-recent-limit';
import type { ScheduledReversibleTransactionSorts } from '@/constants/query-sorts';
import { SCHEDULED_REVERSIBLE_TRANSACTION_SORTS } from '@/constants/query-sorts';
import type {
  RecentScheduledReversibleTransactionsResponse,
  ScheduledReversibleTransactionListResponse
} from '@/schemas';
import type { PaginatedQueryVariables } from '@/types/query';

export const scheduledReversibleTransactions = {
  useGetAll: (
    config?: QueryHookOptions<
      ScheduledReversibleTransactionListResponse,
      PaginatedQueryVariables<
        ScheduledReversibleTransactionSorts,
        ScheduledReversibleTransferWhereInput
      >
    >
  ) => {
    const GET_SCHEDULED_REVERSIBLE_TRANSACTIONS = gql`
      query GetScheduledReversibleTransactions(
        $limit: Int
        $offset: Int
        $orderBy: [ScheduledReversibleTransferOrderByInput!]
        $where: ScheduledReversibleTransferWhereInput
      ) {
        scheduledReversibleTransactions: scheduledReversibleTransfers(
          limit: $limit
          offset: $offset
          orderBy: $orderBy
          where: $where
        ) {
          extrinsicHash
          amount
          timestamp
          scheduledAt
          txId
          fee
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
        meta: scheduledReversibleTransfersConnection(
          orderBy: id_ASC
          where: $where
        ) {
          totalCount
        }
      }
    `;

    return useQuery<
      ScheduledReversibleTransactionListResponse,
      PaginatedQueryVariables<
        ScheduledReversibleTransactionSorts,
        ScheduledReversibleTransferWhereInput
      >
    >(GET_SCHEDULED_REVERSIBLE_TRANSACTIONS, {
      ...config,
      variables: {
        orderBy:
          config?.variables?.orderBy ??
          SCHEDULED_REVERSIBLE_TRANSACTION_SORTS.timestamp.DESC,
        limit: config?.variables?.limit ?? QUERY_DEFAULT_LIMIT,
        offset: config?.variables?.offset ?? 0,
        where: config?.variables?.where
      }
    });
  },
  useGetRecent: (
    config?: Omit<
      QueryHookOptions<RecentScheduledReversibleTransactionsResponse>,
      'variables'
    >
  ) => {
    const GET_RECENT_SCHEDULED_REVERSIBLE_TRANSACTIONS = gql`
      query GetRecentScheduledReversibleTransactions(
        $limit: Int
        $offset: Int
        $orderBy: [ScheduledReversibleTransferOrderByInput!]
      ) {
        scheduledReversibleTransactions: scheduledReversibleTransfers(
          limit: $limit
          offset: $offset
          orderBy: $orderBy
        ) {
          extrinsicHash
          amount
          timestamp
          scheduledAt
          txId
          fee
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
      RecentScheduledReversibleTransactionsResponse,
      PaginatedQueryVariables<ScheduledReversibleTransactionSorts>
    >(GET_RECENT_SCHEDULED_REVERSIBLE_TRANSACTIONS, {
      ...config,
      variables: {
        orderBy: SCHEDULED_REVERSIBLE_TRANSACTION_SORTS.timestamp.DESC,
        limit: QUERY_RECENT_LIMIT
      }
    });
  }
};
