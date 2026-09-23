import { useNavigate } from '@tanstack/react-router';
import { type KeyboardEvent, useRef, useState } from 'react';
import { toast } from 'sonner';
import { useOnClickOutside } from 'usehooks-ts';

import useApiClient from '@/api';
import type { SearchAllResponse } from '@/schemas/searchs';
import { topSearchResultPathOnEnter } from '@/utils/get-top-search-result-path';

export const useChainSearch = () => {
  const api = useApiClient();
  const navigate = useNavigate();

  const [searchResult, setSearchResult] = useState<SearchAllResponse>();
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string>();
  const [resultKeyword, setResultKeyword] = useState<string>();
  const [isResultVisible, setIsResultVisible] = useState(false);

  const inputRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  useOnClickOutside([resultRef, inputRef] as any, () =>
    setIsResultVisible(false)
  );

  const handleClosePreview = () => {
    setIsResultVisible(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Escape') {
      e.currentTarget.blur();
      setIsResultVisible(false);
      return;
    }

    const inputValue =
      e.target instanceof HTMLInputElement ? e.target.value : '';
    const href = topSearchResultPathOnEnter({
      key: e.key,
      isComposing: e.nativeEvent.isComposing,
      targetIsKeywordInput:
        e.target instanceof HTMLInputElement && e.target.name === 'keyword',
      isResultVisible,
      isLoading: searchLoading,
      hasError: Boolean(searchError),
      inputValue,
      resultKeyword,
      result: searchResult
    });

    if (!href) return;

    e.preventDefault();
    setIsResultVisible(false);
    navigate({ href });
  };

  const handleInputFocus = () => {
    setIsResultVisible(true);
  };

  const handleKeywordChange = async (val: string) => {
    const keyword = val.trim();

    if (!keyword) {
      setSearchResult(undefined);
      setResultKeyword(undefined);
      return;
    }

    try {
      setSearchError(undefined);
      setSearchLoading(true);

      const { data } = await api.search.all().query(keyword);

      setSearchResult(data);
      setResultKeyword(keyword);
      setSearchLoading(false);
    } catch (err: any) {
      toast.error(err.message);
      setSearchError(err.message);
      setSearchLoading(false);
    }
  };

  return {
    isResultVisible,
    resultRef,
    inputRef,
    handleClosePreview,
    handleKeywordChange,
    handleKeyDown,
    handleInputFocus,
    searchResult,
    searchLoading,
    searchError
  };
};
