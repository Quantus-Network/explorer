import { Check, ChevronDown, ListFilter, Plus, Trash2 } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  ACCOUNT_TYPE_FILTER_LABELS,
  ACCOUNT_TYPE_LABELS,
  ACCOUNT_TYPES,
  type AccountTypeFilterKey,
  type AccountTypeFilterRule,
  FILTER_OPERATOR_LABELS,
  FILTER_OPERATORS,
  type FilterOperator
} from '@/constants/account-types';
import type { AccountTypeFiltersState } from '@/hooks/useAccountTypeFilters';
import { cn } from '@/lib/utils';
import { toggleRuleType } from '@/utils/account-type-filter';

const MAX_PILL_TYPE_LABELS = 2;

const CONTROL_CLASS =
  'h-8 gap-1.5 rounded-none border-border-strong bg-transparent px-2.5 font-mono text-[11px] tracking-[0.04em] text-muted-text shadow-none hover:border-flare hover:bg-transparent hover:text-content [&_svg]:size-3';

const MENU_ITEM_CLASS =
  'flex w-full cursor-pointer items-center gap-2 px-2 py-1.5 text-left font-mono text-[11px] tracking-[0.04em] text-content outline-none hover:bg-surface-2 focus-visible:bg-surface-2';

function pillValueText(rule: AccountTypeFilterRule): string {
  const labels = rule.types.map((type) => ACCOUNT_TYPE_LABELS[type]);
  const shown = labels.slice(0, MAX_PILL_TYPE_LABELS).join(', ');
  const hiddenCount = labels.length - MAX_PILL_TYPE_LABELS;
  return hiddenCount > 0 ? `${shown} +${hiddenCount}` : shown;
}

interface AddFilterMenuProps {
  keys: readonly AccountTypeFilterKey[];
  isFirst: boolean;
  onSelect: (key: AccountTypeFilterKey) => void;
}

const AddFilterMenu: React.FC<AddFilterMenuProps> = ({
  keys,
  isFirst,
  onSelect
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant={isFirst ? 'outline' : 'ghost'}
          className={cn(CONTROL_CLASS, !isFirst && 'border-transparent')}
        >
          {isFirst ? <ListFilter /> : <Plus />}
          {isFirst ? 'Filter' : 'Add filter'}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="w-56 p-1"
        // The selected property's own popover opens next and should keep focus.
        onCloseAutoFocus={(event) => event.preventDefault()}
      >
        <p className="px-2 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-text">
          Filter by
        </p>
        {keys.map((key) => (
          <button
            key={key}
            type="button"
            className={MENU_ITEM_CLASS}
            onClick={() => {
              setOpen(false);
              onSelect(key);
            }}
          >
            {ACCOUNT_TYPE_FILTER_LABELS[key]}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
};

interface FilterPillProps {
  filterKey: AccountTypeFilterKey;
  rule: AccountTypeFilterRule;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onChange: (rule: AccountTypeFilterRule) => void;
  onRemove: () => void;
}

const FilterPill: React.FC<FilterPillProps> = ({
  filterKey,
  rule,
  open,
  onOpenChange,
  onChange,
  onRemove
}) => {
  const label = ACCOUNT_TYPE_FILTER_LABELS[filterKey];
  const isActive = rule.types.length > 0;

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn(
            CONTROL_CLASS,
            'max-w-full',
            isActive
              ? 'border-flare text-content'
              : 'border-dashed text-muted-text'
          )}
        >
          <span className="truncate">
            {label}
            {isActive && (
              <>
                {rule.operator === 'is_not' && ' is not'}
                {': '}
                <span className="text-flare">{pillValueText(rule)}</span>
              </>
            )}
          </span>
          <ChevronDown />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start" className="w-64 p-1">
        <div className="flex items-center gap-2 px-2 py-1.5">
          <span className="font-mono text-[11px] tracking-[0.04em] text-muted-text">
            {label}
          </span>

          <Select
            value={rule.operator}
            onValueChange={(operator) =>
              onChange({ ...rule, operator: operator as FilterOperator })
            }
          >
            <SelectTrigger
              aria-label={`${label} condition`}
              className="h-6 w-auto gap-1 rounded-none border-none px-1 font-mono text-[11px] text-content shadow-none focus:ring-0"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-none">
              {FILTER_OPERATORS.map((operator) => (
                <SelectItem
                  key={operator}
                  value={operator}
                  className="rounded-none font-mono text-[11px]"
                >
                  {FILTER_OPERATOR_LABELS[operator]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={`Delete ${label} filter`}
            title="Delete filter"
            className="ml-auto size-6 rounded-none text-muted-text hover:bg-transparent hover:text-flare [&_svg]:size-3.5"
            onClick={onRemove}
          >
            <Trash2 />
          </Button>
        </div>

        <div role="group" aria-label={`${label} values`}>
          {ACCOUNT_TYPES.map((type) => {
            const checked = rule.types.includes(type);
            return (
              <button
                key={type}
                type="button"
                role="checkbox"
                aria-checked={checked}
                className={MENU_ITEM_CLASS}
                onClick={() => onChange(toggleRuleType(rule, type))}
              >
                <span
                  className={cn(
                    'flex size-3.5 shrink-0 items-center justify-center border',
                    checked
                      ? 'border-flare bg-flare text-void'
                      : 'border-border-strong'
                  )}
                >
                  {checked && <Check className="size-3" />}
                </span>
                {ACCOUNT_TYPE_LABELS[type]}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export interface AccountTypeFilterProps {
  state: AccountTypeFiltersState;
}

export const AccountTypeFilter: React.FC<AccountTypeFilterProps> = ({
  state
}) => {
  const { keys, filters, addFilter, updateFilter, removeFilter, clearFilters } =
    state;
  const [openKey, setOpenKey] = React.useState<AccountTypeFilterKey | null>(
    null
  );

  const activeKeys = keys.filter((key) => filters[key]);
  const availableKeys = keys.filter((key) => !filters[key]);

  return (
    <div
      role="group"
      aria-label="Filters"
      className="flex flex-wrap items-center gap-2"
    >
      {activeKeys.map((key) => (
        <FilterPill
          key={key}
          filterKey={key}
          rule={filters[key]!}
          open={openKey === key}
          onOpenChange={(open) => setOpenKey(open ? key : null)}
          onChange={(rule) => updateFilter(key, rule)}
          onRemove={() => {
            setOpenKey(null);
            removeFilter(key);
          }}
        />
      ))}

      {availableKeys.length > 0 && (
        <AddFilterMenu
          keys={availableKeys}
          isFirst={activeKeys.length === 0}
          onSelect={(key) => {
            addFilter(key);
            setOpenKey(key);
          }}
        />
      )}

      {activeKeys.length > 0 && (
        <Button
          type="button"
          variant="ghost"
          className="h-8 rounded-none px-2 font-mono text-[11px] tracking-[0.04em] text-muted-text hover:bg-transparent hover:text-flare"
          onClick={() => {
            setOpenKey(null);
            clearFilters();
          }}
        >
          Clear
        </Button>
      )}
    </div>
  );
};
