import type { QueryResult } from '@apollo/client';
import React from 'react';

import { DataTable } from '@/components/ui/composites/data-table/DataTable';
import { FetchError } from '@/components/ui/composites/fetch-error/FetchError';
import type { BlockResponse } from '@/schemas';

import { useBlockAllTransactions } from './hook';

interface Props {
  query: QueryResult<BlockResponse>;
}

export const BlockAllTransactions: React.FC<Props> = ({ query }) => {
  const { getStatus, table, error, hasExtrinsics, loading } =
    useBlockAllTransactions(query);

  const showEmpty = !loading && !error && !hasExtrinsics;

  return (
    <div className="flex flex-col gap-4">
      <div className="section-label">Transactions in this block</div>

      {showEmpty ? (
        <div className="rounded-none border border-border-subtle px-5 py-8 text-center">
          <p className="mb-1 font-mono text-[13px] text-muted-text">
            No transactions in this block
          </p>
          <p className="text-xs text-muted-text-2">
            This block contained only the miner reward with no user
            transactions.
          </p>
        </div>
      ) : (
        <DataTable
          table={table}
          fetch={{
            status: getStatus(),
            errorFallback: <FetchError error={error} />
          }}
          withControls
        />
      )}
    </div>
  );
};
