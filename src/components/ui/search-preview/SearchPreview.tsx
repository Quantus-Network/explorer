'use client';

import { Search } from 'lucide-react';
import type { ChangeEvent } from 'react';
import { useDebounceCallback } from 'usehooks-ts';

import { INPUT_DEBOUNCE_INTERVAL } from '@/constants/debounce-interval';

import styles from './SearchPreview.module.scss';

export interface SearchPreviewProps {
  onSearch: (val: string, e: ChangeEvent<HTMLInputElement>) => void;
}

export const SearchPreview = (props: SearchPreviewProps) => {
  const debounced = useDebounceCallback(
    props.onSearch,
    INPUT_DEBOUNCE_INTERVAL
  );

  return (
    <div className={styles.searchPreview}>
      <input
        type="text"
        placeholder="Search blocks, transactions, addresses..."
        className={styles.searchPreview__input}
        onChange={(e) => {
          const { value } = e.currentTarget;

          debounced(value, e);
        }}
      />
      <Search className={styles.searchPreview__icon} />
    </div>
  );
};
