import { useLocation } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

import { useChainSearch } from '@/hooks/useChainSearch';

export const useHeader = () => {
  const location = useLocation().pathname;
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((open) => !open);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const search = useChainSearch();

  return {
    ...search,
    toggleMenu,
    isOpen
  };
};
