import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';
import { endOfToday } from 'date-fns/endOfToday';
import { startOfToday } from 'date-fns/startOfToday';

import type { Executed_Multisig_Proposal_Bool_Exp } from '@/__generated__/graphql';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import { QUERY_RECENT_LIMIT } from '@/constants/query-recent-limit';
import type { MultisigProposalExecutedSorts } from '@/constants/query-sorts';
import type {
  MultisigProposalExecutedListResponse,
  MultisigProposalExecutedResponse,
  MultisigProposalExecutedStatsResponse,
  RecentMultisigProposalExecutedResponse
} from '@/schemas';
import type { PaginatedQueryVariables } from '@/types/query';

const MULTISIG_PROPOSAL_EXECUTED_FIELDS = gql`
  fragment MultisigProposalExecutedFields on executed_multisig_proposal {
    id
    timestamp
    approvers
    result
    proposal {
      id
      proposal_id
      multisig {
        id
      }
      proposer {
        id
      }
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

export const multisigProposalExecuted = {
  useGetAll: (
    config?: QueryHookOptions<
      MultisigProposalExecutedListResponse,
      PaginatedQueryVariables<
        MultisigProposalExecutedSorts,
        Executed_Multisig_Proposal_Bool_Exp
      >
    >
  ) => {
    const QUERY = gql`
      ${MULTISIG_PROPOSAL_EXECUTED_FIELDS}
      query GetMultisigProposalExecuted(
        $limit: Int
        $offset: Int
        $orderBy: [executed_multisig_proposal_order_by!]
        $where: executed_multisig_proposal_bool_exp
      ) {
        multisigProposalExecutedEvents: executed_multisig_proposal(
          limit: $limit
          offset: $offset
          order_by: $orderBy
          where: $where
        ) {
          ...MultisigProposalExecutedFields
        }
        meta: executed_multisig_proposal_aggregate(where: $where) {
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
      QueryHookOptions<RecentMultisigProposalExecutedResponse>,
      'variables'
    >
  ) => {
    const QUERY = gql`
      ${MULTISIG_PROPOSAL_EXECUTED_FIELDS}
      query GetRecentMultisigProposalExecuted(
        $limit: Int
        $orderBy: [executed_multisig_proposal_order_by!]
      ) {
        multisigProposalExecutedEvents: executed_multisig_proposal(
          limit: $limit
          order_by: $orderBy
        ) {
          ...MultisigProposalExecutedFields
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
      QueryHookOptions<MultisigProposalExecutedStatsResponse>,
      'variables'
    >
  ) => {
    const startDate = startOfToday().toISOString();
    const endDate = endOfToday().toISOString();

    const QUERY = gql`
      query GetMultisigProposalExecutedStats(
        $startDate: timestamptz!
        $endDate: timestamptz!
      ) {
        last24Hour: executed_multisig_proposal_aggregate(
          where: { timestamp: { _gte: $startDate, _lte: $endDate } }
        ) {
          aggregate {
            totalCount: count
          }
        }
        allTime: chain_stats_by_pk(id: "global") {
          total_multisig_proposals_executed
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
      ${MULTISIG_PROPOSAL_EXECUTED_FIELDS}
      query GetMultisigProposalExecutedById($id: String!) {
        multisigProposalExecuted: executed_multisig_proposal_by_pk(id: $id) {
          ...MultisigProposalExecutedFields
        }
      }
    `;

    return {
      useQuery: (
        id: string,
        config?: QueryHookOptions<MultisigProposalExecutedResponse>
      ) => useQuery(QUERY, { ...config, variables: { id } })
    };
  }
};
