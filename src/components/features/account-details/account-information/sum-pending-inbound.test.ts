import { sumPendingInbound } from './sum-pending-inbound';

const ACCOUNT = 'qzAccount';
const SENDER = 'qzSender';

const scheduled = (id: string, amount: string, from_id = SENDER) => ({
  id,
  amount,
  from_id,
  to_id: ACCOUNT
});

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
        executed: [{ scheduled_transfer_id: 'a' }],
        cancelled: []
      })
    ).toBe(BigInt(0));
  });

  it('excludes a cancelled transfer', () => {
    expect(
      sumPendingInbound({
        scheduled: [scheduled('a', '1500000000000')],
        executed: [],
        cancelled: [{ scheduled_transfer_id: 'a' }]
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
        executed: [{ scheduled_transfer_id: 'executed' }],
        cancelled: [{ scheduled_transfer_id: 'cancelled' }]
      })
    ).toBe(BigInt(54000));
  });
});
