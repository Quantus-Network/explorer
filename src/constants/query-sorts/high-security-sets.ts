export const HIGH_SECURITY_SET_SORTS = {
  id: {
    ASC: 'id_ASC',
    DESC: 'id_DESC'
  },
  timestamp: {
    ASC: 'timestamp_ASC',
    DESC: 'timestamp_DESC'
  },
  delay: {
    ASC: 'delay_ASC',
    DESC: 'delay_DESC'
  },
  extrinsicHash: {
    ASC: 'extrinsicHash_ASC',
    DESC: 'extrinsicHash_DESC'
  },
  blockHeight: {
    ASC: 'block_height_ASC',
    DESC: 'block_height_DESC'
  },
  who: {
    id_ASC: 'who_id_ASC',
    id_DESC: 'who_id_DESC'
  },
  interceptor: {
    id_ASC: 'interceptor_id_ASC',
    id_DESC: 'interceptor_id_DESC'
  }
} as const;

export const HIGH_SECURITY_SET_SORTS_LITERALS = Object.values(
  HIGH_SECURITY_SET_SORTS
).flatMap((sort) => Object.values(sort));

export const HIGH_SECURITY_SET_SORTS_KEY = Object.keys(HIGH_SECURITY_SET_SORTS);

// Adding null, because we can sort by null to indicate no sorting
export type HighSecuritySetSorts =
  | (typeof HIGH_SECURITY_SET_SORTS_LITERALS)[number]
  | null;
