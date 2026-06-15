import { subHours } from 'date-fns/subHours';
import { useMemo } from 'react';

export const useGetRecentDateRange = () =>
  useMemo(() => {
    const today = new Date();
    const startDate = subHours(today, 24).toISOString();
    const endDate = today.toISOString();

    return { startDate, endDate };
  }, []);
