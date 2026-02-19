import type { Meta, StoryObj } from '@storybook/react-vite';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
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

export const Primary: Omit<Story, 'args'> = {
  decorators: [
    (Story) => {
      const transactionColumns = React.useMemo(() => TRANSACTION_COLUMNS, []);

      const transactionDataTable = useReactTable<Transaction>({
        data: [
          {
            block: { height: 293293 },
            extrinsicHash: '0xjdwjaidwjaidj',
            fee: '120000000',
            amount: '999999',
            from: { id: '0x2131313' },
            to: { id: '0xdjwaidjiajdi' },
            fromHash: '0x2131313',
            toHash: '0xdjwaidjiajdi',
            timestamp: new Date().toISOString()
          },
          {
            block: { height: 293293 },
            extrinsicHash: '0xjdwjaidwjaidj',
            fee: '120000000',
            amount: '999999',
            from: { id: '0x2131313' },
            to: { id: '0xdjwaidjiajdi' },
            fromHash: '0x2131313',
            toHash: '0xdjwaidjiajdi',
            timestamp: new Date().toISOString()
          },
          {
            block: { height: 293293 },
            extrinsicHash: '0xjdwjaidwjaidj',
            fee: '120000000',
            amount: '999999',
            from: { id: '0x2131313' },
            to: { id: '0xdjwaidjiajdi' },
            fromHash: '0x2131313',
            toHash: '0xdjwaidjiajdi',
            timestamp: new Date().toISOString()
          },
          {
            block: { height: 293293 },
            extrinsicHash: '0xjdwjaidwjaidj',
            fee: '120000000',
            amount: '999999',
            from: { id: '0x2131313' },
            to: { id: '0xdjwaidjiajdi' },
            fromHash: '0x2131313',
            toHash: '0xdjwaidjiajdi',
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
