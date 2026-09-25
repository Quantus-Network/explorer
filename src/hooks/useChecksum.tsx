import { useEffect, useState } from 'react';

import { getChecksum } from '@/utils/get-checksum';

type ResolvedChecksum = {
  id: string;
  checksum: string | null;
  error: Error | null;
};

export const useChecksum = (wait: boolean, id?: string) => {
  const [resolved, setResolved] = useState<ResolvedChecksum | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id || wait) return;

    let cancelled = false;

    const fetchChecksum = async () => {
      setLoading(true);

      try {
        const response = await getChecksum(id);
        if (cancelled) return;
        setResolved({ id, checksum: response, error: null });
        setLoading(false);
      } catch (caught) {
        if (cancelled) return;
        setResolved({
          id,
          checksum: null,
          error:
            caught instanceof Error
              ? caught
              : new Error('Failed to load check phrase')
        });
        setLoading(false);
      }
    };

    fetchChecksum();

    return () => {
      cancelled = true;
    };
  }, [id, wait]);

  const current = resolved?.id === id ? resolved : null;

  return {
    checksum: current?.checksum ?? null,
    loading: current ? loading : true,
    error: current?.error ?? null
  };
};
