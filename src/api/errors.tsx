import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';
import { endOfToday } from 'date-fns/endOfToday';
import { startOfToday } from 'date-fns/startOfToday';

import type { ErrorEventWhereInput } from '@/__generated__/graphql';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import { QUERY_RECENT_LIMIT } from '@/constants/query-recent-limit';
import type { ErrorEventSorts } from '@/constants/query-sorts';
import { ERROR_EVENT_SORTS } from '@/constants/query-sorts';
import type {
  ErrorEventListResponse,
  ErrorEventResponse,
  ErrorEventsStatsResponse,
  RecentErrorEventsResponse
} from '@/schemas';
import type { PaginatedQueryVariables } from '@/types/query';

export const errors = {
  useGetAll: (
    config?: QueryHookOptions<
      ErrorEventListResponse,
      PaginatedQueryVariables<ErrorEventSorts, ErrorEventWhereInput>
    >
  ) => {
    const GET_ERROR_EVENTS = gql`
      query GetErrorEvents(
        $limit: Int
        $offset: Int
        $orderBy: [ErrorEventOrderByInput!]
        $where: ErrorEventWhereInput
      ) {
        errorEvents(
          limit: $limit
          offset: $offset
          orderBy: $orderBy
          where: $where
        ) {
          errorDocs
          errorModule
          errorName
          errorType
          extrinsicHash
          id
          timestamp
          block {
            height
          }
        }
        meta: errorEventsConnection(orderBy: id_ASC, where: $where) {
          totalCount
        }
      }
    `;

    return useQuery<
      ErrorEventListResponse,
      PaginatedQueryVariables<ErrorEventSorts, ErrorEventWhereInput>
    >(GET_ERROR_EVENTS, {
      ...config,
      variables: {
        orderBy: config?.variables?.orderBy ?? ERROR_EVENT_SORTS.timestamp.DESC,
        limit: config?.variables?.limit ?? QUERY_DEFAULT_LIMIT,
        offset: config?.variables?.offset ?? 0,
        where: config?.variables?.where
      }
    });
  },
  useGetRecent: (
    config?: Omit<QueryHookOptions<RecentErrorEventsResponse>, 'variables'>
  ) => {
    const GET_RECENT_ERROR_EVENTS = gql`
      query GetRecentErrorEvents(
        $limit: Int
        $offset: Int
        $orderBy: [ErrorEventOrderByInput!]
        $where: ErrorEventWhereInput
      ) {
        errorEvents(
          limit: $limit
          offset: $offset
          orderBy: $orderBy
          where: $where
        ) {
          errorDocs
          errorModule
          errorName
          errorType
          extrinsicHash
          id
          timestamp
          block {
            height
          }
        }
      }
    `;

    return useQuery<
      RecentErrorEventsResponse,
      PaginatedQueryVariables<ErrorEventSorts, ErrorEventWhereInput>
    >(GET_RECENT_ERROR_EVENTS, {
      ...config,
      variables: {
        orderBy: ERROR_EVENT_SORTS.timestamp.DESC,
        limit: QUERY_RECENT_LIMIT
      }
    });
  },
  useGetStats: (
    config?: Omit<QueryHookOptions<ErrorEventsStatsResponse>, 'variables'>
  ) => {
    const startDate = startOfToday().toISOString();
    const endDate = endOfToday().toISOString();

    const GET_ERROR_EVENTS_STATS = gql`
      query GetErrorEventsStats($startDate: DateTime!, $endDate: DateTime!) {
        last24Hour: errorEventsConnection(
          orderBy: id_ASC
          where: { timestamp_gte: $startDate, timestamp_lte: $endDate }
        ) {
          totalCount
        }
        allTime: errorEventsConnection(orderBy: id_ASC) {
          totalCount
        }
      }
    `;

    return useQuery<ErrorEventsStatsResponse>(GET_ERROR_EVENTS_STATS, {
      ...config,
      variables: {
        startDate,
        endDate
      }
    });
  },
  getByHash: () => {
    const GET_ERROR_EVENT_BY_HASH = gql`
      query GetErrorEventByHash($hash: String!) {
        errorEvents: errorEvents(where: { extrinsicHash_eq: $hash }) {
          errorDocs
          errorModule
          errorName
          errorType
          extrinsicHash
          id
          timestamp
          block {
            height
          }
        }
      }
    `;

    return {
      useQuery: (hash: string, config?: QueryHookOptions<ErrorEventResponse>) =>
        useQuery<ErrorEventResponse>(GET_ERROR_EVENT_BY_HASH, {
          ...config,
          variables: { hash }
        })
    };
  }
};
