import React from 'react';
import clsx from 'clsx';

import styles from './TableScore.module.scss';

type Props = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
};


export const TableScore: React.FC<Props> = ({
  children,
  style,
  className,
}) => {
  return (
    <div style={{ ...style}} className={styles.tableScore}>
      <div
        className={clsx(
          styles.wrapper,
          className
        )}

      >
        {children}
      </div>
    </div>
  );
};

export const TableScoreCaption: React.FC<Props> = ({
  children,
}) => {
  return (
    <div className={styles.caption}>
      {children}
    </div>
  );
};

export const TableScoreContentTable: React.FC<Props> = ({
  children,
}) => {
  return (
    <table className={styles.table}>
      {children}
    </table>
  );
};

export const TableScoreContentTableHead: React.FC<Props> = ({
  children,
}) => {
  return (
    <thead className={styles.tableHead}>
      {children}
    </thead>
  );
};

export const TableScoreContentTableBody: React.FC<Props> = ({
  children,
}) => {
  return (
    <tbody className={styles.tableBody}>
      {children}
    </tbody>
  );
};

