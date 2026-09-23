import type { GraphqlBenchmarkRow } from './types';

/**
 * Executed operation errors fail the run.
 * Bootstrap request failures fail the run only when every operation was skipped.
 * Skips caused by empty optional data do not.
 */
export function graphqlBenchmarkRunFailed(
  results: readonly Pick<GraphqlBenchmarkRow, 'skipped' | 'errorMessage'>[],
  bootstrapRequestFailures: readonly string[]
): boolean {
  const ran = results.some((row) => !row.skipped);
  if (!ran && bootstrapRequestFailures.length > 0) return true;
  return results.some((row) => !row.skipped && Boolean(row.errorMessage));
}
