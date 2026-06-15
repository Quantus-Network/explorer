import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';

import type { Multisig_Proposal_Ready_Bool_Exp } from '@/__generated__/graphql';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import { QUERY_RECENT_LIMIT } from '@/constants/query-recent-limit';
import type { MultisigProposalReadySorts } from '@/constants/query-sorts';
import type {
  MultisigProposalReadyListResponse,
  MultisigProposalReadyResponse,
  MultisigProposalReadyStatsResponse,
  RecentMultisigProposalReadyResponse
} from '@/schemas';
import type { PaginatedQueryVariables } from '@/types/query';
import { useGetRecentDateRange } from '@/utils/get-recent-date-range';

const MULTISIG_PROPOSAL_READY_FIELDS = gql`
  fragment MultisigProposalReadyFields on multisig_proposal_ready {
    id
    timestamp
    approvals_count
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

export const multisigProposalReady = {
  useGetAll: (
    config?: QueryHookOptions<
      MultisigProposalReadyListResponse,
      PaginatedQueryVariables<
        MultisigProposalReadySorts,
        Multisig_Proposal_Ready_Bool_Exp
      >
    >
  ) => {
    const QUERY = gql`
      ${MULTISIG_PROPOSAL_READY_FIELDS}
      query GetMultisigProposalReady(
        $limit: Int
        $offset: Int
        $orderBy: [multisig_proposal_ready_order_by!]
        $where: multisig_proposal_ready_bool_exp
      ) {
        multisigProposalReadyEvents: multisig_proposal_ready(
          limit: $limit
          offset: $offset
          order_by: $orderBy
          where: $where
        ) {
          ...MultisigProposalReadyFields
        }
        meta: multisig_proposal_ready_aggregate(where: $where) {
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
      QueryHookOptions<RecentMultisigProposalReadyResponse>,
      'variables'
    >
  ) => {
    const QUERY = gql`
      ${MULTISIG_PROPOSAL_READY_FIELDS}
      query GetRecentMultisigProposalReady(
        $limit: Int
        $orderBy: [multisig_proposal_ready_order_by!]
      ) {
        multisigProposalReadyEvents: multisig_proposal_ready(
          limit: $limit
          order_by: $orderBy
        ) {
          ...MultisigProposalReadyFields
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
      QueryHookOptions<MultisigProposalReadyStatsResponse>,
      'variables'
    >
  ) => {
    const { startDate, endDate } = useGetRecentDateRange();

    const QUERY = gql`
      query GetMultisigProposalReadyStats(
        $startDate: timestamptz!
        $endDate: timestamptz!
      ) {
        last24Hour: multisig_proposal_ready_aggregate(
          where: { timestamp: { _gte: $startDate, _lte: $endDate } }
        ) {
          aggregate {
            totalCount: count
          }
        }
        allTime: chain_stats_by_pk(id: "global") {
          total_multisig_proposal_ready
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
      ${MULTISIG_PROPOSAL_READY_FIELDS}
      query GetMultisigProposalReadyByHash($hash: String!) {
        multisigProposalReadyEvents: multisig_proposal_ready(
          where: { extrinsic: { id: { _eq: $hash } } }
        ) {
          ...MultisigProposalReadyFields
        }
      }
    `;

    return {
      useQuery: (
        hash: string,
        config?: QueryHookOptions<MultisigProposalReadyResponse>
      ) => useQuery(QUERY, { ...config, variables: { hash } })
    };
  }
};
