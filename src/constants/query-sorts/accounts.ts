export const ACCOUNT_SORTS = {
  id: {
    ASC: 'id_ASC',
    DESC: 'id_DESC'
  },
  balance: {
    ASC: 'balance_ASC',
    DESC: 'balance_DESC'
  },
  lastUpdated: {
    ASC: 'lastUpdated_ASC',
    DESC: 'lastUpdated_DESC'
  }
} as const;

export const ACCOUNT_SORTS_LITERALS = Object.values(ACCOUNT_SORTS).flatMap(
  (sort) => Object.values(sort)
);

export const ACCOUNT_SORTS_KEY = Object.keys(ACCOUNT_SORTS);

// Adding null, because we can sort by null to indicate no sorting
export type AccountSorts = (typeof ACCOUNT_SORTS_LITERALS)[number] | null;
