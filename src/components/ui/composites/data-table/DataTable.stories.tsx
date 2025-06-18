import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import * as React from 'react';

import { TRANSACTION_COLUMNS } from '@/constants/table_columns/TRANSACTION_COLUMNS';
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

export const Primary: Omit<Story, 'args'> = {
  decorators: [
    (Story) => {
      const transactionColumns = React.useMemo(() => TRANSACTION_COLUMNS, []);

      const transactionDataTable = useReactTable<Transaction>({
        data: [
          {
            id: '0x1234',
            blockNumber: 293293,
            extrinsicHash: '0xjdwjaidwjaidj',
            fee: '120000000',
            amount: '999999',
            from: { id: '0x2131313' },
            to: { id: '0xdjwaidjiajdi' },
            timestamp: new Date().toISOString()
          },
          {
            id: '0x12341111',
            blockNumber: 293293,
            extrinsicHash: '0xjdwjaidwjaidj',
            fee: '120000000',
            amount: '999999',
            from: { id: '0x2131313' },
            to: { id: '0xdjwaidjiajdi' },
            timestamp: new Date().toISOString()
          },
          {
            id: '0x1234aaaa',
            blockNumber: 293293,
            extrinsicHash: '0xjdwjaidwjaidj',
            fee: '120000000',
            amount: '999999',
            from: { id: '0x2131313' },
            to: { id: '0xdjwaidjiajdi' },
            timestamp: new Date().toISOString()
          },
          {
            id: '0x1234zzzzzz',
            blockNumber: 293293,
            extrinsicHash: '0xjdwjaidwjaidj',
            fee: '120000000',
            amount: '999999',
            from: { id: '0x2131313' },
            to: { id: '0xdjwaidjiajdi' },
            timestamp: new Date().toISOString()
          }
        ],
        columns: transactionColumns,
        getCoreRowModel: getCoreRowModel()
      });

      return <Story args={{ table: transactionDataTable }} />;
    }
  ]
};
