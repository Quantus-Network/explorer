import { gql } from '@apollo/client';

import { explainGraphqlOperation, formatExplainReport } from './explain';
import { selectBenchmarkEntries } from './run';

const document = gql`
  query Accounts($limit: Int) {
    account(limit: $limit) {
      id
    }
  }
`;

function fakeFetch(status: number, body: unknown) {
  const calls: { url: string; init: RequestInit }[] = [];
  const fetchImpl = (async (url: string, init: RequestInit) => {
    calls.push({ url, init });
    return new Response(JSON.stringify(body), { status });
  }) as unknown as typeof fetch;
  return { calls, fetchImpl };
}

describe('explainGraphqlOperation', () => {
  it('posts the operation to the explain endpoint as admin and returns the plans', async () => {
    const plans = [{ field: 'account', sql: 'SELECT 1', plan: ['Limit'] }];
    const { calls, fetchImpl } = fakeFetch(200, plans);

    await expect(
      explainGraphqlOperation({
        endpoint: 'https://indexer.test/v1/graphql',
        adminSecret: 'secret',
        document,
        variables: { limit: 2 },
        fetchImpl
      })
    ).resolves.toEqual(plans);

    expect(calls).toHaveLength(1);
    expect(calls[0]!.url).toBe('https://indexer.test/v1/graphql/explain');
    expect(
      (calls[0]!.init.headers as Record<string, string>)[
        'x-hasura-admin-secret'
      ]
    ).toBe('secret');
    const body = JSON.parse(calls[0]!.init.body as string);
    expect(body.query.variables).toEqual({ limit: 2 });
    expect(body.query.query).toContain('account(limit: $limit)');
  });

  it('reports the Hasura error when the request is rejected', async () => {
    const { fetchImpl } = fakeFetch(400, {
      error: 'You have to be an admin to access this endpoint',
      code: 'access-denied'
    });

    await expect(
      explainGraphqlOperation({
        endpoint: 'https://indexer.test/v1/graphql',
        adminSecret: 'wrong',
        document,
        variables: {},
        fetchImpl
      })
    ).rejects.toThrow(
      'explain failed (400): You have to be an admin to access this endpoint'
    );
  });

  it('rejects a response that is not a list of plans', async () => {
    const { fetchImpl } = fakeFetch(200, { data: {} });

    await expect(
      explainGraphqlOperation({
        endpoint: 'https://indexer.test/v1/graphql',
        adminSecret: 'secret',
        document,
        variables: {},
        fetchImpl
      })
    ).rejects.toThrow('explain returned an unexpected body');
  });

  it('refuses to run without an admin secret', async () => {
    const { calls, fetchImpl } = fakeFetch(200, []);

    await expect(
      explainGraphqlOperation({
        endpoint: 'https://indexer.test/v1/graphql',
        adminSecret: '',
        document,
        variables: {},
        fetchImpl
      })
    ).rejects.toThrow('admin secret');
    expect(calls).toHaveLength(0);
  });
});

describe('formatExplainReport', () => {
  const report = formatExplainReport({
    endpoint: 'https://indexer.test/v1/graphql',
    suite: 'explorer',
    group: 'account-type-filters',
    generatedAt: new Date('2026-10-01T10:00:00Z'),
    bootstrapContext: { accountId: 'qz1' },
    bootstrapRequestFailures: ['BusyAccounts: timed out'],
    results: [
      {
        name: 'GetFilteredAccounts is encrypted',
        group: 'account-type-filters',
        variables: { limit: 26 },
        plans: [
          {
            field: 'accounts',
            sql: 'SELECT 1',
            plan: ['Limit  (cost=0.28..12.37)', '  ->  Seq Scan on block']
          }
        ]
      },
      { name: 'GetAccountById', skipped: true, skipReason: 'No sample id' },
      { name: 'GetBlocks', variables: {}, errorMessage: 'explain failed (400)' }
    ]
  });

  it('records where and when the plans were taken', () => {
    expect(report).toContain('https://indexer.test/v1/graphql');
    expect(report).toContain('2026-10-01T10:00:00.000Z');
    expect(report).toContain('account-type-filters');
    expect(report).toContain('"accountId": "qz1"');
    expect(report).toContain('BusyAccounts: timed out');
  });

  it('keeps each operation with its variables, SQL and plan', () => {
    expect(report).toContain(
      '## [account-type-filters] GetFilteredAccounts is encrypted'
    );
    expect(report).toContain('"limit": 26');
    expect(report).toContain('```sql\nSELECT 1\n```');
    expect(report).toContain(
      '```text\nLimit  (cost=0.28..12.37)\n  ->  Seq Scan on block\n```'
    );
  });

  it('reports skipped and failed operations', () => {
    expect(report).toContain('SKIPPED: No sample id');
    expect(report).toContain('ERROR: explain failed (400)');
  });
});

describe('selectBenchmarkEntries', () => {
  it('keeps only the requested group', () => {
    const entries = selectBenchmarkEntries('explorer', 'account-type-filters');

    expect(entries.length).toBeGreaterThan(0);
    expect(entries.every((e) => e.group === 'account-type-filters')).toBe(true);
  });

  it('fails for a group with no entries', () => {
    expect(() => selectBenchmarkEntries('explorer', 'no-such-group')).toThrow(
      'No explorer benchmark entries in group "no-such-group"'
    );
  });
});
