'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavigationMenu } from 'radix-ui';

import { SITE_NAVIGATIONS } from '@/config/site-navigations';

import styles from './Header.module.scss';

export interface HeaderProps {}

export const Header = (props: HeaderProps) => {
  const location = usePathname();
  const rootPath = location.split('/')[1];

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__left}>
          <Link href="/" className={styles.logo}>
            <div className={styles.logo__icon} />
            <span>Quantus Explorer</span>
          </Link>

          <NavigationMenu.Root className={styles.nav}>
            <NavigationMenu.List className={styles.nav__list}>
              {SITE_NAVIGATIONS.map((nav) => (
                <NavigationMenu.Item key={nav.path}>
                  <NavigationMenu.Link asChild>
                    <Link
                      href={nav.path}
                      className={styles.nav__link}
                      data-active={rootPath === nav.path.split('/')[1]}
                    >
                      {nav.label}
                    </Link>
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
              ))}
            </NavigationMenu.List>
          </NavigationMenu.Root>
        </div>
      </div>
    </header>
  );
};
