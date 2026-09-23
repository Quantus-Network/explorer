import {
  type ApolloClient,
  ApolloError,
  type NormalizedCacheObject
} from '@apollo/client';

import { loadMobileBenchmarkContext } from './mobile-bootstrap';

function clientWith(query: (...args: never[]) => Promise<unknown>) {
  return { query } as unknown as ApolloClient<NormalizedCacheObject>;
}

describe('loadMobileBenchmarkContext', () => {
  it('reports a request failure when the endpoint is unreachable', async () => {
    const query = jest.fn(async () => {
      throw new ApolloError({
        networkError: new Error('connect ECONNREFUSED 127.0.0.1:1')
      });
    });

    const { context, requestFailures } = await loadMobileBenchmarkContext(
      clientWith(query)
    );

    expect(context).toEqual({});
    expect(requestFailures).toEqual([
      'BusyAccounts: connect ECONNREFUSED 127.0.0.1:1'
    ]);
    expect(query).toHaveBeenCalledTimes(1);
  });

  it('keeps querying after an HTTP error from a reached endpoint', async () => {
    const query = jest.fn(async () => {
      throw new ApolloError({
        networkError: Object.assign(
          new Error('Response not successful: Received status code 400'),
          { statusCode: 400 }
        )
      });
    });

    const { requestFailures } = await loadMobileBenchmarkContext(
      clientWith(query)
    );

    expect(query.mock.calls.length).toBeGreaterThan(1);
    expect(requestFailures.length).toBe(query.mock.calls.length);
    expect(requestFailures[0]).toContain('status code 400');
  });

  it('keeps an empty successful response as optional data', async () => {
    const query = jest.fn(async () => ({
      data: { account_stats: [], account: [], transfer: [] }
    }));

    const { context, requestFailures } = await loadMobileBenchmarkContext(
      clientWith(query)
    );

    expect(requestFailures).toEqual([]);
    expect(context.busyAccountId).toBeUndefined();
    expect(context.accountId).toBeUndefined();
  });

  it('keeps sample ids when a bootstrap query succeeds', async () => {
    let calls = 0;
    const query = jest.fn(async () => {
      calls += 1;
      if (calls === 1) {
        return {
          data: {
            account_stats: [
              {
                id: 'qz-busy',
                total_immediate_transfers: 9,
                total_mined_blocks: 1
              }
            ]
          }
        };
      }
      return { data: {} };
    });

    const { context, requestFailures } = await loadMobileBenchmarkContext(
      clientWith(query)
    );

    expect(requestFailures).toEqual([]);
    expect(context.busyAccountId).toBe('qz-busy');
    expect(context.accountId).toBe('qz-busy');
    expect(context.walletAccountIds).toEqual(['qz-busy']);
  });

  it('records GraphQL errors and still queries later operations', async () => {
    const query = jest.fn(async () => {
      throw new ApolloError({
        graphQLErrors: [{ message: 'field "account_stats" not found' }]
      });
    });

    const { context, requestFailures } = await loadMobileBenchmarkContext(
      clientWith(query)
    );

    expect(query.mock.calls.length).toBeGreaterThan(1);
    expect(context.busyAccountId).toBeUndefined();
    expect(requestFailures[0]).toBe(
      'BusyAccounts: field "account_stats" not found'
    );
    expect(
      requestFailures.every((failure) => failure.includes('not found'))
    ).toBe(true);
  });

  it('records resolved GraphQL errors without dropping returned ids', async () => {
    let calls = 0;
    const query = jest.fn(async () => {
      calls += 1;
      if (calls === 1) {
        return {
          data: {
            account_stats: [{ id: 'qz-busy', total_immediate_transfers: 3 }]
          },
          errors: [{ message: 'partial account_stats' }]
        };
      }
      return { data: {} };
    });

    const { context, requestFailures } = await loadMobileBenchmarkContext(
      clientWith(query)
    );

    expect(context.busyAccountId).toBe('qz-busy');
    expect(requestFailures[0]).toBe('BusyAccounts: partial account_stats');
  });

  it('propagates caller abort and stops querying', async () => {
    const controller = new AbortController();
    const query = jest.fn(async () => {
      controller.abort();
      throw new Error('The operation was aborted.');
    });

    await expect(
      loadMobileBenchmarkContext(clientWith(query), {
        signal: controller.signal,
        timeoutMs: 5_000
      })
    ).rejects.toThrow(/aborted/i);
    expect(query).toHaveBeenCalledTimes(1);
  });

  it('rejects when the caller already aborted', async () => {
    const controller = new AbortController();
    controller.abort(new Error('benchmark aborted'));
    const query = jest.fn(async () => ({ data: {} }));

    await expect(
      loadMobileBenchmarkContext(clientWith(query), {
        signal: controller.signal
      })
    ).rejects.toThrow('benchmark aborted');
    expect(query).not.toHaveBeenCalled();
  });

  it('applies the per-query timeout', async () => {
    const query = jest.fn(
      (options: { context?: { fetchOptions?: { signal?: AbortSignal } } }) =>
        new Promise((_resolve, reject) => {
          const signal = options.context?.fetchOptions?.signal;
          if (!signal) {
            reject(new Error('missing abort signal'));
            return;
          }
          if (signal.aborted) {
            reject(
              new DOMException('The operation was aborted.', 'AbortError')
            );
            return;
          }
          signal.addEventListener('abort', () => {
            reject(
              new DOMException('The operation was aborted.', 'AbortError')
            );
          });
        })
    );

    const { context, requestFailures } = await loadMobileBenchmarkContext(
      clientWith(query as (...args: never[]) => Promise<unknown>),
      { timeoutMs: 20 }
    );

    expect(context).toEqual({});
    expect(requestFailures.length).toBeGreaterThan(1);
    expect(
      requestFailures.every((failure) =>
        failure.endsWith('timed out after 20ms')
      )
    ).toBe(true);
    expect(requestFailures[0]).toBe('BusyAccounts: timed out after 20ms');
  });
});
