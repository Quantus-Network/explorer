import type * as gql from '../__generated__/graphql';

import type { MultisigProposalRef } from './multisig-proposal-created';

export interface MultisigProposalCancelled
  extends Omit<
    gql.Cancelled_Multisig_Proposal,
    'block' | 'event' | 'extrinsic' | 'proposal' | 'cancelledBy'
  > {
  block: Pick<gql.Block, 'height'>;
  extrinsic?: Pick<gql.Extrinsic, 'id' | 'pallet' | 'call'> | null;
  cancelledBy?: Pick<gql.Account, 'id'> | null;
  proposal?: MultisigProposalRef | null;
}

export interface MultisigProposalCancelledResponse {
  multisigProposalCancelled: MultisigProposalCancelled | null;
}

export interface MultisigProposalCancelledListResponse {
  multisigProposalCancelledEvents: MultisigProposalCancelled[];
  meta: {
    aggregate: {
      totalCount: number;
    };
  };
}

export interface RecentMultisigProposalCancelledResponse {
  multisigProposalCancelledEvents: MultisigProposalCancelled[];
}

export interface MultisigProposalCancelledStatsResponse {
  allTime: {
    total_multisig_proposals_cancelled: number;
  };
  last24Hour: {
    aggregate: {
      totalCount: number;
    };
  };
}
