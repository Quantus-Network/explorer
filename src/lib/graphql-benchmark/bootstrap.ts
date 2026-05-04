import type { ApolloClient, NormalizedCacheObject } from '@apollo/client';

import {
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
  Order_By
} from '@/__generated__/graphql';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';

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
        orderBy: { timestamp: Order_By.Desc },
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
        orderBy: { id: Order_By.Asc },
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
        orderBy: { timestamp: Order_By.Desc },
        limit: 1,
        offset: 0,
        where: { extrinsic_id: { _is_null: false } }
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
        orderBy: { timestamp: Order_By.Desc },
        limit: 1,
        offset: 0
      }
    })
  );
  const firstSched = scheduled?.data?.scheduledReversibleTransactions?.[0];
  if (firstSched?.tx_id) {
    ctx.scheduledTxId = firstSched.tx_id;
  }

  const executed = await safeQuery(() =>
    client.query({
      query: GetExecutedReversibleTransactionsDocument,
      variables: {
        orderBy: { timestamp: Order_By.Desc },
        limit: 1,
        offset: 0
      }
    })
  );
  const firstEx = executed?.data?.executedReversibleTransactions?.[0];
  if (firstEx?.tx_id) {
    ctx.executedTxId = firstEx.tx_id;
  }

  const cancelled = await safeQuery(() =>
    client.query({
      query: GetCancelledReversibleTransactionsDocument,
      variables: {
        orderBy: { timestamp: Order_By.Desc },
        limit: 1,
        offset: 0
      }
    })
  );
  const firstCanc = cancelled?.data?.cancelledReversibleTransactions?.[0];
  if (firstCanc?.tx_id) {
    ctx.cancelledTxId = firstCanc.tx_id;
  }

  const worm = await safeQuery(() =>
    client.query({
      query: GetWormholeExtrinsicsDocument,
      variables: {
        orderBy: [{ timestamp: Order_By.Desc }],
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
        orderBy: { timestamp: Order_By.Desc },
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
        orderBy: { timestamp: Order_By.Desc },
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
        orderBy: { timestamp: Order_By.Desc },
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
          limit: QUERY_DEFAULT_LIMIT
        }
      })
    );
    const r = blockDetail?.data;
    if (r) {
      const b = r.blocks?.[0];
      if (b) {
        // We need to find sample IDs from the block details if not already found
      }
    }
  }

  return ctx;
}
