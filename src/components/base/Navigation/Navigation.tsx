import {routes} from "../../../routes";
import {Link} from "react-router-dom";
import React from "react";
import styles from './Navigation.module.scss'
import clsx from "clsx";

type Props = {
  isOpenMenu: boolean;
}

export const Navigation: React.FC<Props> = ({
  isOpenMenu,
}) => {
  const currentPath = window.location.pathname;

  return (
    <nav
      className={clsx(
        styles.nav,
        isOpenMenu && styles.navActive,
      )}
    >
      {routes.map(({path, name}, index) => (
        <Link
          className={`${styles.link} ${currentPath === path && styles.active}`}
          key={index}
          to={path}>
          {name}
        </Link>
      ))}
    </nav>
  )
}