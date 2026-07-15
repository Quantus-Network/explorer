import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';

import type { Removed_Multisig_Proposal_Bool_Exp } from '@/__generated__/graphql';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import type { MultisigProposalRemovedSorts } from '@/constants/query-sorts';
import type {
  MultisigProposalRemovedListResponse,
  MultisigProposalRemovedResponse,
  MultisigProposalRemovedStatsResponse
} from '@/schemas';
import type { PaginatedQueryVariables } from '@/types/query';
import { useGetRecentDateRange } from '@/utils/get-recent-date-range';

const MULTISIG_PROPOSAL_REMOVED_FIELDS = gql`
  fragment MultisigProposalRemovedFields on removed_multisig_proposal {
    id
    timestamp
    removedBy {
      id
    }
    proposal {
      id
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
  useGetStats: (
    config?: Omit<
      QueryHookOptions<MultisigProposalRemovedStatsResponse>,
      'variables'
    >
  ) => {
    const { startDate, endDate } = useGetRecentDateRange();

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
