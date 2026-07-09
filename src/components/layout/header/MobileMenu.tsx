import { Link, useLocation } from '@tanstack/react-router';
import * as React from 'react';
import { useState } from 'react';

import type { ParentNavigation } from '@/config/site-navigations';
import { SITE_NAVIGATIONS } from '@/config/site-navigations';
import { cn } from '@/lib/utils';
import { isInstanceOf } from '@/utils/type-guard';

export interface MobileMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  toggleMenu
}) => {
  const location = useLocation().pathname;
  const rootPath = location.split('/')[1];
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (label: string) => {
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 top-[var(--nav-height)] z-[99] flex flex-col overflow-y-auto border-t border-border-subtle bg-void md:hidden">
      {SITE_NAVIGATIONS.map((nav) => {
        if (isInstanceOf<ParentNavigation>(nav, 'children')) {
          const isGroupOpen = !!openGroups[nav.label];
          const isActive = !!nav.children.find(
            (subNav) => subNav.path.split('/')[1] === rootPath
          );

          return (
            <div key={nav.label}>
              <button
                type="button"
                onClick={() => toggleGroup(nav.label)}
                className={cn(
                  'flex w-full items-center justify-between border-b border-border-subtle px-5 py-3.5 text-left text-sm text-content transition-colors hover:bg-surface',
                  isActive && 'text-content'
                )}
              >
                {nav.label}
                <span
                  className={cn(
                    'font-mono text-[10px] text-muted-text transition-transform',
                    isGroupOpen && 'rotate-180'
                  )}
                >
                  ▾
                </span>
              </button>
              {isGroupOpen && (
                <div>
                  {nav.children.map((subNav) => (
                    <Link
                      key={subNav.path}
                      to={subNav.path}
                      onClick={toggleMenu}
                      className={cn(
                        'block w-full border-b border-border-subtle bg-surface px-5 py-3.5 pl-8 text-sm text-muted-text no-underline transition-colors hover:text-content',
                        rootPath === subNav.path.split('/')[1] && 'text-content'
                      )}
                    >
                      {subNav.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        }

        const isActive =
          nav.path === '/'
            ? rootPath === ''
            : rootPath === nav.path.split('/')[1];

        return (
          <Link
            key={nav.path}
            to={nav.path}
            onClick={toggleMenu}
            className={cn(
              'block w-full border-b border-border-subtle px-5 py-3.5 text-sm text-content no-underline transition-colors hover:bg-surface',
              isActive && 'font-medium'
            )}
          >
            {nav.label}
          </Link>
        );
      })}
    </div>
  );
};
