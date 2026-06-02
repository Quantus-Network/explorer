import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';
import { endOfToday } from 'date-fns/endOfToday';
import { startOfToday } from 'date-fns/startOfToday';

import type { Multisig_Deposits_Claimed_Bool_Exp } from '@/__generated__/graphql';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import { QUERY_RECENT_LIMIT } from '@/constants/query-recent-limit';
import type { MultisigDepositsClaimedSorts } from '@/constants/query-sorts';
import type {
  MultisigDepositsClaimedListResponse,
  MultisigDepositsClaimedResponse,
  MultisigDepositsClaimedStatsResponse,
  RecentMultisigDepositsClaimedResponse
} from '@/schemas';
import type { PaginatedQueryVariables } from '@/types/query';

const MULTISIG_DEPOSITS_CLAIMED_FIELDS = gql`
  fragment MultisigDepositsClaimedFields on multisig_deposits_claimed {
    id
    timestamp
    total_returned
    proposals_removed
    claimer {
      id
    }
    multisig {
      id
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

export const multisigDepositsClaimed = {
  useGetAll: (
    config?: QueryHookOptions<
      MultisigDepositsClaimedListResponse,
      PaginatedQueryVariables<
        MultisigDepositsClaimedSorts,
        Multisig_Deposits_Claimed_Bool_Exp
      >
    >
  ) => {
    const QUERY = gql`
      ${MULTISIG_DEPOSITS_CLAIMED_FIELDS}
      query GetMultisigDepositsClaimed(
        $limit: Int
        $offset: Int
        $orderBy: [multisig_deposits_claimed_order_by!]
        $where: multisig_deposits_claimed_bool_exp
      ) {
        multisigDepositsClaimedEvents: multisig_deposits_claimed(
          limit: $limit
          offset: $offset
          order_by: $orderBy
          where: $where
        ) {
          ...MultisigDepositsClaimedFields
        }
        meta: multisig_deposits_claimed_aggregate(where: $where) {
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
      QueryHookOptions<RecentMultisigDepositsClaimedResponse>,
      'variables'
    >
  ) => {
    const QUERY = gql`
      ${MULTISIG_DEPOSITS_CLAIMED_FIELDS}
      query GetRecentMultisigDepositsClaimed(
        $limit: Int
        $orderBy: [multisig_deposits_claimed_order_by!]
      ) {
        multisigDepositsClaimedEvents: multisig_deposits_claimed(
          limit: $limit
          order_by: $orderBy
        ) {
          ...MultisigDepositsClaimedFields
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
      QueryHookOptions<MultisigDepositsClaimedStatsResponse>,
      'variables'
    >
  ) => {
    const startDate = startOfToday().toISOString();
    const endDate = endOfToday().toISOString();

    const QUERY = gql`
      query GetMultisigDepositsClaimedStats(
        $startDate: timestamptz!
        $endDate: timestamptz!
      ) {
        last24Hour: multisig_deposits_claimed_aggregate(
          where: { timestamp: { _gte: $startDate, _lte: $endDate } }
        ) {
          aggregate {
            totalCount: count
          }
        }
        allTime: chain_stats_by_pk(id: "global") {
          total_multisig_deposits_claimed
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
      ${MULTISIG_DEPOSITS_CLAIMED_FIELDS}
      query GetMultisigDepositsClaimedByHash($hash: String!) {
        multisigDepositsClaimedEvents: multisig_deposits_claimed(
          where: { extrinsic: { id: { _eq: $hash } } }
        ) {
          ...MultisigDepositsClaimedFields
        }
      }
    `;

    return {
      useQuery: (
        hash: string,
        config?: QueryHookOptions<MultisigDepositsClaimedResponse>
      ) => useQuery(QUERY, { ...config, variables: { hash } })
    };
  }
};
