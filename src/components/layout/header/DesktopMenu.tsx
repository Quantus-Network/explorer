import { Link, useLocation } from '@tanstack/react-router';
import { ChevronDown } from 'lucide-react';
import * as React from 'react';

import type { ParentNavigation } from '@/config/site-navigations';
import { SITE_NAVIGATIONS } from '@/config/site-navigations';
import { cn } from '@/lib/utils';
import { isInstanceOf } from '@/utils/type-guard';

export interface DesktopMenuProps {}

export const DesktopMenu: React.FC<DesktopMenuProps> = () => {
  const location = useLocation().pathname;
  const rootPath = location.split('/')[1];

  return (
    <div className="hidden flex-1 items-center gap-0.5 md:flex">
      {SITE_NAVIGATIONS.map((nav) => {
        if (isInstanceOf<ParentNavigation>(nav, 'children')) {
          const isActive = !!nav.children.find(
            (subNav) => subNav.path.split('/')[1] === rootPath
          );

          return (
            <div key={nav.label} className="group relative">
              <button
                type="button"
                className={cn(
                  'flex items-center gap-1 whitespace-nowrap px-2.5 py-1.5 text-[13px] font-normal text-muted-text transition-colors hover:text-content',
                  isActive && 'text-content'
                )}
              >
                {nav.label}
                <ChevronDown className="size-2.5 opacity-50 transition-transform group-hover:rotate-180" />
              </button>

              <div className="invisible absolute left-0 top-full z-[200] flex min-w-[240px] flex-col border border-border-strong bg-surface opacity-0 shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-none group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <div className="border-b border-border-subtle px-4 py-2 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-text">
                  {nav.label}
                </div>
                {nav.children.map((subNav, index) => (
                  <React.Fragment key={subNav.path}>
                    {index > 0 && <div className="h-px bg-border-subtle" />}
                    <Link
                      to={subNav.path}
                      className="block px-4 py-3 no-underline transition-colors hover:bg-surface-2"
                    >
                      <div className="mb-0.5 text-[13px] font-medium text-content">
                        {subNav.label}
                      </div>
                      {subNav.description && (
                        <div className="text-[11px] leading-snug text-muted-text-2">
                          {subNav.description}
                        </div>
                      )}
                    </Link>
                  </React.Fragment>
                ))}
              </div>
            </div>
          );
        }

        const isActive =
          nav.path === '/'
            ? rootPath === ''
            : rootPath === nav.path.split('/')[1];

        return (
          <Link
            key={nav.label}
            to={nav.path}
            className={cn(
              'whitespace-nowrap px-2.5 py-1.5 text-[13px] font-normal text-muted-text no-underline transition-colors hover:text-content',
              isActive && 'text-content'
            )}
          >
            {nav.label}
          </Link>
        );
      })}
    </div>
  );
};
