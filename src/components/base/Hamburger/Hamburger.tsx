import React, { useState } from 'react';
import styles from './Hamburger.module.scss';
import clsx from 'clsx';

type Props = {
  onSetActiveMenu?: (isOpened : boolean) => void;
};

export const Hamburger: React.FC<Props> = ({
  onSetActiveMenu,
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleClickHamburger = () => {
    if (onSetActiveMenu) {
      onSetActiveMenu(!isActive);
    }

    setIsActive(current => !current);
  }

  return (
    <button
      className={clsx(
        styles.hamburger,
        isActive && styles.active,
      )}
      onClick={handleClickHamburger}
    >
      <span></span>
    </button>
  );
};
