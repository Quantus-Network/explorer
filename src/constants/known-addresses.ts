export interface KnownAddress {
  address: string;
  /** Account-type label shown in place of the classified account type. */
  label: string;
}

/** Addresses the explorer names on their own instead of classifying them by account type. */
export const KNOWN_ADDRESSES = {
  /** Chain minting account. From columns also special-case it. */
  minting: {
    address: 'qzjUYyuN4L3HKmBPMxHvK2n8HYnaLZcQvLSQTgdwB2nQ1g2mc',
    label: 'Minting Address'
  },
  vestingContract: {
    address: 'qzmviwoPJR19XovVwUYUoUKb2MoBygYgwYAevj5Br8JeunxW7',
    label: 'Vesting Contract'
  },
  /** Mainnet NEAR Intents bridge custody account. */
  nearIntentsBridge: {
    address: 'qzmzw3Bf2sPHaqSZJnUmNJAYiD5DZosZ4xw1kZduqGGKePTDk',
    label: 'NEAR Intents Bridge'
  }
} as const satisfies Record<string, KnownAddress>;

/** Plain text shown in From columns in place of the minting address. */
export const MINTING_ADDRESS_FROM_LABEL = 'wormhole';
