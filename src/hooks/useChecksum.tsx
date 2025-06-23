import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { getChecksum } from '@/utils/get-checksum';

export const useChecksum = (id?: string) => {
  const [checksum, setChecksum] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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

    if (id) {
      fetchChecksum();
    }
  }, [id]);

  return { checksum, loading };
};
