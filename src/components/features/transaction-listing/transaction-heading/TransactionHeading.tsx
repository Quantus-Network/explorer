'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';

import { RESOURCES } from '@/constants/resources';

export interface TransactionHeadingProps {}

export const TransactionHeading: React.FC<TransactionHeadingProps> = () => {
  const accountId = useSearchParams().get('accountId');

  return (
    <div>
      <h1>Transactions</h1>
      {accountId && (
        <div className="flex gap-1">
          <span>By</span>
          <Link href={`${RESOURCES.accounts}/${accountId}`}>{accountId}</Link>
        </div>
      )}
    </div>
  );
};
