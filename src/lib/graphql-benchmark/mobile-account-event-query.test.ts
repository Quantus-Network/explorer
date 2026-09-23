import {
  accountEventPageVariables,
  buildAccountEventsQuery,
  buildScheduledReversibleTransfersQuery
} from './mobile-account-event-query';

const selection = '\n    id';

describe('account-event query builder (quantus-apps@11e035a3)', () => {
  it('filters each account with _eq and orders by the composite index', () => {
    const all = buildAccountEventsQuery({
      filter: 'all',
      withCursor: false,
      accountCount: 1,
      selection
    });
    const send = buildAccountEventsQuery({
      filter: 'send',
      withCursor: false,
      accountCount: 1,
      selection
    });
    const receive = buildAccountEventsQuery({
      filter: 'receive',
      withCursor: false,
      accountCount: 1,
      selection
    });

    expect(all).toContain(
      'where: {_and: [{account_id: {_eq: $account0}}, {scheduled_reversible_transfer_id: {_is_null: true}}]}'
    );
    expect(all).toContain(
      'order_by: [{account_id: desc}, {timestamp: desc}, {id: desc}]'
    );
    expect(all).not.toContain('_in');
    expect(all).not.toContain('offset');
    expect(send).toContain(', {outgoing: {_eq: true}}');
    expect(send).not.toContain('incoming');
    expect(send).toContain(
      'order_by: [{account_id: desc}, {outgoing: desc}, {timestamp: desc}, {id: desc}]'
    );
    expect(receive).toContain(', {incoming: {_eq: true}}');
    expect(receive).not.toContain('outgoing');
    expect(receive).toContain(
      'order_by: [{account_id: desc}, {incoming: desc}, {timestamp: desc}, {id: desc}]'
    );
  });

  it('emits one alias and one variable per account', () => {
    const twoAccounts = buildAccountEventsQuery({
      filter: 'all',
      withCursor: false,
      accountCount: 2,
      selection
    });

    expect(twoAccounts).toContain(
      'query AccountEvents($account0: String!, $account1: String!, $limit: Int!)'
    );
    expect(twoAccounts).toContain('events0: account_event(');
    expect(twoAccounts).toContain('events1: account_event(');
    expect(twoAccounts).toContain('account_id: {_eq: $account0}');
    expect(twoAccounts).toContain('account_id: {_eq: $account1}');
    expect(twoAccounts).not.toContain('events2:');
  });

  it('adds the keyset predicate only on the cursor variant', () => {
    const first = buildAccountEventsQuery({
      filter: 'all',
      withCursor: false,
      accountCount: 1,
      selection
    });
    const after = buildAccountEventsQuery({
      filter: 'all',
      withCursor: true,
      accountCount: 1,
      selection
    });

    expect(first).not.toContain('$cursorTimestamp');
    expect(after).toContain(
      'query AccountEvents($account0: String!, $limit: Int!, $cursorTimestamp: timestamptz!, $cursorId: String!)'
    );
    expect(after).toContain('timestamp: {_lte: $cursorTimestamp}');
    expect(after).toContain(
      '_not: {timestamp: {_eq: $cursorTimestamp}, id: {_gte: $cursorId}}'
    );
  });

  it('uses the same per-account shape for scheduled transfers', () => {
    const send = buildScheduledReversibleTransfersQuery({
      filter: 'send',
      withCursor: false,
      accountCount: 1,
      selection
    });
    const after = buildScheduledReversibleTransfersQuery({
      filter: 'receive',
      withCursor: true,
      accountCount: 2,
      selection
    });

    expect(send).toContain(
      'query ScheduledReversibleTransfersByAccounts($account0: String!, $limit: Int!, $after: timestamptz!)'
    );
    expect(send).toContain('account_id: {_eq: $account0}');
    expect(send).toContain(', {outgoing: {_eq: true}}');
    expect(send).toContain(
      '{scheduledReversibleTransfer: {scheduled_at: {_gt: $after}}}'
    );
    expect(send).toContain(
      'order_by: [{account_id: desc}, {outgoing: desc}, {timestamp: desc}, {id: desc}]'
    );
    expect(send).not.toContain('from_id');
    expect(after).toContain('events1: account_event(');
    expect(after).toContain(', {incoming: {_eq: true}}');
    expect(after).toContain('timestamp: {_lte: $cursorTimestamp}');
    expect(after).toContain(
      '_not: {timestamp: {_eq: $cursorTimestamp}, id: {_gte: $cursorId}}'
    );
  });

  it('binds one variable per account, plus the optional keyset', () => {
    expect(
      accountEventPageVariables({
        accountIds: ['qz-a', 'qz-b'],
        limit: 21,
        cursor: { timestamp: 't1', id: 'x' }
      })
    ).toEqual({
      account0: 'qz-a',
      account1: 'qz-b',
      limit: 21,
      cursorTimestamp: 't1',
      cursorId: 'x'
    });
  });

  it('rejects an empty account list', () => {
    expect(() =>
      buildAccountEventsQuery({
        filter: 'all',
        withCursor: false,
        accountCount: 0,
        selection
      })
    ).toThrow('at least one account');
    expect(() =>
      accountEventPageVariables({ accountIds: [], limit: 21 })
    ).toThrow('must not be empty');
  });
});
