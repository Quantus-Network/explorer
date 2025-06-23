'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import api from '@/api';
import { RESOURCES } from '@/constants/resources';
import type { SearchAllResponse } from '@/schemas/searchs';
import { isAlphaNumeric } from '@/utils/alphanumeric-cheker';

export const useHero = () => {
  const router = useRouter();

  const [searchResult, setSearchResult] = useState<SearchAllResponse>();
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string>();

  const handleSearch = (val: string) => {
    switch (true) {
      case val.startsWith('0x'):
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

  const handleKeywordChange = async (val: string) => {
    const keyword = val.trim();

    if (!keyword) {
      setSearchResult(undefined);
      return;
    }

    try {
      setSearchLoading(true);

      const { data } = await api.search.all().query(keyword);

      setSearchResult(data);
      setSearchLoading(false);
    } catch (err: any) {
      toast.error(err.message);
      setSearchError(err.message);
      setSearchLoading(false);
    }
  };

  return {
    handleSearch,
    handleKeywordChange,
    searchResult,
    searchLoading,
    searchError
  };
};
