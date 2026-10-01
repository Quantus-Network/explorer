import type {
  Account_Bool_Exp,
  Unified_Transaction_Bool_Exp
} from '@/__generated__/graphql';
import { GET_FILTERED_ACCOUNTS } from '@/api/accounts';
import {
  GET_FILTERED_UNIFIED_TRANSACTIONS,
  GET_UNIFIED_TRANSACTIONS_WITH_ACCOUNT_TOTAL,
  GET_UNIFIED_TRANSACTIONS_WITH_CHAIN_TOTAL
} from '@/api/unified-transactions';
import {
  ACCOUNT_TYPES,
  type AccountType,
  type AccountTypeFilterRule
} from '@/constants/account-types';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import {
  accountTypeFilteredTransactionsWhere,
  accountTypeRuleWhere
} from '@/utils/account-type-filter';
import { maxBrowsablePageIndex } from '@/utils/browsable-page-depth';
import { peekedLimit } from '@/utils/uncounted-pagination';
import {
  accountPartyWhere,
  EXCLUDE_REWARD_TRANSFERS,
  withExcludedRewardTransfers
} from '@/utils/unified-transaction-filters';

import type {
  GraphqlBenchmarkContext,
  GraphqlBenchmarkRegistryEntry
} from './types';

export const ACCOUNT_TYPE_FILTER_GROUP = 'account-type-filters';

/** Offset of the deepest page the transaction pager lets a user reach. */
const DEEPEST_PAGE_OFFSET =
  maxBrowsablePageIndex(QUERY_DEFAULT_LIMIT) * QUERY_DEFAULT_LIMIT;

const is = (...types: AccountType[]): AccountTypeFilterRule => ({
  operator: 'is',
  types
});
const isNot = (...types: AccountType[]): AccountTypeFilterRule => ({
  operator: 'is_not',
  types
});

type PartyRules = { from?: AccountTypeFilterRule; to?: AccountTypeFilterRule };

function filteredTransactionsVariables(
  rules: PartyRules,
  options: { baseWhere?: Unified_Transaction_Bool_Exp; offset?: number } = {}
) {
  const where = accountTypeFilteredTransactionsWhere(options.baseWhere, rules);
  if (!where) {
    throw new Error(
      `Benchmark rules do not narrow results: ${JSON.stringify(rules)}`
    );
  }
  return {
    orderBy: { timestamp: 'desc' },
    limit: peekedLimit(QUERY_DEFAULT_LIMIT),
    offset: options.offset ?? 0,
    where
  };
}

function filteredAccountsVariables(rule: AccountTypeFilterRule) {
  const where: Account_Bool_Exp | null = accountTypeRuleWhere(rule);
  if (!where) {
    throw new Error(
      `Benchmark rule does not narrow results: ${JSON.stringify(rule)}`
    );
  }
  return {
    orderBy: { id: 'desc' },
    limit: peekedLimit(QUERY_DEFAULT_LIMIT),
    offset: 0,
    where
  };
}

function filteredTransactions(
  label: string,
  rules: PartyRules,
  offset?: number
): GraphqlBenchmarkRegistryEntry {
  return {
    name: `GetFilteredUnifiedTransactions ${label}`,
    group: ACCOUNT_TYPE_FILTER_GROUP,
    document: GET_FILTERED_UNIFIED_TRANSACTIONS,
    getVariables: () => filteredTransactionsVariables(rules, { offset })
  };
}

function filteredAccounts(
  label: string,
  rule: AccountTypeFilterRule
): GraphqlBenchmarkRegistryEntry {
  return {
    name: `GetFilteredAccounts ${label}`,
    group: ACCOUNT_TYPE_FILTER_GROUP,
    document: GET_FILTERED_ACCOUNTS,
    getVariables: () => filteredAccountsVariables(rule)
  };
}

type PartySample = {
  label: string;
  accountId: (ctx: GraphqlBenchmarkContext) => string | undefined;
};

/** A quiet account is the worst case for a timestamp-index walk; busy and miner accounts for per-account index walks. */
const PARTY_SAMPLES: PartySample[] = [
  { label: 'quiet account', accountId: (ctx) => ctx.quietAccountId },
  { label: 'busiest account', accountId: (ctx) => ctx.busyAccountId },
  { label: 'top miner', accountId: (ctx) => ctx.minerAccountId }
];

function accountPartyEntries(
  sample: PartySample
): GraphqlBenchmarkRegistryEntry[] {
  const accountTotal = (offset: number) => (ctx: GraphqlBenchmarkContext) => {
    const accountId = sample.accountId(ctx);
    if (!accountId) return null;
    return {
      orderBy: { timestamp: 'desc' },
      limit: QUERY_DEFAULT_LIMIT,
      offset,
      where: withExcludedRewardTransfers(accountPartyWhere(accountId)),
      accountId
    };
  };
  return [
    {
      name: `GetUnifiedTransactionsWithAccountTotal account party (${sample.label})`,
      group: ACCOUNT_TYPE_FILTER_GROUP,
      document: GET_UNIFIED_TRANSACTIONS_WITH_ACCOUNT_TOTAL,
      getVariables: accountTotal(0)
    },
    {
      name: `GetUnifiedTransactionsWithAccountTotal account party, deepest page (${sample.label})`,
      group: ACCOUNT_TYPE_FILTER_GROUP,
      document: GET_UNIFIED_TRANSACTIONS_WITH_ACCOUNT_TOTAL,
      getVariables: accountTotal(DEEPEST_PAGE_OFFSET)
    },
    {
      name: `GetFilteredUnifiedTransactions account party, to is not transparent (${sample.label})`,
      group: ACCOUNT_TYPE_FILTER_GROUP,
      document: GET_FILTERED_UNIFIED_TRANSACTIONS,
      getVariables: (ctx) => {
        const accountId = sample.accountId(ctx);
        if (!accountId) return null;
        return filteredTransactionsVariables(
          { to: isNot('transparent') },
          { baseWhere: accountPartyWhere(accountId) }
        );
      }
    }
  ];
}

/**
 * Account-type filtered lists next to the unfiltered queries they replace.
 * Sparse and zero-match rules are the worst case: the database walks the whole
 * timestamp-ordered list looking for rows that never fill the page.
 */
export const accountTypeFilterBenchmarkRegistry: GraphqlBenchmarkRegistryEntry[] =
  [
    {
      name: 'GetUnifiedTransactionsWithChainTotal unfiltered',
      group: ACCOUNT_TYPE_FILTER_GROUP,
      document: GET_UNIFIED_TRANSACTIONS_WITH_CHAIN_TOTAL,
      getVariables: () => ({
        orderBy: { timestamp: 'desc' },
        limit: QUERY_DEFAULT_LIMIT,
        offset: 0,
        where: EXCLUDE_REWARD_TRANSFERS
      })
    },
    {
      name: 'GetUnifiedTransactionsWithChainTotal unfiltered, deepest page',
      group: ACCOUNT_TYPE_FILTER_GROUP,
      document: GET_UNIFIED_TRANSACTIONS_WITH_CHAIN_TOTAL,
      getVariables: () => ({
        orderBy: { timestamp: 'desc' },
        limit: QUERY_DEFAULT_LIMIT,
        offset: DEEPEST_PAGE_OFFSET,
        where: EXCLUDE_REWARD_TRANSFERS
      })
    },
    filteredTransactions('from is transparent', { from: is('transparent') }),
    filteredTransactions('from is not transparent', {
      from: isNot('transparent')
    }),
    filteredTransactions('from is potential_encrypted', {
      from: is('potential_encrypted')
    }),
    filteredTransactions('from is encrypted', { from: is('encrypted') }),
    filteredTransactions('from is multisig', { from: is('multisig') }),
    filteredTransactions('to is guardian', { to: is('guardian') }),
    filteredTransactions('from is multisig, to is guardian', {
      from: is('multisig'),
      to: is('guardian')
    }),
    filteredTransactions('from is any type', { from: is(...ACCOUNT_TYPES) }),
    filteredTransactions(
      'from is transparent, deepest page',
      { from: is('transparent') },
      DEEPEST_PAGE_OFFSET
    ),
    filteredTransactions(
      'from is encrypted, deepest page',
      { from: is('encrypted') },
      DEEPEST_PAGE_OFFSET
    ),
    ...PARTY_SAMPLES.flatMap(accountPartyEntries),
    ...ACCOUNT_TYPES.map((type) => filteredAccounts(`is ${type}`, is(type))),
    filteredAccounts('is not transparent', isNot('transparent'))
  ];
