export const ERROR_EVENT_SORTS = {
  id: {
    ASC: 'id_ASC',
    DESC: 'id_DESC'
  },
  timestamp: {
    ASC: 'timestamp_ASC',
    DESC: 'timestamp_DESC'
  },
  errorType: {
    ASC: 'errorType_ASC',
    DESC: 'errorType_DESC'
  },
  errorModule: {
    ASC: 'errorModule_ASC',
    DESC: 'errorModule_DESC'
  },
  errorName: {
    ASC: 'errorName_ASC',
    DESC: 'errorName_DESC'
  },
  extrinsicHash: {
    ASC: 'extrinsicHash_ASC',
    DESC: 'extrinsicHash_DESC'
  },
  blockHeight: {
    ASC: 'block_height_ASC',
    DESC: 'block_height_DESC'
  }
} as const;

export const ERROR_EVENT_SORTS_LITERALS = Object.values(
  ERROR_EVENT_SORTS
).flatMap((sort) => Object.values(sort));

export const ERROR_EVENT_SORTS_KEY = Object.keys(ERROR_EVENT_SORTS);

// Adding null, because we can sort by null to indicate no sorting
export type ErrorEventSorts =
  | (typeof ERROR_EVENT_SORTS_LITERALS)[number]
  | null;
