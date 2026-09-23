import {
  accountEventPageVariables,
  MOBILE_HISTORY_FANOUT_COUNTS
} from './mobile-account-event-query';
import {
  AccountEventsAllAfterDocument,
  AccountEventsAllDocument,
  accountEventsDocument,
  AccountEventsReceiveAfterDocument,
  AccountEventsReceiveDocument,
  AccountEventsSendAfterDocument,
  AccountEventsSendDocument,
  AccountsQueryDocument,
  DiscoverMultisigsDocument,
  ExecutedReversibleTransferByTxIdDocument,
  LegacyAccountEventsAllDocument,
  LegacyAccountEventsSendDocument,
  LegacyTransfersToAddressesDocument,
  MultisigByPkDocument,
  MultisigOpenProposalsDocument,
  MultisigPastProposalsDocument,
  MultisigProposalDocument,
  ScheduledReversibleAllAfterDocument,
  ScheduledReversibleAllDocument,
  scheduledReversibleDocument,
  ScheduledReversibleReceiveDocument,
  ScheduledReversibleSendDocument,
  SearchByExtrinsicHashReversibleDocument,
  SearchByExtrinsicHashTransferDocument,
  SearchCancelledByExtrinsicHashDocument,
  SearchExecutedByExtrinsicHashDocument,
  SearchPendingReversibleDocument,
  SearchPendingTransferDocument,
  SearchPendingTransferScalarsDocument,
  SearchProposalCreatedByExtrinsicHashDocument,
  SearchSignerApprovedByExtrinsicHashDocument,
  SpentNullifiersDocument,
  TestnetStatsDocument,
  TransfersToAddressesAfterDocument,
  TransfersToAddressesDocument
} from './mobile-queries';
import type {
  GraphqlBenchmarkContext,
  GraphqlBenchmarkRegistryEntry
} from './types';

const HISTORY_LIMIT = 21;
const WORMHOLE_LIMIT = 300;

function pendingSinceIso() {
  return new Date(Date.now() - 2 * 60 * 1000).toISOString();
}

function oneAccount(accountId: string | undefined): string[] | undefined {
  return accountId ? [accountId] : undefined;
}

function historyVars(
  accountIds: string[] | undefined,
  cursor?: { timestamp?: string; id?: string }
): Record<string, unknown> | null {
  if (!accountIds?.length) return null;
  const timestamp = cursor?.timestamp;
  const id = cursor?.id;
  return accountEventPageVariables({
    accountIds,
    limit: HISTORY_LIMIT,
    ...(timestamp && id ? { cursor: { timestamp, id } } : {})
  });
}

function scheduledVars(
  accountIds: string[] | undefined,
  cursor?: { timestamp?: string; id?: string }
): Record<string, unknown> | null {
  const base = historyVars(accountIds, cursor);
  if (!base) return null;
  return { ...base, after: pendingSinceIso() };
}

type HistoryFilter = 'all' | 'send' | 'receive';

const FANOUT_SPECS: Array<{
  name: string;
  filter: HistoryFilter;
  withCursor: boolean;
  scheduled: boolean;
}> = [
  {
    name: 'AccountEvents.all',
    filter: 'all',
    withCursor: false,
    scheduled: false
  },
  {
    name: 'AccountEvents.send',
    filter: 'send',
    withCursor: false,
    scheduled: false
  },
  {
    name: 'AccountEvents.receive',
    filter: 'receive',
    withCursor: false,
    scheduled: false
  },
  {
    name: 'AccountEvents.all.after',
    filter: 'all',
    withCursor: true,
    scheduled: false
  },
  {
    name: 'ScheduledReversible.all',
    filter: 'all',
    withCursor: false,
    scheduled: true
  },
  {
    name: 'ScheduledReversible.send',
    filter: 'send',
    withCursor: false,
    scheduled: true
  },
  {
    name: 'ScheduledReversible.receive',
    filter: 'receive',
    withCursor: false,
    scheduled: true
  },
  {
    name: 'ScheduledReversible.all.after',
    filter: 'all',
    withCursor: true,
    scheduled: true
  }
];

function fanoutHistoryEntries(): GraphqlBenchmarkRegistryEntry[] {
  return MOBILE_HISTORY_FANOUT_COUNTS.flatMap((count) =>
    FANOUT_SPECS.map((spec) => {
      const document = spec.scheduled
        ? scheduledReversibleDocument(spec.filter, spec.withCursor, count)
        : accountEventsDocument(spec.filter, spec.withCursor, count);
      return entry(`${spec.name}.n${count}`, 'history', document, (ctx) => {
        const ids = ctx.walletAccountIds;
        if (!ids || ids.length < count) return null;
        const accounts = ids.slice(0, count);
        const cursor = spec.withCursor
          ? { timestamp: ctx.cursorTimestamp, id: ctx.cursorId }
          : undefined;
        return spec.scheduled
          ? scheduledVars(accounts, cursor)
          : historyVars(accounts, cursor);
      });
    })
  );
}

function discoverWhere(accountIds: string[]) {
  if (accountIds.length === 1) {
    return { signers: { _contains: [accountIds[0]] } };
  }
  return {
    _or: accountIds.map((id) => ({ signers: { _contains: [id] } }))
  };
}

function entry(
  name: string,
  group: string,
  document: GraphqlBenchmarkRegistryEntry['document'],
  getVariables: GraphqlBenchmarkRegistryEntry['getVariables']
): GraphqlBenchmarkRegistryEntry {
  return { name, group, document, getVariables };
}

export const mobileGraphqlBenchmarkRegistry: GraphqlBenchmarkRegistryEntry[] = [
  entry('AccountsQuery', 'discovery', AccountsQueryDocument, (ctx) =>
    ctx.discoveryAccountIds ? { ids: ctx.discoveryAccountIds } : null
  ),
  entry('TestnetStats', 'discovery', TestnetStatsDocument, (ctx) =>
    ctx.discoveryAccountIds ? { ids: ctx.discoveryAccountIds } : null
  ),

  entry('AccountEvents.all', 'history', AccountEventsAllDocument, (ctx) =>
    historyVars(oneAccount(ctx.busyAccountId))
  ),
  entry('AccountEvents.send', 'history', AccountEventsSendDocument, (ctx) =>
    historyVars(oneAccount(ctx.busyAccountId))
  ),
  entry(
    'AccountEvents.receive',
    'history',
    AccountEventsReceiveDocument,
    (ctx) => historyVars(oneAccount(ctx.busyAccountId))
  ),
  entry(
    'AccountEvents.all.after',
    'history',
    AccountEventsAllAfterDocument,
    (ctx) =>
      historyVars(oneAccount(ctx.busyAccountId), {
        timestamp: ctx.cursorTimestamp,
        id: ctx.cursorId
      })
  ),
  entry(
    'AccountEvents.send.after',
    'history',
    AccountEventsSendAfterDocument,
    (ctx) =>
      historyVars(oneAccount(ctx.busyAccountId), {
        timestamp: ctx.cursorTimestamp,
        id: ctx.cursorId
      })
  ),
  entry(
    'AccountEvents.receive.after',
    'history',
    AccountEventsReceiveAfterDocument,
    (ctx) =>
      historyVars(oneAccount(ctx.busyAccountId), {
        timestamp: ctx.cursorTimestamp,
        id: ctx.cursorId
      })
  ),
  entry('AccountEvents.all.miner', 'history', AccountEventsAllDocument, (ctx) =>
    historyVars(oneAccount(ctx.minerAccountId))
  ),
  entry(
    'AccountEvents.receive.miner',
    'history',
    AccountEventsReceiveDocument,
    (ctx) => historyVars(oneAccount(ctx.minerAccountId))
  ),
  entry(
    'AccountEvents.all.miner.after',
    'history',
    AccountEventsAllAfterDocument,
    (ctx) =>
      historyVars(oneAccount(ctx.minerAccountId), {
        timestamp: ctx.minerCursorTimestamp,
        id: ctx.minerCursorId
      })
  ),
  entry(
    'AccountEvents.all.deep',
    'history',
    AccountEventsAllAfterDocument,
    (ctx) =>
      historyVars(oneAccount(ctx.busyAccountId), {
        timestamp: ctx.deepCursorTimestamp,
        id: ctx.deepCursorId
      })
  ),

  entry(
    'ScheduledReversible.all',
    'history',
    ScheduledReversibleAllDocument,
    (ctx) => scheduledVars(oneAccount(ctx.busyAccountId))
  ),
  entry(
    'ScheduledReversible.send',
    'history',
    ScheduledReversibleSendDocument,
    (ctx) => scheduledVars(oneAccount(ctx.busyAccountId))
  ),
  entry(
    'ScheduledReversible.receive',
    'history',
    ScheduledReversibleReceiveDocument,
    (ctx) => scheduledVars(oneAccount(ctx.busyAccountId))
  ),
  entry(
    'ScheduledReversible.all.after',
    'history',
    ScheduledReversibleAllAfterDocument,
    (ctx) =>
      scheduledVars(oneAccount(ctx.busyAccountId), {
        timestamp: ctx.cursorTimestamp,
        id: ctx.cursorId
      })
  ),

  ...fanoutHistoryEntries(),

  entry(
    'ExecutedReversibleByTxId',
    'search',
    ExecutedReversibleTransferByTxIdDocument,
    (ctx) => (ctx.executedTxId ? { txId: ctx.executedTxId } : null)
  ),
  entry(
    'SearchPending.transfer',
    'search',
    SearchPendingTransferDocument,
    (ctx) =>
      ctx.pendingFrom &&
      ctx.pendingTo &&
      ctx.pendingAmount != null &&
      ctx.pendingBlockHeight != null
        ? {
            from: ctx.pendingFrom,
            to: ctx.pendingTo,
            amount: ctx.pendingAmount,
            blockHeightAfter: Math.max(0, ctx.pendingBlockHeight - 1)
          }
        : null
  ),
  entry(
    'ALT.SearchPending.transfer.scalars',
    'search',
    SearchPendingTransferScalarsDocument,
    (ctx) =>
      ctx.pendingFrom &&
      ctx.pendingTo &&
      ctx.pendingAmount != null &&
      ctx.pendingBlockHeight != null
        ? {
            from: ctx.pendingFrom,
            to: ctx.pendingTo,
            amount: ctx.pendingAmount,
            blockHeightAfter: Math.max(0, ctx.pendingBlockHeight - 1)
          }
        : null
  ),
  entry(
    'SearchPending.reversible',
    'search',
    SearchPendingReversibleDocument,
    (ctx) =>
      ctx.pendingReversibleFrom &&
      ctx.pendingReversibleTo &&
      ctx.pendingReversibleAmount != null &&
      ctx.pendingReversibleBlockHeight != null
        ? {
            from: ctx.pendingReversibleFrom,
            to: ctx.pendingReversibleTo,
            amount: ctx.pendingReversibleAmount,
            blockHeightAfter: Math.max(0, ctx.pendingReversibleBlockHeight - 1)
          }
        : null
  ),
  entry(
    'SearchByExtrinsicHash.transfer',
    'search',
    SearchByExtrinsicHashTransferDocument,
    (ctx) => (ctx.extrinsicHash ? { extrinsicHash: ctx.extrinsicHash } : null)
  ),
  entry(
    'SearchByExtrinsicHash.reversible',
    'search',
    SearchByExtrinsicHashReversibleDocument,
    (ctx) =>
      ctx.scheduledExtrinsicHash
        ? { extrinsicHash: ctx.scheduledExtrinsicHash }
        : null
  ),
  entry(
    'SearchProposalCreatedByHash',
    'search',
    SearchProposalCreatedByExtrinsicHashDocument,
    (ctx) =>
      ctx.proposalCreatedHash
        ? { extrinsicHash: ctx.proposalCreatedHash }
        : null
  ),
  entry(
    'SearchSignerApprovedByHash',
    'search',
    SearchSignerApprovedByExtrinsicHashDocument,
    (ctx) =>
      ctx.signerApprovedHash ? { extrinsicHash: ctx.signerApprovedHash } : null
  ),
  entry(
    'SearchExecutedByHash',
    'search',
    SearchExecutedByExtrinsicHashDocument,
    (ctx) =>
      ctx.executedProposalHash
        ? { extrinsicHash: ctx.executedProposalHash }
        : null
  ),
  entry(
    'SearchCancelledByHash',
    'search',
    SearchCancelledByExtrinsicHashDocument,
    (ctx) =>
      ctx.cancelledProposalHash
        ? { extrinsicHash: ctx.cancelledProposalHash }
        : null
  ),

  entry(
    'TransfersToAddresses',
    'wormhole',
    TransfersToAddressesDocument,
    (ctx) =>
      ctx.wormholeToId
        ? { tos: [ctx.wormholeToId], limit: WORMHOLE_LIMIT, afterBlock: 0 }
        : null
  ),
  entry(
    'TransfersToAddresses.after',
    'wormhole',
    TransfersToAddressesAfterDocument,
    (ctx) =>
      ctx.wormholeToId &&
      ctx.wormholeCursorHeight != null &&
      ctx.wormholeCursorId
        ? {
            tos: [ctx.wormholeToId],
            limit: WORMHOLE_LIMIT,
            cursorHeight: ctx.wormholeCursorHeight,
            cursorId: ctx.wormholeCursorId
          }
        : null
  ),
  entry('SpentNullifiers', 'wormhole', SpentNullifiersDocument, (ctx) =>
    ctx.nullifierHashes ? { hashes: ctx.nullifierHashes } : null
  ),

  entry('MultisigByPk', 'multisig', MultisigByPkDocument, (ctx) =>
    ctx.multisigId ? { id: ctx.multisigId } : null
  ),
  entry(
    'DiscoverMultisigs.one',
    'multisig',
    DiscoverMultisigsDocument,
    (ctx) => {
      const id = ctx.multisigSignerIds?.[0];
      return id ? { where: discoverWhere([id]) } : null;
    }
  ),
  entry(
    'DiscoverMultisigs.many',
    'multisig',
    DiscoverMultisigsDocument,
    (ctx) => {
      const ids = ctx.multisigSignerIds?.slice(0, 3);
      return ids && ids.length > 0 ? { where: discoverWhere(ids) } : null;
    }
  ),
  entry(
    'MultisigOpenProposals',
    'multisig',
    MultisigOpenProposalsDocument,
    (ctx) => (ctx.multisigId ? { multisigId: ctx.multisigId } : null)
  ),
  entry(
    'MultisigPastProposals',
    'multisig',
    MultisigPastProposalsDocument,
    (ctx) => (ctx.multisigId ? { multisigId: ctx.multisigId } : null)
  ),
  entry('MultisigProposal', 'multisig', MultisigProposalDocument, (ctx) =>
    ctx.multisigId && ctx.proposalId != null
      ? { multisigId: ctx.multisigId, proposalId: ctx.proposalId }
      : null
  ),

  entry(
    'LEGACY.AccountEvents.all',
    'legacy',
    LegacyAccountEventsAllDocument,
    (ctx) =>
      ctx.busyAccountId
        ? { accounts: [ctx.busyAccountId], limit: HISTORY_LIMIT, offset: 0 }
        : null
  ),
  entry(
    'LEGACY.AccountEvents.all.offset20',
    'legacy',
    LegacyAccountEventsAllDocument,
    (ctx) =>
      ctx.busyAccountId
        ? { accounts: [ctx.busyAccountId], limit: HISTORY_LIMIT, offset: 20 }
        : null
  ),
  entry(
    'LEGACY.AccountEvents.all.offset2000',
    'legacy',
    LegacyAccountEventsAllDocument,
    (ctx) =>
      ctx.busyAccountId
        ? { accounts: [ctx.busyAccountId], limit: HISTORY_LIMIT, offset: 2000 }
        : null
  ),
  entry(
    'LEGACY.AccountEvents.send',
    'legacy',
    LegacyAccountEventsSendDocument,
    (ctx) =>
      ctx.busyAccountId
        ? { accounts: [ctx.busyAccountId], limit: HISTORY_LIMIT, offset: 0 }
        : null
  ),
  entry(
    'LEGACY.AccountEvents.all.miner',
    'legacy',
    LegacyAccountEventsAllDocument,
    (ctx) =>
      ctx.minerAccountId
        ? { accounts: [ctx.minerAccountId], limit: HISTORY_LIMIT, offset: 0 }
        : null
  ),
  entry(
    'LEGACY.TransfersToAddresses',
    'legacy',
    LegacyTransfersToAddressesDocument,
    (ctx) =>
      ctx.wormholeToId
        ? {
            tos: [ctx.wormholeToId],
            limit: WORMHOLE_LIMIT,
            offset: 0,
            afterBlock: 0
          }
        : null
  ),
  entry(
    'LEGACY.TransfersToAddresses.offset300',
    'legacy',
    LegacyTransfersToAddressesDocument,
    (ctx) =>
      ctx.wormholeToId
        ? {
            tos: [ctx.wormholeToId],
            limit: WORMHOLE_LIMIT,
            offset: 300,
            afterBlock: 0
          }
        : null
  )
];

export function describeMobileContext(ctx: GraphqlBenchmarkContext) {
  return {
    busyAccountId: ctx.busyAccountId,
    busyImmediateTransfers: ctx.busyImmediateTransfers,
    minerAccountId: ctx.minerAccountId,
    minerMinedBlocks: ctx.minerMinedBlocks,
    deepCursorId: ctx.deepCursorId,
    wormholeToId: ctx.wormholeToId,
    multisigId: ctx.multisigId
  };
}
