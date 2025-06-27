import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import { ThemeToggle } from '@/components/ui/composites/theme-toggle/ThemeToggle';
import { ContentContainer } from '@/components/ui/content-container';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from '@/components/ui/navigation-menu';
import { SITE_NAVIGATIONS } from '@/config/site-navigations';
import { cn } from '@/lib/utils';

export interface MobileMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  toggleMenu
}) => {
  const location = usePathname();
  const rootPath = location.split('/')[1];

  return (
    <ContentContainer
      className={cn(
        'absolute top-16 bg-navbar-mobile-menu transition-opacity duration-300 ease-in-out opacity-100 md:hidden backdrop-blur-sm',
        !isOpen && 'opacity-0 pointer-events-none'
      )}
    >
      <NavigationMenu className="items-start">
        <NavigationMenuList className="flex flex-col items-start gap-8 py-8">
          {SITE_NAVIGATIONS.map((nav) => (
            <NavigationMenuItem key={nav.path} className="!ml-0">
              <NavigationMenuLink asChild>
                <Link
                  href={nav.path}
                  className="no-underline data-[active=true]:font-semibold"
                  data-active={rootPath === nav.path.split('/')[1]}
                  onClick={toggleMenu}
                >
                  {nav.label}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}

          <ThemeToggle />
        </NavigationMenuList>
      </NavigationMenu>
    </ContentContainer>
  );
};
