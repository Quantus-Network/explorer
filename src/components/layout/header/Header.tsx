'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ContentContainer } from '@/components/ui/content-container';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from '@/components/ui/navigation-menu';
import env from '@/config/env';
import { SITE_NAVIGATIONS } from '@/config/site-navigations';

export interface HeaderProps {}

export const Header = (props: HeaderProps) => {
  const location = usePathname();
  const rootPath = location.split('/')[1];

  return (
    <header className="fixed left-0 top-0 z-10 w-full border-b border-solid border-secondary bg-neutral-50/80 ring-0 backdrop-blur">
      <ContentContainer className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="size-8 rounded-lg bg-primary" />
          <span className="text-xl font-bold text-primary">
            {env.SITE_NAME}
          </span>
        </Link>

        <NavigationMenu>
          <NavigationMenuList className="gap-8">
            {SITE_NAVIGATIONS.map((nav) => (
              <NavigationMenuItem key={nav.path}>
                <NavigationMenuLink asChild>
                  <Link
                    href={nav.path}
                    className="data-[active=true]:font-semibold"
                    data-active={rootPath === nav.path.split('/')[1]}
                  >
                    {nav.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </ContentContainer>
    </header>
  );
};
