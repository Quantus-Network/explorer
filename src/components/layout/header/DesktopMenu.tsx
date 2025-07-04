import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import { ThemeToggle } from '@/components/ui/composites/theme-toggle/ThemeToggle';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from '@/components/ui/navigation-menu';
import { SITE_NAVIGATIONS } from '@/config/site-navigations';

export interface DesktopMenuProps {}

export const DesktopMenu: React.FC<DesktopMenuProps> = () => {
  const location = usePathname();
  const rootPath = location.split('/')[1];

  return (
    <NavigationMenu className="hidden lg:block">
      <NavigationMenuList className="gap-8">
        {SITE_NAVIGATIONS.map((nav) => (
          <NavigationMenuItem key={nav.path}>
            <NavigationMenuLink asChild>
              <Link
                href={nav.path}
                className="no-underline data-[active=true]:font-semibold data-[active=true]:text-foreground-active"
                data-active={rootPath === nav.path.split('/')[1]}
              >
                {nav.label}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}

        <ThemeToggle />
      </NavigationMenuList>
    </NavigationMenu>
  );
};
