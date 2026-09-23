import { print } from 'graphql';

import {
  AccountEventsAllAfterDocument,
  AccountEventsAllDocument,
  AccountEventsReceiveDocument,
  AccountEventsSendDocument,
  ScheduledReversibleAllAfterDocument,
  ScheduledReversibleReceiveDocument,
  ScheduledReversibleSendDocument
} from './mobile-queries';
import { mobileGraphqlBenchmarkRegistry } from './mobile-registry';

/**
 * Shape locked to quantus-apps main @ 11e035a3
 * `ChainHistoryService.buildAccountEventsQuery` /
 * `buildScheduledReversibleTransfersQuery`.
 * Hasura renders `_in` as `= ANY(array)`, which will not walk the
 * `(account_id[, incoming|outgoing], timestamp, id)` index.
 */

function printed(document: Parameters<typeof print>[0]) {
  return print(document);
}

function squash(source: string) {
  return source.replace(/\s+/g, '');
}

describe('mobile account-event documents match quantus-apps@11e035a3', () => {
  it('uses one _eq alias and the composite order for a single account', () => {
    const all = printed(AccountEventsAllDocument);
    const flat = squash(all);

    expect(flat).toContain('events0:account_event');
    expect(flat).toContain('$account0:String!');
    expect(flat).toContain('account_id:{_eq:$account0}');
    expect(flat).toContain(
      'order_by:[{account_id:desc},{timestamp:desc},{id:desc}]'
    );
    expect(all).not.toContain('$accounts');
    expect(all).not.toContain('_in');
    expect(all).not.toContain('offset');
    expect(all).not.toContain('events1');
    expect(all).toContain('minerReward');
  });

  it('puts the direction column in send and receive order_by', () => {
    const send = printed(AccountEventsSendDocument);
    const receive = printed(AccountEventsReceiveDocument);

    expect(squash(send)).toContain('outgoing:{_eq:true}');
    expect(squash(send)).toContain(
      'order_by:[{account_id:desc},{outgoing:desc},{timestamp:desc},{id:desc}]'
    );
    expect(send).not.toContain('incoming');
    expect(send).not.toContain('minerReward');
    expect(squash(receive)).toContain('incoming:{_eq:true}');
    expect(squash(receive)).toContain(
      'order_by:[{account_id:desc},{incoming:desc},{timestamp:desc},{id:desc}]'
    );
    expect(receive).not.toContain('outgoing');
    expect(receive).toContain('minerReward');
  });

  it('keeps the keyset predicate on the cursor variant', () => {
    const after = squash(printed(AccountEventsAllAfterDocument));

    expect(after).toContain('$cursorTimestamp:timestamptz!');
    expect(after).toContain('$cursorId:String!');
    expect(after).toContain('timestamp:{_lte:$cursorTimestamp}');
    expect(after).toContain(
      '_not:{timestamp:{_eq:$cursorTimestamp},id:{_gte:$cursorId}}'
    );
  });

  it('uses the same per-account shape for scheduled transfers', () => {
    const send = squash(printed(ScheduledReversibleSendDocument));
    const receive = squash(printed(ScheduledReversibleReceiveDocument));
    const receiveAfter = squash(printed(ScheduledReversibleAllAfterDocument));

    expect(send).toContain('account_id:{_eq:$account0}');
    expect(send).toContain('outgoing:{_eq:true}');
    expect(send).toContain(
      'scheduledReversibleTransfer:{scheduled_at:{_gt:$after}}'
    );
    expect(send).toContain(
      'order_by:[{account_id:desc},{outgoing:desc},{timestamp:desc},{id:desc}]'
    );
    expect(receive).toContain('incoming:{_eq:true}');
    expect(receiveAfter).toContain('$cursorTimestamp:timestamptz!');
    expect(receiveAfter).not.toContain('_in');
  });

  it('binds account0 for one account and keeps the miner case on that account', () => {
    const entry = mobileGraphqlBenchmarkRegistry.find(
      (item) => item.name === 'AccountEvents.all'
    );
    const miner = mobileGraphqlBenchmarkRegistry.find(
      (item) => item.name === 'AccountEvents.all.miner'
    );

    expect(
      entry?.getVariables({
        busyAccountId: 'busy'
      })
    ).toEqual({
      account0: 'busy',
      limit: 21
    });
    expect(
      miner?.getVariables({
        busyAccountId: 'busy',
        minerAccountId: 'miner'
      })
    ).toEqual({
      account0: 'miner',
      limit: 21
    });
  });

  it('exercises multi-account fan-out', () => {
    const names = mobileGraphqlBenchmarkRegistry.map((item) => item.name);

    expect(names).toContain('AccountEvents.all.n2');
    expect(names).toContain('AccountEvents.all.n8');
    expect(names).toContain('AccountEvents.send.n2');
    expect(names).toContain('ScheduledReversible.all.n8');

    const fanout = mobileGraphqlBenchmarkRegistry.find(
      (item) => item.name === 'AccountEvents.all.n2'
    );
    const flat = fanout ? squash(printed(fanout.document)) : '';

    expect(flat).toContain('events0:account_event');
    expect(flat).toContain('events1:account_event');
    expect(flat).toContain('$account1:String!');
    expect(flat).not.toContain('events2:');
    expect(
      fanout?.getVariables({
        walletAccountIds: ['w0', 'w1', 'w2']
      })
    ).toEqual({
      account0: 'w0',
      account1: 'w1',
      limit: 21
    });
    expect(
      fanout?.getVariables({
        walletAccountIds: ['only-one']
      })
    ).toBeNull();

    const ids = ['a0', 'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7'];
    const send = mobileGraphqlBenchmarkRegistry.find(
      (item) => item.name === 'AccountEvents.send.n8'
    );
    expect(send?.getVariables({ walletAccountIds: ids })).toEqual({
      account0: 'a0',
      account1: 'a1',
      account2: 'a2',
      account3: 'a3',
      account4: 'a4',
      account5: 'a5',
      account6: 'a6',
      account7: 'a7',
      limit: 21
    });
    expect(squash(printed(send!.document))).toContain(
      'order_by:[{account_id:desc},{outgoing:desc},{timestamp:desc},{id:desc}]'
    );
    expect(squash(printed(send!.document))).not.toContain('events8:');

    const scheduled = mobileGraphqlBenchmarkRegistry.find(
      (item) => item.name === 'ScheduledReversible.all.n2'
    );
    const scheduledVars = scheduled?.getVariables({
      walletAccountIds: ['w0', 'w1']
    });
    expect(scheduledVars).toMatchObject({
      account0: 'w0',
      account1: 'w1',
      limit: 21
    });
    expect(typeof scheduledVars?.after).toBe('string');

    const after = mobileGraphqlBenchmarkRegistry.find(
      (item) => item.name === 'AccountEvents.all.after.n2'
    );
    expect(
      after?.getVariables({
        walletAccountIds: ['w0', 'w1'],
        cursorTimestamp: 't',
        cursorId: 'c'
      })
    ).toEqual({
      account0: 'w0',
      account1: 'w1',
      limit: 21,
      cursorTimestamp: 't',
      cursorId: 'c'
    });
  });

  it('leaves the legacy contrast query on an accounts array', () => {
    const legacy = mobileGraphqlBenchmarkRegistry.find(
      (item) => item.name === 'LEGACY.AccountEvents.all'
    );

    expect(printed(legacy!.document)).toContain('_in');
    expect(legacy?.getVariables({ busyAccountId: 'busy' })).toEqual({
      accounts: ['busy'],
      limit: 21,
      offset: 0
    });
  });
});
