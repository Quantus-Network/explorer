import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  type NormalizedCacheObject
} from '@apollo/client';

import { loadGraphqlBenchmarkContext } from './bootstrap';
import { loadMobileBenchmarkContext } from './mobile-bootstrap';
import { mobileGraphqlBenchmarkRegistry } from './mobile-registry';
import { graphqlBenchmarkRegistry } from './registry';
import type {
  GraphqlBenchmarkContext,
  GraphqlBenchmarkRegistryEntry,
  GraphqlBenchmarkRow,
  GraphqlBenchmarkSuite
} from './types';

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

function firstArrayLength(data: unknown): number | undefined {
  if (!data || typeof data !== 'object') return undefined;
  const values = Object.values(data as Record<string, unknown>);
  const firstArray = values.find((value) => Array.isArray(value));
  return Array.isArray(firstArray) ? firstArray.length : undefined;
}

function roundMs(value: number) {
  return Math.round(value * 100) / 100;
}

function median(values: number[]) {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length === 0) return 0;
  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1]! + sorted[mid]!) / 2;
  }
  return sorted[mid]!;
}

function timeoutSignal(timeoutMs: number, parent?: AbortSignal) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const onParentAbort = () => controller.abort();
  parent?.addEventListener('abort', onParentAbort);
  return {
    signal: controller.signal,
    cleanup: () => {
      clearTimeout(timer);
      parent?.removeEventListener('abort', onParentAbort);
    }
  };
}

export async function runGraphqlBenchmarks(options: {
  endpoint: string;
  suite?: GraphqlBenchmarkSuite;
  samples?: number;
  warmup?: boolean;
  timeoutMs?: number;
  signal?: AbortSignal;
  onProgress?: (name: string) => void;
}): Promise<{
  bootstrapContext: GraphqlBenchmarkContext;
  results: GraphqlBenchmarkRow[];
}> {
  const {
    endpoint,
    suite = 'explorer',
    samples = 1,
    warmup = samples > 1,
    timeoutMs = 30_000,
    signal,
    onProgress
  } = options;
  const client = createBenchmarkApolloClient(endpoint);
  const registry: GraphqlBenchmarkRegistryEntry[] =
    suite === 'mobile'
      ? mobileGraphqlBenchmarkRegistry
      : graphqlBenchmarkRegistry;

  const bootstrapContext =
    suite === 'mobile'
      ? await loadMobileBenchmarkContext(client)
      : await loadGraphqlBenchmarkContext(client);
  const results: GraphqlBenchmarkRow[] = [];

  /* eslint-disable no-await-in-loop -- benchmarks run strictly sequentially */
  for (const entry of registry) {
    onProgress?.(entry.name);
    const variables = entry.getVariables(bootstrapContext);
    if (variables === null) {
      results.push({
        name: entry.name,
        group: entry.group,
        durationMs: 0,
        skipped: true,
        skipReason: 'No sample id from bootstrap for this operation'
      });
      continue;
    }

    const timed: number[] = [];
    let responseBytes: number | undefined;
    let rowCount: number | undefined;
    let errorMessage: string | undefined;
    const runs = samples + (warmup ? 1 : 0);

    for (let i = 0; i < runs; i += 1) {
      const timedOut = timeoutSignal(timeoutMs, signal);
      const t0 = performance.now();
      try {
        const { data, errors } = await client.query({
          query: entry.document,
          variables,
          context: { fetchOptions: { signal: timedOut.signal } as RequestInit }
        });
        const t1 = performance.now();
        const elapsed = roundMs(t1 - t0);
        if (!warmup || i > 0) timed.push(elapsed);
        responseBytes = responseByteLength(data);
        rowCount = firstArrayLength(data);
        if (errors?.length) {
          errorMessage = errors.map((e) => e.message).join('; ');
          break;
        }
      } catch (e) {
        const t1 = performance.now();
        const elapsed = roundMs(t1 - t0);
        if (!warmup || i > 0) timed.push(elapsed);
        if (timedOut.signal.aborted && !signal?.aborted) {
          errorMessage = `timed out after ${timeoutMs}ms`;
        } else {
          errorMessage = e instanceof Error ? e.message : String(e);
        }
        break;
      } finally {
        timedOut.cleanup();
      }
    }

    results.push({
      name: entry.name,
      group: entry.group,
      durationMs: timed.length ? roundMs(median(timed)) : 0,
      samplesMs: timed.length ? timed : undefined,
      minMs: timed.length ? Math.min(...timed) : undefined,
      maxMs: timed.length ? Math.max(...timed) : undefined,
      responseBytes,
      rowCount,
      errorMessage
    });
  }
  /* eslint-enable no-await-in-loop */

  results.sort((a, b) => b.durationMs - a.durationMs);

  return { bootstrapContext, results };
}
