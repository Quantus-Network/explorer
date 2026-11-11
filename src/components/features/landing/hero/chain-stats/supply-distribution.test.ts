import { KNOWN_ADDRESSES } from '@/constants/known-addresses';

import {
  computeSupplyDistribution,
  type KnownAccountBalance,
  type SupplyDistributionInput
} from './supply-distribution';

const BRIDGE = KNOWN_ADDRESSES.nearIntentsBridge.address;
const VESTING = KNOWN_ADDRESSES.vestingContract.address;

/** Mainnet snapshot (raw token amounts). */
const TOTAL_SUPPLY = '5786516725244095623';
const CIRCULATING_SUPPLY = '333711807566964724';
const BRIDGE_FREE = '218522096109355884';
const VESTING_FREE = '5459940001000000000';

const account = (
  id: string,
  free: string,
  reserved = '0'
): KnownAccountBalance => ({ id, free, reserved });

const mainnet = (
  overrides: Partial<SupplyDistributionInput> = {}
): SupplyDistributionInput => ({
  totalSupply: TOTAL_SUPPLY,
  circulatingSupply: CIRCULATING_SUPPLY,
  accounts: [account(BRIDGE, BRIDGE_FREE), account(VESTING, VESTING_FREE)],
  ...overrides
});

describe('computeSupplyDistribution', () => {
  it('splits circulating supply into bridge, unlocked vesting, and users & miners', () => {
    const buckets = computeSupplyDistribution(mainnet());

    expect(buckets.map(({ label, amount }) => ({ label, amount }))).toEqual([
      { label: 'NEAR Intents Bridge', amount: BigInt('218522096109355884') },
      {
        label: 'Vesting (unlocked, unclaimed)',
        amount: BigInt('7135083322869101')
      },
      { label: 'Users & miners', amount: BigInt('108054628134739739') }
    ]);
  });

  it('accounts for all of circulating supply across the buckets', () => {
    const total = computeSupplyDistribution(mainnet()).reduce(
      (sum, { amount }) => sum + amount,
      BigInt(0)
    );

    expect(total).toBe(BigInt(CIRCULATING_SUPPLY));
  });

  it('counts reserved as well as free balance for each known account', () => {
    const buckets = computeSupplyDistribution(
      mainnet({
        accounts: [
          account(BRIDGE, '218522096109355000', '884'),
          account(VESTING, '5459940000000000000', '1000000000')
        ]
      })
    );

    expect(buckets.map(({ amount }) => amount)).toEqual([
      BigInt('218522096109355884'),
      BigInt('7135083322869101'),
      BigInt('108054628134739739')
    ]);
  });

  it('treats a bridge without an account row as holding nothing', () => {
    const buckets = computeSupplyDistribution(
      mainnet({ accounts: [account(VESTING, VESTING_FREE)] })
    );

    expect(buckets.map(({ amount }) => amount)).toEqual([
      BigInt(0),
      BigInt('7135083322869101'),
      BigInt('326576724244095623')
    ]);
  });

  it('gives each bucket its share of circulating supply rounded half-up to two decimals', () => {
    const buckets = computeSupplyDistribution(mainnet());

    expect(buckets.map(({ share }) => share)).toEqual([65.48, 2.14, 32.38]);
  });

  it('rejects a vesting contract holding less than the still-locked vesting', () => {
    expect(() =>
      computeSupplyDistribution(
        mainnet({
          accounts: [
            account(BRIDGE, BRIDGE_FREE),
            account(VESTING, '5452804917677130898')
          ]
        })
      )
    ).toThrow(/vesting contract/i);
  });

  it('rejects a circulating supply above total supply', () => {
    expect(() =>
      computeSupplyDistribution(
        mainnet({ totalSupply: '1', circulatingSupply: '2' })
      )
    ).toThrow(/exceeds total supply/);
  });

  it('rejects known holdings above circulating supply', () => {
    expect(() =>
      computeSupplyDistribution(
        mainnet({
          accounts: [
            account(BRIDGE, '326576724244095624'),
            account(VESTING, VESTING_FREE)
          ]
        })
      )
    ).toThrow(/exceed circulating supply/);
  });

  it('rejects a zero circulating supply', () => {
    expect(() =>
      computeSupplyDistribution(
        mainnet({ totalSupply: '0', circulatingSupply: '0', accounts: [] })
      )
    ).toThrow(/circulating supply is zero/);
  });

  it('rejects a supply or balance that is not an integer string', () => {
    expect(() =>
      computeSupplyDistribution(mainnet({ circulatingSupply: '1.5' }))
    ).toThrow(/integer/);
    expect(() =>
      computeSupplyDistribution(
        mainnet({
          accounts: [
            account(BRIDGE, BRIDGE_FREE, '-1'),
            account(VESTING, VESTING_FREE)
          ]
        })
      )
    ).toThrow(/integer/);
  });

  it('rejects an account row that is not a known supply holder', () => {
    expect(() =>
      computeSupplyDistribution(
        mainnet({
          accounts: [
            account(BRIDGE, BRIDGE_FREE),
            account(VESTING, VESTING_FREE),
            account(KNOWN_ADDRESSES.minting.address, '0')
          ]
        })
      )
    ).toThrow(/unexpected account/);
  });
});
