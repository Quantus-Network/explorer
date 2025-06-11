'use client';

import { motion } from 'framer-motion';

import { SearchPreview } from '@/components/ui/search-preview/SearchPreview';

import { ChainStats } from '../chain-stats/ChainStats';
import styles from './Hero.module.scss';
import { useHero } from './hook';

export interface HeroProps {}

export const Hero = (props: HeroProps) => {
  const { handleSearch, handleKeywordChange } = useHero();

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
          <SearchPreview
            onSearch={handleSearch}
            onKeywordChange={handleKeywordChange}
          />
        </motion.div>

        <ChainStats />
      </div>
    </section>
  );
};
