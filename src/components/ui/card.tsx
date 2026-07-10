import * as React from 'react';

import { cn } from '@/lib/utils';

const CardGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('grid gap-px bg-border-subtle', className)}
    {...props}
  />
));
CardGroup.displayName = 'CardGroup';

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'overflow-hidden rounded-none border-0 bg-surface text-content shadow-none',
      className
    )}
    {...props}
  />
));
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-2 px-6 pb-0 pt-5', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'font-mono text-[11px] font-normal uppercase leading-none tracking-[0.06em] text-muted-text [&_h1]:text-[inherit] [&_h1]:font-[inherit] [&_h1]:tracking-[inherit] [&_h2]:text-[inherit] [&_h2]:font-[inherit] [&_h2]:tracking-[inherit] [&_h3]:text-[inherit] [&_h3]:font-[inherit] [&_h3]:tracking-[inherit] [&_h4]:text-[inherit] [&_h4]:font-[inherit] [&_h4]:tracking-[inherit]',
      className
    )}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('font-mono text-[11px] text-muted-text', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'px-6 pb-5 pt-2 [&>p]:font-mono [&>p]:text-2xl [&>p]:font-medium [&>p]:tracking-[-0.02em] [&>p]:text-content',
      className
    )}
    {...props}
  />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center px-6 pb-5 pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardGroup,
  CardHeader,
  CardTitle
};
