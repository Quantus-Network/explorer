import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  type NormalizedCacheObject
} from '@apollo/client';

import { loadGraphqlBenchmarkContext } from './bootstrap';
import { graphqlBenchmarkRegistry } from './registry';
import type { GraphqlBenchmarkContext, GraphqlBenchmarkRow } from './types';

export function createBenchmarkApolloClient(uri: string) {
  return new ApolloClient<NormalizedCacheObject>({
    link: createHttpLink({ uri }),
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache'
      }
    }
  });
}

function responseByteLength(data: unknown): number {
  try {
    return new TextEncoder().encode(JSON.stringify(data)).length;
  } catch {
    return 0;
  }
}

export async function runGraphqlBenchmarks(options: {
  endpoint: string;
  signal?: AbortSignal;
  onProgress?: (name: string) => void;
}): Promise<{
  bootstrapContext: GraphqlBenchmarkContext;
  results: GraphqlBenchmarkRow[];
}> {
  const { endpoint, signal, onProgress } = options;
  const client = createBenchmarkApolloClient(endpoint);

  const bootstrapContext = await loadGraphqlBenchmarkContext(client);
  const results: GraphqlBenchmarkRow[] = [];

  const queryContext = signal
    ? { fetchOptions: { signal } as RequestInit }
    : undefined;

  /* eslint-disable no-await-in-loop -- benchmarks run strictly sequentially */
  for (const entry of graphqlBenchmarkRegistry) {
    onProgress?.(entry.name);
    const variables = entry.getVariables(bootstrapContext);
    if (variables === null) {
      results.push({
        name: entry.name,
        durationMs: 0,
        skipped: true,
        skipReason: 'No sample id from bootstrap for this operation'
      });
      continue;
    }

    const t0 = performance.now();
    try {
      const { data, errors } = await client.query({
        query: entry.document,
        variables,
        context: queryContext
      });
      const t1 = performance.now();
      const errorMessage = errors?.map((e) => e.message).join('; ');
      results.push({
        name: entry.name,
        durationMs: Math.round((t1 - t0) * 100) / 100,
        responseBytes: responseByteLength(data),
        errorMessage: errorMessage || undefined
      });
    } catch (e) {
      const t1 = performance.now();
      const message = e instanceof Error ? e.message : String(e);
      results.push({
        name: entry.name,
        durationMs: Math.round((t1 - t0) * 100) / 100,
        errorMessage: message
      });
    }
  }
  /* eslint-enable no-await-in-loop */

  results.sort((a, b) => b.durationMs - a.durationMs);

  return { bootstrapContext, results };
}
