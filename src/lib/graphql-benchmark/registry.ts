import { endOfToday } from 'date-fns/endOfToday';
import { startOfToday } from 'date-fns/startOfToday';
import { subDays } from 'date-fns/subDays';

import {
  GetAccountByIdDocument,
  GetAccountsDocument,
  GetAccountsStatsDocument,
  GetBlockByIdDocument,
  GetBlocksDocument,
  GetCancelledReversibleTransactionByTxIdDocument,
  GetCancelledReversibleTransactionsDocument,
  GetCancelledReversibleTransactionsStatsDocument,
  GetDepositPoolStatsDocument,
  GetErrorEventByHashDocument,
  GetErrorEventsDocument,
  GetErrorEventsStatsDocument,
  GetExecutedReversibleTransactionByTxIdDocument,
  GetExecutedReversibleTransactionsDocument,
  GetExecutedReversibleTransactionsStatsDocument,
  GetExtrinsicByHashDocument,
  GetHighSecuritySetByHashDocument,
  GetHighSecuritySetsDocument,
  GetHighSecuritySetsStatsDocument,
  GetMinerLeaderboardDocument,
  GetMinerRewardByHashDocument,
  GetMinerRewardsDocument,
  GetMinerRewardsStatsDocument,
  GetRecentBlocksDocument,
  GetRecentCancelledReversibleTransactionsDocument,
  GetRecentErrorEventsDocument,
  GetRecentExecutedReversibleTransactionsDocument,
  GetRecentHighSecuritySetsDocument,
  GetRecentMinerRewardsDocument,
  GetRecentScheduledReversibleTransactionsDocument,
  GetRecentTransactionsDocument,
  GetScheduledReversibleTransactionByTxIdDocument,
  GetScheduledReversibleTransactionsDocument,
  GetScheduledReversibleTransactionsStatsDocument,
  GetStatusDocument,
  GetTransactionsDocument,
  GetTransactionsStatsDocument,
  GetWormholeExtrinsicByIdDocument,
  GetWormholeExtrinsicsDocument,
  SearchAllDocument
} from '@/__generated__/graphql';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import { QUERY_RECENT_LIMIT } from '@/constants/query-recent-limit';
import { BLOCK_SORTS } from '@/constants/query-sorts';
import { ACCOUNT_SORTS } from '@/constants/query-sorts/accounts';
import { ERROR_EVENT_SORTS } from '@/constants/query-sorts/errors';
import { HIGH_SECURITY_SET_SORTS } from '@/constants/query-sorts/high-security-sets';
import {
  CANCELLED_REVERSIBLE_TRANSACTION_SORTS,
  EXECUTED_REVERSIBLE_TRANSACTION_SORTS,
  SCHEDULED_REVERSIBLE_TRANSACTION_SORTS
} from '@/constants/query-sorts/reversible-transactions';
import { TRANSACTION_SORTS } from '@/constants/query-sorts/transactions';
import { WORMHOLE_EXTRINSIC_SORTS } from '@/constants/query-sorts/wormhole';
import { QUERY_UNIFIED_LIMIT } from '@/constants/query-unified-limit';
import { SEARCH_PREVIEW_RESULTS_LIMIT } from '@/constants/search-preview-results-limit';

import type { GraphqlBenchmarkRegistryEntry } from './types';

function accountStatsDates() {
  return {
    startDate: subDays(startOfToday(), 7).toISOString(),
    endDate: endOfToday().toISOString()
  };
}

function statsDay() {
  const startDate = startOfToday().toISOString();
  const endDate = endOfToday().toISOString();
  return { startDate, endDate };
}

export const graphqlBenchmarkRegistry: GraphqlBenchmarkRegistryEntry[] = [
  {
    name: 'GetAccounts',
    document: GetAccountsDocument,
    getVariables: () => ({
      orderBy: ACCOUNT_SORTS.id.DESC,
      limit: QUERY_DEFAULT_LIMIT,
      offset: 0
    })
  },
  {
    name: 'GetAccountById',
    document: GetAccountByIdDocument,
    getVariables: (ctx) =>
      ctx.accountId ? { id: ctx.accountId, limit: QUERY_UNIFIED_LIMIT } : null
  },
  {
    name: 'GetAccountsStats',
    document: GetAccountsStatsDocument,
    getVariables: () => accountStatsDates()
  },
  {
    name: 'GetBlocks',
    document: GetBlocksDocument,
    getVariables: () => ({
      orderBy: BLOCK_SORTS.timestamp.DESC,
      limit: QUERY_DEFAULT_LIMIT,
      offset: 0
    })
  },
  {
    name: 'GetRecentBlocks',
    document: GetRecentBlocksDocument,
    getVariables: () => ({
      orderBy: BLOCK_SORTS.timestamp.DESC,
      limit: QUERY_RECENT_LIMIT
    })
  },
  {
    name: 'GetBlockById',
    document: GetBlockByIdDocument,
    getVariables: (ctx) =>
      ctx.blockHeight != null && ctx.blockHash != null
        ? {
            height: ctx.blockHeight,
            hash: ctx.blockHash,
            limit: QUERY_UNIFIED_LIMIT
          }
        : null
  },
  {
    name: 'GetCancelledReversibleTransactions',
    document: GetCancelledReversibleTransactionsDocument,
    getVariables: () => ({
      orderBy: CANCELLED_REVERSIBLE_TRANSACTION_SORTS.timestamp.DESC,
      limit: QUERY_DEFAULT_LIMIT,
      offset: 0
    })
  },
  {
    name: 'GetRecentCancelledReversibleTransactions',
    document: GetRecentCancelledReversibleTransactionsDocument,
    getVariables: () => ({
      orderBy: CANCELLED_REVERSIBLE_TRANSACTION_SORTS.timestamp.DESC,
      limit: QUERY_RECENT_LIMIT
    })
  },
  {
    name: 'GetCancelledReversibleTransactionsStats',
    document: GetCancelledReversibleTransactionsStatsDocument,
    getVariables: () => statsDay()
  },
  {
    name: 'GetCancelledReversibleTransactionByTxId',
    document: GetCancelledReversibleTransactionByTxIdDocument,
    getVariables: (ctx) =>
      ctx.cancelledTxId ? { txId: ctx.cancelledTxId } : null
  },
  {
    name: 'GetStatus',
    document: GetStatusDocument,
    getVariables: () => ({})
  },
  {
    name: 'GetErrorEvents',
    document: GetErrorEventsDocument,
    getVariables: () => ({
      orderBy: ERROR_EVENT_SORTS.timestamp.DESC,
      limit: QUERY_DEFAULT_LIMIT,
      offset: 0
    })
  },
  {
    name: 'GetRecentErrorEvents',
    document: GetRecentErrorEventsDocument,
    getVariables: () => ({
      orderBy: ERROR_EVENT_SORTS.timestamp.DESC,
      limit: QUERY_RECENT_LIMIT
    })
  },
  {
    name: 'GetErrorEventsStats',
    document: GetErrorEventsStatsDocument,
    getVariables: () => statsDay()
  },
  {
    name: 'GetErrorEventByHash',
    document: GetErrorEventByHashDocument,
    getVariables: (ctx) => {
      const hash = ctx.errorExtrinsicHash ?? ctx.extrinsicHash;
      return hash ? { hash } : null;
    }
  },
  {
    name: 'GetExecutedReversibleTransactions',
    document: GetExecutedReversibleTransactionsDocument,
    getVariables: () => ({
      orderBy: EXECUTED_REVERSIBLE_TRANSACTION_SORTS.timestamp.DESC,
      limit: QUERY_DEFAULT_LIMIT,
      offset: 0
    })
  },
  {
    name: 'GetRecentExecutedReversibleTransactions',
    document: GetRecentExecutedReversibleTransactionsDocument,
    getVariables: () => ({
      orderBy: EXECUTED_REVERSIBLE_TRANSACTION_SORTS.timestamp.DESC,
      limit: QUERY_RECENT_LIMIT
    })
  },
  {
    name: 'GetExecutedReversibleTransactionsStats',
    document: GetExecutedReversibleTransactionsStatsDocument,
    getVariables: () => statsDay()
  },
  {
    name: 'GetExecutedReversibleTransactionByTxId',
    document: GetExecutedReversibleTransactionByTxIdDocument,
    getVariables: (ctx) =>
      ctx.executedTxId ? { txId: ctx.executedTxId } : null
  },
  {
    name: 'GetHighSecuritySets',
    document: GetHighSecuritySetsDocument,
    getVariables: () => ({
      orderBy: HIGH_SECURITY_SET_SORTS.timestamp.DESC,
      limit: QUERY_DEFAULT_LIMIT,
      offset: 0
    })
  },
  {
    name: 'GetRecentHighSecuritySets',
    document: GetRecentHighSecuritySetsDocument,
    getVariables: () => ({
      orderBy: HIGH_SECURITY_SET_SORTS.timestamp.DESC,
      limit: QUERY_RECENT_LIMIT,
      where: {}
    })
  },
  {
    name: 'GetHighSecuritySetsStats',
    document: GetHighSecuritySetsStatsDocument,
    getVariables: () => statsDay()
  },
  {
    name: 'GetHighSecuritySetByHash',
    document: GetHighSecuritySetByHashDocument,
    getVariables: (ctx) => {
      const hash = ctx.highSecurityExtrinsicHash ?? ctx.extrinsicHash;
      return hash ? { hash } : null;
    }
  },
  {
    name: 'GetMinerLeaderboard',
    document: GetMinerLeaderboardDocument,
    getVariables: () => ({
      limit: QUERY_DEFAULT_LIMIT,
      offset: 0
    })
  },
  {
    name: 'GetMinerRewards',
    document: GetMinerRewardsDocument,
    getVariables: () => ({
      orderBy: TRANSACTION_SORTS.timestamp.DESC,
      limit: QUERY_DEFAULT_LIMIT,
      offset: 0
    })
  },
  {
    name: 'GetRecentMinerRewards',
    document: GetRecentMinerRewardsDocument,
    getVariables: () => ({
      orderBy: TRANSACTION_SORTS.timestamp.DESC,
      limit: QUERY_RECENT_LIMIT
    })
  },
  {
    name: 'GetMinerRewardsStats',
    document: GetMinerRewardsStatsDocument,
    getVariables: () => statsDay()
  },
  {
    name: 'GetMinerRewardByHash',
    document: GetMinerRewardByHashDocument,
    getVariables: (ctx) =>
      ctx.minerBlockHash ? { hash: ctx.minerBlockHash } : null
  },
  {
    name: 'GetScheduledReversibleTransactions',
    document: GetScheduledReversibleTransactionsDocument,
    getVariables: () => ({
      orderBy: SCHEDULED_REVERSIBLE_TRANSACTION_SORTS.timestamp.DESC,
      limit: QUERY_DEFAULT_LIMIT,
      offset: 0
    })
  },
  {
    name: 'GetRecentScheduledReversibleTransactions',
    document: GetRecentScheduledReversibleTransactionsDocument,
    getVariables: () => ({
      orderBy: SCHEDULED_REVERSIBLE_TRANSACTION_SORTS.timestamp.DESC,
      limit: QUERY_RECENT_LIMIT
    })
  },
  {
    name: 'GetScheduledReversibleTransactionsStats',
    document: GetScheduledReversibleTransactionsStatsDocument,
    getVariables: () => statsDay()
  },
  {
    name: 'GetScheduledReversibleTransactionByTxId',
    document: GetScheduledReversibleTransactionByTxIdDocument,
    getVariables: (ctx) =>
      ctx.scheduledTxId ? { txId: ctx.scheduledTxId } : null
  },
  {
    name: 'SearchAll',
    document: SearchAllDocument,
    getVariables: () => ({
      keyword: '0x',
      keyword_number: -1,
      limit: SEARCH_PREVIEW_RESULTS_LIMIT
    })
  },
  {
    name: 'GetTransactions',
    document: GetTransactionsDocument,
    getVariables: () => ({
      orderBy: TRANSACTION_SORTS.timestamp.DESC,
      limit: QUERY_DEFAULT_LIMIT,
      offset: 0,
      where: { extrinsic_isNull: false }
    })
  },
  {
    name: 'GetRecentTransactions',
    document: GetRecentTransactionsDocument,
    getVariables: () => ({
      orderBy: TRANSACTION_SORTS.timestamp.DESC,
      limit: QUERY_RECENT_LIMIT,
      where: { extrinsic_isNull: false }
    })
  },
  {
    name: 'GetTransactionsStats',
    document: GetTransactionsStatsDocument,
    getVariables: () => statsDay()
  },
  {
    name: 'GetExtrinsicByHash',
    document: GetExtrinsicByHashDocument,
    getVariables: (ctx) =>
      ctx.extrinsicHash ? { hash: ctx.extrinsicHash } : null
  },
  {
    name: 'GetWormholeExtrinsics',
    document: GetWormholeExtrinsicsDocument,
    getVariables: () => ({
      orderBy: [WORMHOLE_EXTRINSIC_SORTS.timestamp.DESC],
      limit: 25,
      offset: 0
    })
  },
  {
    name: 'GetWormholeExtrinsicById',
    document: GetWormholeExtrinsicByIdDocument,
    getVariables: (ctx) =>
      ctx.wormholeExtrinsicId ? { id: ctx.wormholeExtrinsicId } : null
  },
  {
    name: 'GetDepositPoolStats',
    document: GetDepositPoolStatsDocument,
    getVariables: () => ({})
  }
];
