import type { Table } from '@tanstack/react-table';
import * as React from 'react';
import { useDebounceCallback } from 'usehooks-ts';

import { INPUT_DEBOUNCE_INTERVAL } from '@/constants/debounce-interval';

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

export interface TableControlsProps {
  table: Table<any>;
  tableRef: React.RefObject<HTMLTableElement | null>;
}

export const TableControls: React.FC<TableControlsProps> = ({
  table,
  tableRef
}) => {
  const { pageSize, pageIndex } = table.getState().pagination;
  const pageCount = table.getPageCount();
  const currentPage = pageIndex + 1;

  const [page, setPage] = React.useState<number | undefined>(currentPage);

  const updatePage = React.useCallback(
    (newPage: number | undefined) => {
      if (newPage && newPage > 0 && newPage <= pageCount) {
        table.setPageIndex(newPage - 1);
        tableRef.current?.scrollIntoView();
      }
    },
    [table, pageCount]
  );

  const debounced = useDebounceCallback(updatePage, INPUT_DEBOUNCE_INTERVAL);

  React.useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  return (
    <div className="flex flex-col gap-6 rounded-b-md border px-2 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <div className="flex items-center gap-2">
        <span>Show:</span>

        <Select
          value={pageSize.toString()}
          onValueChange={(val) => {
            table.setPageSize(Number(val));
          }}
        >
          <SelectTrigger className="max-w-16">
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

      <Pagination className="justify-stretch sm:justify-end">
        <PaginationContent className="flex w-full items-center justify-between gap-2 sm:w-fit sm:justify-stretch">
          <PaginationItem>
            <Button
              variant="outline"
              onClick={() => {
                table.previousPage();
              }}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
          </PaginationItem>

          <div className="flex items-center gap-1">
            <span className="hidden sm:inline">Page</span>

            <Input
              className="h-9 w-14"
              value={page}
              onChange={(e) => {
                const newPage = Number(e.target.value) || undefined;

                setPage(newPage);

                debounced(newPage);
              }}
              disabled={pageCount <= 1}
            />

            <span>of {pageCount}</span>
          </div>

          <PaginationItem>
            <Button
              variant="outline"
              onClick={() => {
                table.nextPage();
              }}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
