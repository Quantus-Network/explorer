import { motion } from 'framer-motion';
import React from 'react';

import api from '@/api';
import { DATA_POOL_INTERVAL } from '@/constants/data-pool-interval';

import styles from './ChainStats.module.scss';

export interface ChainStatsProps {}

export const ChainStats: React.FC<ChainStatsProps> = () => {
  const { loading, data, error } = api.chainStatus.useGetStatus({
    pollInterval: DATA_POOL_INTERVAL
  });

  const success = !loading && !error;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className={styles.stats}
    >
      <div className={styles.stats__card}>
        <h3 className={styles.stats__label}>Latest Block</h3>
        <p className={styles.stats__value}>
          {success ? `#${data?.status?.height}` : 'Loading...'}
        </p>
      </div>

      <div className={styles.stats__card}>
        <h3 className={styles.stats__label}>Total Transactions</h3>
        <p className={styles.stats__value}>
          {success ? `${data?.transactions?.totalCount}` : 'Loading...'}
        </p>
      </div>
    </motion.div>
  );
};
