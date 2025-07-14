'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import api from '@/api';
import type { SearchAllResponse } from '@/schemas/searchs';

export const useHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const [searchResult, setSearchResult] = useState<SearchAllResponse>();
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string>();

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
