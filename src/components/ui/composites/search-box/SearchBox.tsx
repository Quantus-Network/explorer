'use client';

import { Search } from 'lucide-react';
import type { ChangeEvent, FormEvent } from 'react';
import { useDebounceCallback } from 'usehooks-ts';

import { INPUT_DEBOUNCE_INTERVAL } from '@/constants/debounce-interval';

import { Button } from '../../button';
import { Input } from '../../input';

export interface SearchBoxProps {
  onKeywordChange: (val: string, e: ChangeEvent<HTMLInputElement>) => void;
  onSearch: (val: string, e: FormEvent<HTMLFormElement>) => void;
}

export const SearchBox = (props: SearchBoxProps) => {
  const debounced = useDebounceCallback(
    props.onKeywordChange,
    INPUT_DEBOUNCE_INTERVAL
  );

  return (
    <div className="relative">
      <form
        onSubmit={(e: any) => {
          e.preventDefault();

          props.onSearch(e.target?.keyword?.value, e);
        }}
      >
        <Input
          type="text"
          name="keyword"
          placeholder="Search blocks, transactions, addresses..."
          onChange={(e) => {
            const { value } = e.currentTarget;

            debounced(value, e);
          }}
          className="pe-12"
          required
        />

        <Button asChild>
          <div className="absolute right-3 top-1/2 size-6 -translate-y-1/2">
            <Search className="text-primary-foreground" />
          </div>
        </Button>
      </form>
    </div>
  );
};
