import type * as gql from '../__generated__/graphql';
import type { MultisigProposalRef } from './multisig-proposal-created';

export interface MultisigProposalReady
  extends Omit<
    gql.Multisig_Proposal_Ready,
    'block' | 'event' | 'extrinsic' | 'proposal'
  > {
  block: Pick<gql.Block, 'height'>;
  extrinsic?: Pick<gql.Extrinsic, 'id' | 'pallet' | 'call'> | null;
  proposal?: MultisigProposalRef | null;
}

export interface MultisigProposalReadyResponse {
  multisigProposalReadyEvents: MultisigProposalReady[];
}

export interface MultisigProposalReadyListResponse {
  multisigProposalReadyEvents: MultisigProposalReady[];
  meta: {
    aggregate: {
      totalCount: number;
    };
  };
}

export interface MultisigProposalReadyStatsResponse {
  allTime: {
    total_multisig_proposal_ready: number;
  };
  last24Hour: {
    aggregate: {
      totalCount: number;
    };
  };
}
