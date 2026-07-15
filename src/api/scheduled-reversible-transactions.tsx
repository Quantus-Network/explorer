import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';

import type { ScheduledReversibleTransactionResponse } from '@/schemas';

export const scheduledReversibleTransactions = {
  getByTxId: () => {
    const QUERY = gql`
      query GetScheduledReversibleTransactionByTxId($tx_id: String!) {
        scheduledReversibleTransactions: scheduled_reversible_transfer(
          where: { tx_id: { _eq: $tx_id } }
        ) {
          extrinsic {
            id
            pallet
            call
          }
          amount
          timestamp
          scheduled_at
          tx_id
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

    return {
      useQuery: (
        tx_id: string,
        config?: QueryHookOptions<ScheduledReversibleTransactionResponse>
      ) =>
        useQuery<ScheduledReversibleTransactionResponse>(QUERY, {
          ...config,
          variables: {
            tx_id
          }
        })
    };
  }
};
