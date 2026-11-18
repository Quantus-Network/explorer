import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';

import type {
  PendingInboundTransfersResponse,
  ScheduledReversibleTransactionResponse
} from '@/schemas';

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
  },
  getPendingInbound: () => {
    const QUERY = gql`
      query GetPendingInboundTransfers($to_id: String!) {
        scheduled: scheduled_reversible_transfer(
          where: { to_id: { _eq: $to_id } }
        ) {
          id
          amount
          from_id
          to_id
        }
        executed: executed_reversible_transfer(
          where: { scheduledTransfer: { to_id: { _eq: $to_id } } }
        ) {
          scheduled_transfer_id
        }
        cancelled: cancelled_reversible_transfer(
          where: { scheduledTransfer: { to_id: { _eq: $to_id } } }
        ) {
          scheduled_transfer_id
        }
      }
    `;

    return {
      useQuery: (
        to_id: string,
        config?: QueryHookOptions<PendingInboundTransfersResponse>
      ) =>
        useQuery<PendingInboundTransfersResponse>(QUERY, {
          ...config,
          variables: {
            to_id
          }
        })
    };
  }
};
