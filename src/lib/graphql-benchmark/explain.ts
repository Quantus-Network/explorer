import { type DocumentNode, print } from 'graphql';

import {
  BENCHMARK_QUERY_TIMEOUT_MS,
  createBenchmarkQuerySignal
} from './query-signal';
import {
  createBenchmarkApolloClient,
  loadBenchmarkContext,
  selectBenchmarkEntries
} from './run';
import type { GraphqlBenchmarkContext, GraphqlBenchmarkSuite } from './types';

/** One root field of the operation, as returned by Hasura's explain API. */
export type HasuraExplainPlan = {
  field: string;
  sql: string;
  plan: string[];
};

export type GraphqlExplainRow = {
  name: string;
  group?: string;
  variables?: Record<string, unknown>;
  skipped?: boolean;
  skipReason?: string;
  plans?: HasuraExplainPlan[];
  errorMessage?: string;
};

function isExplainPlanList(body: unknown): body is HasuraExplainPlan[] {
  return (
    Array.isArray(body) &&
    body.every(
      (entry) =>
        typeof entry?.field === 'string' &&
        typeof entry?.sql === 'string' &&
        Array.isArray(entry?.plan)
    )
  );
}

/**
 * Generated SQL and Postgres `EXPLAIN` (estimates, not ANALYZE) for one operation.
 * Hasura only serves this to the admin role.
 */
export async function explainGraphqlOperation(options: {
  endpoint: string;
  adminSecret: string;
  document: DocumentNode;
  variables: Record<string, unknown>;
  signal?: AbortSignal;
  fetchImpl?: typeof fetch;
}): Promise<HasuraExplainPlan[]> {
  const { endpoint, adminSecret, document, variables, signal } = options;
  const fetchImpl = options.fetchImpl ?? fetch;
  if (!adminSecret) {
    throw new Error('Hasura explain needs an admin secret');
  }

  const response = await fetchImpl(`${endpoint.replace(/\/+$/, '')}/explain`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-hasura-admin-secret': adminSecret
    },
    body: JSON.stringify({ query: { query: print(document), variables } }),
    signal
  });
  const text = await response.text();
  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    throw new Error(`explain returned non-JSON (${response.status}): ${text}`);
  }

  if (!response.ok) {
    const message =
      (body as { error?: unknown } | null)?.error ?? JSON.stringify(body);
    throw new Error(`explain failed (${response.status}): ${String(message)}`);
  }
  if (!isExplainPlanList(body)) {
    throw new Error(`explain returned an unexpected body: ${text}`);
  }
  return body;
}

function jsonBlock(value: unknown): string {
  return `\`\`\`json\n${JSON.stringify(value, null, 2)}\n\`\`\``;
}

/** Markdown report of an explain run, one section per operation. */
export function formatExplainReport(report: {
  endpoint: string;
  suite: GraphqlBenchmarkSuite;
  group?: string;
  generatedAt: Date;
  bootstrapContext: GraphqlBenchmarkContext;
  bootstrapRequestFailures: string[];
  results: GraphqlExplainRow[];
}): string {
  const lines = [
    '# GraphQL explain report',
    '',
    `- Endpoint: ${report.endpoint}`,
    `- Suite: ${report.suite}`,
    `- Group: ${report.group ?? 'all'}`,
    `- Generated: ${report.generatedAt.toISOString()}`,
    '',
    '## Bootstrap context',
    '',
    jsonBlock(report.bootstrapContext)
  ];
  if (report.bootstrapRequestFailures.length > 0) {
    lines.push('', 'Bootstrap request failures:', '');
    for (const failure of report.bootstrapRequestFailures) {
      lines.push(`- ${failure}`);
    }
  }

  for (const row of report.results) {
    const label = row.group ? `[${row.group}] ` : '';
    lines.push('', `## ${label}${row.name}`, '');
    if (row.skipped) {
      lines.push(`SKIPPED: ${row.skipReason ?? ''}`);
      continue;
    }
    if (row.variables) {
      lines.push('Variables:', '', jsonBlock(row.variables), '');
    }
    if (row.errorMessage) {
      lines.push(`ERROR: ${row.errorMessage}`);
      continue;
    }
    for (const plan of row.plans ?? []) {
      lines.push(
        `### ${plan.field}`,
        '',
        `\`\`\`sql\n${plan.sql}\n\`\`\``,
        '',
        `\`\`\`text\n${plan.plan.join('\n')}\n\`\`\``,
        ''
      );
    }
  }
  return `${lines.join('\n').trimEnd()}\n`;
}

export async function explainGraphqlBenchmarks(options: {
  endpoint: string;
  adminSecret: string;
  suite?: GraphqlBenchmarkSuite;
  group?: string;
  timeoutMs?: number;
  signal?: AbortSignal;
}): Promise<{
  bootstrapContext: GraphqlBenchmarkContext;
  bootstrapRequestFailures: string[];
  results: GraphqlExplainRow[];
}> {
  const {
    endpoint,
    adminSecret,
    suite = 'explorer',
    group,
    timeoutMs = BENCHMARK_QUERY_TIMEOUT_MS,
    signal
  } = options;
  if (!adminSecret) {
    throw new Error('Hasura explain needs an admin secret');
  }
  const entries = selectBenchmarkEntries(suite, group);
  const client = createBenchmarkApolloClient(endpoint);
  const { context, requestFailures } = await loadBenchmarkContext(
    client,
    suite,
    { timeoutMs, signal }
  );

  const results: GraphqlExplainRow[] = [];
  /* eslint-disable no-await-in-loop -- one explain at a time keeps plans comparable */
  for (const entry of entries) {
    const variables = entry.getVariables(context);
    if (variables === null) {
      results.push({
        name: entry.name,
        group: entry.group,
        skipped: true,
        skipReason: 'No sample id from bootstrap for this operation'
      });
      continue;
    }

    const timedOut = createBenchmarkQuerySignal(timeoutMs, signal);
    try {
      const plans = await explainGraphqlOperation({
        endpoint,
        adminSecret,
        document: entry.document,
        variables,
        signal: timedOut.signal
      });
      results.push({ name: entry.name, group: entry.group, variables, plans });
    } catch (e) {
      results.push({
        name: entry.name,
        group: entry.group,
        variables,
        errorMessage: e instanceof Error ? e.message : String(e)
      });
    } finally {
      timedOut.cleanup();
    }
  }
  /* eslint-enable no-await-in-loop */

  return {
    bootstrapContext: context,
    bootstrapRequestFailures: requestFailures,
    results
  };
}
