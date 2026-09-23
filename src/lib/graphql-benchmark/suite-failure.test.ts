import { graphqlBenchmarkRunFailed } from './suite-failure';

describe('graphqlBenchmarkRunFailed', () => {
  it('fails when bootstrap request failures leave every operation skipped', () => {
    expect(
      graphqlBenchmarkRunFailed(
        [{ skipped: true }, { skipped: true, errorMessage: 'hidden' }],
        ['BusyAccounts: connect ECONNREFUSED 127.0.0.1:1']
      )
    ).toBe(true);
  });

  it('does not fail when every operation is skipped for missing optional data', () => {
    expect(
      graphqlBenchmarkRunFailed([{ skipped: true }, { skipped: true }], [])
    ).toBe(false);
  });

  it('does not fail a suite that ran when an optional bootstrap query failed', () => {
    expect(
      graphqlBenchmarkRunFailed(
        [{ skipped: true }, { skipped: false }],
        ['SampleNullifiers: field "wormhole_nullifier" not found']
      )
    ).toBe(false);
  });

  it('fails when an executed operation reports an error', () => {
    expect(
      graphqlBenchmarkRunFailed(
        [{ skipped: true }, { errorMessage: 'timed out after 30000ms' }],
        []
      )
    ).toBe(true);
  });
});
