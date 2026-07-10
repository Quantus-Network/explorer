import type { Table } from '@tanstack/react-table';
import { ArrowLeft, ArrowRight } from 'lucide-react';
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
    <div className="flex flex-col gap-6 rounded-none border border-t-0 border-border-subtle px-2 py-4 font-mono text-xs text-muted-text sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <div className="flex items-center gap-2">
        <span>Show:</span>

        <Select
          value={pageSize.toString()}
          onValueChange={(val) => {
            table.setPageSize(Number(val));
          }}
        >
          <SelectTrigger className="max-w-16 rounded-none">
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
              className="gap-1.5 rounded-none border-border-strong bg-surface px-2.5 py-1 font-mono text-xs text-muted-text shadow-none hover:border-flare hover:bg-surface hover:text-content disabled:opacity-30 [&_svg]:size-3"
              onClick={() => {
                table.previousPage();

                // We put timeout because we don't want to race with the rerender
                setTimeout(() => {
                  tableRef.current?.scrollIntoView();
                }, 0);
              }}
              disabled={!table.getCanPreviousPage()}
            >
              <ArrowLeft />
              Prev
            </Button>
          </PaginationItem>

          <div className="flex items-center gap-1">
            <span className="hidden sm:inline">Page</span>

            <Input
              className="h-9 w-14 rounded-none"
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
              className="gap-1.5 rounded-none border-border-strong bg-surface px-2.5 py-1 font-mono text-xs text-muted-text shadow-none hover:border-flare hover:bg-surface hover:text-content disabled:opacity-30 [&_svg]:size-3"
              onClick={() => {
                table.nextPage();

                // We put timeout because we don't want to race with the rerender
                setTimeout(() => {
                  tableRef.current?.scrollIntoView();
                }, 0);
              }}
              disabled={!table.getCanNextPage()}
            >
              Next
              <ArrowRight />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
