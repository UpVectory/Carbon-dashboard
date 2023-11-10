import React, {useContext} from "react";
import {MyGlobalContext} from "../../base";
import house from "../../../assets/house.png";
import anchor from "../../../assets/anchor.png";
import {findKeyByValue, getWeight, getNumbersWithCommaSeparate} from "../../../utils";

import styles from "./ComparativeInfo.module.scss";

const items = {
    anchor: 11500,
    house: 156000,
}


export const ComparativeInfo = () => {
  const {carbon, weight} = useContext(MyGlobalContext);
  const img = carbon > 100000 ? house : anchor;
  const currentItem = carbon > 100000 ? items.house : items.anchor;
  const currentRate = carbon / currentItem * 100;
  const totalCarbonEmission = +getWeight(weight, carbon);
  
  const fillBgHeight = currentRate > 100
    ? 100
    : currentRate;

  return (
    <div className={styles.comparativeInfo}>
      <h3 className={styles.title}>Your carbon emissions in {weight}</h3>
      <div className={styles.main}>
        <div className={styles.image}>
          <img
            src={img}
            alt="Anchor"
          />
          <div
            className={styles.imageBg}
            style={{
              height: `${fillBgHeight}%`,
            }}
          ></div>
        </div>
        <p>{carbon > currentItem ? `x${Math.ceil(currentRate / 100)}` : ''}</p>
      </div>
      <p className={styles.label}>
        Your carbon emission is {getNumbersWithCommaSeparate(Math.ceil(totalCarbonEmission))} {weight}
      </p>

      <p className={styles.currency}>
        1 {findKeyByValue(items, currentItem)} ≈ {getNumbersWithCommaSeparate(+getWeight(weight, currentItem))} {weight}
      </p>
    </div>
  )
}