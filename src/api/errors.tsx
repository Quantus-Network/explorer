import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';
import { endOfToday } from 'date-fns/endOfToday';
import { startOfToday } from 'date-fns/startOfToday';

import type { Error_Event_Bool_Exp } from '@/__generated__/graphql';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import { QUERY_RECENT_LIMIT } from '@/constants/query-recent-limit';
import type { ErrorEventSorts } from '@/constants/query-sorts';
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
      PaginatedQueryVariables<ErrorEventSorts, Error_Event_Bool_Exp>
    >
  ) => {
    const GET_ERROR_EVENTS = gql`
      query GetErrorEvents(
        $limit: Int
        $offset: Int
        $orderBy: [error_event_order_by!]
        $where: error_event_bool_exp
      ) {
        errorEvents: error_event(
          limit: $limit
          offset: $offset
          order_by: $orderBy
          where: $where
        ) {
          error_docs
          error_module
          error_name
          error_type
          extrinsic {
            id
            pallet
            call
          }
          id
          timestamp
          block {
            height
          }
        }
        meta: error_event_aggregate(where: $where) {
          aggregate {
            totalCount: count
          }
        }
      }
    `;

    return useQuery<
      ErrorEventListResponse,
      PaginatedQueryVariables<ErrorEventSorts, Error_Event_Bool_Exp>
    >(GET_ERROR_EVENTS, {
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
    config?: Omit<QueryHookOptions<RecentErrorEventsResponse>, 'variables'>
  ) => {
    const GET_RECENT_ERROR_EVENTS = gql`
      query GetRecentErrorEvents(
        $limit: Int
        $offset: Int
        $orderBy: [error_event_order_by!]
        $where: error_event_bool_exp
      ) {
        errorEvents: error_event(
          limit: $limit
          offset: $offset
          order_by: $orderBy
          where: $where
        ) {
          error_docs
          error_module
          error_name
          error_type
          extrinsic {
            id
            pallet
            call
          }
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
      PaginatedQueryVariables<ErrorEventSorts, Error_Event_Bool_Exp>
    >(GET_RECENT_ERROR_EVENTS, {
      ...config,
      variables: {
        orderBy: { timestamp: 'desc' },
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
      query GetErrorEventsStats(
        $startDate: timestamptz!
        $endDate: timestamptz!
      ) {
        last24Hour: error_event_aggregate(
          where: { timestamp: { _gte: $startDate, _lte: $endDate } }
        ) {
          aggregate {
            totalCount: count
          }
        }
        allTime: chain_stats_by_pk(id: "global") {
          total_error_events
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
        errorEvents: error_event(where: { extrinsic: { id: { _eq: $hash } } }) {
          error_docs
          error_module
          error_name
          error_type
          extrinsic {
            id
            pallet
            call
          }
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
