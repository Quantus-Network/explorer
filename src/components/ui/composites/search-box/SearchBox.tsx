'use client';

import { Search } from 'lucide-react';
import {
  type ChangeEvent,
  type FormEvent,
  forwardRef,
  type HTMLAttributes
} from 'react';
import { useDebounceCallback } from 'usehooks-ts';

import { INPUT_DEBOUNCE_INTERVAL } from '@/constants/debounce-interval';
import { cn } from '@/lib/utils';

import { Button } from '../../button';
import { Input } from '../../input';

export interface SearchBoxProps
  extends Pick<HTMLAttributes<HTMLInputElement>, 'onFocus' | 'onKeyDown'> {
  inputClassName?: string;
  buttonClassName?: string;
  onKeywordChange: (val: string, e: ChangeEvent<HTMLInputElement>) => void;
  onSearch?: (val: string, e: FormEvent<HTMLFormElement>) => void;
  placeholder?: string;
}

export const SearchBox = forwardRef<HTMLDivElement, SearchBoxProps>(
  (props, ref) => {
    const debounced = useDebounceCallback(
      props.onKeywordChange,
      INPUT_DEBOUNCE_INTERVAL
    );

    return (
      <div ref={ref} className="relative">
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
            onFocus={props.onFocus}
            onKeyDown={props.onKeyDown}
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
  }
);

SearchBox.displayName = 'SearchBox';
