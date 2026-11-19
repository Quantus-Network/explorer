export interface KnownAddress {
  address: string;
  /** Names shown in the Tags field, independent of the account type. */
  tags: readonly string[];
}

/** Addresses the explorer tags by name. */
export const KNOWN_ADDRESSES = {
  /** Chain minting account. From columns also special-case it. */
  minting: {
    address: 'qzjUYyuN4L3HKmBPMxHvK2n8HYnaLZcQvLSQTgdwB2nQ1g2mc',
    tags: ['Minting Address']
  },
  vestingContract: {
    address: 'qzmviwoPJR19XovVwUYUoUKb2MoBygYgwYAevj5Br8JeunxW7',
    tags: ['Vesting Contract']
  },
  /** Mainnet NEAR Intents bridge custody account. */
  nearIntentsBridge: {
    address: 'qzmzw3Bf2sPHaqSZJnUmNJAYiD5DZosZ4xw1kZduqGGKePTDk',
    tags: ['NEAR Intents Bridge']
  }
} as const satisfies Record<string, KnownAddress>;

/** Plain text shown in From columns in place of the minting address. */
export const MINTING_ADDRESS_FROM_LABEL = 'wormhole';
