import React, {ReactNode, useContext, useState} from "react";
import {routesPath} from "../../../routes";
import {Link} from "react-router-dom";
import {FormControlLabel, Grid, makeStyles, Stack, Switch} from "@mui/material";
import {CustomSwitch, MyGlobalContext, Navigation} from "../../base";
import styles from './Layout.module.scss'


interface LayoutProps {
    children: ReactNode
}

export const Layout = ({children}: LayoutProps) => {
    const {length, weight, setLength, setWeight} = useContext(MyGlobalContext)
    const [checkLength, setCheckLength] = useState(length === 'km');
    const [checkWeight, setCheckWeight] = useState(weight === 'kg');

    return <Grid height={'100vh'} container flexWrap={'nowrap'}>
        <Stack
            className={styles.navigation}>
            <div>
                <Link className={styles.logo} to={routesPath.home}>
                    <img src="/logo.png" width='100%' alt="Home page"/>
                </Link>
            </div>
            <Navigation/>
            <div style={{
                display: "flex",
                flexDirection: "column"
            }}>

                <CustomSwitch
                    label1={'mi'}
                    label2={'km'}
                    value={checkLength}
                    setGlobalValue={setLength}
                    setValue={setCheckLength}
                    type={length}/>

                <CustomSwitch
                    label1={'lb'}
                    label2={'kg'}
                    value={checkWeight}
                    setGlobalValue={setWeight}
                    setValue={setCheckWeight}
                    type={weight}/>
            </div>
        </Stack>
        <Stack width={'100%'} height={'100%'} p={'32px'}>

            {children}

        </Stack>
    </Grid>
}