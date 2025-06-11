'use client';

import { motion } from 'framer-motion';
import {
  Code,
  LineChart,
  Network,
  Search,
  Shield,
  Smartphone
} from 'lucide-react';

import styles from './Features.module.scss';

const features = [
  {
    icon: Search,
    title: 'Real-time Search',
    description:
      'Lightning-fast search across all blockchain data with intelligent suggestions and filters.'
  },
  {
    icon: Network,
    title: 'Multi-chain Support',
    description:
      'Explore and analyze data from multiple blockchain networks in one unified interface.'
  },
  {
    icon: LineChart,
    title: 'Advanced Analytics',
    description:
      'Deep dive into blockchain metrics with powerful visualization tools and insights.'
  },
  {
    icon: Code,
    title: 'API Access',
    description:
      'Developer-friendly API with comprehensive documentation and integration guides.'
  },
  {
    icon: Smartphone,
    title: 'Mobile Optimized',
    description:
      'Seamless experience across all devices with responsive design and touch optimization.'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description:
      'Bank-grade security with advanced encryption and compliance features.'
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

export const Features = () => {
  return (
    <section className={styles.features}>
      <div className={styles.features__container}>
        <div className={styles.features__header}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={styles.features__title}
          >
            Powerful Features for Blockchain Exploration
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={styles.features__subtitle}
          >
            Discover the tools and capabilities that make Quantus the most
            comprehensive blockchain explorer
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={styles.features__grid}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className={styles.featureCard}
            >
              <feature.icon className={styles.featureCard__icon} />
              <h3 className={styles.featureCard__title}>{feature.title}</h3>
              <p className={styles.featureCard__description}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
