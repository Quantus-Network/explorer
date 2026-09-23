import type { SearchAllResponse } from '@/schemas/searchs';

import { collapseSearchTransactions } from './collapse-search-transactions';

type SearchTransaction = SearchAllResponse['transactions'][number];

const block = { height: 1146141, hash: '0xblock' };

function tx(
  overrides: Partial<SearchTransaction> & Pick<SearchTransaction, 'id'>
): SearchTransaction {
  return {
    type: 'IMMEDIATE',
    hash: '0xbatch',
    detail_id: 'detail',
    block,
    ...overrides
  };
}

describe('collapseSearchTransactions', () => {
  it('collapses a batch transfer that shares one hash into a single result', () => {
    const first = tx({
      id: 'immediate:0001146141-7dac3-000024',
      detail_id: '0001146141-7dac3-000024'
    });
    const transactions = [
      first,
      tx({
        id: 'immediate:0001146141-7dac3-000026',
        detail_id: '0001146141-7dac3-000026'
      }),
      tx({
        id: 'immediate:0001146141-7dac3-000028',
        detail_id: '0001146141-7dac3-000028'
      })
    ];

    expect(collapseSearchTransactions(transactions)).toEqual([first]);
  });

  it('collapses wormhole batch rows that share a hash and detail id', () => {
    const hash =
      '0xa5e88ba79e61cd47275834b02f8cb1417299043ba608035218407c6fde9a68ef';
    const first = tx({
      id: 'wormhole:0001146151-ac4cc-000004',
      type: 'WORMHOLE',
      hash,
      detail_id: hash
    });

    expect(
      collapseSearchTransactions([
        first,
        tx({
          id: 'wormhole:0001146151-ac4cc-000008',
          type: 'WORMHOLE',
          hash,
          detail_id: hash
        })
      ])
    ).toEqual([first]);
  });

  it('keeps transactions that open different pages', () => {
    const batch = tx({
      id: 'immediate:batch-a',
      hash: '0xaaa',
      detail_id: 'batch-a-1'
    });
    const other = tx({
      id: 'immediate:other',
      hash: '0xbbb',
      detail_id: 'other'
    });
    const reversible = tx({
      id: 'scheduled:1',
      type: 'SCHEDULED_REVERSIBLE',
      hash: '0xccc',
      detail_id: 'sched-1'
    });
    const transferWithoutHash = tx({
      id: 'immediate:no-hash-1',
      hash: null,
      detail_id: '0001151210-f703d-000004'
    });
    const anotherWithoutHash = tx({
      id: 'immediate:no-hash-2',
      hash: null,
      detail_id: '0001151209-d3fae-000004'
    });

    expect(
      collapseSearchTransactions([
        batch,
        tx({
          id: 'immediate:batch-a-2',
          hash: '0xaaa',
          detail_id: 'batch-a-2'
        }),
        other,
        reversible,
        transferWithoutHash,
        anotherWithoutHash
      ])
    ).toEqual([
      batch,
      other,
      reversible,
      transferWithoutHash,
      anotherWithoutHash
    ]);
  });
});
