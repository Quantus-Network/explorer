export interface VestingScheduleListItem {
  id: string;
  beneficiary: string;
  total: string;
  claimed: string;
  start: string;
  cliff: string;
  end: string;
  last_claim_at?: string | null;
}

export interface VestingScheduleListResponse {
  schedules: VestingScheduleListItem[];
  meta: {
    aggregate: {
      totalCount: number;
    };
  };
}

export interface VestingScheduleStatsResponse {
  meta: {
    aggregate?: {
      count: number;
      sum?: {
        total?: string | null;
        claimed?: string | null;
      } | null;
    } | null;
  };
}

export interface VestingScheduleChartResponse {
  schedules: Pick<
    VestingScheduleListItem,
    'id' | 'start' | 'cliff' | 'end' | 'total'
  >[];
}
