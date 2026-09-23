import { RESOURCES } from '@/constants/resources';
import type { SearchAllResponse } from '@/schemas/searchs';

import { getUnifiedTransactionDetailPath } from './get-unified-transaction-detail-path';

type SearchTransaction = SearchAllResponse['transactions'][number];

/** Same section order as SearchPreview: transactions, accounts, blocks, high security sets, error events. */
export function getTransactionSearchPath(tx: SearchTransaction): string {
  return getUnifiedTransactionDetailPath({
    type: tx.type,
    hash: tx.hash,
    detailId: tx.detail_id,
    block: tx.block
  });
}

export function getAccountSearchPath(id: string): string {
  return `${RESOURCES.accounts}/${id}`;
}

export function getBlockSearchPath(height: number): string {
  return `${RESOURCES.blocks}/${height}`;
}

export function getHighSecuritySetSearchPath(
  extrinsicId?: string | null
): string {
  return `${RESOURCES.highSecuritySets}/${extrinsicId}`;
}

export function getErrorEventSearchPath(extrinsicId?: string | null): string {
  return `${RESOURCES.errors}/${extrinsicId}`;
}

export function getTopSearchResultPath(
  result: SearchAllResponse | undefined
): string | undefined {
  if (!result) return undefined;

  const transaction = result.transactions?.[0];
  if (transaction) return getTransactionSearchPath(transaction);

  const account = result.accounts?.[0];
  if (account) return getAccountSearchPath(account.id);

  const block = result.blocks?.[0];
  if (block) return getBlockSearchPath(block.height);

  const highSecuritySet = result.highSecuritySets?.[0];
  if (highSecuritySet) {
    return getHighSecuritySetSearchPath(highSecuritySet.extrinsic?.id);
  }

  const errorEvent = result.errorEvents?.[0];
  if (errorEvent) return getErrorEventSearchPath(errorEvent.extrinsic?.id);

  return undefined;
}

export interface TopSearchResultEnterInput {
  key: string;
  isComposing: boolean;
  targetIsKeywordInput: boolean;
  isResultVisible: boolean;
  isLoading: boolean;
  hasError: boolean;
  inputValue: string;
  resultKeyword: string | undefined;
  result: SearchAllResponse | undefined;
}

export function topSearchResultPathOnEnter(
  input: TopSearchResultEnterInput
): string | undefined {
  if (
    input.key !== 'Enter' ||
    input.isComposing ||
    !input.targetIsKeywordInput
  ) {
    return undefined;
  }

  if (!input.isResultVisible || input.isLoading || input.hasError) {
    return undefined;
  }

  if (input.inputValue.trim() !== input.resultKeyword) {
    return undefined;
  }

  return getTopSearchResultPath(input.result);
}
