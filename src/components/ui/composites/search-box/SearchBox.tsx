'use client';

import { Search } from 'lucide-react';
import type { ChangeEvent, FormEvent } from 'react';
import { useDebounceCallback } from 'usehooks-ts';

import { INPUT_DEBOUNCE_INTERVAL } from '@/constants/debounce-interval';
import { cn } from '@/lib/utils';

import { Button } from '../../button';
import { Input } from '../../input';

export interface SearchBoxProps {
  inputClassName?: string;
  buttonClassName?: string;
  onKeywordChange: (val: string, e: ChangeEvent<HTMLInputElement>) => void;
  onSearch?: (val: string, e: FormEvent<HTMLFormElement>) => void;
  placeholder?: string;
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

          props.onSearch?.(e.target?.keyword?.value, e);
        }}
      >
        <Input
          type="text"
          name="keyword"
          placeholder={props.placeholder}
          onChange={(e) => {
            const { value } = e.currentTarget;

            debounced(value, e);
          }}
          className={cn('pe-12', props.inputClassName)}
          required
        />

        <Button
          className={cn(
            'absolute right-3 top-1/2 size-9 -translate-y-1/2',
            props.buttonClassName
          )}
        >
          <Search className="text-primary-foreground" />
        </Button>
      </form>
    </div>
  );
};
