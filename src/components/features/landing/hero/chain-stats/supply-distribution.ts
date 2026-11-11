import { KNOWN_ADDRESSES } from '@/constants/known-addresses';

export interface KnownAccountBalance {
  id: string;
  free: string;
  reserved: string;
}

export interface SupplyDistributionInput {
  totalSupply: string;
  circulatingSupply: string;
  /** Rows for {@link SUPPLY_HOLDER_ADDRESSES}; an address without a row holds nothing. */
  accounts: KnownAccountBalance[];
}

export interface SupplyBucket {
  label: string;
  /** Raw token amount. */
  amount: bigint;
  /** Percent of circulating supply, rounded half-up to two decimals. */
  share: number;
}

const BRIDGE = KNOWN_ADDRESSES.nearIntentsBridge;
const VESTING = KNOWN_ADDRESSES.vestingContract;

/** Accounts whose balances split circulating supply into buckets. */
export const SUPPLY_HOLDER_ADDRESSES: readonly string[] = [
  BRIDGE.address,
  VESTING.address
];

const parseAmount = (name: string, value: string): bigint => {
  if (!/^\d+$/.test(value)) {
    throw new Error(`${name} is not an integer: ${value}`);
  }
  return BigInt(value);
};

const shareOf = (amount: bigint, circulating: bigint): number => {
  const basisPoints =
    (amount * BigInt(20000) + circulating) / (BigInt(2) * circulating);
  return Number(basisPoints) / 100;
};

/**
 * Split circulating supply between the NEAR Intents bridge, vesting that has
 * unlocked but is still held by the vesting contract, and everyone else.
 * Balances count free plus reserved.
 */
export function computeSupplyDistribution({
  totalSupply,
  circulatingSupply,
  accounts
}: SupplyDistributionInput): SupplyBucket[] {
  const total = parseAmount('total supply', totalSupply);
  const circulating = parseAmount('circulating supply', circulatingSupply);
  if (circulating > total) {
    throw new Error(
      `circulating supply ${circulating} exceeds total supply ${total}`
    );
  }
  if (circulating === BigInt(0)) {
    throw new Error('circulating supply is zero');
  }

  const balances = new Map<string, bigint>();
  accounts.forEach(({ id, free, reserved }) => {
    if (!SUPPLY_HOLDER_ADDRESSES.includes(id)) {
      throw new Error(`unexpected account in supply distribution: ${id}`);
    }
    balances.set(
      id,
      parseAmount(`${id} free`, free) + parseAmount(`${id} reserved`, reserved)
    );
  });

  const bridge = balances.get(BRIDGE.address) ?? BigInt(0);
  const vestingBalance = balances.get(VESTING.address) ?? BigInt(0);
  const lockedVesting = total - circulating;
  if (vestingBalance < lockedVesting) {
    throw new Error(
      `vesting contract holds ${vestingBalance}, less than locked vesting ${lockedVesting}`
    );
  }
  const vestingUnlocked = vestingBalance - lockedVesting;

  const known = bridge + vestingUnlocked;
  if (known > circulating) {
    throw new Error(
      `known holdings ${known} exceed circulating supply ${circulating}`
    );
  }

  return [
    { label: BRIDGE.label, amount: bridge },
    { label: 'Vesting (unlocked, unclaimed)', amount: vestingUnlocked },
    { label: 'Users & miners', amount: circulating - known }
  ].map((bucket) => ({
    ...bucket,
    share: shareOf(bucket.amount, circulating)
  }));
}
