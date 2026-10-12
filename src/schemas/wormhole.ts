import type * as gql from '../__generated__/graphql';

// Full wormhole extrinsic for detail view
export interface WormholeExtrinsicDetail
  extends Pick<
    gql.Wormhole_Extrinsic,
    'id' | 'total_amount' | 'output_count' | 'timestamp'
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

export interface WormholeExtrinsicResponse {
  wormholeExtrinsicById: WormholeExtrinsicDetail;
  wormholeNullifiers: WormholeNullifier[];
}
