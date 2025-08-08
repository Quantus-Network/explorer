export const MINER_REWARD_SORTS = {
  id: {
    ASC: 'id_ASC',
    DESC: 'id_DESC'
  },
  timestamp: {
    ASC: 'timestamp_ASC',
    DESC: 'timestamp_DESC'
  },
  blockHeight: {
    ASC: 'block_height_ASC',
    DESC: 'block_height_DESC'
  },
  reward: {
    ASC: 'reward_ASC',
    DESC: 'reward_DESC'
  },
  miner: {
    id_ASC: 'miner_id_ASC',
    id_DESC: 'miner_id_DESC'
  }
} as const;

export const MINER_REWARD_SORTS_LITERALS = Object.values(
  MINER_REWARD_SORTS
).flatMap((sort) => Object.values(sort));

export const MINER_REWARD_SORTS_KEY = Object.keys(MINER_REWARD_SORTS);

// Adding null, because we can sort by null to indicate no sorting
export type MinerRewardSorts =
  | (typeof MINER_REWARD_SORTS_LITERALS)[number]
  | null;
