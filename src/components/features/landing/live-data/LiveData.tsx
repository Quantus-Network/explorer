'use client';

import { motion } from 'framer-motion';
import { Activity, Clock } from 'lucide-react';

import styles from './LiveData.module.scss';

const mockTransactions = [
  {
    type: 'Transfer',
    time: '2 minutes ago',
    hash: '0x7d5a3c2b1e8f9a6d4c7b2e5f8a9d3c6b1e4f7a2d5c8b9e3f6a1d4c7b2e5f8a9',
    from: '0x1234...5678',
    to: '0x8765...4321',
    amount: '1.5 ETH',
    status: 'success'
  },
  {
    type: 'Contract',
    time: '5 minutes ago',
    hash: '0x9d3c6b1e4f7a2d5c8b9e3f6a1d4c7b2e5f8a9d3c6b1e4f7a2d5c8b9e3f6a1',
    from: '0x9876...5432',
    to: '0x2345...6789',
    amount: '0.8 ETH',
    status: 'success'
  },
  {
    type: 'Transfer',
    time: '8 minutes ago',
    hash: '0x1e4f7a2d5c8b9e3f6a1d4c7b2e5f8a9d3c6b1e4f7a2d5c8b9e3f6a1d4c7b2',
    from: '0x3456...7890',
    to: '0x0987...6543',
    amount: '2.3 ETH',
    status: 'success'
  },
  {
    type: 'Contract',
    time: '12 minutes ago',
    hash: '0x5c8b9e3f6a1d4c7b2e5f8a9d3c6b1e4f7a2d5c8b9e3f6a1d4c7b2e5f8a9d3',
    from: '0x4567...8901',
    to: '0x1098...7654',
    amount: '0.5 ETH',
    status: 'success'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export const LiveData = () => {
  return (
    <section className={styles.liveData}>
      <div className={styles.liveData__container}>
        <div className={styles.liveData__header}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={styles.liveData__title}
          >
            Live Blockchain Activity
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={styles.liveData__subtitle}
          >
            Real-time transaction feed and network status monitoring
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={styles.liveData__grid}
        >
          {mockTransactions.map((tx) => (
            <motion.div
              key={tx.hash}
              variants={itemVariants}
              className={styles.transactionCard}
            >
              <div className={styles.transactionCard__header}>
                <span className={styles.transactionCard__type}>{tx.type}</span>
                <span className={styles.transactionCard__time}>
                  <Clock size={14} style={{ marginRight: 4 }} />
                  {tx.time}
                </span>
              </div>
              <div className={styles.transactionCard__hash}>{tx.hash}</div>
              <div className={styles.transactionCard__details}>
                <div className={styles.transactionCard__detail}>
                  <div className={styles.transactionCard__detailLabel}>
                    From
                  </div>
                  <div className={styles.transactionCard__detailValue}>
                    {tx.from}
                  </div>
                </div>
                <div className={styles.transactionCard__detail}>
                  <div className={styles.transactionCard__detailLabel}>To</div>
                  <div className={styles.transactionCard__detailValue}>
                    {tx.to}
                  </div>
                </div>
                <div className={styles.transactionCard__detail}>
                  <div className={styles.transactionCard__detailLabel}>
                    Amount
                  </div>
                  <div className={styles.transactionCard__detailValue}>
                    {tx.amount}
                  </div>
                </div>
                <div className={styles.transactionCard__detail}>
                  <div className={styles.transactionCard__detailLabel}>
                    Status
                  </div>
                  <div className={styles.transactionCard__detailValue}>
                    {tx.status}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className={styles.networkStatus}>
          <div className={styles.networkStatus__dot} />
          <span className={styles.networkStatus__text}>
            <Activity size={14} style={{ marginRight: 4 }} />
            Network Status: All Systems Operational
          </span>
        </div>
      </div>
    </section>
  );
};
