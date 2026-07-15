import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';
import { endOfToday } from 'date-fns/endOfToday';
import { startOfToday } from 'date-fns/startOfToday';
import { subDays } from 'date-fns/subDays';

import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import type { AccountSorts } from '@/constants/query-sorts';
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
          flagEvents: accountEvents(
            where: {
              _or: [
                { high_security_set_id: { _is_null: false } }
                { multisig_id: { _is_null: false } }
              ]
            }
            limit: 20
          ) {
            highSecuritySet {
              who_id
              guardian_id
            }
            multisig_id
          }
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
      query GetAccountById($id: String!) {
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
        multisig: multisig_by_pk(id: $id) {
          id
        }
        guardian: high_security_set_aggregate(
          where: { who: { id: { _eq: $id } } }
        ) {
          aggregate {
            totalCount: count
          }
        }
        beneficiaries: high_security_set_aggregate(
          where: { guardian: { id: { _eq: $id } } }
        ) {
          aggregate {
            totalCount: count
          }
        }
      }
    `;

    return {
      useQuery: (id: string, config?: QueryHookOptions<AccountResponse>) =>
        useQuery<AccountResponse>(GET_ACCOUNT, {
          ...config,
          variables: {
            id
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
