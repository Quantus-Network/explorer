import { Link, useLocation } from '@tanstack/react-router';
import * as React from 'react';
import { useEffect, useState } from 'react';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu';
import type { ParentNavigation } from '@/config/site-navigations';
import { SITE_NAVIGATIONS } from '@/config/site-navigations';
import { cn } from '@/lib/utils';
import { isInstanceOf } from '@/utils/type-guard';

export interface DesktopMenuProps {}

const triggerClassName = cn(
  'h-auto rounded-none bg-transparent px-2.5 py-1.5 text-[13px] font-normal text-muted-text shadow-none',
  'hover:bg-transparent hover:text-content focus:bg-transparent focus:text-content',
  'focus-visible:ring-0 focus-visible:outline-none',
  'data-[state=open]:bg-transparent data-[state=open]:text-content',
  'data-[state=open]:hover:bg-transparent data-[state=open]:focus:bg-transparent',
  '[&_svg]:size-2.5 [&_svg]:opacity-50'
);

const linkClassName = cn(
  'whitespace-nowrap rounded-none px-2.5 py-1.5 text-[13px] font-normal text-muted-text no-underline',
  'hover:bg-transparent hover:text-content focus:bg-transparent focus:text-content',
  'focus-visible:ring-0 focus-visible:outline-none',
  'data-[active=true]:bg-transparent data-[active=true]:text-content',
  'data-[active=true]:hover:bg-transparent data-[active=true]:focus:bg-transparent'
);

export const DesktopMenu: React.FC<DesktopMenuProps> = () => {
  const location = useLocation().pathname;
  const rootPath = location.split('/')[1];
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue('');
  }, [location]);

  return (
    <NavigationMenu
      value={value}
      onValueChange={setValue}
      delayDuration={0}
      viewport={false}
      className="hidden max-w-none flex-1 justify-start md:flex"
    >
      <NavigationMenuList className="justify-start gap-0.5">
        {SITE_NAVIGATIONS.map((nav) => {
          if (isInstanceOf<ParentNavigation>(nav, 'children')) {
            const isActive = !!nav.children.find(
              (subNav) => subNav.path.split('/')[1] === rootPath
            );

            return (
              <NavigationMenuItem key={nav.label} value={nav.label}>
                <NavigationMenuTrigger
                  className={cn(triggerClassName, isActive && 'text-content')}
                >
                  {nav.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent
                  className={cn(
                    'left-0 top-full mt-0 min-w-[240px] rounded-none border border-border-strong bg-surface p-0',
                    'shadow-[0_8px_32px_rgba(0,0,0,0.4)]',
                    'data-[motion^=from-]:animate-none data-[motion^=to-]:animate-none',
                    'group-data-[viewport=false]/navigation-menu:rounded-none',
                    'group-data-[viewport=false]/navigation-menu:mt-0',
                    'group-data-[viewport=false]/navigation-menu:duration-0'
                  )}
                >
                  <div className="border-b border-border-subtle px-4 py-2 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-text">
                    {nav.label}
                  </div>
                  <ul className="flex flex-col">
                    {nav.children.map((subNav, index) => (
                      <li key={subNav.path}>
                        {index > 0 && <div className="h-px bg-border-subtle" />}
                        <NavigationMenuLink asChild>
                          <Link
                            to={subNav.path}
                            className="block rounded-none px-4 py-3 no-underline outline-none transition-colors hover:bg-surface-2 focus:bg-surface-2 focus-visible:bg-surface-2"
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
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          }

          const isActive =
            nav.path === '/'
              ? rootPath === ''
              : rootPath === nav.path.split('/')[1];

          return (
            <NavigationMenuItem key={nav.label}>
              <NavigationMenuLink asChild active={isActive}>
                <Link
                  to={nav.path}
                  className={cn(linkClassName, isActive && 'text-content')}
                >
                  {nav.label}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
