import type * as gql from '../__generated__/graphql';

export interface MultisigCreated
  extends Omit<gql.Multisig, 'block' | 'event' | 'creator' | 'extrinsic'> {
  block: Pick<gql.Block, 'height'>;
  creator?: Pick<gql.Account, 'id'> | null;
  extrinsic?: Pick<gql.Extrinsic, 'id' | 'pallet' | 'call'> | null;
}

export interface MultisigCreatedResponse {
  multisigCreatedEvents: MultisigCreated[];
}

export interface MultisigByIdResponse {
  multisig: MultisigCreated | null;
}

export interface MultisigCreatedListResponse {
  multisigCreatedEvents: MultisigCreated[];
  meta: {
    aggregate: {
      totalCount: number;
    };
  };
}

export interface MultisigCreatedStatsResponse {
  allTime: {
    total_multisigs_created: number;
  };
  last24Hour: {
    aggregate: {
      totalCount: number;
    };
  };
}
