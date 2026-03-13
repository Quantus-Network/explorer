import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';

import type { CancelledReversibleTransferWhereInput } from '@/__generated__/graphql';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import { QUERY_RECENT_LIMIT } from '@/constants/query-recent-limit';
import type { CancelledReversibleTransactionSorts } from '@/constants/query-sorts';
import { CANCELLED_REVERSIBLE_TRANSACTION_SORTS } from '@/constants/query-sorts';
import type {
  CancelledReversibleTransactionListResponse,
  RecentCancelledReversibleTransactionsResponse
} from '@/schemas';
import type { PaginatedQueryVariables } from '@/types/query';

export const cancelledReversibleTransactions = {
  useGetAll: (
    config?: QueryHookOptions<
      CancelledReversibleTransactionListResponse,
      PaginatedQueryVariables<
        CancelledReversibleTransactionSorts,
        CancelledReversibleTransferWhereInput
      >
    >
  ) => {
    const GET_CANCELLED_REVERSIBLE_TRANSACTIONS = gql`
      query GetCancelledReversibleTransactions(
        $limit: Int
        $offset: Int
        $orderBy: [CancelledReversibleTransferOrderByInput!]
        $where: CancelledReversibleTransferWhereInput
      ) {
        cancelledReversibleTransactions: cancelledReversibleTransfers(
          limit: $limit
          offset: $offset
          orderBy: $orderBy
          where: $where
        ) {
          timestamp
          txId
          block {
            height
          }
          cancelledBy {
            id
          }
          scheduledTransfer {
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
        meta: cancelledReversibleTransfersConnection(
          orderBy: id_ASC
          where: $where
        ) {
          totalCount
        }
      }
    `;

    return useQuery<
      CancelledReversibleTransactionListResponse,
      PaginatedQueryVariables<
        CancelledReversibleTransactionSorts,
        CancelledReversibleTransferWhereInput
      >
    >(GET_CANCELLED_REVERSIBLE_TRANSACTIONS, {
      ...config,
      variables: {
        orderBy:
          config?.variables?.orderBy ??
          CANCELLED_REVERSIBLE_TRANSACTION_SORTS.timestamp.DESC,
        limit: config?.variables?.limit ?? QUERY_DEFAULT_LIMIT,
        offset: config?.variables?.offset ?? 0,
        where: config?.variables?.where
      }
    });
  },
  useGetRecent: (
    config?: Omit<
      QueryHookOptions<RecentCancelledReversibleTransactionsResponse>,
      'variables'
    >
  ) => {
    const GET_RECENT_CANCELLED_REVERSIBLE_TRANSACTIONS = gql`
      query GetRecentCancelledReversibleTransactions(
        $limit: Int
        $offset: Int
        $orderBy: [CancelledReversibleTransferOrderByInput!]
      ) {
        cancelledReversibleTransactions: cancelledReversibleTransfers(
          limit: $limit
          offset: $offset
          orderBy: $orderBy
        ) {
          timestamp
          txId
          block {
            height
          }
          cancelledBy {
            id
          }
          scheduledTransfer {
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
      }
    `;

    return useQuery<
      RecentCancelledReversibleTransactionsResponse,
      PaginatedQueryVariables<CancelledReversibleTransactionSorts>
    >(GET_RECENT_CANCELLED_REVERSIBLE_TRANSACTIONS, {
      ...config,
      variables: {
        orderBy: CANCELLED_REVERSIBLE_TRANSACTION_SORTS.timestamp.DESC,
        limit: QUERY_RECENT_LIMIT
      }
    });
  }
};
