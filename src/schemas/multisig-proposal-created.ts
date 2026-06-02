import type * as gql from '../__generated__/graphql';

export interface MultisigProposalRef {
  id: string;
  proposal_id: number;
  multisig?: Pick<gql.Multisig, 'id'> | null;
  proposer?: Pick<gql.Account, 'id'> | null;
}

export interface MultisigProposalCreated
  extends Omit<
    gql.Multisig_Proposal_Created,
    'block' | 'event' | 'extrinsic' | 'proposal'
  > {
  block: Pick<gql.Block, 'height'>;
  extrinsic?: Pick<gql.Extrinsic, 'id' | 'pallet' | 'call'> | null;
  proposal?: MultisigProposalRef | null;
}

export interface MultisigProposalCreatedResponse {
  multisigProposalCreatedEvents: MultisigProposalCreated[];
}

export interface MultisigProposalCreatedListResponse {
  multisigProposalCreatedEvents: MultisigProposalCreated[];
  meta: {
    aggregate: {
      totalCount: number;
    };
  };
}

export interface RecentMultisigProposalCreatedResponse {
  multisigProposalCreatedEvents: MultisigProposalCreated[];
}

export interface MultisigProposalCreatedStatsResponse {
  allTime: {
    total_multisig_proposals: number;
  };
  last24Hour: {
    aggregate: {
      totalCount: number;
    };
  };
}
