import type { Table as ReactTable } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, Info } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

import { Alert, AlertDescription, AlertTitle } from '../../alert';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../../table';
import { RowSkeleton } from './RowSkeleton';
import { TableControls } from './TableControl';

interface DataTableProps {
  table: ReactTable<any>;
  fetch?: {
    status: 'idle' | 'loading' | 'success' | 'error';
    errorFallback: React.ReactNode;
  };
  withControls?: boolean;
  customCellProps?: Record<string, any>;
}

export const DataTable = ({
  table,
  fetch,
  withControls = false,
  customCellProps = {}
}: DataTableProps) => {
  const { pageSize } = table.getState().pagination;

  const tableRef = React.useRef<HTMLTableElement>(null);

  const columnsLength = table.getAllColumns().length;
  const isEmptyData = table.getRowModel().rows.length === 0;

  const status = fetch?.status ?? 'success';

  if (status === 'success' && isEmptyData)
    return (
      <Alert className="ps-6">
        <Info />
        <AlertTitle>No data found!</AlertTitle>
        <AlertDescription>
          It seems there are no data for the query.
        </AlertDescription>
      </Alert>
    );

  return (
    <div>
      <div
        className={cn('border', withControls ? 'rounded-t-md' : 'rounded-md')}
      >
        <Table ref={tableRef}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    onClick={header.column.getToggleSortingHandler()}
                    data-sortable={header.column.getCanSort()}
                    className="data-[sortable=true]:cursor-pointer data-[sortable=true]:hover:text-muted-foreground/70"
                  >
                    <div className="flex items-center gap-1">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}

                      {header.column.getCanSort() && (
                        <>
                          {header.column.getIsSorted() === 'asc' && <ArrowUp />}

                          {header.column.getIsSorted() === 'desc' && (
                            <ArrowDown />
                          )}
                        </>
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {status === 'loading' && (
              <RowSkeleton rowCount={pageSize} columnsLength={columnsLength} />
            )}

            {table.getRowModel().rows.map((row) => {
              return (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, {
                          ...cell.getContext(),
                          ...customCellProps
                        })}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {status === 'error' && fetch?.errorFallback}

      {withControls && <TableControls table={table} tableRef={tableRef} />}
    </div>
  );
};
