import { useEffect, useRef, useState } from 'react';

import { getChecksum } from '@/utils/get-checksum';

type ResolvedChecksum = {
  id: string;
  checksum: string | null;
  error: Error | null;
};

const isAbort = (error: unknown) =>
  typeof error === 'object' &&
  error !== null &&
  'name' in error &&
  error.name === 'AbortError';

export const useChecksum = (wait: boolean, id?: string) => {
  const [resolved, setResolved] = useState<ResolvedChecksum | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const resolvedRef = useRef<ResolvedChecksum | null>(null);
  resolvedRef.current = resolved;

  useEffect(() => {
    if (!id || wait) return undefined;

    const controller = new AbortController();
    let cancelled = false;

    if (resolvedRef.current?.id !== id) setLoading(true);

    const fetchChecksum = async () => {
      try {
        const response = await getChecksum(id, controller.signal);
        if (cancelled) return;
        setResolved({ id, checksum: response, error: null });
        setLoading(false);
      } catch (caught) {
        if (cancelled || isAbort(caught)) return;
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
      controller.abort();
    };
  }, [id, wait]);

  const current = resolved?.id === id ? resolved : null;

  return {
    checksum: current?.checksum ?? null,
    loading: current ? loading : true,
    error: current?.error ?? null
  };
};
