import type { Table as ReactTable } from '@tanstack/react-table';
import {
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table';
import * as React from 'react';
import { useMediaQuery } from 'usehooks-ts';

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
import { CardSkeleton } from './CardSkeleton';
import { DataTableCards } from './DataTableCards';
import { RowSkeleton } from './RowSkeleton';
import { TableControls } from './TableControl';

const MD_BREAKPOINT = '(min-width: 768px)';

interface DataTableProps {
  table: ReactTable<any>;
  fetch?: {
    status: 'idle' | 'loading' | 'success' | 'error';
    errorFallback: React.ReactNode;
  };
  withControls?: boolean;
  customCellProps?: Record<string, any>;
}

const SortIndicator = ({
  direction
}: {
  direction: false | 'asc' | 'desc';
}) => {
  if (!direction) return null;

  return (
    <span aria-hidden className="font-mono text-[11px] leading-none">
      {direction === 'asc' ? '↑' : '↓'}
    </span>
  );
};

const getSortingKey = (sorting: { id: string; desc: boolean }[]) =>
  sorting.map((s) => `${s.id}:${s.desc ? 'desc' : 'asc'}`).join(',');

const getPageOriginals = (table: ReactTable<any>) =>
  table.getRowModel().rows.map((row) => row.original);

const areSamePageData = (a: unknown[], b: unknown[]) => {
  if (a === b) return true;
  if (a.length !== b.length) return false;
  return a.every((item, index) => item === b[index]);
};

export const DataTable = ({
  table,
  fetch,
  withControls = false,
  customCellProps = {}
}: DataTableProps) => {
  const isDesktop = useMediaQuery(MD_BREAKPOINT, {
    defaultValue: false,
    initializeWithValue: false
  });

  const { pageSize, pageIndex } = table.getState().pagination;
  const sortingKey = getSortingKey(table.getState().sorting);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const tableRef = React.useRef<HTMLTableElement>(null);
  const sentinelRef = React.useRef<HTMLDivElement>(null);

  const columnsLength = table.getAllColumns().length;
  const status = fetch?.status ?? 'success';
  const sourceData = table.options.data;

  const [accumulatedData, setAccumulatedData] = React.useState<unknown[]>(() =>
    getPageOriginals(table)
  );

  const prevSortingKeyRef = React.useRef(sortingKey);

  React.useEffect(() => {
    const sortingChanged = prevSortingKeyRef.current !== sortingKey;
    prevSortingKeyRef.current = sortingKey;

    const pageOriginals = getPageOriginals(table);

    if (sortingChanged || pageIndex === 0) {
      setAccumulatedData((prev) =>
        areSamePageData(prev, pageOriginals) ? prev : pageOriginals
      );
      return;
    }

    if (status === 'loading') return;

    setAccumulatedData((prev) => {
      const start = pageIndex * pageSize;
      const next = [...prev.slice(0, start), ...pageOriginals];
      return areSamePageData(prev, next) ? prev : next;
    });
  }, [sourceData, pageIndex, pageSize, sortingKey, status, table]);

  const mobileTable = useReactTable({
    data: accumulatedData,
    columns: table.options.columns,
    getCoreRowModel: getCoreRowModel()
  });

  const currentPageCount = table.getRowModel().rows.length;
  const isEmptyData = isDesktop
    ? currentPageCount === 0
    : withControls
      ? accumulatedData.length === 0
      : currentPageCount === 0;

  const canLoadMore =
    withControls &&
    !isDesktop &&
    table.getCanNextPage() &&
    status !== 'loading' &&
    status !== 'error';

  React.useEffect(() => {
    if (!canLoadMore || !sentinelRef.current) return;

    const sentinel = sentinelRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && table.getCanNextPage()) {
          table.nextPage();
        }
      },
      { root: null, rootMargin: '200px', threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [canLoadMore, table, pageIndex]);

  if (status === 'error') {
    return <>{fetch?.errorFallback}</>;
  }

  if (status === 'success' && isEmptyData)
    return (
      <Alert>
        <AlertTitle>No data found</AlertTitle>
        <AlertDescription>
          There is no data to display for this query.
        </AlertDescription>
      </Alert>
    );

  if (!isDesktop) {
    const showInitialLoading =
      status === 'loading' &&
      (withControls ? accumulatedData.length === 0 : currentPageCount === 0);
    const showLoadMoreSkeleton =
      withControls && status === 'loading' && pageIndex > 0;
    const cardsTable = withControls ? mobileTable : table;

    return (
      <div ref={containerRef}>
        {showInitialLoading ? (
          <CardSkeleton cardCount={pageSize} fieldsLength={columnsLength} />
        ) : (
          <DataTableCards
            table={cardsTable}
            customCellProps={customCellProps}
          />
        )}

        {showLoadMoreSkeleton && (
          <CardSkeleton
            className="mt-4"
            cardCount={1}
            fieldsLength={columnsLength}
          />
        )}

        {withControls && table.getCanNextPage() && (
          <div ref={sentinelRef} className="h-px w-full" aria-hidden />
        )}
      </div>
    );
  }

  return (
    <div ref={containerRef}>
      <div className="overflow-hidden rounded-none border border-border-subtle">
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
                    className="data-[sortable=true]:cursor-pointer data-[sortable=true]:hover:text-muted-text"
                  >
                    <div
                      className={cn(
                        'flex items-center gap-1',
                        header.column.columnDef.meta?.header?.className
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}

                      {header.column.getCanSort() && (
                        <SortIndicator
                          direction={header.column.getIsSorted()}
                        />
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

      {withControls && <TableControls table={table} tableRef={tableRef} />}
    </div>
  );
};
