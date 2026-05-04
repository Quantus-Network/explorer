import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';
import { endOfToday } from 'date-fns/endOfToday';
import { startOfToday } from 'date-fns/startOfToday';
import { subDays } from 'date-fns/subDays';

import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import type { AccountSorts } from '@/constants/query-sorts';
import { QUERY_UNIFIED_LIMIT } from '@/constants/query-unified-limit';
import type {
  AccountListResponse,
  AccountResponse,
  AccountStatsResponse
} from '@/schemas';
import type { PaginatedQueryVariables } from '@/types/query';

export const accounts = {
  useGetAll: (
    config?: QueryHookOptions<
      AccountListResponse,
      PaginatedQueryVariables<AccountSorts>
    >
  ) => {
    const GET_ACCOUNTS = gql`
      query GetAccounts(
        $limit: Int
        $offset: Int
        $orderBy: [account_order_by!]
      ) {
        accounts: account(limit: $limit, offset: $offset, order_by: $orderBy) {
          id
          free
          frozen
          reserved
        }
        meta: chain_stats_by_pk(id: "global") {
          totalCount: total_accounts
        }
      }
    `;

    return useQuery<AccountListResponse, PaginatedQueryVariables<AccountSorts>>(
      GET_ACCOUNTS,
      {
        ...config,
        variables: {
          orderBy: config?.variables?.orderBy ?? { id: 'desc' },
          limit: config?.variables?.limit ?? QUERY_DEFAULT_LIMIT,
          offset: config?.variables?.offset ?? 0
        }
      }
    );
  },
  getById: () => {
    const GET_ACCOUNT = gql`
      query GetAccountById($id: String!, $limit: Int!) {
        account: account_by_pk(id: $id) {
          id
          free
          frozen
          reserved
        }
        accountStats: account_stats_by_pk(id: $id) {
          total_cancelled_transfers
          total_executed_transfers
          total_immediate_transfers
          total_mined_blocks
          total_rewards
          total_scheduled_transfers
        }
        accountEvents: account_event(
          limit: $limit
          where: { account_id: { _eq: $id } }
        ) {
          transfer {
            fee
            extrinsic {
              id
              pallet
              call
            }
            block {
              height
            }
            amount
            timestamp
            from {
              id
            }
            to {
              id
            }
          }
          scheduledReversibleTransfer {
            extrinsic {
              id
              pallet
              call
            }
            timestamp
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
          executedReversibleTransfer {
            timestamp
            tx_id
            block {
              height
            }
            scheduledTransfer {
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
          cancelledReversibleTransfer {
            timestamp
            tx_id
            block {
              height
            }
            cancelledBy {
              id
            }
            scheduledTransfer {
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
          minerReward {
            block {
              height
              hash
            }
            reward
            miner {
              id
            }
            timestamp
          }
        }

        guardian: high_security_set_aggregate(
          order_by: { timestamp: desc }
          limit: $limit
          where: { who: { id: { _eq: $id } } }
        ) {
          nodes {
            timestamp
            block {
              height
            }
            interceptor {
              id
              free
              frozen
              reserved
            }
          }
          aggregate {
            totalCount: count
          }
        }

        beneficiaries: high_security_set_aggregate(
          order_by: { timestamp: desc }
          limit: $limit
          where: { interceptor: { id: { _eq: $id } } }
        ) {
          nodes {
            timestamp
            block {
              height
            }
            who {
              id
              free
              frozen
              reserved
            }
          }
          aggregate {
            totalCount: count
          }
        }

        wormholeOutputs: wormhole_output(
          order_by: { wormholeExtrinsic: { timestamp: desc } }
          limit: $limit
          where: { exitAccount: { id: { _eq: $id } } }
        ) {
          id
          amount
          exitAccount {
            id
          }
          wormholeExtrinsic {
            id
            extrinsic {
              id
              pallet
              call
            }
            total_amount
            output_count
            timestamp
            block {
              height
            }
            outputs {
              id
              exitAccount {
                id
              }
              amount
            }
          }
        }
      }
    `;

    return {
      useQuery: (id: string, config?: QueryHookOptions<AccountResponse>) =>
        useQuery<AccountResponse>(GET_ACCOUNT, {
          ...config,
          variables: {
            id,
            limit: QUERY_UNIFIED_LIMIT
          }
        })
    };
  },
  useGetStats: (
    config?: Omit<QueryHookOptions<AccountStatsResponse>, 'variables'>
  ) => {
    const startDate = subDays(startOfToday(), 7).toISOString();
    const endDate = endOfToday().toISOString();

    const GET_ACCOUNTS_STATS = gql`
      query GetAccountsStats($startDate: timestamptz!, $endDate: timestamptz!) {
        all: chain_stats_by_pk(id: "global") {
          total_accounts
        }

        recentlyActive: account_aggregate(
          where: {
            transfersFrom: { timestamp: { _gte: $startDate, _lte: $endDate } }
          }
        ) {
          aggregate {
            count
          }
        }

        recentlyDeposited: account_aggregate(
          where: {
            transfersTo: { timestamp: { _gte: $startDate, _lte: $endDate } }
          }
        ) {
          aggregate {
            count
          }
        }
      }
    `;

    return useQuery<AccountStatsResponse>(GET_ACCOUNTS_STATS, {
      ...config,
      variables: {
        startDate,
        endDate
      }
    });
  }
};
