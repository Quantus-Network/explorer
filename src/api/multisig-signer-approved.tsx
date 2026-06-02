import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';
import { endOfToday } from 'date-fns/endOfToday';
import { startOfToday } from 'date-fns/startOfToday';

import type { Multisig_Signer_Approved_Bool_Exp } from '@/__generated__/graphql';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import { QUERY_RECENT_LIMIT } from '@/constants/query-recent-limit';
import type { MultisigSignerApprovedSorts } from '@/constants/query-sorts';
import type {
  MultisigSignerApprovedListResponse,
  MultisigSignerApprovedResponse,
  MultisigSignerApprovedStatsResponse,
  RecentMultisigSignerApprovedResponse
} from '@/schemas';
import type { PaginatedQueryVariables } from '@/types/query';

const MULTISIG_SIGNER_APPROVED_FIELDS = gql`
  fragment MultisigSignerApprovedFields on multisig_signer_approved {
    id
    timestamp
    approvals_count
    approver {
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

export const multisigSignerApproved = {
  useGetAll: (
    config?: QueryHookOptions<
      MultisigSignerApprovedListResponse,
      PaginatedQueryVariables<
        MultisigSignerApprovedSorts,
        Multisig_Signer_Approved_Bool_Exp
      >
    >
  ) => {
    const QUERY = gql`
      ${MULTISIG_SIGNER_APPROVED_FIELDS}
      query GetMultisigSignerApproved(
        $limit: Int
        $offset: Int
        $orderBy: [multisig_signer_approved_order_by!]
        $where: multisig_signer_approved_bool_exp
      ) {
        multisigSignerApprovedEvents: multisig_signer_approved(
          limit: $limit
          offset: $offset
          order_by: $orderBy
          where: $where
        ) {
          ...MultisigSignerApprovedFields
        }
        meta: multisig_signer_approved_aggregate(where: $where) {
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
      QueryHookOptions<RecentMultisigSignerApprovedResponse>,
      'variables'
    >
  ) => {
    const QUERY = gql`
      ${MULTISIG_SIGNER_APPROVED_FIELDS}
      query GetRecentMultisigSignerApproved(
        $limit: Int
        $orderBy: [multisig_signer_approved_order_by!]
      ) {
        multisigSignerApprovedEvents: multisig_signer_approved(
          limit: $limit
          order_by: $orderBy
        ) {
          ...MultisigSignerApprovedFields
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
      QueryHookOptions<MultisigSignerApprovedStatsResponse>,
      'variables'
    >
  ) => {
    const startDate = startOfToday().toISOString();
    const endDate = endOfToday().toISOString();

    const QUERY = gql`
      query GetMultisigSignerApprovedStats(
        $startDate: timestamptz!
        $endDate: timestamptz!
      ) {
        last24Hour: multisig_signer_approved_aggregate(
          where: { timestamp: { _gte: $startDate, _lte: $endDate } }
        ) {
          aggregate {
            totalCount: count
          }
        }
        allTime: chain_stats_by_pk(id: "global") {
          total_multisig_signer_approved
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
      ${MULTISIG_SIGNER_APPROVED_FIELDS}
      query GetMultisigSignerApprovedByHash($hash: String!) {
        multisigSignerApprovedEvents: multisig_signer_approved(
          where: { extrinsic: { id: { _eq: $hash } } }
        ) {
          ...MultisigSignerApprovedFields
        }
      }
    `;

    return {
      useQuery: (
        hash: string,
        config?: QueryHookOptions<MultisigSignerApprovedResponse>
      ) => useQuery(QUERY, { ...config, variables: { hash } })
    };
  }
};
