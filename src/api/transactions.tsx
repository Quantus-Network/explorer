import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';

import type { TransactionListResponse } from '@/schemas';

export const transactions = {
  useGetAll: (config?: QueryHookOptions) => {
    const GET_TRANSACTIONS = gql`
      query GetTransactions($limit: Int, $offset: Int) {
        transfers(limit: $limit, offset: $offset, orderBy: timestamp_DESC) {
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

    return useQuery<TransactionListResponse>(GET_TRANSACTIONS, {
      ...config,
      variables: {
        ...config?.variables,
        limit: config?.variables?.limit ?? 100
      }
    });
  }
};
