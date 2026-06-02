import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';
import { endOfToday } from 'date-fns/endOfToday';
import { startOfToday } from 'date-fns/startOfToday';

import type { Multisig_Proposal_Created_Bool_Exp } from '@/__generated__/graphql';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import { QUERY_RECENT_LIMIT } from '@/constants/query-recent-limit';
import type { MultisigProposalCreatedSorts } from '@/constants/query-sorts';
import type {
  MultisigProposalCreatedListResponse,
  MultisigProposalCreatedResponse,
  MultisigProposalCreatedStatsResponse,
  RecentMultisigProposalCreatedResponse
} from '@/schemas';
import type { PaginatedQueryVariables } from '@/types/query';

const PROPOSAL_FIELDS = gql`
  fragment MultisigProposalRefFields on multisig_proposal {
    id
    proposal_id
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
  useGetRecent: (
    config?: Omit<
      QueryHookOptions<RecentMultisigProposalCreatedResponse>,
      'variables'
    >
  ) => {
    const QUERY = gql`
      ${MULTISIG_PROPOSAL_CREATED_FIELDS}
      query GetRecentMultisigProposalCreated(
        $limit: Int
        $orderBy: [multisig_proposal_created_order_by!]
      ) {
        multisigProposalCreatedEvents: multisig_proposal_created(
          limit: $limit
          order_by: $orderBy
        ) {
          ...MultisigProposalCreatedFields
        }
      }
    `;

    return useQuery(QUERY, {
      ...config,
      variables: { orderBy: { timestamp: 'desc' }, limit: QUERY_RECENT_LIMIT }
    });
  },
  useGetStats: (
    config?: Omit<
      QueryHookOptions<MultisigProposalCreatedStatsResponse>,
      'variables'
    >
  ) => {
    const startDate = startOfToday().toISOString();
    const endDate = endOfToday().toISOString();

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
  getById: () => {
    const QUERY = gql`
      ${MULTISIG_PROPOSAL_CREATED_FIELDS}
      query GetMultisigProposalCreatedById($id: String!) {
        multisigProposalCreated: multisig_proposal_created_by_pk(id: $id) {
          ...MultisigProposalCreatedFields
        }
      }
    `;

    return {
      useQuery: (
        id: string,
        config?: QueryHookOptions<MultisigProposalCreatedResponse>
      ) => useQuery(QUERY, { ...config, variables: { id } })
    };
  }
};
