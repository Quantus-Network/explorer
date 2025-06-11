'use client';

import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useState } from 'react';

import styles from './SearchPreview.module.scss';

export const SearchPreview = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={styles.searchPreview}>
      <motion.div
        animate={{ width: isExpanded ? '240px' : '40px' }}
        transition={{ duration: 0.2 }}
      >
        <input
          type="text"
          placeholder="Search blocks, transactions, addresses..."
          className={styles.searchPreview__input}
          style={{ opacity: isExpanded ? 1 : 0 }}
          onFocus={() => setIsExpanded(true)}
          onBlur={() => setIsExpanded(false)}
        />
        <Search className={styles.searchPreview__icon} />
      </motion.div>
    </div>
  );
};
