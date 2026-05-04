import type * as gql from '../__generated__/graphql';

export interface ErrorEvent extends Omit<gql.Error_Event, 'block' | 'event'> {
  block: Pick<gql.Block, 'height'>;
}

export interface ErrorEventResponse {
  errorEvents: [ErrorEvent];
}

export interface ErrorEventListResponse {
  errorEvents: ErrorEvent[];
  meta: {
    aggregate: {
      totalCount: number;
    };
  };
}

export interface RecentErrorEventsResponse {
  errorEvents: ErrorEvent[];
}

export interface ErrorEventsStatsResponse {
  allTime: {
    total_error_events: number;
  };
  last24Hour: {
    aggregate: {
      totalCount: number;
    };
  };
}
