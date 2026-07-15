import type { VariantProps } from 'class-variance-authority';

import { Badge, type badgeVariants } from '@/components/ui/badge';

interface PrivacyScoreBadgeProps {
  score: number;
  label: string;
}

type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>['variant']>;

const labelVariants: Record<string, BadgeVariant> = {
  Critical: 'error',
  Weak: 'weak',
  Moderate: 'moderate',
  Strong: 'strong',
  'Very Strong': 'strong'
};

export const PrivacyScoreBadge = ({ score, label }: PrivacyScoreBadgeProps) => {
  const variant = labelVariants[label] ?? 'miner';

  return (
    <Badge variant={variant}>
      {score.toFixed(1)} bits ({label})
    </Badge>
  );
};
