import { RESOURCES } from '@/constants/resources';

export type UnifiedListTransactionType =
  | 'IMMEDIATE'
  | 'SCHEDULED_REVERSIBLE'
  | 'EXECUTED_REVERSIBLE'
  | 'CANCELLED_REVERSIBLE'
  | 'WORMHOLE';

export interface UnifiedTransactionRouteInput {
  type: UnifiedListTransactionType | string;
  hash?: string | null;
  detailId: string;
}

export const getUnifiedTransactionDetailPath = ({
  type,
  hash,
  detailId
}: UnifiedTransactionRouteInput): string => {
  switch (type) {
    case 'IMMEDIATE':
      return `${RESOURCES.transactions}/${hash ?? detailId}`;
    case 'SCHEDULED_REVERSIBLE':
      return `${RESOURCES.scheduledReversibleTransactions}/${detailId}`;
    case 'EXECUTED_REVERSIBLE':
      return `${RESOURCES.executedReversibleTransactions}/${detailId}`;
    case 'CANCELLED_REVERSIBLE':
      return `${RESOURCES.cancelledReversibleTransactions}/${detailId}`;
    case 'WORMHOLE':
      return `${RESOURCES.wormhole}/${detailId}`;
    default:
      return `${RESOURCES.transactions}/${hash ?? detailId}`;
  }
};
