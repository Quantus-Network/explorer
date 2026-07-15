import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';

import type { ExecutedReversibleTransactionResponse } from '@/schemas';

export const executedReversibleTransactions = {
  getByTxId: () => {
    const QUERY = gql`
      query GetExecutedReversibleTransactionByTxId($tx_id: String!) {
        executedReversibleTransactions: executed_reversible_transfer(
          where: { tx_id: { _eq: $tx_id } }
        ) {
          timestamp
          tx_id
          block {
            height
          }
          scheduledTransfer {
            amount
            scheduled_at
            fee
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

    return {
      useQuery: (
        tx_id: string,
        config?: QueryHookOptions<ExecutedReversibleTransactionResponse>
      ) =>
        useQuery<ExecutedReversibleTransactionResponse>(QUERY, {
          ...config,
          variables: {
            tx_id
          }
        })
    };
  }
};
