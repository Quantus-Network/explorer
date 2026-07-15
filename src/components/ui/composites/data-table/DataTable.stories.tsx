import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table';
import * as React from 'react';

import { TRANSACTION_COLUMNS } from '@/components/common/table-columns/TRANSACTION_COLUMNS';
import type { Transaction } from '@/schemas';

import { DataTable } from './DataTable';

const meta = {
  title: 'Components/UI/DataTable',
  component: DataTable,
  parameters: {
    layout: 'centered'
  },

  tags: ['autodocs']
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockTransactions: Transaction[] = Array.from({ length: 12 }, (_, i) => ({
  block: { height: 293293 + i },
  extrinsic: {
    id: `0xhash${i.toString().padStart(4, '0')}`,
    pallet: 'balances',
    call: 'transfer'
  } as any,
  fee: '120000000',
  amount: String(999999 + i),
  transfer_count: 1,
  from: { id: '0x2131313' },
  to: { id: '0xdjwaidjiajdi' },
  from_hash: '0x2131313',
  to_hash: '0xdjwaidjiajdi',
  timestamp: new Date().toISOString(),
  leaf_index: i
}));

export const Primary: Omit<Story, 'args'> = {
  decorators: [
    (Story) => {
      const transactionColumns = React.useMemo(() => TRANSACTION_COLUMNS, []);

      const transactionDataTable = useReactTable<Transaction>({
        data: mockTransactions.slice(0, 4),
        columns: transactionColumns,
        getCoreRowModel: getCoreRowModel()
      });

      return <Story args={{ table: transactionDataTable }} />;
    }
  ]
};

export const Mobile: Omit<Story, 'args'> = {
  parameters: {
    layout: 'padded',
    viewport: {
      defaultViewport: 'extraSmall'
    }
  },
  decorators: [
    (Story) => {
      const transactionColumns = React.useMemo(() => TRANSACTION_COLUMNS, []);

      const transactionDataTable = useReactTable<Transaction>({
        data: mockTransactions.slice(0, 4),
        columns: transactionColumns,
        getCoreRowModel: getCoreRowModel()
      });

      return (
        <div className="w-full max-w-[320px]">
          <Story args={{ table: transactionDataTable }} />
        </div>
      );
    }
  ]
};

export const MobileInfiniteScroll: Omit<Story, 'args'> = {
  parameters: {
    layout: 'padded',
    viewport: {
      defaultViewport: 'extraSmall'
    }
  },
  decorators: [
    (Story) => {
      const transactionColumns = React.useMemo(() => TRANSACTION_COLUMNS, []);
      const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 3
      });

      const transactionDataTable = useReactTable<Transaction>({
        data: mockTransactions,
        columns: transactionColumns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        state: { pagination },
        rowCount: mockTransactions.length
      });

      return (
        <div className="h-[560px] w-full max-w-[320px] overflow-y-auto">
          <Story
            args={{
              table: transactionDataTable,
              withControls: true,
              fetch: { status: 'success', errorFallback: null }
            }}
          />
        </div>
      );
    }
  ]
};
