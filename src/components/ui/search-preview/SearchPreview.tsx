'use client';

import { Search } from 'lucide-react';
import type { ChangeEvent, FormEvent } from 'react';
import { useDebounceCallback } from 'usehooks-ts';

import { INPUT_DEBOUNCE_INTERVAL } from '@/constants/debounce-interval';

import styles from './SearchPreview.module.scss';

export interface SearchPreviewProps {
  onKeywordChange: (val: string, e: ChangeEvent<HTMLInputElement>) => void;
  onSearch: (val: string, e: FormEvent<HTMLFormElement>) => void;
}

export const SearchPreview = (props: SearchPreviewProps) => {
  const debounced = useDebounceCallback(
    props.onKeywordChange,
    INPUT_DEBOUNCE_INTERVAL
  );

  return (
    <div className={styles.searchPreview}>
      <form
        onSubmit={(e: any) => {
          e.preventDefault();

          props.onSearch(e.target?.keyword?.value, e);
        }}
      >
        <input
          type="text"
          name="keyword"
          placeholder="Search blocks, transactions, addresses..."
          className={styles.searchPreview__input}
          onChange={(e) => {
            const { value } = e.currentTarget;

            debounced(value, e);
          }}
          required
        />
        <Search className={styles.searchPreview__icon} />
      </form>
    </div>
  );
};
