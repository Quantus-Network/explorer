import type { Table as ReactTable } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import * as React from 'react';

import styles from './Table.module.scss';

interface TableProps {
  table: ReactTable<any>;
  customCellProps?: Record<string, any>;
}

export const Table = ({ table, customCellProps = {} }: TableProps) => {
  if (table.getRowModel().rows.length === 0)
    return (
      <div>
        <p>No data found!</p>
      </div>
    );

  return (
    <div className={styles.table}>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, {
                        ...cell.getContext(),
                        ...customCellProps
                      })}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
