import {
  fetchPendingInboundRows,
  isPendingInboundTruncated,
  sumPendingInbound
} from './sum-pending-inbound';

const ACCOUNT = 'qzAccount';
const SENDER = 'qzSender';

const scheduled = (id: string, amount: string, from_id = SENDER) => ({
  id,
  amount,
  from_id,
  to_id: ACCOUNT
});

const finalized = (scheduled_transfer_id: string) => ({
  id: `f-${scheduled_transfer_id}`,
  scheduled_transfer_id
});

const total = (count: number) => ({ aggregate: { count } });

describe('sumPendingInbound', () => {
  it('is zero when the account has no scheduled transfers', () => {
    expect(
      sumPendingInbound({ scheduled: [], executed: [], cancelled: [] })
    ).toBe(BigInt(0));
  });

  it('counts a scheduled transfer that is neither executed nor cancelled', () => {
    expect(
      sumPendingInbound({
        scheduled: [scheduled('a', '1500000000000')],
        executed: [],
        cancelled: []
      })
    ).toBe(BigInt('1500000000000'));
  });

  it('excludes an executed transfer', () => {
    expect(
      sumPendingInbound({
        scheduled: [scheduled('a', '1500000000000')],
        executed: [finalized('a')],
        cancelled: []
      })
    ).toBe(BigInt(0));
  });

  it('excludes a cancelled transfer', () => {
    expect(
      sumPendingInbound({
        scheduled: [scheduled('a', '1500000000000')],
        executed: [],
        cancelled: [finalized('a')]
      })
    ).toBe(BigInt(0));
  });

  it('excludes a pending self-send', () => {
    expect(
      sumPendingInbound({
        scheduled: [scheduled('a', '1500000000000', ACCOUNT)],
        executed: [],
        cancelled: []
      })
    ).toBe(BigInt(0));
  });

  it('sums several pending transfers as bigint past Number.MAX_SAFE_INTEGER', () => {
    expect(
      sumPendingInbound({
        scheduled: [
          scheduled('a', '9007199254740993'),
          scheduled('b', '9007199254740993'),
          scheduled('c', '1')
        ],
        executed: [],
        cancelled: []
      })
    ).toBe(BigInt('18014398509481987'));
  });

  it('keeps only the pending transfers out of a mixed set', () => {
    expect(
      sumPendingInbound({
        scheduled: [
          scheduled('executed', '100'),
          scheduled('cancelled', '20'),
          scheduled('self', '3', ACCOUNT),
          scheduled('pending-1', '4000'),
          scheduled('pending-2', '50000')
        ],
        executed: [finalized('executed')],
        cancelled: [finalized('cancelled')]
      })
    ).toBe(BigInt(54000));
  });
});

describe('isPendingInboundTruncated', () => {
  const complete = {
    scheduled: [scheduled('a', '1'), scheduled('b', '1')],
    executed: [finalized('a')],
    cancelled: [finalized('b')],
    scheduledTotal: total(2),
    executedTotal: total(1),
    cancelledTotal: total(1)
  };

  it('is false when every list holds all of its rows', () => {
    expect(isPendingInboundTruncated(complete)).toBe(false);
  });

  it.each(['scheduledTotal', 'executedTotal', 'cancelledTotal'] as const)(
    'is true when %s exceeds the rows returned',
    (key) => {
      expect(
        isPendingInboundTruncated({ ...complete, [key]: total(1001) })
      ).toBe(true);
    }
  );
});

describe('fetchPendingInboundRows', () => {
  const PAGE_SIZE = 2;
  const after = <T extends { id: string }>(rows: T[], cursor: string) =>
    rows.filter(({ id }) => id > cursor).slice(0, PAGE_SIZE);

  const indexer = (
    all: {
      scheduled: ReturnType<typeof scheduled>[];
      executed: ReturnType<typeof finalized>[];
      cancelled: ReturnType<typeof finalized>[];
    },
    totals = all
  ) => {
    const requests: unknown[] = [];
    const fetchPage = async (cursors: {
      scheduled_after: string;
      executed_after: string;
      cancelled_after: string;
    }) => {
      requests.push(cursors);
      return {
        scheduled: after(all.scheduled, cursors.scheduled_after),
        executed: after(all.executed, cursors.executed_after),
        cancelled: after(all.cancelled, cursors.cancelled_after),
        scheduledTotal: total(totals.scheduled.length),
        executedTotal: total(totals.executed.length),
        cancelledTotal: total(totals.cancelled.length)
      };
    };
    return { fetchPage, requests };
  };

  it('returns a single page when every list fits the row limit', async () => {
    const all = {
      scheduled: [scheduled('s1', '1')],
      executed: [],
      cancelled: []
    };
    const { fetchPage, requests } = indexer(all);

    expect(await fetchPendingInboundRows(fetchPage)).toEqual(all);
    expect(requests).toEqual([
      { scheduled_after: '', executed_after: '', cancelled_after: '' }
    ]);
  });

  it('pages each list past the row limit until it holds every row', async () => {
    const all = {
      scheduled: ['s1', 's2', 's3', 's4', 's5'].map((id) => scheduled(id, '1')),
      executed: ['s1', 's2', 's3'].map(finalized),
      cancelled: [finalized('s4')]
    };
    const { fetchPage, requests } = indexer(all);

    const rows = await fetchPendingInboundRows(fetchPage);

    expect(rows).toEqual(all);
    expect(sumPendingInbound(rows)).toBe(BigInt(1));
    expect(requests).toEqual([
      { scheduled_after: '', executed_after: '', cancelled_after: '' },
      {
        scheduled_after: 's2',
        executed_after: 'f-s2',
        cancelled_after: 'f-s4'
      },
      { scheduled_after: 's4', executed_after: 'f-s3', cancelled_after: 'f-s4' }
    ]);
  });

  it('throws when the indexer returns no more rows before its totals', async () => {
    const all = {
      scheduled: [scheduled('s1', '1')],
      executed: [],
      cancelled: []
    };
    const { fetchPage } = indexer(all, {
      ...all,
      scheduled: [...all.scheduled, scheduled('s2', '1')]
    });

    expect(fetchPendingInboundRows(fetchPage)).rejects.toThrow(
      'Pending inbound transfers ended before indexer totals'
    );
  });
});
