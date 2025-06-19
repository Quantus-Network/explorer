import { format } from 'date-fns/format';

export const formatTimestamp = (timestamp?: string | Date) => {
  if (typeof timestamp !== 'string' && !(timestamp instanceof Date)) return '';

  const date =
    (typeof timestamp === 'string' && new Date(timestamp)) || timestamp;

  return format(date, 'MM/dd/yyyy, hh:mm:ss');
};
