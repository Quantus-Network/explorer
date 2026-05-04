import type * as gql from '../__generated__/graphql';

// Core wormhole extrinsic for list views
export interface WormholeExtrinsic
  extends Pick<
    gql.Wormhole_Extrinsic,
    | 'id'
    | 'total_amount'
    | 'output_count'
    | 'timestamp'
    | 'privacy_score'
    | 'privacy_label'
  > {
  extrinsic: Pick<gql.Extrinsic, 'id' | 'pallet' | 'call'> | null;
  block: Pick<gql.Block, 'height'>;
}

// Full wormhole extrinsic for detail view
export interface WormholeExtrinsicDetail
  extends Pick<
    gql.Wormhole_Extrinsic,
    | 'id'
    | 'total_amount'
    | 'output_count'
    | 'timestamp'
    | 'privacy_score'
    | 'privacy_score01_pct'
    | 'privacy_score1_pct'
    | 'privacy_score5_pct'
    | 'privacy_label'
    | 'pool_snapshot'
  > {
  extrinsic: Pick<gql.Extrinsic, 'id' | 'pallet' | 'call'> | null;
  block: Pick<gql.Block, 'id' | 'height' | 'hash' | 'timestamp'>;
  outputs: WormholeOutput[];
}

export interface WormholeOutput {
  id: string;
  exitAccount: Pick<gql.Account, 'id'>;
  amount: gql.Scalars['numeric']['output'];
}

export interface WormholeNullifier
  extends Pick<gql.Wormhole_Nullifier, 'nullifier' | 'nullifier_hash'> {}

export interface DepositPoolStats
  extends Pick<gql.Deposit_Pool_Stats, 'last_updated_block' | 'buckets'> {}

// API Response types
export interface WormholeExtrinsicListResponse {
  wormholeExtrinsics: WormholeExtrinsic[];
  meta: {
    aggregate: {
      totalCount: number;
    };
  };
}

export interface WormholeExtrinsicResponse {
  wormholeExtrinsicById: WormholeExtrinsicDetail;
  wormholeNullifiers: WormholeNullifier[];
}

export interface DepositPoolStatsResponse {
  depositPoolStatsById: DepositPoolStats;
}
