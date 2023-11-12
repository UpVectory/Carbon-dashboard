import React, {ReactNode, useContext, useState} from "react";
import {Link} from "react-router-dom";
import {Grid, Stack, useMediaQuery} from "@mui/material";
import {CustomSwitch, Hamburger, MyGlobalContext, Navigation} from "../../base";
import styles from './Layout.module.scss'
import {routesPath} from "../../../routes";


interface LayoutProps {
    children: ReactNode
}

export const Layout = ({children}: LayoutProps) => {
    const {length, weight, setLength, setWeight} = useContext(MyGlobalContext)
    const [checkLength, setCheckLength] = useState(length === 'km');
    const [checkWeight, setCheckWeight] = useState(weight === 'kg');
    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
    const isMediumDevice = useMediaQuery('(max-width:900px)');
  
    const openMenu = () => {
      setIsOpenMenu(isOpen => !isOpen);
    }


  return (
    <Grid
      height={'100vh'}
      container
      className={styles.layout}
    >
      <Grid item md='auto' className={styles.sidebar}>
        <Stack
          className={styles.navigation}
          direction={{xs: 'row', md: 'column' }}
        >
          <div>
            <Link className={styles.logo} to={routesPath.home}>
                <img src="/logo.png" width='100%' alt="Home page"/>
            </Link>
          </div>
          <Navigation isOpenMenu={isOpenMenu} />
          <div className={styles.switches}>

            <CustomSwitch
              label1={'mi'}
              label2={'km'}
              value={checkLength}
              setGlobalValue={setLength}
              setValue={setCheckLength}
              type={length}
            />

            <CustomSwitch
              label1={'lb'}
              label2={'kg'}
              value={checkWeight}
              setGlobalValue={setWeight}
              setValue={setCheckWeight}
              type={weight}
            />
          </div>
          {isMediumDevice && (
            <Hamburger onSetActiveMenu={openMenu} />
          )}
        </Stack>
      </Grid>

      <Grid item md className={styles.content}>
        <Stack
          className={styles.board}
        >
            {children}
        </Stack>
      </Grid>
    </Grid>
  )
}