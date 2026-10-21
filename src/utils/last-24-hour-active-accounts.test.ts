import { last24HourActiveAccountsWhere } from './last-24-hour-active-accounts';

describe('last24HourActiveAccountsWhere', () => {
  it('counts signed extrinsics inside the rolling 24h window', () => {
    expect(
      last24HourActiveAccountsWhere(
        '2026-09-27T15:30:00.000Z',
        '2026-09-28T15:30:00.000Z'
      )
    ).toEqual({
      timestamp: {
        _gte: '2026-09-27T15:30:00.000Z',
        _lte: '2026-09-28T15:30:00.000Z'
      },
      signer_id: { _is_null: false }
    });
  });
});
