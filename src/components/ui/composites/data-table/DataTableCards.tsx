import type { Table as ReactTable } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import * as React from 'react';

import { cn } from '@/lib/utils';

interface DataTableCardsProps {
  table: ReactTable<any>;
  customCellProps?: Record<string, any>;
  className?: string;
}

const getHeaderLabel = (header: unknown, fallback: string): React.ReactNode => {
  if (typeof header === 'string' || typeof header === 'number') {
    return header;
  }

  return fallback;
};

export const DataTableCards = ({
  table,
  customCellProps = {},
  className
}: DataTableCardsProps) => {
  const rows = table.getRowModel().rows;

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {rows.map((row) => {
        const cells = row.getVisibleCells();

        return (
          <div
            key={row.id}
            className="overflow-hidden rounded-none border border-border-subtle bg-surface"
          >
            <dl>
              {cells.map((cell, cellIdx) => (
                <div
                  key={cell.id}
                  className={cn(
                    'grid grid-cols-1 gap-3 px-5 py-3',
                    cellIdx < cells.length - 1 &&
                      'border-b border-border-subtle'
                  )}
                >
                  <dt className="font-mono text-[12px] text-muted-text">
                    {getHeaderLabel(
                      cell.column.columnDef.header,
                      cell.column.id
                    )}
                  </dt>
                  <dd className="flex items-center gap-1.5 break-all text-[13px] text-content">
                    {flexRender(cell.column.columnDef.cell, {
                      ...cell.getContext(),
                      ...customCellProps
                    })}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        );
      })}
    </div>
  );
};
