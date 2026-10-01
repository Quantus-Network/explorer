import {
  createParser,
  parseAsInteger,
  useQueryState,
  useQueryStates
} from 'nuqs';
import { useCallback, useMemo } from 'react';

import type {
  AccountTypeFilterKey,
  AccountTypeFilterRule,
  AccountTypeFilters
} from '@/constants/account-types';
import {
  parseAccountTypeFilterRule,
  serializeAccountTypeFilterRule
} from '@/utils/account-type-filter';

const ruleParser = createParser<AccountTypeFilterRule>({
  parse: parseAccountTypeFilterRule,
  serialize: serializeAccountTypeFilterRule,
  eq: (a, b) =>
    serializeAccountTypeFilterRule(a) === serializeAccountTypeFilterRule(b)
});

const EMPTY_RULE: AccountTypeFilterRule = { operator: 'is', types: [] };

/**
 * Notion-style account-type filters for one table, kept in the URL so filtered
 * views are shareable. `keys` must be a stable (module-level) array.
 */
export const useAccountTypeFilters = (
  keys: readonly AccountTypeFilterKey[]
) => {
  const keyMap = useMemo(
    () => Object.fromEntries(keys.map((key) => [key, ruleParser])),
    [keys]
  );
  const [values, setValues] = useQueryStates(keyMap);
  const [, setPage] = useQueryState('page', parseAsInteger.withDefault(1));

  const filters = useMemo<AccountTypeFilters>(() => {
    const active: AccountTypeFilters = {};
    for (const key of keys) {
      const rule = values[key];
      if (rule) active[key] = rule;
    }
    return active;
  }, [keys, values]);

  // An empty rule does not narrow results, so adding one keeps the current page.
  const addFilter = useCallback(
    (key: AccountTypeFilterKey) => setValues({ [key]: EMPTY_RULE }),
    [setValues]
  );

  const updateFilter = useCallback(
    (key: AccountTypeFilterKey, rule: AccountTypeFilterRule) => {
      setPage(1);
      setValues({ [key]: rule });
    },
    [setPage, setValues]
  );

  const removeFilter = useCallback(
    (key: AccountTypeFilterKey) => {
      setPage(1);
      setValues({ [key]: null });
    },
    [setPage, setValues]
  );

  const clearFilters = useCallback(() => {
    setPage(1);
    setValues(Object.fromEntries(keys.map((key) => [key, null])));
  }, [keys, setPage, setValues]);

  return {
    keys,
    filters,
    addFilter,
    updateFilter,
    removeFilter,
    clearFilters
  };
};

export type AccountTypeFiltersState = ReturnType<typeof useAccountTypeFilters>;
