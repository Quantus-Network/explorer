import { useMemo } from 'react';

export const useOrderBy = <T,>(orderBy: string): T | undefined => {
  const orderByObject = useMemo(() => {
    const [key, order] = orderBy.split(':');
    if (!key || !order) return undefined;

    return {
      [key]: order
    } as T;
  }, [orderBy]);

  return orderByObject;
};
