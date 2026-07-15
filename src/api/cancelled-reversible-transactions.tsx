import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';

import type { CancelledReversibleTransactionResponse } from '@/schemas';

export const cancelledReversibleTransactions = {
  getByTxId: () => {
    const QUERY = gql`
      query GetCancelledReversibleTransactionByTxId($tx_id: String!) {
        cancelledReversibleTransactions: cancelled_reversible_transfer(
          where: { tx_id: { _eq: $tx_id } }
        ) {
          timestamp
          tx_id
          block {
            height
          }
          cancelledBy {
            id
          }
          extrinsic {
            id
            pallet
            call
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
        config?: QueryHookOptions<CancelledReversibleTransactionResponse>
      ) =>
        useQuery<CancelledReversibleTransactionResponse>(QUERY, {
          ...config,
          variables: {
            tx_id
          }
        })
    };
  }
};
