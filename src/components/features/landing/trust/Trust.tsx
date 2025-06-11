'use client';

import { motion } from 'framer-motion';
import { Activity, Shield, Users } from 'lucide-react';

import styles from './Trust.module.scss';

const testimonials = [
  {
    content:
      'The Quantus Block Explorer has revolutionized how we monitor and analyze blockchain transactions. Its real-time data and intuitive interface make it an essential tool for our operations.',
    author: {
      name: 'Sarah Chen',
      role: 'Blockchain Developer',
      avatar: 'https://i.pravatar.cc/150?img=1'
    }
  },
  {
    content:
      'As a crypto investor, having access to accurate and up-to-date blockchain data is crucial. This explorer provides exactly what I need with a clean, user-friendly interface.',
    author: {
      name: 'Michael Rodriguez',
      role: 'Crypto Investor',
      avatar: 'https://i.pravatar.cc/150?img=2'
    }
  }
];

const stats = [
  {
    value: '1M+',
    label: 'Daily Active Users',
    icon: Users
  },
  {
    value: '99.9%',
    label: 'Uptime',
    icon: Activity
  },
  {
    value: '100%',
    label: 'Data Accuracy',
    icon: Shield
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

export const Trust = () => {
  return (
    <section className={styles.trust}>
      <div className={styles.trust__container}>
        <div className={styles.trust__header}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={styles.trust__title}
          >
            Trusted by Blockchain Professionals
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={styles.trust__subtitle}
          >
            Join thousands of users who rely on our platform for accurate
            blockchain data and insights
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={styles.trust__grid}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={styles.testimonialCard}
            >
              <p className={styles.testimonialCard__content}>
                {testimonial.content}
              </p>
              <div className={styles.testimonialCard__author}>
                <img
                  src={testimonial.author.avatar}
                  alt={testimonial.author.name}
                  className={styles.testimonialCard__avatar}
                />
                <div className={styles.testimonialCard__info}>
                  <span className={styles.testimonialCard__name}>
                    {testimonial.author.name}
                  </span>
                  <span className={styles.testimonialCard__role}>
                    {testimonial.author.role}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={styles.trust__stats}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={styles.statCard}
            >
              <stat.icon size={32} className={styles.statCard__icon} />
              <div className={styles.statCard__value}>{stat.value}</div>
              <div className={styles.statCard__label}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
