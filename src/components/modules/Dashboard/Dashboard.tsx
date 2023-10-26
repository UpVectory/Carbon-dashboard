import React from 'react';

import styles from './Dashboard.module.scss';

type Props = {
  children: React.ReactNode;
};

export const Dashboard: React.FC<Props> = ({
  children,
}) => {
  return (
    <section className={styles.dashboard}>
      <div className={styles.container}>
        {children}
      </div>
    </section>
  );
};

export const DashboardTable: React.FC<Props> = ({
  children,
}) => {
  return (
    <div className={styles.table}>
      {children}
    </div>
  )
}

export const DashboardGraph: React.FC<Props> = ({
  children,
}) => {
  return (
    <div className={styles.graph}>
      {children}
    </div>
  )
}

export const DashboarScoreboard: React.FC<Props> = ({
  children,
}) => {
  return (
    <div className={styles.scoreboard}>
      {children}
    </div>
  );
}
