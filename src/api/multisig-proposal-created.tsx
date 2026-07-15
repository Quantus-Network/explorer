import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';

import type { Multisig_Proposal_Created_Bool_Exp } from '@/__generated__/graphql';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import type { MultisigProposalCreatedSorts } from '@/constants/query-sorts';
import type {
  MultisigProposalCreatedListResponse,
  MultisigProposalCreatedResponse,
  MultisigProposalCreatedStatsResponse
} from '@/schemas';
import type { PaginatedQueryVariables } from '@/types/query';
import { useGetRecentDateRange } from '@/utils/get-recent-date-range';

const PROPOSAL_FIELDS = gql`
  fragment MultisigProposalRefFields on multisig_proposal {
    id
    multisig {
      id
    }
    proposer {
      id
    }
  }
`;

const MULTISIG_PROPOSAL_CREATED_FIELDS = gql`
  ${PROPOSAL_FIELDS}
  fragment MultisigProposalCreatedFields on multisig_proposal_created {
    id
    timestamp
    proposal {
      ...MultisigProposalRefFields
    }
    block {
      height
    }
    extrinsic {
      id
      pallet
      call
    }
  }
`;

export const multisigProposalCreated = {
  useGetAll: (
    config?: QueryHookOptions<
      MultisigProposalCreatedListResponse,
      PaginatedQueryVariables<
        MultisigProposalCreatedSorts,
        Multisig_Proposal_Created_Bool_Exp
      >
    >
  ) => {
    const QUERY = gql`
      ${MULTISIG_PROPOSAL_CREATED_FIELDS}
      query GetMultisigProposalCreated(
        $limit: Int
        $offset: Int
        $orderBy: [multisig_proposal_created_order_by!]
        $where: multisig_proposal_created_bool_exp
      ) {
        multisigProposalCreatedEvents: multisig_proposal_created(
          limit: $limit
          offset: $offset
          order_by: $orderBy
          where: $where
        ) {
          ...MultisigProposalCreatedFields
        }
        meta: multisig_proposal_created_aggregate(where: $where) {
          aggregate {
            totalCount: count
          }
        }
      }
    `;

    return useQuery(QUERY, {
      ...config,
      variables: {
        orderBy: config?.variables?.orderBy ?? { timestamp: 'desc' },
        limit: config?.variables?.limit ?? QUERY_DEFAULT_LIMIT,
        offset: config?.variables?.offset ?? 0,
        where: config?.variables?.where
      }
    });
  },
  useGetStats: (
    config?: Omit<
      QueryHookOptions<MultisigProposalCreatedStatsResponse>,
      'variables'
    >
  ) => {
    const { startDate, endDate } = useGetRecentDateRange();

    const QUERY = gql`
      query GetMultisigProposalCreatedStats(
        $startDate: timestamptz!
        $endDate: timestamptz!
      ) {
        last24Hour: multisig_proposal_created_aggregate(
          where: { timestamp: { _gte: $startDate, _lte: $endDate } }
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
  getByHash: () => {
    const QUERY = gql`
      ${MULTISIG_PROPOSAL_CREATED_FIELDS}
      query GetMultisigProposalCreatedByHash($hash: String!) {
        multisigProposalCreatedEvents: multisig_proposal_created(
          where: { extrinsic: { id: { _eq: $hash } } }
        ) {
          ...MultisigProposalCreatedFields
        }
      }
    `;

    return {
      useQuery: (
        hash: string,
        config?: QueryHookOptions<MultisigProposalCreatedResponse>
      ) => useQuery(QUERY, { ...config, variables: { hash } })
    };
  }
};
