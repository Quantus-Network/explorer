import type * as gql from '../__generated__/graphql';

export interface HighSecuritySet
  extends Omit<
    gql.High_Security_Set,
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
    aggregate: {
      totalCount: number;
    };
  };
}

export interface RecentHighSecuritySetsResponse {
  highSecuritySets: HighSecuritySet[];
}

export interface HighSecuritySetsStatsResponse {
  allTime: {
    total_high_security_sets: number;
  };
  last24Hour: {
    aggregate: {
      totalCount: number;
    };
  };
}
