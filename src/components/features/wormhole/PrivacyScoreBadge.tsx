import { cn } from '@/lib/utils';

interface PrivacyScoreBadgeProps {
  score: number;
  label: string;
}

const labelColors: Record<string, string> = {
  Critical: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  Weak: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
  Moderate:
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  Strong:
    'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  'Very Strong':
    'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400'
};

export const PrivacyScoreBadge = ({ score, label }: PrivacyScoreBadgeProps) => {
  const colorClass =
    labelColors[label] ??
    'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium',
        colorClass
      )}
    >
      <span>{score.toFixed(1)} bits</span>
      <span className="opacity-70">({label})</span>
    </span>
  );
};
