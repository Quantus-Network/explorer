import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';

import type { Multisig_Proposal_Bool_Exp } from '@/__generated__/graphql';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import type { MultisigProposalSorts } from '@/constants/query-sorts';
import type {
  MultisigProposalDetailResponse,
  MultisigProposalListResponse,
  MultisigProposalStatsResponse
} from '@/schemas';
import type { PaginatedQueryVariables } from '@/types/query';
import { useGetRecentDateRange } from '@/utils/get-recent-date-range';

const MULTISIG_PROPOSAL_LIST_FIELDS = gql`
  fragment MultisigProposalListFields on multisig_proposal {
    id
    status
    deposit
    expiry_block
    created_at
    multisig {
      id
    }
    proposer {
      id
    }
  }
`;

const MULTISIG_PROPOSAL_DETAIL_FIELDS = gql`
  fragment MultisigProposalDetailFields on multisig_proposal {
    id
    status
    deposit
    expiry_block
    approvals
    pallet
    call
    call_raw
    decode_error
    created_at
    tx_id
    transfer_amount
    schedule_amount
    delay_kind
    delay_value
    schedule_asset_id
    multisig {
      id
    }
    proposer {
      id
    }
    guardian {
      id
    }
    transferTo {
      id
    }
    scheduleTo {
      id
    }
    recoverAccount {
      id
    }
    createdExtrinsic {
      id
      pallet
      call
    }
    createdAtBlock {
      height
    }
  }
`;

const MULTISIG_PROPOSAL_LIFECYCLE_EVENT_FIELDS = gql`
  fragment MultisigProposalLifecycleEventFields on multisig_proposal_created {
    id
    timestamp
    extrinsic {
      id
    }
    block {
      height
    }
  }
`;

export const multisigProposals = {
  useGetAll: (
    config?: QueryHookOptions<
      MultisigProposalListResponse,
      PaginatedQueryVariables<MultisigProposalSorts, Multisig_Proposal_Bool_Exp>
    >
  ) => {
    const QUERY = gql`
      ${MULTISIG_PROPOSAL_LIST_FIELDS}
      query GetMultisigProposals(
        $limit: Int
        $offset: Int
        $orderBy: [multisig_proposal_order_by!]
        $where: multisig_proposal_bool_exp
      ) {
        multisigProposals: multisig_proposal(
          limit: $limit
          offset: $offset
          order_by: $orderBy
          where: $where
        ) {
          ...MultisigProposalListFields
        }
        meta: multisig_proposal_aggregate(where: $where) {
          aggregate {
            totalCount: count
          }
        }
      }
    `;

    return useQuery(QUERY, {
      ...config,
      variables: {
        orderBy: config?.variables?.orderBy ?? { created_at: 'desc' },
        limit: config?.variables?.limit ?? QUERY_DEFAULT_LIMIT,
        offset: config?.variables?.offset ?? 0,
        where: config?.variables?.where
      }
    });
  },
  useGetStats: (
    config?: Omit<QueryHookOptions<MultisigProposalStatsResponse>, 'variables'>
  ) => {
    const { startDate, endDate } = useGetRecentDateRange();

    const QUERY = gql`
      query GetMultisigProposalStats(
        $startDate: timestamptz!
        $endDate: timestamptz!
      ) {
        last24Hour: multisig_proposal_aggregate(
          where: { created_at: { _gte: $startDate, _lte: $endDate } }
        ) {
          aggregate {
            totalCount: count
          }
        }
        allTime: chain_stats_by_pk(id: "global") {
          total_multisig_proposals
        }
      }
    `;

    return useQuery(QUERY, {
      ...config,
      variables: { startDate, endDate }
    });
  },
  getById: () => {
    const QUERY = gql`
      ${MULTISIG_PROPOSAL_DETAIL_FIELDS}
      ${MULTISIG_PROPOSAL_LIFECYCLE_EVENT_FIELDS}
      query GetMultisigProposalById($id: String!) {
        multisigProposal: multisig_proposal_by_pk(id: $id) {
          ...MultisigProposalDetailFields
        }
        createdEvents: multisig_proposal_created(
          where: { proposal_id: { _eq: $id } }
          order_by: { timestamp: asc }
        ) {
          ...MultisigProposalLifecycleEventFields
        }
        signerApprovedEvents: multisig_signer_approved(
          where: { proposal_id: { _eq: $id } }
          order_by: { timestamp: asc }
        ) {
          id
          timestamp
          extrinsic {
            id
          }
          block {
            height
          }
        }
        readyEvents: multisig_proposal_ready(
          where: { proposal_id: { _eq: $id } }
          order_by: { timestamp: asc }
        ) {
          id
          timestamp
          extrinsic {
            id
          }
          block {
            height
          }
        }
        executedEvents: executed_multisig_proposal(
          where: { proposal_id: { _eq: $id } }
          order_by: { timestamp: asc }
        ) {
          id
          timestamp
          extrinsic {
            id
          }
          block {
            height
          }
        }
        cancelledEvents: cancelled_multisig_proposal(
          where: { proposal_id: { _eq: $id } }
          order_by: { timestamp: asc }
        ) {
          id
          timestamp
          extrinsic {
            id
          }
          block {
            height
          }
        }
        removedEvents: removed_multisig_proposal(
          where: { proposal_id: { _eq: $id } }
          order_by: { timestamp: asc }
        ) {
          id
          timestamp
          extrinsic {
            id
          }
          block {
            height
          }
        }
      }
    `;

    return {
      useQuery: (
        id: string,
        config?: QueryHookOptions<MultisigProposalDetailResponse>
      ) => useQuery(QUERY, { ...config, variables: { id } })
    };
  }
};
