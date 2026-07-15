import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';

import type { Cancelled_Multisig_Proposal_Bool_Exp } from '@/__generated__/graphql';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import type { MultisigProposalCancelledSorts } from '@/constants/query-sorts';
import type {
  MultisigProposalCancelledListResponse,
  MultisigProposalCancelledResponse,
  MultisigProposalCancelledStatsResponse
} from '@/schemas';
import type { PaginatedQueryVariables } from '@/types/query';
import { useGetRecentDateRange } from '@/utils/get-recent-date-range';

const MULTISIG_PROPOSAL_CANCELLED_FIELDS = gql`
  fragment MultisigProposalCancelledFields on cancelled_multisig_proposal {
    id
    timestamp
    cancelledBy {
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

export const multisigProposalCancelled = {
  useGetAll: (
    config?: QueryHookOptions<
      MultisigProposalCancelledListResponse,
      PaginatedQueryVariables<
        MultisigProposalCancelledSorts,
        Cancelled_Multisig_Proposal_Bool_Exp
      >
    >
  ) => {
    const QUERY = gql`
      ${MULTISIG_PROPOSAL_CANCELLED_FIELDS}
      query GetMultisigProposalCancelled(
        $limit: Int
        $offset: Int
        $orderBy: [cancelled_multisig_proposal_order_by!]
        $where: cancelled_multisig_proposal_bool_exp
      ) {
        multisigProposalCancelledEvents: cancelled_multisig_proposal(
          limit: $limit
          offset: $offset
          order_by: $orderBy
          where: $where
        ) {
          ...MultisigProposalCancelledFields
        }
        meta: cancelled_multisig_proposal_aggregate(where: $where) {
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
      QueryHookOptions<MultisigProposalCancelledStatsResponse>,
      'variables'
    >
  ) => {
    const { startDate, endDate } = useGetRecentDateRange();

    const QUERY = gql`
      query GetMultisigProposalCancelledStats(
        $startDate: timestamptz!
        $endDate: timestamptz!
      ) {
        last24Hour: cancelled_multisig_proposal_aggregate(
          where: { timestamp: { _gte: $startDate, _lte: $endDate } }
        ) {
          aggregate {
            totalCount: count
          }
        }
        allTime: chain_stats_by_pk(id: "global") {
          total_multisig_proposals_cancelled
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
      ${MULTISIG_PROPOSAL_CANCELLED_FIELDS}
      query GetMultisigProposalCancelledByHash($hash: String!) {
        multisigProposalCancelledEvents: cancelled_multisig_proposal(
          where: { extrinsic: { id: { _eq: $hash } } }
        ) {
          ...MultisigProposalCancelledFields
        }
      }
    `;

    return {
      useQuery: (
        hash: string,
        config?: QueryHookOptions<MultisigProposalCancelledResponse>
      ) => useQuery(QUERY, { ...config, variables: { hash } })
    };
  }
};
