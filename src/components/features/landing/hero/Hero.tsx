'use client';

import { motion } from 'framer-motion';
import { useQueryState } from 'nuqs';

import { SearchPreview } from '@/components/ui/search-preview/SearchPreview';

import styles from './Hero.module.scss';

export interface HeroProps {}

export const Hero = (props: HeroProps) => {
  const [query, setQuery] = useQueryState('q');

  return (
    <section className={styles.hero}>
      <div className={styles.hero__container}>
        <div className={styles.hero__content}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={styles.hero__title}
          >
            Explore the Blockchain Universe
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={styles.hero__subtitle}
          >
            Discover, analyze, and track transactions across the blockchain
            network in real-time
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className={styles.hero__search}
        >
          <SearchPreview onSearch={() => {}} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className={styles.hero__stats}
        >
          <div className={styles.hero__stat__card}>
            <h2 className={styles.hero__stat__label}>Latest Block</h2>
            <p className={styles.hero__stat__value}>#18,245,678</p>
          </div>

          <div className={styles.hero__stat__card}>
            <h2 className={styles.hero__stat__label}>Total Transactions</h2>
            <p className={styles.hero__stat__value}>12,345</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
