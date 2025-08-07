import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { useOnClickOutside } from 'usehooks-ts';

import api from '@/api';
import type { SearchAllResponse } from '@/schemas/searchs';

export const useHero = () => {
  const [searchResult, setSearchResult] = useState<SearchAllResponse>();
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string>();
  const [isResultVisible, setIsResultVisible] = useState(false);

  const inputRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  useOnClickOutside([resultRef, inputRef], () => setIsResultVisible(false));

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      e.currentTarget.blur();
      setIsResultVisible(false);
    }
  };

  const handleInputFocus = () => {
    setIsResultVisible(true);
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
    isResultVisible,
    resultRef,
    inputRef,
    handleKeywordChange,
    handleKeyDown,
    handleInputFocus,
    searchResult,
    searchLoading,
    searchError
  };
};
