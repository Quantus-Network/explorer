import type { Table as ReactTable } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, Info } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

import { Alert, AlertDescription, AlertTitle } from '../../alert';
import { Button } from '../../button';
import { Input } from '../../input';
import {
  Pagination,
  PaginationContent,
  PaginationItem
} from '../../pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../../table';

interface DataTableProps {
  table: ReactTable<any>;
  fetch?: {
    status: 'idle' | 'loading' | 'success' | 'error';
    errorFallback: React.ReactNode;
    loadingFallback: React.ReactNode;
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
  const { pageSize, pageIndex } = table.getState().pagination;

  const pageCount = table.getPageCount();
  const currentPage = pageIndex + 1;
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
      {status === 'loading' && fetch?.loadingFallback}
      {status === 'error' && fetch?.errorFallback}
      {status === 'success' && (
        <div
          className={cn('border', withControls ? 'rounded-t-md' : 'rounded-md')}
        >
          <Table>
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
                            {header.column.getIsSorted() === 'asc' && (
                              <ArrowUp />
                            )}

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
      )}

      {withControls && (
        <div className="flex items-center justify-between gap-4 rounded-b-md border px-2 py-4">
          <div className="flex items-center gap-2">
            <span>Show:</span>

            <Select
              value={pageSize.toString()}
              onValueChange={(val) => {
                table.setPageSize(Number(val));
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="25" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="75">75</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>

            <span>Records</span>
          </div>

          <Pagination className="justify-end">
            <PaginationContent className="flex items-center gap-2">
              <PaginationItem>
                <Button
                  variant="outline"
                  onClick={table.previousPage}
                  disabled={!table.getCanPreviousPage()}
                >
                  Previous
                </Button>
              </PaginationItem>

              <div className="flex items-center gap-1">
                <span>Page</span>

                <Input
                  className="h-9 w-12"
                  defaultValue={currentPage}
                  onChange={(e) => {
                    const page = Number(e.target.value);

                    if (page > 0 && page <= pageCount) {
                      table.setPageIndex(page - 1);
                    }
                  }}
                  disabled={pageCount <= 1}
                />

                <span>of {pageCount}</span>
              </div>

              <PaginationItem>
                <Button
                  variant="outline"
                  onClick={table.nextPage}
                  disabled={!table.getCanNextPage()}
                >
                  Next
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};
