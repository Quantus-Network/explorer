import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';
import { endOfToday } from 'date-fns/endOfToday';
import { startOfToday } from 'date-fns/startOfToday';

import type { High_Security_Set_Bool_Exp } from '@/__generated__/graphql';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import { QUERY_RECENT_LIMIT } from '@/constants/query-recent-limit';
import type { HighSecuritySetSorts } from '@/constants/query-sorts';
import type {
  HighSecuritySetListResponse,
  HighSecuritySetResponse,
  HighSecuritySetsStatsResponse,
  RecentHighSecuritySetsResponse
} from '@/schemas';
import type { PaginatedQueryVariables } from '@/types/query';

export const highSecuritySets = {
  useGetAll: (
    config?: QueryHookOptions<
      HighSecuritySetListResponse,
      PaginatedQueryVariables<HighSecuritySetSorts, High_Security_Set_Bool_Exp>
    >
  ) => {
    const GET_HIGH_SECURITY_SETS = gql`
      query GetHighSecuritySets(
        $limit: Int
        $offset: Int
        $orderBy: [high_security_set_order_by!]
        $where: high_security_set_bool_exp
      ) {
        highSecuritySets: high_security_set(
          limit: $limit
          offset: $offset
          order_by: $orderBy
          where: $where
        ) {
          id
          extrinsic {
            id
            pallet
            call
          }
          who {
            id
          }
          interceptor {
            id
          }
          timestamp
          delay
          block {
            height
          }
        }
        meta: high_security_set_aggregate(where: $where) {
          aggregate {
            totalCount: count
          }
        }
      }
    `;

    return useQuery<
      HighSecuritySetListResponse,
      PaginatedQueryVariables<HighSecuritySetSorts, High_Security_Set_Bool_Exp>
    >(GET_HIGH_SECURITY_SETS, {
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
    config?: Omit<QueryHookOptions<RecentHighSecuritySetsResponse>, 'variables'>
  ) => {
    const GET_RECENT_HIGH_SECURITY_SETS = gql`
      query GetRecentHighSecuritySets(
        $limit: Int
        $offset: Int
        $orderBy: [high_security_set_order_by!]
        $where: high_security_set_bool_exp
      ) {
        highSecuritySets: high_security_set(
          limit: $limit
          offset: $offset
          order_by: $orderBy
          where: $where
        ) {
          id
          extrinsic {
            id
            pallet
            call
          }
          who {
            id
          }
          interceptor {
            id
          }
          timestamp
          delay
          block {
            height
          }
        }
      }
    `;

    return useQuery<
      RecentHighSecuritySetsResponse,
      PaginatedQueryVariables<HighSecuritySetSorts, High_Security_Set_Bool_Exp>
    >(GET_RECENT_HIGH_SECURITY_SETS, {
      ...config,
      variables: {
        orderBy: { timestamp: 'desc' },
        limit: QUERY_RECENT_LIMIT,
        where: {}
      }
    });
  },
  useGetStats: (
    config?: Omit<QueryHookOptions<HighSecuritySetsStatsResponse>, 'variables'>
  ) => {
    const startDate = startOfToday().toISOString();
    const endDate = endOfToday().toISOString();

    const GET_HIGH_SECURITY_SETS_STATS = gql`
      query GetHighSecuritySetsStats(
        $startDate: timestamptz!
        $endDate: timestamptz!
      ) {
        last24Hour: high_security_set_aggregate(
          where: { timestamp: { _gte: $startDate, _lte: $endDate } }
        ) {
          aggregate {
            totalCount: count
          }
        }
        allTime: chain_stats_by_pk(id: "global") {
          total_high_security_sets
        }
      }
    `;

    return useQuery<HighSecuritySetsStatsResponse>(
      GET_HIGH_SECURITY_SETS_STATS,
      {
        ...config,
        variables: {
          startDate,
          endDate
        }
      }
    );
  },
  getByHash: () => {
    const QUERY = gql`
      query GetHighSecuritySetByHash($hash: String!) {
        highSecuritySets: high_security_set(
          where: { extrinsic: { id: { _eq: $hash } } }
        ) {
          id
          extrinsic {
            id
            pallet
            call
          }
          who {
            id
          }
          interceptor {
            id
          }
          timestamp
          delay
          block {
            height
          }
        }
      }
    `;

    return {
      useQuery: (
        hash: string,
        config?: QueryHookOptions<HighSecuritySetResponse>
      ) =>
        useQuery<HighSecuritySetResponse>(QUERY, {
          ...config,
          variables: {
            hash
          }
        })
    };
  }
};
