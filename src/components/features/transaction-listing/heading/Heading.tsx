import React from 'react';

import styles from './Heading.module.scss';

export interface HeadingProps {}

export const Heading: React.FC<HeadingProps> = () => {
  return (
    <section className={styles.heading}>
      <div className={styles.heading__container}>
        <h1>Transactions</h1>
      </div>
    </section>
  );
};
