export const BLOCK_SORTS = {
  id: {
    ASC: 'id_ASC',
    DESC: 'id_DESC'
  },
  hash: {
    ASC: 'hash_ASC',
    DESC: 'hash_DESC'
  },
  height: {
    ASC: 'height_ASC',
    DESC: 'height_DESC'
  },
  reward: {
    ASC: 'reward_ASC',
    DESC: 'reward_DESC'
  },
  timestamp: {
    ASC: 'timestamp_ASC',
    DESC: 'timestamp_DESC'
  }
} as const;

export const BLOCK_SORTS_LITERALS = Object.values(BLOCK_SORTS).flatMap((sort) =>
  Object.values(sort)
);

export const BLOCK_SORTS_KEY = Object.keys(BLOCK_SORTS);

// Adding null, because we can sort by null to indicate no sorting
export type BlockSorts = (typeof BLOCK_SORTS_LITERALS)[number] | null;
