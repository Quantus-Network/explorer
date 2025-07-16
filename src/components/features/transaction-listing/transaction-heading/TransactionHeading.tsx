'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';

import { RESOURCES } from '@/constants/resources';

export interface TransactionHeadingProps {}

export const TransactionHeading: React.FC<TransactionHeadingProps> = () => {
  const accountId = useSearchParams().get('accountId');
  const block = useSearchParams().get('block');

  return (
    <div>
      <h1>Immediate Transactions</h1>

      {block && (
        <div className="flex gap-1">
          <span>In block</span>
          <Link href={`${RESOURCES.blocks}/${block}`}>{block}</Link>
        </div>
      )}

      {accountId && (
        <div className="flex gap-1">
          <span>By</span>
          <Link href={`${RESOURCES.accounts}/${accountId}`}>{accountId}</Link>
        </div>
      )}
    </div>
  );
};
