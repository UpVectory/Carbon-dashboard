import React, {ReactNode, useContext, useState} from "react";
import {routesPath} from "../../../routes";
import {Link} from "react-router-dom";
import {Grid, Switch} from "@mui/material";
import {MyGlobalContext} from "../../base/ctxProvider/context";
import {Navigation} from "../../base/Navigation";


interface LayoutProps {
    children: ReactNode
}

export const Layout = ({children}: LayoutProps) => {
    const {length, weight, setLength, setWeight} = useContext(MyGlobalContext)

    const [checkLength, setCheckLength] = useState(length === 'km');
    const [checkWeight, setCheckWeight] = useState(weight === 'kg');

    return <Grid height={'100vh'} container spacing={2}>
        <Grid px={2} py={8} display={'flex'} flexDirection={'column'} justifyContent={'space-between'} item xs={1}>
            <div>
                <Link to={routesPath.home}>
                    <img src="/logo.png" width='100%' alt="Home page"/>
                </Link>
            </div>
            <Navigation/>
            <div style={{
                display: "flex",
                flexDirection: "column"
            }}>
                <Switch
                    checked={checkLength}
                    onChange={({target}) => {
                        setCheckLength(target.checked)
                        setLength(length === 'km' ? "mi" : "km")
                    }}
                    inputProps={{'aria-label': 'controlled'}}
                />
                <Switch
                    checked={checkWeight}
                    onChange={({target}) => {
                        setCheckWeight(target.checked)
                        setWeight(weight === 'kg' ? "lb" : "kg")
                    }}
                    inputProps={{'aria-label': 'controlled'}}
                />
            </div>
        </Grid>

        <Grid item xs={11}>
            <main>
                {children}
            </main>
        </Grid>

    </Grid>


}