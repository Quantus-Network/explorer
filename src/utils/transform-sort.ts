import type { SortingState } from '@tanstack/react-table';

/**
 * Use this function to transform a graphql sort literal into a SortingState object.
 *
 * @param sort - the graphql sort literal. E.g. "id_ASC"
 * @returns the transformed sort literal
 */
export const transformSortLiteral = (sort: string | null): SortingState => {
  if (!sort) return [];

  const parts = sort.split('_');
  const order = parts.pop(); // Remove and get the last part (ASC or DESC)
  const id = parts.join('_'); // Join the remaining parts to form the id

  return [
    {
      id,
      desc: order === 'DESC'
    }
  ];
};
