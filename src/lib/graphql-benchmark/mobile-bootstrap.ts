import {
  type ApolloClient,
  gql,
  type NormalizedCacheObject
} from '@apollo/client';

import { MOBILE_HISTORY_ACCOUNT_SAMPLE } from './mobile-account-event-query';
import {
  BENCHMARK_QUERY_TIMEOUT_MS,
  createBenchmarkQuerySignal
} from './query-signal';
import type { GraphqlBenchmarkContext } from './types';

const HISTORY_LOOKAHEAD = 21;
const WORMHOLE_PAGE = 300;
const DISCOVERY_BATCH = 20;
const NULLIFIER_BATCH = 300;

export type MobileBenchmarkLoad = {
  context: GraphqlBenchmarkContext;
  requestFailures: string[];
};

function fetchSignalContext(signal: AbortSignal) {
  return {
    context: {
      fetchOptions: { signal } as RequestInit
    }
  };
}

function throwIfAborted(signal?: AbortSignal): void {
  if (!signal?.aborted) return;
  const { reason } = signal;
  if (reason instanceof Error) throw reason;
  throw new Error(
    typeof reason === 'string' && reason.length > 0
      ? reason
      : 'benchmark aborted'
  );
}

function errorMessages(errors: unknown): string | undefined {
  if (!Array.isArray(errors) || errors.length === 0) return undefined;
  return errors
    .map((error) => {
      if (typeof error === 'object' && error !== null && 'message' in error) {
        const { message } = error as { message?: unknown };
        if (typeof message === 'string' && message.length > 0) return message;
      }
      return 'GraphQL error';
    })
    .join('; ');
}

function networkErrorOf(error: unknown): unknown {
  if (
    typeof error !== 'object' ||
    error === null ||
    !('networkError' in error)
  ) {
    return undefined;
  }
  const { networkError } = error as { networkError?: unknown };
  return networkError ?? undefined;
}

function isHttpStatusError(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    typeof (error as { statusCode?: unknown }).statusCode === 'number'
  );
}

/** Connection failures repeat on every query. HTTP and GraphQL errors do not. */
function isUnreachable(error: unknown): boolean {
  if (typeof error !== 'object' || error === null) return false;
  if (errorMessages((error as { graphQLErrors?: unknown }).graphQLErrors)) {
    return false;
  }
  const networkError = networkErrorOf(error);
  if (networkError) return !isHttpStatusError(networkError);
  return error instanceof TypeError;
}

function requestFailureText(
  error: unknown,
  timedOut: boolean,
  timeoutMs: number
): string {
  if (timedOut) return `timed out after ${timeoutMs}ms`;
  const graphqlMessage =
    typeof error === 'object' && error !== null
      ? errorMessages((error as { graphQLErrors?: unknown }).graphQLErrors)
      : undefined;
  if (graphqlMessage) return graphqlMessage;
  const networkError = networkErrorOf(error);
  if (networkError instanceof Error && networkError.message) {
    return networkError.message;
  }
  if (error instanceof Error && error.message) return error.message;
  return String(error);
}

function asString(value: unknown): string | undefined {
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}

function asNumber(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value)
    ? value
    : undefined;
}

export async function loadMobileBenchmarkContext(
  client: ApolloClient<NormalizedCacheObject>,
  options?: { timeoutMs?: number; signal?: AbortSignal }
): Promise<MobileBenchmarkLoad> {
  const ctx: GraphqlBenchmarkContext = {};
  const requestFailures: string[] = [];
  const timeoutMs = options?.timeoutMs ?? BENCHMARK_QUERY_TIMEOUT_MS;
  const parentSignal = options?.signal;
  let stopUnreachable = false;

  async function safeQuery<T>(
    label: string,
    run: (signal: AbortSignal) => Promise<T>
  ): Promise<T | undefined> {
    throwIfAborted(parentSignal);
    if (stopUnreachable) return undefined;

    const timed = createBenchmarkQuerySignal(timeoutMs, parentSignal);
    try {
      const result = await run(timed.signal);
      const resolvedErrors = errorMessages(
        (result as { errors?: unknown } | undefined)?.errors
      );
      if (resolvedErrors) requestFailures.push(`${label}: ${resolvedErrors}`);
      return result;
    } catch (error) {
      if (parentSignal?.aborted) {
        throw error instanceof Error ? error : new Error(String(error));
      }
      const timedOut = timed.signal.aborted;
      requestFailures.push(
        `${label}: ${requestFailureText(error, timedOut, timeoutMs)}`
      );
      if (!timedOut && isUnreachable(error)) stopUnreachable = true;
      return undefined;
    } finally {
      timed.cleanup();
    }
  }

  const busy = await safeQuery('BusyAccounts', (signal) =>
    client.query({
      query: gql`
        query BusyAccounts($limit: Int!) {
          account_stats(
            limit: $limit
            order_by: { total_immediate_transfers: desc }
          ) {
            id
            total_immediate_transfers
            total_mined_blocks
          }
        }
      `,
      variables: { limit: MOBILE_HISTORY_ACCOUNT_SAMPLE },
      ...fetchSignalContext(signal)
    })
  );
  const busyRows = (busy?.data?.account_stats ?? []) as Array<{
    id?: string;
    total_immediate_transfers?: unknown;
  }>;
  const walletAccountIds = busyRows
    .map((row) => row.id)
    .filter((id): id is string => Boolean(id));
  const busiest = busyRows.find((row) => row.id);
  if (busiest?.id) {
    ctx.walletAccountIds = walletAccountIds;
    ctx.busyAccountId = busiest.id;
    ctx.busyImmediateTransfers = asNumber(busiest.total_immediate_transfers);
    ctx.accountId = busiest.id;
  }

  const miner = await safeQuery('MinerAccount', (signal) =>
    client.query({
      query: gql`
        query MinerAccount {
          account_stats(limit: 1, order_by: { total_mined_blocks: desc }) {
            id
            total_mined_blocks
          }
        }
      `,
      ...fetchSignalContext(signal)
    })
  );
  const minerRow = miner?.data?.account_stats?.[0];
  if (minerRow?.id) {
    ctx.minerAccountId = minerRow.id;
    ctx.minerMinedBlocks = asNumber(minerRow.total_mined_blocks);
  }

  const discovery = await safeQuery('DiscoveryIds', (signal) =>
    client.query({
      query: gql`
        query DiscoveryIds($limit: Int!) {
          account(limit: $limit, order_by: { id: desc }) {
            id
          }
        }
      `,
      variables: { limit: DISCOVERY_BATCH },
      ...fetchSignalContext(signal)
    })
  );
  const discoveryIds = (discovery?.data?.account ?? [])
    .map((row: { id?: string }) => row.id)
    .filter((id: string | undefined): id is string => Boolean(id));
  if (discoveryIds.length > 0) {
    ctx.discoveryAccountIds = [
      ...discoveryIds.slice(0, 10),
      ...Array.from({ length: 10 }, (_, i) => `qz-bench-missing-${i}`)
    ];
  }

  if (ctx.busyAccountId) {
    const page = await safeQuery('HistoryCursor', (signal) =>
      client.query({
        query: gql`
          query HistoryCursor($accounts: [String!]!, $limit: Int!) {
            account_event(
              limit: $limit
              where: {
                _and: [
                  { account_id: { _in: $accounts } }
                  { scheduled_reversible_transfer_id: { _is_null: true } }
                ]
              }
              order_by: [{ timestamp: desc }, { id: desc }]
            ) {
              id
              timestamp
            }
          }
        `,
        variables: { accounts: [ctx.busyAccountId], limit: HISTORY_LOOKAHEAD },
        ...fetchSignalContext(signal)
      })
    );
    const rows = page?.data?.account_event ?? [];
    const cursorRow = rows[Math.min(19, rows.length - 1)];
    if (cursorRow?.id && cursorRow?.timestamp) {
      ctx.cursorId = cursorRow.id;
      ctx.cursorTimestamp = cursorRow.timestamp;
    }

    const deep = await safeQuery('HistoryDeepCursor', (signal) =>
      client.query({
        query: gql`
          query HistoryDeepCursor($accounts: [String!]!) {
            account_event(
              limit: 1
              offset: 2000
              where: {
                _and: [
                  { account_id: { _in: $accounts } }
                  { scheduled_reversible_transfer_id: { _is_null: true } }
                ]
              }
              order_by: [{ timestamp: desc }, { id: desc }]
            ) {
              id
              timestamp
            }
          }
        `,
        variables: { accounts: [ctx.busyAccountId] },
        ...fetchSignalContext(signal)
      })
    );
    const deepRow = deep?.data?.account_event?.[0];
    if (deepRow?.id && deepRow?.timestamp) {
      ctx.deepCursorId = deepRow.id;
      ctx.deepCursorTimestamp = deepRow.timestamp;
    }
  }

  if (ctx.minerAccountId) {
    const page = await safeQuery('MinerHistoryCursor', (signal) =>
      client.query({
        query: gql`
          query MinerHistoryCursor($accounts: [String!]!, $limit: Int!) {
            account_event(
              limit: $limit
              where: {
                _and: [
                  { account_id: { _in: $accounts } }
                  { scheduled_reversible_transfer_id: { _is_null: true } }
                ]
              }
              order_by: [{ timestamp: desc }, { id: desc }]
            ) {
              id
              timestamp
            }
          }
        `,
        variables: {
          accounts: [ctx.minerAccountId],
          limit: HISTORY_LOOKAHEAD
        },
        ...fetchSignalContext(signal)
      })
    );
    const rows = page?.data?.account_event ?? [];
    const cursorRow = rows[Math.min(19, rows.length - 1)];
    if (cursorRow?.id && cursorRow?.timestamp) {
      ctx.minerCursorId = cursorRow.id;
      ctx.minerCursorTimestamp = cursorRow.timestamp;
    }
  }

  const transfer = await safeQuery('SampleTransfer', (signal) =>
    client.query({
      query: gql`
        query SampleTransfer {
          transfer(
            limit: 1
            where: { extrinsic_id: { _is_null: false } }
            order_by: { timestamp: desc }
          ) {
            from_id
            to_id
            amount
            block_height
            extrinsic {
              id
            }
          }
        }
      `,
      ...fetchSignalContext(signal)
    })
  );
  const tx = transfer?.data?.transfer?.[0];
  if (tx) {
    ctx.pendingFrom = asString(tx.from_id);
    ctx.pendingTo = asString(tx.to_id);
    ctx.pendingAmount = tx.amount != null ? String(tx.amount) : undefined;
    ctx.pendingBlockHeight = asNumber(tx.block_height);
    ctx.extrinsicHash = asString(tx.extrinsic?.id);
  }

  const scheduled = await safeQuery('SampleScheduled', (signal) =>
    client.query({
      query: gql`
        query SampleScheduled {
          scheduled_reversible_transfer(
            limit: 1
            order_by: { timestamp: desc }
          ) {
            from {
              id
            }
            to {
              id
            }
            amount
            block {
              height
            }
            extrinsic {
              id
            }
          }
        }
      `,
      ...fetchSignalContext(signal)
    })
  );
  const sched = scheduled?.data?.scheduled_reversible_transfer?.[0];
  if (sched) {
    ctx.pendingReversibleFrom = asString(sched.from?.id);
    ctx.pendingReversibleTo = asString(sched.to?.id);
    ctx.pendingReversibleAmount =
      sched.amount != null ? String(sched.amount) : undefined;
    ctx.pendingReversibleBlockHeight = asNumber(sched.block?.height);
    ctx.scheduledExtrinsicHash = asString(sched.extrinsic?.id);
  }

  const executed = await safeQuery('SampleExecuted', (signal) =>
    client.query({
      query: gql`
        query SampleExecuted {
          executed_reversible_transfer(
            limit: 1
            order_by: { timestamp: desc }
          ) {
            tx_id
          }
        }
      `,
      ...fetchSignalContext(signal)
    })
  );
  ctx.executedTxId = asString(
    executed?.data?.executed_reversible_transfer?.[0]?.tx_id
  );

  const wormhole = await safeQuery('SampleWormholeRecipient', (signal) =>
    client.query({
      query: gql`
        query SampleWormholeRecipient {
          transfer(
            limit: 1
            where: { leaf_index: { _gt: "0" } }
            order_by: { transfer_count: desc }
          ) {
            to_id
          }
        }
      `,
      ...fetchSignalContext(signal)
    })
  );
  ctx.wormholeToId = asString(wormhole?.data?.transfer?.[0]?.to_id);

  if (ctx.wormholeToId) {
    const page = await safeQuery('WormholeCursor', (signal) =>
      client.query({
        query: gql`
          query WormholeCursor($tos: [String!]!, $limit: Int!) {
            transfer(
              where: { to_id: { _in: $tos }, block_height: { _gt: 0 } }
              order_by: [{ block_height: asc }, { id: asc }]
              limit: $limit
            ) {
              id
              block_height
            }
          }
        `,
        variables: { tos: [ctx.wormholeToId], limit: WORMHOLE_PAGE },
        ...fetchSignalContext(signal)
      })
    );
    const rows = page?.data?.transfer ?? [];
    const last = rows[rows.length - 1];
    if (last?.id) {
      ctx.wormholeCursorId = last.id;
      ctx.wormholeCursorHeight = asNumber(last.block_height);
    }
  }

  const nullifiers = await safeQuery('SampleNullifiers', (signal) =>
    client.query({
      query: gql`
        query SampleNullifiers($limit: Int!) {
          wormhole_nullifier(limit: $limit, order_by: { timestamp: desc }) {
            nullifier_hash
          }
        }
      `,
      variables: { limit: NULLIFIER_BATCH },
      ...fetchSignalContext(signal)
    })
  );
  const hashes = (nullifiers?.data?.wormhole_nullifier ?? [])
    .map((row: { nullifier_hash?: string }) => row.nullifier_hash)
    .filter((hash: string | undefined): hash is string => Boolean(hash));
  if (hashes.length > 0) {
    ctx.nullifierHashes = hashes;
  }

  const multisig = await safeQuery('SampleMultisig', (signal) =>
    client.query({
      query: gql`
        query SampleMultisig {
          multisig(limit: 1, order_by: { timestamp: desc }) {
            id
            signers
          }
        }
      `,
      ...fetchSignalContext(signal)
    })
  );
  const ms = multisig?.data?.multisig?.[0];
  if (ms?.id) {
    ctx.multisigId = ms.id;
    ctx.multisigSignerIds = Array.isArray(ms.signers)
      ? ms.signers.filter((id: unknown): id is string => typeof id === 'string')
      : [];
  }

  const proposal = await safeQuery('SampleProposal', (signal) =>
    client.query({
      query: gql`
        query SampleProposal {
          multisig_proposal(limit: 1, order_by: { updated_at: desc }) {
            proposal_id
            multisig_id
          }
        }
      `,
      ...fetchSignalContext(signal)
    })
  );
  const pr = proposal?.data?.multisig_proposal?.[0];
  if (pr?.multisig_id) {
    ctx.multisigId = ctx.multisigId ?? pr.multisig_id;
    ctx.proposalId = asNumber(pr.proposal_id);
  }

  const created = await safeQuery('SampleProposalCreated', (signal) =>
    client.query({
      query: gql`
        query SampleProposalCreated {
          multisig_proposal_created(limit: 1, order_by: { timestamp: desc }) {
            extrinsic {
              id
            }
          }
        }
      `,
      ...fetchSignalContext(signal)
    })
  );
  ctx.proposalCreatedHash = asString(
    created?.data?.multisig_proposal_created?.[0]?.extrinsic?.id
  );

  const approved = await safeQuery('SampleSignerApproved', (signal) =>
    client.query({
      query: gql`
        query SampleSignerApproved {
          multisig_signer_approved(limit: 1, order_by: { timestamp: desc }) {
            extrinsic {
              id
            }
          }
        }
      `,
      ...fetchSignalContext(signal)
    })
  );
  ctx.signerApprovedHash = asString(
    approved?.data?.multisig_signer_approved?.[0]?.extrinsic?.id
  );

  const executedMs = await safeQuery('SampleProposalExecuted', (signal) =>
    client.query({
      query: gql`
        query SampleProposalExecuted {
          executed_multisig_proposal(limit: 1, order_by: { timestamp: desc }) {
            extrinsic {
              id
            }
          }
        }
      `,
      ...fetchSignalContext(signal)
    })
  );
  ctx.executedProposalHash = asString(
    executedMs?.data?.executed_multisig_proposal?.[0]?.extrinsic?.id
  );

  const cancelled = await safeQuery('SampleProposalCancelled', (signal) =>
    client.query({
      query: gql`
        query SampleProposalCancelled {
          cancelled_multisig_proposal(limit: 1, order_by: { timestamp: desc }) {
            extrinsic {
              id
            }
          }
        }
      `,
      ...fetchSignalContext(signal)
    })
  );
  ctx.cancelledProposalHash = asString(
    cancelled?.data?.cancelled_multisig_proposal?.[0]?.extrinsic?.id
  );

  return { context: ctx, requestFailures };
}
