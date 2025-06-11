'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { Separator } from 'radix-ui';

import { Copyright } from './Copyright';
import styles from './Footer.module.scss';

export interface FooterProps {}

const footerLinks = {
  product: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'API', href: '#api' },
    { label: 'Documentation', href: '#docs' }
  ],
  company: [
    { label: 'About', href: '#about' },
    { label: 'Blog', href: '#blog' },
    { label: 'Careers', href: '#careers' },
    { label: 'Contact', href: '#contact' }
  ],
  resources: [
    { label: 'Help Center', href: '#help' },
    { label: 'Community', href: '#community' },
    { label: 'Status', href: '#status' },
    { label: 'Terms of Service', href: '#terms' }
  ]
};

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:contact@example.com', label: 'Email' }
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

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={styles.footer__grid}
        >
          <div className={styles.footer__brand}>
            <motion.div variants={itemVariants} className={styles.footer__logo}>
              Quantus Explorer
            </motion.div>
            <motion.p
              variants={itemVariants}
              className={styles.footer__description}
            >
              The most comprehensive blockchain explorer for the Quantus
              network. Track transactions, monitor network activity, and explore
              the blockchain with ease.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className={styles.footer__social}
            >
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.footer__socialLink}
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className={styles.footer__column}>
            <h3 className={styles.footer__title}>Product</h3>
            <div className={styles.footer__links}>
              {footerLinks.product.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={styles.footer__link}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className={styles.footer__column}>
            <h3 className={styles.footer__title}>Company</h3>
            <div className={styles.footer__links}>
              {footerLinks.company.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={styles.footer__link}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className={styles.footer__column}>
            <h3 className={styles.footer__title}>Resources</h3>
            <div className={styles.footer__links}>
              {footerLinks.resources.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={styles.footer__link}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <Separator.Root className={styles.footer__separator} />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={styles.footer__bottom}
        >
          <Copyright
            variants={itemVariants}
            className={styles.footer__copyright}
          />

          <motion.div variants={itemVariants} className={styles.footer__legal}>
            <a href="#privacy" className={styles.footer__legalLink}>
              Privacy Policy
            </a>
            <a href="#terms" className={styles.footer__legalLink}>
              Terms of Service
            </a>
            <a href="#cookies" className={styles.footer__legalLink}>
              Cookie Policy
            </a>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};
