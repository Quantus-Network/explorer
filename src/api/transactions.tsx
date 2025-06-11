import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';

import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import type { TransactionSorts } from '@/constants/query-sorts';
import { TRANSACTION_SORTS } from '@/constants/query-sorts';
import type {
  Transaction,
  TransactionListResponse,
  TransactionsTotalCountResponse
} from '@/schemas';
import type { PaginatedQueryVariables } from '@/types/query';

export const transactions = {
  useGetAll: (
    config?: QueryHookOptions<
      TransactionListResponse,
      PaginatedQueryVariables<TransactionSorts>
    >
  ) => {
    const GET_TRANSACTIONS = gql`
      query GetTransactions($limit: Int, $offset: Int, $orderBy: String) {
        transfers(limit: $limit, offset: $offset, orderBy: $orderBy) {
          id
          fee
          extrinsicHash
          blockNumber
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
      TransactionListResponse,
      PaginatedQueryVariables<TransactionSorts>
    >(GET_TRANSACTIONS, {
      ...config,
      variables: {
        orderBy: config?.variables?.orderBy ?? TRANSACTION_SORTS.timestamp.DESC,
        limit: config?.variables?.limit ?? QUERY_DEFAULT_LIMIT,
        offset: config?.variables?.offset ?? 0
      }
    });
  },
  useGetById: (id: string, config?: QueryHookOptions<Transaction>) => {
    const GET_TRANSACTION = gql`
      query GetTransactionById($id: String) {
        transferById(id: $id) {
          id
          fee
          extrinsicHash
          blockNumber
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

    return useQuery<Transaction>(GET_TRANSACTION, {
      ...config,
      variables: {
        id
      }
    });
  },
  useGetTotalCount: () => {
    const GET_TRANSACTIONS_TOTAL_COUNT = gql`
      query GetTransactionsTotalCount {
        transfersConnection(orderBy: id_ASC) {
          totalCount
        }
      }
    `;

    return useQuery<TransactionsTotalCountResponse>(
      GET_TRANSACTIONS_TOTAL_COUNT
    );
  }
};
