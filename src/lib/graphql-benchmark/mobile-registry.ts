import type {
  GraphqlBenchmarkContext,
  GraphqlBenchmarkRegistryEntry
} from './types';
import {
  AccountEventsAllAfterDocument,
  AccountEventsAllDocument,
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

const HISTORY_LIMIT = 21;
const WORMHOLE_LIMIT = 300;

function pendingSinceIso() {
  return new Date(Date.now() - 2 * 60 * 1000).toISOString();
}

function historyVars(
  accountId: string | undefined,
  cursor?: { timestamp?: string; id?: string }
): Record<string, unknown> | null {
  if (!accountId) return null;
  return {
    accounts: [accountId],
    limit: HISTORY_LIMIT,
    ...(cursor?.timestamp && cursor.id
      ? { cursorTimestamp: cursor.timestamp, cursorId: cursor.id }
      : {})
  };
}

function scheduledVars(
  accountId: string | undefined,
  cursor?: { timestamp?: string; id?: string }
): Record<string, unknown> | null {
  const base = historyVars(accountId, cursor);
  if (!base) return null;
  return { ...base, after: pendingSinceIso() };
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
    historyVars(ctx.busyAccountId)
  ),
  entry('AccountEvents.send', 'history', AccountEventsSendDocument, (ctx) =>
    historyVars(ctx.busyAccountId)
  ),
  entry(
    'AccountEvents.receive',
    'history',
    AccountEventsReceiveDocument,
    (ctx) => historyVars(ctx.busyAccountId)
  ),
  entry(
    'AccountEvents.all.after',
    'history',
    AccountEventsAllAfterDocument,
    (ctx) =>
      historyVars(ctx.busyAccountId, {
        timestamp: ctx.cursorTimestamp,
        id: ctx.cursorId
      })
  ),
  entry(
    'AccountEvents.send.after',
    'history',
    AccountEventsSendAfterDocument,
    (ctx) =>
      historyVars(ctx.busyAccountId, {
        timestamp: ctx.cursorTimestamp,
        id: ctx.cursorId
      })
  ),
  entry(
    'AccountEvents.receive.after',
    'history',
    AccountEventsReceiveAfterDocument,
    (ctx) =>
      historyVars(ctx.busyAccountId, {
        timestamp: ctx.cursorTimestamp,
        id: ctx.cursorId
      })
  ),
  entry('AccountEvents.all.miner', 'history', AccountEventsAllDocument, (ctx) =>
    historyVars(ctx.minerAccountId)
  ),
  entry(
    'AccountEvents.receive.miner',
    'history',
    AccountEventsReceiveDocument,
    (ctx) => historyVars(ctx.minerAccountId)
  ),
  entry(
    'AccountEvents.all.miner.after',
    'history',
    AccountEventsAllAfterDocument,
    (ctx) =>
      historyVars(ctx.minerAccountId, {
        timestamp: ctx.minerCursorTimestamp,
        id: ctx.minerCursorId
      })
  ),
  entry(
    'AccountEvents.all.deep',
    'history',
    AccountEventsAllAfterDocument,
    (ctx) =>
      historyVars(ctx.busyAccountId, {
        timestamp: ctx.deepCursorTimestamp,
        id: ctx.deepCursorId
      })
  ),

  entry(
    'ScheduledReversible.all',
    'history',
    ScheduledReversibleAllDocument,
    (ctx) => scheduledVars(ctx.busyAccountId)
  ),
  entry(
    'ScheduledReversible.send',
    'history',
    ScheduledReversibleSendDocument,
    (ctx) => scheduledVars(ctx.busyAccountId)
  ),
  entry(
    'ScheduledReversible.receive',
    'history',
    ScheduledReversibleReceiveDocument,
    (ctx) => scheduledVars(ctx.busyAccountId)
  ),
  entry(
    'ScheduledReversible.all.after',
    'history',
    ScheduledReversibleAllAfterDocument,
    (ctx) =>
      scheduledVars(ctx.busyAccountId, {
        timestamp: ctx.cursorTimestamp,
        id: ctx.cursorId
      })
  ),

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
