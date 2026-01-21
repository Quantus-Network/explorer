import type * as gql from '../__generated__/graphql';

export interface ErrorEvent extends Omit<gql.ErrorEvent, 'block' | 'event'> {
  block: Pick<gql.Block, 'height'>;
}

export interface ErrorEventResponse {
  errorEvent?: ErrorEvent | null;
}

export interface ErrorEventListResponse {
  errorEvents: ErrorEvent[];
  meta: {
    totalCount: number;
  };
}

export interface RecentErrorEventsResponse {
  errorEvents: ErrorEvent[];
}

export interface ErrorEventsStatsResponse {
  allTime: {
    totalCount: number;
  };
  last24Hour: {
    totalCount: number;
  };
}
