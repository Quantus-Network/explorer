import type { CellContext } from '@tanstack/react-table';

import type { ErrorEvent } from '@/schemas';

import { ERROR_EVENT_COLUMNS } from './ERROR_EVENT_COLUMNS';

type DocsCell = (
  props: CellContext<ErrorEvent, string | null | undefined>
) => string;

function docsColumn() {
  const column = ERROR_EVENT_COLUMNS.find((col) => col.id === 'errorDocs');
  if (!column || typeof column.cell !== 'function') {
    throw new Error('errorDocs column is missing');
  }
  return column;
}

function docsCell(errorDocs: string | null | undefined) {
  const cell = docsColumn().cell as DocsCell;

  return cell({
    getValue: () => errorDocs
  } as CellContext<ErrorEvent, string | null | undefined>);
}

describe('ERROR_EVENT_COLUMNS error docs', () => {
  it('shows the error docs value', () => {
    expect(docsColumn().header).toBe('Docs');
    expect(docsCell('The account balance is too low.')).toBe(
      'The account balance is too low.'
    );
  });

  it('shows a dash when error docs are missing', () => {
    expect(docsCell(null)).toBe('-');
  });
});
