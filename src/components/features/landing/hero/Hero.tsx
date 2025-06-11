'use client';

import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useState } from 'react';

import styles from './Hero.module.scss';

export const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');

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
            Discover, analyze, and track transactions across multiple blockchain
            networks in real-time
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className={styles.hero__search}
        >
          <div className={styles.relative}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by address, transaction hash, or block number..."
              className={styles.hero__search_input}
            />
            <Search className={styles.hero__search_icon} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className={styles.hero__stats}
        >
          <div className={styles.hero__stat_card}>
            <h3 className={styles.hero__stat_label}>Latest Block</h3>
            <p className={styles.hero__stat_value}>#18,245,678</p>
          </div>
          <div className={styles.hero__stat_card}>
            <h3 className={styles.hero__stat_label}>Network Hash Rate</h3>
            <p className={styles.hero__stat_value}>1.2 TH/s</p>
          </div>
          <div className={styles.hero__stat_card}>
            <h3 className={styles.hero__stat_label}>Active Validators</h3>
            <p className={styles.hero__stat_value}>12,345</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
