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

import { Button, type ButtonProps } from '../../button';
import { Input } from '../../input';

const sizeConfig = {
  sm: {
    input: 'h-8 px-3 text-xs',
    buttonSize: 'icon-sm' as const,
    /** Stretch so the left divider spans the full field height (nav chrome). */
    buttonClassName: 'h-auto w-8 self-stretch'
  },
  md: {
    input: 'h-auto px-[18px] py-3.5 text-sm',
    buttonSize: 'icon-lg' as const,
    buttonClassName: undefined as string | undefined
  }
};

export interface SearchBoxProps
  extends Pick<HTMLAttributes<HTMLInputElement>, 'onFocus' | 'onKeyDown'> {
  size?: keyof typeof sizeConfig;
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
  buttonVariant?: ButtonProps['variant'];
  onKeywordChange: (val: string, e: ChangeEvent<HTMLInputElement>) => void;
  onSearch?: (val: string, e: FormEvent<HTMLFormElement>) => void;
  placeholder?: string;
}

export const SearchBox = forwardRef<HTMLDivElement, SearchBoxProps>(
  (
    {
      size = 'md',
      className,
      inputClassName,
      buttonClassName,
      buttonVariant = 'default',
      onKeywordChange,
      onSearch,
      placeholder,
      onFocus,
      onKeyDown
    },
    ref
  ) => {
    const debounced = useDebounceCallback(
      onKeywordChange,
      INPUT_DEBOUNCE_INTERVAL
    );
    const config = sizeConfig[size];

    return (
      <div ref={ref} className={cn('relative', className)}>
        <form
          className={cn(
            'flex items-stretch overflow-hidden rounded-none border border-border-strong bg-surface transition-colors focus-within:border-flare'
          )}
          onSubmit={(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            const form = e.currentTarget;
            const keyword = (
              form.elements.namedItem('keyword') as HTMLInputElement | null
            )?.value;

            onSearch?.(keyword ?? '', e);
          }}
        >
          <Input
            type="text"
            name="keyword"
            placeholder={placeholder}
            onFocus={onFocus}
            onKeyDown={onKeyDown}
            onChange={(e) => {
              const { value } = e.currentTarget;

              debounced(value, e);
            }}
            className={cn(
              'min-w-0 flex-1 rounded-none border-0 bg-transparent font-mono shadow-none',
              'placeholder:text-muted-text-2 focus-visible:ring-0',
              config.input,
              inputClassName
            )}
            required
          />

          <Button
            type="submit"
            variant={buttonVariant}
            size={config.buttonSize}
            className={cn(
              'shrink-0 rounded-none shadow-none',
              config.buttonClassName,
              buttonVariant === 'ghost' &&
                'border-0 border-l border-border-strong bg-transparent text-muted-text hover:bg-transparent hover:text-content [&_svg]:size-[13px]',
              buttonClassName
            )}
          >
            <Search
              className={cn(
                buttonVariant === 'ghost'
                  ? 'text-current'
                  : 'text-secondary-foreground'
              )}
            />
          </Button>
        </form>
      </div>
    );
  }
);

SearchBox.displayName = 'SearchBox';
