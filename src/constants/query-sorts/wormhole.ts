export const WORMHOLE_EXTRINSIC_SORTS = {
  id: {
    ASC: 'id_ASC',
    DESC: 'id_DESC'
  },
  privacyScore: {
    ASC: 'privacyScore_ASC',
    DESC: 'privacyScore_DESC'
  },
  totalAmount: {
    ASC: 'totalAmount_ASC',
    DESC: 'totalAmount_DESC'
  },
  outputCount: {
    ASC: 'outputCount_ASC',
    DESC: 'outputCount_DESC'
  },
  timestamp: {
    ASC: 'timestamp_ASC',
    DESC: 'timestamp_DESC'
  },
  privacyLabel: {
    ASC: 'privacyLabel_ASC',
    DESC: 'privacyLabel_DESC'
  }
} as const;

export const WORMHOLE_EXTRINSIC_SORTS_LITERALS = Object.values(
  WORMHOLE_EXTRINSIC_SORTS
).flatMap((sort) => Object.values(sort));

export const WORMHOLE_EXTRINSIC_SORTS_KEY = Object.keys(
  WORMHOLE_EXTRINSIC_SORTS
);

// Adding null, because we can sort by null to indicate no sorting
export type WormholeExtrinsicSorts =
  | (typeof WORMHOLE_EXTRINSIC_SORTS_LITERALS)[number]
  | null;
