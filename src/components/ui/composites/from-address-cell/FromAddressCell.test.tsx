import type { CellContext } from '@tanstack/react-table';
import { render } from '@testing-library/react';
import { JSDOM } from 'jsdom';
import type { ReactNode } from 'react';

import { EXTRINSIC_TRANSACTION_COLUMNS } from '@/components/common/table-columns/EXTRINSIC_TRANSACTION_COLUMNS';
import { TRANSACTION_COLUMNS } from '@/components/common/table-columns/TRANSACTION_COLUMNS';
import { UNIFIED_LIST_TRANSACTION_COLUMNS } from '@/components/common/table-columns/UNIFIED_LIST_TRANSACTION_COLUMNS';
import {
  MINTING_ADDRESS,
  MINTING_ADDRESS_FROM_LABEL
} from '@/constants/minting-address';
import type {
  ExtrinsicTransfer,
  Transaction,
  UnifiedListTransaction
} from '@/schemas';

const dom = new JSDOM('<!doctype html><html><body></body></html>');
Object.assign(globalThis, {
  window: dom.window,
  document: dom.window.document,
  HTMLElement: dom.window.HTMLElement,
  Element: dom.window.Element,
  Node: dom.window.Node,
  navigator: dom.window.navigator,
  IS_REACT_ACT_ENVIRONMENT: true
});

function renderFromCell<T>(
  columns: { id?: string; cell?: unknown }[],
  value: unknown
) {
  const column = columns.find((col) => col.id === 'from');
  if (!column || typeof column.cell !== 'function') {
    throw new Error('from column is missing');
  }
  const cell = column.cell as (props: CellContext<T, unknown>) => ReactNode;
  return render(
    <>{cell({ getValue: () => value } as CellContext<T, unknown>)}</>
  );
}

function expectPlainMintingLabel(container: HTMLElement) {
  const label = container.querySelector('span');
  expect(label?.textContent).toBe(MINTING_ADDRESS_FROM_LABEL);
  expect(label?.className.split(/\s+/)).toEqual(
    expect.arrayContaining(['font-mono', 'text-xs', 'text-flare'])
  );
  expect(container.querySelector('a')).toBeNull();
  expect(container.querySelector('button')).toBeNull();
}

describe('From columns for the minting address', () => {
  it('shows plain text in the transfers table', () => {
    const { container } = renderFromCell<Transaction>(
      TRANSACTION_COLUMNS,
      MINTING_ADDRESS
    );
    expectPlainMintingLabel(container);
  });

  it('shows plain text in the unified transactions table', () => {
    const { container } = renderFromCell<UnifiedListTransaction>(
      UNIFIED_LIST_TRANSACTION_COLUMNS,
      MINTING_ADDRESS
    );
    expectPlainMintingLabel(container);
  });

  it('shows plain text in the extrinsic transfers table', () => {
    const { container } = renderFromCell<ExtrinsicTransfer>(
      EXTRINSIC_TRANSACTION_COLUMNS,
      { id: MINTING_ADDRESS }
    );
    expectPlainMintingLabel(container);
  });
});
