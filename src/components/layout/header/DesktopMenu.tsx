import { Link, useLocation } from '@tanstack/react-router';
import * as React from 'react';

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
import { isInstanceOf } from '@/utils/type-guard';

export interface DesktopMenuProps {}

export const DesktopMenu: React.FC<DesktopMenuProps> = () => {
  const location = useLocation().pathname;
  const rootPath = location.split('/')[1];

  return (
    <NavigationMenu delayDuration={0} className="hidden md:block">
      <NavigationMenuList className="gap-8">
        {SITE_NAVIGATIONS.map((nav) => {
          if (isInstanceOf<ParentNavigation>(nav, 'children'))
            return (
              <NavigationMenuItem key={nav.label}>
                <NavigationMenuTrigger
                  className="bg-transparent p-0 text-base font-normal no-underline hover:!bg-transparent focus:!bg-transparent data-[active=true]:font-semibold data-[active=true]:text-foreground-active"
                  data-active={
                    !!nav.children.find(
                      (subNav) => subNav.path.split('/')[1] === rootPath
                    )
                  }
                >
                  {nav.label}
                </NavigationMenuTrigger>

                <NavigationMenuContent className="flex flex-col gap-2 whitespace-nowrap p-2">
                  {nav.children.map((subNav) => (
                    <NavigationMenuLink key={subNav.path} asChild>
                      <Link
                        to={subNav.path}
                        className="rounded p-1 no-underline hover:bg-accent data-[active=true]:font-semibold data-[active=true]:text-foreground-active"
                        data-active={rootPath === subNav.path.split('/')[1]}
                      >
                        {subNav.label}
                      </Link>
                    </NavigationMenuLink>
                  ))}
                </NavigationMenuContent>
              </NavigationMenuItem>
            );

          return (
            <NavigationMenuItem key={nav.label}>
              <NavigationMenuLink asChild>
                <Link
                  to={nav.path}
                  className="no-underline data-[active=true]:font-semibold data-[active=true]:text-foreground-active"
                  data-active={rootPath === nav.path.split('/')[1]}
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
