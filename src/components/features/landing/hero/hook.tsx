'use client';

import { useRouter } from 'next/navigation';

import { RESOURCES } from '@/constants/resources';
import { isAlphaNumeric } from '@/utils/alphanumeric-cheker';

export const useHero = () => {
  const router = useRouter();

  const handleSearch = (val: string) => {
    switch (true) {
      case val.includes('-'):
        router.push(`${RESOURCES.transactions}/${val}`);
        break;

      case isAlphaNumeric(val):
        router.push(`${RESOURCES.accounts}/${val}`);
        break;

      default:
        router.push(`${RESOURCES.blocks}/${val}`);
        break;
    }
  };

  const handleKeywordChange = (val: string) => {};

  return { handleSearch, handleKeywordChange };
};
