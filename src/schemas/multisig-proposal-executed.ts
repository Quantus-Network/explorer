import type * as gql from '../__generated__/graphql';

import type { MultisigProposalRef } from './multisig-proposal-created';

export interface MultisigProposalExecuted
  extends Omit<
    gql.Executed_Multisig_Proposal,
    'block' | 'event' | 'extrinsic' | 'proposal'
  > {
  block: Pick<gql.Block, 'height'>;
  extrinsic?: Pick<gql.Extrinsic, 'id' | 'pallet' | 'call'> | null;
  proposal?: MultisigProposalRef | null;
}

export interface MultisigProposalExecutedResponse {
  multisigProposalExecutedEvents: MultisigProposalExecuted[];
}

export interface MultisigProposalExecutedListResponse {
  multisigProposalExecutedEvents: MultisigProposalExecuted[];
  meta: {
    aggregate: {
      totalCount: number;
    };
  };
}

export interface RecentMultisigProposalExecutedResponse {
  multisigProposalExecutedEvents: MultisigProposalExecuted[];
}

export interface MultisigProposalExecutedStatsResponse {
  allTime: {
    total_multisig_proposals_executed: number;
  };
  last24Hour: {
    aggregate: {
      totalCount: number;
    };
  };
}
