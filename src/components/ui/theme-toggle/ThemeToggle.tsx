'use client';

import { motion } from 'framer-motion';
import { Sun } from 'lucide-react';
import { Switch } from 'radix-ui';

import styles from './ThemeToggle.module.scss';

export const ThemeToggle = () => {
  return (
    <Switch.Root className={styles.themeToggle__root}>
      <Switch.Thumb asChild>
        <motion.div
          className={styles.themeToggle__thumb}
          layout
          transition={{ type: 'spring', stiffness: 700, damping: 30 }}
        >
          <div className={styles.themeToggle__icon}>
            <Sun />
          </div>
        </motion.div>
      </Switch.Thumb>
    </Switch.Root>
  );
};
