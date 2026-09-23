export const BENCHMARK_QUERY_TIMEOUT_MS = 30_000;

export function createBenchmarkQuerySignal(
  timeoutMs: number,
  parent?: AbortSignal
) {
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
