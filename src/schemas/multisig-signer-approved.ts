import type * as gql from '../__generated__/graphql';

import type { MultisigProposalRef } from './multisig-proposal-created';

export interface MultisigSignerApproved
  extends Omit<
    gql.Multisig_Signer_Approved,
    'block' | 'event' | 'extrinsic' | 'proposal' | 'approver'
  > {
  block: Pick<gql.Block, 'height'>;
  extrinsic?: Pick<gql.Extrinsic, 'id' | 'pallet' | 'call'> | null;
  approver?: Pick<gql.Account, 'id'> | null;
  proposal?: MultisigProposalRef | null;
}

export interface MultisigSignerApprovedResponse {
  multisigSignerApprovedEvents: MultisigSignerApproved[];
}

export interface MultisigSignerApprovedListResponse {
  multisigSignerApprovedEvents: MultisigSignerApproved[];
  meta: {
    aggregate: {
      totalCount: number;
    };
  };
}

export interface RecentMultisigSignerApprovedResponse {
  multisigSignerApprovedEvents: MultisigSignerApproved[];
}

export interface MultisigSignerApprovedStatsResponse {
  allTime: {
    total_multisig_signer_approved: number;
  };
  last24Hour: {
    aggregate: {
      totalCount: number;
    };
  };
}
