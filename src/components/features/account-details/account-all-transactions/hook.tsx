import type { QueryResult } from '@apollo/client';
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table';
import { useCallback, useMemo, useState } from 'react';

import { createUnifiedTransactionColumns } from '@/components/common/table-columns/UNIFIED_TRANSACTION_COLUMNS';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import {
  sortByTimestampDesc,
  transformHighSecuritySet,
  transformImmediateTransaction,
  transformMinerReward,
  transformReversibleTransaction,
  transformWormholeOutput
} from '@/hooks/useUnifiedTransactions';
import type { AccountResponse, UnifiedTransaction } from '@/schemas';

// Account page shows block column
const columns = createUnifiedTransactionColumns({ showBlockColumn: true });

export const useAccountAllTransactions = (
  query: QueryResult<AccountResponse>
) => {
  const { data, error: fetchError, loading } = query;
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: QUERY_DEFAULT_LIMIT
  });

  // Transform all transaction types into unified format
  const tableData = useMemo(() => {
    if (!data) return [];

    const unified: UnifiedTransaction[] = [];

    // Add immediate transactions
    data.transactions?.edges?.forEach((edge, idx) => {
      unified.push(transformImmediateTransaction(edge.node, idx));
    });

    // Add reversible transactions
    data.reversibleTransactions?.edges?.forEach((edge, idx) => {
      unified.push(transformReversibleTransaction(edge.node, idx));
    });

    // Add miner rewards
    data.minerRewards?.edges?.forEach((edge, idx) => {
      unified.push(transformMinerReward(edge.node, idx));
    });

    // Add guardian relationships (as high-security type)
    data.guardian?.edges?.forEach((edge, idx) => {
      const guardian = edge.node;
      unified.push(
        transformHighSecuritySet(
          {
            timestamp: (guardian as { timestamp?: string }).timestamp ?? '',
            block: (guardian as { block?: { height: number } }).block ?? {
              height: 0
            },
            who: { id: '' }, // Guardian view doesn't have who (it's the current account)
            interceptor: guardian.interceptor
          },
          idx
        )
      );
    });

    // Add beneficiary relationships (as high-security type)
    data.beneficiaries?.edges?.forEach((edge, idx) => {
      const beneficiary = edge.node;
      unified.push(
        transformHighSecuritySet(
          {
            timestamp: (beneficiary as { timestamp?: string }).timestamp ?? '',
            block: (beneficiary as { block?: { height: number } }).block ?? {
              height: 0
            },
            who: beneficiary.who,
            interceptor: { id: '' } // Beneficiary view doesn't have interceptor (it's the current account)
          },
          idx
        )
      );
    });

    // Add wormhole outputs
    data.wormholeOutputs?.forEach((output, idx) => {
      const wormholeExtrinsic = output.wormholeExtrinsic;
      if (wormholeExtrinsic) {
        unified.push(
          transformWormholeOutput(
            {
              id: wormholeExtrinsic.id,
              extrinsic: wormholeExtrinsic.extrinsic,
              timestamp: wormholeExtrinsic.timestamp,
              totalAmount: wormholeExtrinsic.totalAmount,
              outputCount: wormholeExtrinsic.outputCount,
              outputs: wormholeExtrinsic.outputs,
              block: wormholeExtrinsic.block
            },
            idx
          )
        );
      }
    });

    return sortByTimestampDesc(unified);
  }, [data]);

  const table = useReactTable<UnifiedTransaction>({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableSorting: false,
    state: {
      pagination
    },
    onPaginationChange: setPagination
  });

  const success = !loading && !fetchError;
  const error = !loading && fetchError;

  const getStatus = useCallback(() => {
    switch (true) {
      case success:
        return 'success';
      case !!error:
        return 'error';
      case !!loading:
        return 'loading';
      default:
        return 'idle';
    }
  }, [success, error, loading]);

  return {
    table,
    getStatus,
    error: fetchError
  };
};
