import {routes} from "../../../routes";
import {Link} from "react-router-dom";
import React from "react";
import styles from './Navigation.module.scss'

export const Navigation = () => {

    const currentPath = window.location.pathname
    return <nav className={styles.nav}>
        {routes.map(({path, name}, index) => (
            <Link
                className={`${styles.link} ${currentPath === path && styles.active}`}
                key={index}
                to={path}>
                {name}
            </Link>))}
    </nav>
}