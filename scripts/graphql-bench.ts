import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

import {
  explainGraphqlBenchmarks,
  formatExplainReport
} from '../src/lib/graphql-benchmark/explain';
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
const group = argValue('--group');
const explain = args.includes('--explain');
const outPath = argValue('--out');

function printBootstrap(context: unknown, failures: string[]) {
  // eslint-disable-next-line no-console
  console.log('Bootstrap context:', JSON.stringify(context, null, 2));
  if (failures.length > 0) {
    // eslint-disable-next-line no-console
    console.log('\nBootstrap request failures:');
    for (const failure of failures) {
      // eslint-disable-next-line no-console
      console.log(`  ${failure}`);
    }
  }
}

async function bench() {
  // eslint-disable-next-line no-console
  console.error(
    `GraphQL bench [${suite}${group ? ` / ${group}` : ''}] samples=${samples} → ${endpoint}\n`
  );
  const { results, bootstrapContext, bootstrapRequestFailures } =
    await runGraphqlBenchmarks({
      endpoint,
      suite,
      group,
      samples
    });
  printBootstrap(bootstrapContext, bootstrapRequestFailures);
  // eslint-disable-next-line no-console
  console.log('\nResults (slowest first):');
  for (const r of results) {
    const label = r.group ? `[${r.group}] ` : '';
    if (r.skipped) {
      // eslint-disable-next-line no-console
      console.log(`  ${label}${r.name}  SKIPPED  ${r.skipReason ?? ''}`);
    } else {
      const spread =
        r.minMs != null && r.maxMs != null
          ? ` min=${r.minMs} max=${r.maxMs}`
          : '';
      const rows = r.rowCount != null ? ` rows=${r.rowCount}` : '';
      // eslint-disable-next-line no-console
      console.log(
        `  ${label}${r.name}  ${r.durationMs}ms${spread}  bytes=${r.responseBytes ?? '—'}${rows}  ${r.errorMessage ?? 'OK'}`
      );
    }
  }
  return graphqlBenchmarkRunFailed(results, bootstrapRequestFailures);
}

async function explainPlans() {
  const adminSecret = process.env.HASURA_ADMIN_SECRET;
  if (!adminSecret) {
    throw new Error('--explain needs HASURA_ADMIN_SECRET in the environment');
  }
  // eslint-disable-next-line no-console
  console.error(
    `GraphQL explain [${suite}${group ? ` / ${group}` : ''}] → ${endpoint}/explain\n`
  );
  const generatedAt = new Date();
  const { results, bootstrapContext, bootstrapRequestFailures } =
    await explainGraphqlBenchmarks({ endpoint, adminSecret, suite, group });

  const file = resolve(
    outPath ??
      `out/graphql-explain/${suite}-${group ?? 'all'}-${generatedAt
        .toISOString()
        .replace(/[:.]/g, '-')}.md`
  );
  await mkdir(dirname(file), { recursive: true });
  await writeFile(
    file,
    formatExplainReport({
      endpoint,
      suite,
      group,
      generatedAt,
      bootstrapContext,
      bootstrapRequestFailures,
      results
    })
  );

  for (const r of results) {
    const label = r.group ? `[${r.group}] ` : '';
    let status = 'OK';
    if (r.skipped) status = `SKIPPED  ${r.skipReason ?? ''}`;
    else if (r.errorMessage) status = `ERROR  ${r.errorMessage}`;
    // eslint-disable-next-line no-console
    console.log(`  ${label}${r.name}  ${status}`);
  }
  // eslint-disable-next-line no-console
  console.log(`\nExplain report written to ${file}`);
  return graphqlBenchmarkRunFailed(results, bootstrapRequestFailures);
}

async function main() {
  const failed = explain ? await explainPlans() : await bench();
  process.exit(failed ? 1 : 0);
}

main().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});
