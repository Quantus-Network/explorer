'use client';

import { useRouter } from 'next/navigation';

import { RESOURCES } from '@/constants/resources';

export const useHero = () => {
  const router = useRouter();

  const handleSearch = (val: string) => {
    switch (true) {
      case val.startsWith('0x'):
        router.push(`${RESOURCES.transactions}/${val}`);
        break;

      default:
        router.push(`${RESOURCES.accounts}/${val}`);
        break;
    }
  };

  const handleKeywordChange = (val: string) => {};

  return { handleSearch, handleKeywordChange };
};
