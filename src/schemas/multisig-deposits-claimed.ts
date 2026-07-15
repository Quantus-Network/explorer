import type * as gql from '../__generated__/graphql';

export interface MultisigDepositsClaimed
  extends Omit<
    gql.Multisig_Deposits_Claimed,
    'block' | 'event' | 'extrinsic' | 'multisig' | 'claimer'
  > {
  block: Pick<gql.Block, 'height'>;
  extrinsic?: Pick<gql.Extrinsic, 'id' | 'pallet' | 'call'> | null;
  multisig?: Pick<gql.Multisig, 'id'> | null;
  claimer?: Pick<gql.Account, 'id'> | null;
}

export interface MultisigDepositsClaimedResponse {
  multisigDepositsClaimedEvents: MultisigDepositsClaimed[];
}

export interface MultisigDepositsClaimedListResponse {
  multisigDepositsClaimedEvents: MultisigDepositsClaimed[];
  meta: {
    aggregate: {
      totalCount: number;
    };
  };
}

export interface MultisigDepositsClaimedStatsResponse {
  allTime: {
    total_multisig_deposits_claimed: number;
  };
  last24Hour: {
    aggregate: {
      totalCount: number;
    };
  };
}
