'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import styles from './CallToAction.module.scss';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
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

export const CallToAction = () => {
  return (
    <section className={styles.cta}>
      <div className={styles.cta__container}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={styles.cta__content}
        >
          <motion.h2 variants={itemVariants} className={styles.cta__title}>
            Start Exploring the Blockchain Today
          </motion.h2>
          <motion.p variants={itemVariants} className={styles.cta__description}>
            Join thousands of users who trust our platform for accurate
            blockchain data and insights. Get started with our powerful tools
            and real-time analytics.
          </motion.p>
          <motion.div variants={itemVariants} className={styles.cta__buttons}>
            <button
              type="button"
              className={`${styles.cta__button} ${styles.cta__buttonPrimary}`}
            >
              Get Started
              <ArrowRight size={16} style={{ marginLeft: 8 }} />
            </button>
            <button
              type="button"
              className={`${styles.cta__button} ${styles.cta__buttonSecondary}`}
            >
              Learn More
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
