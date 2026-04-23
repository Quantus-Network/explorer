import type { ApolloClient, NormalizedCacheObject } from '@apollo/client';

import {
  AccountOrderByInput,
  BlockOrderByInput,
  CancelledReversibleTransferOrderByInput,
  ErrorEventOrderByInput,
  ExecutedReversibleTransferOrderByInput,
  GetAccountsDocument,
  GetBlockByIdDocument,
  GetCancelledReversibleTransactionsDocument,
  GetErrorEventsDocument,
  GetExecutedReversibleTransactionsDocument,
  GetHighSecuritySetsDocument,
  GetRecentBlocksDocument,
  GetRecentMinerRewardsDocument,
  GetRecentTransactionsDocument,
  GetScheduledReversibleTransactionsDocument,
  GetWormholeExtrinsicsDocument,
  HighSecuritySetOrderByInput,
  MinerRewardOrderByInput,
  ScheduledReversibleTransferOrderByInput,
  TransferOrderByInput,
  WormholeExtrinsicOrderByInput
} from '@/__generated__/graphql';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import { QUERY_UNIFIED_LIMIT } from '@/constants/query-unified-limit';

import type { GraphqlBenchmarkContext } from './types';

async function safeQuery<T>(run: () => Promise<T>): Promise<T | undefined> {
  try {
    return await run();
  } catch {
    return undefined;
  }
}

export async function loadGraphqlBenchmarkContext(
  client: ApolloClient<NormalizedCacheObject>
): Promise<GraphqlBenchmarkContext> {
  const ctx: GraphqlBenchmarkContext = {};

  const blocks = await safeQuery(() =>
    client.query({
      query: GetRecentBlocksDocument,
      variables: {
        orderBy: BlockOrderByInput.TimestampDesc,
        limit: 1,
        offset: 0
      }
    })
  );
  const firstBlock = blocks?.data?.blocks?.[0];
  if (firstBlock) {
    ctx.blockHeight = firstBlock.height;
    ctx.blockHash = firstBlock.hash;
  }

  const accounts = await safeQuery(() =>
    client.query({
      query: GetAccountsDocument,
      variables: {
        orderBy: AccountOrderByInput.IdAsc,
        limit: 1,
        offset: 0
      }
    })
  );
  const firstAccount = accounts?.data?.accounts?.[0];
  if (firstAccount) {
    ctx.accountId = firstAccount.id;
  }

  const transfers = await safeQuery(() =>
    client.query({
      query: GetRecentTransactionsDocument,
      variables: {
        orderBy: TransferOrderByInput.TimestampDesc,
        limit: 1,
        offset: 0,
        where: { extrinsic_isNull: false }
      }
    })
  );
  const firstTx = transfers?.data?.transactions?.[0];
  if (firstTx?.extrinsic?.id) {
    ctx.extrinsicHash = firstTx.extrinsic.id;
  }

  const scheduled = await safeQuery(() =>
    client.query({
      query: GetScheduledReversibleTransactionsDocument,
      variables: {
        orderBy: ScheduledReversibleTransferOrderByInput.TimestampDesc,
        limit: 1,
        offset: 0
      }
    })
  );
  const firstSched = scheduled?.data?.scheduledReversibleTransactions?.[0];
  if (firstSched?.txId) {
    ctx.scheduledTxId = firstSched.txId;
  }

  const executed = await safeQuery(() =>
    client.query({
      query: GetExecutedReversibleTransactionsDocument,
      variables: {
        orderBy: ExecutedReversibleTransferOrderByInput.TimestampDesc,
        limit: 1,
        offset: 0
      }
    })
  );
  const firstEx = executed?.data?.executedReversibleTransactions?.[0];
  if (firstEx?.txId) {
    ctx.executedTxId = firstEx.txId;
  }

  const cancelled = await safeQuery(() =>
    client.query({
      query: GetCancelledReversibleTransactionsDocument,
      variables: {
        orderBy: CancelledReversibleTransferOrderByInput.TimestampDesc,
        limit: 1,
        offset: 0
      }
    })
  );
  const firstCanc = cancelled?.data?.cancelledReversibleTransactions?.[0];
  if (firstCanc?.txId) {
    ctx.cancelledTxId = firstCanc.txId;
  }

  const worm = await safeQuery(() =>
    client.query({
      query: GetWormholeExtrinsicsDocument,
      variables: {
        orderBy: [WormholeExtrinsicOrderByInput.TimestampDesc],
        limit: 1,
        offset: 0
      }
    })
  );
  const firstWorm = worm?.data?.wormholeExtrinsics?.[0];
  if (firstWorm?.id) {
    ctx.wormholeExtrinsicId = firstWorm.id;
  }

  const errEvents = await safeQuery(() =>
    client.query({
      query: GetErrorEventsDocument,
      variables: {
        orderBy: ErrorEventOrderByInput.TimestampDesc,
        limit: QUERY_DEFAULT_LIMIT,
        offset: 0
      }
    })
  );
  const errWithEx = errEvents?.data?.errorEvents?.find((e) => e.extrinsic?.id);
  if (errWithEx?.extrinsic?.id) {
    ctx.errorExtrinsicHash = errWithEx.extrinsic.id;
  }

  const hss = await safeQuery(() =>
    client.query({
      query: GetHighSecuritySetsDocument,
      variables: {
        orderBy: HighSecuritySetOrderByInput.TimestampDesc,
        limit: QUERY_DEFAULT_LIMIT,
        offset: 0
      }
    })
  );
  const hssWithEx = hss?.data?.highSecuritySets?.find((h) => h.extrinsic?.id);
  if (hssWithEx?.extrinsic?.id) {
    ctx.highSecurityExtrinsicHash = hssWithEx.extrinsic.id;
  }

  const miners = await safeQuery(() =>
    client.query({
      query: GetRecentMinerRewardsDocument,
      variables: {
        orderBy: MinerRewardOrderByInput.TimestampDesc,
        limit: 1
      }
    })
  );
  const firstMr = miners?.data?.minerRewards?.[0];
  if (firstMr?.block?.hash) {
    ctx.minerBlockHash = firstMr.block.hash;
  }

  const sampleHeight = ctx.blockHeight;
  const sampleHash = ctx.blockHash;
  if (sampleHeight != null && sampleHash != null) {
    const blockDetail = await safeQuery(() =>
      client.query({
        query: GetBlockByIdDocument,
        variables: {
          height: sampleHeight,
          hash: sampleHash,
          limit: QUERY_UNIFIED_LIMIT
        }
      })
    );
    const r = blockDetail?.data;
    if (r) {
      if (!ctx.scheduledTxId) {
        const id = r.scheduledReversibleTransactions?.edges?.[0]?.node?.txId;
        if (id) {
          ctx.scheduledTxId = id;
        }
      }
      if (!ctx.executedTxId) {
        const id = r.executedReversibleTransactions?.edges?.[0]?.node?.txId;
        if (id) {
          ctx.executedTxId = id;
        }
      }
      if (!ctx.cancelledTxId) {
        const id = r.cancelledReversibleTransactions?.edges?.[0]?.node?.txId;
        if (id) {
          ctx.cancelledTxId = id;
        }
      }
      if (!ctx.errorExtrinsicHash) {
        const h = r.errorEvents?.edges?.[0]?.node?.extrinsic?.id;
        if (h) {
          ctx.errorExtrinsicHash = h;
        }
      }
      if (!ctx.highSecurityExtrinsicHash) {
        const h = r.highSecuritySets?.edges?.[0]?.node?.extrinsic?.id;
        if (h) {
          ctx.highSecurityExtrinsicHash = h;
        }
      }
    }
  }

  return ctx;
}
