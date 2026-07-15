import type * as gql from '../__generated__/graphql';
import type { MultisigProposalRef } from './multisig-proposal-created';

export interface MultisigProposalRemoved
  extends Omit<
    gql.Removed_Multisig_Proposal,
    'block' | 'event' | 'extrinsic' | 'proposal' | 'removedBy'
  > {
  block: Pick<gql.Block, 'height'>;
  extrinsic?: Pick<gql.Extrinsic, 'id' | 'pallet' | 'call'> | null;
  removedBy?: Pick<gql.Account, 'id'> | null;
  proposal?: MultisigProposalRef | null;
}

export interface MultisigProposalRemovedResponse {
  multisigProposalRemovedEvents: MultisigProposalRemoved[];
}

export interface MultisigProposalRemovedListResponse {
  multisigProposalRemovedEvents: MultisigProposalRemoved[];
  meta: {
    aggregate: {
      totalCount: number;
    };
  };
}

export interface MultisigProposalRemovedStatsResponse {
  allTime: {
    total_multisig_proposals_removed: number;
  };
  last24Hour: {
    aggregate: {
      totalCount: number;
    };
  };
}
