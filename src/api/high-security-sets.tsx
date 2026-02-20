import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';
import { endOfToday } from 'date-fns/endOfToday';
import { startOfToday } from 'date-fns/startOfToday';

import type { HighSecuritySetWhereInput } from '@/__generated__/graphql';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import { QUERY_RECENT_LIMIT } from '@/constants/query-recent-limit';
import type { HighSecuritySetSorts } from '@/constants/query-sorts';
import { HIGH_SECURITY_SET_SORTS } from '@/constants/query-sorts';
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
      PaginatedQueryVariables<HighSecuritySetSorts, HighSecuritySetWhereInput>
    >
  ) => {
    const GET_HIGH_SECURITY_SETS = gql`
      query GetHighSecuritySets(
        $limit: Int
        $offset: Int
        $orderBy: [HighSecuritySetOrderByInput!]
        $where: HighSecuritySetWhereInput
      ) {
        highSecuritySets(
          limit: $limit
          offset: $offset
          orderBy: $orderBy
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
        meta: highSecuritySetsConnection(orderBy: id_ASC, where: $where) {
          totalCount
        }
      }
    `;

    return useQuery<
      HighSecuritySetListResponse,
      PaginatedQueryVariables<HighSecuritySetSorts, HighSecuritySetWhereInput>
    >(GET_HIGH_SECURITY_SETS, {
      ...config,
      variables: {
        orderBy:
          config?.variables?.orderBy ?? HIGH_SECURITY_SET_SORTS.timestamp.DESC,
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
        $orderBy: [HighSecuritySetOrderByInput!]
        $where: HighSecuritySetWhereInput
      ) {
        highSecuritySets(
          limit: $limit
          offset: $offset
          orderBy: $orderBy
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
      PaginatedQueryVariables<HighSecuritySetSorts, HighSecuritySetWhereInput>
    >(GET_RECENT_HIGH_SECURITY_SETS, {
      ...config,
      variables: {
        orderBy: HIGH_SECURITY_SET_SORTS.timestamp.DESC,
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
        $startDate: DateTime!
        $endDate: DateTime!
      ) {
        last24Hour: highSecuritySetsConnection(
          orderBy: id_ASC
          where: { timestamp_gte: $startDate, timestamp_lte: $endDate }
        ) {
          totalCount
        }
        allTime: highSecuritySetsConnection(orderBy: id_ASC) {
          totalCount
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
        highSecuritySets(where: { extrinsic: { id_eq: $hash } }) {
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
