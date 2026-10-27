export const ACCOUNT_DETAIL_TABS = ['activity', 'miner-rewards'] as const;
export type AccountDetailTab = (typeof ACCOUNT_DETAIL_TABS)[number];

export const isAccountDetailTab = (value: unknown): value is AccountDetailTab =>
  typeof value === 'string' &&
  (ACCOUNT_DETAIL_TABS as readonly string[]).includes(value);
