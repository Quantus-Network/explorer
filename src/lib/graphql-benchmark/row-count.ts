/** Row count for a benchmark response.
 *
 * History documents return one array per account alias (`events0`..). Those
 * are summed. Every other operation keeps the first top-level array.
 */
export function benchmarkRowCount(data: unknown): number | undefined {
  if (!data || typeof data !== 'object') return undefined;
  const record = data as Record<string, unknown>;
  const aliased = Object.entries(record).filter(
    ([key, value]) => /^events\d+$/.test(key) && Array.isArray(value)
  );
  if (aliased.length > 0) {
    return aliased.reduce(
      (sum, [, value]) => sum + (value as unknown[]).length,
      0
    );
  }
  const firstArray = Object.values(record).find((value) =>
    Array.isArray(value)
  );
  return Array.isArray(firstArray) ? firstArray.length : undefined;
}
