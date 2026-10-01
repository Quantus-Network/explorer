import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';

import type { Account_Bool_Exp } from '@/__generated__/graphql';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import type { AccountSorts } from '@/constants/query-sorts';
import type {
  AccountListItem,
  AccountListPageResponse,
  AccountListResponse,
  AccountResponse,
  AccountStatsResponse
} from '@/schemas';
import type { PaginatedQueryVariables } from '@/types/query';
import { getAccountStatsUtcDateRange } from '@/utils/get-account-stats-utc-date-range';
import { peekedLimit, takePeekedPage } from '@/utils/uncounted-pagination';

const ACCOUNT_LIST_FIELDS = `
  id
  free
  frozen
  reserved
  is_deposit_only
  is_high_security
  is_guardian
  is_multisig
  minedBlocks(limit: 1) {
    height
  }
`;

export const GET_ACCOUNTS = gql`
  query GetAccounts(
    $limit: Int
    $offset: Int
    $orderBy: [account_order_by!]
  ) {
    accounts: account(limit: $limit, offset: $offset, order_by: $orderBy) {
      ${ACCOUNT_LIST_FIELDS}
    }
    meta: chain_stats_by_pk(id: "global") {
      totalCount: total_accounts
    }
  }
`;

/** Filtered list: no total, the caller peeks one extra row instead. */
export const GET_FILTERED_ACCOUNTS = gql`
  query GetFilteredAccounts(
    $limit: Int
    $offset: Int
    $orderBy: [account_order_by!]
    $where: account_bool_exp!
  ) {
    accounts: account(
      limit: $limit
      offset: $offset
      order_by: $orderBy
      where: $where
    ) {
      ${ACCOUNT_LIST_FIELDS}
    }
  }
`;

export const GET_ACCOUNT_BY_ID = gql`
  query GetAccountById($id: String!) {
    account: account_by_pk(id: $id) {
      id
      free
      frozen
      reserved
      is_deposit_only
      minedBlocks(limit: 1) {
        height
      }
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

// daily_active_account is one row per (UTC day, account) with sent/received flags,
// so the 7-day distinct counts read a few thousand indexed rows instead of the transfer table.
export const GET_ACCOUNTS_STATS = gql`
  query GetAccountsStats($startDate: timestamptz!, $endDate: timestamptz!) {
    all: chain_stats_by_pk(id: "global") {
      total_accounts
    }

    recentlyActive: daily_active_account_aggregate(
      where: { date: { _gte: $startDate, _lte: $endDate }, sent: { _eq: true } }
    ) {
      aggregate {
        count(columns: account_id, distinct: true)
      }
    }

    recentlyDeposited: daily_active_account_aggregate(
      where: {
        date: { _gte: $startDate, _lte: $endDate }
        received: { _eq: true }
      }
    ) {
      aggregate {
        count(columns: account_id, distinct: true)
      }
    }
  }
`;

export const accounts = {
  useGetAll: (
    config?: QueryHookOptions<
      AccountListResponse,
      PaginatedQueryVariables<AccountSorts>
    >
  ) => {
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
  useGetFiltered: (
    config: Omit<
      QueryHookOptions<
        { accounts: AccountListItem[] },
        PaginatedQueryVariables<AccountSorts, Account_Bool_Exp>
      >,
      'variables'
    > & {
      variables: PaginatedQueryVariables<AccountSorts, Account_Bool_Exp> & {
        where: Account_Bool_Exp;
      };
    }
  ) => {
    const limit = config.variables.limit ?? QUERY_DEFAULT_LIMIT;

    const result = useQuery<
      { accounts: AccountListItem[] },
      PaginatedQueryVariables<AccountSorts, Account_Bool_Exp>
    >(GET_FILTERED_ACCOUNTS, {
      ...config,
      variables: {
        orderBy: config.variables.orderBy ?? { id: 'desc' },
        limit: peekedLimit(limit),
        offset: config.variables.offset ?? 0,
        where: config.variables.where
      }
    });

    let data: AccountListPageResponse | undefined;
    if (result.data) {
      const page = takePeekedPage(result.data.accounts, limit);
      data = { accounts: page.rows, hasNextPage: page.hasNextPage };
    }

    return { ...result, data };
  },
  getById: () => {
    return {
      useQuery: (id: string, config?: QueryHookOptions<AccountResponse>) =>
        useQuery<AccountResponse>(GET_ACCOUNT_BY_ID, {
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
    const { startDate, endDate } = getAccountStatsUtcDateRange();

    return useQuery<AccountStatsResponse>(GET_ACCOUNTS_STATS, {
      ...config,
      variables: {
        startDate,
        endDate
      }
    });
  }
};
