export interface ChainStatus {
  height: number;
  hash: string;
  finalizedHeight: number;
  finalizedHash: string;
}

export interface ChainStatusResponse {
  status: ChainStatus;
  transactions: {
    totalCount: number;
  };
}
