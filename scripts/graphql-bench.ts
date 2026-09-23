import { runGraphqlBenchmarks } from '../src/lib/graphql-benchmark/run';
import { graphqlBenchmarkRunFailed } from '../src/lib/graphql-benchmark/suite-failure';
import type { GraphqlBenchmarkSuite } from '../src/lib/graphql-benchmark/types';

const args = process.argv.slice(2);

function argValue(flag: string) {
  const prefix = `${flag}=`;
  const match = args.find((arg) => arg.startsWith(prefix));
  if (match) return match.slice(prefix.length);
  const index = args.indexOf(flag);
  if (index >= 0) return args[index + 1];
  return undefined;
}

const suite = (argValue('--suite') ?? 'explorer') as GraphqlBenchmarkSuite;
if (suite !== 'explorer' && suite !== 'mobile') {
  // eslint-disable-next-line no-console
  console.error(`Unknown suite "${suite}". Use explorer or mobile.`);
  process.exit(1);
}

const defaultUrl =
  suite === 'mobile'
    ? 'https://sqm.quantus.com/v1/graphql'
    : 'https://sub2.quantus.com/v1/graphql';
const endpoint = process.env.GRAPHQL_BENCH_URL ?? defaultUrl;
const samples = Number(argValue('--samples') ?? (suite === 'mobile' ? 5 : 1));

async function main() {
  // eslint-disable-next-line no-console
  console.error(`GraphQL bench [${suite}] samples=${samples} → ${endpoint}\n`);
  const { results, bootstrapContext, bootstrapRequestFailures } =
    await runGraphqlBenchmarks({
      endpoint,
      suite,
      samples
    });
  // eslint-disable-next-line no-console
  console.log('Bootstrap context:', JSON.stringify(bootstrapContext, null, 2));
  if (bootstrapRequestFailures.length > 0) {
    // eslint-disable-next-line no-console
    console.log('\nBootstrap request failures:');
    for (const failure of bootstrapRequestFailures) {
      // eslint-disable-next-line no-console
      console.log(`  ${failure}`);
    }
  }
  // eslint-disable-next-line no-console
  console.log('\nResults (slowest first):');
  for (const r of results) {
    const group = r.group ? `[${r.group}] ` : '';
    if (r.skipped) {
      // eslint-disable-next-line no-console
      console.log(`  ${group}${r.name}  SKIPPED  ${r.skipReason ?? ''}`);
    } else {
      const spread =
        r.minMs != null && r.maxMs != null
          ? ` min=${r.minMs} max=${r.maxMs}`
          : '';
      const rows = r.rowCount != null ? ` rows=${r.rowCount}` : '';
      // eslint-disable-next-line no-console
      console.log(
        `  ${group}${r.name}  ${r.durationMs}ms${spread}  bytes=${r.responseBytes ?? '—'}${rows}  ${r.errorMessage ?? 'OK'}`
      );
    }
  }
  process.exit(
    graphqlBenchmarkRunFailed(results, bootstrapRequestFailures) ? 1 : 0
  );
}

main().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});
