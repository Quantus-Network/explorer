import { runGraphqlBenchmarks } from '../src/lib/graphql-benchmark/run';

const defaultUrl = 'https://sub2.quantus.com/v1/graphql';
const endpoint = process.env.GRAPHQL_BENCH_URL ?? defaultUrl;

async function main() {
  // eslint-disable-next-line no-console
  console.error(`GraphQL bench → ${endpoint}\n`);
  const { results, bootstrapContext } = await runGraphqlBenchmarks({
    endpoint
  });
  // eslint-disable-next-line no-console
  console.log('Bootstrap context:', JSON.stringify(bootstrapContext, null, 2));
  // eslint-disable-next-line no-console
  console.log('\nResults (slowest first):');
  for (const r of results) {
    if (r.skipped) {
      // eslint-disable-next-line no-console
      console.log(`  ${r.name}  SKIPPED  ${r.skipReason ?? ''}`);
    } else {
      // eslint-disable-next-line no-console
      console.log(
        `  ${r.name}  ${r.durationMs}ms  bytes=${r.responseBytes ?? '—'}  ${r.errorMessage ?? 'OK'}`
      );
    }
  }
  const hasFailure = results.some((r) => !r.skipped && r.errorMessage);
  process.exit(hasFailure ? 1 : 0);
}

main().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});
