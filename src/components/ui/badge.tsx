import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center whitespace-nowrap border border-solid bg-transparent px-[7px] py-0.5 font-sans text-[10px] tracking-[0.05em]',
  {
    variants: {
      variant: {
        success: 'border-sage/30 text-sage',
        error: 'border-ember/30 text-ember',
        immediate: 'border-gamboge/30 text-gamboge',
        reversible: 'border-glacier/30 text-glacier',
        miner: 'border-gamboge/20 text-gamboge/70',
        weak: 'border-ember/30 text-ember',
        moderate: 'border-gamboge/30 text-gamboge',
        strong: 'border-sage/30 text-sage'
      }
    },
    defaultVariants: {
      variant: 'success'
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
);
Badge.displayName = 'Badge';

export { Badge, badgeVariants };
