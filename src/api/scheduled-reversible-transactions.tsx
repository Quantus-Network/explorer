import type { ApolloClient, QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';

import type {
  PendingInboundTransfersResponse,
  PendingInboundTransfersVariables,
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
      query GetPendingInboundTransfers(
        $to_id: String!
        $scheduled_after: String!
        $executed_after: String!
        $cancelled_after: String!
      ) {
        scheduled: scheduled_reversible_transfer(
          where: { to_id: { _eq: $to_id }, id: { _gt: $scheduled_after } }
          order_by: { id: asc }
        ) {
          id
          amount
          from_id
          to_id
        }
        executed: executed_reversible_transfer(
          where: {
            scheduledTransfer: { to_id: { _eq: $to_id } }
            id: { _gt: $executed_after }
          }
          order_by: { id: asc }
        ) {
          id
          scheduled_transfer_id
        }
        cancelled: cancelled_reversible_transfer(
          where: {
            scheduledTransfer: { to_id: { _eq: $to_id } }
            id: { _gt: $cancelled_after }
          }
          order_by: { id: asc }
        ) {
          id
          scheduled_transfer_id
        }
        scheduledTotal: scheduled_reversible_transfer_aggregate(
          where: { to_id: { _eq: $to_id } }
        ) {
          aggregate {
            count
          }
        }
        executedTotal: executed_reversible_transfer_aggregate(
          where: { scheduledTransfer: { to_id: { _eq: $to_id } } }
        ) {
          aggregate {
            count
          }
        }
        cancelledTotal: cancelled_reversible_transfer_aggregate(
          where: { scheduledTransfer: { to_id: { _eq: $to_id } } }
        ) {
          aggregate {
            count
          }
        }
      }
    `;

    return {
      fetchPage: async (
        client: ApolloClient<object>,
        variables: PendingInboundTransfersVariables
      ) =>
        (
          await client.query<PendingInboundTransfersResponse>({
            query: QUERY,
            variables,
            fetchPolicy: 'no-cache'
          })
        ).data
    };
  }
};
