'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { NavigationMenu } from 'radix-ui';

import { SearchPreview } from '@/components/ui/search-preview/SearchPreview';
import { ThemeToggle } from '@/components/ui/theme-toggle/ThemeToggle';

import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__left}>
          <Link href="/" className={styles.logo}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={styles.logo__icon}
            />
            <span>Quantus</span>
          </Link>

          <NavigationMenu.Root className={styles.nav}>
            <NavigationMenu.List className={styles.nav__list}>
              <NavigationMenu.Item>
                <NavigationMenu.Link asChild>
                  <Link href="/explorer" className={styles.nav__link}>
                    Explorer
                  </Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
              <NavigationMenu.Item>
                <NavigationMenu.Link asChild>
                  <Link href="/api" className={styles.nav__link}>
                    API
                  </Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
              <NavigationMenu.Item>
                <NavigationMenu.Link asChild>
                  <Link href="/docs" className={styles.nav__link}>
                    Docs
                  </Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
              <NavigationMenu.Item>
                <NavigationMenu.Link asChild>
                  <Link href="/about" className={styles.nav__link}>
                    About
                  </Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            </NavigationMenu.List>
          </NavigationMenu.Root>
        </div>

        <div className={styles.header__right}>
          <SearchPreview />
          <ThemeToggle />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={styles.ctaButton}
          >
            Start Exploring
          </motion.button>
        </div>
      </div>
    </header>
  );
};
