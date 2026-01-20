import type * as gql from '../__generated__/graphql';

export interface HighSecuritySet
  extends Omit<
    gql.HighSecuritySet,
    'id' | 'who' | 'interceptor' | 'block' | 'event'
  > {
  who: Pick<gql.Account, 'id'>;
  interceptor: Pick<gql.Account, 'id'>;
  block: Pick<gql.Block, 'height'>;
}

export interface HighSecuritySetResponse {
  highSecuritySets: HighSecuritySet[];
}

export interface HighSecuritySetListResponse {
  highSecuritySets: HighSecuritySet[];
  meta: {
    totalCount: number;
  };
}

export interface RecentHighSecuritySetsResponse {
  highSecuritySets: HighSecuritySet[];
}

export interface HighSecuritySetsStatsResponse {
  allTime: {
    totalCount: number;
  };
  last24Hour: {
    totalCount: number;
  };
}
