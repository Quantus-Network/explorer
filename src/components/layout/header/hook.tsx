'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import api from '@/api';
import { RESOURCES } from '@/constants/resources';
import type { SearchAllResponse } from '@/schemas/searchs';
import { validateAccountId } from '@/utils/validate-account-id';

export const useHeader = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const [searchResult, setSearchResult] = useState<SearchAllResponse>();
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string>();

  const handleSearch = (val: string) => {
    switch (true) {
      case val.startsWith('0x'):
        router.push(`${RESOURCES.transactions}/${val}`);
        break;

      case validateAccountId(val):
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
    handleKeywordChange,
    searchResult,
    searchLoading,
    searchError,
    toggleMenu,
    isOpen
  };
};
