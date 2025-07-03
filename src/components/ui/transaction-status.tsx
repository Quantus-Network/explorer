import * as React from 'react';

import { ReversibleTransferStatus } from '@/__generated__/graphql';
import { cn } from '@/lib/utils';

export interface TransactionStatusProps {
  status: ReversibleTransferStatus;
}

export const TransactionStatus: React.FC<TransactionStatusProps> = ({
  status
}) => {
  const className = cn(
    'rounded px-2 py-1 text-xs font-medium',
    status === ReversibleTransferStatus.Scheduled &&
      'bg-yellow-100 text-yellow-800',
    status === ReversibleTransferStatus.Executed &&
      'bg-green-100 text-green-800',
    status === ReversibleTransferStatus.Cancelled && 'bg-red-100 text-red-800'
  );

  return <span className={className}>{status}</span>;
};
