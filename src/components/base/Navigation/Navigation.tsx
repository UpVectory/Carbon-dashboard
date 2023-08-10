import {routes} from "../../../routes";
import {Link} from "react-router-dom";
import React from "react";

export const Navigation = ()=>{

    const currentPath = window.location.pathname
    return <nav>
        {routes.map(({path, name}, index) => <Link style={{
            display: 'block',
            color: currentPath === path ? 'red' : "blue"
        }} key={index} to={path}>{name}</Link>)}
    </nav>
}