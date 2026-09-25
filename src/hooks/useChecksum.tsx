import { useEffect, useState } from 'react';

import { getChecksum } from '@/utils/get-checksum';

export const useChecksum = (wait: boolean, id?: string) => {
  const [checksum, setChecksum] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id || wait) return;

    let cancelled = false;

    const fetchChecksum = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getChecksum(id);
        if (cancelled) return;
        setChecksum(response);
        setLoading(false);
      } catch (caught) {
        if (cancelled) return;
        setChecksum(null);
        setError(
          caught instanceof Error
            ? caught
            : new Error('Failed to load check phrase')
        );
        setLoading(false);
      }
    };

    fetchChecksum();

    return () => {
      cancelled = true;
    };
  }, [id, wait]);

  return { checksum, loading, error };
};
