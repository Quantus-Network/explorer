import type { SortingState } from '@tanstack/react-table';

/**
 * Use this function to transform a graphql sort literal into a SortingState object.
 *
 * @param sort - the graphql sort literal. E.g. "id:asc"
 * @returns the transformed sort literal
 */
export const transformSortLiteral = (sort: string | null): SortingState => {
  if (!sort) return [];

  const [id, order] = sort.split(':');

  if (!id || !order) return [];

  return [
    {
      id,
      desc: order.toLowerCase() === 'desc'
    }
  ];
};
