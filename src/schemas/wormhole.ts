import type * as gql from '../__generated__/graphql';

// Core wormhole extrinsic for list views
export interface WormholeExtrinsic
  extends Pick<
    gql.WormholeExtrinsic,
    | 'id'
    | 'extrinsicHash'
    | 'totalAmount'
    | 'outputCount'
    | 'timestamp'
    | 'privacyScore'
    | 'privacyLabel'
  > {
  block: Pick<gql.Block, 'height'>;
}

// Full wormhole extrinsic for detail view
export interface WormholeExtrinsicDetail
  extends Pick<
    gql.WormholeExtrinsic,
    | 'id'
    | 'extrinsicHash'
    | 'totalAmount'
    | 'outputCount'
    | 'timestamp'
    | 'privacyScore'
    | 'privacyScore01Pct'
    | 'privacyScore1Pct'
    | 'privacyScore5Pct'
    | 'privacyLabel'
    | 'poolSnapshot'
  > {
  block: Pick<gql.Block, 'id' | 'height' | 'hash' | 'timestamp'>;
  outputs: WormholeOutput[];
}

export interface WormholeOutput {
  id: string;
  exitAccount: Pick<gql.Account, 'id'>;
  amount: gql.Scalars['BigInt']['output'];
}

export interface WormholeNullifier
  extends Pick<gql.WormholeNullifier, 'nullifier' | 'nullifierHash'> {}

export interface DepositPoolStats
  extends Pick<gql.DepositPoolStats, 'lastUpdatedBlock' | 'buckets'> {}

// API Response types
export interface WormholeExtrinsicListResponse {
  wormholeExtrinsics: WormholeExtrinsic[];
  meta: {
    totalCount: number;
  };
}

export interface WormholeExtrinsicResponse {
  wormholeExtrinsicById: WormholeExtrinsicDetail;
  wormholeNullifiers: WormholeNullifier[];
}

export interface DepositPoolStatsResponse {
  depositPoolStatsById: DepositPoolStats;
}
