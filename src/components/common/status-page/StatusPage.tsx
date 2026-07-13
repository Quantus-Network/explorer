import { Link } from '@tanstack/react-router';
import type { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';
import { cn } from '@/lib/utils';

type StatusPageLink = {
  label: string;
  to: string;
  variant?: 'default' | 'outline';
};

type StatusPageButton = {
  label: string;
  onClick: () => void;
  variant?: 'default' | 'outline';
};

export type StatusPageAction = StatusPageLink | StatusPageButton;

export interface StatusPageProps {
  code: string;
  eyebrow: string;
  title: string;
  description: string;
  detail?: ReactNode;
  actions: StatusPageAction[];
  codeClassName?: string;
}

function isLinkAction(action: StatusPageAction): action is StatusPageLink {
  return 'to' in action;
}

export function StatusPage({
  code,
  eyebrow,
  title,
  description,
  detail,
  actions,
  codeClassName
}: StatusPageProps) {
  return (
    <SectionContainer className="flex flex-1 items-center">
      <ContentContainer className="flex max-w-lg flex-col items-start gap-6">
        <div className="flex flex-col gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-text">
            {eyebrow}
          </p>

          <p
            className={cn(
              'font-mono text-[56px] font-medium leading-none tracking-[-0.04em] text-flare sm:text-[72px]',
              codeClassName
            )}
          >
            {code}
          </p>

          <div className="flex flex-col gap-1.5">
            <h1 className="page-title">{title}</h1>
            <p className="text-[13px] leading-relaxed text-muted-text">
              {description}
            </p>
          </div>
        </div>

        {detail ? (
          <div className="w-full border border-border-strong bg-surface p-4">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-text">
              Details
            </p>
            <div className="break-words font-mono text-[12px] leading-relaxed text-muted-text-2">
              {detail}
            </div>
          </div>
        ) : null}

        <div className="flex flex-wrap items-center gap-3">
          {actions.map((action) => {
            if (isLinkAction(action)) {
              return (
                <Button
                  key={action.label}
                  asChild
                  variant={action.variant ?? 'default'}
                  className="rounded-none no-underline"
                >
                  <Link to={action.to} className="no-underline">
                    {action.label}
                  </Link>
                </Button>
              );
            }

            return (
              <Button
                key={action.label}
                type="button"
                variant={action.variant ?? 'default'}
                className="rounded-none"
                onClick={action.onClick}
              >
                {action.label}
              </Button>
            );
          })}
        </div>
      </ContentContainer>
    </SectionContainer>
  );
}
