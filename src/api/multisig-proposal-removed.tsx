import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';
import { endOfToday } from 'date-fns/endOfToday';
import { startOfToday } from 'date-fns/startOfToday';

import type { Removed_Multisig_Proposal_Bool_Exp } from '@/__generated__/graphql';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import { QUERY_RECENT_LIMIT } from '@/constants/query-recent-limit';
import type { MultisigProposalRemovedSorts } from '@/constants/query-sorts';
import type {
  MultisigProposalRemovedListResponse,
  MultisigProposalRemovedResponse,
  MultisigProposalRemovedStatsResponse,
  RecentMultisigProposalRemovedResponse
} from '@/schemas';
import type { PaginatedQueryVariables } from '@/types/query';

const MULTISIG_PROPOSAL_REMOVED_FIELDS = gql`
  fragment MultisigProposalRemovedFields on removed_multisig_proposal {
    id
    timestamp
    removedBy {
      id
    }
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

export const multisigProposalRemoved = {
  useGetAll: (
    config?: QueryHookOptions<
      MultisigProposalRemovedListResponse,
      PaginatedQueryVariables<
        MultisigProposalRemovedSorts,
        Removed_Multisig_Proposal_Bool_Exp
      >
    >
  ) => {
    const QUERY = gql`
      ${MULTISIG_PROPOSAL_REMOVED_FIELDS}
      query GetMultisigProposalRemoved(
        $limit: Int
        $offset: Int
        $orderBy: [removed_multisig_proposal_order_by!]
        $where: removed_multisig_proposal_bool_exp
      ) {
        multisigProposalRemovedEvents: removed_multisig_proposal(
          limit: $limit
          offset: $offset
          order_by: $orderBy
          where: $where
        ) {
          ...MultisigProposalRemovedFields
        }
        meta: removed_multisig_proposal_aggregate(where: $where) {
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
      QueryHookOptions<RecentMultisigProposalRemovedResponse>,
      'variables'
    >
  ) => {
    const QUERY = gql`
      ${MULTISIG_PROPOSAL_REMOVED_FIELDS}
      query GetRecentMultisigProposalRemoved(
        $limit: Int
        $orderBy: [removed_multisig_proposal_order_by!]
      ) {
        multisigProposalRemovedEvents: removed_multisig_proposal(
          limit: $limit
          order_by: $orderBy
        ) {
          ...MultisigProposalRemovedFields
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
      QueryHookOptions<MultisigProposalRemovedStatsResponse>,
      'variables'
    >
  ) => {
    const startDate = startOfToday().toISOString();
    const endDate = endOfToday().toISOString();

    const QUERY = gql`
      query GetMultisigProposalRemovedStats(
        $startDate: timestamptz!
        $endDate: timestamptz!
      ) {
        last24Hour: removed_multisig_proposal_aggregate(
          where: { timestamp: { _gte: $startDate, _lte: $endDate } }
        ) {
          aggregate {
            totalCount: count
          }
        }
        allTime: chain_stats_by_pk(id: "global") {
          total_multisig_proposals_removed
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
      ${MULTISIG_PROPOSAL_REMOVED_FIELDS}
      query GetMultisigProposalRemovedByHash($hash: String!) {
        multisigProposalRemovedEvents: removed_multisig_proposal(
          where: { extrinsic: { id: { _eq: $hash } } }
        ) {
          ...MultisigProposalRemovedFields
        }
      }
    `;

    return {
      useQuery: (
        hash: string,
        config?: QueryHookOptions<MultisigProposalRemovedResponse>
      ) => useQuery(QUERY, { ...config, variables: { hash } })
    };
  }
};
