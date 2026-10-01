import '@tanstack/react-table'; // or vue, svelte, solid, qwik, etc.

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    header?: {
      className: string;
    };
  }

  interface TableMeta<TData extends RowData> {
    /** Filtered lists only know whether a next page exists, not the last page. */
    totalCountUnknown?: boolean;
  }
}
