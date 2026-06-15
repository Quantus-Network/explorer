import type * as gql from '../__generated__/graphql';

export interface MultisigProposal
  extends Pick<
    gql.Multisig_Proposal,
    | 'id'
    | 'status'
    | 'deposit'
    | 'expiry_block'
    | 'approvals'
    | 'pallet'
    | 'call'
    | 'call_raw'
    | 'decode_error'
    | 'created_at'
    | 'tx_id'
    | 'transfer_amount'
    | 'schedule_amount'
    | 'delay_kind'
    | 'delay_value'
    | 'schedule_asset_id'
  > {
  multisig?: Pick<gql.Multisig, 'id'> | null;
  proposer?: Pick<gql.Account, 'id'> | null;
  guardian?: Pick<gql.Account, 'id'> | null;
  transferTo?: Pick<gql.Account, 'id'> | null;
  scheduleTo?: Pick<gql.Account, 'id'> | null;
  recoverAccount?: Pick<gql.Account, 'id'> | null;
  createdExtrinsic?: Pick<gql.Extrinsic, 'id' | 'pallet' | 'call'> | null;
  createdAtBlock?: Pick<gql.Block, 'height'> | null;
}

export interface MultisigProposalLifecycleEvent {
  id: string;
  timestamp: string;
  extrinsic?: Pick<gql.Extrinsic, 'id'> | null;
  block?: Pick<gql.Block, 'height'> | null;
}

export interface MultisigProposalDetailResponse {
  multisigProposal?: MultisigProposal | null;
  createdEvents: MultisigProposalLifecycleEvent[];
  signerApprovedEvents: MultisigProposalLifecycleEvent[];
  readyEvents: MultisigProposalLifecycleEvent[];
  executedEvents: MultisigProposalLifecycleEvent[];
  cancelledEvents: MultisigProposalLifecycleEvent[];
  removedEvents: MultisigProposalLifecycleEvent[];
}

export interface MultisigProposalListResponse {
  multisigProposals: MultisigProposal[];
  meta: {
    aggregate: {
      totalCount: number;
    };
  };
}

export interface MultisigProposalStatsResponse {
  allTime: {
    total_multisig_proposals: number;
  };
  last24Hour: {
    aggregate: {
      totalCount: number;
    };
  };
}
