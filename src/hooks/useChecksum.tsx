import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { getChecksum } from '@/utils/get-checksum';

export const useChecksum = (wait: boolean, id?: string) => {
  const [checksum, setChecksum] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchChecksum = async () => {
      try {
        setLoading(true);
        const response = await getChecksum(id);
        setChecksum(response);
        setLoading(false);
      } catch (error: any) {
        toast.error('Error fetching checksum:', error.message);
      }
    };

    if (id && !wait) {
      fetchChecksum();
    }
  }, [id, wait]);

  return { checksum, loading };
};
